import clsx from 'clsx';
import { useRef } from 'react';
import useIntersection from '../../hooks/useIntersection';
import { useAnimationProperties } from '../../hooks/useAnimationProperties';
import { Venue } from '../../types/Venue';
import styles from './VenueNames.module.css';

interface VenueNamesProps {
  venues?: Venue[];
}

const Venue = ({ name }: Venue) => {
  const animation = useAnimationProperties();
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
