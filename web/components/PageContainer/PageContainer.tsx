import { ReactNode } from 'react';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
