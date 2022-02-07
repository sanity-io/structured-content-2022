import ProfilePicture from './ProfilePicture';
import Paragraph from '../Paragraph';
import blocksToText from '../../util/blocksToText';
import { Speaker } from '../../../types/speaker';
import styles from './Speakers.module.css';

interface SpeakersProps {
  speakers: Speaker[];
}

export const Speakers = ({ speakers }: SpeakersProps) => (
  <ul>
    {speakers.map(({ name, title, photo, bio }) => (
      <li key={name} className={styles.speaker}>
        <div className={styles.profilePicture}>
          <ProfilePicture src={photo} alt={name} />
        </div>
        <div className={styles.details}>
          <strong>{name}</strong>
          <span className={styles.details__title}>{title}</span>
          <Paragraph>{blocksToText(bio)}</Paragraph>
        </div>
      </li>
    ))}
  </ul>
);
