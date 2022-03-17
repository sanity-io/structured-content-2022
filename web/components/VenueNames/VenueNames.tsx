import { useRef, useMemo, CSSProperties } from 'react';
import clsx from 'clsx';
import { Venue } from '../../types/Venue';
import styles from './VenueNames.module.css';

import useIntersection from '../../hooks/useIntersection';
import { getRandomAnimation } from '../../lib/animation';

interface VenueNamesProps {
  venues?: Venue[];
}

const Venue = ({ name }: Venue) => {
  const animation = useMemo(getRandomAnimation, []) as CSSProperties;

  return (
    <li className={styles.venue} style={animation}>
      {name}
    </li>
  );
};

export const VenueNames = ({ venues }: VenueNamesProps) => {
  const wrapperRef = useRef<HTMLUListElement>();
  const isIntersecting = useIntersection(wrapperRef);

  return (
    <ul
      className={clsx(styles.venues, isIntersecting && styles.isIntersecting)}
      ref={wrapperRef}
    >
      {venues?.map((venue) => (
        <Venue {...venue} key={venue.name} />
      ))}
    </ul>
  );
};
