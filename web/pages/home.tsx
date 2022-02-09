import Link from 'next/link';
import client from '../lib/sanity.server';
import { formatDateWithTime } from '../util/date';
import blocksToText from '../util/blocksToText';
import { Speaker } from '../types/Speaker';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Speakers from '../pageResources/home/Speakers';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import styles from '../pageResources/shared/shared.module.css';

const QUERY = `
  *[_type == "event"][0] {
    name,
    description,
    tagline,
    startDate,
    endDate,
    microcopy,
    promotedSpeakers[]-> {
      name,
      title,
      bio,
      "photo": photo.asset->url,
      "twitter": social.twitter,
    },
    valueProposition,
    venues[]-> {
      title
    }
  }`;

interface HomeProps {
  data: {
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
    valueProposition: {
      _key: string;
      _type: string;
      children: {
        _key: string;
        _type: string;
        marks: [];
        text: string;
      }[];
      markDefs: [];
      style: string;
    }[];
    venues: {
      title: string;
    }[];
  };
}

const Home = ({
  data: {
    name,
    tagline,
    startDate,
    endDate,
    description,
    microcopy,
    promotedSpeakers,
    valueProposition,
    venues,
  },
}: HomeProps) => (
  <div className={styles.container}>
    <header>
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
        <Heading type="h2">{'Registration/Sign up/tickets ->'}</Heading>
        {microcopy.map(({ key, action, text }) => (
          <Link key={key} href={action}>
            {text}
          </Link>
        ))}
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Why you should go/what this is</Heading>
        {blocksToText(valueProposition).map((block, i) => (
          <Paragraph key={i}>{block}</Paragraph>
        ))}
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">
          <Link href="#">{'Speakers ->'}</Link>
        </Heading>
        <Speakers speakers={promotedSpeakers} />
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">{'Program ->'}</Heading>

        <Heading type="h3">
          <Link href="#">{'Venues ->'}</Link>
        </Heading>
        <ul>
          {venues.map(({ title }) => (
            <li key={title}>
              <Link href="#">{title}</Link>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Sponsors</Heading>
        <Paragraph>
          <Heading type="h3">
            <Link href="#">{'Become a Sponsor ->'}</Link>
          </Heading>
        </Paragraph>
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Get conference updates</Heading>
        <ConferenceUpdatesForm />
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

export default Home;
