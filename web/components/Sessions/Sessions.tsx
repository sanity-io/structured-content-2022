import Link from 'next/link';
import { Session } from '../../types/Session';
import SectionBlock from '../SectionBlock';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import { formatDateWithTime } from '../../util/date';
import { getEntityPath } from '../../util/entityPaths';
import { PortableTextComponentProps } from "@portabletext/react/dist/react-portable-text.esm";
import { EntitySectionSelection } from "../../types/EntitySectionSelection";

type SessionProps = {
  type: EntitySectionSelection;
 allSessions: Session[];
 sessions?: Session[];
}

export const Sessions = ({  value: { allSessions, sessions } }: PortableTextComponentProps<SessionProps>) => (
  <>
    {(sessions || allSessions).map((session) => {
      const { title, startTime, _id } = session;
      return (
        <SectionBlock key={_id}>
          <Heading type="h2">
            <Link href={getEntityPath(session)}>{title}</Link>
          </Heading>
          <Paragraph>
            {<span>{formatDateWithTime(startTime)}</span>}
          </Paragraph>
        </SectionBlock>
      );
    })}
  </>
);
