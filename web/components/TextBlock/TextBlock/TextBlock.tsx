import Link from 'next/link';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { RichTextSection } from '../../../types/RichTextSection';
import { getEntityPath } from '../../../util/entityPaths';
import SharedSections from '../SharedSections';
import Person from '../Person';
import RichText from '../RichText';
import Block from '../Block';
import Venue from '../Venue';
import QuestionAndAnswerCollection from '../QuestionAndAnswerCollection';
import TextAndImage from '../TextAndImage';
import SimpleCallToAction from '../SimpleCallToAction';
import ConferenceUpdatesForm from '../../ConferenceUpdatesForm';
import VenuesSection from '../VenuesSection';
import SponsorsSection from '../SponsorsSection';
import Tickets from '../Tickets';
import Figure from '../Figure';

const components: Partial<PortableTextComponents> = {
  types: {
    richText: RichText,
    person: Person,
    venue: Venue,
    questionAndAnswerCollectionSection: QuestionAndAnswerCollection,
    block: Block,
    textAndImageSection: TextAndImage,
    sharedSections: SharedSections,
    simpleCallToAction: SimpleCallToAction,
    mailchimpSection: ConferenceUpdatesForm,
    articleSection: RichText,
    venuesSection: VenuesSection,
    sponsorsSection: SponsorsSection,
    ticketsSection: Tickets,
    figure: Figure,
  },
  marks: {
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code>{children}</code>,
    internalLink: ({ text, value }) => (
      <Link href={getEntityPath(value.reference)}>{text}</Link>
    ),
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
