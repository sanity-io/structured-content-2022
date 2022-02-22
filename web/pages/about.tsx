import { groq } from 'next-sanity';
import client from '../lib/sanity.server';
import { RichTextSection } from '../types/RichTextSection';
import { Venue } from '../types/Venue';
import Hero from '../components/Hero';
import SectionBlock from '../components/SectionBlock';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import TextBlock from '../components/TextBlock';
import GridWrapper from '../components/GridWrapper';
import VenueNames from '../components/VenueNames';

const QUERY = groq`
  {
    "venues": *[_type == "venue"],
    "about": *[_id == "4ab00530-7310-4f04-8f90-8be04e747eaa"][0] {
      name,
      sections[0]
    },
    "conferenceLocations": *[_id == "4ab00530-7310-4f04-8f90-8be04e747eaa"][0] {
      sections[2]
    },
    "codeOfConduct": *[_id == "4ab00530-7310-4f04-8f90-8be04e747eaa"][0] {
      sections[3]
    },
    "sponsorship": *[_id == "4ab00530-7310-4f04-8f90-8be04e747eaa"][0] {
      sections[4]->
    },
  }`;

interface AboutProps {
  data: {
    venues: Venue[];
    about: {
      name: string;
      sections: RichTextSection[];
    };
    conferenceLocations: {
      sections: RichTextSection[];
    };
    codeOfConduct: {
      sections: RichTextSection[];
    };
    sponsorship: {
      sections: RichTextSection[];
    };
  };
}

const About = ({
  data: {
    venues,
    about: { name, sections },
    conferenceLocations: { sections: conferenceLocationSections },
    codeOfConduct: { sections: codeOfConductSections },
    sponsorship: { sections: sponsorshipSections },
  },
}: AboutProps) => (
  <>
    <Hero heading={name} />

    <TextBlock value={sections} />

    <GridWrapper>
      <SectionBlock>
        <VenueNames venues={venues} />
        <TextBlock value={conferenceLocationSections} />
      </SectionBlock>
    </GridWrapper>

    <TextBlock value={codeOfConductSections} />

    <TextBlock value={sponsorshipSections} />

    <SectionBlock>
      <ConferenceUpdatesForm />
    </SectionBlock>
  </>
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
