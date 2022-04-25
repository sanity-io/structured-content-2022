import clsx from 'clsx';
import type { Venue } from '../../types/Venue';
import styles from './VenueNav.module.css';

interface VenueNavProps {
  venues: Venue[];
  activeVenue?: Venue;
  onVenueClick: (venue: Venue) => void;
}

const venueLabel = (venueName: string) =>
  ({
    'San Francisco': 'Main venue',
    Virtual: 'Online',
  }[venueName] || 'Satellite');

export const VenueNav = ({
  venues,
  activeVenue,
  onVenueClick,
}: VenueNavProps) => (
  <nav className={styles.container}>
    <ul className={styles.venues}>
      {venues.map((venue) => (
        <li
          key={venue.name}
          className={clsx(
            styles.venuesItem,
            activeVenue?._id === venue._id && styles.active
          )}
        >
          <button
            className={clsx(
              styles.venue,
              activeVenue?._id === venue._id && styles.active
            )}
            onClick={() => onVenueClick(venue)}
          >
            <span className={styles.venueName}>{venue.name}</span>
            <span className={styles.venueSubtitle}>
              {venueLabel(venue.name)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  </nav>
);
