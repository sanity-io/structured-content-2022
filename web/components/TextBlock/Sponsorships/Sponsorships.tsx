import clsx from 'clsx';
import { getCollectionForSelectionType } from '../../../util/entity';
import { formatPrice } from '../../../util/number';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Sponsorship } from '../../../types/Sponsorship';
import GridWrapper from '../../GridWrapper';
import FeatureCheckmark from '../../FeatureCheckmark';
import styles from './Sponsorships.module.css';

interface SponsorshipsProps {
  value: {
    type: EntitySectionSelection;
    allSponsorships?: Sponsorship[];
    sponsorships?: Sponsorship[];
  };
}

const baseOfferingWithPerk = (offerings: string[], currentOffering: string) =>
  offerings
    .map((o) => o.split(' - '))
    .map(([baseOffering, extraPerk]) => ({ baseOffering, extraPerk }))
    .find((o) => o.baseOffering === currentOffering);

export const Sponsorships = ({
  value: { type, sponsorships: highlightedSponsorships, allSponsorships },
}: SponsorshipsProps) => {
  if (type === 'none') {
    return null;
  }

  if (type === 'highlighted' || type === 'all') {
    const allOfferings = Array.from(
      new Set(allSponsorships.map((sponsorship) => sponsorship.offering).flat())
    ).map((offering) => offering.split(' - ')[0]);
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
            <tr>
              <td>In-person passes included</td>
              {sponsorships.map(
                ({ _id, passes: { inPerson } = { inPerson: 0 } }) => (
                  <td key={_id} className={clsx(inPerson > 0 && styles.active)}>
                    {inPerson > 0 ? inPerson : <FeatureCheckmark />}
                  </td>
                )
              )}
            </tr>

            <tr>
              <td>Workshop passes included</td>
              {sponsorships.map(
                ({ _id, passes: { workshop } = { workshop: 0 } }) => (
                  <td key={_id} className={clsx(workshop > 0 && styles.active)}>
                    {workshop > 0 ? workshop : <FeatureCheckmark />}
                  </td>
                )
              )}
            </tr>

            {allOfferings.map((offering, index) => (
              <tr key={`${offering}_${index}`}>
                <td>{offering}</td>
                {sponsorships.map(({ _id, offering: offerings }) => {
                  const o = baseOfferingWithPerk(offerings, offering);
                  return (
                    <td key={_id} className={clsx(Boolean(o) && styles.active)}>
                      <FeatureCheckmark included={Boolean(o)} />
                      {o?.extraPerk && <div>{o.extraPerk}</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </GridWrapper>
    );
  }

  console.error(`Unrecognized Sponsorships type: '${type}'`);
  return null;
};
