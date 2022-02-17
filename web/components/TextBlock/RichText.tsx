import Paragraph from '../Paragraph';

export const RichText = ({ value }) => (
  <>
    {value.content
      .reduce((acc, content) => [...acc, ...content.children], [])
      .map((children) => (
        <Paragraph key={children._key}>{children.text}</Paragraph>
      ))}
  </>
);
