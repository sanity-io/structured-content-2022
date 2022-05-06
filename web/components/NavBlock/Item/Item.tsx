import Link from 'next/link';
import type { HTMLProps } from 'react';
import { useAnimationProperties } from '../../../hooks/useAnimationProperties';
import styles from '../NavBlock.module.css';

interface ItemProps extends HTMLProps<HTMLAnchorElement> {
  href: string;
}

export const Item = ({ href, ...rest }: ItemProps) => {
  const animation = useAnimationProperties(true);
  return (
    <li className={styles.item} style={animation}>
      <Link href={href}>
        <a className={styles.link} {...rest} />
      </Link>
    </li>
  );
};
