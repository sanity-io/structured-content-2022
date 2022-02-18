import { TextBlock } from './TextBlock';
import SectionBlock from '../SectionBlock';

export const RichText = ({ value }) => (
  <SectionBlock>
    <TextBlock value={value.content} />
  </SectionBlock>
);
