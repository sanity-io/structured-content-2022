import React, { useState, useEffect } from 'react';

export default function useIntersection(
  ref: React.MutableRefObject<HTMLElement | null>,
  rootMargin = '1% 0px'
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && ref?.current) {
          observer.unobserve(ref.current);
        }
      },
      { rootMargin }
    );

    if (ref?.current) {
      observer?.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [ref, rootMargin]);

  return isIntersecting;
}
