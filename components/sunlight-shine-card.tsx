"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";

export default function SunlightShineCard() {
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

  const glareBackground = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.4), transparent 40%)`;

  return (
      <div 
        style={{ perspective: "1000px" }}
        className="relative flex items-center justify-center w-full h-full font-sans"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            const rect = cardRef.current?.getBoundingClientRect();
            if (rect) {
              mouseX.set(rect.width / 2);
              mouseY.set(rect.height / 2);
            } else {
              mouseX.set(160);
              mouseY.set(230);
            }
          }}
          className="relative w-full h-full min-h-[400px] rounded-[32px] overflow-hidden cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #0d62cc, #042557)",
            boxShadow: isHovered 
              ? "0 30px 60px -12px rgba(4, 37, 87, 0.5), 0 0 40px rgba(13, 98, 204, 0.3)" 
              : "0 20px 40px -12px rgba(4, 37, 87, 0.4)",
          }}
          animate={{
            rotateX: isHovered ? (mouseY.get() - 230) * -0.02 : 0,
            rotateY: isHovered ? (mouseX.get() - 160) * 0.02 : 0,
            y: isHovered ? -10 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Base Noise / Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Sunlight Rays */}
          <motion.div
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] pointer-events-none mix-blend-overlay"
            animate={{
              opacity: isHovered ? 0.7 : 0,
              rotate: isHovered ? 45 : 0,
              scale: isHovered ? 1.2 : 0.8,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              background: `repeating-conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                rgba(255, 255, 255, 0.2) 5deg,
                transparent 15deg
              )`,
              transformOrigin: "center center",
            }}
          />

          {/* Mouse tracking Glare */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: glareBackground }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Diagonal Glass Shine Line */}
          <motion.div
            className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 skew-x-[-25deg] pointer-events-none"
            animate={{
              left: isHovered ? "150%" : "-150%"
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
          />

          {/* Inner Content Border (Glassmorphism edge) */}
          <div className="absolute inset-[1px] rounded-[31px] border border-white/20 pointer-events-none z-20" />

          {/* Card Content */}
          <div className="relative z-30 flex flex-col h-full p-8 text-white pointer-events-none">
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg>
                </div>
                <span className="font-bold tracking-tight text-white/90">ihero</span>
              </div>
            </div>

            {/* Main Center Content */}
            <div className="mt-auto mb-auto text-center">
              <motion.h2 
                className="text-4xl font-extrabold tracking-tight mb-2"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Jose
              </motion.h2>
              <motion.p 
                className="text-blue-200/70 text-sm font-medium"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Dev License
              </motion.p>
            </div>
            
            {/* Footer */}
            <div className="mt-auto">
              <div className="h-[1px] w-full bg-white/10 mb-5" />
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold text-blue-200/50 mb-1 uppercase tracking-wider">Valid Until</p>
                  <p className="font-medium text-sm text-white/90">JAN 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-blue-200/50 mb-1 uppercase tracking-wider">ID Number</p>
                  <p className="font-mono text-sm tracking-widest text-white/90">7928</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
  );
}
