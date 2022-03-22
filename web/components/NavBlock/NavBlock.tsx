import clsx from 'clsx';
import { useRef } from 'react';
import useIntersection from '../../hooks/useIntersection';
import Item from './Item';
import FakeItem from './FakeItem';
import styles from './NavBlock.module.css';

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
