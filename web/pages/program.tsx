import { Fragment } from 'react';
import client from '../lib/sanity.server';
import Accordion from '../components/Accordion';
import { Session } from '../types/Session';
import { formatDateWithDay } from '../util/date';
import AccordionProgramItem from '../components/AccordionProgramItem';

const QUERY = `
  {
    "programs": *[_type == "program"] {
      ...,
      sessions[] {
        ...,
        session-> {
          ...,
          events->
        },
      },
      venues[]->,
    },
  }`;

interface ProgramProps {
  data: {
    programs: {
      internalName: string;
      _id: string;
      startDateTime: string;
      sessions: {
        duration?: number;
        _key: string;
        _type: 'padding' | 'slot';
        session?: Session;
      }[];
    }[];
  };
}

const Program = ({ data: { programs } }: ProgramProps) => (
  <Accordion
    items={programs.map((program) => ({
      title: program.internalName,
      content: (
        <div key={program._id}>
          <h2>{formatDateWithDay(program.startDateTime)}</h2>
          {program.sessions.map((session, index) => (
            <Fragment key={session._key}>
              <AccordionProgramItem programSession={session} />
              {index !== program.sessions.length - 1 && <hr />}
            </Fragment>
          ))}
        </div>
      ),
    }))}
  />
);

export async function getStaticProps() {
  return {
    props: {
      data: await client.fetch(QUERY),
    },
    revalidate: 180,
  };
}

export default Program;
