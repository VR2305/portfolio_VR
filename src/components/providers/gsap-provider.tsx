'use client';

import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const GSAPProvider = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Global ScrollTrigger defaults
    ScrollTrigger.defaults({
      markers: false, // Set to true for debugging
    });
  }, []);

  return <>{children}</>;
};
