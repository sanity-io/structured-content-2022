import { addMinutes } from 'date-fns';
import { Session } from '../../types/Session';
import { formatTime } from '../../util/date';
import styles from './AccordionProgramItem.module.css';

interface AccordionProgramItemProps {
  programSession: {
    duration?: number;
    _key: string;
    _type: 'padding' | 'slot';
    session?: Session;
  };
  startTime: Date;
}

export const AccordionProgramItem = ({
  programSession,
  startTime,
}: AccordionProgramItemProps) => {
  if (programSession._type === 'padding') {
    return null;
  }

  return (
    <div className={styles.container}>
      {programSession.session.title}
      <span className={styles.sessionDuration}>
        {formatTime(startTime.toISOString())} -{' '}
        {formatTime(
          addMinutes(startTime, programSession.session.duration).toISOString()
        )}
      </span>
    </div>
  );
};
