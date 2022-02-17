import Link from 'next/link';
import Image from 'next/image';
import client from '../../lib/sanity.server';
import { imageUrlFor } from '../../lib/sanity';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import GridWrapper from '../../components/GridWrapper';
import speakersStyles from '../../pageResources/speakers/Speakers.module.css';
import { getEntityPath } from '../../util/entityPaths';
import { Person } from '../../types/Person';

const QUERY = `
  {
    "speakers": *[_type == "person"]
  }`;

interface SpeakersProps {
  data: {
    speakers: Person[];
  };
}

const Speakers = ({ data: { speakers } }: SpeakersProps) => (
  <GridWrapper>
    <SectionBlock>
      <Heading>Speakers</Heading>
    </SectionBlock>

    <SectionBlock noBackground className={speakersStyles.container}>
      {speakers.map((speaker) => (
        <div key={speaker._id} className={speakersStyles['container__speaker']}>
          <Link href={getEntityPath(speaker)}>
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
              href={`https://twitter.com/${speaker.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {speaker.social.twitter}
            </a>
          </div>
        </div>
      ))}
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

export default Speakers;
