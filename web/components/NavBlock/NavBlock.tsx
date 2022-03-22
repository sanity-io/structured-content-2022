import { useRef, useMemo, CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './NavBlock.module.css';

import useIntersection from '../../hooks/useIntersection';
import { getRandomAnimation } from '../../lib/animation';

const RANDOM_SHAPE_PERCENT_CHANCE = 0.33;
type Shape = 'Plus' | 'C' | 'Ovals' | 'O' | 'HalfOval';

interface FakeItemProps {
  divider?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

interface ItemProps {
  name: string;
  href: string;
}

const getRandomShape = (): Shape => {
  const shapes: Shape[] = ['Plus', 'C', 'Ovals', 'O', 'HalfOval'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const FakeItem = ({ divider, mobile, tablet, desktop }: FakeItemProps) => {
  const shapeClass: string | null = useMemo(() => {
    if (Math.random() <= RANDOM_SHAPE_PERCENT_CHANCE) {
      return styles[`shape${getRandomShape()}`];
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ['random']);
  const animation = useMemo(getRandomAnimation, ['animation']) as CSSProperties;

  return (
    <li
      style={animation}
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

const Item = ({ name, href }: ItemProps) => {
  const animation = useMemo(getRandomAnimation, ['animation']) as CSSProperties;

  return (
    <li className={styles.item} style={animation}>
      <Link href={href}>
        <a className={styles.link}>{name}</a>
      </Link>
    </li>
  );
};

interface NavBlockProps {
  ticketsUrl: string;
}

export const NavBlock = ({ ticketsUrl }: NavBlockProps) => {
  const wrapperRef = useRef<HTMLElement>();
  const isIntersecting = useIntersection(wrapperRef);

  return (
    <nav
      className={clsx(styles.nav, isIntersecting && styles.isIntersecting)}
      ref={wrapperRef}
    >
      <ul className={styles.list}>
        <Item name="Program" href="/program" />

        <FakeItem mobile tablet desktop />
        <FakeItem mobile tablet desktop />
        <FakeItem divider mobile />
        <FakeItem mobile />

        <Item name="Sponsorship" href="/sponsorship-information" />

        <FakeItem tablet desktop />
        <FakeItem divider mobile tablet desktop />
        <FakeItem tablet desktop />
        <FakeItem tablet desktop />
        <FakeItem tablet desktop />
        <FakeItem mobile tablet desktop />

        <Item name="Registration" href="/registration-info" />

        <FakeItem divider mobile tablet desktop />

        <Item name="About" href="/about" />

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
};
