import Link from 'next/link';
import client from '../clients/mainClient';
import { formatDateWithTime } from '../util/date';
import blocksToText from '../util/blocksToText';
import { Speaker } from '../../types/Speaker';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import styles from '../pageResources/shared/shared.module.css';

const QUERY = `
  *[_type == "event"][0] {
    name,
    description,
    tagline,
    startDate,
    endDate,
    valueProposition,
    venues[]-> {
      title
    }
  }`;

interface AboutProps {
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

const About = ({
  data: {
    name,
    tagline,
    startDate,
    endDate,
    description,
    valueProposition,
    venues,
  },
}: AboutProps) => (
  <div className={styles.container}>
    <header>
      <SectionBlock>
        <Heading>About {name}</Heading>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock>
        <Heading type="h2">{tagline}</Heading>
        <Paragraph>
          {formatDateWithTime(startDate)} - {formatDateWithTime(endDate)}
        </Paragraph>
        {description}
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Why you should go/what this is</Heading>
        {blocksToText(valueProposition).map((block, i) => (
          <Paragraph key={i}>{block}</Paragraph>
        ))}
      </SectionBlock>

      <SectionBlock style={{ background: 'none' }}>
        <Paragraph>
          <Link href="#">Code of Conduct</Link>
        </Paragraph>

        <Heading type="h2">Conference Locations 2022</Heading>
        {venues.map((venue) => (
          <Link href={`/venues/${venue.title}`} key={venue.title}>
            <a>
              <SectionBlock style={{ margin: '1rem 0' }}>
                {venue.title}
              </SectionBlock>
            </a>
          </Link>
        ))}

        <Heading type="h3">Virtual option info</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. This text is not fetched from
          Sanity.
        </Paragraph>
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Additional info</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. This text is not fetched from
          Sanity.
        </Paragraph>
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Sponsor info</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. This text is not fetched from
          Sanity.
        </Paragraph>
        <Heading type="h3">
          <Link href="#">Become a Sponsor</Link>
        </Heading>
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

export default About;
