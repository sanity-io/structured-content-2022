import Link from 'next/link';
import client from '../../clients/mainClient';
import { Session } from '../../../types/Session';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import sharedStyles from '../../pageResources/shared/shared.module.css';
import styles from '../../pageResources/about/venue/venue.module.css';
import { formatDateWithTime } from "../../util/date";
import { Speakers } from "../../pageResources/home/Speakers/Speakers";

const QUERY = `
  *[_type == "session"][_id == $_id][0] {
    location->,
    "speakers": speakers[].person-> {
      "photo": photo.asset->url, 
      ...
    },
    ...
  }`;

interface SessionPageProps {
  data: Session;
}

const SessionPage = ({ data: { title, startTime, location, speakers } }: SessionPageProps) => (
  <div className={sharedStyles.container}>
    <header>
      <SectionBlock key={title}>
        <Heading type="h2">{title}</Heading>
        <Paragraph>
          <span style={{ display: "block" }}>{formatDateWithTime(startTime)}, {location.title}</span>
          {speakers.map(({ name, title }) => (
            <span key={name} className={styles.speaker} style={{ display: "block" }}>
              <strong>{name}</strong>, {title}
            </span>
          ))}
        </Paragraph>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock>
        <div className={styles.location}>
          <div>
            <Heading type="h2">Text about the talk</Heading>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. This text is not
              fetched from Sanity.
            </Paragraph>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock style={{ background: "none" }}>
        <Heading type="h2">Speakers</Heading>
        <Paragraph>
          <Speakers speakers={speakers} />
        </Paragraph>
      </SectionBlock>

      <SectionBlock style={{ background: 'none' }}>
        <Paragraph>
          <Link href="/program">See full program</Link>
        </Paragraph>
      </SectionBlock>
    </main>
  </div>
);

export async function getServerSideProps({ params: { _id } }) {
  const data = await client.fetch(QUERY, { _id: _id || '' });
  if (!data?._id) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default SessionPage;
