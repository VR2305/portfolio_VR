'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export interface ProjectDetail {
  id?: string;
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

interface ProjectModalProps {
  project: ProjectDetail;
  onClose: () => void;
}

const renderIcon = (type: string, color: string) => {
  switch (type) {
    case 'chart':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'heart':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case 'wallet':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      );
    default:
      return null;
  }
};

export const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'design-system', label: 'Design System' },
  { id: 'design-thinking', label: 'Design Thinking' },
  { id: 'ux-thinking', label: 'UX Thinking' },
  { id: 'conclusion', label: 'Conclusion' },
];

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.97, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power4.out' }
    );
  }, []);

  useEffect(() => {
    // Scroll spy logic to update active section on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-20% 0px -40% 0px', // Triggers when section is near the top
        threshold: 0.1
      }
    );

    // Observe all sections
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed inset-2 md:inset-6 z-[99999] flex items-center justify-center pointer-events-none">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-[-50px] bg-black/90 backdrop-blur-md cursor-pointer pointer-events-auto" 
        onClick={onClose} 
      />

      {/* Main Modal Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full max-w-[1600px] bg-[#050505] rounded-[24px] md:rounded-[32px] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl pointer-events-auto"
      >
        
        {/* SIDEBAR (Sticky on Desktop) */}
        <div className="hidden md:flex flex-col w-[280px] h-full border-r border-white/5 bg-[#030303] p-8 shrink-0 relative z-50">
          
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium mb-12"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to work
          </button>

          {/* Project Branding */}
          <div className="mb-12">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${project.categoryColor}15`, border: `1px solid ${project.categoryColor}30` }}
            >
              {renderIcon(project.iconType, project.categoryColor)}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: project.categoryColor }}>
              Case Study
            </p>
            <h2 className="text-2xl font-bold text-white mb-1">{project.title}</h2>
            <p className="text-sm text-white/40">{project.category}</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-4 flex-1">
            {sections.map(s => (
              <button 
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center gap-3 text-sm font-medium transition-colors text-left ${activeSection === s.id ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                {/* Minimal icon/indicator */}
                <div className="w-4 h-4 flex items-center justify-center">
                  {activeSection === s.id ? (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.categoryColor }} />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  )}
                </div>
                {s.label}
              </button>
            ))}
          </nav>

          {/* Action */}
          <a 
            href={project.vercel}
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold mt-auto transition-colors hover:brightness-110"
            style={{ border: `1px solid ${project.categoryColor}30`, color: project.categoryColor, backgroundColor: `${project.categoryColor}05` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            View Live Project
          </a>

        </div>

        {/* MOBILE CLOSE */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center border border-white/10 transition-colors z-[100] text-white/70"
        >
          ✕
        </button>

        {/* MAIN SCROLLABLE CONTENT */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 h-full overflow-y-auto scroll-smooth relative" 
          data-lenis-prevent="true"
        >
          
          {/* 1. HERO BANNER */}
          <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px] flex items-center overflow-hidden bg-[#030303] border-b border-white/5">
            {/* Atmospheric Backgrounds */}
            <div 
              className="absolute top-0 right-0 w-[80%] h-full opacity-30 z-0"
              style={{
                background: `radial-gradient(circle at 70% 40%, ${project.categoryColor}40 0%, transparent 60%)`
              }}
            />
            <div 
              className="absolute bottom-0 left-0 w-[50%] h-[50%] opacity-20 z-0"
              style={{
                background: `radial-gradient(circle at 30% 80%, ${project.categoryColor}30 0%, transparent 70%)`
              }}
            />
            
            {/* Massive Typography in Background */}
            <h1 
              className="absolute top-[10%] left-[5%] md:left-[8%] text-[15vw] md:text-[8vw] font-extrabold leading-[0.8] tracking-tighter opacity-[0.95] z-10 break-words w-[90%] md:w-[60%]" 
              style={{ color: project.categoryColor }}
            >
              {project.title}.
            </h1>

            {/* Sub-typography / Metadata */}
            <div className="absolute bottom-12 left-[5%] md:left-[8%] z-20 w-[90%] md:w-[50%]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style={{ backgroundColor: `${project.categoryColor}15`, border: `1px solid ${project.categoryColor}30` }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">{project.category}</span>
              </div>
              <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium mb-8 max-w-md">
                {project.caseStudy}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-xs text-white/50 font-medium tracking-wide">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {project.tags[0]}
                </div>
                {project.tags[1] && (
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    {project.tags[1]}
                  </div>
                )}
                {project.tags[2] && (
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
                    {project.tags[2]}
                  </div>
                )}
              </div>
            </div>

            {/* Floating Device Image */}
            <div className="absolute right-[-10%] md:right-[5%] bottom-[-10%] md:bottom-[-5%] w-[90%] md:w-[55%] h-[90%] md:h-[80%] z-10 overflow-visible">
              <Image 
                src={project.image}
                alt={`${project.title} Mockup`}
                fill
                className="object-contain object-right-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 h-32 bottom-0 top-auto" />
          </div>

          {/* 2. EDITORIAL CONTENT */}
          <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-[1200px] mx-auto flex flex-col gap-24 md:gap-32">
            
            {/* OVERVIEW SECTION */}
            <section id="overview" className="flex flex-col xl:flex-row gap-12 xl:gap-24 scroll-mt-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.categoryColor }} />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: project.categoryColor }}>01. Overview</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                  A unified workspace for modern teams.
                </h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base mb-6 max-w-xl">
                  {project.title} helps organizations manage clients, projects, tasks, and communication in one place. It brings clarity to operations and empowers teams to move faster with confidence.
                </p>
                <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-xl">
                  The primary objective was to replace fragmented toolchains with a cohesive, beautiful, and highly performant interface that users actually enjoy logging into every day.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                {[
                  { value: '40%', label: 'Reduction in manual reporting', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                  { value: '2.8x', label: 'Faster client onboarding', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { value: '90%', label: 'Users found the dashboard easy to use', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                  { value: '4.9/5', label: 'Average user satisfaction', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#09090b] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={project.categoryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                      <path d={stat.icon} />
                    </svg>
                    <div>
                      <h4 className="text-3xl font-bold text-white mb-2 tracking-tight" style={{ color: project.categoryColor }}>{stat.value}</h4>
                      <p className="text-[11px] text-[#a1a1aa] leading-relaxed font-medium">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* THE PROBLEM SECTION */}
            <section id="problem" className="flex flex-col xl:flex-row gap-12 xl:gap-24 scroll-mt-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.categoryColor }} />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: project.categoryColor }}>02. Problem</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                  Scattered tools. Slow workflows.
                </h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base mb-6 max-w-xl">
                  Before {project.title}, teams were using multiple disconnected tools for communication, task management, client updates, and reporting. This led to data silos, duplicated work, and dropped information.
                </p>
                <div className="space-y-4 max-w-xl mt-8">
                  {[
                    "Data fragmentation across multiple platforms.",
                    "High cognitive load from context switching.",
                    "Lack of real-time visibility into project health.",
                    "Complicated onboarding for new team members."
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="mt-1 w-4 h-4 rounded-md bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                      </div>
                      <p className="text-sm text-white/70 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 rounded-[32px] overflow-hidden border border-white/10 bg-[#09090b] relative min-h-[300px] xl:min-h-[400px]">
                {/* Placeholder for wireframe/sketches image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10 gap-4">
                   <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                   </div>
                   <p className="text-xs uppercase tracking-widest font-bold">Process Wireframes</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] to-transparent opacity-80" />
              </div>
            </section>
            
            {/* MORE SECTIONS PLACEHOLDERS */}
            {sections.slice(2).map((s, idx) => (
               <section key={s.id} id={s.id} className="flex flex-col gap-8 scroll-mt-12 py-12">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.categoryColor }} />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: project.categoryColor }}>0{idx + 3}. {s.label}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight max-w-2xl">
                    Detailed breakdown of {s.label.toLowerCase()} process and execution.
                  </h3>
                  <div className="w-full aspect-[21/9] rounded-[32px] border border-white/5 bg-[#09090b] flex items-center justify-center text-white/10 relative overflow-hidden mt-4">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] to-transparent opacity-50 z-10" />
                    <p className="text-xs uppercase tracking-widest font-bold z-20">Content Area</p>
                  </div>
               </section>
            ))}

            <div className="w-full h-[1px] bg-white/5 my-12" />
            
            <div className="text-center pb-24">
              <h3 className="text-2xl font-bold text-white mb-6">Ready to see it in action?</h3>
              <a 
                href={project.vercel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-transform hover:scale-105"
                style={{ backgroundColor: project.categoryColor, color: '#000' }}
              >
                Visit Live Platform
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
