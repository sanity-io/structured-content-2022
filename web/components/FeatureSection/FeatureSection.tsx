import { ReactNode } from 'react';
import FeatureCheckmark from '../FeatureCheckmark';
import styles from './FeatureSection.module.css';

interface FeatureSection {
  features?: string[];
  children: ReactNode | ReactNode[];
}

export const FeatureSection = ({ children, features }: FeatureSection) => (
  <section>
    <div className={styles.header}>{children}</div>
    <ul className={styles.features}>
      {features?.map((feature) => (
        <li key={feature} className={styles.feature}>
          <FeatureCheckmark included={true} hideAltText={true} />
          <span className={styles.featureDescription}>{feature}</span>
        </li>
      ))}
    </ul>
  </section>
);
