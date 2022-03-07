import clsx from 'clsx';
import TextBlock from '../TextBlock';
import GridWrapper from '../../GridWrapper';
import { RichTextSection } from '../../../types/RichTextSection';
import styles from './RichText.module.css';

interface RichTextProps {
  value: RichTextSection;
  /* TODO: This is currently unused. Investigate if caller can set it based on
   * some rules related to the section's index or similar (e.g. "the nth
   * RichText section should have its background set")
   */
  background?: boolean;
}

export const RichText = ({ value, background }: RichTextProps) => (
  <GridWrapper>
    <div className={clsx(styles.container, background && styles.background)}>
      <div className={styles.content}>
        {value.heading && (
          <hgroup>
            {value.heading && <h2>{value.heading}</h2>}
            {value.subheading && (
              <h3 className={styles.subHeading}>{value.subheading}</h3>
            )}
          </hgroup>
        )}
        <TextBlock value={value.content} />
      </div>
    </div>
  </GridWrapper>
);
