import type { HTMLProps, ReactNode } from 'react';
import Link from 'next/link';
import { imageUrlFor } from '../../lib/sanity';
import type { Figure } from '../../types/Figure';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode | ReactNode[];
  figure?: Figure;
  linkProps?: HTMLProps<HTMLAnchorElement>;
}

export const Card = ({ children, figure, linkProps }: CardProps) => {
  const src =
    figure &&
    imageUrlFor(figure).size(112, 112).fit('min').saturation(-100).url();
  const Card = (
    <div className={styles.card}>
      {src /* eslint-disable-next-line @next/next/no-img-element */ ? (
        <img
          src={src}
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

  const { className, href, ...otherLinkProps } = linkProps;
  return href ? (
    <Link href={href}>
      <a className={styles.link} {...otherLinkProps}>
        {Card}
      </a>
    </Link>
  ) : (
    Card
  );
};
