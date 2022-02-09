import { PortableText, PortableTextComponents } from '@portabletext/react';
import Paragraph from '../Paragraph';
import SectionBlock from '../SectionBlock';

const components: Partial<PortableTextComponents> = {
  types: {
    richText: ({ value }) => (
      <SectionBlock>
        {value.content
          .reduce((acc, content) => [...acc, ...content.children], [])
          .map((children) => (
            <Paragraph key={children.text}>{children.text}</Paragraph>
          ))}
      </SectionBlock>
    ),
  },

  marks: {
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code>{children}</code>,
  },
};

export const TextBlock = ({ value }) => (
  <PortableText value={value} components={components} />
);
