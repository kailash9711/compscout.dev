"use client";

import React, { useState, useRef, useEffect } from "react";

/**
 * @name: Minimal Dropdown
 * @desc: A clean, flat, minimalistic dropdown menu without heavy shadows.
 */
export default function MinimalDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ["Profile", "Settings", "Billing", "Logout"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-center p-12 font-sans">
      <div className="relative" ref={dropdownRef}>
        {/* Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors focus:outline-none"
        >
          Options
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm transition-all duration-200 origin-top-right ${
            isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}
        >
          <div className="py-1 flex flex-col">
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => setIsOpen(false)}
                className={`w-full text-left px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors ${
                  index !== options.length - 1 ? "border-b border-zinc-100 dark:border-zinc-900/50" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
