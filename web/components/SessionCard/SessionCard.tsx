import Link from 'next/link';
import type { Session } from '../../types/Session';
import {
  defaultTimezone,
  formatDateWithDay,
  formatTimeDuration,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../util/date';
import { getEntityPath } from '../../util/entityPaths';
import styles from './SessionCard.module.css';

export interface SessionCardProps
  extends Pick<Session, '_type' | 'title' | 'duration' | 'slug'> {
  sessionStart: Date | null;
  timezone?: string;
}

export const SessionCard = ({
  _type,
  title,
  sessionStart,
  duration,
  timezone = defaultTimezone,
  slug,
}: SessionCardProps) => {
  const Content = (
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

  return slug?.current ? (
    <Link href={getEntityPath({ _type, slug })}>
      <a className={styles.link}>{Content}</a>
    </Link>
  ) : (
    Content
  );
};
