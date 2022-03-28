import { useEffect, useState } from 'react';
import type { Shape } from '../types/Shape';
import styles from './shapes.module.css';

const shapes: Shape[] = ['Plus', 'C', 'Ovals', 'O', 'HalfOval'];

const getRandomShape = () => shapes[Math.floor(Math.random() * shapes.length)];

export const useRandomShape = (randomShapeChance: number = 1) => {
  const [shapeClass, setShapeClass] = useState<string>();

  useEffect(() => {
    if (!shapeClass && Math.random() <= randomShapeChance) {
      setShapeClass(styles[`shape${getRandomShape()}`]);
    }
  }, [shapeClass, randomShapeChance]);

  return shapeClass;
};
