import type { Figure } from '../../types/Figure';
import { imageUrlFor } from '../../lib/sanity';
import Shape from '../../components/Shape';
import styles from './HighlightedSpeakerBlock.module.css';

interface HighlightedSpeakerBlockProps {
  photo?: Figure;
}

export const HighlightedSpeakerBlock = ({
  photo,
}: HighlightedSpeakerBlockProps) => {
  const photoSrc =
    photo && imageUrlFor(photo).size(336, 480).saturation(-100).url();
  return (
    <div className={styles.container}>
      <div className={styles.column} aria-hidden="true">
        <Shape />
        <Shape />
        <Shape />
      </div>
      <div className={styles.imageColumn}>
        <Shape />
        {photoSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={photoSrc}
            alt={photo.alt || ''}
            className={styles.image}
            width={336}
            height={480}
          />
        ) : (
          <Shape />
        )}
        <Shape />
      </div>
    </div>
  );
};
