import clsx from "clsx";
import { useRandomShape } from "../../hooks/useRandomShape";
import styles from "./Shape.module.css";

interface ShapeProps {
  className?: string;
}

export const Shape = ({ className }: ShapeProps) =>
  <div className={clsx(styles.shape, className, useRandomShape())} />;
