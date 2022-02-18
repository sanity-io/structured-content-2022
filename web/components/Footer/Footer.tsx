import Image from 'next/image';
import Link from 'next/link';
import sanityLogo from '../../images/sanity_logo_black.svg';
import instagramLogo from '../../images/instagram_logo_black.svg';
import twitterLogo from '../../images/twitter_logo_black.svg';
import linkedinLogo from '../../images/linkedin_logo_black.svg';
import GridWrapper from '../GridWrapper';
import Paragraph from '../Paragraph';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.container}>
    <GridWrapper>
      <div className={styles.logoContainer}>
        <Image src={sanityLogo} alt="Sanity" width={139} height={28} />
      </div>

      <Paragraph>Structured Content 2022 is a conference by Sanity</Paragraph>

      <Paragraph>
        Inquiries:
        <a className={styles.mailLink} href="mailto:email@sanity.io">
          email@sanity.io
        </a>
      </Paragraph>

      <ul className={styles.social}>
        <li className={styles.socialItem}>
          <a
            href="https://www.instagram.com/sanity.io"
            className={styles.socialLink}
            target="_blank"
            rel="noreferrer"
          >
            <Image src={instagramLogo} alt="Instagram" width={24} height={24} />
          </a>
        </li>
        <li className={styles.socialItem}>
          <a
            href="https://twitter.com/sanity_io"
            className={styles.socialLink}
            target="_blank"
            rel="noreferrer"
          >
            <Image src={twitterLogo} alt="Twitter" width={24} height={24} />
          </a>
        </li>
        <li className={styles.socialItem}>
          <a
            href="https://www.linkedin.com/company/sanity-io"
            className={styles.socialLink}
            target="_blank"
            rel="noreferrer"
          >
            <Image src={linkedinLogo} alt="LinkedIn" width={24} height={24} />
          </a>
        </li>
      </ul>
    </GridWrapper>

    <hr className={styles.separator} />

    <GridWrapper>
      <ul className={styles.links}>
        <li className={styles.linksItem}>
          <Link href="/code-of-conduct">
            <a className={styles.linksItemLink}>Code of conduct</a>
          </Link>
        </li>
        <li className={styles.linksItem}>
          <Link href="/privacy-policy">
            <a className={styles.linksItemLink}>Privacy policy</a>
          </Link>
        </li>
        <li className={styles.linksItem}>
          <Link href="/contact">
            <a className={styles.linksItemLink}>Contact</a>
          </Link>
        </li>
        <li className={styles.linksItem}>
          <Link href="/venues">
            <a className={styles.linksItemLink}>Venues</a>
          </Link>
        </li>
      </ul>
    </GridWrapper>
  </footer>
);
