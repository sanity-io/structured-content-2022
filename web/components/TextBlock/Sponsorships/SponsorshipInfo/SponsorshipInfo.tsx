import { Sponsorship } from '../../../../types/Sponsorship';
import { formatPrice } from '../../../../util/number';
import styles from '../Sponsorships.module.css';

interface SponsorshipInfoProps {
  sponsorship: Sponsorship;
}

export const SponsorshipInfo = ({
  sponsorship: { _id, available, price },
}: SponsorshipInfoProps) => (
  <>
    {available > 0 && (
      <div className={styles.spotsAvailable}>
        {available} available sponsorship
        {available > 1 ? 's' : null}
      </div>
    )}
    <div className={styles.price}>{formatPrice(price)}</div>
  </>
);
