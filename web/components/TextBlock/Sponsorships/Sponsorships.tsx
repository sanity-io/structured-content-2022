import type { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import type { Sponsorship } from '../../../types/Sponsorship';
import { getCollectionForSelectionType } from '../../../util/entity';
import { formatPrice } from '../../../util/number';
import FeatureSection from '../../FeatureSection';
import GridWrapper from '../../GridWrapper';
import BenefitRow from './BenefitRow';
import styles from './Sponsorships.module.css';

interface SponsorshipsProps {
  value: {
    type: EntitySectionSelection;
    heading: string;
    allSponsorships: Sponsorship[];
    sponsorships?: Sponsorship[];
  };
}

const allBenefitNamesSortOrderPreserved = (allSponsorships: Sponsorship[]) => {
  const benefitNames = allSponsorships
    .map((s, index) => s.benefits?.map((b) => ({ ...b.benefit, index })))
    .flat()
    .filter((b) => Boolean(b?.name))
    .sort((a, b) => a!.index - b!.index)
    .map((b) => b!.name);
  return Array.from(new Set(benefitNames)) as string[];
};

export const Sponsorships = ({
  value: {
    type,
    heading,
    sponsorships: highlightedSponsorships,
    allSponsorships,
  },
}: SponsorshipsProps) => {
  if (type === 'none') {
    return null;
  }

  if (type === 'highlighted' || type === 'all') {
    const sponsorships = getCollectionForSelectionType(
      type,
      allSponsorships,
      highlightedSponsorships
    );
    if (!Array.isArray(sponsorships)) {
      console.error(`Invalid sponsorships parameter: '${sponsorships}'`);
      return null;
    }

    return (
      <GridWrapper>
        <div className={styles.container}>
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          <table className={styles.table}>
            <thead>
              <tr>
                <th />
                {sponsorships.map((s) => (
                  <th key={s._id} scope="col" className={styles.columnHeader}>
                    <strong className={styles.sponsorshipName}>{s.type}</strong>
                    <div className={styles.price}>{formatPrice(s.price)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allBenefitNamesSortOrderPreserved(allSponsorships).map(
                (benefit) => (
                  <BenefitRow
                    key={benefit}
                    name={benefit}
                    sponsorships={sponsorships}
                  />
                )
              )}
            </tbody>
          </table>

          <div className={styles.listContainer}>
            {sponsorships.map((s) => {
              const features = s.benefits?.map(
                ({ number, benefit, description }) =>
                  (typeof number === 'number' ? `${number} ` : '') +
                  benefit.name +
                  (description ? ` – ${description}` : '')
              );
              return (
                <FeatureSection features={features} key={s._id}>
                  <h3 className={styles.sponsorshipName}>{s.type}</h3>
                  <div className={styles.price}>{formatPrice(s.price)}</div>
                </FeatureSection>
              );
            })}
          </div>
        </div>
      </GridWrapper>
    );
  }

  console.error(`Unrecognized Sponsorships type: '${type}'`);
  return null;
};
