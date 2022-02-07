import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import styles from './Heading.module.css';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingsMap = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  h4: (props) => <h4 {...props} />,
  h5: (props) => <h5 {...props} />,
  h6: (props) => <h6 {...props} />,
};

export const Heading = ({ className, type = 'h1', ...props }: HeadingProps) => {
  const Heading = headingsMap[type];
  return (
    <Heading
      className={clsx(className, styles.heading, styles[type])}
      {...props}
    />
  );
};
