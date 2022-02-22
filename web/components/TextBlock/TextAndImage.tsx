import { imageUrlFor } from '../../lib/sanity';
import GridWrapper from '../GridWrapper';
import Heading from '../Heading';
import { Block } from './Block';
import styles from './TextAndImage.module.css';

interface TextAndImageProps {
  image: any;
  text: string;
  tagline?: string;
  title?: string;
}

export const TextAndImage = ({ value: { image, tagline, text, title } }) => (
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
          {text.map((value) => (
            <Block key={value._key} value={value} />
          ))}
        </div>
      </div>
    </GridWrapper>
  </section>
);
