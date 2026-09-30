"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

interface RoomType {
  id: string;
  name: string;
  category: "Offices" | "Meeting rooms";
  capacity: string;
  rate: string;
}

const ROOM_TYPES: RoomType[] = [
  { id: "offices", name: "Offices", category: "Offices", capacity: "1-2 People", rate: "$45/hr" },
  { id: "meeting-rooms", name: "Meeting rooms", category: "Meeting rooms", capacity: "4-8 Participants", rate: "$75/hr" },
];

export default function AtelierDock({ className = "" }: { className?: string } = {}) {
  const [selectedType, setSelectedType] = useState<string>("Meeting rooms");
  const [selectedCategory, setSelectedCategory] = useState<string>("Meeting rooms");
  const [selectedAbility, setSelectedAbility] = useState<string>("6-8 Participants");
  const [selectedDate, setSelectedDate] = useState<string>("01/06/2025");
  const [activeDropdown, setActiveDropdown] = useState<"type" | "ability" | "date" | null>("type");
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // TOGGLE DROPDOWN
  const toggleDropdown = (menu: "type" | "ability" | "date") => {
    const next = activeDropdown === menu ? null : menu;
    setActiveDropdown(next);
  };

  // HANDLE BOOKING
  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBooked(true);
    setActiveDropdown(null);
  };

  return (
    <div className={`relative w-full max-w-full flex flex-col items-center justify-center pt-36 pb-6 px-2 font-sans select-none overflow-visible ${className}`}>
      {/* ========================================================================= */}
      {/* MAIN STAGE: THE SEGMENTED BOOKING BAR & FLOATING DROPDOWN                 */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-xl">
        
        {/* ===================================================================== */}
        {/* 1. FLOATING FLYOUT MENUS                                              */}
        {/* ===================================================================== */}
        
        {/* FLYOUT 1: ROOM TYPE (EXACTLY 2 OPTIONS) */}
        {activeDropdown === "type" && (
          <div
            className="absolute bottom-full mb-2.5 left-0 w-48 sm:w-52 rounded-2xl p-2 border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 bg-white/95 dark:bg-[#181a20]/95 backdrop-blur-xl border-zinc-200/90 dark:border-white/15 text-zinc-900 dark:text-white"
          >
            {/* Option 1: Offices with Toggle Switch */}
            <div
              onClick={() => {
                const nextType = selectedType === "Offices" ? "Meeting rooms" : "Offices";
                setSelectedType(nextType);
                setSelectedCategory(nextType);
              }}
              className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
            >
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Offices</span>
              <div
                className={`w-8 h-4.5 rounded-full p-0.5 transition-colors flex items-center ${
                  selectedType === "Offices"
                    ? "bg-zinc-900 dark:bg-white justify-end"
                    : "bg-zinc-300 dark:bg-zinc-700 justify-start"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full shadow-xs ${
                    selectedType === "Offices"
                      ? "bg-white dark:bg-zinc-900"
                      : "bg-white dark:bg-zinc-300"
                  }`}
                />
              </div>
            </div>

            {/* Option 2: Meeting Rooms */}
            <button
              type="button"
              onClick={() => {
                setSelectedType("Meeting rooms");
                setSelectedCategory("Meeting rooms");
                setActiveDropdown(null);
              }}
              className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between mt-1 ${
                selectedType === "Meeting rooms"
                  ? "bg-zinc-100 dark:bg-white/15 text-zinc-950 dark:text-white font-bold shadow-xs"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-white/5 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              <span>Meeting rooms</span>
              {selectedType === "Meeting rooms" && (
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
              )}
            </button>
          </div>
        )}

        {/* FLYOUT 2: ABILITY / PARTICIPANTS (EXACTLY 2 OPTIONS) */}
        {activeDropdown === "ability" && (
          <div
            className="absolute bottom-full mb-2.5 left-1/4 sm:left-1/3 w-44 rounded-2xl p-2 border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 bg-white/95 dark:bg-[#181a20]/95 backdrop-blur-xl border-zinc-200/90 dark:border-white/15 text-zinc-900 dark:text-white"
          >
            <div className="space-y-1">
              {["2-4 People", "6-8 Participants"].map((cap) => {
                const isSelected = selectedAbility === cap;
                return (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => {
                      setSelectedAbility(cap);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    <span>{cap}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white dark:text-zinc-950 shrink-0 stroke-[2.5]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* FLYOUT 3: DATE PICKER DROPDOWN */}
        {activeDropdown === "date" && (
          <div
            className="absolute bottom-full mb-2.5 right-8 sm:right-16 w-52 rounded-2xl p-2.5 border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 bg-white/95 dark:bg-[#181a20]/95 backdrop-blur-xl border-zinc-200/90 dark:border-white/15 text-zinc-900 dark:text-white"
          >
            <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2 px-1">
              Select Date (2025)
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { label: "01/06", val: "01/06/2025" },
                { label: "02/06", val: "02/06/2025" },
                { label: "03/06", val: "03/06/2025" },
                { label: "04/06", val: "04/06/2025" },
                { label: "05/06", val: "05/06/2025" },
                { label: "06/06", val: "06/06/2025" },
              ].map((d) => {
                const isSelected = selectedDate.startsWith(d.label);
                return (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => {
                      setSelectedDate(d.val);
                      setActiveDropdown(null);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 2. THE MAIN SEGMENTED BOOKING BAR                                     */}
        {/* ===================================================================== */}
        <div
          className="w-full rounded-[20px] sm:rounded-[24px] p-1.5 sm:p-2 border shadow-sm flex items-center justify-between transition-all duration-300 bg-white dark:bg-[#16181d] border-zinc-200/90 dark:border-white/10 text-zinc-900 dark:text-white"
        >
          {/* Column 1: Type */}
          <div
            onClick={() => toggleDropdown("type")}
            className={`flex-1 min-w-0 px-2 sm:px-3 py-1 flex flex-col justify-center rounded-xl transition-colors cursor-pointer ${
              activeDropdown === "type"
                ? "bg-zinc-100 dark:bg-white/10"
                : "hover:bg-zinc-100/70 dark:hover:bg-white/5"
            }`}
          >
            <span className="text-[9px] sm:text-[10px] font-medium text-zinc-400 dark:text-zinc-500 leading-none mb-0.5">
              Type
            </span>
            <div className="flex items-center justify-between pr-0.5">
              <span className="text-[11px] sm:text-xs font-semibold tracking-tight truncate text-zinc-900 dark:text-zinc-100">
                {selectedType}
              </span>
              {activeDropdown === "type" ? (
                <ChevronUp className="w-3 h-3 text-zinc-500 ml-0.5 shrink-0" />
              ) : (
                <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5 shrink-0" />
              )}
            </div>
          </div>

          {/* Vertical Divider 1 */}
          <div className="w-[1px] h-6 bg-zinc-200 dark:bg-white/10 mx-0.5 shrink-0" />

          {/* Column 2: Ability / Participants */}
          <div
            onClick={() => toggleDropdown("ability")}
            className={`flex-1 min-w-0 px-2 sm:px-3 py-1 flex flex-col justify-center rounded-xl transition-colors cursor-pointer ${
              activeDropdown === "ability"
                ? "bg-zinc-100 dark:bg-white/10"
                : "hover:bg-zinc-100/70 dark:hover:bg-white/5"
            }`}
          >
            <span className="text-[9px] sm:text-[10px] font-medium text-zinc-400 dark:text-zinc-500 leading-none mb-0.5">
              Ability
            </span>
            <div className="flex items-center justify-between pr-0.5">
              <span className="text-[11px] sm:text-xs font-semibold tracking-tight truncate text-zinc-900 dark:text-zinc-100">
                {selectedAbility}
              </span>
              {activeDropdown === "ability" ? (
                <ChevronUp className="w-3 h-3 text-zinc-500 ml-0.5 shrink-0" />
              ) : (
                <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5 shrink-0" />
              )}
            </div>
          </div>

          {/* Vertical Divider 2 */}
          <div className="w-[1px] h-6 bg-zinc-200 dark:bg-white/10 mx-0.5 shrink-0" />

          {/* Column 3: Date */}
          <div
            onClick={() => toggleDropdown("date")}
            className={`flex-1 min-w-0 px-2 sm:px-3 py-1 flex flex-col justify-center rounded-xl transition-colors cursor-pointer ${
              activeDropdown === "date"
                ? "bg-zinc-100 dark:bg-white/10"
                : "hover:bg-zinc-100/70 dark:hover:bg-white/5"
            }`}
          >
            <span className="text-[9px] sm:text-[10px] font-medium text-zinc-400 dark:text-zinc-500 leading-none mb-0.5">
              Date
            </span>
            <div className="flex items-center justify-between pr-0.5">
              <span className="text-[11px] sm:text-xs font-semibold tracking-tight truncate text-zinc-900 dark:text-zinc-100">
                {selectedDate}
              </span>
              {activeDropdown === "date" ? (
                <ChevronUp className="w-3 h-3 text-zinc-500 ml-0.5 shrink-0" />
              ) : (
                <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5 shrink-0" />
              )}
            </div>
          </div>

          {/* Far Right: Solid CTA Button [ Book ] */}
          <button
            type="button"
            onClick={handleBook}
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs tracking-tight shadow-sm hover:scale-102 active:scale-95 transition-all cursor-pointer shrink-0 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 ml-1"
          >
            Book
          </button>
        </div>

        {/* ===================================================================== */}
        {/* 3. CONFIRMATION DOSSIER CARD (Appears upon clicking Book)             */}
        {/* ===================================================================== */}
        {isBooked && (
          <div
            className="mt-3 w-full rounded-2xl p-3 sm:p-4 border shadow-md animate-in fade-in zoom-in-95 duration-200 bg-white dark:bg-[#16181d] border-zinc-200/90 dark:border-white/10 text-zinc-800 dark:text-white"
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/10 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  Reservation Confirmed
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">#4028</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-xs mb-2">
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 truncate">
                <span className="block text-[9px] font-mono text-zinc-400">Space</span>
                <strong className="block text-xs truncate text-zinc-900 dark:text-white">{selectedType}</strong>
              </div>
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 truncate">
                <span className="block text-[9px] font-mono text-zinc-400">Capacity</span>
                <strong className="block text-xs truncate text-zinc-900 dark:text-white">{selectedAbility}</strong>
              </div>
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 truncate">
                <span className="block text-[9px] font-mono text-zinc-400">Date</span>
                <strong className="block text-xs truncate text-zinc-900 dark:text-white">{selectedDate}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-zinc-200/60 dark:border-white/5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
              <span>✓ Key Generated</span>
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Book Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

