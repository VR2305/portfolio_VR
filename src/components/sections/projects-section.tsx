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
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-20 bg-black overflow-hidden ${activeProject ? 'z-[999]' : 'z-10'}`} style={{ gap: SPACING.lg }}
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
        {/* Section Header */}
        <div ref={titleRef} className="flex flex-col items-center mb-12 md:mb-16">
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
              <span className="relative z-10">Work</span>
            </span>
          </h2>
        </div>

        {/* 3-Column Work Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative z-20 items-stretch auto-rows-fr"
          style={{ gap: SPACING.lg }}
        >
          {Object.keys(projectDetails).map((id) => {
              const data = projectDetails[id];
              if (!data) return null;
              return (
                <div key={id} className="h-[450px]">
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
              );
          })}
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
