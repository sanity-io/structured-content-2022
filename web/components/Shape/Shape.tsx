import clsx from 'clsx';
import { useRandomShape } from '../../hooks/useRandomShape';
import styles from './Shape.module.css';

export const Shape = () => (
  <div className={clsx(styles.shape, useRandomShape())} aria-hidden="true" />
);
