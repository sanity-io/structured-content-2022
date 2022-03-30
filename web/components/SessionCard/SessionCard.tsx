import {
  formatDateWithDay,
  formatTimeDuration,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../util/date';
import styles from './SessionCard.module.css';

interface SessionCardProps {
  title: string;
  startTime?: Date;
  duration?: number;
  timezone?: string;
}

export const SessionCard = ({
  title,
  startTime,
  duration,
  timezone,
}: SessionCardProps) => (
  <div className={styles.card}>
    <strong className={styles.title}>{title}</strong>
    {startTime && (
      <div>
        <time dateTime={startTime.toString()}>
          {formatDateWithDay(startTime, timezone || 'UTC')}
        </time>
      </div>
    )}
    {startTime && duration && (
      <div>
        <time dateTime={formatTimeDuration(startTime, duration)}>
          {formatTimeRange(startTime, duration, timezone || 'UTC')}{' '}
          {getNonLocationTimezone(startTime, timezone, true)}
        </time>
      </div>
    )}
  </div>
);
