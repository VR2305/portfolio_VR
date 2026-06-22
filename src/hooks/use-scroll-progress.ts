'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Hook to track scroll progress of a specific element or the entire page.
 * Useful for mapping scroll to canvas frame indices.
 */
export const useScrollProgress = (triggerRef?: React.RefObject<HTMLElement | null>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const trigger = triggerRef?.current || document.body;
    
    const st = ScrollTrigger.create({
      trigger: trigger,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, [triggerRef]);

  return progress;
};
