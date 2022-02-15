import Link from 'next/link';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { RichTextSection } from '../../types/RichTextSection';
import { getEntityPath } from "../../util/entityPaths";
import Paragraph from '../Paragraph';

const RichText = ({ value }) => (
  <>
    {value.content
      .reduce((acc, content) => [...acc, ...content.children], [])
      .map((children) => (
        <Paragraph key={children._key}>{children.text}</Paragraph>
      ))}
  </>
);

const Person = ({ value: speaker }) => (
  <Link href={getEntityPath(speaker)}>
    <a>{speaker.name}</a>
  </Link>
)

const Venue = ({ value: venue }) => (
  <Link href={getEntityPath(venue)}>
    <a>{venue.title}</a>
  </Link>
);

const components: Partial<PortableTextComponents> = {
  types: {
    richText: RichText,
    person: Person,
    venue: Venue,
    block: ({ value }) =>
      value.children.map((child, index) => {
          if (!child._key && child._type) {
            switch (child._type) {
              case 'richText':
                return <RichText value={child}/>;
              case 'person':
                return <Person value={child}/>;
              case 'venue':
                return <Venue value={child}/>;
              default:
                return null;
            }
          }

          return <span key={index}>{child.text}</span>;
        }
      ),
  },
  marks: {
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code>{children}</code>,
    internalLink: ({ text, value }) => <Link href={getEntityPath(value.reference)}>{text}</Link>,
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
  value ? <PortableText value={value} components={components}/> : <></>;
