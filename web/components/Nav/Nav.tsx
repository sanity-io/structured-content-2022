import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ButtonLink from '../ButtonLink';
import GridWrapper from '../GridWrapper';
import logo from '../../images/logo.svg';
import styles from './Nav.module.css';

export const Nav = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const contentsId = 'nav-menu-contents';

  useEffect(() => {
    document.body.classList.toggle('main-menu-open', menuOpened);
  }, [menuOpened]);

  return (
    <nav className={styles.nav}>
      <GridWrapper>
        <div className={styles.menuButtonWrapper}>
          <button
            className={styles.menuButton}
            type="button"
            aria-controls={contentsId}
            aria-expanded={menuOpened}
            onClick={() => setMenuOpened(true)}
          >
            Menu
          </button>
        </div>
        <div
          id={contentsId}
          className={clsx(styles.menuContents, !menuOpened && styles.closed)}
        >
          <Link href="/home">
            <a className={styles.homeLink}>
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
          <ul className={styles.items}>
            <li className={styles.ticketItem}>
              <Link href="/tickets">
                <a className={styles.link}>Tickets</a>
              </Link>
            </li>
            <li>
              <Link href="/program">
                <a className={styles.link}>Program</a>
              </Link>
            </li>
            <li>
              <Link href="/speakers">
                <a className={styles.link}>Speakers</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={styles.link}>About</a>
              </Link>
            </li>
          </ul>
          <div className={styles.ticketButton}>
            <ButtonLink url="/tickets" text="Tickets" />
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setMenuOpened(false)}
          >
            Close
          </button>
        </div>
      </GridWrapper>
    </nav>
  );
};
