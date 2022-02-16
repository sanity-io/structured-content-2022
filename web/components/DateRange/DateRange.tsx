import { formatDateRange } from '../../util/date';

interface DateRangeProps {
  startDate: string;
  endDate: string;
}

export const DateRange = ({ startDate, endDate }: DateRangeProps) => {
  if (!startDate || !endDate) {
    return null;
  }

  const { start, end } = formatDateRange(startDate, endDate);
  return (
    <>
      <time dateTime={start}>{start.trim()}</time>–
      <time dateTime={end}>{end.trim()}</time>
    </>
  );
};
