import clsx from 'clsx';
import { useRef } from 'react';
import useIntersection from '../../hooks/useIntersection';
import { useAnimationProperties } from '../../hooks/useAnimationProperties';
import type { Venue } from '../../types/Venue';
import type { SimpleCallToAction as TSimpleCallToAction } from '../../types/SimpleCallToAction';
import styles from './VenueNames.module.css';
import SimpleCallToAction from '../SimpleCallToAction';

interface VenueItemProps {
  name: string;
  main?: boolean;
  heading?: string;
}

const VenueItem = ({ name, main, heading }: VenueItemProps) => {
  const animation = useAnimationProperties();
  return (
    <li className={clsx(styles.venue, main && styles.main)} style={animation}>
      {main && <span className={styles.mainVenueLabel}>{heading}</span>}
      {name}
    </li>
  );
};

interface VenueNamesProps {
  venues?: Venue[];
  heading?: string;
  callToAction?: TSimpleCallToAction;
}

export const VenueNames = ({
  venues,
  heading,
  callToAction,
}: VenueNamesProps) => {
  const wrapperRef = useRef<HTMLUListElement>();
  const isIntersecting = useIntersection(wrapperRef);
  if (!Array.isArray(venues) || !venues.length) {
    return null;
  }

  return (
    <div className={styles.venues}>
      <ul
        className={clsx(isIntersecting && styles.isIntersecting)}
        ref={wrapperRef}
      >
        {venues?.map((venue, index) => (
          <VenueItem
            {...venue}
            key={venue.name}
            main={index === 0}
            heading={heading}
          />
        ))}
      </ul>
      <SimpleCallToAction {...callToAction} />
    </div>
  );
};
