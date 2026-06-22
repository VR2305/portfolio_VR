import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  label: string;
  className?: string;
}

export const Section = ({ id, label, className }: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative h-screen w-full flex items-center justify-center border-t border-white/[0.02]",
        className
      )}
    >
      <div className="z-10 text-center">
        <h2 className="text-white/10 text-[10px] font-mono tracking-[0.8em] uppercase select-none">
          {label}
        </h2>
        <div className="mt-4 text-white/5 font-mono text-[8px] tracking-widest uppercase">
          Cinematic Anchor Point
        </div>
      </div>
    </section>
  );
};
