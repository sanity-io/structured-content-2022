import ConferenceUpdatesForm from '../../ConferenceUpdatesForm';
import Heading from '../../Heading';
import Figure from '../Figure';
import RichText from '../RichText';
import VenuesSection from '../VenuesSection';
import SponsorsSection from '../SponsorsSection';
import TextAndImage from '../TextAndImage';
import QuestionAndAnswerCollection from '../QuestionAndAnswerCollection';
import Speakers from '../Speakers';
import Sessions from '../../Sessions';
import Tickets from '../Tickets';

export const SharedSections = ({ value: { name, sections, ...rest } }) => (
  <>
    <Heading type="h2">{name}</Heading>
    {sections.map((section) => {
      // Matches /studio/schemas/sections/index.ts
      // plus "figure" from /studio/schemas/documents/sharedSections.ts
      switch (section._type) {
        case 'figure':
          return <Figure key={section._key} value={section} {...({} as any)} />;
        case 'articleSection':
          return <RichText key={section._key} value={section} />;
        case 'textAndImageSection':
          return <TextAndImage key={section._key} value={section} />;
        case 'questionAndAnswerCollectionSection':
          return (
            <QuestionAndAnswerCollection key={section._key} value={section} />
          );
        case 'formSection':
          return (
            <ConferenceUpdatesForm
              key={section._key}
              value={section}
              {...(rest as any)}
            />
          );
        case 'speakersSection':
          return (
            <Speakers key={section._key} value={section} {...({} as any)} />
          );
        case 'sessionsSection':
          return (
            <Sessions key={section._key} value={section} {...({} as any)} />
          );
        case 'venuesSection':
          return (
            <VenuesSection
              key={section._key}
              value={section}
              {...({} as any)}
            />
          );
        case 'sponsorsSection':
          return (
            <SponsorsSection
              key={section._key}
              value={section}
              {...({} as any)}
            />
          );
        case 'sponsorshipsSection':
          return null; // Implemented in PR #66
        case 'ticketsSection':
          return (
            <Tickets key={section._key} value={section} {...({} as any)} />
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
