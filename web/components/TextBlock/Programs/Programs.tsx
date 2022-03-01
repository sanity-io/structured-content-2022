import { Fragment } from 'react';
import { PortableTextComponentProps } from '@portabletext/react';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Program } from '../../../types/Program';
import AccordionProgramItem from '../../AccordionProgramItem';
import Accordion from '../../Accordion';
import { formatDateWithDay } from '../../../util/date';
import { addMinutes, parseISO } from 'date-fns';

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
                            {formatDateWithDay(currentTime.toISOString())}
                          </h3>
                        ) : (
                          <>
                            <AccordionProgramItem
                              programSession={session}
                              startTime={currentTime}
                            />
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
