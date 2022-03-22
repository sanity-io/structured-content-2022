import Link from 'next/link';
import clsx from 'clsx';
import styles from '../Nav.module.css';
import { HTMLProps } from 'react';

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
}: MenuItemProps) => (
  <li>
    <Link href={href}>
      <a
        {...rest}
        className={clsx(
          styles.link,
          href === currentPath && styles.current,
          className
        )}
        onClick={closeMenu}
      />
    </Link>
  </li>
);
