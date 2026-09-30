"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SwipeDayEntry {
  offset: number;
  date: string;
  title: string;
  desc: string;
}

export interface SwipeOverlayCalendarProps {
  title?: string;
  daysData?: SwipeDayEntry[];
  initialOffset?: number;
  onChange?: (entry: SwipeDayEntry) => void;
  className?: string;
}

const defaultDaysData: SwipeDayEntry[] = [
  { offset: -1, date: "Yesterday, June 19", title: "API Endpoint Testing", desc: "Successfully resolved replication delays across the staging container cluster nodes." },
  { offset: 0, date: "Today, June 20", title: "Dashboard Redesign Sync", desc: "Design feedback review with stakeholders on components layout and responsive UI." },
  { offset: 1, date: "Tomorrow, June 21", title: "Release Build V2", desc: "Pipeline build generation and deployment preparation for release production clusters." },
];

/**
 * @prop {string} title - Header badge category label (Default: 'Swipe Schedule')
 * @prop {SwipeDayEntry[]} daysData - List of schedule slide entries mapped by offset (Default: 3 daily entries)
 * @prop {number} initialOffset - 0 represents today, -1 yesterday, 1 tomorrow (Default: 0)
 * @prop {function} onChange - Callback fired when current schedule card switches (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function SwipeOverlayCalendar({
  title = "Swipe Schedule",
  daysData = defaultDaysData,
  initialOffset = 0,
  onChange,
  className = ""
}: SwipeOverlayCalendarProps = {}) {
  const [dayOffset, setDayOffset] = useState(initialOffset);

  const minOffset = Math.min(...daysData.map(d => d.offset));
  const maxOffset = Math.max(...daysData.map(d => d.offset));

  const handleNext = () => {
    if (dayOffset < maxOffset) {
      const next = dayOffset + 1;
      setDayOffset(next);
      const found = daysData.find(d => d.offset === next);
      if (found) onChange?.(found);
    }
  };

  const handlePrev = () => {
    if (dayOffset > minOffset) {
      const next = dayOffset - 1;
      setDayOffset(next);
      const found = daysData.find(d => d.offset === next);
      if (found) onChange?.(found);
    }
  };

  const current = daysData.find(d => d.offset === dayOffset) || daysData[0];

  return (
    <div className={`w-full max-w-sm mx-auto p-6 bg-zinc-950/80 border border-zinc-900 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col gap-5 font-sans ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{title}</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={dayOffset <= minOffset}
            className="p-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 disabled:opacity-30 enabled:hover:text-white cursor-pointer select-none transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button
            onClick={handleNext}
            disabled={dayOffset >= maxOffset}
            className="p-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 disabled:opacity-30 enabled:hover:text-white cursor-pointer select-none transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>

      <div className="relative min-h-[110px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={dayOffset}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex flex-col gap-2"
          >
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wide">{current.date}</span>
            <h4 className="text-sm font-bold text-white">{current.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">{current.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
