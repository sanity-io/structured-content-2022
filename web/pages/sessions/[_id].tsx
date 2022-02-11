import Link from 'next/link';
import client from '../../lib/sanity.server';
import { Session } from '../../types/Session';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import { formatDateWithTime } from '../../util/date';
import { Speakers } from '../../pageResources/home/Speakers/Speakers';
import TextBlock from '../../components/TextBlock';
import Nav from '../../components/Nav';
import PageContainer from '../../components/PageContainer';

const QUERY = `
  *[_id == $_id][0] {
    ...,
    location->,
    "speakers": speakers[].person-> {
      "photo": photo.asset->url, 
      ...
    },
    longDescription[] {
      ...,
      children[] {
       _type == 'reference' => @->,
        _type != 'reference' => @,
      },
      markDefs[] {
        ...,
        reference-> {
          ...,
          _ref->,
        }
      },
    },
  }`;

interface SessionPageProps {
  data: Session;
}

const SessionPage = ({
  data: { title, startTime, location, speakers, longDescription },
}: SessionPageProps) => (
  <PageContainer>
    <header>
      <Nav />
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
      {longDescription && (
        <SectionBlock>
          <TextBlock value={longDescription} />
        </SectionBlock>
      )}

      <SectionBlock noBackground>
        <Heading type="h2">Speakers</Heading>
        <Speakers speakers={speakers} />
      </SectionBlock>

      <SectionBlock noBackground>
        <Paragraph>
          <Link href="/program">See full program</Link>
        </Paragraph>
      </SectionBlock>
    </main>
  </PageContainer>
);

export async function getServerSideProps({ params: { _id } }) {
  const data = await client.fetch(QUERY, { _id: _id || '' });
  if (!data?._id) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default SessionPage;
