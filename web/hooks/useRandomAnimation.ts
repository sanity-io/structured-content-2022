import { CSSProperties, useEffect, useState } from 'react';
import { getRandomAnimation } from '../lib/animation';

export const useRandomAnimation = () => {
  const [animation, setAnimation] = useState<CSSProperties>();
  useEffect(() => setAnimation(getRandomAnimation()), []);

  return animation;
};
