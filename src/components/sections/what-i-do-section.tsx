'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

gsap.registerPlugin(ScrollTrigger);

// ─── Brand-accurate colored SVG icons ─────────────────────────────────────────
const TOOLS: { name: string; color: string; icon: string }[] = [
  // ROW 1: Figma, PS, AI, Blender, Tailwind, GSAP, Flow, NotebookLM, GitHub
  { name: 'Figma', color: '#A259FF', icon: '/tools/figma.svg' },
  { name: 'Photoshop', color: '#31A8FF', icon: '/tools/adobe-photoshop-icon.svg' },
  { name: 'Illustrator', color: '#FF9A00', icon: '/tools/adobe-illustrator-icon.svg' },
  { name: 'Blender', color: '#E87D0D', icon: '/tools/blender-icon.svg' },
  { name: 'Tailwind CSS', color: '#38BDF8', icon: '/tools/tailwind-css-icon.svg' },
  { name: 'GSAP', color: '#0AE448', icon: '/tools/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png' },
  { name: 'Google Flow', color: '#4285F4', icon: '/tools/Google%20flow%20Logo%20PNG%20SVG%20Vector.svg' },
  { name: 'NotebookLM', color: '#4285F4', icon: '/tools/notebooklm-icon.svg' },
  { name: 'GitHub', color: '#e0e0e0', icon: '/tools/github-icon.svg' },
  
  // ROW 2: VS Code, Antigravity, Cursor, React, Next.js, Node.js, JavaScript, Claude, ChatGPT
  { name: 'VS Code', color: '#007ACC', icon: '/tools/visual-studio-code-icon.svg' },
  { name: 'Antigravity', color: '#22D3EE', icon: '/tools/antigravity-color.svg' },
  { name: 'Cursor', color: '#b0c4de', icon: '/tools/cursor-ai-code-icon.svg' },
  { name: 'React', color: '#61DAFB', icon: '/tools/react-js-icon.svg' },
  { name: 'Next.js', color: '#ffffff', icon: '/next.svg' },
  { name: 'Node.js', color: '#68A063', icon: '/tools/node-js-icon.svg' },
  { name: 'JavaScript', color: '#F7DF1E', icon: '/tools/javascript-programming-language-icon.svg' },
  { name: 'Claude', color: '#D4936A', icon: '/tools/claude-ai-icon.svg' },
  { name: 'ChatGPT', color: '#10A37F', icon: '/tools/openai-icon.svg' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export const WhatIDoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin matching the about section pattern (Desktop only)
      if (window.innerWidth >= 768) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=30%',
          pin: true,
          pinSpacing: true,
        });
      }


      // Staggered entrance — same timing system as hero
      gsap.set(['.hiw-headline', '.hiw-copy', '.hiw-tools-row'], {
        opacity: 0,
      });

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 55%',
          toggleActions: prefersReduced ? 'none none none none' : 'play none none none',
        },
      });

      if (!prefersReduced) {
        tl.to('.hiw-headline',     { opacity: 1, duration: 0.8, ease: 'power2.out' })
          .to('.hiw-copy',         { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
          .to('.hiw-tools-row',    { opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.08 }, '-=0.4');
      }


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-i-do"
      ref={containerRef}
      className="relative min-h-0 md:min-h-[100dvh] w-full flex items-center pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden"
    >
      {/* Cursive font for "work" */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* ── Subtle ambient glow (reduced opacity) ─────────────────────────────── */}
      <div
        className="absolute pointer-events-none opacity-20"
        style={{
          left: '-8%',
          top: '15%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none opacity-15"
        style={{
          left: '5%',
          bottom: '5%',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(217,70,239,0.03) 0%, transparent 75%)',
        }}
      />

      {/* ── Sparkle echoes — matching hero's decorative language ───────────── */}
      <div className="absolute left-[38%] top-[18%] opacity-20 pointer-events-none">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill={COLORS.primary}/>
        </svg>
      </div>
      <div className="absolute left-[42%] bottom-[22%] opacity-15 pointer-events-none">
        <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
          <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#fff"/>
        </svg>
      </div>

      {/* ── LEFT SIDE — floating text composition ──────────────────────────── */}
      <div ref={leftRef} className="lg:pl-40 md:pl-24 px-6 z-10 flex flex-col items-center md:items-start text-center md:text-left w-full">
        {/* ── Main headline ──────────────────────────────────────────────── */}
        <div className="hiw-headline mb-10">
          <h2
            className="font-sans font-bold leading-none text-white flex items-baseline gap-3"
            style={{
              fontSize: 'clamp(2rem, 3.4vw, 3.35rem)',
              letterSpacing: '-0.025em',
            }}
          >
            How I{' '}
            <span className="relative inline-block whitespace-pre text-white font-serif italic font-normal" style={{ fontFamily: "'Lora', serif", letterSpacing: 'normal' }}>
              <span className="absolute inset-0 top-[30%] -bottom-[10%] -left-2 -right-2 -z-10 -rotate-1 opacity-40 bg-cyan-400" style={{ filter: 'url(#brush-stroke)' }} />
              <span className="relative z-10">Work</span>
            </span>
          </h2>
        </div>

        {/* ── Statement line ─────────────────────────────────────────────── */}
        <p
          className="hiw-copy font-sans text-white/90 leading-[1.7] text-[1rem] mb-4"
        >
          I think{' '}
          <span className="relative inline-block text-white ml-1">
            <span 
              className="absolute inset-0 top-[30%] -bottom-[10%] -left-1 -right-1 -z-10 -rotate-1 opacity-40 bg-cyan-400" 
              style={{ filter: 'url(#brush-stroke)' }}
            />
            <span className="relative z-10">end to end</span>
          </span>.
        </p>

        {/* ── Body copy + closing — unified text column ──────────────────── */}
        <div className="hiw-copy flex flex-col mb-10 items-center md:items-start" style={{ gap: '0.5rem' }}>
          <p className="font-sans text-white/90 leading-[1.7] text-[1rem]">
            From problem to interface to build.
          </p>
          <p className="font-sans text-white/90 leading-[1.7] text-[1rem]">
            I focus on the full product, not just the screen.
          </p>
          <p className="font-sans text-white/90 leading-[1.7] text-[1rem]">
            That&apos;s how I keep things{' '}
            <span className="relative inline-block text-white ml-1">
              <span 
                className="absolute inset-0 top-[30%] -bottom-[10%] -left-1 -right-1 -z-10 -rotate-1 opacity-40 bg-cyan-400" 
                style={{ filter: 'url(#brush-stroke)' }}
              />
              <span className="relative z-10">simple, practical, and clean</span>
            </span>.
          </p>
        </div>



        {/* ── Tools section ──────────────────────────────────────────────── */}
        <div className="w-full flex flex-col items-center md:items-start">
          <div className="mb-10">
            <span className="relative inline-block font-mono text-[13px] tracking-[0.2em] uppercase text-cyan-400 font-bold">
              TOOLS I USE
              {/* Sketch-style white underline */}
              <svg 
                className="absolute -bottom-2 left-0 w-full h-[8px] text-white" 
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M -2 7 Q 25 3 60 6 T 102 5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  className="opacity-80"
                />
                <path 
                  d="M 5 6 Q 45 9 80 4" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  className="opacity-50"
                />
              </svg>
            </span>
          </div>

          {/* Mobile View — Unified Balanced Grid */}
          <div className="hiw-tools-row grid grid-cols-6 gap-y-4 gap-x-2 md:hidden mb-8 w-full place-items-center">
            {TOOLS.map((tool) => (
              <ToolIcon key={tool.name} tool={tool} />
            ))}
          </div>

          {/* Desktop Row 1 — Design */}
          <div className="hiw-tools-row hidden md:flex flex-wrap justify-start gap-6 mb-6 w-full">
            {TOOLS.slice(0, 9).map((tool) => (
              <ToolIcon key={tool.name} tool={tool} />
            ))}
          </div>

          {/* Desktop Row 2 — Dev + AI */}
          <div className="hiw-tools-row hidden md:flex flex-wrap justify-start gap-6 w-full">
            {TOOLS.slice(9).map((tool) => (
              <ToolIcon key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — intentionally empty; cinematic avatar canvas owns this space */}
      <div className="hidden lg:block flex-1 h-full" />
    </section>
  );
};

// ─── ToolIcon sub-component ───────────────────────────────────────────────────
function ToolIcon({ tool }: { tool: { name: string; color: string; icon: string } }) {
  const ref = useRef<HTMLButtonElement>(null);

  const isWhiteIcon = ['Next.js', 'ChatGPT', 'NotebookLM', 'GitHub'].includes(tool.name);

  return (
    <button
      ref={ref}
      aria-label={tool.name}
      title={tool.name}
      className="relative flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{
        width: '2.1rem',
        height: '2.1rem',
        color: tool.color,
        opacity: 0.85,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(-4px) scale(1.1)';
        el.style.opacity = '1';
        el.style.filter = `drop-shadow(0 4px 12px ${tool.color}80)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(0) scale(1)';
        el.style.opacity = '0.85';
        el.style.filter = 'none';
      }}
    >
      <span className="sr-only">{tool.name}</span>
      <div className="flex items-center justify-center w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={tool.icon} 
          alt={tool.name} 
          className="w-full h-full object-contain" 
          style={isWhiteIcon ? { filter: 'brightness(0) invert(1)' } : undefined}
        />
      </div>
    </button>
  );
}
