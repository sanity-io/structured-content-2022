import { useRef, useMemo, CSSProperties } from 'react';
import clsx from 'clsx';
import { Hero as HeroProps } from '../../types/Hero';
import GridWrapper from '../GridWrapper';
import SimpleCallToAction from '../SimpleCallToAction';
import styles from './Hero.module.css';
import useIntersection from '../../hooks/useIntersection';
import { getRandomAnimation } from '../../lib/animation';

export const Hero = ({ heading, summary, callToAction }: HeroProps) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const isIntersecting = useIntersection(wrapperRef, '-80px 0px');

  const animation1 = useMemo(getRandomAnimation, []) as CSSProperties;
  const animation2 = useMemo(getRandomAnimation, []) as CSSProperties;
  const animation3 = useMemo(getRandomAnimation, []) as CSSProperties;

  return (
    <div
      className={clsx(
        styles.container,
        isIntersecting && styles.isIntersecting
      )}
      ref={wrapperRef}
    >
      <GridWrapper>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading} style={animation1}>
            {heading}
          </h1>
          {summary && (
            <p className={styles.summary} style={animation2}>
              {summary}
            </p>
          )}
          {callToAction && (
            <div className={styles.cta} style={animation3}>
              <SimpleCallToAction {...callToAction} />
            </div>
          )}
        </div>
      </GridWrapper>
    </div>
  );
};
