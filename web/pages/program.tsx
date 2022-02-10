import Link from 'next/link';
import { Session } from '../types/Session';
import { Venue } from '../types/Venue';
import client from '../lib/sanity.server';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import styles from '../pageResources/shared/shared.module.css';
import Venues from '../pageResources/program/Venues';
import Sessions from '../components/Sessions';
import TextBlock from '../components/TextBlock';
import { RichTextSection } from '../types/RichTextSection';
import Nav from '../components/Nav';

const QUERY = `
  {
    "program": *[_id == "8587d5fc-1143-471f-a4cc-6786dd148702"][0] {
      name,
      sections
    },
    "venues": *[_type == "venue"],
    "sessions": *[_type == "session"] {
      _id,
      title,
      startTime,
      duration,
      location->,
      "speakers": speakers[].person->
    }
  }`;

interface ProgramProps {
  data: {
    program: {
      name: string;
      sections: RichTextSection[];
    };
    sessions: Session[];
    venues: Venue[];
  };
}

const Program = ({
  data: {
    sessions,
    venues,
    program: { name, sections },
  },
}: ProgramProps) => (
  <div className={styles.container}>
    <header>
      <Nav />
      <SectionBlock>
        <Heading>{name}</Heading>
        <Link href="#">Registration</Link>
      </SectionBlock>
    </header>

    <main>
      <TextBlock value={sections} />
      <SectionBlock noBackground>
        <Venues venues={venues} />
      </SectionBlock>

      <Sessions sessions={sessions} />

      <SectionBlock noBackground>
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
    revalidate: 180,
  };
}

export default Program;
