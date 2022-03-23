import type { CSSProperties } from 'react';

const randomize = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomAnimation = (addRotation?: boolean) =>
  ({
    '--distance': `${randomize(0, 150)}px`,
    '--duration': `${randomize(300, 500)}ms`,
    '--delay': `${randomize(100, 650)}ms`,
    '--rotation': `${addRotation ? randomize(-16, 16) : 0}deg`,
  } as CSSProperties);
