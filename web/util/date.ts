import { format } from 'date-fns';

export const formatDateWithTime = (date: string) =>
  format(new Date(date), 'MMMM d, yyyy hh:mm');
