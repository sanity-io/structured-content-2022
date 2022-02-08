import Link from 'next/link';
import client from '../../clients/mainClient';
import { Session } from '../../../types/Session';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import { formatDateWithTime } from '../../util/date';
import { Speakers } from '../../pageResources/home/Speakers/Speakers';
import sharedStyles from '../../pageResources/shared/shared.module.css';

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

const SessionPage = ({
  data: { title, startTime, location, speakers },
}: SessionPageProps) => (
  <div className={sharedStyles.container}>
    <header>
      <SectionBlock key={title}>
        <Heading type="h2">{title}</Heading>
        <div>
          {formatDateWithTime(startTime)}, {location.title}
        </div>
        {speakers.map(({ name, title }) => (
          <div key={name}>
            <strong>{name}</strong>, {title}
          </div>
        ))}
      </SectionBlock>
    </header>

    <main>
      <SectionBlock>
        <Heading type="h2">Text about the talk</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. This text is not fetched from
          Sanity.
        </Paragraph>
      </SectionBlock>

      <SectionBlock style={{ background: 'none' }}>
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
