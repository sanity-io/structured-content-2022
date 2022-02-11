import Link from 'next/link';
import client from '../lib/sanity.server';
import { formatDateWithTime } from '../util/date';
import { Speaker } from '../types/Speaker';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Speakers from '../pageResources/home/Speakers';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import TextBlock from '../components/TextBlock';
import { Section } from '../types/Section';
import { Sponsor } from '../types/Sponsor';
import Sponsors from '../pageResources/home/Sponsors';
import Nav from '../components/Nav';
import PageContainer from '../components/PageContainer';

const QUERY = `
  {
    "home": *[_type == "event"][0] {
      name,
      description,
      tagline,
      startDate,
      endDate,
      microcopy,
      promotedSpeakers[]-> {
        _id,
        name,
        title,
        bio,
        "photo": photo.asset->url,
        "twitter": social.twitter,
      },
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
      promotedSpeakers: Speaker[];
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
  <PageContainer>
    <header>
      <Nav />
      <SectionBlock>
        <Heading>{name}</Heading>
        {tagline}
        <Paragraph>
          {formatDateWithTime(startDate)} - {formatDateWithTime(endDate)}
        </Paragraph>
        {description}
      </SectionBlock>
    </header>

    <main>
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

export default Home;
