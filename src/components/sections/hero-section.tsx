'use client';
// Unused imports cleaned up

import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COLORS } from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/typography';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const effectsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(() => !(typeof window !== 'undefined' && window.innerWidth < 1024));
  const [loadProgress, setLoadProgress] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for each text tier
      const tl = gsap.timeline({ delay: 0.6 });

      tl.from('.hero-eyebrow', {
        y: 12,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from('.hero-headline', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.hero-subtext', {
        y: 14,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.hero-cta', {
        y: 14,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');

      // Twinkle effect for sparkles
      gsap.to('.sparkle', {
        opacity: 0.2,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.5,
          from: 'random'
        }
      });

      // Fade out and move up text block on scroll
      gsap.to(leftContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
        y: -50,
        opacity: 0,
        ease: "none",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen w-full flex items-center px-6 md:px-16 lg:px-24 xl:px-32"
    >
      {/* Google Font for serif accent */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400&display=swap" 
        rel="stylesheet" 
      />
      {/* Pairing font for signature intro */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
        rel="stylesheet"
      />

      {/* Portrait image removed as it was not loading */}

      {/* Cinematic Signature Annotation */}
      <div className="absolute top-[48%] right-[10%] z-10 hidden lg:flex flex-col items-start opacity-85 rotate-[-10deg] pointer-events-none" style={{ fontFamily: "'Rockybilly', cursive" }}>
        
        <div className="relative mb-6 ml-2">
          <span className="text-gray-400 text-[18px] tracking-[0.12em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Hi I'm
          </span>
        </div>

        <div className="relative">
          <span className="text-gray-500 text-[18px] tracking-[0.1em] leading-none" style={{ textShadow: "0 0 4px rgba(255,255,255,0.04)" }}>
            Vignesh Raj
          </span>
        </div>
      </div>

      {/* Background Effects */}
      <div ref={effectsRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none opacity-0"
          style={{
            backgroundImage: [
              'radial-gradient(circle, rgba(255,255,255,0.14) 1.5px, transparent 2px)',
              'radial-gradient(ellipse at 30% 50%, rgba(34,211,238,0.1) 0%, transparent 50%)'
            ].join(', '),
            backgroundPosition: '0 0, 0 0',
            backgroundSize: '32px 32px, 100% 100%',
            /* Huge soft mask positioned firmly on the left, fading completely before the middle */
            WebkitMaskImage: 'radial-gradient(circle at 20% 50%, black 10%, transparent 60%)',
            maskImage: 'radial-gradient(circle at 20% 50%, black 10%, transparent 60%)',
          }}
        />
        


      </div>

      <div
        className="absolute left-0 top-0 z-[1] h-full w-full md:w-[48%] lg:w-[42%] xl:w-[44%] pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 54%, transparent 94%), linear-gradient(180deg, transparent 0%, black 18%, black 80%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
          maskImage: 'linear-gradient(90deg, black 0%, black 54%, transparent 94%), linear-gradient(180deg, transparent 0%, black 18%, black 80%, transparent 100%)',
          maskComposite: 'intersect',
        }}
      >
        <div className="absolute left-[10%] top-[18%] sparkle opacity-25">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill={COLORS.primary} />
          </svg>
        </div>
        <div className="absolute left-[34%] top-[34%] sparkle opacity-20">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#fff" />
          </svg>
        </div>
        <div className="absolute left-[18%] bottom-[28%] sparkle opacity-20">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#ec4899" />
          </svg>
        </div>

        <div className="absolute left-[8%] top-[46%] w-7 h-7 rounded-full border border-white/10" />
        <div className="absolute left-[38%] bottom-[18%] w-4 h-4 rounded-full border border-cyan-400/15" />
        <div className="absolute left-[28%] top-[22%] w-20 h-[1px] bg-white/10 rotate-45" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.12)' }} />
        <div className="absolute left-[12%] bottom-[38%] w-14 h-[1px] bg-cyan-400/15 -rotate-12" style={{ boxShadow: '0 0 10px rgba(6,182,212,0.18)' }} />
      </div>

      <div
        className="absolute right-0 top-0 z-[1] h-full w-full md:w-[48%] lg:w-[42%] xl:w-[44%] pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(270deg, black 0%, black 54%, transparent 94%), linear-gradient(180deg, transparent 0%, black 18%, black 80%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
          maskImage: 'linear-gradient(270deg, black 0%, black 54%, transparent 94%), linear-gradient(180deg, transparent 0%, black 18%, black 80%, transparent 100%)',
          maskComposite: 'intersect',
        }}
      >
        <div className="absolute right-[10%] top-[18%] sparkle opacity-25">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill={COLORS.primary} />
          </svg>
        </div>
        <div className="absolute right-[34%] top-[34%] sparkle opacity-20">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#fff" />
          </svg>
        </div>
        <div className="absolute right-[18%] bottom-[28%] sparkle opacity-20">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#ec4899" />
          </svg>
        </div>

        <div className="absolute right-[8%] top-[46%] w-7 h-7 rounded-full border border-white/10" />
        <div className="absolute right-[38%] bottom-[18%] w-4 h-4 rounded-full border border-cyan-400/15" />
        <div className="absolute right-[28%] top-[22%] w-20 h-[1px] bg-white/10 -rotate-45" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.12)' }} />
        <div className="absolute right-[12%] bottom-[38%] w-14 h-[1px] bg-cyan-400/15 rotate-12" style={{ boxShadow: '0 0 10px rgba(6,182,212,0.18)' }} />
      </div>

      {/* Global SVG Filter for realistic brush stroke effect */}
      <svg className="pointer-events-none absolute w-0 h-0" aria-hidden="true">
        <filter id="brush-stroke" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.3" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Left Content — Restored cinematic alignment and premium typography rhythm */}
      <div 
        ref={leftContentRef}
        className="w-full max-w-[540px] z-10 flex flex-col relative ml-0 md:ml-12 lg:ml-20 xl:ml-28 mt-8 md:mt-12"
      >
        {/* Mobile-only Intro */}
        <div className="hero-eyebrow relative z-10 flex items-center mb-4 lg:hidden">
          <div className="flex items-center opacity-90">
            <span className="text-[#a1a1aa] text-[12px] md:text-[14px] uppercase tracking-[0.25em] font-bold font-sans">
              Hi I'm Vignesh Raj
            </span>
          </div>
        </div>

        {/* Introduction — visually connected but architecturally distinct, stronger hierarchy */}
        <div className="hero-eyebrow relative z-10 flex items-center mb-2">
          <span 
            className="font-sans text-[19px] md:text-[22px] tracking-[0.02em] font-bold text-white"
            style={{ textShadow: '0 0 15px rgba(255,255,255,0.5)' }}
          >
            UX Engineer who . . .
          </span>
        </div>

        {/* Headline — Restored dominant scale and cinematic presence */}
        <h1
          className="hero-headline relative z-10 font-sans font-bold text-white/90 mb-8 text-balance"
          style={{ 
            fontSize: 'clamp(2rem, 3.4vw, 3.4rem)', 
            lineHeight: 1.12, 
            letterSpacing: '-0.025em', 
            fontFamily: FONT_FAMILY.primary 
          }}
        >
          Bridges the gap between <span className="relative inline-block whitespace-pre text-white font-serif text-[0.95em] tracking-[-0.01em] leading-[1]" style={{ fontFamily: "'Lora', serif", fontStyle: 'normal', fontWeight: 400 }}><span className="absolute inset-0 top-[30%] -bottom-[10%] -left-2 -right-2 -z-10 -rotate-1 opacity-40 bg-cyan-400" style={{ filter: 'url(#brush-stroke)' }} /><span className="relative z-10">design</span></span> and <span className="relative inline-block whitespace-pre text-white font-serif text-[0.95em] tracking-[-0.01em] leading-[1]" style={{ fontFamily: "'Lora', serif", fontStyle: 'normal', fontWeight: 400 }}><span className="absolute inset-0 top-[30%] -bottom-[10%] -left-2 -right-2 -z-10 -rotate-1 opacity-40 bg-[#a855f7]" style={{ filter: 'url(#brush-stroke)' }} /><span className="relative z-10">development</span></span>
        </h1>

        {/* Continuation — Styled as a sentence resolution, perfectly aligned */}
        <p className="hero-subtext relative z-10 text-white/80 leading-[1.45] font-normal mb-10 max-w-[460px] text-[17px] md:text-[19px]" style={{ fontFamily: FONT_FAMILY.primary, letterSpacing: '0.01em' }}>
          I build systems behind the UI that <br className="hidden md:block" /> reduce cognitive load
        </p>

        {/* CTAs — Minimal, visually unified, natural endpoint */}
        <div className="hero-cta relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-start gap-4 w-full md:w-auto">
          <a
            href="#projects"
            className="group w-full md:w-auto inline-flex items-center justify-center px-8 py-4 md:py-3.5 bg-white hover:bg-white/90 text-black text-[14px] md:text-[12px] font-bold tracking-[0.05em] rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] md:hover:scale-105"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 md:py-3.5 bg-transparent border border-white/10 hover:border-white/20 text-white/70 text-[14px] md:text-[12px] font-medium tracking-[0.05em] rounded-full hover:bg-white/5 hover:text-cyan-400 hover:scale-[1.02] md:hover:scale-105 transition-all duration-300"
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>

    </section>
  );
};
