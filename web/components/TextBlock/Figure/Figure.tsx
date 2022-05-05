import { PortableTextComponentProps } from '@portabletext/react';
import { imageUrlFor } from '../../../lib/sanity';
import { Figure as TFigure } from '../../../types/Figure';
import GridWrapper from '../../GridWrapper';
import styles from './Figure.module.css';

export const Figure = ({ value }: PortableTextComponentProps<TFigure>) => {
  const imageSrc =
    value && imageUrlFor(value).width(894).ignoreImageParams().url();
  return imageSrc ? (
    <GridWrapper>
      <figure className={styles.container}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={value.alt || ''} className={styles.image} />
      </figure>
    </GridWrapper>
  ) : null;
};
