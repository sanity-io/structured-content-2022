import { NextApiRequest, NextApiResponse } from 'next';
import urlJoin from 'proper-url-join';

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.query?.secret) {
    return res.status(401).json({ message: 'No secret token' });
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret token' });
  }

  if (!req.query.slug) {
    return res.status(401).json({ message: 'No slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  return res
    .redirect(307, urlJoin(req?.query?.slug as string, { leadingSlash: true }))
    .end();
}
