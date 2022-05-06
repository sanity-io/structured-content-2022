import clsx from 'clsx';
import { Sponsor as TSponsor, SponsorLevel } from '../../types/Sponsor';
import { imageUrlFor } from '../../lib/sanity';
import styles from './Sponsor.module.css';

interface SponsorProps {
  sponsor: TSponsor;
  type?: SponsorLevel;
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
  Partner: {
    width: Math.round(192 * assumedScaleFactor),
    height: Math.round(88 * assumedScaleFactor),
    className: styles.partner,
  },
  Community: {
    width: Math.round(128 * assumedScaleFactor),
    height: Math.round(60 * assumedScaleFactor),
    className: styles.community,
  },
};

export const Sponsor = ({
  sponsor: { image, title, callToActionURL },
  type,
}: SponsorProps) => {
  const dimension = (type && imgDimensions[type]) || imgDimensions.Community;
  const src =
    image &&
    imageUrlFor(image)
      .auto('format')
      .bg('fff')
      .size(dimension.width, dimension.height)
      .fit('max')
      .ignoreImageParams()
      .url();

  return src ? (
    <a href={callToActionURL}>
      <div className={clsx(styles.sponsor, dimension.className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} className={styles.image} />
      </div>
    </a>
  ) : null;
};
