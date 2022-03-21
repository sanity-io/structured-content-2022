import Link from 'next/link';
import clsx from 'clsx';
import styles from './NavBlock.module.css';
import { useEffect, useState } from 'react';

const RANDOM_SHAPE_PERCENT_CHANCE = 0.33;
type Shape = 'Plus' | 'C' | 'Ovals' | 'O' | 'HalfOval';

interface FakeItemProps {
  divider?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

const getRandomShape = (): Shape => {
  const shapes: Shape[] = ['Plus', 'C', 'Ovals', 'O', 'HalfOval'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const FakeItem = ({ divider, mobile, tablet, desktop }: FakeItemProps) => {
  const [shapeClass, setShapeClass] = useState<string>(null);
  useEffect(() => {
    if (Math.random() <= RANDOM_SHAPE_PERCENT_CHANCE) {
      setShapeClass(styles[`shape${getRandomShape()}`]);
    }
  }, []);

  return (
    <li
      className={clsx(
        divider ? styles.divider : styles.fakeItem,
        mobile && styles.mobile,
        tablet && styles.tablet,
        desktop && styles.desktop,
        shapeClass
      )}
      aria-hidden="true"
    />
  );
};

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
      <FakeItem mobile tablet desktop />
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
      <FakeItem tablet desktop />
      <FakeItem tablet desktop />
      <FakeItem mobile tablet desktop />

      <li className={styles.item}>
        <Link href="/registration-info">
          <a className={styles.link}>Registration</a>
        </Link>
      </li>

      <FakeItem divider mobile tablet desktop />

      <li className={styles.item}>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>
      </li>

      <FakeItem mobile tablet desktop />
      <FakeItem mobile desktop />
      <FakeItem divider mobile />

      <li className={styles.item}>
        <a
          className={styles.link}
          href={ticketsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Tickets
        </a>
      </li>

      <FakeItem tablet desktop />
      <FakeItem mobile desktop />
    </ul>
  </nav>
);
