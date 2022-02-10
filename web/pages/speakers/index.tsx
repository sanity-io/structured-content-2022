import client from '../../lib/sanity.server';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import Nav from '../../components/Nav';
import speakersStyles from '../../pageResources/speakers/Speakers.module.css';
import styles from '../../pageResources/shared/shared.module.css';
import { imageUrlFor } from '../../lib/sanity';
import Link from 'next/link';
import Image from 'next/image';

const QUERY = `
  {
    "speakers": *[_type == "person"] {
      _id,
      name,
      title,
      "twitter": social.twitter,
      photo,
    }
  }`;

interface SpeakersProps {
  data: {
    speakers: {
      _id: string;
      name: string;
      title: string;
      twitter: string;
      photo: object;
    }[];
  };
}

const Speakers = ({ data: { speakers } }: SpeakersProps) => (
  <div className={styles.container}>
    <header>
      <Nav />
      <SectionBlock>
        <Heading>Speakers</Heading>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock noBackground className={speakersStyles.container}>
        {speakers.map((speaker) => (
          <div className={speakersStyles['container__speaker']}>
            <Link key={speaker._id} href={`/speakers/${speaker._id}`}>
              <a>
                <Image
                  src={imageUrlFor(speaker.photo).size(150, 150).url()}
                  alt={speaker.name}
                  width={150}
                  height={150}
                />
              </a>
            </Link>
            <div>
              <div>{speaker.name}</div>
              <div>{speaker.title}</div>
              <a
                className={speakersStyles.speakerTwitter}
                href={`https://twitter.com/${speaker.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {speaker.twitter}
              </a>
            </div>
          </div>
        ))}
      </SectionBlock>
    </main>
  </div>
);

export async function getStaticProps() {
  return {
    props: {
      data: await client.fetch(QUERY),
    },
    revalidate: 180,
  };
}

export default Speakers;
