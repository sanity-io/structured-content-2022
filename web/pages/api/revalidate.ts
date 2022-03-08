import { NextApiRequest, NextApiResponse } from 'next';
import urlJoin from 'proper-url-join';
import { isValidRequest } from '@sanity/webhook';
import client from '../../lib/sanity.server';

const SECTION_UPDATED_QUERY = `
  *[_type == "page" && references($id)] {
    "slug": *[_type == "route" && references(^._id)].slug.current
  }["slug"][]`;
const PAGE_UPDATED_QUERY = `*[_type == "route" && references($id)].slug.current`;
const ROUTE_UPDATED_QUERY = `*[_type == "route" && _id == $id].slug.current`;

type Body = {
  _id: string;
  _type: string;
}

const getQueryForType = (type: string) => {
  switch (type) {
    case 'route':
      return ROUTE_UPDATED_QUERY;
    case 'page':
      return PAGE_UPDATED_QUERY;
    default:
      return SECTION_UPDATED_QUERY;
  }
};

const log = (msg: string, error?: boolean) =>
  console[error ? "error" : "log"](`[revalidate] ${msg}`);

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidRequest(req, process.env.SANITY_STUDIO_REVALIDATE_SECRET)) {
    const invalidRequest = 'Invalid request'
    log(invalidRequest, true);
    return res.status(401).json({ message: invalidRequest });
  }

  const { _id: id, _type } = req.body as Body;
  if (typeof id !== 'string' || !id) {
    const invalidId = 'Invalid _id';
    log(invalidId, true);
    return res.status(401).json({ message: invalidId });
  }

  log(`Querying for type '${_type}' ..`);
  const relatedRoutes = await client.fetch(getQueryForType(_type), { id });
  if (!Array.isArray(relatedRoutes) || !relatedRoutes.length) {
    const noUpdatedObjects = 'No pages reference updated object';
    log(noUpdatedObjects, true);
    return res.status(401).json({ message: noUpdatedObjects });
  }

  try {
    await Promise.all(
      relatedRoutes.map((route) => res.unstable_revalidate(urlJoin(route)))
    );
    const updatedRoutes = `Updated routes: ${relatedRoutes.join(', ')}`;
    log(updatedRoutes);
    return res.status(200).json({ message: updatedRoutes });
  } catch (err) {
    log(err.message, true);
    return res.status(500).json({ message: err.message });
  }
}
