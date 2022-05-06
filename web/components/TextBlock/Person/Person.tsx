import Link from 'next/link';
import { Person as TPerson } from '../../../types/Person';
import { getEntityPath } from '../../../util/entityPaths';

interface PersonProps {
  value: TPerson;
}

export const Person = ({ value: speaker }: PersonProps) => (
  <Link href={getEntityPath(speaker)}>
    <a>{speaker.name}</a>
  </Link>
);
