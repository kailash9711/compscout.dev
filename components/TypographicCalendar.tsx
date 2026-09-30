"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TypographicCalendarProps {
  initialDay?: number;
  initialMonth?: string;
  initialYear?: number;
  onDateChange?: (day: number, month: string, year: number) => void;
  className?: string;
}

const monthsList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];
const yearsList = Array.from({ length: 151 }, (_, i) => 1950 + i);
const columns = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

/**
 * @prop {number} initialDay - Initial active day number on calendar grid (Default: 19)
 * @prop {string} initialMonth - Initial active uppercase month abbreviation (Default: 'JUNE')
 * @prop {number} initialYear - Initial active calendar year (Default: 2026)
 * @prop {function} onDateChange - Callback fired when a day, month, or year changes (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function TypographicCalendar({
  initialDay = 19,
  initialMonth = "JUNE",
  initialYear = 2026,
  onDateChange,
  className = ""
}: TypographicCalendarProps = {}) {
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);

  const monthIndex = monthsList.indexOf(currentMonth);
  const totalDays = new Date(currentYear, monthIndex + 1, 0).getDate();
  const startDay = new Date(currentYear, monthIndex, 1).getDay();

  const paddingCells = Array.from({ length: startDay }, () => null);
  const daysArray = [...paddingCells, ...Array.from({ length: totalDays }, (_, i) => i + 1)];

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
    const newMonthIdx = monthsList.indexOf(newMonth);
    const newTotal = new Date(currentYear, newMonthIdx + 1, 0).getDate();
    const updatedDay = selectedDay > newTotal ? newTotal : selectedDay;
    if (selectedDay > newTotal) setSelectedDay(newTotal);
    onDateChange?.(updatedDay, newMonth, currentYear);
  };

  const handleYearChange = (newYear: number) => {
    setCurrentYear(newYear);
    const newTotal = new Date(newYear, monthIndex + 1, 0).getDate();
    const updatedDay = selectedDay > newTotal ? newTotal : selectedDay;
    if (selectedDay > newTotal) setSelectedDay(newTotal);
    onDateChange?.(updatedDay, currentMonth, newYear);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    onDateChange?.(day, currentMonth, currentYear);
  };

  const yearOptions = yearsList.map(y => ({ label: String(y), value: y }));

  return (
    <div className={`w-full max-w-sm mx-auto p-6 bg-zinc-950 border border-zinc-800 shadow-2xl rounded-3xl font-mono relative z-10 ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center text-xs text-zinc-400 uppercase tracking-widest pb-2 border-b border-zinc-800">
          <select
            value={currentMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="appearance-none bg-transparent outline-none cursor-pointer text-white font-bold hover:text-violet-400 transition-colors"
          >
            {monthsList.map(m => (
              <option key={m} value={m} className="bg-zinc-900 text-white">
                [ MON_{m} ]
              </option>
            ))}
          </select>
          
          <CustomSelect
            value={currentYear}
            options={yearOptions}
            onChange={handleYearChange}
            align="right"
          />
        </div>

        {/* Day Column Labels */}
        <div className="grid grid-cols-7 gap-1 text-[10px] text-zinc-500 font-bold text-center">
          {columns.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>

        {/* Grid Cells */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
          {daysArray.map((day, idx) => {
            if (day === null) {
              return <div key={`pad-${idx}`} className="h-8" />;
            }
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className="h-8 flex items-center justify-center relative cursor-pointer select-none transition-colors hover:text-white border-0 bg-transparent"
              >
                {isSelected ? (
                  <motion.span
                    layoutId="monoBox"
                    className="absolute inset-0 bg-white text-zinc-950 font-black flex items-center justify-center rounded-lg shadow-md"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  >
                    {String(day).padStart(2, "0")}
                  </motion.span>
                ) : (
                  <span className="text-zinc-400 hover:text-zinc-200">
                    {String(day).padStart(2, "0")}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info log */}
        <div className="text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-2.5 mt-1">
          <span>EVENT_SLOT: DAY_{String(selectedDay).padStart(2, "0")} is active.</span>
        </div>
      </div>
    </div>
  );
}

function CustomSelect({
  value,
  options,
  onChange,
  align = "left"
}: {
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: (v: any) => void;
  align?: "left" | "right";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || value;

  useEffect(() => {
    if (isOpen && ref.current) {
      const activeEl = ref.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="outline-none cursor-pointer text-white font-bold hover:text-violet-400 transition-colors flex items-center gap-1"
      >
        {selectedLabel}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-1 ${align === "right" ? "right-0" : "left-0"} min-w-[90px] max-h-52 overflow-y-auto bg-zinc-900 border border-zinc-700 shadow-2xl rounded-xl z-50 flex flex-col p-1 [&::-webkit-scrollbar]:hidden`}
          >
            {options.map((opt) => {
              const isActive = value === opt.value;
              return (
                <button
                  key={opt.value}
                  data-active={isActive}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`text-center px-3 py-2 text-xs rounded-lg transition-colors flex-shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-zinc-800 text-white font-bold"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
