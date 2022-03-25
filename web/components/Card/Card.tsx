import type { HTMLProps, ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { imageUrlFor } from '../../lib/sanity';
import type { Figure } from '../../types/Figure';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode | ReactNode[];
  figure?: Figure;
  className?: string;
  linkProps?: HTMLProps<HTMLAnchorElement>;
}

export const Card = ({ children, figure, className, linkProps }: CardProps) => {
  const Card = (
    <div className={clsx(styles.card, className)}>
      {figure /* eslint-disable-next-line @next/next/no-img-element */ ? (
        <img
          src={imageUrlFor(figure)
            .size(112, 112)
            .fit('min')
            .saturation(-100)
            .url()}
          alt={figure.alt || ''}
          width={28}
          height={28}
          className={styles.figure}
        />
      ) : null}
      {children}
    </div>
  );

  if (!linkProps) {
    return Card;
  }

  const { className: linkCls, href, ...otherLinkProps } = linkProps;
  return (
    <Link href={href}>
      <a className={clsx(styles.link, linkCls)} {...otherLinkProps}>
        {Card}
      </a>
    </Link>
  );
};
