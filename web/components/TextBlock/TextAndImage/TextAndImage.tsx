import { PortableTextComponentProps } from '@portabletext/react';
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
}: PortableTextComponentProps<TextAndImageProps>) => (
  <section className={styles.container}>
    <GridWrapper>
      <div className={styles.contents}>
        <div className={styles.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrlFor(image).ignoreImageParams().url()}
            alt={image.alt || ''}
            className={styles.image}
          />
        </div>
        <div className={styles.text}>
          {title && (
            <hgroup>
              <Heading type="h2" id={`heading-h2-${_key}`}>
                {title}
              </Heading>
              {tagline && (
                <Heading
                  type="h3"
                  id={`heading-h3-${_key}`}
                  className={styles.tagline}
                >
                  {tagline}
                </Heading>
              )}
            </hgroup>
          )}

          <TextBlock value={text} />
        </div>
      </div>
    </GridWrapper>
  </section>
);
