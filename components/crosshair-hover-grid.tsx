"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const colors = [
  "#ff3366", // Neon Pink
  "#00ffcc", // Cyan
  "#bf00ff", // Purple
  "#ffcc00", // Yellow
  "#00ccff", // Light Blue
  "#ff3300", // Bright Red
];

export default function CrosshairHoverGrid() {
  const [mounted, setMounted] = useState(false);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const updateGrid = () => {
      // Use 80px cell size
      const cols = Math.ceil(window.innerWidth / 80);
      const rows = Math.ceil(window.innerHeight / 80);
      setGridSize({ cols, rows });
    };

    const timer = setTimeout(() => {
      setMounted(true);
      updateGrid();
    }, 0);

    window.addEventListener("resize", updateGrid);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateGrid);
    };
  }, []);

  if (!mounted) {
    return <div className="w-full h-full min-h-[400px] bg-transparent" />;
  }

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] bg-transparent text-black dark:text-white overflow-hidden">
      <div 
        className="absolute inset-0 flex flex-wrap"
        style={{
          width: `${gridSize.cols * 80}px`,
          height: `${gridSize.rows * 80}px`,
        }}
      >
        {Array.from({ length: gridSize.cols * gridSize.rows }).map((_, i) => (
          <Cell key={i} />
        ))}
      </div>
    </div>
  );
}

function Cell() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentColor, setCurrentColor] = useState(colors[0]);

  const handleMouseEnter = () => {
    setCurrentColor(colors[Math.floor(Math.random() * colors.length)]);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative w-[80px] h-[80px] border-r border-b border-black/[0.05] dark:border-white/[0.05] group overflow-hidden cursor-crosshair"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dashed diagonal lines specific to each cell */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="80" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="80" y1="0" x2="0" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Crosshair at bottom right */}
      <div className="absolute -right-[4px] -bottom-[4px] w-[9px] h-[9px] z-20 pointer-events-none opacity-50">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black dark:bg-white -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-black dark:bg-white -translate-x-1/2" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.4, ease: "easeOut" } }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute inset-0 z-10 dark:mix-blend-screen"
            style={{ backgroundColor: currentColor }}
          />
        )}
      </AnimatePresence>
      
      {/* Optional subtle glow on hover */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${currentColor}40 0%, transparent 70%)`
        }}
      />
    </div>
  );
}
