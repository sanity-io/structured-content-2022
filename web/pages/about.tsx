import Link from 'next/link';
import client from '../lib/sanity.server';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import styles from '../pageResources/shared/shared.module.css';
import { groq } from 'next-sanity';
import TextBlock from '../components/TextBlock';
import { Section } from '../types/Section';

const QUERY = groq`
  {
    "event": *[_type == "event"][0] {
      venues[]-> {
        title
      }
    },
    "about": *[_id == "4ab00530-7310-4f04-8f90-8be04e747eaa"][0] {
      name,
      sections
    }
  }`;

interface AboutProps {
  data: {
    event: {
      venues: {
        title: string;
      }[];
    };
    about: {
      name: string;
      sections: Section[];
    };
  };
}

const About = ({
  data: {
    event: { venues },
    about: { name, sections },
  },
}: AboutProps) => (
  <div className={styles.container}>
    <header>
      <SectionBlock>
        <Heading>{name}</Heading>
      </SectionBlock>
    </header>

    <main>
      <TextBlock value={sections} />

      <SectionBlock noBackground>
        <Paragraph>
          <Link href="#">Code of Conduct</Link>
        </Paragraph>
      </SectionBlock>

      <SectionBlock noBackground>
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
