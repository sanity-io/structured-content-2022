import { format } from 'date-fns';

export const formatDateWithTime = (date: string) =>
  format(new Date(date), 'MMMM d, yyyy');

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

export const formatDateRangeInUtc = (timestamp1: string, timestamp2: string) => {
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
