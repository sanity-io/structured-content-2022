import { Sponsorship } from "../../../types/Sponsorship";
import GridWrapper from "../../GridWrapper";

interface SponsorshipsProps {
  value: {
    type: string;
    sponsorships: Sponsorship[];
  }
}

export const Sponsorships = ({ value: { type, sponsorships } }: SponsorshipsProps) => {
  if (type !== 'all') {
    console.error(`Unrecognized Sponsorships type: '${type}'`);
    return null;
  }

  return (
    <GridWrapper>
      {sponsorships.map(sponsorship => {
        return null; // TODO: render content here
      })}
    </GridWrapper>
  );
}
