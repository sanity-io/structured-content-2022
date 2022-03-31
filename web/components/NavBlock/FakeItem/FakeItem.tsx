import clsx from 'clsx';
import { useAnimationProperties } from '../../../hooks/useAnimationProperties';
import styles from '../NavBlock.module.css';
import { useRandomShape } from '../../../hooks/useRandomShape';

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
}: FakeItemProps) => (
  <li
    style={useAnimationProperties(true)}
    className={clsx(
      divider ? styles.divider : styles.fakeItem,
      mobile && styles.mobile,
      tablet && styles.tablet,
      desktop && styles.desktop,
      useRandomShape(RANDOM_SHAPE_PERCENT_CHANCE)
    )}
    aria-hidden="true"
  />
);
