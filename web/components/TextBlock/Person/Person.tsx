import Link from 'next/link';
import { getEntityPath } from '../../../util/entityPaths';

export const Person = ({ value: speaker }) => (
  <Link href={getEntityPath(speaker)}>
    <a>{speaker.name}</a>
  </Link>
);
