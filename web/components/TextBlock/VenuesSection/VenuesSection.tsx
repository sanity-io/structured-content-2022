import VenueNames from "../../VenueNames";

export const VenuesSection = ({ value: { type, venues } }) => {
  if (type !== 'all') {
    console.error(`Unrecognized VenuesSection type: '${type}'`);
    return null;
  }

  return <VenueNames venues={venues} />;
};
