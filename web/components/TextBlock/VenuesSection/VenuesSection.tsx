import { PortableTextComponentProps } from '@portabletext/react';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Venue } from '../../../types/Venue';
import GridWrapper from '../../GridWrapper';
import VenueNames from '../../VenueNames';
import { getCollectionForSelectionType } from '../../../util/entity';
import { SimpleCallToAction } from '../../../types/SimpleCallToAction';

type VenuesSectionProps = {
  type: EntitySectionSelection;
  heading?: string;
  callToAction?: SimpleCallToAction;
  allVenues: Venue[];
  venues?: Venue[];
};

export const VenuesSection = ({
  value: { type, allVenues, venues, ...otherProps },
}: PortableTextComponentProps<VenuesSectionProps>) => {
  if (!Array.isArray(allVenues) || allVenues.length === 0) {
    console.error(
      `VenuesSection missing or invalid venues array: '${allVenues}'`
    );
    return null;
  }

  const sectionVenues = getCollectionForSelectionType(type, allVenues, venues);
  return sectionVenues.length === 0 ? null : (
    <GridWrapper>
      <VenueNames venues={sectionVenues} {...otherProps} />
    </GridWrapper>
  );
};
