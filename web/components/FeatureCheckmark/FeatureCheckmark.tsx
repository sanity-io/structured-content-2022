import checkmarkIcon from '../../images/checkmark.svg';
import crossIcon from '../../images/cross.svg';

interface FeatureCheckmarkProps {
  included?: boolean;
  className?: string;
  hideAltText?: boolean;
}

/* eslint-disable @next/next/no-img-element */
export const FeatureCheckmark = ({
  included,
  className,
  hideAltText,
}: FeatureCheckmarkProps) =>
  included ? (
    <img
      src={checkmarkIcon.src}
      className={className}
      width={checkmarkIcon.width}
      height={checkmarkIcon.height}
      alt={hideAltText ? '' : 'Included'}
    />
  ) : (
    <img
      src={crossIcon.src}
      className={className}
      width={crossIcon.width}
      height={crossIcon.height}
      alt={hideAltText ? '' : 'Not included'}
    />
  );
/* eslint-enable @next/next/no-img-element */
