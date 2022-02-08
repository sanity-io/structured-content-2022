import { Venue } from '../../../../types/Venue';
import styles from './Venues.module.css';
import Link from 'next/link';

interface VenuesProps {
  venues: Venue[];
}

export const Venues = ({ venues }: VenuesProps) => (
  <ul className={styles.venues}>
    {venues.map((venue) => (
      <li key={venue.title}>
        <Link href={`/venues/${venue.title}`}>
          <a>{venue.title}</a>
        </Link>
      </li>
    ))}
  </ul>
);
