import clsx from 'clsx';
import { addMinutes, parseISO } from 'date-fns';
import { Fragment } from 'react';
import { PortableTextComponentProps } from '@portabletext/react';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Program } from '../../../types/Program';
import { getCollectionForSelectionType } from '../../../util/entity';
import {
  formatDateWithDay,
  formatTime,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../../util/date';
import Accordion from '../../Accordion';
import GridWrapper from '../../GridWrapper';
import styles from './Programs.module.css';

type ProgramsProps = {
  type: EntitySectionSelection;
  heading?: string;
  allPrograms: Program[];
  programs?: Program[];
};

export const Programs = ({
  value: { type, heading, allPrograms, programs },
  index,
}: PortableTextComponentProps<ProgramsProps>) => {
  if (type === 'all' || type === 'highlighted') {
    return (
      <GridWrapper>
        <section className={styles.container}>
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          <Accordion
            baseId={`accordion-${index}`}
            items={getCollectionForSelectionType(
              type,
              allPrograms,
              programs
            ).map((program) => {
              const firstVenue = program?.venues[0];
              const programName = firstVenue?.name || program.internalName;
              const timezone = firstVenue?.timezone || 'UTC';
              let currentTime = parseISO(program.startDateTime);
              const formattedTimezone = getNonLocationTimezone(
                currentTime,
                timezone
              );
              /* This should perhaps be outputting a list instead, i.e. a <dl>
               * or <ul>, rather than a lot of <h4>s. Not done due to dev time
               * constraints.
               */
              return {
                title: `${programName} - ${formattedTimezone}`,
                content: (
                  <div key={program._id}>
                    <h3 className={clsx(styles.dayHeader, styles.first)}>
                      {formatDateWithDay(
                        parseISO(program.startDateTime),
                        timezone
                      )}
                    </h3>
                    {program.sessions.map((session, index) => {
                      const Session = (
                        <Fragment key={index}>
                          {session._type === 'padding' ? (
                            <h3 className={styles.dayHeader}>
                              {formatDateWithDay(
                                addMinutes(currentTime, session.duration),
                                timezone
                              )}
                            </h3>
                          ) : (
                            <>
                              <div className={styles.sessionItem}>
                                <h4 className={styles.sessionDuration}>
                                  {formatTimeRange(
                                    currentTime,
                                    session.session.duration,
                                    timezone
                                  )}
                                </h4>
                                <div>{session.session.title}</div>
                              </div>
                            </>
                          )}
                        </Fragment>
                      );

                      currentTime = addMinutes(
                        currentTime,
                        session.session?.duration || session.duration
                      );
                      return Session;
                    })}
                  </div>
                ),
              };
            })}
          />
        </section>
      </GridWrapper>
    );
  }

  if (type === 'none') {
    return null;
  }

  console.error(`Unrecognized Programs type: '${type}'`);
  return null;
};
