import GridWrapper from '../GridWrapper';
import styles from './Hero.module.css';

interface HeroProps {
  heading: string;
}

export const Hero = ({ heading }: HeroProps) => (
  <div className={styles.container}>
    <GridWrapper>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>{heading}</h1>
      </div>
    </GridWrapper>
  </div>
);
