import clsx from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';
import styles from './SectionBlock.module.css';

interface SectionBlockProps extends HTMLAttributes<HTMLDivElement> {
  noBackground?: boolean;
}

export const SectionBlock = forwardRef<HTMLDivElement, SectionBlockProps>(
  ({ className, noBackground, ...props }: SectionBlockProps, ref) => (
    <div
      {...props}
      className={clsx(
        className,
        styles.sectionBlock,
        noBackground && styles['sectionBlock--noBackground']
      )}
      ref={ref}
    />
  )
);

SectionBlock.displayName = 'SectionBlock';
