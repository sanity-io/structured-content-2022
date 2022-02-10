import Link from 'next/link';
import ProfilePicture from './ProfilePicture';
import Paragraph from '../../../components/Paragraph';
import blocksToText from '../../../util/blocksToText';
import { Speaker } from '../../../types/Speaker';
import styles from './Speakers.module.css';

interface SpeakersProps {
  speakers: Speaker[];
}

export const Speakers = ({ speakers }: SpeakersProps) => (
  <ul>
    {speakers.map(({ _id, name, title, photo, bio }) => (
      <li key={name} className={styles.speaker}>
        <div className={styles.profilePicture}>
          <Link href={`/speakers/${_id}`}>
            <a>
              <ProfilePicture src={photo} alt={name} />
            </a>
          </Link>
        </div>
        <div className={styles.details}>
          <Link href={`/speakers/${_id}`}>
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
    ))}
  </ul>
);
