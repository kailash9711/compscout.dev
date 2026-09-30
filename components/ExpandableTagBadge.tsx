"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface ExpandableTagBadgeProps {
  shortText?: string;
  fullText?: string;
  className?: string;
}

/**
 * @prop {string} shortText - Short abbreviation prefix shown inside pill tag (Default: 'SYS')
 * @prop {string} fullText - Expanded description string revealed smoothly on hover (Default: 'System Analytics')
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function ExpandableTagBadge({
  shortText = "SYS",
  fullText = "System Analytics",
  className = ""
}: ExpandableTagBadgeProps = {}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`flex items-center justify-center p-6 font-sans ${className}`}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center bg-zinc-950 border border-zinc-800 hover:border-zinc-700/80 rounded-full p-1 shadow-md cursor-default select-none transition-colors"
      >
        {/* Leading indicator block */}
        <span className="flex h-6 px-2.5 items-center justify-center bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          {shortText}
        </span>

        {/* Slide-out text container */}
        <motion.div
          initial={false}
          animate={{ width: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="overflow-hidden whitespace-nowrap"
        >
          <span className="block px-3 text-[11px] sm:text-xs font-medium text-zinc-300 tracking-wide">
            {fullText}
          </span>
        </motion.div>

        {/* Small dot showing it is expandable */}
        <motion.span
          animate={{ scale: isHovered ? 0 : 1, opacity: isHovered ? 0 : 1 }}
          className="h-1.5 w-1.5 rounded-full bg-zinc-700 mx-2"
        />
      </motion.div>
    </div>
  );
}
