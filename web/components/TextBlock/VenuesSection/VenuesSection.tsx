export const VenuesSection = ({ value: { type } }) => {
  if (type !== 'all') {
    console.error(`Unrecognized VenuesSection type: '${type}'`);
    return null;
  }

  // TODO: fetch Venues from Sanity
  return null;
};
