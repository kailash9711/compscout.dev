"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

export interface WordItem {
  text: string;
  color?: string;
}

export interface WordSnapCursorProps {
  words?: WordItem[];
  className?: string;
}

const defaultWords: WordItem[] = [
  { text: "Design", color: "from-violet-500 to-purple-500" },
  { text: "Animate", color: "from-fuchsia-500 to-pink-500" },
  { text: "Inspire", color: "from-amber-400 to-orange-500" },
  { text: "Build", color: "from-emerald-400 to-teal-500" },
  { text: "Ship", color: "from-cyan-400 to-blue-500" },
  { text: "Create", color: "from-rose-400 to-red-500" },
  { text: "Scale", color: "from-indigo-400 to-violet-500" },
  { text: "Launch", color: "from-lime-400 to-emerald-500" },
];

const springCfg = { stiffness: 350, damping: 28, mass: 0.5 };

/**
 * @prop {WordItem[]} words - List of words for magnetic cursor snapping (Default: 8 creative terms)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function WordSnapCursor({
  words = defaultWords,
  className = ""
}: WordSnapCursorProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<string | null>(null);

  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string>("from-violet-500 to-purple-500");
  const [isInside, setIsInside] = useState(false);

  // Target motion values
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetWidth = useMotionValue(14);
  const targetHeight = useMotionValue(14);
  const targetRadius = useMotionValue(999);

  // Smooth spring animated values
  const cursorX = useSpring(targetX, springCfg);
  const cursorY = useSpring(targetY, springCfg);
  const width = useSpring(targetWidth, springCfg);
  const height = useSpring(targetHeight, springCfg);
  const borderRadius = useSpring(targetRadius, springCfg);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // CONTAINER POINTER HANDLERS
  const handleContainerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsInside(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    targetX.set(mx);
    targetY.set(my);
    cursorX.jump(mx);
    cursorY.jump(my);
  };

  const handleContainerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isInside) setIsInside(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (!activeWordRef.current) {
      targetX.set(mx);
      targetY.set(my);
    }
  };

  const handleContainerLeave = () => {
    setIsInside(false);
    activeWordRef.current = null;
    setActiveWord(null);
    targetWidth.set(14);
    targetHeight.set(14);
    targetRadius.set(999);
  };

  // WORD MAGNETIC SNAP HANDLERS
  const handleWordEnter = (e: React.PointerEvent<HTMLSpanElement>, word: WordItem) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const wordRect = e.currentTarget.getBoundingClientRect();

    const cx = wordRect.left - containerRect.left + wordRect.width / 2;
    const cy = wordRect.top - containerRect.top + wordRect.height / 2;

    activeWordRef.current = word.text;
    setActiveWord(word.text);
    setActiveColor(word.color || "from-violet-500 to-purple-500");

    targetX.set(cx);
    targetY.set(cy);
    targetWidth.set(wordRect.width + 18);
    targetHeight.set(wordRect.height + 10);
    targetRadius.set(10);

    glowX.set(cx);
    glowY.set(cy);
  };

  const handleWordMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const wordRect = e.currentTarget.getBoundingClientRect();

    const cx = wordRect.left - containerRect.left + wordRect.width / 2;
    const cy = wordRect.top - containerRect.top + wordRect.height / 2;
    const mx = e.clientX - containerRect.left;
    const my = e.clientY - containerRect.top;

    // Fluid tactile magnetic micro-displacement
    targetX.set(cx + (mx - cx) * 0.16);
    targetY.set(cy + (my - cy) * 0.16);
  };

  const handleWordLeave = () => {
    activeWordRef.current = null;
    setActiveWord(null);
    targetWidth.set(14);
    targetHeight.set(14);
    targetRadius.set(999);
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={handleContainerEnter}
      onPointerMove={handleContainerMove}
      onPointerLeave={handleContainerLeave}
      className={`relative w-full flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3 cursor-none select-none font-sans py-2 px-1 ${className}`}
    >
      {/* Words */}
      {words.map((w, i) => (
        <motion.span
          key={i}
          onPointerEnter={(e) => handleWordEnter(e, w)}
          onPointerMove={handleWordMove}
          onPointerLeave={handleWordLeave}
          animate={{
            scale: activeWord === w.text ? 1.08 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`cursor-none font-bold text-xs sm:text-sm md:text-base select-none relative z-10 px-2 py-1 transition-colors duration-200 ${
            activeWord === w.text
              ? "text-zinc-950 dark:text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          {w.text}
        </motion.span>
      ))}

      {/* Snap Magnetic Cursor Element */}
      <motion.div
        style={{
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width,
          height,
          borderRadius,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isInside ? 1 : 0,
          scale: isInside ? 1 : 0.5,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.15 },
        }}
        className={`absolute pointer-events-none transition-colors duration-200 ${
          activeWord
            ? "border-2 border-violet-500/50 dark:border-violet-400/60 bg-violet-500/15 dark:bg-violet-400/20 backdrop-blur-xs shadow-md"
            : "bg-violet-600 dark:bg-violet-400 border-2 border-white dark:border-zinc-950 shadow-md"
        }`}
      />

      {/* Glow behind active word */}
      <AnimatePresence>
        {activeWord && (
          <motion.div
            key={activeWord}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{
              left: 0,
              top: 0,
              x: glowX,
              y: glowY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className={`absolute w-28 h-12 rounded-2xl bg-gradient-to-r ${activeColor} blur-xl pointer-events-none`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
