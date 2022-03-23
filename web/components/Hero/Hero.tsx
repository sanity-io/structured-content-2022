import { useRef } from 'react';
import clsx from 'clsx';
import { Hero as HeroProps } from '../../types/Hero';
import useIntersection from '../../hooks/useIntersection';
import { useAnimationProperties } from '../../hooks/useAnimationProperties';
import GridWrapper from '../GridWrapper';
import SimpleCallToAction from '../SimpleCallToAction';
import styles from './Hero.module.css';

export const Hero = ({ heading, summary, callToAction }: HeroProps) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const isIntersecting = useIntersection(wrapperRef, '-80px 0px');
  const headingAnimation = useAnimationProperties();
  const summaryAnimation = useAnimationProperties();
  const ctaAnimation = useAnimationProperties();

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
          <h1 className={styles.heading} style={headingAnimation}>
            {heading}
          </h1>
          {summary && (
            <p className={styles.summary} style={summaryAnimation}>
              {summary}
            </p>
          )}
          {callToAction && (
            <div className={styles.cta} style={ctaAnimation}>
              <SimpleCallToAction {...callToAction} />
            </div>
          )}
        </div>
      </GridWrapper>
    </div>
  );
};
