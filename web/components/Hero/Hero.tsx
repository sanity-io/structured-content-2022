import ButtonLink from '../ButtonLink';
import GridWrapper from '../GridWrapper';
import styles from './Hero.module.css';

interface HeroProps {
  heading: string;
  cta?: {
    url: string;
    text: string;
  };
}

export const Hero = ({ heading, cta }: HeroProps) => (
  <div className={styles.container}>
    <GridWrapper>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>{heading}</h1>
        {cta && (
          <div className={styles.cta}>
            <ButtonLink text={cta.text} url={cta.url} />
          </div>
        )}
      </div>
    </GridWrapper>
  </div>
);
