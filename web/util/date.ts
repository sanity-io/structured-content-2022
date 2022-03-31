import { formatInTimeZone } from 'date-fns-tz';
import { addMinutes, intervalToDuration } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

export const formatTime = (date: Date, timezone: string) =>
  formatInTimeZone(date, timezone, 'HH:mm', { locale: enUS });

export const formatTimeRange = (
  date: Date,
  duration: number,
  timezone: string
) =>
  `${formatTime(date, timezone)}–${formatTime(
    addMinutes(date, duration),
    timezone
  )}`;

export const formatDate = (date: Date, timezone: string) =>
  formatInTimeZone(date, timezone, 'MMMM d, yyyy', { locale: enUS });

export const formatDateWithDay = (date: Date, timezone: string) =>
  formatInTimeZone(date, timezone, 'eeee – MMMM d', { locale: enUS });

export const formatTimeDuration = (start: Date, duration: number) => {
  // This only handles durations of up to 24 hours
  const { hours, minutes } = intervalToDuration({
    start,
    end: addMinutes(start, duration),
  });
  return `PT${hours ? hours + 'H' : ''}${minutes ? minutes + 'M' : ''}`;
};

const meridiem = (date: string) =>
  new Date(date).getHours() >= 12 ? 'PM' : 'AM';

export const formatTimeRange = (
  timestamp1: string,
  timestamp2: string,
  timezone: string
) => ({
  start: formatInTimeZone(
    new Date(timestamp1),
    timezone,
    `H:mm${meridiem(timestamp1) !== meridiem(timestamp2) ? ' aa' : ''}`,
    { locale: enUS }
  ),
  end: formatInTimeZone(new Date(timestamp2), timezone, 'H:mm aa', {
    locale: enUS,
  }),
});

/* Converts an IANA time zone name, which typically refers to a specific city,
 * into a "non-location" format. Gives the long-form format by default.
 * Example: given the locationTimezone "Europe/Paris", this will yield "Central
 * European Time" or "Central European Summer Time" depending on the timestamp.
 * If "abbreviated" is true it'll yield "CET" or "CEST".
 */
export const getNonLocationTimezone = (
  timestamp: Date,
  locationTimezone: string,
  abbreviated?: boolean
): string =>
  formatInTimeZone(timestamp, locationTimezone, abbreviated ? 'z' : 'zzzz', {
    locale: enUS,
  });
