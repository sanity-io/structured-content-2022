import { ReactNode } from 'react';
import { imageUrlFor } from '../../lib/sanity';
import { Figure } from '../../types/Figure';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode | ReactNode[];
  figure?: Figure;
}

export const Card = ({ children, figure }: CardProps) => (
  <div className={styles.card}>
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
