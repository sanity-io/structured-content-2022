import logo from '../../images/logo.svg';
import styles from './ConferenceHeader.module.css';

interface ConferenceHeaderProps {
  name?: string;
  description?: string;
}

export const ConferenceHeader = ({
  name,
  description,
}: ConferenceHeaderProps) => {
  return (
    <div className={styles.root}>
      <h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          className={styles.logo}
          width={logo.width}
          height={logo.height}
          alt={name || ''}
        />
      </h1>
      <div className={styles.summary}>
        <div className={styles.datesAndHostedByWrapper}>
          <p className={styles.dates}>US: May 24–25, 2022</p>
          <p className={styles.dates}>UK &amp; Europe: May 25–26, 2022</p>
          <p className={styles.hostedBy}>Hosted by Sanity</p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
