import Jimp from 'jimp-compact';
import { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from 'path';

// Make Vercel include this file (referenced by .fnt below) in lambda
resolve('fonts', 'national-2-narrow-bold.png');

const PADDING_X = 32;
const PADDING_Y = 40;
const MAX_WIDTH = 752;

export default async function ogImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Resolves to root of /web directory, __dirname is buggy in Next.js
    const imagePath = resolve('images', 'og_image_background.png');
    const image = await Jimp.read(imagePath);

    const fontPath = resolve('fonts', 'national-2-narrow-bold.fnt');
    const font = await Jimp.loadFont(fontPath);

    const slug = req.query.slug as string;
    image.print(font, PADDING_X, PADDING_Y, slug, MAX_WIDTH);
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
    });
    res.end(buffer, 'binary');
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
