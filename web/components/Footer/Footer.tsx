import Image from 'next/image';
import Link from 'next/link';
import sanityLogo from '../../images/sanity_logo_black.svg';
import instagramLogo from '../../images/instagram_logo_black.svg';
import twitterLogo from '../../images/twitter_logo_black.svg';
import linkedinLogo from '../../images/linkedin_logo_black.svg';
import Paragraph from '../Paragraph';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.container}>
    <div className={styles.mainContent}>
      <Image src={sanityLogo} alt="logo" width={139} height={28} />
      <Paragraph className={styles['mainContent__description']}>
        Structured Content 2022 is a conference by Sanity
      </Paragraph>

      <Paragraph>
        Inquiries:
        <br />
        <a
          className={styles['mainContent__mailLink']}
          href="mailto:email@sanity.io"
        >
          email@sanity.io
        </a>
      </Paragraph>
    </div>

    <div className={styles.social}>
      <div className={styles['social__item']}>
        <Image src={instagramLogo} alt="Instagram" width={24} height={24} />
      </div>
      <div className={styles['social__item']}>
        <Image src={twitterLogo} alt="Twitter" width={24} height={24} />
      </div>
      <div className={styles['social__item']}>
        <Image src={linkedinLogo} alt="LinkedIn" width={24} height={24} />
      </div>
    </div>

    <hr className={styles.separator} />

    <ul className={styles.links}>
      <li className={styles['links__item']}>
        <Link href="#">
          <a className={styles['links__item__link']}>Code of conduct</a>
        </Link>
      </li>
      <li className={styles['links__item']}>
        <Link href="#">
          <a className={styles['links__item__link']}>Privacy policy</a>
        </Link>
      </li>
      <li className={styles['links__item']}>
        <Link href="#">
          <a className={styles['links__item__link']}>Contact</a>
        </Link>
      </li>
      <li className={styles['links__item']}>
        <Link href="#">
          <a className={styles['links__item__link']}>Venues</a>
        </Link>
      </li>
    </ul>
  </footer>
);
