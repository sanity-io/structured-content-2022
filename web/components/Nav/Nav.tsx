import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import logo from '../../images/logo.svg';
import ButtonLink from '../ButtonLink';
import GridWrapper from '../GridWrapper';
import MenuItem from './MenuItem';
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

  const menuItems = [
    <MenuItem
      key={1}
      {...{ currentPath, closeMenu }}
      href={ticketsUrl}
      label="Tickets"
      className={styles.ticketItem}
    />,
    <MenuItem
      key={2}
      {...{ currentPath, closeMenu }}
      href="/program"
      label="Program"
    />,
    <MenuItem
      key={3}
      {...{ currentPath, closeMenu }}
      href="/sponsorship-information"
      label="Sponsorship"
    />,
    <MenuItem
      key={4}
      {...{ currentPath, closeMenu }}
      href="/registration-info"
      label="Registration info"
    />,
    <MenuItem
      key={5}
      {...{ currentPath, closeMenu }}
      href="/about"
      label="About"
    />,
  ];

  useInterval(
    () => setMenuItemsCount(menuItemsCount + 1),
    // @ts-ignore
    menuOpened && menuItemsCount < menuItems.length ? window.delay || 100 : null
  );

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
            {menuItems.slice(0, menuItemsCount)}
          </ul>
          <div className={styles.ticketButton}>
            <ButtonLink url={ticketsUrl} text="Tickets" />
          </div>
        </div>
      </GridWrapper>
    </nav>
  );
};
