import { Sponsor as TSponsor } from '../../types/Sponsor';
import { imageUrlFor } from '../../lib/sanity';
import styles from './Sponsor.module.css';

interface SponsorProps {
  sponsor: TSponsor;
}

export const Sponsor = ({ sponsor }: SponsorProps) => {
  // TODO: .fit does not seem to work correctly here -- why?
  const src = imageUrlFor(sponsor.image)
    .auto('format')
    .height(100)
    .fit('clip')
    .url();
  return (
    <div className={styles.sponsor}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.image} src={src} alt={sponsor.title} />
    </div>
  );
};
