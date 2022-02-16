import Link from 'next/link';
import { Session } from '../types/Session';
import client from '../lib/sanity.server';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Sessions from '../components/Sessions';
import TextBlock from '../components/TextBlock';
import { RichTextSection } from '../types/RichTextSection';
import Nav from '../components/Nav';
import PageContainer from '../components/PageContainer';

const QUERY = `
  {
    "program": *[_id == "8587d5fc-1143-471f-a4cc-6786dd148702"][0] {
      name,
      sections
    },
    "venues": *[_type == "venue"],
    "sessions": *[_type == "session"] {
      ...,
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
  };
}

const Program = ({
  data: {
    sessions,
    program: { name, sections },
  },
}: ProgramProps) => (
  <PageContainer>
    <header>
      <Nav />
      <SectionBlock>
        <Heading>{name}</Heading>
        <Link href="#">Registration</Link>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock>
        <TextBlock value={sections} />
      </SectionBlock>

      <Sessions sessions={sessions} />

      <SectionBlock noBackground>
        <Link href="#">Registration</Link>
      </SectionBlock>
    </main>
  </PageContainer>
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