import { PortableTextComponentProps } from '@portabletext/react';
import { imageUrlFor } from '../../../lib/sanity';
import { Figure as TFigure } from '../../../types/Figure';
import GridWrapper from '../../GridWrapper';
import styles from './Figure.module.css';

export const Figure = ({
  value: { asset, alt },
}: PortableTextComponentProps<TFigure>) => (
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
