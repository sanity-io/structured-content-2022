import { Sponsor as TSponsor, SponsorLevel } from '../../types/Sponsor';
import GridWrapper from '../GridWrapper';
import Heading from '../Heading';
import Sponsor from '../Sponsor';
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
      Partner: [],
      Community: [],
    }
  );

export const Sponsors = ({ sponsors }: SponsorsProps) => {
  const groupedSponsors = groupBySponsorLevel(sponsors);
  const levels: SponsorLevel[] = ['Premier', 'Partner', 'Community'];
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
