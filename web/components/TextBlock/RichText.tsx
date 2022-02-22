import { TextBlock } from './TextBlock';
import GridWrapper from '../GridWrapper';
import Heading from '../Heading';
import { RichTextSection } from '../../types/RichTextSection';
import styles from './RichText.module.css';

interface RichTextProps {
  value: RichTextSection;
}

export const RichText = ({ value }: RichTextProps) => (
  <GridWrapper>
    <div className={styles.container}>
      <div className={styles.content}>
        {value.heading && <Heading type="h2">{value.heading}</Heading>}
        {value.subheading && <Heading type="h3">{value.subheading}</Heading>}
        <TextBlock value={value.content} />
      </div>
    </div>
  </GridWrapper>
);
