"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";

export default function ChallengeDownloadCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glareBackground = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.8), transparent 40%)`;

  return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-full min-h-[500px] bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden col-span-1 md:col-span-2 font-sans"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Sunlight Rays - Rotating Conic Gradient on Main Card */}
        <motion.div
          className="absolute inset-[-50%] z-0 pointer-events-none mix-blend-overlay"
          animate={{
            opacity: isHovered ? 0.15 : 0,
            rotate: isHovered ? 10 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            background: `repeating-conic-gradient(
              from 0deg at 50% 10%,
              transparent 0deg,
              rgba(0, 0, 0, 0.4) 5deg,
              transparent 15deg
            )`,
            transformOrigin: "center top",
          }}
        />

        {/* Mouse tracking glare for "shine" */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
          style={{ background: glareBackground }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-20">
          <h2 className="text-[28px] sm:text-[38px] md:text-[46px] leading-[1.05] tracking-[-0.03em] font-medium text-[#111111] mb-4 sm:mb-5 max-w-[420px]">
            Change your life with challenges
          </h2>
          <p className="text-[#888888] text-[16px] md:text-[17px] leading-relaxed max-w-[480px] mb-12 font-medium">
            75 Hard is a transformative program designed to build mental toughness and improve health.
          </p>

          {/* Interactive Sub-Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            <AppCard 
              icon={<AppleIcon />} 
              title="Open" 
              subtitle="App Store" 
              hoverGradient="from-[#007aff] to-[#5856d6]"
            />
            <AppCard 
              icon={<PlayIcon />} 
              title="Open" 
              subtitle="Google Play" 
              hoverGradient="from-[#34a853] via-[#fbbc05] to-[#ea4335]"
            />
            <AppCard 
              icon={<ScanIcon />} 
              title="Scan" 
              subtitle="to download" 
              hoverGradient="from-[#434343] to-[#000000]"
            />
          </div>

          {/* Footer Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[#a0a0a0] text-[13.5px] font-medium pt-4 border-t border-black/[0.03]">
            <span className="flex items-center gap-1.5">
              <StarIcon /> 4.8 on App Store
            </span>
            <span className="w-1 h-1 rounded-full bg-[#d0d0d0] hidden sm:block" />
            <span>200k Downloads</span>
            <span className="w-1 h-1 rounded-full bg-[#d0d0d0] hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <TrophyIcon /> Best 75 Challenge
            </span>
          </div>
        </div>
      </motion.div>
  );
}

// ----------------------------------------------------------------------
// Sub Components & Icons
// ----------------------------------------------------------------------

function AppCard({ icon, title, subtitle, hoverGradient }: { icon: React.ReactNode, title: string, subtitle: string, hoverGradient: string }) {
  return (
    <motion.div 
      className="relative h-[90px] sm:h-[180px] rounded-[20px] sm:rounded-[24px] bg-[#111111] p-5 sm:p-6 flex flex-row sm:flex-col items-center sm:items-start justify-start sm:justify-between overflow-hidden group cursor-pointer shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] gap-4 sm:gap-0"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Color fill background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
      
      {/* Shine effect on individual card */}
      <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-[1.2s] ease-in-out z-0" />

      <div className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      
      <div className="relative z-10 text-white flex-1 text-left">
        <p className="text-[15px] font-medium leading-snug">{title}</p>
        <p className="text-[14px] sm:text-[15px] font-medium leading-snug text-white/50 group-hover:text-white/90 transition-colors duration-300 tracking-wide">{subtitle}</p>
      </div>
    </motion.div>
  );
}

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.458 3.618-2.922 1.15-1.682 1.625-3.31 1.64-3.395-.035-.015-3.179-1.22-3.203-4.856-.026-3.04 2.482-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.693.793-1.373 2.246-1.187 3.619 1.353.104 2.627-.584 3.474-1.607z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    <path d="M3.5 2.5c-.3 0-.5.2-.5.5v18c0 .3.2.5.5.5.1 0 .3-.1.4-.2l17-9c.2-.1.3-.3.3-.5s-.1-.4-.3-.5l-17-9c-.1-.1-.3-.2-.4-.2z" />
  </svg>
);

const ScanIcon = () => {
  // SVG pattern for a cool scannable dot-matrix
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      // Deterministic opacity to prevent SSR hydration mismatch and maintain tech aesthetic
      const op = 0.4 + ((i * 7 + j) % 5) * 0.12;
      dots.push(<circle key={`${i}-${j}`} cx={4 + i * 4} cy={4 + j * 4} r={1.2} fillOpacity={op} />);
    }
  }
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
      {dots}
    </svg>
  );
};

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10" />
    <path d="M6 4c-1.1 0-2 .9-2 2v2c0 3.3 2.7 6 6 6h4c3.3 0 6-2.7 6-6V6c0-1.1-.9-2-2-2" />
    <path d="M4 10h2" />
    <path d="M18 10h2" />
  </svg>
);
