import Link from 'next/link';
import client from '../lib/sanity.server';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import { groq } from 'next-sanity';
import TextBlock from '../components/TextBlock';
import { RichTextSection } from '../types/RichTextSection';
import Nav from '../components/Nav';
import PageContainer from '../components/PageContainer';
import { getEntityPath } from "../util/entityPaths";
import { Venue } from "../types/Venue";

const QUERY = groq`
  {
    "event": *[_type == "event"][0] {
      venues[]->
    },
    "about": *[_id == "4ab00530-7310-4f04-8f90-8be04e747eaa"][0] {
      name,
      sections
    }
  }`;

interface AboutProps {
  data: {
    event: {
      venues: Venue[];
    };
    about: {
      name: string;
      sections: RichTextSection[];
    };
  };
}

const About = ({
  data: {
    event: { venues },
    about: { name, sections },
  },
}: AboutProps) => (
  <PageContainer>
    <header>
      <Nav />
      <SectionBlock>
        <Heading>{name}</Heading>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock>
        <TextBlock value={sections} />
      </SectionBlock>

      <SectionBlock noBackground>
        <Paragraph>
          <Link href="#">Code of Conduct</Link>
        </Paragraph>
      </SectionBlock>

      <SectionBlock noBackground>
        <Heading type="h2">Conference Locations 2022</Heading>
        {venues.map((venue) => (
          <Link href={getEntityPath(venue)} key={venue.title}>
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

export default About;
