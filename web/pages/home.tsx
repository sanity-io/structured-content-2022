import client from '../lib/sanity.server';
import { Section } from '../types/Section';
import { Sponsor } from '../types/Sponsor';
import { Venue } from "../types/Venue";
import { RichTextSection } from "../types/RichTextSection";
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import ConferenceUpdatesForm from '../components/ConferenceUpdatesForm';
import TextBlock from '../components/TextBlock';
import Sponsors from '../pageResources/home/Sponsors';
import GridWrapper from '../components/GridWrapper';
import ConferenceHeader from '../components/ConferenceHeader';
import NavBlock from '../components/NavBlock';
import VenueNames from "../components/VenueNames";
import PlaceholderImage from "../components/PlaceholderImage";
import styles from "../pageResources/home/home.module.css";

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
    "sponsorship": *[_id == "e629b448-75d1-497a-96be-86e5464ad5b2"],
    "venues": *[_type == "venue"],
    "broadcastInfo": *[_id == "229058a3-6067-4f8d-b6e1-c59db187d2a8"].sections[0],
    "schedule": *[_id == "5a574e94-5423-4e83-bbf3-3a2f83a5c88b"].sections[0]
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
    sponsorship: RichTextSection[];
    venues: Venue[];
    broadcastInfo: RichTextSection[];
    schedule: RichTextSection[];
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
    sponsorship,
    venues,
    broadcastInfo,
    schedule,
  },
}: HomeProps) => (
  <>
    <GridWrapper>
      <ConferenceHeader
        name={name}
        startDate={startDate}
        endDate={endDate}
        description={description}
      />

      <NavBlock />

      <VenueNames venues={venues} />
    </GridWrapper>

    <div className={styles.centered}>
      <TextBlock value={broadcastInfo} />
    </div>

    <SectionBlock className={styles.centered}>
      <PlaceholderImage width={406} height={370}  />
      <div>
        <TextBlock value={valueProposition} />
      </div>
    </SectionBlock>

    <div className={styles.centered}>
      <TextBlock value={schedule} />
    </div>

    <div className={styles.centered}>
      <TextBlock value={sponsorship} />
    </div>

    <SectionBlock gray>
      <Sponsors sponsors={sponsors} />
    </SectionBlock>

    <SectionBlock className={styles.centered}>
      <PlaceholderImage width={330} height={459} />
      <div>
        <Heading type="h2">Get conference updates</Heading>
        <ConferenceUpdatesForm />
      </div>
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

export default Home;
