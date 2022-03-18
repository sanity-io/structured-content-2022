import checkmarkIcon from '../../images/checkmark.svg';
import crossIcon from '../../images/cross.svg';

interface FeatureCheckmarkProps {
  included?: boolean;
  className?: string;
}

/* eslint-disable @next/next/no-img-element */
export const FeatureCheckmark = ({
  included,
  className,
}: FeatureCheckmarkProps) =>
  included ? (
    <img
      src={checkmarkIcon.src}
      className={className}
      width={checkmarkIcon.width}
      height={checkmarkIcon.height}
      alt="Included"
    />
  ) : (
    <img
      src={crossIcon.src}
      className={className}
      width={crossIcon.width}
      height={crossIcon.height}
      alt="Not included"
    />
  );
/* eslint-enable @next/next/no-img-element */
