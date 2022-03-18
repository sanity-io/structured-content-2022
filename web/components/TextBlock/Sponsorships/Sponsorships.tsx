import { getCollectionForSelectionType } from '../../../util/entity';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Sponsorship } from '../../../types/Sponsorship';
import BenefitRow from './BenefitRow';
import GridWrapper from '../../GridWrapper';
import SponsorshipHeadColumn from './SponsorshipHeadColumn';
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
    .map((s, index) => s.benefits.map((b) => ({ ...b.benefit, index })))
    .flat()
    .sort((a, b) => a.index - b.index)
    .map((b) => b.name);
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
    return (
      <GridWrapper>
        <table className={styles.container}>
          <thead>
            <tr>
              <th />
              {sponsorships.map((s) => (
                <SponsorshipHeadColumn key={s._id} sponsorship={s} />
              ))}
            </tr>
          </thead>
          <tbody>
            {allBenefitNamesSortOrderPreserved(allSponsorships).map((b) => (
              <BenefitRow key={b} name={b} sponsorships={sponsorships} />
            ))}
          </tbody>
        </table>
      </GridWrapper>
    );
  }

  console.error(`Unrecognized Sponsorships type: '${type}'`);
  return null;
};
