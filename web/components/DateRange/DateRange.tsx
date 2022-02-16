import { formatDateRange } from '../../util/date';

interface DateRangeProps {
  startTimestamp?: string;
  endTimestamp?: string;
}

export const DateRange = ({ startTimestamp, endTimestamp }: DateRangeProps) => {
  if (!startTimestamp || !endTimestamp) {
    return null;
  }

  const { start, end } = formatDateRange(startTimestamp, endTimestamp);
  return (
    <>
      <time dateTime={startTimestamp}>{start.trim()}</time>–
      <time dateTime={endTimestamp}>{end.trim()}</time>
    </>
  );
};
