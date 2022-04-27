import { parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { PortableTextComponentProps } from '@portabletext/react';
import type { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import type { Program } from '../../../types/Program';
import { partition } from '../../../util/array';
import {
  formatDateWithDay,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../../util/date';
import { getCollectionForSelectionType } from '../../../util/entity';
import { getEntityPath } from '../../../util/entityPaths';
import { getDuration, sessionStart } from '../../../util/session';
import { imageUrlFor } from '../../../lib/sanity';
import GridWrapper from '../../GridWrapper';
import VenueNav from '../../VenueNav';
import styles from './Programs.module.css';

type ProgramsProps = {
  type: EntitySectionSelection;
  heading?: string;
  allPrograms: Program[];
  programs?: Program[];
};

// Add an _id field to 'padding'-type sessions and normalize duration
// in order to calculate start/end offsets for all sessions
const mapSessionDurationAndIds = (program: Program) =>
  program.sessions.map((session) => ({
    ...session,
    duration: getDuration(session),
    _id: session?.session?._id ?? session._key,
  }));

const shouldLinkToSession = (session) =>
  !['break', 'social'].includes(session.type);

const SessionSection = ({ session, activeProgram, start }) => (
  <section className={styles.session}>
    <GridWrapper>
      <div className={styles.sessionContents}>
        <div className={styles.sessionTime}>
          {formatTimeRange(
            start,
            getDuration(session),
            activeProgram.venues[0]?.timezone
          )}{' '}
          {getNonLocationTimezone(
            start,
            activeProgram.venues[0]?.timezone,
            true
          )}
        </div>
        <div className={styles.sessionMain}>
          <h4 className={styles.sessionTitle}>{session.session.title}</h4>

          {session.session.speakers && (
            <ul className={styles.speakers}>
              {session.session.speakers
                ?.filter((speaker) => speaker.person)
                .map(({ person }) => (
                  <li key={person._id} className={styles.speaker}>
                    {person.photo && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        className={styles.speakerImage}
                        src={imageUrlFor(person.photo)
                          .size(160, 160)
                          .saturation(-100)
                          .url()}
                        width={40}
                        height={40}
                        alt={person.photo.alt || ''}
                      />
                    )}

                    <div>
                      <strong className={styles.speakerName}>
                        {person.name}
                      </strong>
                      <div>
                        {[person.title, person.company]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </GridWrapper>
  </section>
);

const findByVenueSlug = (programs: Program[], venueSlug?: string) =>
  venueSlug &&
  programs.find(({ venues }) => venues[0]?.slug.current === venueSlug);

export const Programs = ({
  value: { type, heading, allPrograms, programs },
}: PortableTextComponentProps<ProgramsProps>) => {
  const collection = getCollectionForSelectionType(type, allPrograms, programs);
  const venues = collection?.map((program) => program.venues).flat();
  const router = useRouter();
  const venue = router.query.venue as string;
  const activeProgram = findByVenueSlug(collection, venue) || programs?.[0];
  if (!activeProgram) {
    console.error(`No activeProgram found for Venue slug '${venue}'`);
    return null;
  }

  if (type === 'all' || type === 'highlighted') {
    const sessionsPerDay = partition(activeProgram.sessions, (session) => {
      const sessions = mapSessionDurationAndIds(activeProgram);
      const id = session.session?._id ?? session._key;
      const date = sessionStart(activeProgram.startDateTime, id, sessions);
      return formatDateWithDay(date, activeProgram.venues?.[0]?.timezone, ', ');
    });

    return (
      <>
        <div className={styles.venueNavContainer}>
          <VenueNav venues={venues} activeVenue={activeProgram.venues[0]} />
        </div>

        <section className={styles.container}>
          <GridWrapper>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
          </GridWrapper>

          {Object.keys(sessionsPerDay).map((day) => (
            <section key={day}>
              <div className={styles.dayHeader}>
                <GridWrapper>
                  <h3 className={styles.dayHeading}>{day}</h3>
                  <div className={styles.dayLocation}>
                    {activeProgram.venues?.[0]?.name} (
                    {getNonLocationTimezone(
                      parseISO(activeProgram.startDateTime),
                      activeProgram.venues?.[0]?.timezone,
                      true
                    )}
                    )
                  </div>
                </GridWrapper>
              </div>

              {sessionsPerDay[day]
                .filter((session) => session.session)
                .map((session) => {
                  const start = sessionStart(
                    activeProgram.startDateTime,
                    session.session._id,
                    mapSessionDurationAndIds(activeProgram)
                  );
                  return shouldLinkToSession(session.session) ? (
                    <Link
                      href={getEntityPath(session.session)}
                      key={session._key}
                    >
                      <a className={styles.sessionLink}>
                        <SessionSection
                          {...{ session, activeProgram, start }}
                        />
                      </a>
                    </Link>
                  ) : (
                    <SessionSection
                      {...{ session, activeProgram, start }}
                      key={session._key}
                    />
                  );
                })}
            </section>
          ))}
        </section>
      </>
    );
  }

  if (type === 'none') {
    return null;
  }

  console.error(`Unrecognized Programs type: '${type}'`);
  return null;
};
