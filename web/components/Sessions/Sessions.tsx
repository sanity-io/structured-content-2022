import Link from 'next/link';
import { Session } from '../../types/Session';
import SectionBlock from '../SectionBlock';
import { getEntityPath } from '../../util/entityPaths';
import { PortableTextComponentProps } from '@portabletext/react/dist/react-portable-text.esm';
import { EntitySectionSelection } from '../../types/EntitySectionSelection';
import { getCollectionForSelectionType } from '../../util/entity';

type SessionProps = {
  type: EntitySectionSelection;
  allSessions: Session[];
  sessions?: Session[];
};

export const Sessions = ({
  value: { type, allSessions, sessions },
}: PortableTextComponentProps<SessionProps>) => (
  <>
    {getCollectionForSelectionType(type, allSessions, sessions).map(
      (session) => {
        const { title, _id } = session;
        return (
          <SectionBlock key={_id}>
            <h2>
              <Link href={getEntityPath(session)}>{title}</Link>
            </h2>
          </SectionBlock>
        );
      }
    )}
  </>
);
