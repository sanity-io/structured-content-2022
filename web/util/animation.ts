import type { CSSProperties } from 'react';

const randomize = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomAnimation = (addRotation?: boolean) =>
  ({
    '--distance': '32px',
    '--duration': '1200ms',
    '--delay': '100ms',
    '--rotation': `${addRotation ? randomize(-16, 16) : 0}deg`,
  } as CSSProperties);
