import Link from 'next/link';
import type { HTMLProps } from 'react';
import { useRandomAnimation } from '../../../hooks/useRandomAnimation';
import styles from '../NavBlock.module.css';

export const Item = ({ href, ...rest }: HTMLProps<HTMLAnchorElement>) => {
  const animation = useRandomAnimation(true);
  return (
    <li className={styles.item} style={animation}>
      <Link href={href}>
        <a className={styles.link} {...rest} />
      </Link>
    </li>
  );
};
