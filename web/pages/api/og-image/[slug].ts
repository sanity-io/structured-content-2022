import Jimp from 'jimp-compact';
import { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from "path";
import wrap from "word-wrap";

export default async function ogImage(req: NextApiRequest, res: NextApiResponse) {
  // Resolves to root of /web directory, __dirname is buggy in Next.js
  const imagePath = resolve('images', 'og_image_background.png');
  const image = await Jimp.read(imagePath);

  const pngFontPath = resolve('public', 'static', 'fonts', 'national-2-narrow-bold.png');
  console.log(pngFontPath); // Make Vercel include this file (referenced by .fnt below) in lambda

  const font = await Jimp.loadFont(resolve('public', 'static', 'fonts', 'national-2-narrow-bold.fnt'));
  wrap(req.query.slug as string, { width: 26 }).split('\n').forEach((line, i) => {
    image.print(font, 32, 40 + i * 80, line);
  });

  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
}
