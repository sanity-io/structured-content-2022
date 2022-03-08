import { NextApiRequest, NextApiResponse } from 'next';
import { assertValidRequest } from '@sanity/webhook';

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  assertValidRequest(req, process.env.SANITY_STUDIO_REVALIDATE_SECRET);
  if (!req.query.slug || typeof req.query.slug !== 'string') {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  try {
    await res.unstable_revalidate(req.query.slug);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
