import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Tag.module.css';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {}

export const Tag = ({ className, ...rest }: TagProps) => (
  <span className={clsx(styles.tag, className)} {...rest} />
);
