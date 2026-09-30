/**
 * @name: Pill Indicator
 * @desc: Minimalist rounded pill tabs with smooth spring-loaded background transition.
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabPillIndicatorProps {
  tabs?: string[];
  defaultTab?: string;
  bounce?: number;
  duration?: number;
  pillColor?: string;
  onChange?: (tab: string) => void;
  className?: string;
}

/**
 * @prop {string[]} tabs - Array of tab names to display in the pill indicator (Default: ['Product', 'Pricing', 'Company', 'Developers'])
 * @prop {string} defaultTab - The name of the tab that should be active initially (Default: 'Product')
 * @prop {number} bounce - Spring bounce physics coefficient for the sliding pill (Default: 0.2)
 * @prop {number} duration - Transition duration in seconds for indicator sliding (Default: 0.4)
 * @prop {string} pillColor - Custom background color class for the active pill
 * @prop {function} onChange - Callback fired when the selected pill changes (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function TabPillIndicator({
  tabs = ["Product", "Pricing", "Company", "Developers"],
  defaultTab = "Product",
  bounce = 0.2,
  duration = 0.4,
  pillColor,
  onChange,
  className = ""
}: TabPillIndicatorProps = {}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSelect = (tab: string) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <div className={`flex w-full max-w-[540px] flex-col items-center justify-center p-3 font-sans select-none ${className}`}>
      
      {/* Clean Solid Pill Bar (No Glassmorphism) */}
      <div className="relative flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 rounded-full bg-neutral-100 dark:bg-neutral-900 p-1 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleSelect(tab)}
              className={`relative z-10 rounded-full px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-200 outline-none cursor-pointer ${
                isActive
                  ? "text-neutral-950 dark:text-white font-semibold"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              }`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {isActive && (
                <motion.div
                  layoutId="pill-indicator"
                  className={`absolute inset-0 -z-10 rounded-full ${
                    pillColor || "bg-white dark:bg-neutral-800"
                  } shadow-xs border border-neutral-200/80 dark:border-neutral-700`}
                  transition={{
                    type: "spring",
                    bounce,
                    duration
                  }}
                />
              )}
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content display */}
      <div className="mt-5 flex min-h-[70px] w-full flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center px-4"
          >
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
              {activeTab} Content
            </h3>
            <p className="max-w-[280px] sm:max-w-[320px] text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Active tab switched to <span className="font-semibold text-neutral-800 dark:text-neutral-200">{activeTab}</span> with spring physics.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
