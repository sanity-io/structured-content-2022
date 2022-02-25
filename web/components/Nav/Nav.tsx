import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ButtonLink from '../ButtonLink';
import GridWrapper from '../GridWrapper';
import logo from '../../images/logo.svg';
import styles from './Nav.module.css';

interface NavProps {
  onFrontPage: boolean;
  ticketsUrl: string;
}

export const Nav = ({ onFrontPage, ticketsUrl }: NavProps) => {
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
            <li className={styles.ticketItem}>
              <Link href={ticketsUrl}>
                <a className={styles.link} onClick={closeMenu}>
                  Tickets
                </a>
              </Link>
            </li>
            <li>
              <Link href="/program">
                <a className={styles.link} onClick={closeMenu}>
                  Program
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sponsorship-information">
                <a className={styles.link} onClick={closeMenu}>
                  Sponsorship
                </a>
              </Link>
            </li>
            <li>
              <Link href="/venues">
                <a className={styles.link} onClick={closeMenu}>
                  Venues
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={styles.link} onClick={closeMenu}>
                  About
                </a>
              </Link>
            </li>
          </ul>
          <div className={styles.ticketButton}>
            <ButtonLink url={ticketsUrl} text="Tickets" />
          </div>
        </div>
      </GridWrapper>
    </nav>
  );
};
