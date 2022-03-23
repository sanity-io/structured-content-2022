import type { CSSProperties } from 'react';

const randomRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const animationProperties = (randomize?: boolean) =>
  ({
    '--distance': randomize ? `${randomRange(0, 150)}px` : '32px',
    '--duration': randomize ? `${randomRange(300, 500)}ms` : '1200ms',
    '--delay': `${randomRange(100, 450)}ms`, // Delay is always random
    '--rotation': randomize ? `${randomRange(-16, 16)}deg` : 0,
  } as CSSProperties);
