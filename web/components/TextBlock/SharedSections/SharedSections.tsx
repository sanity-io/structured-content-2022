import Image from 'next/image';
import { imageUrlFor } from '../../../lib/sanity';
import ConferenceUpdatesForm from '../../ConferenceUpdatesForm';
import Heading from '../../Heading';
import RichText from '../RichText';
import SimpleCallToAction from '../SimpleCallToAction';
import VenuesSection from '../VenuesSection';
import SponsorsSection from '../SponsorsSection';
import TextAndImage from "../TextAndImage";
import QuestionAndAnswerCollection from "../QuestionAndAnswerCollection";
import Speakers from "../Speakers";
import Sessions from "../../Sessions";

const Figure = ({ value: { alt, asset } }) => (
  <Image
    src={imageUrlFor(asset).size(200, 200).url()}
    width={200}
    height={200}
    alt={alt}
  />
);

export const SharedSections = ({ value: { name, sections, ...rest } }) => (
  <>
    <Heading type="h2">{name}</Heading>
    {sections.map((section) => {
      // Matches /studio/schemas/sections/index.ts
      // plus "figure" from /studio/schemas/documents/sharedSections.ts
      switch (section._type) {
        case 'figure':
          return <Figure key={section._key} value={section} />;
        case 'articleSection':
          return <RichText key={section._key} value={section} />;
        case 'textAndImageSection':
          return <TextAndImage key={section.key} value={section} />;
        case 'questionAndAnswerCollectionSection':
          return <QuestionAndAnswerCollection key={section.key} value={section} />;
        case 'mailchimpSection':
          return (
            <ConferenceUpdatesForm
              key={section._key}
              value={section}
              {...(rest as any)}
            />
          );
        case 'speakersSection':
          return <Speakers key={section.key} value={section} />;
        case 'sessionsSection': // TODO: implement
          return <Sessions {...{} as any}  />;
        case 'venuesSection':
          return <VenuesSection key={section._key} value={section} />;
        case 'sponsorsSection':
          return <SponsorsSection key={section._key} value={section} />;
        case 'sponsorshipSection':
          return null; // Implemented in PR #66
        case 'simpleCallToAction':
          return (
            <SimpleCallToAction
              key={section._key}
              value={section}
              {...(rest as any)}
            />
          );
        default:
          console.error(
            `Unrecognized SharedSections section type '${section._type}'`
          );
          return null;
      }
    })}
  </>
);
