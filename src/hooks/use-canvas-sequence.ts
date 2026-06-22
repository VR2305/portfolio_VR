'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { frameLoader } from '@/lib/cinematic/frame-loader';
import { RenderEngine, CanvasAlignment } from '@/lib/cinematic/render-engine';
import { CINEMATIC_SEQUENCES, getFramePath, getAllFramePaths, SequenceConfig } from '@/lib/cinematic/config';

gsap.registerPlugin(ScrollTrigger);

interface CinematicState {
  sequence: SequenceConfig;
  frame: number;
  alignment: CanvasAlignment;
  scale: number;
}

export const useCanvasSequence = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [debugInfo, setDebugInfo] = useState({ 
    frame: 0, 
    total: 0, 
    sequence: '',
    progress: 0,
    section: 'Loading'
  });
  
  const engineRef = useRef<RenderEngine | null>(null);
  const stateRef = useRef<CinematicState>({
    sequence: CINEMATIC_SEQUENCES.heroAbout,
    frame: 1,
    alignment: 'bottom-right',
    scale: 1.3,
  });

  const lastRenderedRef = useRef({ frame: -1, sequenceId: '' });

  // Initialize engine
  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new RenderEngine(canvasRef.current);
    }
    const handleResize = () => engineRef.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasRef]);

  const render = useCallback(() => {
    if (!engineRef.current || isLoading) return;
    
    const { sequence, frame, alignment, scale } = stateRef.current;
    const roundedFrame = Math.floor(frame);
    
    const path = getFramePath(sequence, roundedFrame);
    const img = frameLoader.getFrame(path);
    
    if (img) {
      engineRef.current.drawFrame(img, alignment, scale);
      lastRenderedRef.current = { frame: roundedFrame, sequenceId: sequence.id };
      
      setDebugInfo(prev => ({
        ...prev,
        frame: roundedFrame,
        total: sequence.frameCount,
        sequence: sequence.id
      }));
    }
  }, [isLoading]);

  // Preload frames
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      // Defer state updates to avoid synchronous setState in effect
      setTimeout(() => {
        setIsLoading(false);
        setLoadProgress(1);
      }, 0);
      return;
    }

    const loadAll = async () => {
      const heroPaths = getAllFramePaths(CINEMATIC_SEQUENCES.heroAbout);
      const workstationPaths = getAllFramePaths(CINEMATIC_SEQUENCES.aboutWorkstation);

      const criticalPaths = heroPaths.slice(0, 15);
      const backgroundPaths = [...heroPaths.slice(15), ...workstationPaths];

      try {
        const loadPromise = frameLoader.preload(criticalPaths);

        const visualPromise = new Promise<void>(resolve => {
           gsap.to({ val: 0 }, {
             val: 1,
             duration: 0.8,
             ease: 'power1.inOut',
             onUpdate: function() {
               setLoadProgress(this.targets()[0].val);
             },
             onComplete: resolve
           });

           // Fallback in case GSAP is paused (e.g., opened in a background tab)
           setTimeout(() => {
             setLoadProgress(1);
             resolve();
           }, 1200);
        });

        // Strict fallback: Never hang the loading screen for more than 3 seconds total
        const timeoutPromise = new Promise<void>(resolve => setTimeout(resolve, 3000));

        await Promise.race([
          Promise.all([loadPromise, visualPromise]),
          timeoutPromise
        ]);
        
        setLoadProgress(1);
        await new Promise(resolve => setTimeout(resolve, 150));
        setIsLoading(false);
        render();

        frameLoader.preload(backgroundPaths, undefined, 3).catch((error) => {
          console.warn('Background frame loading error (non-fatal):', error);
        });
      } catch (error) {
        console.error('Critical sequence preloading failed:', error);
        setIsLoading(false);
      }
    };
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading || (typeof window !== 'undefined' && window.innerWidth < 1024)) return;

    // Force canvas resize to ensure dimensions exist before initial render
    engineRef.current?.resize();

    const ctx = gsap.context(() => {
      // Reduced from 1.2 to 0.5 to match the fast text scrubbing in sections
      const SCRUB_VALUE = 0.5;

      // 1. HERO -> ABOUT
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        endTrigger: '#about',
        end: 'top top',
        scrub: SCRUB_VALUE,
        onUpdate: (self) => {
          stateRef.current.sequence = CINEMATIC_SEQUENCES.heroAbout;
          stateRef.current.frame = 1 + (self.progress * 239);
          
          // "Magnet" effect: keep the avatar strongly pinned to the right (1) for most of the scroll
          // Don't "flow" it completely across the screen slowly. Snap it over quickly at the very end.
          let pan = 1;
          if (self.progress > 0.75) {
            const t = Math.min(1, (self.progress - 0.75) / 0.25);
            // Cubic ease-in-out for a magnetic "snap" feel
            const easeInOutCubic = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            pan = 1 - easeInOutCubic;
          }
          stateRef.current.alignment = pan as CanvasAlignment;
          
          stateRef.current.scale = 1.4; 
          render();
        }
      });

      // 2. ABOUT -> WHAT I DO
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top top',
        endTrigger: '#what-i-do',
        end: 'top top',
        scrub: SCRUB_VALUE,
        onUpdate: (self) => {
          // Start turning immediately as the 'How I work' section enters from the bottom
          const freezeThreshold = 0.0;
          let currentFrame = 1;
          let scrubProgress = 0;
          
          if (self.progress > freezeThreshold) {
            scrubProgress = (self.progress - freezeThreshold) / (1 - freezeThreshold);
            currentFrame = 1 + (scrubProgress * 239);
          }

          stateRef.current.sequence = CINEMATIC_SEQUENCES.aboutWorkstation;
          stateRef.current.frame = currentFrame;
          
          // About text is on right, What I Do text is on left.
          // Pan avatar from left (0) to right (1).
          // We use a cubic ease-out so it shifts out of the way rapidly to dodge the 'How I work' text early!
          const easeOut = 1 - Math.pow(1 - self.progress, 3);
          stateRef.current.alignment = easeOut;
          
          // Smoothly interpolate scale from 1.35 down to 1.074
          if (self.progress > freezeThreshold) {
            stateRef.current.scale = 1.35 - (scrubProgress * 0.276);
          } else {
            stateRef.current.scale = 1.35;
          }

          render();
        }
      });

      // 3. SCROLL-UP (Starts only when experience section arrives, after what-i-do unpins)
      if (canvasRef.current?.parentElement) {
        gsap.to(canvasRef.current.parentElement, {
          scrollTrigger: {
            trigger: '#experience',
            start: 'top bottom', // Triggers exactly when what-i-do unpins and experience starts entering
            end: 'top top', // Ends when experience is fully scrolled in
            scrub: true,
          },
          y: '-100%',
          ease: 'none',
        });
      }
    });

    // Force an immediate initial render so the avatar isn't invisible before scrolling!
    requestAnimationFrame(() => render());

    return () => ctx.revert();
  }, [isLoading, render, canvasRef]);

  return { isLoading, loadProgress, debugInfo };
};
