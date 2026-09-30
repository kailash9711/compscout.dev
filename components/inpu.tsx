"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CommandSearchItem {
  icon?: string;
  text: string;
}

export interface MorphingCommandInputProps {
  placeholder?: string;
  recentSearches?: CommandSearchItem[];
  expandedWidth?: number;
  collapsedWidth?: number;
  expandedHeight?: number;
  onSelectSearch?: (item: CommandSearchItem) => void;
  className?: string;
}

const defaultRecentSearches: CommandSearchItem[] = [
  { icon: "Layers", text: "Advanced Framer Motion Physics" },
  { icon: "Server", text: "Next.js Server Actions Integration" },
  { icon: "Layout", text: "Complex CSS Grid Architectures" },
  { icon: "Zap", text: "Performance Optimization Patterns" },
  { icon: "Layers", text: "React Server Components Deep Dive" },
  { icon: "Layout", text: "Responsive Design Systems" },
  { icon: "Zap", text: "Tailwind CSS Best Practices" },
  { icon: "Server", text: "Database Indexing Strategies" },
];

const icons: Record<string, React.ReactNode> = {
  Layers: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  ),
  Server: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  ),
  Layout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  ),
  Zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  )
};

/**
 * @prop {string} placeholder - Input placeholder prompt (Default: 'Search documentation...')
 * @prop {CommandSearchItem[]} recentSearches - Array of suggested or history search queries (Default: 8 preset queries)
 * @prop {number} expandedWidth - Max container width in px when focused (Default: 600)
 * @prop {number} collapsedWidth - Initial pill width in px (Default: 280)
 * @prop {number} expandedHeight - Modal container height in px when focused (Default: 330)
 * @prop {function} onSelectSearch - Callback fired when a search recommendation is clicked (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function MorphingCommandInput({
  placeholder = "Search documentation...",
  recentSearches = defaultRecentSearches,
  expandedWidth = 600,
  collapsedWidth = 280,
  expandedHeight = 330,
  onSelectSearch,
  className = ""
}: MorphingCommandInputProps = {}) {
  const [isFocused, setIsFocused] = useState(false);
  const [val, setVal] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleItemClick = (item: CommandSearchItem) => {
    setVal(item.text);
    onSelectSearch?.(item);
    setIsFocused(false);
  };

  return (
    <div className={`flex flex-col items-center justify-center p-3 sm:p-4 w-full max-w-full relative font-sans ${className}`}>
      {/* Morphing Container */}
      <motion.div
        ref={containerRef}
        layout
        className="bg-neutral-50 dark:bg-[#12141a] border border-neutral-300 dark:border-neutral-700/80 shadow-lg z-20 flex flex-col overflow-hidden text-neutral-900 dark:text-white max-w-full"
        initial={false}
        animate={{
          width: isFocused ? "100%" : collapsedWidth,
          maxWidth: isFocused ? expandedWidth : collapsedWidth,
          height: isFocused ? expandedHeight : 48,
          borderRadius: isFocused ? 18 : 24,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
      >
        {/* Top Bar */}
        <div className="h-12 shrink-0 flex items-center px-3.5 sm:px-4 relative z-30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500 dark:text-neutral-400 shrink-0">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            value={val}
            onChange={e => setVal(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full bg-transparent text-neutral-900 dark:text-neutral-50 font-medium ml-2.5 outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-xs sm:text-sm"
            placeholder={placeholder}
          />

          {/* Clear Button */}
          <AnimatePresence>
            {val && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => setVal("")}
                className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white shrink-0 ml-1.5 cursor-pointer"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Expanded Content Area */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.08, duration: 0.18 }}
              className="flex-1 flex flex-col p-2.5 sm:p-3 overflow-y-auto [&::-webkit-scrollbar]:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-[#161820]/70"
            >
              <div className="px-2.5 py-1 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                Recent Searches
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {recentSearches.map((search, i) => (
                  <motion.button
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (i * 0.03) }}
                    onClick={() => handleItemClick(search)}
                    className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white flex items-center transition-colors group cursor-pointer"
                  >
                    <span className="mr-2.5 opacity-70 group-hover:opacity-100 transition-opacity">
                      {icons[search.icon || "Layers"] || icons.Layers}
                    </span>
                    <span className="font-medium text-xs truncate">{search.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
