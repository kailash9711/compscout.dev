"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Wifi } from "lucide-react";

export interface CardPhysicalDepthTiltProps {
  cardHolder?: string;
  cardNumber?: string;
  cardType?: string;
  expiryDate?: string;
  cvv?: string;
  maxTilt?: number;
  springStiffness?: number;
  springDamping?: number;
  onFlip?: (isFlipped: boolean) => void;
  className?: string;
}

/**
 * @prop {string} cardHolder - Full name of cardholder printed on card (Default: 'ALEXANDER VANE')
 * @prop {string} cardNumber - Obfuscated credit card number display string (Default: '•••• 8920')
 * @prop {string} cardType - Metal credit card tier label (Default: 'Black Obsidian')
 * @prop {string} expiryDate - Expiration date MM/YY (Default: '09/28')
 * @prop {string} cvv - 3-digit security CVV code (Default: '892')
 * @prop {number} maxTilt - Maximum 3D rotational tilt angle in degrees (Default: 20)
 * @prop {number} springStiffness - Physics spring stiffness for tilt return (Default: 300)
 * @prop {number} springDamping - Physics spring damping for tilt stabilization (Default: 25)
 * @prop {function} onFlip - Callback fired when card flips front/back (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function CardPhysicalDepthTilt({
  cardHolder = "ALEXANDER VANE",
  cardNumber = "•••• 8920",
  cardType = "Black Obsidian",
  expiryDate = "09/28",
  cvv = "892",
  maxTilt = 20,
  springStiffness = 300,
  springDamping = 25,
  onFlip,
  className = ""
}: CardPhysicalDepthTiltProps = {}) {
  const [flipped, setFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5); 
    mouseY.set(0.5);
  };

  const handleCardClick = () => {
    const nextVal = !flipped;
    setFlipped(nextVal);
    onFlip?.(nextVal);
  };

  const smoothX = useSpring(mouseX, { damping: springDamping, stiffness: springStiffness });
  const smoothY = useSpring(mouseY, { damping: springDamping, stiffness: springStiffness });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  return (
    <div 
      className={`flex h-[210px] w-full max-w-[310px] items-center justify-center [perspective:1400px] font-sans ${className}`} 
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY }}
        animate={{ scale: isHovered ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-[185px] w-full cursor-pointer [transform-style:preserve-3d]"
      >
        <motion.div 
          animate={{ rotateY: flipped ? 180 : 0 }} 
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="absolute inset-0 h-full w-full [transform-style:preserve-3d]"
        >
          {/* FRONT */}
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[20px] bg-gradient-to-br from-slate-800 via-[#111] to-black p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/20 [backface-visibility:hidden] [transform-style:preserve-3d]">
            <motion.div 
              className="pointer-events-none absolute -inset-[200%] z-0 mix-blend-overlay transition-opacity duration-500"
              style={{
                opacity: isHovered ? 1 : 0.2,
                background: "radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, transparent 35%)",
                left: glareX,
                top: glareY,
                transform: "translate(-50%, -50%)"
              }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between [transform-style:preserve-3d]" style={{ transform: "translateZ(10px)" }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-zinc-400">
                  {cardType}
                </span>
                <Wifi className="h-4 w-4 text-zinc-400 rotate-90" />
              </div>

              <div className="flex items-center gap-3 my-auto">
                <div className="h-8 w-10 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-inner border border-amber-300/40" />
                <span className="font-mono text-lg font-bold tracking-widest text-zinc-200">
                  {cardNumber}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Cardholder</span>
                  <span className="text-xs font-bold tracking-wider text-zinc-200 uppercase">{cardHolder}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Expires</span>
                  <span className="text-xs font-mono font-bold text-zinc-200">{expiryDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[20px] bg-gradient-to-br from-black via-[#111] to-slate-900 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/20 [backface-visibility:hidden] [transform:rotateY(180deg)] [transform-style:preserve-3d]">
            <div className="-mx-6 h-10 bg-black border-y border-white/10" />
            <div className="flex items-center justify-between bg-zinc-800/80 px-4 py-2 rounded-lg border border-white/5">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">CVV / CVC</span>
              <span className="font-mono text-sm font-bold tracking-widest text-white">{cvv}</span>
            </div>
            <div className="text-center">
              <span className="text-[9px] font-medium text-zinc-500 tracking-wider">
                Click anywhere to flip back
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
