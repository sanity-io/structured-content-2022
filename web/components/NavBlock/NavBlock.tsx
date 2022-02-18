import Link from 'next/link';
import clsx from 'clsx';
import styles from './NavBlock.module.css';

export const NavBlock = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/program">
          <a className={styles.link}>Program</a>
        </Link>
      </li>
      <li
        className={clsx(
          styles.fakeItem,
          styles.mobile,
          styles.tablet,
          styles.desktop
        )}
        aria-hidden="true"
      />
      <li
        className={clsx(styles.fakeItem, styles.tablet, styles.desktop)}
        aria-hidden="true"
      />
      <li
        className={clsx(styles.fakeItem, styles.desktop)}
        aria-hidden="true"
      />
      <li
        className={clsx(
          styles.divider,
          styles.mobile,
          styles.tablet,
          styles.desktop
        )}
        aria-hidden="true"
      />
      <li
        className={clsx(
          styles.fakeItem,
          styles.mobile,
          styles.tablet,
          styles.desktop
        )}
        aria-hidden="true"
      />
      <li
        className={clsx(styles.fakeItem, styles.tablet, styles.desktop)}
        aria-hidden="true"
      />
      <li
        className={clsx(styles.fakeItem, styles.desktop)}
        aria-hidden="true"
      />
      <li className={styles.item}>
        <Link href="/speakers">
          <a className={styles.link}>Speakers</a>
        </Link>
      </li>
      <li
        className={clsx(
          styles.divider,
          styles.mobile,
          styles.tablet,
          styles.desktop
        )}
        aria-hidden="true"
      />
      <li className={styles.item}>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>
      </li>
      <li
        className={clsx(
          styles.fakeItem,
          styles.mobile,
          styles.tablet,
          styles.desktop
        )}
        aria-hidden="true"
      />
      <li
        className={clsx(styles.divider, styles.mobile)}
        aria-hidden="true"
      />
      <li
        className={clsx(styles.fakeItem, styles.mobile)}
        aria-hidden="true"
      />
      <li className={styles.item}>
        <Link href="/tickets">
          <a className={styles.link}>Early-bird tickets</a>
        </Link>
      </li>
      <li
        className={clsx(styles.fakeItem, styles.desktop)}
        aria-hidden="true"
      />
    </ul>
  </nav>
);
