import { Sponsor as TSponsor, SponsorLevel } from '../../../types/Sponsor';
import GridWrapper from '../../../components/GridWrapper';
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
      const sponsorLevel = sponsor.sponsorship.type;
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
  const levels: SponsorLevel[] = ['Premier', 'Gold', 'Silver'];
  return (
    <GridWrapper>
      {levels.map((level) => (
        <section key={level} className={styles.sponsorLevel}>
          <Heading type="h3">{level}</Heading>
          <ul className={styles.sponsors}>
            {groupedSponsors[level].map((sponsor) => (
              <li key={sponsor._id} className={styles.sponsor}>
                <Sponsor sponsor={sponsor} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </GridWrapper>
  );
};
