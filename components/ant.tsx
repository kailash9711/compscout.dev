"use client";

import React from "react";

export interface CreativeMarchingAntsButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * @prop {string} label - Button title text (Default: 'Marching Ants')
 * @prop {function} onClick - Optional click callback handler (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function CreativeMarchingAntsButton({
  label = "Marching Ants",
  onClick,
  className = ""
}: CreativeMarchingAntsButtonProps = {}) {
  return (
    <div className={`flex items-center justify-center p-6 font-sans ${className}`}>
      <button
        onClick={onClick}
        className="relative flex items-center justify-center w-52 h-14 bg-transparent cursor-pointer group rounded-lg outline-none select-none transition-transform duration-200 active:scale-95"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="1" y="1" width="99%" height="96%" rx="6" ry="6"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeDasharray="8 28"
            className="group-hover:animate-[dash-red_1s_linear_infinite]"
            style={{ strokeDashoffset: 0 }}
          />
          <rect
            x="1" y="1" width="99%" height="96%" rx="6" ry="6"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="8 28"
            className="group-hover:animate-[dash-blue_1s_linear_infinite]"
            style={{ strokeDashoffset: -12 }}
          />
          <rect
            x="1" y="1" width="99%" height="96%" rx="6" ry="6"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="8 28"
            className="group-hover:animate-[dash-black_1s_linear_infinite]"
            style={{ strokeDashoffset: -24 }}
          />
        </svg>
       
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash-red {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -36; }
          }
          @keyframes dash-blue {
            from { stroke-dashoffset: -12; }
            to { stroke-dashoffset: -48; }
          }
          @keyframes dash-black {
            from { stroke-dashoffset: -24; }
            to { stroke-dashoffset: -60; }
          }
        `}} />

        <span className="text-zinc-900 dark:text-zinc-200 font-bold tracking-widest uppercase text-xs sm:text-sm group-hover:text-black dark:group-hover:text-white transition-colors">
          {label}
        </span>
      </button>
    </div>
  );
}
