"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TickerBadgeProps {
  label?: string;
  count?: number;
  defaultCount?: number;
  onCountChange?: (count: number) => void;
  className?: string;
}

/**
 * @prop {string} label - Category or notification badge label (Default: 'Notifications')
 * @prop {number} count - Optional controlled count indicator (Default: undefined)
 * @prop {number} defaultCount - Initial numeric ticker count (Default: 1)
 * @prop {function} onCountChange - Optional callback triggered on count increment (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function TickerBadge({
  label = "Notifications",
  count: controlledCount,
  defaultCount = 1,
  onCountChange,
  className = ""
}: TickerBadgeProps = {}) {
  const [internalCount, setInternalCount] = useState(defaultCount);
  const currentCount = controlledCount !== undefined ? controlledCount : internalCount;

  const handleClick = () => {
    const next = currentCount >= 99 ? 1 : currentCount + 1;
    if (controlledCount === undefined) {
      setInternalCount(next);
    }
    onCountChange?.(next);
  };

  return (
    <div className={`flex items-center justify-center p-6 font-sans ${className}`}>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700/80 text-zinc-300 rounded-full shadow-md cursor-pointer select-none transition-colors outline-none"
      >
        <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-zinc-400">{label}</span>
        <span className="w-px h-3 bg-zinc-800" />
        <div className="relative min-w-4.5 h-4.5 px-1 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={currentCount}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="absolute text-[10px] font-bold text-zinc-200"
            >
              {currentCount}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}
