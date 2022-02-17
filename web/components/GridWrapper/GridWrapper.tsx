import { ReactNode } from 'react';
import styles from './GridWrapper.module.css';

interface GridWrapperProps {
  children: ReactNode;
}

export const GridWrapper = ({ children }: GridWrapperProps) => (
  <div className={styles.container}>{children}</div>
);
