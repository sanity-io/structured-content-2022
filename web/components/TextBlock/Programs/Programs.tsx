import { parseISO } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
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

export const Programs = ({
  value: { type, heading, allPrograms, programs },
}: PortableTextComponentProps<ProgramsProps>) => {
  const collection = getCollectionForSelectionType(type, allPrograms, programs);
  const venues = collection?.map((program) => program.venues).flat();
  const [activeProgram, setActiveProgram] = useState<Program>(collection?.[0]);

  const onVenueClick = (clickedVenue) => {
    const venue = collection?.find(({ venues }) =>
      venues?.find((v) => v._id === clickedVenue._id)
    );
    setActiveProgram(venue);
  };

  if (type === 'all' || type === 'highlighted') {
    const sessionsPerDay = partition(activeProgram.sessions, (session) => {
      const sessions = mapSessionDurationAndIds(activeProgram);
      const id = session.session?._id ?? session._key;
      const date = sessionStart(activeProgram.startDateTime, id, sessions);
      return formatDateWithDay(date, activeProgram.venues[0].timezone, ', ');
    });

    /* TODO: This is a hack due to the programs redesign being rushed. If the
     * buttons are kept, rather than replaced with links in the near future,
     * the ID should be made globally (for the page) unique using a proper
     * system for it. Perhaps the VenueNav should be made to work as a tab bar
     * too.
     */
    const sessionsId = 'program-sessions-container';

    return (
      <>
        <div className={styles.venueNavContainer}>
          <VenueNav
            venues={venues}
            activeVenue={activeProgram?.venues[0]}
            onVenueClick={onVenueClick}
            ariaControlsId={sessionsId}
          />
        </div>

        <section className={styles.container} id={sessionsId}>
          <GridWrapper>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
          </GridWrapper>

          {Object.keys(sessionsPerDay).map((day) => (
            <section key={day}>
              <div className={styles.dayHeader}>
                <h3 className={styles.dayHeading}>{day}</h3>
                <div className={styles.dayLocation}>
                  {activeProgram?.venues[0].name} (
                  {getNonLocationTimezone(
                    parseISO(activeProgram?.startDateTime),
                    activeProgram?.venues[0]?.timezone,
                    true
                  )}
                  )
                </div>
              </div>

              <ul className={styles.sessions}>
                {sessionsPerDay[day]
                  .filter((session) => session.session)
                  .map((session) => {
                    const start = sessionStart(
                      activeProgram.startDateTime,
                      session.session._id,
                      mapSessionDurationAndIds(activeProgram)
                    );
                    return (
                      <li key={session._key} className={styles.session}>
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
                        <Link href={getEntityPath(session.session)}>
                          <a className={styles.sessionTitleLink}>
                            <h4 className={styles.sessionTitle}>
                              {session.session.title}
                            </h4>
                          </a>
                        </Link>

                        {session.session.speakers
                          ?.filter((speaker) => speaker.person)
                          .map(({ person }) => (
                            <Link key={person._id} href={getEntityPath(person)}>
                              <a className={styles.speaker}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  className={styles.speakerImage}
                                  src={imageUrlFor(person.photo)
                                    .size(40, 40)
                                    .url()}
                                  width={40}
                                  height={40}
                                  alt={person.name}
                                />

                                <div>
                                  <div className={styles.speakerName}>
                                    {person.name}
                                  </div>
                                  <div className={styles.speakerTitle}>
                                    {[person.title, person.company]
                                      .filter(Boolean)
                                      .join(', ')}
                                  </div>
                                </div>
                              </a>
                            </Link>
                          ))}
                      </li>
                    );
                  })}
              </ul>
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
