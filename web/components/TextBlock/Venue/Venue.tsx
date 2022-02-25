import Link from 'next/link';
import { getEntityPath } from '../../../util/entityPaths';

export const Venue = ({ value: venue }) => (
  <Link href={getEntityPath(venue)}>
    <a>{venue.title}</a>
  </Link>
);
