import { Sponsor as TSponsor, SponsorLevel } from '../../types/Sponsor';
import { imageUrlFor } from '../../lib/sanity';
import styles from './Sponsor.module.css';
import clsx from 'clsx';

interface SponsorProps {
  sponsor: TSponsor;
}

const assumedScaleFactor = 0.6;

const imgDimensions: {
  [key in SponsorLevel]: {
    width: number;
    height: number;
    className: string;
  };
} = {
  Premier: {
    width: Math.round(288 * assumedScaleFactor),
    height: Math.round(130 * assumedScaleFactor),
    className: styles.premier,
  },
  Gold: {
    width: Math.round(192 * assumedScaleFactor),
    height: Math.round(88 * assumedScaleFactor),
    className: styles.gold,
  },
  Silver: {
    width: Math.round(128 * assumedScaleFactor),
    height: Math.round(60 * assumedScaleFactor),
    className: styles.silver,
  },
};

export const Sponsor = ({
  sponsor: {
    sponsorship: { type },
    image,
    title,
  },
}: SponsorProps) => {
  const dimension = imgDimensions[type] || imgDimensions.Silver;
  const src = imageUrlFor(image)
    .auto('format')
    .bg('fff')
    .size(dimension.width, dimension.height)
    .fit('max')
    .ignoreImageParams()
    .url();

  return (
    <div className={clsx(styles.sponsor, dimension.className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={title} className={styles.image} />
    </div>
  );
};
