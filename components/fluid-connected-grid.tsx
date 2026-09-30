"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

const GRID_W = 12;
const GRID_H = 10;
const CELL_SIZE = 48;

export default function FluidConnectedGrid() {
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set());
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const handleMouseEnter = (index: number) => {
    setActiveCells((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });

    if (timeoutRefs.current.has(index)) {
      clearTimeout(timeoutRefs.current.get(index)!);
    }

    const timeout = setTimeout(() => {
      setActiveCells((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }, 2000); // 2 seconds fade out

    timeoutRefs.current.set(index, timeout);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-transparent flex items-center justify-center overflow-hidden font-sans col-span-1 text-zinc-900 dark:text-zinc-100">
      
      {/* Title / Label */}
      <div className="absolute top-8 left-8 z-30">
        <div className="px-4 py-2 border border-black/5 dark:border-white/10 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-sm text-sm font-medium text-zinc-600 dark:text-zinc-400 shadow-sm transition-colors">
          Interactive Surface
        </div>
      </div>

      {/* SVG Filter for Gooey Effect */}
      <svg className="absolute w-0 h-0" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo-effect">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      <div className="relative" style={{ width: GRID_W * CELL_SIZE, height: GRID_H * CELL_SIZE }}>
        
        {/* Grid Lines */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
          }}
        >
          {/* Outer borders to complete the grid visually */}
          <div className="absolute top-0 right-0 w-[1px] h-full bg-current" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-current" />
        </div>

        {/* Gooey Blobs Layer */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{ filter: "url('#goo-effect')" }}
        >
          {Array.from({ length: GRID_W * GRID_H }).map((_, i) => {
            const isActive = activeCells.has(i);
            const x = (i % GRID_W) * CELL_SIZE;
            const y = Math.floor(i / GRID_W) * CELL_SIZE;

            return (
              <motion.div
                key={i}
                className="absolute bg-zinc-900 dark:bg-zinc-100" // Adaptive blob color
                initial={false}
                animate={{
                  // Overlap active cells so they merge via gooey filter
                  width: isActive ? CELL_SIZE + 8 : 0,
                  height: isActive ? CELL_SIZE + 8 : 0,
                  x: isActive ? x - 4 : x + CELL_SIZE / 2,
                  y: isActive ? y - 4 : y + CELL_SIZE / 2,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                style={{
                  borderRadius: "12px", // base rounding before goo
                }}
              />
            );
          })}
        </div>

        {/* Interactive Overlay */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_W}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_H}, ${CELL_SIZE}px)`,
          }}
        >
          {Array.from({ length: GRID_W * GRID_H }).map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => handleMouseEnter(i)}
              // onTouchStart={() => handleMouseEnter(i)}
              className="w-full h-full cursor-crosshair"
            />
          ))}
        </div>
      </div>

    </div>
  );
}
