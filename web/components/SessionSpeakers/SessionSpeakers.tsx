import clsx from 'clsx';
import Link from 'next/link';
import type { Person } from '../../types/Person';
import { getEntityPath } from '../../util/entityPaths';
import { imageUrlFor } from '../../lib/sanity';
import { useRandomShape } from '../../hooks/useRandomShape';
import styles from './SessionSpeakers.module.css';

interface SessionSpeakersProps {
  speaker1?: Person;
  speaker2?: Person;
}

const Shape = () => (
  <div className={clsx(styles.shape, useRandomShape())} aria-hidden="true" />
);

const Speaker = ({
  speaker,
  variant,
}: {
  speaker: Person;
  variant?: 'desktopOnly' | 'nonDesktop';
}) => {
  const speakerPhotoSrc =
    speaker.photo &&
    imageUrlFor(speaker.photo).size(256, 390).saturation(-100).url();
  return (
    <Link href={getEntityPath(speaker)}>
      <a>
        <figure className={clsx(styles.speaker, variant && styles[variant])}>
          {speakerPhotoSrc && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={speakerPhotoSrc}
              alt={speaker.photo.alt || ''}
              className={styles.image}
              width={256}
              height={390}
            />
          )}
          <figcaption className={styles.caption}>
            {speaker.name && (
              <strong className={styles.speakerName}>{speaker.name}</strong>
            )}
            {[speaker.title, speaker.company].filter(Boolean).join(', ')}
          </figcaption>
        </figure>
      </a>
    </Link>
  );
};

export const SessionSpeakers = ({
  speaker1,
  speaker2,
}: SessionSpeakersProps) => (
  <div className={clsx(styles.container, speaker2 && styles.hasTwoSpeakers)}>
    <div className={styles.column1}>
      <Shape />
      {speaker1 ? <Speaker speaker={speaker1} /> : <Shape />}
      {speaker2 && <Speaker speaker={speaker2} variant="nonDesktop" />}
      <Shape />
    </div>
    <div className={styles.column2} aria-hidden={speaker2 ? undefined : true}>
      <Shape />
      {speaker2 && <Speaker speaker={speaker2} variant="desktopOnly" />}
      <Shape />
      <Shape />
    </div>
  </div>
);
