import Link from 'next/link';
import styles from './ButtonLink.module.css';

interface ButtonLinkProps {
  text: string;
  url: string;
}

export const ButtonLink = ({ text, url }) => (
  <Link href={url}>
    <a className={styles.button}>{text}</a>
  </Link>
);
