import clsx from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';
import styles from './SectionBlock.module.css';

interface SectionBlockProps extends HTMLAttributes<HTMLDivElement> {}

export const SectionBlock = forwardRef<HTMLDivElement, SectionBlockProps>(
  ({ className, ...props }: SectionBlockProps, ref) => (
    <div
      {...props}
      className={clsx(className, styles.sectionBlock)}
      ref={ref}
    />
  )
);

SectionBlock.displayName = 'SectionBlock';
