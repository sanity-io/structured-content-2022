import { NextApiRequest, NextApiResponse } from 'next';
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
  console.log(relatedRoutes);

  return res.status(200).json({ message: 'OK', relatedRoutes });
}
