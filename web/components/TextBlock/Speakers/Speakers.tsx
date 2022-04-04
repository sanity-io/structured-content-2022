import type { PortableTextComponentProps } from '@portabletext/react';
import { imageUrlFor } from '../../../lib/sanity';
import type { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import type { Person } from '../../../types/Person';
import type { SimpleCallToAction } from '../../../types/SimpleCallToAction';
import { getCollectionForSelectionType } from '../../../util/entity';
import ButtonLink from '../../ButtonLink';
import GridWrapper from '../../GridWrapper';
import styles from './Speakers.module.css';

type SpeakersProps = {
  type: EntitySectionSelection;
  heading?: string;
  callToAction?: SimpleCallToAction;
  allSpeakers?: Person[];
  speakers?: Person[];
};

export const Speakers = ({
  value: { type, heading, callToAction, allSpeakers, speakers },
}: PortableTextComponentProps<SpeakersProps>) => (
  <section className={styles.container}>
    <GridWrapper>
      <div className={styles.introContent}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        {callToAction && (
          <ButtonLink
            url={
              callToAction.link?.external ||
              callToAction.link?.internal?.slug?.current
            }
            text={callToAction.text}
          />
        )}
      </div>
      <ul className={styles.speakerList}>
        {getCollectionForSelectionType(type, allSpeakers, speakers).map(
          (speaker) => (
            <li key={speaker._id} className={styles.speakerItem}>
              {speaker.photo && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imageUrlFor(speaker.photo)
                    .size(193, 243)
                    .saturation(-100)
                    .url()}
                  alt={speaker.photo.alt || ''}
                  width={193}
                  height={243}
                  className={styles.speakerPhoto}
                />
              )}
              <div className={styles.speakerDetails}>
                <strong className={styles.speakerName}>{speaker.name}</strong>
                <div>
                  {[speaker.title, speaker.company].filter(Boolean).join(', ')}
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </GridWrapper>
  </section>
);
