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
                  <h2>{formatDateWithDay(program.startDateTime)}</h2>
                  {program.sessions.map((session, index) => {
                    currentTime = addMinutes(
                      currentTime,
                      session.session?.duration || session.duration
                    );
                    return (
                      <Fragment key={index}>
                        <AccordionProgramItem
                          programSession={session}
                          startTime={currentTime}
                        />
                        {index !== program.sessions.length - 1 && <hr />}
                      </Fragment>
                    );
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
