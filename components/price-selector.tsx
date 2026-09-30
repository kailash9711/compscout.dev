"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function PriceSelector() {
  const [price, setPrice] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePrice = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setPrice(Math.round(percentage * 1000));
  };

  return (
    <div className="flex items-center justify-center p-12 w-full min-h-[300px]">
      <div className="relative flex flex-col items-center">
        {/* Hovering Price Tag */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -20, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute -top-14 bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl text-lg font-black tracking-tight shadow-[0_10px_20px_rgba(0,0,0,0.15)] tabular-nums pointer-events-none z-20"
            >
              ${price}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          ref={containerRef}
          onPointerDown={(e) => {
            setIsDragging(true);
            e.currentTarget.setPointerCapture(e.pointerId);
            updatePrice(e.clientX);
          }}
          onPointerMove={(e) => isDragging && updatePrice(e.clientX)}
          onPointerUp={(e) => {
            setIsDragging(false);
            e.currentTarget.releasePointerCapture(e.pointerId);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-[280px] h-16 bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden cursor-ew-resize flex items-center touch-none select-none shadow-inner border border-black/5 dark:border-white/5"
        >
          {/* Track Fill */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-zinc-900 dark:bg-white rounded-r-3xl z-0"
            animate={{ width: `${(price / 1000) * 100}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
          />
          
          <div className="absolute inset-0 flex justify-between items-center px-5 pointer-events-none z-10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-400 mix-blend-difference"><path d="M5 12h14"/></svg>
            <span className={`font-black tabular-nums mix-blend-difference text-zinc-100 dark:text-zinc-900 text-lg ${isDragging ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
              ${price}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-400 mix-blend-difference"><path d="M12 5v14M5 12h14"/></svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
