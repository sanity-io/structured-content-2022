import Link from 'next/link';
import styles from './ButtonLink.module.css';

interface ButtonLinkProps {
  text: string;
  url: string;
  openInNewTab?: boolean;
}

export const ButtonLink = ({ text, url, openInNewTab }: ButtonLinkProps) =>
  openInNewTab ? (
    <a className={styles.button} href={url} target="_blank" rel="noreferrer">
      {text}
    </a>
  ) : (
    <Link href={url}>
      <a className={styles.button}>{text}</a>
    </Link>
  );
