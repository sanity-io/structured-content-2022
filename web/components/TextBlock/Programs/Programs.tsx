import { addMinutes, parseISO } from 'date-fns';
import { Fragment } from 'react';
import { PortableTextComponentProps } from '@portabletext/react';
import clsx from 'clsx';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Program } from '../../../types/Program';
import { formatDateWithDay, formatTime } from '../../../util/date';
import Accordion from '../../Accordion';
import GridWrapper from '../../GridWrapper';
import styles from './Programs.module.css';

type ProgramsProps = {
  type: EntitySectionSelection;
  allPrograms: Program[];
};

export const Programs = ({
  value: { type, allPrograms },
  index,
}: PortableTextComponentProps<ProgramsProps>) => {
  if (type === 'all') {
    return (
      <GridWrapper>
        <Accordion
          baseId={`accordion-${index}`}
          items={allPrograms.map((program) => {
            let currentTime = parseISO(program.startDateTime);
            /* This should perhaps be outputting a list instead, i.e. a <dl>
             * or <ul>, rather than a lot of <h4>s. Not done due to dev time
             * constraints.
             */
            return {
              title: program.internalName,
              content: (
                <div key={program._id}>
                  <h3 className={clsx(styles.dayHeader, styles.first)}>
                    {formatDateWithDay(program.startDateTime)}
                  </h3>
                  {program.sessions.map((session, index) => {
                    const Session = (
                      <Fragment key={index}>
                        {session._type === 'padding' ? (
                          <h3 className={styles.dayHeader}>
                            {formatDateWithDay(
                              addMinutes(
                                currentTime,
                                session.duration
                              ).toISOString()
                            )}
                          </h3>
                        ) : (
                          <>
                            <div className={styles.sessionItem}>
                              <h4 className={styles.sessionDuration}>
                                {formatTime(currentTime.toISOString())} -{' '}
                                {formatTime(
                                  addMinutes(
                                    currentTime,
                                    session.session.duration
                                  ).toISOString()
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
      </GridWrapper>
    );
  }

  if (type === 'none') {
    return null;
  }

  console.error(`Unrecognized Programs type: '${type}'`);
  return null;
};