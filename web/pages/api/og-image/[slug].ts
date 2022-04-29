import Jimp from 'jimp-compact';
import { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from 'path';
import wrap from 'word-wrap';

// Make Vercel include this file (referenced by .fnt below) in lambda
resolve('public', 'static', 'fonts', 'national-2-narrow-bold-min.png');

const FONT_SIZE = 80;
const PADDING_X = 32;
const PADDING_Y = 40;
const WORD_WRAP_LIMIT = 26;

export default async function ogImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Resolves to root of /web directory, __dirname is buggy in Next.js
    const imagePath = resolve('images', 'og_image_background.png');
    const image = await Jimp.read(imagePath);

    const font = await Jimp.loadFont(
      resolve('public', 'static', 'fonts', 'national-2-narrow-bold.fnt')
    );
    wrap(req.query.slug as string, { width: WORD_WRAP_LIMIT })
      .split('\n')
      .forEach((line, i) =>
        image.print(font, PADDING_X, PADDING_Y + i * FONT_SIZE, line)
      );

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
