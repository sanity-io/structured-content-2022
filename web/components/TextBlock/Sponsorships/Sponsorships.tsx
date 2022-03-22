import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Sponsorship } from '../../../types/Sponsorship';
import { getCollectionForSelectionType } from '../../../util/entity';
import FeatureSection from '../../FeatureSection';
import GridWrapper from '../../GridWrapper';
import BenefitRow from './BenefitRow';
import SponsorshipInfo from './SponsorshipInfo';
import styles from './Sponsorships.module.css';

interface SponsorshipsProps {
  value: {
    type: EntitySectionSelection;
    allSponsorships?: Sponsorship[];
    sponsorships?: Sponsorship[];
  };
}

const allBenefitNamesSortOrderPreserved = (allSponsorships: Sponsorship[]) => {
  const benefitNames = allSponsorships
    .map((s, index) => s.benefits?.map((b) => ({ ...b.benefit, index })))
    .flat()
    .sort((a, b) => a.index - b.index)
    .map((b) => b?.name);
  return Array.from(new Set(benefitNames));
};

export const Sponsorships = ({
  value: { type, sponsorships: highlightedSponsorships, allSponsorships },
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
        <table className={styles.container}>
          <thead>
            <tr>
              <th />
              {sponsorships.map((s) => (
                <th key={s._id}>
                  <SponsorshipInfo sponsorship={s} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allBenefitNamesSortOrderPreserved(allSponsorships).map((b) => (
              <BenefitRow key={b} name={b} sponsorships={sponsorships} />
            ))}
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
                <SponsorshipInfo sponsorship={s} />
              </FeatureSection>
            );
          })}
        </div>
      </GridWrapper>
    );
  }

  console.error(`Unrecognized Sponsorships type: '${type}'`);
  return null;
};
