import Link from 'next/link';
import client from '../clients/mainClient';
import { formatDateWithTime } from '../util/date';
import { Speaker } from '../../types/speaker';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Speakers from '../pageResources/home/Speakers';
import styles from "../pageResources/home/home.module.css";
import ConferenceUpdatesForm from "../pageResources/home/ConferenceUpdatesForm";

const QUERY = `
  *[_type == "event"][0] {
    name,
    description,
    tagline,
    startDate,
    endDate,
    promotedSpeakers[]-> {
      name,
      title,
      bio,
      "photo": photo.asset->url,
      "twitter": social.twitter,
    }
  }`;

interface HomeProps {
  data: {
    name: string;
    description: string;
    tagline: string;
    startDate: string;
    endDate: string;
    promotedSpeakers: Speaker[];
  };
}

const Home = ({
  data: { name, tagline, startDate, endDate, description, promotedSpeakers },
}: HomeProps) => (
  <div className={styles.container}>
    <header>
      <SectionBlock>
          <Heading>{name}</Heading>
          {tagline}
          <Paragraph>
            {formatDateWithTime(startDate)} - {formatDateWithTime(endDate)}
          </Paragraph>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock>
        <Heading type="h2">
          <Link href="#">{'Registration/Sign up/tickets ->'}</Link>
        </Heading>
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Why you should go/what this is</Heading>
        {description}
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">
          <Link href="#">{'Speakers ->'}</Link>
        </Heading>
        <Speakers speakers={promotedSpeakers} />
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">{'Program ->'}</Heading>
        <Link href="#">{'Venues ->'}</Link>
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
