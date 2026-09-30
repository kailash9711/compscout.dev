"use client";

import React, { useState } from "react";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface NeonBoxPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

/**
 * @prop {number} currentPage - Controlled active page number index (Default: undefined)
 * @prop {number} totalPages - Total count of pages in neon grid track (Default: 5)
 * @prop {function} onPageChange - Callback fired when target page switches (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function NeonBoxPagination({
  currentPage: externalPage,
  totalPages = 5,
  onPageChange,
  className = ""
}: NeonBoxPaginationProps = {}) {
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

  const getPages = () => {
    const pages: number[] = [];
    const showMax = 3;

    let start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + showMax - 1);

    if (end === totalPages) start = Math.max(1, end - showMax + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const navButtonStyles = `
    flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] 
    text-zinc-500 dark:text-zinc-400 transition-all hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-20 
    disabled:cursor-not-allowed group relative overflow-hidden cursor-pointer outline-none
  `;

  return (
    <nav className={`flex items-center justify-center gap-2 sm:gap-4 select-none font-sans py-2 ${className}`}>
      {/* Left Navigation */}
      <div className="flex items-center border-r border-zinc-200 dark:border-zinc-800 pr-2 sm:pr-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={navButtonStyles}
          title="First page"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">First</span>
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={navButtonStyles}
          title="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Number Group */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {getPages().map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs font-mono font-bold transition-all duration-200 cursor-pointer outline-none
                ${isActive ? "text-zinc-950 dark:text-white font-black" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"}
              `}
            >
              <span className="relative z-10">{page.toString().padStart(2, '0')}</span>

              {/* Neon Box Indicator */}
              {isActive && (
                <motion.div
                  layoutId="neon-box-indicator"
                  className="absolute inset-0 border-2 border-indigo-600 dark:border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.35)] rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                >
                  <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
                </motion.div>
              )}

              {/* Inactive border */}
              {!isActive && (
                <div className="absolute inset-0 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Navigation */}
      <div className="flex items-center border-l border-zinc-200 dark:border-zinc-800 pl-2 sm:pl-4">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={navButtonStyles}
          title="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={navButtonStyles}
          title="Last page"
        >
          <span className="hidden sm:inline">Last</span>
          <ChevronsRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </nav>
  );
}
