import Image from 'next/image';
import Link from 'next/link';
import sanityLogo from '../../images/sanity_logo_white.svg';
import instagramLogo from '../../images/instagram_logo_white.svg';
import twitterLogo from '../../images/twitter_logo_white.svg';
import linkedinLogo from '../../images/linkedin_logo_white.svg';
import GridWrapper from '../GridWrapper';
import styles from './Footer.module.css';
import { Slug } from '../../types/Slug';
import urlJoin from 'proper-url-join';

interface FooterProps {
  links: {
    name: string;
    slug: Slug;
    _id: string;
  }[];
}

export const Footer = ({ links }: FooterProps) => (
  <footer className={styles.container}>
    <GridWrapper>
      <div className={styles.logoContainer}>
        <a
          href="https://sanity.io/"
          className={styles.logoLink}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={sanityLogo} alt="Sanity" width={162} height={46} />
        </a>
      </div>
      <p>Structured Content 2022 is a conference by Sanity</p>
      Inquiries:
      <address>
        <a className={styles.mailLink} href="mailto:confinfo@sanity.io">
          confinfo@sanity.io
        </a>
      </address>
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
        {links
          ?.filter(({ slug }) => slug.current)
          .map(({ name, slug, _id }) => (
            <li key={_id} className={styles.linksItem}>
              <Link href={urlJoin(slug.current)}>
                <a className={styles.linksItemLink}>{name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </GridWrapper>
  </footer>
);
