import { PortableTextComponentProps } from "@portabletext/react";
import { EntitySectionSelection } from "../../../types/EntitySectionSelection";
import { Venue } from "../../../types/Venue";
import GridWrapper from '../../GridWrapper';
import VenueNames from "../../VenueNames";

type VenuesSectionProps = {
  type: EntitySectionSelection;
  allVenues: Venue[];
  venues?: Venue[];
};

export const VenuesSection = ({ value: { type, venues, allVenues } }: PortableTextComponentProps<VenuesSectionProps>) => {
  if (!Array.isArray(allVenues) || allVenues.length === 0) {
    console.error(
      `VenuesSection missing or invalid venues array: '${allVenues}'`
    );
    return null;
  }

  switch (type) {
    case 'all':
      return (
        <GridWrapper>
          <VenueNames venues={allVenues}/>
        </GridWrapper>
      );

      case 'highlighted':
        return (
          <GridWrapper>
            <VenueNames venues={venues} />
          </GridWrapper>
        );

    case "none":
        return null;

    default:
      console.error(`Unrecognized VenuesSection type: '${type}'`);
      return null;
  }
};
