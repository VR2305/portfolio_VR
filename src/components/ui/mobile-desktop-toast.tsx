'use client';

import React, { useState, useEffect } from 'react';

export const MobileDesktopToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show popup when they scroll down a little bit (e.g., 100px) 
      // but hide it once they scroll past the hero section (windowHeight)
      if (scrollY > 50 && scrollY < windowHeight * 0.9) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div 
      className={`md:hidden fixed bottom-6 left-4 right-4 z-[200] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0' : 'translate-y-[150%]'}`}
    >
      <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,0.6)] flex items-start gap-4">
        <div className="mt-0.5 text-cyan-400 shrink-0 opacity-90">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[14.5px] text-white leading-[1.6] font-medium font-sans pr-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            For the best visual experience, kindly view this portfolio on a desktop device.
          </p>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => setIsDismissed(true), 700); // Wait for exit animation
          }}
          className="text-white/50 hover:text-white shrink-0 p-1 -mr-1 transition-colors"
          aria-label="Dismiss notification"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};
