'use client';

import React, { useState } from 'react';

export default function AddToCartVariant() {
  const [state, setState] = useState<'idle' | 'loading' | 'added'>('idle');

  const handleClick = () => {
    if (state !== 'idle') return;
    
    setState('loading');
    
    setTimeout(() => {
      setState('added');
      
      setTimeout(() => {
        setState('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={handleClick}
        disabled={state !== 'idle'}
        className={`group relative overflow-hidden w-48 h-14 rounded-2xl font-medium tracking-wide transition-all duration-300 ease-out border
          ${state === 'idle' 
            ? 'bg-zinc-900/50 text-white border-white/10 hover:border-white/30 hover:bg-zinc-800 shadow-sm hover:shadow-md' 
            : state === 'loading'
            ? 'bg-zinc-800 text-zinc-400 border-white/10 cursor-wait'
            : 'bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-default'
          }
        `}
      >
        <div 
          className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] h-full w-full"
          style={{ 
            transform: 
              state === 'idle' ? 'translateY(0)' : 
              state === 'loading' ? 'translateY(-100%)' : 
              'translateY(-200%)' 
          }}
        >
          {/* Idle State */}
          <div className="flex items-center justify-center h-full w-full shrink-0 gap-2">
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Add to Cart</span>
          </div>

          {/* Loading State */}
          <div className="flex items-center justify-center h-full w-full shrink-0 gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-zinc-500 border-t-zinc-200 animate-spin"></div>
            <span>Adding...</span>
          </div>

          {/* Added State */}
          <div className="flex items-center justify-center h-full w-full shrink-0 gap-2">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Added</span>
          </div>
        </div>
      </button>
    </div>
  );
}
