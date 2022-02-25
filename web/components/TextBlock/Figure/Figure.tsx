import { PortableTextComponentProps } from '@portabletext/react';
import { imageUrlFor } from '../../../lib/sanity';
import GridWrapper from '../../GridWrapper';
import styles from './Figure.module.css';

type FigureProps = {
  alt: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  _key: string;
  _type: 'figure';
};

export const Figure = ({
  value: { asset, alt },
}: PortableTextComponentProps<FigureProps>) => (
  <GridWrapper>
    <figure className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrlFor(asset).width(894).ignoreImageParams().url()}
        alt={alt}
        className={styles.image}
      />
    </figure>
  </GridWrapper>
);
