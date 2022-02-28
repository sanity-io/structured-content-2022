import { Sponsorship } from "../../../types/Sponsorship";
import GridWrapper from "../../GridWrapper";

interface SponsorshipsProps {
  value: {
    type: 'all' | 'highlighted' | 'none';
    sponsorships: Sponsorship[];
  }
}

export const Sponsorships = ({ value: { type, sponsorships } }: SponsorshipsProps) => {
  if (type === 'none') {
    return null;
  }

  if (type === 'highlighted') {
    // TODO: Sanity support required
    return null;
  }

  if (type === 'all') {
    return (
      <GridWrapper>
        {sponsorships.map(sponsorship => {
          return null; // TODO: render content here
        })}
      </GridWrapper>
    );
  }

  console.error(`Unrecognized Sponsorships type: '${type}'`);
  return null;
}
