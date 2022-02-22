import { Venue } from '../../types/Venue';
import styles from './VenueNames.module.css';

interface VenueNamesProps {
  venues: Venue[];
}

export const VenueNames = ({ venues }: VenueNamesProps) => (
  <ul className={styles.venues}>
    {venues.map((venue) => (
      <li key={venue.name} className={styles.venue}>
        {venue.name}
      </li>
    ))}
  </ul>
);
