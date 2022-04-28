import Jimp from 'jimp-compact';
import { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from "path";

export default async function ogImage(req: NextApiRequest, res: NextApiResponse) {
  // Resolves to root of /web directory, __dirname is buggy in Next.js
  const imagePath = resolve('images', 'og_image_background.png');
  const image = await Jimp.read(imagePath);
  //const font = await Jimp.loadFont(resolve('public', 'static', 'fonts', 'national-2-narrow-bold.woff2'));
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  image.print(font, 10, 10, req.query.slug);

  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
}
