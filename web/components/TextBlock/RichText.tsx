import clsx from 'clsx';
import { TextBlock } from './TextBlock';
import GridWrapper from '../GridWrapper';
import Heading from '../Heading';
import { RichTextSection } from '../../types/RichTextSection';
import styles from './RichText.module.css';

interface RichTextProps {
  value: RichTextSection;
  background?: boolean;
}

export const RichText = ({ value, background }: RichTextProps) => (
  <GridWrapper>
    <div className={clsx(styles.container, background && styles.background)}>
      <div className={styles.content}>
        {value.heading && <Heading type="h2">{value.heading}</Heading>}
        {value.subheading && <Heading type="h3">{value.subheading}</Heading>}
        <TextBlock value={value.content} />
      </div>
    </div>
  </GridWrapper>
);
