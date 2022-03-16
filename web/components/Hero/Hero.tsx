import { ReactNode } from 'react';
import { Hero as HeroProps } from '../../types/Hero';
import GridWrapper from '../GridWrapper';
import SimpleCallToAction from '../SimpleCallToAction';
import styles from './Hero.module.css';

export const Hero = ({
  heading,
  summary,
  callToAction,
  children,
}: HeroProps & { children?: ReactNode }) => (
  <div className={styles.container}>
    <GridWrapper>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>{heading}</h1>
        {summary && <p className={styles.summary}>{summary}</p>}
        {callToAction && (
          <div className={styles.cta}>
            <SimpleCallToAction {...callToAction} />
          </div>
        )}
      </div>
      {children}
    </GridWrapper>
  </div>
);
