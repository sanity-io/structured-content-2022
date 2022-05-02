import clsx from 'clsx';
import { PortableTextComponentProps } from '@portabletext/react';
import { useRef } from 'react';
import { useAnimationProperties } from '../../../hooks/useAnimationProperties';
import useIntersection from '../../../hooks/useIntersection';
import type { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import type { Section } from '../../../types/Section';
import { SimpleCallToAction as TSimpleCallToAction } from '../../../types/SimpleCallToAction';
import type { Venue } from '../../../types/Venue';
import { getCollectionForSelectionType } from '../../../util/entity';
import GridWrapper from '../../GridWrapper';
import SimpleCallToAction from '../../SimpleCallToAction';
import TextBlock from '../index';
import styles from './VenuesSection.module.css';

type VenuesSectionProps = {
  type: EntitySectionSelection;
  heading?: string;
  lead?: Section[];
  callToAction?: TSimpleCallToAction;
  allVenues: Venue[];
  venues?: Venue[];
};

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

export const VenuesSection = ({
  value: { type, allVenues, venues, heading, lead, callToAction },
}: PortableTextComponentProps<VenuesSectionProps>) => {
  const wrapperRef = useRef<HTMLUListElement>(null);
  const isIntersecting = useIntersection(wrapperRef);
  if (!Array.isArray(allVenues) || allVenues.length === 0) {
    console.error(
      `VenuesSection missing or invalid venues array: '${allVenues}'`
    );
    return null;
  }

  const sectionVenues = getCollectionForSelectionType(type, allVenues, venues);
  if (!Array.isArray(sectionVenues) || sectionVenues.length === 0) {
    return null;
  }

  return (
    <GridWrapper>
      <div className={styles.container}>
        <ul
          className={clsx(
            styles.venues,
            isIntersecting && styles.isIntersecting
          )}
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
    </GridWrapper>
  );
};
