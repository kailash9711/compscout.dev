"use client";

import React from "react";
import { motion } from "framer-motion";

export interface GlowingBorderBadgeProps {
  text?: string;
  className?: string;
}

/**
 * @prop {string} text - Text label rendered within radiant gradient halo badge (Default: 'Premium')
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function GlowingBorderBadge({
  text = "Premium",
  className = ""
}: GlowingBorderBadgeProps = {}) {
  return (
    <div className={`flex items-center justify-center p-6 font-sans ${className}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative p-[1px] overflow-hidden rounded-full cursor-default select-none group"
      >
        {/* Animated Gradient Background Border */}
        <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        
        {/* Outer Glow */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300 pointer-events-none" />
        
        {/* Inner Badge Content */}
        <span className="relative block px-3 py-1 bg-zinc-950 rounded-full text-[10px] sm:text-xs font-semibold text-zinc-200 tracking-wider uppercase">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
