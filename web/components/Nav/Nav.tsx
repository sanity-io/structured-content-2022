import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logo from '../../images/logo.svg';
import type { PrimaryNavItem } from '../../types/PrimaryNavItem';
import { getEntityPath } from '../../util/entityPaths';
import ButtonLink from '../ButtonLink';
import GridWrapper from '../GridWrapper';
import MenuItem from './MenuItem';
import styles from './Nav.module.css';

interface NavProps {
  onFrontPage?: boolean;
  currentPath: string;
  ticketsUrl?: string;
  items?: PrimaryNavItem[];
}

export const Nav = ({
  onFrontPage,
  currentPath,
  ticketsUrl,
  items = [],
}: NavProps) => {
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
          className={clsx(
            styles.menuContents,
            !menuOpened && styles.closed,
            !ticketsUrl && styles.noTickets
          )}
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
            {ticketsUrl && (
              <MenuItem
                {...{ currentPath, closeMenu }}
                href={ticketsUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.ticketItem}
              >
                Tickets
              </MenuItem>
            )}

            {items.map(
              ({ label, target: { external, internal, blank } }, index) => (
                <MenuItem
                  key={index}
                  {...{ closeMenu, currentPath }}
                  href={external || getEntityPath(internal)}
                  {...(blank && { target: '_blank', rel: 'noreferrer' })}
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  {label}
                </MenuItem>
              )
            )}
          </ul>
          {ticketsUrl && (
            <div className={styles.ticketButton}>
              <ButtonLink url={ticketsUrl} text="Tickets" openInNewTab={true} />
            </div>
          )}
        </div>
      </GridWrapper>
    </nav>
  );
};
