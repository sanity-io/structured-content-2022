import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState, HTMLProps } from 'react';
import useInterval from 'use-interval';
import logo from '../../images/logo.svg';
import ButtonLink from '../ButtonLink';
import GridWrapper from '../GridWrapper';
import styles from './Nav.module.css';

interface NavProps {
  onFrontPage: boolean;
  currentPath: string;
  ticketsUrl: string;
}

export const Nav = ({ onFrontPage, currentPath, ticketsUrl }: NavProps) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const contentsId = 'nav-menu-contents';
  const [menuItemsCount, setMenuItemsCount] = useState(0);

  useEffect(() => {
    document.body.classList.toggle('main-menu-open', menuOpened);
    if (!menuOpened) {
      setMenuItemsCount(0);
    }
  }, [menuOpened]);

  const toggleMenu = () => setMenuOpened(!menuOpened);
  const closeMenu = () => setMenuOpened(false);

  const MenuItem = ({
    href,
    className,
    ...rest
  }: HTMLProps<HTMLAnchorElement>) => (
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

  const menuItems = [
    <MenuItem
      key={1}
      href={ticketsUrl}
      target="_blank"
      rel="noreferrer"
      className={styles.ticketItem}
    >
      Tickets
    </MenuItem>,
    <MenuItem key={2} href="/program">
      Program
    </MenuItem>,
    <MenuItem key={3} href="/sponsorship-information">
      Sponsorship
    </MenuItem>,
    <MenuItem key={4} href="/registration-info">
      Registration
    </MenuItem>,
    <MenuItem key={5} href="/about">
      About
    </MenuItem>,
  ];

  useInterval(
    () => setMenuItemsCount(menuItemsCount + 1),
    menuOpened && menuItemsCount < menuItems.length ? 50 : null
  );

  const isMdUp =
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px)').matches;
  return (
    <nav className={clsx(styles.nav, onFrontPage && styles.onFrontPage)}>
      <GridWrapper>
        <div className={styles.menuButtonWrapper}>
          <button
            className={clsx(styles.menuButton, menuOpened && styles.menuOpen)}
            type="button"
            aria-controls={contentsId}
            aria-expanded={menuOpened}
            onClick={toggleMenu}
          >
            {menuOpened ? 'Close' : 'Menu'}
          </button>
        </div>
        <div
          id={contentsId}
          className={clsx(styles.menuContents, !menuOpened && styles.closed)}
        >
          <Link href="/">
            <a
              className={clsx(
                styles.homeLink,
                onFrontPage && styles.onFrontPage
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                className={styles.logo}
                width={logo.width}
                height={logo.height}
                alt="Home"
              />
            </a>
          </Link>
          <ul className={clsx(styles.items, !menuOpened && styles.menuClosed)}>
            {isMdUp ? menuItems : menuItems.slice(0, menuItemsCount)}
          </ul>
          <div className={styles.ticketButton}>
            <ButtonLink url={ticketsUrl} text="Tickets" openInNewTab={true} />
          </div>
        </div>
      </GridWrapper>
    </nav>
  );
};
