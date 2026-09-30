'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Star, ChevronRight } from 'lucide-react';

export interface PersonalizedCardProps {
  promptTitle?: string;
  promptSubtitle?: string;
  buttonText?: string;
  quote?: string;
  authorName?: string;
  authorRole?: string;
  avatarUrl?: string;
  rating?: number;
  defaultRevealed?: boolean;
  onStateChange?: (isRevealed: boolean) => void;
  className?: string;
}

/**
 * @prop {string} promptTitle - Title on prompt card before reveal (Default: 'Want a personal insight?')
 * @prop {string} promptSubtitle - Subtitle caption on prompt card before reveal (Default: 'See how COMPScout works for your specific role.')
 * @prop {string} buttonText - Action button label to trigger transition (Default: 'Reveal Experience')
 * @prop {string} quote - Testimonial quote revealed upon user trigger (Default: 'It feels like the components are thinking ahead...')
 * @prop {string} authorName - Name of the reviewer (Default: 'Emily Thorne')
 * @prop {string} authorRole - Professional role of reviewer (Default: 'Senior Architect')
 * @prop {string} avatarUrl - Image URL for the reviewer avatar (Default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150')
 * @prop {number} rating - Star rating count out of 5 (Default: 5)
 * @prop {boolean} defaultRevealed - Whether the card is expanded/revealed initially (Default: false)
 * @prop {function} onStateChange - Callback fired when card toggles between prompt and revealed states (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function PersonalizedCard({
  promptTitle = "Want a personal insight?",
  promptSubtitle = "See how COMPScout works for your specific role.",
  buttonText = "Reveal Experience",
  quote = "It feels like the components are thinking ahead of me. The architectural logic is perfect for senior developers.",
  authorName = "Emily Thorne",
  authorRole = "Senior Architect",
  avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  rating = 5,
  defaultRevealed = false,
  onStateChange,
  className = ""
}: PersonalizedCardProps = {}) {
  const [isActive, setIsActive] = useState(defaultRevealed);

  const toggleActive = (val: boolean) => {
    setIsActive(val);
    onStateChange?.(val);
  };

  return (
    <div className={`w-full max-w-md mx-auto p-3 sm:p-4 ${className}`}>
      <motion.div 
        layout
        className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">{promptTitle}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{promptSubtitle}</p>
              </div>
              <button 
                onClick={() => toggleActive(true)}
                className="w-full h-11 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-bold tracking-wider text-[10px] uppercase cursor-pointer shadow-md active:scale-98"
              >
                {buttonText}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-indigo-500 text-indigo-500" />
                  ))}
                </div>
                <button 
                  onClick={() => toggleActive(false)}
                  className="text-[10px] font-bold text-zinc-400 hover:text-black dark:hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <blockquote className="text-xl sm:text-2xl font-serif italic text-zinc-900 dark:text-zinc-100 leading-relaxed">
                &quot;{quote}&quot;
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={avatarUrl} className="w-full h-full object-cover" alt={authorName} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{authorName}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{authorRole}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Background Accent */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      </motion.div>
    </div>
  );
}
