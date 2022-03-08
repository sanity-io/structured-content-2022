import { NextApiRequest, NextApiResponse } from 'next';
import urlJoin from 'proper-url-join';
import { assertValidRequest } from '@sanity/webhook';
import client from '../../lib/sanity.server';

const QUERY = `
  *[_type == "page" && references($id)] {
    "slug": *[_type == "route" && references(^._id)].slug.current
  }["slug"][]
`;

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  assertValidRequest(req, process.env.SANITY_STUDIO_REVALIDATE_SECRET);

  const { _id: id } = req.body;
  if (typeof id !== 'string' || !id) {
    return res.status(401).json({ message: 'Invalid _id' });
  }

  const relatedRoutes = await client.fetch(QUERY, { id });
  if (!Array.isArray(relatedRoutes) || !relatedRoutes.length) {
    return res
      .status(401)
      .json({ message: 'No pages reference updated object' });
  }

  try {
    await Promise.all(
      relatedRoutes.map((route) => res.unstable_revalidate(urlJoin(route)))
    );
    return res
      .status(200)
      .json({ message: `Updated routes: ${relatedRoutes.join(', ')}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
