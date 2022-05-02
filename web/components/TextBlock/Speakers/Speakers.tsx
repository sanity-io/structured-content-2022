import type { PortableTextComponentProps } from '@portabletext/react';
import Link from 'next/link';
import { imageUrlFor } from '../../../lib/sanity';
import type { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import type { FrontpagePerson } from '../../../types/Person';
import type { SimpleCallToAction as TSimpleCallToAction } from '../../../types/SimpleCallToAction';
import { getCollectionForSelectionType } from '../../../util/entity';
import { getEntityPath } from '../../../util/entityPaths';
import GridWrapper from '../../GridWrapper';
import SimpleCallToAction from '../../SimpleCallToAction';
import styles from './Speakers.module.css';

type SpeakersProps = {
  type: EntitySectionSelection;
  heading?: string;
  callToAction?: TSimpleCallToAction;
  allSpeakers: FrontpagePerson[];
  speakers?: FrontpagePerson[];
};

export const Speakers = ({
  value: { type, heading, callToAction, allSpeakers, speakers },
}: PortableTextComponentProps<SpeakersProps>) => (
  <section className={styles.container}>
    <GridWrapper>
      {(heading || callToAction) && (
        <div className={styles.introContent}>
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          <SimpleCallToAction {...callToAction} />
        </div>
      )}
      <ul className={styles.speakerList}>
        {getCollectionForSelectionType(type, allSpeakers, speakers).map(
          (speaker) => {
            const speakerPhotoSrc =
              speaker.photo &&
              imageUrlFor(speaker.photo).size(410, 410).saturation(-100).url();
            return (
              <li key={speaker._id} className={styles.speakerItem}>
                <Link href={getEntityPath(speaker)}>
                  <a className={styles.speakerLink}>
                    {speakerPhotoSrc && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={speakerPhotoSrc}
                        alt={speaker.photo.alt || ''}
                        width={410}
                        height={410}
                        className={styles.speakerPhoto}
                      />
                    )}
                    <div className={styles.speakerDetails}>
                      <strong className={styles.speakerName}>
                        {speaker.name}
                      </strong>
                      <div>
                        {[speaker.title, speaker.company]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </GridWrapper>
  </section>
);
