import { CSSProperties, useEffect, useState } from 'react';
import { getRandomAnimation } from '../util/animation';

export const useRandomAnimation = (addRotation?: boolean) => {
  const [animation, setAnimation] = useState<CSSProperties>();
  useEffect(() => setAnimation(getRandomAnimation(addRotation)), [addRotation]);

  return animation;
};
