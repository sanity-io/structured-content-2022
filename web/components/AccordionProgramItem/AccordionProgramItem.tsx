import { formatTime } from "../../util/date";
import { Session } from "../../types/Session";
import styles from "./AccordionProgramItem.module.css";

interface AccordionProgramItemProps {
  programSession: {
    duration?: number;
    _key: string;
    _type: 'padding' | 'slot';
    session?: Session;
  };
}

export const AccordionProgramItem = ({ programSession }: AccordionProgramItemProps) =>
    <div className={styles.container}>
      {programSession._type === 'padding' ?
        <>
          <span>{programSession.duration} minutes</span>
          <span className={styles.sessionTitle}>Pause</span>
        </>
        : <>
          {/* TODO: This is shown in user's local time */}
          {formatTime(programSession.session.startTime)}
        <span className={styles.sessionTitle}>{programSession.session.title}</span>
        </>}
    </div>