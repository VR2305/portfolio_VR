'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const SparkleIcon = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill={color} />
  </svg>
);

export const GlobalSparkles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.global-sparkle', {
        opacity: 0.1,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.8,
          from: 'random'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* 
        These are fixed relative to the viewport because the parent in page.tsx is fixed. 
        They will stay in the background as you scroll, creating a magical atmospheric depth.
      */}
      <div className="absolute top-[15%] left-[20%] global-sparkle opacity-40">
        <SparkleIcon color="#06b6d4" /> {/* Cyan */}
      </div>
      <div className="absolute top-[30%] left-[85%] global-sparkle opacity-30 scale-75">
        <SparkleIcon color="#a855f7" /> {/* Purple */}
      </div>
      <div className="absolute top-[60%] left-[10%] global-sparkle opacity-50 scale-50">
        <SparkleIcon color="#fff" />
      </div>
      <div className="absolute top-[80%] left-[75%] global-sparkle opacity-25 scale-125">
        <SparkleIcon color="#06b6d4" />
      </div>
      <div className="absolute top-[45%] left-[45%] global-sparkle opacity-40 scale-75">
        <SparkleIcon color="#ec4899" /> {/* Pink */}
      </div>
      <div className="absolute top-[10%] left-[60%] global-sparkle opacity-30">
        <SparkleIcon color="#fff" />
      </div>
      <div className="absolute top-[75%] left-[90%] global-sparkle opacity-40 scale-50">
        <SparkleIcon color="#a855f7" />
      </div>
      <div className="absolute top-[85%] left-[25%] global-sparkle opacity-50 scale-75">
        <SparkleIcon color="#fff" />
      </div>
      <div className="absolute top-[40%] left-[5%] global-sparkle opacity-20 scale-125">
        <SparkleIcon color="#06b6d4" />
      </div>
      <div className="absolute top-[20%] left-[40%] global-sparkle opacity-30 scale-50">
        <SparkleIcon color="#ec4899" />
      </div>
    </div>
  );
};
