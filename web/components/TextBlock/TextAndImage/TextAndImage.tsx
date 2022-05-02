import clsx from 'clsx';
import { useRef } from 'react';
import { PortableTextComponentProps } from '@portabletext/react';
import useIntersection from '../../../hooks/useIntersection';
import { useAnimationProperties } from '../../../hooks/useAnimationProperties';
import { imageUrlFor } from '../../../lib/sanity';
import { Figure } from '../../../types/Figure';
import { Section } from '../../../types/Section';
import GridWrapper from '../../GridWrapper';
import Heading from '../../Heading';
import TextBlock from '../TextBlock';
import styles from './TextAndImage.module.css';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersection(wrapperRef);

  const imageContainerAnimation = useAnimationProperties();
  const textContainerAnimation = useAnimationProperties();

  const imageSrc = imageUrlFor(image).ignoreImageParams().url();
  return (
    <section
      className={clsx(
        styles.container,
        isIntersecting && styles.isIntersecting
      )}
      ref={wrapperRef}
    >
      <GridWrapper>
        <div className={styles.contents}>
          {imageSrc && (
            <div
              className={styles.imageContainer}
              style={imageContainerAnimation}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={image.alt || ''}
                className={styles.image}
              />
            </div>
          )}
          <div className={styles.text} style={textContainerAnimation}>
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
