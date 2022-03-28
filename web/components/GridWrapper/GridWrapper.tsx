import { ReactNode } from 'react';
import styles from './GridWrapper.module.css';
import clsx from 'clsx';

interface GridWrapperProps {
  children: ReactNode;
  className?: string;
}

export const GridWrapper = ({ children, className }: GridWrapperProps) => (
  <div className={clsx(styles.container, className)}>{children}</div>
);
