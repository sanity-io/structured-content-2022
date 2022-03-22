import checkmarkIcon from '../../images/checkmark.svg';
import crossIcon from '../../images/cross.svg';
import styles from './FeatureCheckmark.module.css';

interface FeatureCheckmarkProps {
  included?: boolean;
  hideAltText?: boolean;
}

/* eslint-disable @next/next/no-img-element */
export const FeatureCheckmark = ({
  included,
  hideAltText,
}: FeatureCheckmarkProps) =>
  included ? (
    <img
      src={checkmarkIcon.src}
      className={styles.icon}
      width={checkmarkIcon.width}
      height={checkmarkIcon.height}
      alt={hideAltText ? '' : 'Included'}
    />
  ) : (
    <img
      src={crossIcon.src}
      className={styles.icon}
      width={crossIcon.width}
      height={crossIcon.height}
      alt={hideAltText ? '' : 'Not included'}
    />
  );
/* eslint-enable @next/next/no-img-element */
