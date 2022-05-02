import Link from 'next/link';
import clsx from 'clsx';
import type { HTMLProps } from 'react';
import styles from '../Nav.module.css';

interface MenuItemProps extends HTMLProps<HTMLAnchorElement> {
  currentPath: string;
  closeMenu: () => void;
}

export const MenuItem = ({
  href,
  className,
  currentPath,
  closeMenu,
  ...rest
}: MenuItemProps) => {
  const Anchor = (
    <a
      {...rest}
      className={clsx(styles.link, href === currentPath && styles.current)}
      onClick={closeMenu}
    />
  );
  return (
    <li className={className}>
      {href ? <Link href={href}>{Anchor}</Link> : Anchor}
    </li>
  );
};
