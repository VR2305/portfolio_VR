'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedinIn, FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%', // trigger when the top of the section is 80% down the screen
          toggleActions: 'play reverse play reverse',
        }
      });

      // 1. Reveal header
      tl.fromTo('.contact-header', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      // 2. Reveal Expanding Pill
      .fromTo('.contact-pill',
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        '-=0.6'
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative min-h-screen w-full grid place-items-center px-8 bg-[#030303] z-20 overflow-hidden"
    >
      {/* Geometric Scatter Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[15%] top-[25%] w-6 h-6 rounded-full border border-white/20" />
        <div className="absolute right-[20%] top-[15%] w-3 h-3 rounded-full border border-cyan-400/30" />
        <div className="absolute left-[25%] bottom-[20%] w-8 h-8 rounded-full border border-[#a855f7]/30" />
        <div className="absolute right-[15%] bottom-[30%] w-10 h-10 rounded-full border border-white/10" />
        
        <div className="absolute left-[10%] top-[45%] w-20 h-[1px] bg-white/20 rotate-45" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.15)' }} />
        <div className="absolute right-[25%] top-[35%] w-16 h-[1px] bg-cyan-400/30 -rotate-12" style={{ boxShadow: '0 0 12px rgba(6,182,212,0.2)' }} />
        <div className="absolute left-[80%] bottom-[45%] w-14 h-[1px] bg-[#a855f7]/30 rotate-[30deg]" style={{ boxShadow: '0 0 12px rgba(168,85,247,0.2)' }} />
      </div>
      <div className="max-w-5xl text-center w-full">
        <h2 className="contact-header text-center text-white text-6xl md:text-[8vw] font-bold tracking-tighter leading-[0.95] mb-8">
          Let’s build meaningful<br />
          <span className="font-serif italic font-normal text-white/70 tracking-normal" style={{ fontFamily: "'Lora', serif" }}>experiences.</span>
        </h2>

        <div className="flex justify-center mt-16 w-full">
          {/* The Expanding Pill */}
          <div className="contact-pill group relative inline-flex items-center justify-center h-20 rounded-full border border-white/10 hover:border-cyan-500/50 bg-[#0a0a0a] transition-all duration-500 overflow-hidden px-10 hover:px-6 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            
            {/* Pill Text */}
            <span className="text-white text-2xl font-medium tracking-tight whitespace-nowrap transition-all duration-500 group-hover:text-cyan-400 group-hover:pr-6 group-hover:border-r group-hover:border-white/10">
              Connect With Me
            </span>
            
            {/* Hidden Social Icons (Revealed on hover) */}
            <div className="flex items-center gap-4 max-w-0 opacity-0 group-hover:max-w-[400px] group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden ml-0 group-hover:ml-6 h-full">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
                <FaWhatsapp size={22} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
                <FaInstagram size={22} />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vickyravi4231@gmail.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
                <FaEnvelope size={20} />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
