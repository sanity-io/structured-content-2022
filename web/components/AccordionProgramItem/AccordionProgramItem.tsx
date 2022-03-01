import { Session } from '../../types/Session';
import styles from './AccordionProgramItem.module.css';
import { formatTime } from '../../util/date';
import { addMinutes } from 'date-fns';

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
}: AccordionProgramItemProps) => (
  <div className={styles.container}>
    {programSession._type === 'padding'
      ? 'Pause'
      : programSession.session.title}
    <span className={styles.sessionDuration}>
      {formatTime(startTime.toISOString())} -{' '}
      {formatTime(
        addMinutes(
          startTime,
          programSession.session?.duration || programSession.duration
        ).toISOString()
      )}
    </span>
  </div>
);
