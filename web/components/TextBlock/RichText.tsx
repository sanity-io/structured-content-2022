import { TextBlock } from './TextBlock';
import SectionBlock from '../SectionBlock';
import Heading from '../Heading';
import { RichTextSection } from '../../types/RichTextSection';

interface RichTextProps {
  value: RichTextSection;
}

export const RichText = ({ value }: RichTextProps) => (
  <SectionBlock>
    {value.heading && <Heading type="h2">{value.heading}</Heading>}
    <TextBlock value={value.content} />
  </SectionBlock>
);
