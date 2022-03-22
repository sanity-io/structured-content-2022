import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRandomAnimation } from '../../../hooks/useRandomAnimation';
import styles from '../NavBlock.module.css';

interface FakeItemProps {
  divider?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

const RANDOM_SHAPE_PERCENT_CHANCE = 0.33;

type Shape = 'Plus' | 'C' | 'Ovals' | 'O' | 'HalfOval';

const getRandomShape = (): Shape => {
  const shapes: Shape[] = ['Plus', 'C', 'Ovals', 'O', 'HalfOval'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

export const FakeItem = ({
  divider,
  mobile,
  tablet,
  desktop,
}: FakeItemProps) => {
  const animation = useRandomAnimation();
  const [shapeClass, setShapeClass] = useState<string>();

  useEffect(() => {
    if (Math.random() <= RANDOM_SHAPE_PERCENT_CHANCE) {
      setShapeClass(styles[`shape${getRandomShape()}`]);
    }
  }, []);

  return (
    <li
      style={animation}
      className={clsx(
        divider ? styles.divider : styles.fakeItem,
        mobile && styles.mobile,
        tablet && styles.tablet,
        desktop && styles.desktop,
        shapeClass
      )}
      aria-hidden="true"
    />
  );
};
