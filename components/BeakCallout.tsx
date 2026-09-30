"use client";

import React, { useState } from "react";



interface WordToken {
  id: number;
  text: string;
}

const SAMPLE_WORDS: string[] = [
  "Compscout",
  "engine",
  "synthesizes",
  "tactile",
  "micro-interactions",
  "with",
  "zero-latency",
  "haptic",
  "audio",
  "feedback.",
];

export default function BeakCallout({ className = "" }: { className?: string } = {}) {
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0); // word index where bubble is anchored
  const [currentPage, setCurrentPage] = useState<1 | 2>(1); // 1 = Select | Select All | Paste | ▶
  const [selectedWordRange, setSelectedWordRange] = useState<number[]>([0]);
  const [clipboardData, setClipboardData] = useState<string>("neural");
  const [words, setWords] = useState<string[]>(SAMPLE_WORDS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // TOAST
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1800);
  };

  // SELECT WORD
  const handleWordClick = (index: number) => {
    setActiveWordIndex(index);
    setSelectedWordRange([index]);
  };

  // ACTION DISPATCHER
  const handleAction = (actionName: string) => {
    if (actionName === "Select") {
      setSelectedWordRange([activeWordIndex]);
      triggerToast(`✓ Selected "${words[activeWordIndex]}"`);
    } else if (actionName === "Select All") {
      setSelectedWordRange(words.map((_, i) => i));
      triggerToast("✓ Selected All Words");
    } else if (actionName === "Paste") {
      const updated = [...words];
      updated.splice(activeWordIndex + 1, 0, clipboardData);
      setWords(updated);
      setSelectedWordRange([activeWordIndex + 1]);
      setActiveWordIndex(activeWordIndex + 1);
      triggerToast(`📄 Pasted "${clipboardData}"`);
    } else if (actionName === "Look Up") {
      triggerToast(`🔍 Looked up: ${words[activeWordIndex]}`);
    } else if (actionName === "AI Polish") {
      const updated = [...words];
      updated[activeWordIndex] = "hyper-tactile";
      setWords(updated);
      triggerToast("✨ AI Polished word");
    } else if (actionName === "Quote") {
      const updated = [...words];
      updated[activeWordIndex] = `"${words[activeWordIndex]}"`;
      setWords(updated);
      triggerToast("❝ Quoted word");
    }
  };

  // PAGINATION
  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handlePrevPage = () => {
    setCurrentPage(1);
  };

  // RESET
  const handleReset = () => {
    setWords(SAMPLE_WORDS);
    setActiveWordIndex(0);
    setSelectedWordRange([0]);
    setCurrentPage(1);
  };

  return (
    <div className={`relative w-full flex flex-col items-center justify-center py-6 px-2 font-sans select-none ${className}`}>
      {/* ======================================================================= */}
      {/* 1. THE FLOATING DARK SPEECH-BUBBLE CALLOUT WITH TAIL                    */}
      {/* ======================================================================= */}
      <div className="relative mb-5 z-20">
        <div
          className="relative rounded-[14px] bg-[#2a2b2e] text-white shadow-2xl flex items-center transition-all duration-300 border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
        >
          {/* BOTTOM-LEFT POINTING ARROW / BEAK TAIL */}
          <div
            className="absolute -bottom-1.5 left-6 w-3.5 h-3.5 bg-[#2a2b2e] rotate-45 border-r border-b border-white/10"
          />

          {/* PAGE 1: PRIMARY ACTIONS (Select | Select All | Paste | ▶) */}
          {currentPage === 1 && (
            <div className="flex items-center animate-in fade-in duration-150">
              {/* 1. Select */}
              <button
                onClick={() => handleAction("Select")}
                className="px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer rounded-l-[14px]"
              >
                Select
              </button>

              <div className="w-[1px] h-4 bg-white/20" />

              {/* 2. Select All */}
              <button
                onClick={() => handleAction("Select All")}
                className="px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer whitespace-nowrap"
              >
                Select All
              </button>

              <div className="w-[1px] h-4 bg-white/20" />

              {/* 3. Paste */}
              <button
                onClick={() => handleAction("Paste")}
                className="px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer"
              >
                Paste
              </button>

              <div className="w-[1px] h-4 bg-white/20" />

              {/* 4. Solid Triangle Arrow Playhead [ ▶ ] */}
              <button
                onClick={handleNextPage}
                className="px-3.5 py-2.5 sm:py-3 hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer rounded-r-[14px] flex items-center justify-center"
                title="More options"
              >
                <div
                  className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white"
                />
              </button>
            </div>
          )}

          {/* PAGE 2: OVERFLOW ACTIONS */}
          {currentPage === 2 && (
            <div className="flex items-center animate-in fade-in duration-150">
              {/* Back Arrow [ ◀ ] */}
              <button
                onClick={handlePrevPage}
                className="px-3.5 py-2.5 sm:py-3 hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer rounded-l-[14px] flex items-center justify-center"
                title="Back"
              >
                <div
                  className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[8px] border-r-white"
                />
              </button>

              <div className="w-[1px] h-4 bg-white/20" />

              {/* 1. Look Up */}
              <button
                onClick={() => handleAction("Look Up")}
                className="px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer whitespace-nowrap"
              >
                Look Up 🔍
              </button>

              <div className="w-[1px] h-4 bg-white/20" />

              {/* 2. AI Polish */}
              <button
                onClick={() => handleAction("AI Polish")}
                className="px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer whitespace-nowrap"
              >
                AI Polish ✨
              </button>

              <div className="w-[1px] h-4 bg-white/20" />

              {/* 3. Quote */}
              <button
                onClick={() => handleAction("Quote")}
                className="px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer rounded-r-[14px]"
              >
                Quote ❝
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. INTERACTIVE WORD-SNAPPING ARTICLE CANVAS                              */}
      {/* ======================================================================= */}
      <div
        className="w-full max-w-xl rounded-[24px] p-5 sm:p-6 border shadow-md transition-all duration-300 bg-[#fafbfc] dark:bg-[#14161a] border-neutral-200/90 dark:border-white/10 text-neutral-900 dark:text-white"
      >
        <div className="flex items-center justify-between pb-2.5 border-b border-current/10 mb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-40">
            Click any word to anchor callout
          </span>
          <span className="text-[10px] font-mono opacity-50">
            Word #{activeWordIndex + 1}
          </span>
        </div>

        {/* Render Clickable Words */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 text-sm sm:text-base leading-relaxed font-serif">
          {words.map((word, idx) => {
            const isTargeted = activeWordIndex === idx;
            const isSelected = selectedWordRange.includes(idx);

            return (
              <button
                key={`${word}-${idx}`}
                onClick={() => handleWordClick(idx)}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-400/25 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 font-bold underline decoration-amber-500 decoration-2"
                    : isTargeted
                    ? "bg-neutral-200 dark:bg-white/15 font-semibold"
                    : "hover:bg-neutral-100 dark:hover:bg-white/5"
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>

        {/* Toast Notification Bar */}
        {toastMessage && (
          <div className="mt-3 p-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-bold text-center animate-in fade-in duration-150">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
