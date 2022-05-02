import { PortableTextComponentProps } from '@portabletext/react';
import { Sponsor as TSponsor } from '../../../types/Sponsor';
import { Sponsorship } from '../../../types/Sponsorship';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import Sponsor from '../../Sponsor';
import GridWrapper from '../../GridWrapper';
import Heading from '../../Heading';
import styles from './SponsorsSection.module.css';

type SponsorsSectionProps = {
  type: EntitySectionSelection;
  heading: string;
  allSponsorships: Sponsorship[];
  sponsors?: TSponsor[];
};

export const SponsorsSection = ({
  value: { type, heading, allSponsorships, sponsors },
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
        <div className={styles.container}>
          <section className={styles.sponsorLevel}>
            <ul className={styles.sponsors}>
              {sponsors.map((sponsor) => (
                <li key={sponsor._id} className={styles.sponsor}>
                  <Sponsor sponsor={sponsor} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </GridWrapper>
    );
  }

  if (type === 'all') {
    return (
      <GridWrapper>
        <div className={styles.container}>
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          {allSponsorships
            .filter(
              (sponsorship) =>
                sponsorship.sponsors?.length && sponsorship.sponsors.length > 0
            )
            .map(({ _id, type, sponsors }) => (
              <section key={_id} className={styles.sponsorLevel}>
                <Heading type="h3">{type}</Heading>
                <ul className={styles.sponsors}>
                  {sponsors?.map((sponsor) => (
                    <li key={sponsor._key} className={styles.sponsor}>
                      <Sponsor sponsor={sponsor as TSponsor} type={type} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      </GridWrapper>
    );
  }

  console.error(`Unrecognized SponsorsSection type: '${type}'`);
  return null;
};
