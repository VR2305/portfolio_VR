'use client';

import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-12 py-12 md:px-24">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Left side: Logo */}
        <Link 
          href="/" 
          className="text-white font-sans font-bold text-xl tracking-tight"
        >
          VR
        </Link>

        {/* Right side: Links */}
        <div className="flex items-center gap-12 md:gap-20">
          {['About', 'Work', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-white font-sans text-sm font-medium tracking-widest uppercase hover:text-cyan-400 transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
