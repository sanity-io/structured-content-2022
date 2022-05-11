import { parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import type { PortableTextComponentProps } from '@portabletext/react';
import type { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import type { Program, ProgramSession } from '../../../types/Program';
import type { Session } from '../../../types/Session';
import type { Venue } from '../../../types/Venue';
import { partition } from '../../../util/array';
import {
  defaultTimezone,
  formatDateWithDay,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../../util/date';
import { getCollectionForSelectionType } from '../../../util/entity';
import { getEntityPath } from '../../../util/entityPaths';
import {
  getDuration,
  mapSessionDurationAndIds,
  sessionStart,
} from '../../../util/session';
import { imageUrlFor } from '../../../lib/sanity';
import GridWrapper from '../../GridWrapper';
import VenueNav from '../../VenueNav';
import styles from './Programs.module.css';

type ProgramsProps = {
  type: EntitySectionSelection;
  heading?: string;
  allPrograms: Program[];
  programs?: Program[];
  mainVenue?: Venue;
};

const shouldLinkToSession = (session?: Session) =>
  session?.type && !['break', 'social'].includes(session.type);

interface SessionSectionProps {
  session: ProgramSession & { session: Session };
  activeProgram: Program;
  start: Date;
}

const SessionSection = ({
  session,
  activeProgram,
  start,
}: SessionSectionProps) => {
  const speakers = session.session.speakers?.filter(
    (speaker) => speaker.person
  );
  const timezone = activeProgram.venues[0]?.timezone || defaultTimezone;
  return (
    <section className={styles.session}>
      <GridWrapper>
        <div className={styles.sessionContents}>
          <div className={styles.sessionTime}>
            {formatTimeRange(start, getDuration(session), timezone)}{' '}
            {getNonLocationTimezone(start, timezone, true)}
          </div>
          <div className={styles.sessionMain}>
            <h4 className={styles.sessionTitle}>{session.session.title}</h4>

            {speakers && (
              <ul className={styles.speakers}>
                {speakers.map(({ person }) => {
                  const personPhotoSrc = imageUrlFor(person.photo)
                    .size(160, 160)
                    .saturation(-100)
                    .url();
                  return (
                    <li key={person._id} className={styles.speaker}>
                      {personPhotoSrc && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          className={styles.speakerImage}
                          src={personPhotoSrc}
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
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </GridWrapper>
    </section>
  );
};

const findByVenueSlug = (programs: Program[], venueSlug?: string) =>
  venueSlug &&
  programs.find(({ venues }) => venues[0]?.slug.current === venueSlug);

/* Type predicate for ProgramSession that we know to have an associated Session.
 * Used to filter out e.g. 'padding' sessions.
 */
const hasSession = (
  session: ProgramSession
): session is ProgramSession & { session: Session } =>
  Boolean(session?.session);

export const Programs = ({
  value: { type, heading, allPrograms, programs, mainVenue },
}: PortableTextComponentProps<ProgramsProps>) => {
  const collection = getCollectionForSelectionType(type, allPrograms, programs);
  const venues = collection?.map((program) => program.venues).flat();
  const router = useRouter();
  const venueName = router.query.venue as string;
  const activeProgram = findByVenueSlug(collection, venueName) || programs?.[0];
  if (!activeProgram) {
    console.error(`No activeProgram found for Venue slug '${venueName}'`);
    return null;
  }

  if (type === 'all' || type === 'highlighted') {
    const activeVenue = activeProgram.venues?.[0];
    const { address } = activeVenue || {};
    const sessionsPerDay = partition(activeProgram.sessions, (session) => {
      const sessions = mapSessionDurationAndIds(activeProgram);
      const id = session.session?._id ?? session._key;
      const date = sessionStart(activeProgram.startDateTime, id, sessions);
      const timezone = activeVenue?.timezone || defaultTimezone;
      return (date && formatDateWithDay(date, timezone, ', ')) || '';
    });

    const formattedAddress =
      address &&
      [
        address.name,
        address.street,
        [
          address.city,
          [address.state, address.postalCode].filter(Boolean).join(' '),
        ]
          .filter(Boolean)
          .join(', '),
      ].filter(Boolean);
    return (
      <>
        <div className={styles.venueNavContainer}>
          <VenueNav {...{ activeVenue, venues, mainVenue }} />
        </div>

        {formattedAddress && (
          <GridWrapper>
            <p className={styles.venueAddress}>
              {formattedAddress.map((line, index) => (
                <Fragment key={index}>
                  {line}
                  {index !== formattedAddress.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
          </GridWrapper>
        )}

        <section className={styles.container}>
          {heading && (
            <GridWrapper>
              <h2 className={styles.heading}>{heading}</h2>
            </GridWrapper>
          )}

          {Object.keys(sessionsPerDay).map((day) => (
            <section key={day}>
              <div className={styles.dayHeader}>
                <GridWrapper>
                  <h3 className={styles.dayHeading}>{day}</h3>
                  <div className={styles.dayLocation}>
                    {activeProgram.venues?.[0]?.name} (
                    {getNonLocationTimezone(
                      parseISO(activeProgram.startDateTime),
                      activeProgram.venues?.[0]?.timezone || defaultTimezone,
                      true
                    )}
                    )
                  </div>
                </GridWrapper>
              </div>

              {sessionsPerDay[day].filter(hasSession).map((session) => {
                const start = sessionStart(
                  activeProgram.startDateTime,
                  session.session._id,
                  mapSessionDurationAndIds(activeProgram)
                );
                if (!start) {
                  return null;
                }

                return shouldLinkToSession(session.session) ? (
                  <Link
                    href={getEntityPath(session.session)}
                    key={session._key}
                  >
                    <a className={styles.sessionLink}>
                      <SessionSection {...{ session, activeProgram, start }} />
                    </a>
                  </Link>
                ) : (
                  <SessionSection
                    key={session._key}
                    {...{ session, activeProgram, start }}
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
