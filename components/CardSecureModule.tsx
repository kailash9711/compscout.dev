"use client";

import React from "react";
import { Lock } from "lucide-react";

export interface CardSecureModuleProps {
  title?: string;
  subtitle?: string;
  barCount?: number;
  className?: string;
}

/**
 * @prop {string} title - Encryption security header headline (Default: 'End-to-End Secure')
 * @prop {string} subtitle - Protocol cryptographic description (Default: 'Encrypted via AES-256')
 * @prop {number} barCount - Count of reactive frequency equalizer bars (Default: 12)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function CardSecureModule({
  title = "End-to-End Secure",
  subtitle = "Encrypted via AES-256",
  barCount = 12,
  className = ""
}: CardSecureModuleProps = {}) {
  return (
    <div 
      className={`group relative flex h-60 w-full max-w-[310px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-xl transition-all duration-500 hover:border-neutral-700 hover:shadow-2xl hover:shadow-emerald-500/10 active:scale-96 font-sans ${className}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes lock-jiggle {
          0%, 100% { transform: rotate(0) scale(1) translateY(0); }
          14% { transform: rotate(-8deg) scale(1) translateY(0); }
          28% { transform: rotate(8deg) scale(1) translateY(0); }
          42% { transform: rotate(-8deg) scale(1) translateY(0); }
          56% { transform: rotate(8deg) scale(1) translateY(0); }
          70% { transform: rotate(0) scale(1) translateY(0); }
        }
        .animate-lock-jiggle {
          animation: lock-jiggle 3.5s infinite;
        }
        .group:hover .animate-lock-jiggle {
          animation: none;
          transform: scale(1.15) translateY(-4px);
        }
        
        @keyframes eq-idle {
          0%, 100% { opacity: 0.15; height: 100%; }
          50% { opacity: 0.4; height: 100%; }
        }
        @keyframes eq-hover {
          0%, 100% { opacity: 0.4; height: 30%; }
          50% { opacity: 1; height: 180%; }
        }
        .eq-bar {
          animation: eq-idle 2s infinite;
          animation-delay: var(--delay-idle);
          background-color: #059669;
        }
        .group:hover .eq-bar {
          animation: eq-hover 0.5s infinite;
          animation-delay: var(--delay-hover);
          background-color: #10b981;
        }
      `}} />

      {/* Matrix Glow */}
      <div 
        className="pointer-events-none absolute -bottom-10 -right-10 z-0 h-40 w-40 rounded-full bg-emerald-500 blur-[70px] transition-all duration-1000 ease-out opacity-10 scale-100 group-hover:opacity-50 group-hover:scale-150"
      />

      <div className="relative z-10">
        <div 
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)] transition-all duration-500 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 animate-lock-jiggle"
        >
          <Lock className="h-6 w-6 stroke-[2]" />
        </div>
      </div>
      
      {/* Title Details */}
      <div className="relative z-10 mb-5 mt-auto">
        <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          {title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-emerald-400/80 transition-colors duration-500 group-hover:text-emerald-300">
          {subtitle}
        </p>
      </div>

      {/* High-speed Data Transfer Visualizer */}
      <div className="relative z-10 flex h-2.5 gap-1.5 items-end">
        {[...Array(barCount)].map((_, i) => (
          <div 
            key={i} 
            style={{ 
              '--delay-idle': `${i * 0.15}s`, 
              '--delay-hover': `${i * 0.05}s` 
            } as React.CSSProperties}
            className="flex-1 rounded-full origin-bottom eq-bar transition-all duration-300" 
          />
        ))}
      </div>
    </div>
  );
}
