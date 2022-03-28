import clsx from "clsx";
import { useRandomShape } from "../../hooks/useRandomShape";
import styles from "./Shape.module.css";

interface ShapeProps {
  margin?: 'margin' | 'marginTop' | 'marginBottom';
}

export const Shape = ({ margin = 'margin' }: ShapeProps) =>
  <div className={clsx(styles.shape, styles[margin], useRandomShape())} />;
