import client from '../../lib/sanity.server';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import Nav from '../../components/Nav';
import styles from '../../pageResources/shared/shared.module.css';
import speakerStyles from '../../pageResources/speakers/Speaker/Speaker.module.css';
import { imageUrlFor } from '../../lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '../../types/Section';
import TextBlock from '../../components/TextBlock';
import { Session } from '../../types/Session';
import Sessions from '../../components/Sessions';

const QUERY = `
  {
    "speaker": *[_id == $_id][0] {
      _id,
      name,
      title,
      bio,
      "twitter": social.twitter,
      photo,
      "sessions": *[_type=='session' && references(^._id)] {
         _id,
        title,
        startTime,
        duration,
        location->,
        "speakers": speakers[].person->
      }
    }
  }`;

interface SpeakerProps {
  data: {
    speaker: {
      _id: string;
      name: string;
      title: string;
      bio: Section[];
      twitter: string;
      photo: object;
      sessions: Session[];
    };
  };
}

const Speakers = ({
  data: {
    speaker: { name, title, twitter, photo, bio, sessions },
  },
}: SpeakerProps) => (
  <div className={styles.container}>
    <header>
      <Nav />
      <SectionBlock>
        <div className={speakerStyles.container}>
          <div>
            <Heading>{name}</Heading>
            <div>{title}</div>
            <div>
              <Link href={`/speakers/${name}`}>
                <a>twitter.com/{twitter}</a>
              </Link>
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
    </header>

    <main>
      <TextBlock value={bio} />
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
  </div>
);

export async function getServerSideProps({ params: { _id } }) {
  const data = await client.fetch(QUERY, { _id: _id || '' });
  if (!data?.speaker?._id) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default Speakers;
