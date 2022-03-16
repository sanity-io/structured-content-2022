import { useRef, useMemo, CSSProperties } from 'react';
import clsx from 'clsx';
import TextBlock from '../TextBlock';
import GridWrapper from '../../GridWrapper';
import { RichTextSection } from '../../../types/RichTextSection';
import styles from './RichText.module.css';
import useIntersection from '../../../hooks/useIntersection';
import { getRandomAnimation } from '../../../lib/animation';

interface RichTextProps {
  value: RichTextSection;
  /* TODO: This is currently unused. Investigate if caller can set it based on
   * some rules related to the section's index or similar (e.g. "the nth
   * RichText section should have its background set")
   */
  background?: boolean;
}

export const RichText = ({ value, background }: RichTextProps) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const isIntersecting = useIntersection(wrapperRef);

  const animation1 = useMemo(getRandomAnimation, []) as CSSProperties;
  const animation2 = useMemo(getRandomAnimation, []) as CSSProperties;

  return (
    <GridWrapper>
      <div
        className={clsx(
          styles.container,
          background && styles.background,
          isIntersecting && styles.enter
        )}
        ref={wrapperRef}
      >
        <div className={styles.content}>
          {value.heading && (
            <hgroup style={animation1}>
              {value.heading && (
                <h2 id={`heading-h2-${value._key}`} className={styles.heading}>
                  {value.heading}
                </h2>
              )}
              {value.subheading && (
                <h3 className={styles.subHeading}>{value.subheading}</h3>
              )}
            </hgroup>
          )}
          <div style={animation2} className={styles.text}>
            <TextBlock value={value.content} />
          </div>
        </div>
      </div>
    </GridWrapper>
  );
};
