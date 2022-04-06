import { useState, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Accordion.module.css';

interface AccordionProps {
  baseId: string;
  items: {
    title: string;
    content: ReactNode | ReactNode[];
  }[];
}

const AccordionSection = ({ title, content, baseId }) => {
  const [open, setOpen] = useState(false);

  const onClick = (e) => {
    setOpen(!open);
  };

  const panelId = `${baseId}-panel`;

  return (
    <section>
      <h3 className={styles.sectionHeading} id={`heading-h2-${baseId}`}>
        <button
          onClick={onClick}
          className={clsx(styles.accordion, open && styles.active)}
          aria-controls={panelId}
          aria-expanded={open}
        >
          {title}
        </button>
      </h3>
      <div className={clsx(styles.panel, open && styles.open)} id={panelId}>
        {content}
      </div>
    </section>
  );
};

export const Accordion = ({ baseId, items }: AccordionProps) => (
  <>
    {items.map(({ title, content }, index) => (
      <AccordionSection
        key={index}
        title={title}
        content={content}
        baseId={`${baseId}-${index}`}
      />
    ))}
  </>
);
