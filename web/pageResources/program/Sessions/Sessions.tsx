import Link from 'next/link';
import { Session } from '../../../../types/Session';
import SectionBlock from '../../../components/SectionBlock';
import Heading from '../../../components/Heading';
import Paragraph from '../../../components/Paragraph';
import { formatDateWithTime } from '../../../util/date';
import styles from './Sessions.module.css';

interface SessionProps {
  sessions: Session[];
}

export const Sessions = ({ sessions }: SessionProps) => (
  <>
    {sessions.map(({ _id, title, startTime, speakers }) => (
      <SectionBlock key={title}>
        <Heading type="h2">
          <Link href={`/sessions/${_id}`}>{title}</Link>
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
    ))}
  </>
);
