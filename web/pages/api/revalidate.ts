import { NextApiRequest, NextApiResponse } from 'next';
import urlJoin from 'proper-url-join';
import { isValidRequest } from '@sanity/webhook';
import client from '../../lib/sanity.server';

const SECTION_UPDATED_QUERY = `
  *[_type == "page" && references($id)] {
    "slug": *[_type == "route" && references(^._id)].slug.current
  }["slug"][]
`;

const PAGE_UPDATED_QUERY = `*[_type == "route" && references($id)].slug.current`;

// TODO: ROUTE_UPDATED_QUERY?

type Body = {
  _id: string;
  _type: string;
}

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidRequest(req, process.env.SANITY_STUDIO_REVALIDATE_SECRET)) {
    const invalidRequest = 'Invalid request'
    console.error(invalidRequest);
    res.status(401).json({ message: invalidRequest });
    return;
  }

  const { _id: id, _type } = req.body as Body;
  if (typeof id !== 'string' || !id) {
    const invalidId = 'Invalid _id';
    console.error(invalidId);
    return res.status(401).json({ message: invalidId });
  }

  const query = _type === 'page' ? PAGE_UPDATED_QUERY : SECTION_UPDATED_QUERY;
  const relatedRoutes = await client.fetch(query, { id });
  if (!Array.isArray(relatedRoutes) || !relatedRoutes.length) {
    const noUpdatedObjects = 'No pages reference updated object';
    return res.status(401).json({ message: noUpdatedObjects });
  }

  try {
    await Promise.all(
      relatedRoutes.map((route) => res.unstable_revalidate(urlJoin(route)))
    );
    const updatedRoutes = `Updated routes: ${relatedRoutes.join(', ')}`;
    console.log(updatedRoutes);
    return res.status(200).json({ message: updatedRoutes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
