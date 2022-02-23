import Sponsors from "../../../pageResources/home/Sponsors";

export const SponsorsSection = ({ value: { type, sponsors } }) => {
  if (type !== 'all') {
    console.error(`Unrecognized SponsorsSection type: '${type}'`);
    return null;
  }

  if (!Array.isArray(sponsors) || sponsors.length === 0) {
    console.error(`SponsorsSection missing or invalid sponsors array: '${sponsors}'`);
    return null;
  }

  return <Sponsors sponsors={sponsors} />;
};
