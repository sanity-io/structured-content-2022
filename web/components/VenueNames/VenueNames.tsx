import clsx from 'clsx';
import { useRef } from 'react';
import useIntersection from '../../hooks/useIntersection';
import { useAnimationProperties } from '../../hooks/useAnimationProperties';
import type { Section } from '../../types/Section';
import type { SimpleCallToAction as TSimpleCallToAction } from '../../types/SimpleCallToAction';
import type { Venue } from '../../types/Venue';
import styles from './VenueNames.module.css';
import SimpleCallToAction from '../SimpleCallToAction';
import TextBlock from '../TextBlock';

interface VenueItemProps {
  name: string;
  main?: boolean;
  heading?: string;
}

const VenueItem = ({ name, main, heading }: VenueItemProps) => {
  const animation = useAnimationProperties();
  return (
    <li className={clsx(styles.venue, main && styles.main)} style={animation}>
      {main && heading && (
        <span className={styles.mainVenueLabel}>{heading} </span>
      )}
      {name}
    </li>
  );
};

interface VenueNamesProps {
  venues?: Venue[];
  heading?: string;
  lead?: Section[];
  callToAction?: TSimpleCallToAction;
}

export const VenueNames = ({
  venues,
  heading,
  lead,
  callToAction,
}: VenueNamesProps) => {
  const wrapperRef = useRef<HTMLUListElement>();
  const isIntersecting = useIntersection(wrapperRef);
  if (!Array.isArray(venues) || !venues.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ul
        className={clsx(styles.venues, isIntersecting && styles.isIntersecting)}
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
      {lead && (
        <div className={styles.lead}>
          <TextBlock value={lead} />
        </div>
      )}
      <SimpleCallToAction {...callToAction} />
    </div>
  );
};
