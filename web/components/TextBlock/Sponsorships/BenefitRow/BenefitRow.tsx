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
    <td>{name}</td>
    {sponsorships.map(({ _id, benefits }) => {
      const sponsorBenefit = benefits?.find((b) => b.benefit.name === name);
      return (
        <td
          key={_id}
          className={clsx(Boolean(sponsorBenefit) && styles.active)}
        >
          {sponsorBenefit?.number ?? (
            <FeatureCheckmark included={Boolean(sponsorBenefit)} />
          )}
          {sponsorBenefit?.description && (
            <div>{sponsorBenefit.description}</div>
          )}
        </td>
      );
    })}
  </tr>
);