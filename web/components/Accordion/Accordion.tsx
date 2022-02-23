import styles from "./Accordion.module.css";
import { Fragment, ReactNode } from "react";

interface AccordionProps {
  items: {
    title: string;
    content: ReactNode | ReactNode[];
  }[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const onClick = (e) => {
    e.target.classList.toggle(styles.active);

    const panel = e.target.nextElementSibling;
    console.log(panel.style.display);
    if (panel.style.display !== "block") {
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  };

  return <div className={styles.container}>
    {items.map(({ title, content }, index) => (
      <Fragment key={index}>

        <button onClick={onClick} className={styles.accordion}>
          {title}
          <span className={styles.expandCollapseIndicator} />
        </button>
        <div className={styles.panel}>{content}</div>
      </Fragment>
    ))}
  </div>;
}