import { Section } from './Section';

export type RichTextSection = {
  _key: string;
  _type: 'richText';
  content: Section[];
  heading?: string;
  subheading?: string;
};
