import { getCollectionForSelectionType } from '../../../util/entity';
import { formatPrice } from '../../../util/number';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Sponsorship } from '../../../types/Sponsorship';
import BenefitRow from './BenefitRow';
import GridWrapper from '../../GridWrapper';
import styles from './Sponsorships.module.css';

interface SponsorshipsProps {
  value: {
    type: EntitySectionSelection;
    allSponsorships?: Sponsorship[];
    sponsorships?: Sponsorship[];
  };
}

const allBenefitNamesSortOrderPreserved = (allSponsorships: Sponsorship[]) => {
  const benefits = allSponsorships
    .map((s, index) => s.benefits.map((b) => ({ name: b.benefit.name, index })))
    .flat();
  const sorted = benefits.sort((a, b) => a.index - b.index).map((b) => b.name);
  return Array.from(new Set(sorted));
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
              {sponsorships.map(({ _id, type, available, price }) => (
                <th key={_id}>
                  <h2 className={styles.sponsorshipName}>{type}</h2>

                  {available > 0 && (
                    <div className={styles.spotsAvailable}>
                      {available} available sponsorship
                      {available > 1 ? 's' : null}
                    </div>
                  )}
                  <div className={styles.price}>{formatPrice(price)}</div>
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
      </GridWrapper>
    );
  }

  console.error(`Unrecognized Sponsorships type: '${type}'`);
  return null;
};
