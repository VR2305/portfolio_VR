// src/components/sections/ProjectCard.tsx
'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '@/constants/motion';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  themeColor: string;
  categoryColor: string;
  iconType: 'chart' | 'heart' | 'wallet';
  image: string;
  onSelect: (id: string) => void;
  prefersReduced: boolean;
}

const renderIcon = (type: string, color: string) => {
  const baseClasses = "w-5 h-5";
  switch (type) {
    case 'chart':
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="18" y="3" width="4" height="18" rx="1" />
          <rect x="10" y="8" width="4" height="13" rx="1" />
          <rect x="2" y="13" width="4" height="8" rx="1" />
        </svg>
      );
    case 'heart':
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5v14" />
          <path d="M9 12h6" />
        </svg>
      );
    case 'wallet':
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      );
    default:
      return null;
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  category,
  title,
  description,
  tags,
  themeColor,
  categoryColor,
  iconType,
  image,
  onSelect,
  prefersReduced,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: MOTION.duration,
        ease: MOTION.easing,
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(id); }}
      tabIndex={0}
      role="button"
      aria-label={`Open project ${title}`}
      className="group relative overflow-hidden flex flex-col justify-between h-[400px] xl:h-[420px] w-full rounded-2xl bg-[#09090b] cursor-pointer transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 border border-white/[0.03] hover:border-white/10"
    >
      {/* Background radial gradient corresponding to theme */}
      <div 
        className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[90px] opacity-[0.08] pointer-events-none transition-opacity duration-500 group-hover:opacity-20 z-0"
        style={{ backgroundColor: categoryColor }}
      />
      
      {/* Dynamic Hover Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          boxShadow: `inset 0 0 40px ${themeColor}`,
        }}
      />

      {/* Right Image (Z-10) */}
      <div className="absolute top-0 right-0 w-[50%] h-full overflow-hidden z-10 pointer-events-none">
        {/* Soft edge blend for image to disappear into the left background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent z-20 w-[60%]" />
        <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-20" />
        <div className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-[#09090b] via-transparent to-transparent z-20" />
        
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover object-left transition-transform duration-700 ease-out opacity-[0.85] ${!prefersReduced ? 'group-hover:scale-105' : ''}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content Side (Left) */}
      <div className="relative z-30 flex flex-col justify-between h-full p-6 lg:p-8 w-[60%] pointer-events-none">
        
        {/* Top Section */}
        <div>
          {/* Icon Box */}
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-xl mb-5 backdrop-blur-md"
            style={{ backgroundColor: `${categoryColor}10`, border: `1px solid ${categoryColor}20` }}
          >
            {renderIcon(iconType, categoryColor)}
          </div>
          
          <h4 
            className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5"
            style={{ color: categoryColor }}
          >
            {category}
          </h4>
          
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 tracking-tight">
            {title}
          </h3>
          
          <p className="text-[12px] text-[#a1a1aa] leading-relaxed line-clamp-4 pr-4">
            {description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pointer-events-auto">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-[#71717a] mb-5 font-medium">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {tags.map((tag, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="opacity-50">-</span>}
                <span className="whitespace-nowrap">{tag}</span>
              </React.Fragment>
            ))}
          </div>

          {/* Action Link */}
          <div 
            className="flex items-center gap-1.5 text-[12px] font-bold group/link cursor-pointer w-fit"
            style={{ color: categoryColor }}
          >
            View Case Study 
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transform group-hover/link:translate-x-1 transition-transform"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

