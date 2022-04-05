import { formatInTimeZone } from 'date-fns-tz';
import { addMinutes, intervalToDuration } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

export const formatTime = (date: Date, timezone: string, meridiem?: boolean) =>
  formatInTimeZone(date, timezone, meridiem ? 'h:mm aa' : 'HH:mm', {
    locale: enUS,
  });

export const formatDate = (date: Date, timezone: string) =>
  formatInTimeZone(date, timezone, 'MMMM d, yyyy', { locale: enUS });

export const formatDateWithDay = (
  date: Date,
  timezone: string,
  separator = ' – '
) =>
  formatInTimeZone(date, timezone, `eeee${separator}MMMM d`, { locale: enUS });

export const formatTimeDuration = (start: Date, duration: number) => {
  // This only handles durations of up to 24 hours
  const { hours, minutes } = intervalToDuration({
    start,
    end: addMinutes(start, duration),
  });
  return `PT${hours ? hours + 'H' : ''}${minutes ? minutes + 'M' : ''}`;
};

const differingMeridiem = (d1: Date, d2: Date) =>
  d1.getHours() >= 12 !== d2.getHours() >= 12;

export const formatTimeRange = (
  start: Date,
  duration: number,
  timezone: string
) => {
  const end = addMinutes(start, duration);
  return `${formatTime(
    start,
    timezone,
    differingMeridiem(start, end)
  )}–${formatTime(end, timezone)}`;
};

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
