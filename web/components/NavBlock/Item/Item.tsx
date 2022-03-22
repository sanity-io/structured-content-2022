import Link from 'next/link';
import { useRandomAnimation } from '../../../hooks/useRandomAnimation';
import styles from '../NavBlock.module.css';

interface ItemProps {
  name: string;
  href: string;
}

export const Item = ({ name, href }: ItemProps) => {
  const animation = useRandomAnimation();
  return (
    <li className={styles.item} style={animation}>
      <Link href={href}>
        <a className={styles.link}>{name}</a>
      </Link>
    </li>
  );
};
