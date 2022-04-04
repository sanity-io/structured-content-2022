import type { PortableTextComponentProps } from '@portabletext/react';
import type { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import type { Person } from '../../../types/Person';
import type { SimpleCallToAction } from '../../../types/SimpleCallToAction';
import { getCollectionForSelectionType } from '../../../util/entity';
import ButtonLink from '../../ButtonLink';

type SpeakersProps = {
  type: EntitySectionSelection;
  heading?: string;
  callToAction?: SimpleCallToAction;
  allSpeakers?: Person[];
  speakers?: Person[];
};

export const Speakers = ({
  value: { type, heading, callToAction, allSpeakers, speakers },
}: PortableTextComponentProps<SpeakersProps>) => (
  <>
    {heading && <h2>{heading}</h2>}
    {callToAction && (
      <div>
        <ButtonLink
          url={
            callToAction.link?.external ||
            callToAction.link?.internal?.slug?.current
          }
          text={callToAction.text}
        />
      </div>
    )}
    {getCollectionForSelectionType(type, allSpeakers, speakers).map(
      (speaker) => (
        <div key={speaker._id}>
          <div>{speaker.name}</div>
          <div>{speaker.title}</div>
        </div>
      )
    )}
  </>
);
