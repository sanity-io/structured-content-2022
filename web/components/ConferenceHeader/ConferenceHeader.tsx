import logo from '../../images/logo.svg';
import styles from './ConferenceHeader.module.css';
import DateRange from '../DateRange';

interface ConferenceHeaderProps {
  name?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export const ConferenceHeader = ({
  name,
  startDate,
  endDate,
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
        <p>
          <DateRange startDate={startDate} endDate={endDate} />
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
};
