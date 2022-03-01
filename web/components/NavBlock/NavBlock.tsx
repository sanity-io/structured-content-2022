import Link from 'next/link';
import clsx from 'clsx';
import styles from './NavBlock.module.css';

interface FakeItemProps {
  divider?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
  shape?: 'Plus' | 'C' | 'Ovals' | 'O' | 'HalfOval';
}

const FakeItem = ({
  divider,
  mobile,
  tablet,
  desktop,
  shape,
}: FakeItemProps) => (
  <li
    className={clsx(
      divider ? styles.divider : styles.fakeItem,
      mobile && styles.mobile,
      tablet && styles.tablet,
      desktop && styles.desktop,
      shape && styles[`shape${shape}`]
    )}
    aria-hidden="true"
  />
);

interface NavBlockProps {
  ticketsUrl: string;
}

export const NavBlock = ({ ticketsUrl }: NavBlockProps) => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/program">
          <a className={styles.link}>Program</a>
        </Link>
      </li>

      <FakeItem mobile tablet desktop />
      <FakeItem mobile tablet desktop shape="Plus" />
      <FakeItem tablet desktop />
      <FakeItem tablet desktop />
      <FakeItem divider mobile tablet desktop />
      <FakeItem tablet desktop />
      <FakeItem tablet desktop shape="C" />
      <FakeItem tablet desktop />
      <FakeItem mobile tablet desktop shape="Ovals" />
      <FakeItem mobile />

      <li className={styles.item}>
        <Link href="/speakers">
          <a className={styles.link}>Speakers</a>
        </Link>
      </li>

      <FakeItem divider mobile tablet desktop />

      <li className={styles.item}>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>
      </li>

      <FakeItem mobile />
      <FakeItem mobile tablet desktop />
      <FakeItem divider mobile />
      <FakeItem desktop shape="O" />

      <li className={styles.item}>
        <Link href={ticketsUrl}>
          <a className={styles.link}>Early-bird tickets</a>
        </Link>
      </li>

      <FakeItem tablet desktop shape="HalfOval" />
      <FakeItem mobile desktop />
    </ul>
  </nav>
);
