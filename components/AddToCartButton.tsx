'use client';

import React, { useState } from 'react';

export default function AddToCartButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'added'>('idle');

  const handleClick = () => {
    if (state !== 'idle') return;
    
    setState('loading');
    
    // Simulate network request
    setTimeout(() => {
      setState('added');
      
      // Reset back to idle after a while
      setTimeout(() => {
        setState('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1s linear infinite;
        }
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}} />

      <button
        onClick={handleClick}
        disabled={state !== 'idle'}
        className={`relative overflow-hidden flex items-center justify-center rounded-full font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${state === 'idle' 
            ? 'w-48 h-14 bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(0,0,0,0.15)] dark:shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer' 
            : state === 'loading'
            ? 'w-14 h-14 bg-transparent border-2 border-black/20 dark:border-white/20 text-transparent scale-100 cursor-default'
            : 'w-48 h-14 bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] scale-100 cursor-default'
          }
        `}
      >
        {/* Loading Spinner Ring */}
        <div className={`absolute inset-0 rounded-full border-t-2 border-l-2 border-zinc-900 dark:border-white transition-opacity duration-300 ${state === 'loading' ? 'opacity-100 animate-spin-slow' : 'opacity-0'}`}></div>

        {/* Content Container */}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          
          {/* Default State */}
          <div className={`flex items-center gap-2 transition-all duration-500 absolute ${state === 'idle' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-12'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Add to Cart</span>
          </div>

          {/* Added State */}
          <div className={`flex items-center gap-2 transition-all duration-300 absolute ${state === 'added' ? 'opacity-100 transform translate-y-0 animate-pop-in' : 'opacity-0 transform translate-y-8'}`}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-bold">Added</span>
          </div>
          
        </div>
      </button>
    </div>
  );
}
