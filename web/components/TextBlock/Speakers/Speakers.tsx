import { Person } from '../../../types/Person';
import { PortableTextComponentProps } from '@portabletext/react/dist/react-portable-text.esm';
import { EntitySectionSelection } from "../../../types/EntitySectionSelection";
import { getCollectionForSelectionType } from "../../../util/entity";

type SpeakersProps = {
  type: EntitySectionSelection;
  allSpeakers?: Person[];
  speakers?: Person[];
};

export const Speakers = ({
  value: { type, allSpeakers, speakers },
}: PortableTextComponentProps<SpeakersProps>) => (
  <>
    {getCollectionForSelectionType(type, allSpeakers, speakers).map((speaker) => (
      <div key={speaker._id}>
        <div>{speaker.name}</div>
        <div>{speaker.title}</div>
      </div>
    ))}
  </>
);
