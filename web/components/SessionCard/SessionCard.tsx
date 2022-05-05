import {
  defaultTimezone,
  formatDateWithDay,
  formatTimeDuration,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../util/date';
import styles from './SessionCard.module.css';

interface SessionCardProps {
  title: string;
  sessionStart?: Date;
  duration?: number;
  timezone?: string;
}

export const SessionCard = ({
  title,
  sessionStart,
  duration,
  timezone = defaultTimezone,
}: SessionCardProps) => (
  <div className={styles.card}>
    <strong className={styles.title}>{title}</strong>
    {sessionStart && (
      <div>
        <time dateTime={sessionStart.toISOString()}>
          {formatDateWithDay(sessionStart, timezone)}
        </time>
      </div>
    )}
    {sessionStart && duration && (
      <div>
        <time dateTime={formatTimeDuration(sessionStart, duration)}>
          {formatTimeRange(sessionStart, duration, timezone)}{' '}
          {getNonLocationTimezone(sessionStart, timezone, true)}
        </time>
      </div>
    )}
  </div>
);
