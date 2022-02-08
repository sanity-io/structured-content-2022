import Link from 'next/link';
import { Session as TSession } from "../../types/Session";
import { Venue } from "../../types/Venue";
import client from '../clients/mainClient';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import styles from '../pageResources/shared/shared.module.css';
import Venues from "../pageResources/program/Venues";
import Session from "../pageResources/program/Session";

const QUERY = `
  {
    "venues": *[_type == "venue"],
    "sessions": *[_type == "session"] {
      title,
      startTime,
      duration,
      location->,
      "speakers": speakers[].person->
    }
  }`;

interface ProgramProps {
  data: {
    sessions: TSession[];
    venues: Venue[];
  }
}

const Program = ({ data: { sessions, venues } }: ProgramProps) => (
  <div className={styles.container}>
    <header>
      <SectionBlock>
        <Heading>Structured Content 2022 Program</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. This text is not fetched from
          Sanity.
        </Paragraph>
        <Link href="#">Registration</Link>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock style={{ background: "none" }}>
        <Venues venues={venues} />
      </SectionBlock>

      {sessions.map((session) => (
        <Session session={session} key={session.title} />
      ))}

      <SectionBlock style={{ background: "none" }}>
        <Link href="#">Registration</Link>
      </SectionBlock>
    </main>
  </div>
);

export async function getStaticProps() {
  return {
    props: {
      data: await client.fetch(QUERY),
    },
  };
}

export default Program;
