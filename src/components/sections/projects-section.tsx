'use client';

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from '@/components/layout/smooth-scroll';
import gsap from 'gsap';
import { MOTION } from '@/constants/motion';
import { SPACING } from '@/constants/spacing';
import { FONT_SIZE } from '@/constants/typography';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ProjectCard } from '@/components/features/projects/project-card';
import { ProjectModal } from '@/components/features/projects/project-modal';
gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null); // grid container
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const lenis = useLenis();
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // mounted is always true for client rendering; initialized in state

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeProject) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeProject, lenis]);

  interface ProjectDetail {
  category: string;
  title: string;
  caseStudy: string;
  tags: string[];
  themeColor: string;
  categoryColor: string;
  iconType: 'chart' | 'heart' | 'wallet';
  github: string;
  vercel: string;
  image: string;
}

const projectDetails: Record<string, ProjectDetail> = {
    'telecrm': {
      category: 'CRM PLATFORM',
      title: 'TELECRM',
      caseStudy: 'Operational workflow system designed to simplify team coordination and reporting.',
      tags: ['2025', 'Next.js', 'Dashboard UX'],
      themeColor: 'rgba(6,182,212,0.2)', // cyan border glow
      categoryColor: '#06b6d4', // cyan-500
      iconType: 'chart',
      github: '#',
      vercel: '#',
      image: '/crm_3d_mockup.png'
    },
    'freshcart': {
      category: 'E-COMMERCE',
      title: 'FRESHCART',
      caseStudy: 'Modern grocery delivery platform designed for fast checkout and high conversion.',
      tags: ['2025', 'React', 'E-commerce UX'],
      themeColor: 'rgba(34,197,94,0.2)', // green border glow
      categoryColor: '#22c55e', // green-500
      iconType: 'heart',
      github: '#',
      vercel: '#',
      image: '/healthcare_3d_mockup.png'
    },
    'xpensetracker': {
      category: 'PERSONAL FINANCE',
      title: 'XPENSE TRACKER',
      caseStudy: 'Expense tracking experience focused on clarity, motion, and spending insights.',
      tags: ['2025', 'Framer Motion', 'Mobile UX'],
      themeColor: 'rgba(168,85,247,0.2)', // purple border glow
      categoryColor: '#a855f7', // purple-500
      iconType: 'wallet',
      github: '#',
      vercel: '#',
      image: '/finance_3d_mockup.png'
    }
  };

  useLayoutEffect(() => { const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches; if (prefersReduced) return;
    const ctx = gsap.context(() => {
      // Title entrance
      if (!prefersReduced) {
        gsap.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: MOTION.duration,
            ease: MOTION.easing,
          }
        );
      }

      // Grid items entrance
      const columns = gridRef.current?.children;
      if (columns) {
        if (!prefersReduced) {
          gsap.fromTo(Array.from(columns),
            { y: 30, opacity: 0 },
            {
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%',
              },
              y: 0,
              opacity: 1,
              duration: MOTION.duration,
              stagger: MOTION.stagger,
              ease: MOTION.easing,
            }
          );
        }

        // 3D Depth Stack Effect for Mobile Cards
        const isMobile = window.innerWidth < 640;
        if (isMobile && columns.length > 0) {
          const cards = Array.from(columns);
          cards.forEach((card, i) => {
            if (i === cards.length - 1) return; // Last card stays fully scaled
            
            const targetDiv = card.querySelector('.gsap-3d-target');
            if (!targetDiv) return;
            
            const remainingCards = cards.length - 1 - i;
            
            gsap.to(targetDiv, {
              scale: 1 - (0.05 * remainingCards), // shrinks 5% for each card that stacks on top
              opacity: 1 - (0.3 * remainingCards), // fades slightly as it gets buried
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: card,
                start: `top ${160 + i * 15}px`, // starts exactly when the card sticks
                end: `+=${450 * remainingCards}`, // scrubs dynamically over the remaining cards
                scrub: true,
              }
            });
          });
        }
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className={`relative min-h-0 md:min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 md:py-20 bg-black overflow-clip ${activeProject ? 'z-[999]' : 'z-10'}`} style={{ gap: SPACING.lg }}
    >


      {/* ── Atmospheric ambient glow ─────────────────────────────── */}
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
          right: '-5%',
          bottom: '5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(217,70,239,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1500px] w-full mx-auto relative z-10">
        {/* Section Header Wrapper - Constrains the sticky effect */}
        <div className="absolute top-0 bottom-[450px] md:bottom-0 left-0 right-0 pointer-events-none z-50">
          <div ref={titleRef} className="flex flex-col items-center mb-12 md:mb-16 sticky top-[80px] pt-4 pb-4 bg-[#000000cc] backdrop-blur-xl sm:static sm:bg-transparent sm:backdrop-blur-none sm:pt-0 sm:pb-0 w-[120%] -ml-[10%] sm:w-full sm:ml-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:shadow-none pointer-events-auto">
            <h2
              className="font-sans font-bold leading-none text-white flex flex-wrap justify-center items-baseline gap-3"
              style={{
                fontSize: 'clamp(2rem, 3.4vw, 3.35rem)',
                letterSpacing: '-0.025em',
              }}
            >
              My{' '}
              <span className="relative inline-block whitespace-pre text-white font-serif italic font-normal" style={{ fontFamily: "'Lora', serif", letterSpacing: 'normal' }}>
                <span className="absolute inset-0 top-[30%] -bottom-[10%] -left-2 -right-2 -z-10 -rotate-1 opacity-40 bg-cyan-400" style={{ filter: 'url(#brush-stroke)' }} />
                <span className="relative z-10">Works</span>
              </span>
            </h2>
          </div>
        </div>
        
        {/* Spacer for absolute header */}
        <div className="h-[100px] mb-12 md:mb-16 w-full" aria-hidden="true" />

        {/* 3-Column Work Grid (Flex on mobile for sticky stacking) */}
        <div 
          ref={gridRef}
          className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 relative z-20 items-stretch sm:auto-rows-fr"
          style={{ gap: SPACING.lg }}
        >
          {Object.keys(projectDetails).map((id, index) => {
              const data = projectDetails[id];
              if (!data) return null;
              return (
                <div 
                  key={id}
                  className="h-[450px] sticky sm:static"
                  style={{ top: `calc(160px + ${index * 15}px)`, zIndex: index + 1 }}
                >
                  <div className="w-full h-full gsap-3d-target">
                    <ProjectCard 
                      id={id}
                      category={data.category}
                      title={data.title}
                      description={data.caseStudy}
                      tags={data.tags}
                      themeColor={data.themeColor}
                      categoryColor={data.categoryColor}
                      iconType={data.iconType}
                      image={data.image}
                      onSelect={setActiveProject}
                      prefersReduced={prefersReduced}
                    />
                  </div>
                </div>
              );
          })}
          
          {/* Spacer element to allow the final card to stick and remain on screen */}
          <div className="h-[20vh] sm:hidden shrink-0" aria-hidden="true" />
        </div>


      </div>

      {/* Project Modal Overlay rendered via Portal */}
      {activeProject && typeof document !== 'undefined' && projectDetails[activeProject] && createPortal(
        <ProjectModal 
          project={{...projectDetails[activeProject], id: activeProject}} 
          onClose={() => setActiveProject(null)} 
        />,
        document.body
      )}
    </section>
  );
};
