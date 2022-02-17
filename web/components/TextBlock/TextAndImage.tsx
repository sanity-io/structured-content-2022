import Image from 'next/image';
import { imageUrlFor } from '../../lib/sanity';
import Heading from '../Heading';
import { Block } from './Block';

export const TextAndImage = ({ value: { image, tagline, text, title } }) => (
  <>
    <Heading type="h2">{title}</Heading>
    <Heading type="h3">{tagline}</Heading>
    {text.map((value) => (
      <Block key={value._key} value={value} />
    ))}
    <div>
      <Image
        src={imageUrlFor(image).size(200, 200).url()}
        width={200}
        height={200}
        alt=""
      />
    </div>
  </>
);
