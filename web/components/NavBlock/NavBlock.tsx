import clsx from 'clsx';
import { useRef } from 'react';
import useIntersection from '../../hooks/useIntersection';
import FakeItem from './FakeItem';
import Item from './Item';
import styles from './NavBlock.module.css';

interface NavBlockProps {
  ticketsUrl?: string;
}

export const NavBlock = ({ ticketsUrl }: NavBlockProps) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const isIntersecting = useIntersection(wrapperRef);
  return (
    <nav
      className={clsx(styles.nav, isIntersecting && styles.isIntersecting)}
      ref={wrapperRef}
    >
      <ul className={styles.list}>
        <Item href="/program">Program</Item>

        <FakeItem mobile tablet desktop />
        <FakeItem mobile tablet desktop />
        <FakeItem divider mobile />
        <FakeItem mobile />

        <FakeItem mobile tablet desktop />

        <FakeItem tablet desktop />
        <FakeItem divider mobile tablet desktop />
        <FakeItem tablet desktop />

        <Item href="/speakers">Speakers</Item>

        <FakeItem tablet desktop />
        <FakeItem mobile tablet desktop />
        <FakeItem divider mobile />
        <FakeItem mobile />

        <FakeItem mobile tablet desktop />

        <FakeItem divider mobile tablet desktop />

        <Item href="/about">About</Item>

        <FakeItem mobile tablet desktop />
        <FakeItem mobile desktop />
        <FakeItem divider mobile />

        {ticketsUrl ? (
          <Item href={ticketsUrl} target="_blank" rel="noreferrer">
            Tickets
          </Item>
        ) : (
          <FakeItem mobile tablet desktop />
        )}

        <FakeItem tablet desktop />
        <FakeItem mobile desktop />
      </ul>
    </nav>
  );
};
