'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { FONT_SIZE } from '../../constants/typography';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline line growing down
      gsap.fromTo(lineRef.current, 
        { scaleY: 0, transformOrigin: 'top center' },
        { 
          scaleY: 1, 
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Animate the glowing dot moving down along the line
      gsap.fromTo(dotRef.current,
        { top: '0%' },
        {
          top: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Headline entrance
      gsap.fromTo('.exp-headline',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );

      // Animate rows fading in
      rowsRef.current.forEach((row) => {
        if (!row) return;
        
        gsap.fromTo(row,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const careerData = [
    {
      role: 'Visual Designer (Freelance)',
      company: 'Vilumiyam Salesforce',
      year: 'Dec 2024 – Oct 2025',
      desc: 'Designed social media creatives, maintained visual consistency across campaigns, and supported marketing design requirements.',
    },
    {
      role: 'UI/UX Designer & Frontend Intern',
      company: 'Aristostech India',
      year: 'Nov 2025 – Feb 2026',
      desc: 'Designed UI screens for web applications, built responsive frontend components, and collaborated on design & development tasks.',
    }
  ];

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-8 md:px-24 py-32 bg-black overflow-hidden"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* ── Atmospheric ambient glow (Matched from What I Do) ─────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-8%',
          top: '15%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: '5%',
          bottom: '5%',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(217,70,239,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Geometric Scatter Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[10%] top-[20%] w-8 h-8 rounded-full border border-white/20" />
        <div className="absolute right-[15%] top-[10%] w-4 h-4 rounded-full border border-cyan-400/30" />
        <div className="absolute left-[20%] bottom-[15%] w-6 h-6 rounded-full border border-[#a855f7]/30" />
        <div className="absolute right-[10%] bottom-[25%] w-12 h-12 rounded-full border border-white/10" />
        
        <div className="absolute left-[5%] top-[40%] w-16 h-[1px] bg-white/20 rotate-45" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.15)' }} />
        <div className="absolute right-[20%] top-[30%] w-24 h-[1px] bg-cyan-400/30 -rotate-12" style={{ boxShadow: '0 0 12px rgba(6,182,212,0.2)' }} />
        <div className="absolute left-[85%] bottom-[40%] w-12 h-[1px] bg-[#a855f7]/30 rotate-[30deg]" style={{ boxShadow: '0 0 12px rgba(168,85,247,0.2)' }} />
      </div>

      <div className="max-w-5xl w-full mx-auto relative z-10">
        {/* Centered Editorial Header */}
        <div className="exp-headline flex flex-col items-center mb-20 md:mb-28">
          <h2
            className="font-sans font-bold leading-none text-white flex flex-wrap justify-center items-baseline gap-3"
            style={{
              fontSize: 'clamp(2rem, 3.4vw, 3.35rem)',
              letterSpacing: '-0.025em',
            }}
          >
            My career &{' '}
            <span className="relative inline-block whitespace-pre text-white font-serif italic font-normal" style={{ fontFamily: "'Lora', serif", letterSpacing: 'normal' }}>
              <span className="absolute inset-0 top-[30%] -bottom-[10%] -left-2 -right-2 -z-10 -rotate-1 opacity-40 bg-cyan-400" style={{ filter: 'url(#brush-stroke)' }} />
              <span className="relative z-10">Experience</span>
            </span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Vertical Timeline Axis (Centered on desktop) */}
          <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] bg-white/5 hidden md:block">
            <div 
              ref={lineRef}
              className="w-full h-full bg-cyan-400/50 origin-top"
              style={{ boxShadow: '0 0 10px rgba(34,211,238,0.5)' }}
            />
            {/* Glowing cyan active dot that flows with the line */}
            <div 
              ref={dotRef}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-cyan-400 z-20" 
              style={{ boxShadow: '0 0 12px rgba(34,211,238,1), 0 0 24px rgba(34,211,238,0.6)' }}
            />
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-24 md:space-y-32">
            {careerData.map((item, idx) => (
              <div 
                key={idx}
                ref={(el) => { if (el) rowsRef.current[idx] = el; }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 relative"
              >
                {/* Left Side: Role, Company & Year */}
                <div className="flex flex-col items-start md:items-end text-left md:text-right pr-0 md:pr-8 lg:pr-12 pl-8 md:pl-0 w-full">
                  <span className="text-white/60 font-sans font-bold text-[12px] tracking-[0.1em] uppercase mb-2">
                    {item.year}
                  </span>
                  <h3 
                    className="font-sans font-bold text-white leading-[1.2] tracking-[-0.025em] mb-2 md:whitespace-nowrap"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}
                  >
                    {item.role}
                  </h3>
                  <span className="text-cyan-400 font-sans font-bold text-[12px] tracking-[0.1em] uppercase">
                    {item.company}
                  </span>
                </div>

                {/* Right Side: Description */}
                <div className="pl-8 md:pl-8 lg:pl-12 flex items-center">
                  <p 
                    className="font-sans text-white/90 leading-[1.7] w-full text-[1rem]"
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
