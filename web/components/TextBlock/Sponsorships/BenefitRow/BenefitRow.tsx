import clsx from 'clsx';
import { Sponsorship } from '../../../../types/Sponsorship';
import FeatureCheckmark from '../../../FeatureCheckmark';
import styles from '../Sponsorships.module.css';

interface BenefitRowProps {
  name: string;
  sponsorships: Sponsorship[];
}

export const BenefitRow = ({ name, sponsorships }: BenefitRowProps) => (
  <tr key={name}>
    <th scope="row" className={styles.rowHeader}>
      {name}
    </th>
    {sponsorships.map(({ _id, benefits }) => {
      const sponsorBenefit = benefits?.find((b) => b.benefit.name === name);
      return (
        <td
          key={_id}
          className={clsx(
            styles.cell,
            Boolean(sponsorBenefit) && styles.active
          )}
        >
          {sponsorBenefit?.number ? (
            <span className={styles.number}>{sponsorBenefit.number}</span>
          ) : (
            <FeatureCheckmark included={Boolean(sponsorBenefit)} />
          )}
          {sponsorBenefit?.description && (
            <span className={styles.description}>
              {sponsorBenefit.description}
            </span>
          )}
        </td>
      );
    })}
  </tr>
);
