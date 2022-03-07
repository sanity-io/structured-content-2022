import { PortableTextComponentProps } from '@portabletext/react';
import { imageUrlFor } from '../../../lib/sanity';
import { Section } from '../../../types/Section';
import GridWrapper from '../../GridWrapper';
import Heading from '../../Heading';
import TextBlock from '../TextBlock';
import styles from './TextAndImage.module.css';

type TextAndImageProps = {
  image: any;
  text: Section[];
  tagline?: string;
  title?: string;
};

export const TextAndImage = ({
  value: { image, tagline, text, title },
}: PortableTextComponentProps<TextAndImageProps>) => (
  <section className={styles.container}>
    <GridWrapper>
      <div className={styles.contents}>
        <div className={styles.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrlFor(image).ignoreImageParams().url()}
            alt=""
            className={styles.image}
          />
        </div>
        <div className={styles.text}>
          {title && (
            <hgroup>
              <Heading type="h2">{title}</Heading>
              {tagline && <h3 className={styles.tagline}>{tagline}</h3>}
            </hgroup>
          )}

          <TextBlock value={text} />
        </div>
      </div>
    </GridWrapper>
  </section>
);
