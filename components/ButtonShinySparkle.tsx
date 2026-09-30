"use client";
    
import { Sparkles } from "lucide-react";


export interface ButtonShinySparkleProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * @prop {string} label - Button title text (Default: 'Get Started')
 * @prop {function} onClick - Optional click callback handler (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function ButtonShinySparkle({
  label = "Get Started",
  onClick,
  className = ""
}: ButtonShinySparkleProps = {}) {
  return (
    <div className={`flex items-center justify-center p-6 font-sans ${className}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sparkle-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-10deg); }
        }
        .animate-sparkle-wiggle {
          animation: sparkle-wiggle 2.5s ease-in-out infinite;
        }
      `}} />
      <button 
        onClick={onClick}
        className="group relative overflow-hidden rounded-2xl bg-neutral-950 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-white/10 transition-all duration-300 hover:bg-neutral-900/40 hover:ring-white/20 hover:shadow-[0_4px_30px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer select-none outline-none active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-2.5">
          <span className="animate-sparkle-wiggle block">
            <Sparkles className="h-4 w-4 text-zinc-300" />
          </span>
          {label}
        </span>
        <span
          className="absolute inset-0 z-0 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none transition-transform duration-700 ease-out -translate-x-full skew-x-[15deg] group-hover:translate-x-[150%]"
        />
      </button>
    </div>
  );
}
