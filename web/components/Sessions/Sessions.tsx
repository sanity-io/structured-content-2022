import Link from 'next/link';
import { Session } from '../../types/Session';
import SectionBlock from '../SectionBlock';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import { formatDateWithTime } from '../../util/date';
import styles from './Sessions.module.css';
import { getEntityPath } from '../../util/entityPaths';

interface SessionProps {
  sessions: Session[];
}

export const Sessions = ({ sessions }: SessionProps) => (
  <>
    {sessions.map((session) => {
      const { title, startTime, speakers } = session;
      return (
        <SectionBlock key={title}>
          <Heading type="h2">
            <Link href={getEntityPath(session)}>{title}</Link>
          </Heading>
          <Paragraph>
            <span>{formatDateWithTime(startTime)}</span>
            {speakers.map(({ name, title }) => (
              <span key={name} className={styles.speaker}>
                <strong>{name}</strong>, {title}
              </span>
            ))}
          </Paragraph>
        </SectionBlock>
      );
    })}
  </>
);
