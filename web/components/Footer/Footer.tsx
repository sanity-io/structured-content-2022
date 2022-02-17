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
      <Paragraph className={styles.mainContentDescription}>
        Structured Content 2022 is a conference by Sanity
      </Paragraph>

      <Paragraph>
        Inquiries:
        <br />
        <a
          className={styles.mailLink}
          href="mailto:email@sanity.io"
        >
          email@sanity.io
        </a>
      </Paragraph>
    </div>

    <div className={styles.social}>
      <div className={styles.socialItem}>
        <a href="https://www.instagram.com/sanity.io" target="_blank" rel="noreferrer">
          <Image src={instagramLogo} alt="Instagram" width={24} height={24} />
        </a>
      </div>
      <div className={styles.socialItem}>
        <a href="https://twitter.com/sanity_io" target="_blank" rel="noreferrer">
          <Image src={twitterLogo} alt="Twitter" width={24} height={24} />
        </a>
      </div>
      <div className={styles.socialItem}>
        <a href="https://www.linkedin.com/company/sanity-io" target="_blank" rel="noreferrer">
        <Image src={linkedinLogo} alt="LinkedIn" width={24} height={24} />
        </a>
      </div>
    </div>

    <hr className={styles.separator} />

    <ul className={styles.links}>
      <li className={styles.linksItem}>
        <Link href="#">
          <a className={styles.linksItemLink}>Code of conduct</a>
        </Link>
      </li>
      <li className={styles.linksItem}>
        <Link href="#">
          <a className={styles.linksItemLink}>Privacy policy</a>
        </Link>
      </li>
      <li className={styles.linksItem}>
        <Link href="#">
          <a className={styles.linksItemLink}>Contact</a>
        </Link>
      </li>
      <li className={styles.linksItem}>
        <Link href="#">
          <a className={styles.linksItemLink}>Venues</a>
        </Link>
      </li>
    </ul>
  </footer>
);
