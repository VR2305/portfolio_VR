'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FONT_FAMILY } from '@/constants/typography';

gsap.registerPlugin(ScrollTrigger);

interface StoryStep {
  step: string;
  paragraphs: string[];
  highlights: string[];
  color: 'cyan' | 'purple';
  icon: React.ReactNode;
}

const stories: StoryStep[] = [
  {
    step: 'THE BEGINNING',
    paragraphs: [
      "I started with design.",
      "Created posters, layouts, and visuals that taught me how to communicate ideas clearly."
    ],
    highlights: ['design'],
    color: 'cyan',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>
  },
  {
    step: 'THE SHIFT',
    paragraphs: [
      "Curiosity led me to UI/UX.",
      "I became fascinated by crafting digital experiences that are both useful and intuitive."
    ],
    highlights: ['ui/ux'],
    color: 'purple',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  },
  {
    step: 'NOW',
    paragraphs: [
      "I design and build products.",
      "Combining design and development to create interfaces that are clear, scalable, and impactful."
    ],
    highlights: ['products'],
    color: 'purple',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
  },
  {
    step: 'THE GOAL',
    paragraphs: [
      "I focus on simplicity.",
      "Reducing complexity and designing experiences that feel natural and effortless to use."
    ],
    highlights: ['simplicity'],
    color: 'cyan',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
  },
];

const flowPositions = [
  'lg:col-start-1 lg:row-start-1', // 0. THE BEGINNING (Top-Left)
  'lg:col-start-2 lg:row-start-1', // 1. THE SHIFT (Top-Right)
  'lg:col-start-2 lg:row-start-2', // 2. NOW (Bottom-Right)
  'lg:col-start-1 lg:row-start-2', // 3. THE GOAL (Bottom-Left)
];

const isHighlight = (word: string, highlights: string[]): boolean => {
  const clean = word.replace(/[.,!?;:]/g, '').toLowerCase();
  return highlights.map(h => h.replace(/[.,!?;:]/g, '').toLowerCase()).includes(clean);
};

export const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-0 md:min-h-screen w-full overflow-hidden px-6 py-12 md:py-20 md:px-16 lg:px-24 xl:px-32"
    >
      <div className="relative z-10 flex min-h-[calc(100vh-10rem)] items-center">
        <div className="hidden lg:block lg:w-[45%] xl:w-[48%]" aria-hidden="true" />

        <div className="w-full lg:ml-auto lg:w-[55%] xl:w-[52%] lg:pl-10 xl:pl-16">
          <div className="about-reveal mb-10 flex justify-center lg:justify-start">
            <div className="flex items-baseline gap-3">
              <h2
                className="font-sans font-bold leading-none text-white flex items-baseline gap-3"
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 3.35rem)',
                  letterSpacing: '-0.025em',
                  fontFamily: FONT_FAMILY.primary
                }}
              >
                My{' '}
                <span className="relative inline-block whitespace-pre text-white font-serif italic font-normal" style={{ fontFamily: "'Lora', serif", letterSpacing: 'normal' }}>
                  <span className="absolute inset-0 top-[30%] -bottom-[10%] -left-2 -right-2 -z-10 -rotate-1 opacity-40 bg-cyan-400" style={{ filter: 'url(#brush-stroke)' }} />
                  <span className="relative z-10">Story</span>
                </span>
              </h2>
            </div>
          </div>

          <div className="relative">
            {/* The grid layout uses gap-12 to leave precisely 48px between columns. We span that with a 48px wide dashed line */}
            <div className="relative grid gap-x-12 gap-y-12 lg:grid-cols-2 lg:grid-rows-2 max-w-[560px]">
              
              {stories.map((story, index) => (
                <article
                  key={story.step}
                  className={`about-reveal group relative border border-white/5 bg-[#030303] px-5 py-5 transition-colors duration-300 hover:border-white/10 hover:bg-[#080808] ${flowPositions[index]} flex flex-col justify-start rounded-2xl`}
                >
                  
                  {/* Drawing connecting lines directly bound to each box */}
                  
                  {/* Mobile Vertical Connection Line (Only visible below lg) */}
                  {index < stories.length - 1 && (
                    <>
                      <div className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-white/20 -translate-x-1/2 z-10 lg:hidden" />
                      <div className="absolute -bottom-[48px] left-1/2 h-[48px] w-[1px] border-l border-dashed border-white/20 lg:hidden -translate-x-1/2" />
                      <div className="absolute -bottom-[32px] left-1/2 -translate-x-1/2 z-10 text-white/40 lg:hidden bg-[#030303] rounded-full">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </>
                  )}

                  {/* From Top-Left to Top-Right (Horizontal right) */}
                  {index === 0 && (
                    <>
                      <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-white/20 -translate-y-1/2 z-10" />
                      <div className="absolute top-1/2 -right-[48px] w-[48px] h-[1px] border-t border-dashed border-white/20 hidden lg:block -translate-y-1/2" />
                    </>
                  )}
                  
                  {/* From Top-Right to Bottom-Right (Vertical down) */}
                  {index === 1 && (
                    <>
                      <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-10 text-white/40 hidden lg:block">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-white/20 -translate-x-1/2 z-10" />
                      <div className="absolute -bottom-[48px] left-1/2 h-[48px] w-[1px] border-l border-dashed border-white/20 hidden lg:block -translate-x-1/2" />
                    </>
                  )}

                  {/* From Bottom-Right to Bottom-Left (Horizontal left) */}
                  {index === 2 && (
                    <>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 text-white/40 hidden lg:block">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                      <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-white/20 -translate-y-1/2 z-10" />
                      <div className="absolute top-1/2 -left-[48px] w-[48px] h-[1px] border-t border-dashed border-white/20 hidden lg:block -translate-y-1/2" />
                    </>
                  )}

                  {/* Destination dot on Bottom-Left */}
                  {index === 3 && (
                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-10 text-white/40 hidden lg:block">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </div>
                  )}



                  {/* Step Label */}
                  <div 
                    className="mb-2 font-sans text-[16px] md:text-[18px] font-black uppercase tracking-wide"
                    style={{ color: story.color === 'cyan' ? '#06b6d4' : '#a855f7' }}
                  >
                    {story.step}
                  </div>

                  {/* Text Paragraphs */}
                  <div
                    className="font-sans font-medium leading-relaxed text-[12px] md:text-[13px] text-white/80"
                    style={{ fontFamily: FONT_FAMILY.primary }}
                  >
                    {story.paragraphs.map((p, pIndex) => (
                      <p key={pIndex} className="mb-2 last:mb-0">
                        {p.split(' ').map((word, wordIndex, words) => {
                          const highlighted = isHighlight(word, story.highlights);
                          const match = word.match(/^([a-zA-Z0-9\/-]+)(.*)$/);
                          const textPart = match ? match[1] : word;
                          const punctPart = match ? match[2] : '';

                          return (
                            <React.Fragment key={`${word}-${wordIndex}`}>
                              {highlighted ? (
                                <>
                                  <span className="relative inline-block whitespace-pre">
                                    <span 
                                      className={`absolute inset-0 top-[30%] -bottom-[10%] -left-2 -right-2 -z-10 -rotate-1 opacity-40 ${
                                        story.color === 'cyan' ? 'bg-cyan-400' : 'bg-[#a855f7]'
                                      }`} 
                                      style={{ filter: 'url(#brush-stroke)' }}
                                    />
                                    <span className="relative z-10 text-white">{textPart}</span>
                                  </span>
                                  {punctPart && <span className="text-white/90">{punctPart}</span>}
                                </>
                              ) : (
                                <span className="text-white/90">{word}</span>
                              )}
                              {wordIndex < words.length - 1 ? ' ' : ''}
                            </React.Fragment>
                          );
                        })}
                      </p>
                    ))}
                  </div>

                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
