import { useRef, useMemo, CSSProperties } from 'react';
import clsx from 'clsx';
import { PortableTextComponentProps } from '@portabletext/react';
import { imageUrlFor } from '../../../lib/sanity';
import { Figure } from '../../../types/Figure';
import { Section } from '../../../types/Section';
import GridWrapper from '../../GridWrapper';
import Heading from '../../Heading';
import TextBlock from '../TextBlock';
import styles from './TextAndImage.module.css';
import useIntersection from '../../../hooks/useIntersection';
import { getRandomAnimation } from '../../../lib/animation';

type TextAndImageProps = {
  _key: string;
  _type: 'textAndImageSection';
  image: Figure;
  text: Section[];
  tagline?: string;
  title?: string;
};

export const TextAndImage = ({
  value: { image, tagline, text, title, _key },
}: PortableTextComponentProps<TextAndImageProps>) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const isIntersecting = useIntersection(wrapperRef);

  const animation1 = useMemo(getRandomAnimation, []) as CSSProperties;
  const animation2 = useMemo(getRandomAnimation, []) as CSSProperties;

  return (
    <section
      className={clsx(styles.container, isIntersecting && styles.enter)}
      ref={wrapperRef}
    >
      <GridWrapper>
        <div className={styles.contents}>
          <div className={styles.imageContainer} style={animation1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrlFor(image).ignoreImageParams().url()}
              alt={image.alt || ''}
              className={styles.image}
            />
          </div>
          <div className={styles.text} style={animation2}>
            {title && (
              <hgroup>
                <Heading type="h2" id={`heading-h2-${_key}`}>
                  {title}
                </Heading>
                {tagline && <h3 className={styles.tagline}>{tagline}</h3>}
              </hgroup>
            )}

            <TextBlock value={text} />
          </div>
        </div>
      </GridWrapper>
    </section>
  );
};
