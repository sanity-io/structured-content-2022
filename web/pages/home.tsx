import Link from 'next/link';
import client from '../lib/sanity.server';
import { Person } from '../types/Person';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Speakers from '../pageResources/home/Speakers';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import TextBlock from '../components/TextBlock';
import { Section } from '../types/Section';
import { Sponsor } from '../types/Sponsor';
import Sponsors from '../pageResources/home/Sponsors';
import GridWrapper from '../components/GridWrapper';
import ConferenceHeader from '../components/ConferenceHeader';
import NavBlock from '../components/NavBlock';

const QUERY = `
  {
    "home": *[_type == "event"][0] {
      name,
      description,
      tagline,
      startDate,
      endDate,
      microcopy,
      promotedSpeakers[]->,
      valueProposition,
    },
    "sponsors": *[_type == "sponsor"] {
      ...,
      sponsorship->
    }
  }`;

interface HomeProps {
  data: {
    home: {
      name: string;
      description: string;
      tagline: string;
      startDate: string;
      endDate: string;
      microcopy: {
        _key: string;
        key: string;
        action: string;
        text: string;
        type: 'link';
      }[];
      promotedSpeakers: Person[];
      valueProposition: Section[];
    };
    sponsors: Sponsor[];
  };
}

const Home = ({
  data: {
    home: {
      name,
      tagline,
      startDate,
      endDate,
      description,
      microcopy,
      promotedSpeakers,
      valueProposition,
    },
    sponsors,
  },
}: HomeProps) => (
  <GridWrapper>
    <ConferenceHeader
      name={name}
      startDate={startDate}
      endDate={endDate}
      description={description}
    />

    <NavBlock />

    <SectionBlock>
      {microcopy.map(({ key, action, text }) => (
        <Link key={key} href={action}>
          {text}
        </Link>
      ))}
    </SectionBlock>

    <SectionBlock>
      <TextBlock value={valueProposition} />
    </SectionBlock>

    <SectionBlock>
      <Speakers speakers={promotedSpeakers} />
    </SectionBlock>

    <SectionBlock>
      <Heading type="h2">
        <Link href="/program">
          <a>{'Program ->'}</a>
        </Link>
      </Heading>
    </SectionBlock>

    <SectionBlock>
      <Heading type="h2">Sponsors</Heading>
      <Sponsors sponsors={sponsors} />
      <Link href="/sponsor">{'Become a Sponsor ->'}</Link>
    </SectionBlock>

    <SectionBlock>
      <Heading type="h2">Get conference updates</Heading>
      <ConferenceUpdatesForm />
    </SectionBlock>
  </GridWrapper>
);

export async function getStaticProps() {
  return {
    props: {
      data: await client.fetch(QUERY),
    },
    revalidate: 180,
  };
}

export default Home;
