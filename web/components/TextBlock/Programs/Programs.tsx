import { Fragment } from 'react';
import { PortableTextComponentProps } from '@portabletext/react';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { formatDateWithDay, formatTime } from '../../../util/date';
import { Program } from '../../../types/Program';
import Accordion from '../../Accordion';
import { addMinutes, parseISO } from 'date-fns';
import styles from './Programs.module.css';

type ProgramsProps = {
  type: EntitySectionSelection;
  allPrograms: Program[];
};

export const Programs = ({
  value: { type, allPrograms },
}: PortableTextComponentProps<ProgramsProps>) => {
  if (type === 'all') {
    return (
      <div>
        <Accordion
          items={allPrograms.map((program) => {
            let currentTime = parseISO(program.startDateTime);
            return {
              title: program.internalName,
              content: (
                <div key={program._id}>
                  <h3>{formatDateWithDay(program.startDateTime)}</h3>
                  {program.sessions.map((session, index) => {
                    const Session = (
                      <Fragment key={index}>
                        {session._type === 'padding' ? (
                          <h3>
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
                              {session.session.title}
                              <span className={styles.sessionDuration}>
                                {formatTime(currentTime.toISOString())} -{' '}
                                {formatTime(
                                  addMinutes(
                                    currentTime,
                                    session.session.duration
                                  ).toISOString()
                                )}
                              </span>
                            </div>
                            {index !== program.sessions.length - 1 &&
                              program.sessions[index + 1]?._type !==
                                'padding' && <hr />}
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
      </div>
    );
  }

  if (type === 'none') {
    return null;
  }

  console.error(`Unrecognized Programs type: '${type}'`);
  return null;
};
