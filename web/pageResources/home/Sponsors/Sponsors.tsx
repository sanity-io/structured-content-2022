import { Sponsor as TSponsor, SponsorLevel } from '../../../types/Sponsor';
import Heading from '../../../components/Heading';
import Sponsor from '../../../components/Sponsor';
import styles from './Sponsors.module.css';

interface SponsorsProps {
  sponsors: TSponsor[];
}

const groupBySponsorLevel = (
  sponsors: TSponsor[]
): { [level in SponsorLevel]: TSponsor[] } =>
  sponsors.reduce(
    (acc, sponsor) => {
      const sponsorLevel = sponsor.sponsorship.title;
      acc[sponsorLevel] = [...(acc[sponsorLevel] || []), sponsor];
      return acc;
    },
    {
      Premier: [],
      Gold: [],
      Silver: [],
    }
  );

export const Sponsors = ({ sponsors }: SponsorsProps) => {
  const groupedSponsors = groupBySponsorLevel(sponsors);
  const tiers: SponsorLevel[] = ['Premier', 'Gold', 'Silver'];
  return (
    <div className="sponsors">
      {tiers.map((tier) => (
        <div key={tier}>
          <Heading type="h3">{tier}</Heading>
          <div className={styles.sponsors}>
            {groupedSponsors[tier].map((sponsor) => (
              <Sponsor key={sponsor._id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
