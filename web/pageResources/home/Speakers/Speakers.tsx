import Link from 'next/link';
import ProfilePicture from './ProfilePicture';
import Paragraph from '../../../components/Paragraph';
import blocksToText from '../../../util/blocksToText';
import { getEntityPath } from "../../../util/entityPaths";
import { Person } from '../../../types/Person';
import styles from './Speakers.module.css';
import { imageUrlFor } from "../../../lib/sanity";

interface SpeakersProps {
  speakers: Person[];
}

export const Speakers = ({ speakers }: SpeakersProps) => (
  <ul>
    {speakers.map((speaker) => {
      const { name, title, photo, bio } = speaker;
      return (
        <li key={name} className={styles.speaker}>
          <div className={styles.profilePicture}>
            <Link href={getEntityPath(speaker)}>
              <a>
                <ProfilePicture src={imageUrlFor(photo).size(200, 200).url()} alt={name}/>
              </a>
            </Link>
          </div>
          <div className={styles.details}>
            <Link href={getEntityPath(speaker)}>
              <a>
                <strong>{name}</strong>
              </a>
            </Link>
            <span className={styles.details__title}>{title}</span>
            {blocksToText(bio).map((block, i) => (
              <Paragraph key={i}>{block}</Paragraph>
            ))}
          </div>
        </li>
      );
    })}
  </ul>
);
