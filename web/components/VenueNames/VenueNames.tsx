import { Venue } from '../../types/Venue';
import styles from './VenueNames.module.css';

interface VenueNamesProps {
  venues: Venue[];
}

export const VenueNames = ({ venues }: VenueNamesProps) => (
  <ul className={styles.venues}>
    {venues.map((venue) => (
      <li key={venue.title} className={styles.venue}>
        <a href="#" className={styles.link}>
          {venue.title}
        </a>
      </li>
    ))}
  </ul>
);
