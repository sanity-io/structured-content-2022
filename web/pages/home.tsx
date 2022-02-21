import Link from 'next/link';
import client from '../lib/sanity.server';
import { Section } from '../types/Section';
import { Sponsor } from '../types/Sponsor';
import { Venue } from "../types/Venue";
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import TextBlock from '../components/TextBlock';
import Sponsors from '../pageResources/home/Sponsors';
import GridWrapper from '../components/GridWrapper';
import ConferenceHeader from '../components/ConferenceHeader';
import NavBlock from '../components/NavBlock';
import VenueNames from "../components/VenueNames";

const QUERY = `
  {
    "home": *[_type == "event"][0] {
      name,
      description,
      startDate,
      endDate,
      valueProposition,
    },
    "sponsors": *[_type == "sponsor"] {
      ...,
      sponsorship->
    },
    "venues": *[_type == "venue"]
  }`;

interface HomeProps {
  data: {
    home: {
      name: string;
      description: string;
      tagline: string;
      startDate: string;
      endDate: string;
      valueProposition: Section[];
    };
    sponsors: Sponsor[];
    venues: Venue[];
  };
}

const Home = ({
  data: {
    home: {
      name,
      startDate,
      endDate,
      description,
      valueProposition,
    },
    sponsors,
    venues,
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

    <GridWrapper>
      <VenueNames venues={venues} />
    </GridWrapper>

    <SectionBlock>
      <TextBlock value={valueProposition} />
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
