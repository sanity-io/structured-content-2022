import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Paragraph.module.css';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Paragraph = ({ className, ...props }: ParagraphProps) => (
  <p {...props} className={clsx(className, styles.paragraph)} />
);
