import Link from 'next/link';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { RichTextSection } from '../../../types/RichTextSection';
import { getEntityPath } from '../../../util/entityPaths';
import SharedSections from '../SharedSections';
import Person from '../Person';
import RichText from '../RichText';
import Venue from '../Venue';
import QuestionAndAnswerCollection from '../QuestionAndAnswerCollection';
import TextAndImage from '../TextAndImage';
import SimpleCallToAction from '../SimpleCallToAction';
import ConferenceUpdatesForm from '../../ConferenceUpdatesForm';
import VenuesSection from '../VenuesSection';
import SponsorsSection from '../SponsorsSection';
import Tickets from '../Tickets';
import Figure from '../Figure';
import Sponsorships from '../Sponsorships';
import Programs from '../Programs';

const components: Partial<PortableTextComponents> = {
  types: {
    richText: RichText,
    person: Person,
    venue: Venue,
    questionAndAnswerCollectionSection: QuestionAndAnswerCollection,
    textAndImageSection: TextAndImage,
    sharedSections: SharedSections,
    simpleCallToAction: SimpleCallToAction,
    mailchimpSection: ConferenceUpdatesForm,
    articleSection: RichText,
    venuesSection: VenuesSection,
    sponsorsSection: SponsorsSection,
    sponsorshipsSection: Sponsorships,
    ticketsSection: Tickets,
    figure: Figure,
    programsSection: Programs,
  },
  marks: {
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code>{children}</code>,
    internalLink: ({ text, value }) => (
      /* href has been seen in a case where both link and internalLink marks applied */
      <Link href={value?.href || getEntityPath(value.reference)}>{text}</Link>
    ),
    /* There are two different link marks, but currently TextBlock is used for
     * everything. One variant is in blockContent (href), another in
     * simpleBlockContent (internal/external). Would prefer to refactor the
     * TextBlock approach, but it'd be a pretty big job.
     */
    link: ({ children, value }) => {
      const url =
        value?.href || value?.internal?.slug?.current || value?.external;
      return url ? (
        <a
          href={url}
          {...(value?.blank ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          {children}
        </a>
      ) : (
        <>{children}</>
      );
    },
  },
};

interface TextBlockProps {
  value?:
    | PortableTextBlock[]
    | PortableTextBlock
    | RichTextSection
    | RichTextSection[];
}

export const TextBlock = ({ value }: TextBlockProps) =>
  value ? <PortableText value={value} components={components} /> : <></>;
