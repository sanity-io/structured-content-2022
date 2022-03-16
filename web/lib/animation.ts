interface RandomAnimation {
  '--rotation': string;
  '--distance': string;
  '--duration': string;
  '--delay': string;
}

export function randomize(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomAnimation(): RandomAnimation {
  const rotation = randomize(-16, 16);
  const distance = randomize(0, 150);
  const duration = randomize(300, 500);
  const delay = randomize(100, 650);

  return {
    '--rotation': `${rotation}deg`,
    '--distance': `${distance}px`,
    '--duration': `${duration}ms`,
    '--delay': `${delay}ms`,
  };
}
