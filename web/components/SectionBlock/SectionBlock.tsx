import clsx from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';
import styles from './SectionBlock.module.css';

interface SectionBlockProps extends HTMLAttributes<HTMLDivElement> {
  noBackground?: boolean;
  gray?: boolean;
}

export const SectionBlock = forwardRef<HTMLDivElement, SectionBlockProps>(
  ({ className, noBackground, gray, ...props }: SectionBlockProps, ref) => (
    <div
      {...props}
      className={clsx(
        className,
        styles.sectionBlock,
        noBackground && styles['sectionBlock--noBackground'],
        gray && styles['sectionBlock--gray']
      )}
      ref={ref}
    />
  )
);

SectionBlock.displayName = 'SectionBlock';
