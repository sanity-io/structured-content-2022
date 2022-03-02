import { useState, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Accordion.module.css';

interface AccordionProps {
  items: {
    title: string;
    content: ReactNode | ReactNode[];
  }[];
}

const AccordionSection = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  const onClick = (e) => {
    setOpen(!open);
  };

  return (
    <>
      <button
        onClick={onClick}
        className={clsx(styles.accordion, open && styles.active)}
      >
        {title}
        <span className={styles.expandCollapseIndicator} />
      </button>
      <div className={clsx(styles.panel, open && styles.open)}>{content}</div>
    </>
  );
};

export const Accordion = ({ items }: AccordionProps) => (
  <div className={styles.container}>
    {items.map(({ title, content }, index) => (
      <AccordionSection key={index} title={title} content={content} />
    ))}
  </div>
);
