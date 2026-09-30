'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export interface MinimalTestimonialItem {
  id: number | string;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
}

export interface MinimalRevealTestimonialProps {
  testimonials?: MinimalTestimonialItem[];
  showArrowButton?: boolean;
  showAccentBar?: boolean;
  onTestimonialClick?: (item: MinimalTestimonialItem) => void;
  className?: string;
}

const defaultTestimonials: MinimalTestimonialItem[] = [
  {
    id: 1,
    name: "Itachi Uchiha",
    role: "Genjutsu Master",
    content: "Clean, efficient, and beautifully designed. This library creates a visual experience so seamless, users never want to leave.",
    rating: 5,
  },
  {
    id: 2,
    name: "Satoru Gojo",
    role: "Limitless Architect",
    content: "The attention to detail is remarkable. Throughout heaven and earth, these UI components are simply the smoothest.",
    rating: 5,
  },
  {
    id: 3,
    name: "Light Yagami",
    role: "System Strategist",
    content: "Exactly as calculated. Our conversion rate increased by 24% after integrating. The aesthetics are just on another level.",
    rating: 5,
  }
];

/**
 * @prop {MinimalTestimonialItem[]} testimonials - Array of minimal reveal testimonial cards (Default: 3 preset reviews)
 * @prop {boolean} showArrowButton - Whether to reveal callout arrow button on hover (Default: true)
 * @prop {boolean} showAccentBar - Whether to show the top expanding highlight accent line (Default: true)
 * @prop {function} onTestimonialClick - Callback fired when a testimonial card is clicked (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function MinimalRevealTestimonial({
  testimonials = defaultTestimonials,
  showArrowButton = true,
  showAccentBar = true,
  onTestimonialClick,
  className = ""
}: MinimalRevealTestimonialProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = testimonials[activeIndex] || testimonials[0];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={`w-full max-w-[340px] select-none font-sans py-2 ${className}`}>
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onTestimonialClick?.(activeItem)}
        className="group relative bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md min-h-[220px]"
      >
        {/* Top Expanding Accent Bar on Hover */}
        {showAccentBar && (
          <div className="absolute top-0 left-0 w-full h-[3px] bg-indigo-600 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left z-20" />
        )}

        {/* Top Row: Quote Icon & Stars & Switcher */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-indigo-600 dark:text-indigo-400 opacity-80 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: activeItem.rating || 5 }).map((_, i) => (
                <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          {/* Quick Cycle Arrows */}
          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrev}
              className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="Previous review"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              onClick={handleNext}
              className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="Next review"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Quote Content */}
        <div className="relative z-10 flex-1 my-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeItem.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed line-clamp-3 font-normal"
            >
              &ldquo;{activeItem.content}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bottom Author Info */}
        <div className="relative z-10 flex items-center justify-between pt-3 mt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            {/* Avatar Pill */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-inner">
              {activeItem.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                {activeItem.name}
              </h4>
              <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {activeItem.role}
              </p>
            </div>
          </div>

          {showArrowButton && (
            <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Dots Tracker */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-4 bg-indigo-600 dark:bg-indigo-400"
                  : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

