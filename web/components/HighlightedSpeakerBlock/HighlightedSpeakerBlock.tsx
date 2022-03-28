import type { Figure } from '../../types/Figure';
import { imageUrlFor } from '../../lib/sanity';
import Shape from '../../components/Shape';
import styles from './HighlightedSpeakerBlock.module.css';

interface HighlightedSpeakerBlockProps {
  photo: Figure;
}

export const HighlightedSpeakerBlock = ({
  photo,
}: HighlightedSpeakerBlockProps) => (
  <div className={styles.shapesContainer}>
    <div className={styles.shapesColumn}>
      <Shape />
      <Shape />
      <Shape />
    </div>
    <div className={styles.speakerImageColumn}>
      <Shape />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrlFor(photo).size(336, 480).saturation(-100).url()}
        alt={photo?.alt || ''}
        className={styles.speakerImage}
        width={336}
        height={480}
      />
      <Shape />
    </div>
  </div>
);
