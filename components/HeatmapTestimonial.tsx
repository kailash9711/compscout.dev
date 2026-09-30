'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface HeatmapFeedbackItem {
  id: number | string;
  text: string;
  author?: string;
  size?: string;
  color?: string;
}

export interface HeatmapTestimonialProps {
  items?: HeatmapFeedbackItem[];
  showPattern?: boolean;
  showVerifiedBadge?: boolean;
  hoverLift?: number;
  onCardClick?: (item: HeatmapFeedbackItem) => void;
  className?: string;
}

const defaultFeedback: HeatmapFeedbackItem[] = [
  { id: 1, text: "Absolutely brilliant!", author: "Sarah L.", size: "col-span-1 sm:col-span-2 sm:row-span-2", color: "from-indigo-500/20" },
  { id: 2, text: "Super smooth", author: "Alex K.", size: "col-span-1 sm:col-span-1 sm:row-span-1", color: "from-emerald-500/20" },
  { id: 3, text: "Top-tier quality", author: "David M.", size: "col-span-1 sm:col-span-1 sm:row-span-2", color: "from-amber-500/20" },
  { id: 4, text: "Highly recommended", author: "Elena R.", size: "col-span-1 sm:col-span-2 sm:row-span-1", color: "from-rose-500/20" },
  { id: 5, text: "Beautifully crafted", author: "Kenji T.", size: "col-span-1 sm:col-span-1 sm:row-span-1", color: "from-sky-500/20" },
];

/**
 * @prop {HeatmapFeedbackItem[]} items - Array of bento heatmap feedback tiles with text and custom spans (Default: 5 preset feedback tiles)
 * @prop {boolean} showPattern - Whether to render dot matrix grid texture overlay inside cards (Default: true)
 * @prop {boolean} showVerifiedBadge - Whether to render pulsating green verified response indicator (Default: true)
 * @prop {number} hoverLift - Pixel translateY offset applied on hover (Default: -5)
 * @prop {function} onCardClick - Callback fired when a heatmap card is clicked (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function HeatmapTestimonial({
  items = defaultFeedback,
  showPattern = true,
  showVerifiedBadge = true,
  hoverLift = -5,
  onCardClick,
  className = ""
}: HeatmapTestimonialProps = {}) {
  return (
    <div className={`w-full max-w-5xl mx-auto p-3 sm:p-5 md:p-6 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[130px] sm:auto-rows-[140px] md:auto-rows-[160px]">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: hoverLift, scale: 1.01 }}
            onClick={() => onCardClick?.(item)}
            className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/10 bg-zinc-900/90 overflow-hidden group cursor-pointer flex flex-col justify-between ${item.size || 'col-span-1 row-span-1'}`}
          >
            {/* Dynamic Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-indigo-500/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute -inset-1 bg-gradient-to-br from-white/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col justify-between gap-2">
              <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
                {item.author ? `Review // ${item.author}` : `Metric_User_${item.id}`}
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-snug line-clamp-3">
                {item.text}
              </p>
              {showVerifiedBadge && (
                <div className="flex items-center gap-1.5 pt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/50 uppercase tracking-wider">Verified Response</span>
                </div>
              )}
            </div>

            {/* Heatmap Pattern Overlay */}
            {showPattern && (
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
