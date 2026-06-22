'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = ['About', 'Work', 'Contact'];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[110] px-6 py-6 md:px-12 md:py-12 lg:px-24 pointer-events-none">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left side: Logo */}
          <Link 
            href="/" 
            className="text-white font-sans font-bold text-xl tracking-tight z-[110]"
            onClick={() => setIsMenuOpen(false)}
          >
            VR
          </Link>

          {/* Right side: Desktop Links */}
          <div className="hidden md:flex items-center gap-12 lg:gap-20">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-white font-sans text-sm font-medium tracking-widest uppercase hover:text-cyan-400 transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:flex hidden lg:hidden text-white p-2 z-[110] relative flex-col justify-center items-center gap-[6px] w-10 h-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
          
          <button 
            className="flex md:hidden text-white p-2 z-[110] relative flex-col justify-center items-center gap-[6px] w-10 h-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[105] bg-black/80 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((item, i) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-white font-sans font-bold uppercase tracking-widest text-4xl hover:text-cyan-400 transition-colors duration-300"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${0.1 + (i * 0.1)}s`
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
