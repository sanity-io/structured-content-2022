import { Sponsorship } from '../../../../types/Sponsorship';
import { formatPrice } from '../../../../util/number';
import styles from '../Sponsorships.module.css';

interface SponsorshipHeadColumnProps {
  sponsorship: Sponsorship;
}

export const SponsorshipHeadColumn = ({
  sponsorship: { _id, type, available, price },
}: SponsorshipHeadColumnProps) => (
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
);
