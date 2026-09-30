'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function ExpandableSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openSearch = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  const closeSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div 
        ref={containerRef}
        onClick={openSearch}
        className={`group relative flex items-center bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-md rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]
          ${isOpen ? 'w-72 sm:w-80 h-14' : 'w-14 h-14 cursor-pointer hover:bg-zinc-200 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]'}
        `}
      >
        {/* Search Icon */}
        <div className="absolute left-2 flex items-center justify-center w-10 h-10">
          <svg 
            className={`absolute w-5 h-5 text-zinc-500 dark:text-white/70 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOpen 
                ? 'opacity-100 scale-100 rotate-0 text-indigo-600 dark:text-indigo-400' 
                : 'opacity-100 scale-100 rotate-0 group-hover:scale-110 group-hover:text-zinc-900 dark:group-hover:text-white'
            }`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search..." 
          className={`absolute left-12 w-[calc(100%-5rem)] bg-transparent outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
          }`}
        />

        {/* Close Button */}
        {isOpen && (
          <button 
            onClick={closeSearch}
            className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-full text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors animate-[fade-in_0.4s_ease-out_0.2s_both]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.5) rotate(-45deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}} />
    </div>
  );
}
