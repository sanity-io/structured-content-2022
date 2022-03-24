import { formatInTimeZone } from 'date-fns-tz';
import enUS from 'date-fns/locale/en-US';

export const formatTime = (date: string, timezone: string) =>
  formatInTimeZone(new Date(date), timezone, 'HH:mm', { locale: enUS });

export const formatDate = (date: string, timezone: string) =>
  formatInTimeZone(new Date(date), timezone, 'MMMM d, yyyy', { locale: enUS });

export const formatDateWithDay = (date: string, timezone: string) =>
  formatInTimeZone(new Date(date), timezone, 'eeee – MMMM d', { locale: enUS });

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const utcDate = (date: string) => {
  const d = new Date(date);
  return {
    day: d.getUTCDate(),
    month: d.getUTCMonth(),
    year: d.getUTCFullYear(),
  };
};

export const formatDateRangeInUtc = (
  timestamp1: string,
  timestamp2: string
) => {
  const d1 = utcDate(timestamp1);
  const d2 = utcDate(timestamp2);

  const y1 = Math.abs(d2.year - d1.year) > 0 ? `, ${d1.year}` : '';
  const m2 =
    Math.abs(d2.month - d1.month) > 0 ? ` ${monthNames[d2.month]} ` : '';

  return {
    start: `${monthNames[d1.month]} ${d1.day}${y1}`,
    end: `${m2}${d2.day}, ${d2.year}`,
  };
};

/* Converts an IANA time zone name, which typically refers to a specific city,
 * into a long-form "non-location" format.
 * Example: given the locationTimezone "Europe/Paris", this will yield "Central
 * European Time" or "Central European Summer Time" depending on the timestamp.
 */
export const getNonLocationTimezone = (
  timestamp: Date,
  locationTimezone: string
): string =>
  formatInTimeZone(timestamp, locationTimezone, 'zzzz', { locale: enUS });
