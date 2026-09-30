"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface FluidActivePaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

/**
 * @prop {number} currentPage - Controlled active page number index (Default: undefined)
 * @prop {number} totalPages - Total number of navigable pagination pages (Default: 10)
 * @prop {function} onPageChange - Callback fired when page index changes (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function FluidActivePagination({
  currentPage: externalPage,
  totalPages = 10,
  onPageChange,
  className = ""
}: FluidActivePaginationProps = {}) {
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
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <nav className={`flex items-center justify-center gap-2 select-none font-sans py-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group relative flex items-center justify-center rounded-xl w-9 h-9 sm:w-10 sm:h-10 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white disabled:opacity-25 disabled:cursor-not-allowed active:scale-95 cursor-pointer outline-none"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4.5 w-4.5 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Page Numbers Row (Directly rendered without glassmorphism wrapper div) */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {getPages().map((page, index) => {
          const isPageNumber = typeof page === "number";
          const isActive = page === currentPage;

          if (!isPageNumber) {
            return (
              <span key={`ellipsis-${index}`} className="px-1.5 text-zinc-400 dark:text-zinc-600 font-bold tracking-widest text-xs">
                {page}
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={`
                group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer outline-none
                ${isActive ? "text-white font-black" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"}
              `}
            >
              <span className="relative z-10">{page}</span>

              {/* Fluid Active Background */}
              {isActive && (
                <motion.div
                  layoutId="fluid-active-pill"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-purple-600 rounded-xl shadow-md shadow-indigo-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group relative flex items-center justify-center rounded-xl w-9 h-9 sm:w-10 sm:h-10 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white disabled:opacity-25 disabled:cursor-not-allowed active:scale-95 cursor-pointer outline-none"
        aria-label="Next page"
      >
        <ChevronRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </nav>
  );
}
