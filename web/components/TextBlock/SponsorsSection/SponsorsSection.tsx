import { PortableTextComponentProps } from '@portabletext/react';
import { Sponsor as TSponsor } from '../../../types/Sponsor';
import { Sponsorship } from '../../../types/Sponsorship';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import Sponsor from '../../Sponsor';
import GridWrapper from '../../GridWrapper';
import styles from './SponsorsSection.module.css';

type SponsorsSectionProps = {
  type: EntitySectionSelection;
  allSponsorships: Sponsorship[];
  sponsors?: TSponsor[];
};

export const SponsorsSection = ({
  value: { type, allSponsorships, sponsors },
}: PortableTextComponentProps<SponsorsSectionProps>) => {
  if (!Array.isArray(allSponsorships) || allSponsorships.length === 0) {
    console.error(
      `SponsorsSection missing or invalid sponsorships array: '${allSponsorships}'`
    );
    return null;
  }

  if (type === 'none') {
    return null;
  }

  if (type === 'highlighted') {
    if (!Array.isArray(sponsors) || sponsors.length === 0) {
      console.error(
        `SponsorsSection(type: 'highlighted') missing or invalid sponsors array: '${sponsors}'`
      );
      return null;
    }

    return (
      <GridWrapper>
        <section className={styles.sponsorLevel}>
          <ul className={styles.sponsors}>
            {sponsors.map((sponsor) => (
              <li key={sponsor._id} className={styles.sponsor}>
                <Sponsor sponsor={sponsor} />
              </li>
            ))}
          </ul>
        </section>
      </GridWrapper>
    );
  }

  if (type === 'all') {
    return (
      <GridWrapper>
        {allSponsorships
          .filter((sponsorship) => sponsorship.sponsors?.length > 0)
          .map(({ _id, type, sponsors }) => (
            <section key={_id} className={styles.sponsorLevel}>
              <h3>{type}</h3>
              <ul className={styles.sponsors}>
                {sponsors.map((sponsor) => (
                  <li key={sponsor._key} className={styles.sponsor}>
                    <Sponsor sponsor={sponsor as TSponsor} type={type} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </GridWrapper>
    );
  }

  console.error(`Unrecognized SponsorsSection type: '${type}'`);
  return null;
};
