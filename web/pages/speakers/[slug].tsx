import Link from 'next/link';
import Image from 'next/image';
import client from '../../lib/sanity.server';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import Nav from '../../components/Nav';
import { imageUrlFor } from '../../lib/sanity';
import TextBlock from '../../components/TextBlock';
import { Session } from '../../types/Session';
import Sessions from '../../components/Sessions';
import PageContainer from '../../components/PageContainer';
import speakerStyles from '../../pageResources/speakers/Speaker/Speaker.module.css';
import { Person } from '../../types/Person';

const QUERY = `
  {
    "speaker": *[_type == 'person' && slug.current == $slug][0] {
      ...,
      "sessions": *[_type=='session' && references(^._id)] {
        ...,
        location->,
        "speakers": speakers[].person->
      }
    }
  }`;

interface SpeakerProps {
  data: {
    speaker: Person & {
      sessions: Session[];
    };
  };
}

const Speakers = ({
  data: {
    speaker: {
      name,
      title,
      social: { twitter },
      photo,
      bio,
      sessions,
    },
  },
}: SpeakerProps) => (
  <>
    <header>
      <Nav />
    </header>
    <PageContainer>
      <main>
        <SectionBlock>
          <div className={speakerStyles.container}>
            <div>
              <Heading>{name}</Heading>
              <div>{title}</div>
              <div>
                <a
                  href={`https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {twitter}
                </a>
              </div>
            </div>
            <Image
              src={imageUrlFor(photo).size(200, 200).url()}
              alt={name}
              width={200}
              height={200}
            />
          </div>
        </SectionBlock>

        <SectionBlock>
          <TextBlock value={bio} />
        </SectionBlock>

        <Sessions sessions={sessions} />

        <SectionBlock noBackground>
          <div>
            <Link href={`/speakers`}>
              <a>All speakers</a>
            </Link>
          </div>
          <div>
            <Link href={`/program`}>
              <a>See full program</a>
            </Link>
          </div>
        </SectionBlock>
      </main>
    </PageContainer>
  </>
);

export async function getServerSideProps({ params: { slug } }) {
  const data = await client.fetch(QUERY, { slug: slug || '' });
  if (!data?.speaker?._id) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default Speakers;
