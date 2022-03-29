import { addMinutes } from 'date-fns';
import {
  formatDateWithDay,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../util/date';

interface SessionDateTimeProps {
  startDateTime: string;
  slug: string;
  duration?: number;
  durations: {
    duration: number;
    slug: string;
  }[];
  mainVenueTimezone: string;
}

export const SessionDateTime = ({
  startDateTime,
  slug,
  duration,
  durations,
  mainVenueTimezone,
}: SessionDateTimeProps) => {
  if (!startDateTime || !duration) {
    return null;
  }

  const programStartDateTime = new Date(startDateTime);
  const currentSessionIndex = durations.findIndex(({ slug: s }) => s === slug);
  const currentSessionStartOffset =
    currentSessionIndex > -1
      ? durations.reduce(
          (acc, { duration }, i) =>
            i < currentSessionIndex ? acc + duration : acc,
          0
        )
      : 0;
  const sessionStartDateTime = addMinutes(
    programStartDateTime,
    currentSessionStartOffset
  );
  const startTimestamp = sessionStartDateTime.toISOString();
  const endTimestamp = addMinutes(sessionStartDateTime, duration).toISOString();
  const { start, end } = formatTimeRange(
    startTimestamp,
    endTimestamp,
    mainVenueTimezone
  );
  return (
    <>
      <div>{formatDateWithDay(startTimestamp, mainVenueTimezone, ', ')}</div>
      <div>
        {start}-{end}{' '}
        {getNonLocationTimezone(sessionStartDateTime, mainVenueTimezone, 'z')}
      </div>
    </>
  );
};
