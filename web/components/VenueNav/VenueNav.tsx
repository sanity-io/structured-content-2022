import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import urlJoin from 'proper-url-join';
import type { Venue } from '../../types/Venue';
import styles from './VenueNav.module.css';

interface VenueNavProps {
  venues: Venue[];
  activeVenue?: Venue;
  mainVenue?: Venue;
}

const venueLabel = (venueName: string, mainVenueName?: string) => {
  switch (venueName) {
    case mainVenueName:
      return 'Main Venue';
    case 'Virtual':
      return 'Online';
    default:
      return 'Satellite';
  }
};

export const VenueNav = ({ venues, activeVenue, mainVenue }: VenueNavProps) => {
  const router = useRouter();
  return (
    <nav className={styles.container}>
      <ul className={styles.venues}>
        {venues.map(({ name, _id, slug }) => (
          <li
            key={name}
            className={clsx(
              styles.venuesItem,
              activeVenue?._id === _id && styles.active
            )}
          >
            <Link
              href={urlJoin(router.asPath, {
                query: { venue: slug.current || '' },
              })}
            >
              <a
                className={clsx(
                  styles.venue,
                  activeVenue?._id === _id && styles.active
                )}
              >
                <span className={styles.venueName}>{name}</span>
                <span className={styles.venueSubtitle}>
                  {venueLabel(name, mainVenue?.name)}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
