'use client';

import { useRef } from 'react';
import { useCanvasSequence } from '@/hooks/use-canvas-sequence';

export const CinematicCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLoading, loadProgress, debugInfo } = useCanvasSequence(canvasRef);

  return (
    <>
      {/* Cinematic Layer */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden hidden lg:block">
        <canvas
          ref={canvasRef}
          id="cinematic-canvas"
          className="w-full h-full pointer-events-none"
        />
      </div>

      {/* Cinematic Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden">
          {/* Background Ambient Glow */}
          <div
            className="absolute pointer-events-none opacity-30"
            style={{
              width: '80vw',
              height: '80vw',
              background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 60%)',
            }}
          />
          
          <div className="relative flex flex-col items-center justify-center h-full w-full">
            {/* Centered Loading Lockup */}
            <div className="relative flex flex-col items-center mb-8">
              {/* Elegant Progress Number */}
              <div className="relative inline-flex justify-center items-start">
                <div 
                  className="font-sans font-light leading-none text-white text-center"
                  style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', letterSpacing: '-0.02em' }}
                >
                  {Math.round(loadProgress * 100)}
                </div>
                {/* Superscript % sign (absolutely positioned to not affect centering) */}
                <span 
                  className="absolute left-full top-[10%] text-cyan-400 font-serif italic font-normal ml-2" 
                  style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(1rem, 2vw, 2rem)' }}
                >
                  %
                </span>
              </div>

              <div className="text-white font-sans text-[10px] md:text-[12px] tracking-[0.4em] uppercase mt-4 opacity-70 text-center">
                Welcome to my portfolio
              </div>
            </div>

            {/* Premium Central Progress Bar */}
            <div className="w-[60vw] max-w-[400px] h-[2px] bg-white/10 rounded-full relative overflow-visible">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-700 ease-out rounded-full"
                style={{ 
                  width: `${loadProgress * 100}%`,
                  boxShadow: '0 0 20px 2px rgba(168,85,247,0.8), 0 0 10px rgba(6,182,212,0.8)'
                }}
              />
            </div>
          </div>
        </div>
      )}


    </>
  );
};
