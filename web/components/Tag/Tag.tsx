import type { HTMLAttributes } from 'react';
import styles from './Tag.module.css';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {}

export const Tag = ({ className, ...rest }: TagProps) => (
  <span className={styles.tag} {...rest} />
);
