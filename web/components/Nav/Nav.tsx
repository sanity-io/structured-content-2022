import Link from 'next/link';
import ButtonLink from '../ButtonLink';
import PageContainer from '../PageContainer';
import logo from '../../images/logo.svg';
import styles from './Nav.module.css';

export const Nav = () => (
  <nav className={styles.nav}>
    <PageContainer>
      <div className={styles.wrapper}>
        <Link href="/home">
          <a>
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
        <ButtonLink url="/tickets" text="Tickets" />
      </div>
    </PageContainer>
  </nav>
);
