"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";

export default function PremiumJobCard() {
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

  const glareBackground = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.15), transparent 40%)`;

  return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-full bg-[#0c0c0c] rounded-[36px] p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer border border-white/5 font-sans"
        animate={{ 
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Dotted Grid Background */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "-12px -12px"
          }}
        />

        {/* Sunlight Rays - Rotating Conic Gradient on Hover */}
        <motion.div
          className="absolute inset-[-50%] z-0 pointer-events-none mix-blend-screen"
          animate={{
            opacity: isHovered ? 0.4 : 0,
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            background: `repeating-conic-gradient(
              from 0deg at 50% 0%,
              transparent 0deg,
              rgba(139, 92, 246, 0.15) 5deg,
              transparent 15deg,
              rgba(56, 189, 248, 0.15) 20deg,
              transparent 30deg
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

        {/* Content */}
        <div className="relative z-20 flex flex-col h-full text-white">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            {/* Abstract Logo */}
            <div className="flex items-center gap-[-4px]">
              <div className="w-6 h-6 rounded-full bg-white relative z-20"></div>
              <div className="w-6 h-6 rounded-full bg-white/60 relative z-10 -ml-2"></div>
              <div className="w-6 h-6 rounded-full bg-white/30 relative z-0 -ml-2"></div>
            </div>
            
            {/* Save Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium border border-white/5 backdrop-blur-sm">
              Save
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>

          {/* Job Details */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/90 text-[15px] font-medium tracking-wide">Nexus-UI</span>
              <span className="text-white/40 text-[12px]">2 days ago</span>
            </div>
            <h2 className="text-[34px] leading-tight font-semibold tracking-[-0.02em] mb-6">
              Senior Frontend <br/> Engineer
            </h2>
            
            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-16">
              <span className="px-4 py-1.5 rounded-md bg-white/5 text-white/70 text-xs font-medium border border-white/10">Full-Time</span>
              <span className="px-4 py-1.5 rounded-md bg-white/5 text-white/70 text-xs font-medium border border-white/10">Remote</span>
              <span className="px-4 py-1.5 rounded-md bg-white/5 text-white/70 text-xs font-medium border border-white/10">San Francisco</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-6"></div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-[26px] font-bold tracking-tight mb-1">$120-180</p>
              <p className="text-[12px] text-white/50 font-medium">Per every hour</p>
            </div>
            
            <button className="px-6 py-3 bg-white text-black rounded-xl font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              Apply now
            </button>
          </div>

        </div>

        {/* Sweeping Line Effect */}
        <motion.div
          className="absolute top-0 left-[-100%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] z-10 pointer-events-none"
          animate={{
            left: isHovered ? "150%" : "-100%"
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
  );
}
