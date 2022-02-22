import Link from 'next/link';
import clsx from 'clsx';
import styles from './NavBlock.module.css';

interface FakeItemProps {
  divider?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

const FakeItem = ({ divider, mobile, tablet, desktop }: FakeItemProps) => (
  <li
    className={clsx(
      divider ? styles.divider : styles.fakeItem,
      mobile && styles.mobile,
      tablet && styles.tablet,
      desktop && styles.desktop
    )}
    aria-hidden="true"
  />
);

export const NavBlock = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <FakeItem mobile />

      <li className={styles.item}>
        <Link href="/program">
          <a className={styles.link}>Program</a>
        </Link>
      </li>

      <FakeItem tablet desktop />
      <FakeItem tablet desktop />
      <FakeItem desktop />
      <FakeItem divider mobile tablet desktop />
      <FakeItem tablet desktop />
      <FakeItem tablet desktop />
      <FakeItem desktop />

      <li className={styles.item}>
        <Link href="/speakers">
          <a className={styles.link}>Speakers</a>
        </Link>
      </li>

      <FakeItem mobile />
      <FakeItem divider mobile tablet desktop />
      <FakeItem mobile />

      <li className={styles.item}>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>
      </li>

      <FakeItem tablet desktop />
      <FakeItem divider mobile />

      <li className={styles.item}>
        <Link href="/tickets">
          <a className={styles.link}>Early-bird tickets</a>
        </Link>
      </li>

      <FakeItem desktop mobile />
    </ul>
  </nav>
);
