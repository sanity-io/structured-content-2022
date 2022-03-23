import { CSSProperties, useEffect, useState } from 'react';
import { animationProperties } from '../util/animation';

export const useAnimationProperties = (randomize?: boolean) => {
  const [animation, setAnimation] = useState<CSSProperties>();
  useEffect(() => setAnimation(animationProperties(randomize)), [randomize]);

  return animation;
};
