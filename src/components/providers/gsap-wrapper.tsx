// src/components/layout/GSAPWrapper.tsx
'use client';

import React, { ReactNode } from 'react';
import { GSAPProvider } from '@/components/providers/gsap-provider';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { CinematicCanvas } from '@/components/canvas/cinematic-canvas';

interface GSAPWrapperProps {
  children: ReactNode;
}

export const GSAPWrapper = ({ children }: GSAPWrapperProps) => {
  return (
    <GSAPProvider>
      <SmoothScroll>
        <CinematicCanvas />
        {children}
      </SmoothScroll>
    </GSAPProvider>
  );
};
