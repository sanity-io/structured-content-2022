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
      <FakeItem divider mobile />
      <FakeItem mobile />

      <li className={styles.item}>
        <Link href="/sponsorship-information">
          <a className={styles.link}>Sponsorship</a>
        </Link>
      </li>

      <FakeItem tablet desktop />
      <FakeItem divider mobile tablet desktop />
      <FakeItem tablet desktop />
      <FakeItem tablet desktop shape="C" />
      <FakeItem tablet desktop />
      <FakeItem mobile tablet desktop shape="Ovals" />

      <li className={styles.item}>
        <Link href="/registration-info">
          <a className={styles.link}>Registration info</a>
        </Link>
      </li>

      <FakeItem divider mobile tablet desktop />

      <li className={styles.item}>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>
      </li>

      <FakeItem mobile shape="HalfOval" />
      <FakeItem mobile tablet desktop />
      <FakeItem divider mobile />
      <FakeItem desktop shape="O" />

      <li className={styles.item}>
        <Link href={ticketsUrl}>
          <a className={styles.link}>Tickets</a>
        </Link>
      </li>

      <FakeItem tablet desktop shape="HalfOval" />
      <FakeItem mobile desktop />
    </ul>
  </nav>
);
