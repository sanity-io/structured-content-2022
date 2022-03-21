import Link from 'next/link';
import clsx from 'clsx';
import styles from '../Nav.module.css';

interface MenuItemProps {
  href: string;
  label: string;
  currentPath: string;
  closeMenu: () => void;
  className?: string;
}

export const MenuItem = ({
  href,
  label,
  currentPath,
  closeMenu,
  className,
}: MenuItemProps) => (
  <li>
    <Link href={href}>
      <a
        className={clsx(
          styles.link,
          href === currentPath && styles.current,
          className
        )}
        onClick={closeMenu}
      >
        {label}
      </a>
    </Link>
  </li>
);
