import { Person } from '../../../types/Person';
import { PortableTextComponentProps } from '@portabletext/react/dist/react-portable-text.esm';

type SpeakersProps = {
  allSpeakers?: Person[];
  speakers?: Person[];
};

export const Speakers = ({
  value: { speakers, allSpeakers },
}: PortableTextComponentProps<SpeakersProps>) => (
  <>
    {(speakers || allSpeakers).map((speaker) => (
      <div key={speaker._id}>
        <div>{speaker.name}</div>
        <div>{speaker.title}</div>
      </div>
    ))}
  </>
);
