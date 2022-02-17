import { Sponsor as TSponsor, SponsorLevel } from '../../types/Sponsor';
import { imageUrlFor } from '../../lib/sanity';
import styles from './Sponsor.module.css';
import clsx from 'clsx';

interface SponsorProps {
  sponsor: TSponsor;
}

const imgDimensions: {
  [key in SponsorLevel]: {
    width: number;
    height: number;
    className: string;
  };
} = {
  Premier: {
    width: Math.round(288 / 2),
    height: Math.round(130 / 2),
    className: styles['sponsor--Premier'],
  },
  Gold: {
    width: Math.round(192 / 2),
    height: Math.round(88 / 2),
    className: styles['sponsor--Gold'],
  },
  Silver: {
    width: Math.round(128 / 2),
    height: Math.round(60 / 2),
    className: styles['sponsor--Silver'],
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
    .url()
    .replace(/rect=\d+,\d+,\d+,\d+&/, '');

  return (
    <div className={clsx(styles.sponsor, dimension.className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={title} />
    </div>
  );
};
