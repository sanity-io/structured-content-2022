import Link from 'next/link';
import type { Session } from '../../types/Session';
import {
  formatDateWithDay,
  formatTimeDuration,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../util/date';
import { getEntityPath } from '../../util/entityPaths';
import styles from './SessionCard.module.css';

interface SessionCardProps
  extends Pick<Session, '_type' | 'title' | 'duration' | 'slug'> {
  sessionStart?: Date;
  timezone?: string;
}

export const SessionCard = ({
  _type,
  title,
  sessionStart,
  duration,
  timezone,
  slug,
}: SessionCardProps) => {
  const Content = (
    <div className={styles.card}>
      <strong className={styles.title}>{title}</strong>
      {sessionStart && (
        <div>
          <time dateTime={sessionStart.toISOString()}>
            {formatDateWithDay(sessionStart, timezone || 'UTC')}
          </time>
        </div>
      )}
      {sessionStart && duration && (
        <div>
          <time dateTime={formatTimeDuration(sessionStart, duration)}>
            {formatTimeRange(sessionStart, duration, timezone || 'UTC')}{' '}
            {getNonLocationTimezone(sessionStart, timezone, true)}
          </time>
        </div>
      )}
    </div>
  );

  return slug?.current ? (
    <Link href={getEntityPath({ _type, slug })}>
      <a className={styles.link}>{Content}</a>
    </Link>
  ) : (
    Content
  );
};
