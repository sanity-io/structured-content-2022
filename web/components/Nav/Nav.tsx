import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../images/logo.svg';
import type { PrimaryNavItem } from "../../types/PrimaryNavItem";
import ButtonLink from '../ButtonLink';
import GridWrapper from '../GridWrapper';
import MenuItem from './MenuItem';
import styles from './Nav.module.css';

interface NavProps {
  onFrontPage: boolean;
  currentPath: string;
  ticketsUrl: string;
  items: PrimaryNavItem[];
}

export const Nav = ({ onFrontPage, currentPath, ticketsUrl }: NavProps) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const contentsId = 'nav-menu-contents';

  useEffect(() => {
    document.body.classList.toggle('main-menu-open', menuOpened);
  }, [menuOpened]);

  const toggleMenu = () => setMenuOpened(!menuOpened);
  const closeMenu = () => setMenuOpened(false);

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
            <MenuItem
              {...{ currentPath, closeMenu }}
              href={ticketsUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.ticketItem}
            >
              Tickets
            </MenuItem>
            <MenuItem
              {...{ currentPath, closeMenu }}
              href="/program"
              style={{ animationDelay: '50ms' }}
            >
              Program
            </MenuItem>
            <MenuItem
              {...{ currentPath, closeMenu }}
              href="/sponsorship-information"
              style={{ animationDelay: '100ms' }}
            >
              Sponsorship
            </MenuItem>
            <MenuItem
              {...{ currentPath, closeMenu }}
              href="/registration-info"
              style={{ animationDelay: '150ms' }}
            >
              Registration
            </MenuItem>
            <MenuItem
              {...{ currentPath, closeMenu }}
              href="/about"
              style={{ animationDelay: '200ms' }}
            >
              About
            </MenuItem>
          </ul>
          <div className={styles.ticketButton}>
            <ButtonLink url={ticketsUrl} text="Tickets" openInNewTab={true} />
          </div>
        </div>
      </GridWrapper>
    </nav>
  );
};
