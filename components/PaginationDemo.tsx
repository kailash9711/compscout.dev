"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PaginationDemoProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

/**
 * @prop {number} currentPage - Controlled active pagination dot index (Default: undefined)
 * @prop {number} totalPages - Total count of pill dots in track (Default: 5)
 * @prop {function} onPageChange - Callback fired when active page changes (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function PaginationDemo({
  currentPage: externalPage,
  totalPages = 5,
  onPageChange,
  className = ""
}: PaginationDemoProps = {}) {
  const [internalPage, setInternalPage] = useState(1);

  const isControlled = externalPage !== undefined;
  const currentPage = isControlled ? externalPage : internalPage;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (!isControlled) {
      setInternalPage(page);
    }
    onPageChange?.(page);
  };

  return (
    <div className={`flex items-center justify-center py-2 select-none font-sans ${className}`}>
      <nav className="relative flex items-center gap-0.5 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm">
        {/* Sliding Active Indicator Aura Background */}
        <AnimatePresence>
          <motion.div
            layoutId="active-aura-pill"
            className="absolute bg-indigo-500/15 dark:bg-indigo-500/25 rounded-full pointer-events-none"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            style={{
              width: 36,
              height: 36,
              left: (currentPage - 1) * 38 + 4,
            }}
          />
        </AnimatePresence>

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className="group relative flex items-center justify-center w-9 h-9 transition-all duration-300 outline-none cursor-pointer rounded-full"
              aria-label={`Go to page ${page}`}
            >
              {/* Dot / Number */}
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  color: isActive ? "var(--active-color, #4f46e5)" : "#71717a"
                }}
                className="relative z-10 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
              >
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.span
                      key="number"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-indigo-600 dark:text-indigo-400 font-black text-xs"
                    >
                      {page}
                    </motion.span>
                  ) : (
                    <motion.div
                      key="dot"
                      className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 transition-all group-hover:w-2.5 group-hover:h-1 group-hover:bg-zinc-600 dark:group-hover:bg-zinc-300"
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Active Ring */}
              {isActive && (
                <motion.div
                  layoutId="active-pill-ring"
                  className="absolute inset-0 border border-indigo-500/40 dark:border-indigo-400/40 rounded-full pointer-events-none"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
