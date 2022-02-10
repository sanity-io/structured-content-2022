import Link from 'next/link';
import styles from './Nav.module.css';

// TODO: move inside _app.tsx when current frontpage is no longer needed
export const Nav = () => (
  <nav className={styles.nav}>
    <ul className={styles['nav__items']}>
      <li>
        <Link href="/home">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/program">Program</Link>
      </li>
      <li>
        <Link href="/tickets">Tickets</Link>
      </li>
      <li>
        <Link href="/speakers">Speakers</Link>
      </li>
      <li>
        <Link href="/sponsor">Sponsor</Link>
      </li>
    </ul>
  </nav>
);
