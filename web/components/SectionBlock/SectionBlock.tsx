import clsx from "clsx";
import { HTMLAttributes } from "react";
import styles from "./SectionBlock.module.css";

interface SectionBlockProps extends HTMLAttributes<HTMLDivElement> {}

export const SectionBlock = ({ className, ...props }: SectionBlockProps) =>
  <div className={clsx(className, styles.sectionBlock)} {...props} />;
