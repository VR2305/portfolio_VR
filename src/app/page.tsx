import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { WhatIDoSection } from "@/components/sections/what-i-do-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { GlobalSparkles } from "@/components/layout/global-sparkles";

export default function Home() {
  return (
    <div className="flex flex-col w-full selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Glow & Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] opacity-[0.15]" style={{ background: 'radial-gradient(circle at center, #06b6d4 0%, transparent 60%)' }} />
        <div className="absolute bottom-[-20%] right-[-25%] w-[900px] h-[900px] opacity-[0.15]" style={{ background: 'radial-gradient(circle at center, #d946ef 0%, transparent 60%)' }} />
        
        {/* Global Twinkling Sparkles */}
        <GlobalSparkles />
      </div>

      <Navbar />
      
      <main className="relative z-20 w-full">
        {/* 
          Each section is a cinematic anchor.
          The Canvas engine (RootLayout) scrubs frames based on these triggers.
        */}
        <HeroSection />
        <AboutSection />
        <WhatIDoSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>


    </div>
  );
}
