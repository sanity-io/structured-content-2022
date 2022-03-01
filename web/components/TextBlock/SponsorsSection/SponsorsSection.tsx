import { PortableTextComponentProps } from '@portabletext/react/dist/react-portable-text.esm';
import { Sponsor } from '../../../types/Sponsor';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import Sponsors from '../../Sponsors';

type SponsorsSectionProps = {
  type: EntitySectionSelection;
  allSponsors: Sponsor[];
  sponsors?: Sponsor[];
};

export const SponsorsSection = ({
  value: { type, allSponsors, sponsors },
}: PortableTextComponentProps<SponsorsSectionProps>) => {
  if (!Array.isArray(allSponsors) || allSponsors.length === 0) {
    console.error(
      `SponsorsSection missing or invalid sponsors array: '${allSponsors}'`
    );
    return null;
  }

  switch (type) {
    case 'all':
      return <Sponsors sponsors={allSponsors} />;
    case 'highlighted':
      return <Sponsors sponsors={sponsors} />;
    case 'none':
      return null;
    default:
      console.error(`Unrecognized SponsorsSection type: '${type}'`);
      return null;
  }
};
