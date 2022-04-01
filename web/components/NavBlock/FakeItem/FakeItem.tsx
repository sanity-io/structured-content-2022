import clsx from 'clsx';
import { useAnimationProperties } from '../../../hooks/useAnimationProperties';
import { useRandomShape } from '../../../hooks/useRandomShape';
import styles from '../NavBlock.module.css';

interface FakeItemProps {
  divider?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

const RANDOM_SHAPE_PERCENT_CHANCE = 0.33;

export const FakeItem = ({
  divider,
  mobile,
  tablet,
  desktop,
}: FakeItemProps) => {
  const randomShapeClass = useRandomShape(RANDOM_SHAPE_PERCENT_CHANCE);
  return (
    <li
      style={useAnimationProperties(true)}
      className={clsx(
        divider ? styles.divider : styles.fakeItem,
        mobile && styles.mobile,
        tablet && styles.tablet,
        desktop && styles.desktop,
        !randomShapeClass && styles.noShape,
        randomShapeClass
      )}
      aria-hidden="true"
    />
  );
};
