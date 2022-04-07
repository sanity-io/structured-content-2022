import clsx from 'clsx';
import type { Figure } from '../../types/Figure';
import { imageUrlFor } from '../../lib/sanity';
import { useRandomShape } from '../../hooks/useRandomShape';
import styles from './SessionSpeakers.module.css';

interface SessionSpeakersProps {
  photo?: Figure;
  photo2?: Figure;
}

const Shape = () => (
  <div className={clsx(styles.shape, useRandomShape())} aria-hidden="true" />
);

const Speaker = ({ photo, variant }) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    src={imageUrlFor(photo).size(256, 390).saturation(-100).url()}
    alt={photo.alt || ''}
    className={clsx(styles.image, styles[variant])}
    width={256}
    height={390}
  />
);

export const SessionSpeakers = ({ photo, photo2 }: SessionSpeakersProps) => (
  <div className={clsx(styles.container, photo2 && styles.hasTwoSpeakers)}>
    <div className={styles.column1}>
      <Shape />
      {photo ? <Speaker photo={photo} /> : <Shape />}
      {photo2 && <Speaker photo={photo2} variant="nonDesktop" />}
      <Shape />
    </div>
    <div className={styles.column2} aria-hidden={photo2 ? null : 'true'}>
      <Shape />
      {photo2 && <Speaker photo={photo2} variant="desktopOnly" />}
      <Shape />
      <Shape />
    </div>
  </div>
);
