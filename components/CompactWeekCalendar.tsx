"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CompactWeekCalendarProps {
  title?: string;
  monthYear?: string;
  weekDays?: string[];
  startDayNumber?: number;
  tasks?: Record<number, string[]>;
  defaultSelectedDay?: number;
  onDaySelect?: (dayIndex: number, dayName: string, dayTasks: string[]) => void;
  className?: string;
}

const defaultWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const defaultTasks: Record<number, string[]> = {
  0: ["Weekly Overview", "Relax & Recharge"],
  1: ["Sprint Planning - 10 AM", "Review Dashboard UI Docs"],
  2: ["API Schema Sync - 2 PM", "Code Refactor session"],
  3: ["Mid-Week Sync - 11 AM", "Frontend QA Audit"],
  4: ["Design Feedback - 3 PM", "Deploy Staging Build"],
  5: ["Retrospective - 4 PM", "Bug Triage Session"],
  6: ["Weekend Clean Run", "Write Dev Log Summary"],
};

/**
 * @prop {string} title - Header badge category label (Default: 'Weekly Agenda')
 * @prop {string} monthYear - Month and year label string (Default: 'June 2026')
 * @prop {string[]} weekDays - Array of day initials (Default: 7 standard days)
 * @prop {number} startDayNumber - Day of the month representing the first day in the week strip (Default: 15)
 * @prop {Record<number, string[]>} tasks - Hashmap of index to task schedule array (Default: 7 daily schedule lists)
 * @prop {number} defaultSelectedDay - 0-indexed initially highlighted day of the week (Default: 1)
 * @prop {function} onDaySelect - Callback fired when a day strip button is clicked (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function CompactWeekCalendar({
  title = "Weekly Agenda",
  monthYear = "June 2026",
  weekDays = defaultWeekDays,
  startDayNumber = 15,
  tasks = defaultTasks,
  defaultSelectedDay = 1,
  onDaySelect,
  className = ""
}: CompactWeekCalendarProps = {}) {
  const [selectedDay, setSelectedDay] = useState(defaultSelectedDay);

  const handleSelect = (idx: number) => {
    setSelectedDay(idx);
    onDaySelect?.(idx, weekDays[idx], tasks[idx] || []);
  };

  return (
    <div className={`w-full max-w-sm mx-auto p-6 bg-zinc-950 border border-zinc-900 rounded-3xl backdrop-blur-xl shadow-2xl font-sans ${className}`}>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{title}</span>
          <span className="text-xs font-semibold text-zinc-300">{monthYear}</span>
        </div>

        {/* 7-Day Strip */}
        <div className="flex justify-between gap-1">
          {weekDays.map((dayName, idx) => {
            const isSelected = selectedDay === idx;
            const dateNum = startDayNumber + idx;
            return (
              <button
                key={dayName}
                onClick={() => handleSelect(idx)}
                className="flex-1 flex flex-col items-center gap-1.5 py-2 rounded-xl cursor-pointer select-none transition-all group border-0 bg-transparent"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300">
                  {dayName}
                </span>
                <motion.div
                  animate={{
                    backgroundColor: isSelected ? "#3b82f6" : "rgba(255, 255, 255, 0)",
                    color: isSelected ? "#ffffff" : "#d4d4d8",
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors group-hover:bg-zinc-900/60"
                >
                  {dateNum}
                </motion.div>
                {isSelected && (
                  <motion.span
                    layoutId="activeDot"
                    className="h-1 w-1 rounded-full bg-blue-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Daily Tasks Details */}
        <div className="pt-4 border-t border-zinc-900/80 min-h-[90px]">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
              {weekDays[selectedDay]}'s Schedule
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-2"
              >
                {(tasks[selectedDay] || []).map((task, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2 bg-zinc-900/50 border border-zinc-800/80 rounded-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span className="text-xs text-zinc-300 font-medium">{task}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
