"use client";

import React, { useState } from "react";

interface DockModule {
  id: "command" | "connect" | "portfolio" | "terminal";
  icon: string;
  label: string;
  subTitle: string;
}

const MODULES: DockModule[] = [
  { id: "command", icon: "⌘", label: "COMMAND", subTitle: "Tactile Keybinds & Action Matrix" },
  { id: "connect", icon: "≍", label: "CONNECT", subTitle: "Distributed Node Telemetry" },
  { id: "portfolio", icon: "PORTFOLIO", label: "PORTFOLIO", subTitle: "Curated Spatial Artifacts" },
  { id: "terminal", icon: "⌨", label: "TERMINAL", subTitle: "Procedural WebAssembly CLI" },
];

export default function CobaltDock({ className = "" }: { className?: string } = {}) {
  const [activeModuleId, setActiveModuleId] = useState<string>("portfolio");

  // SELECT MODULE
  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
  };

  return (
    <div className={`relative w-full flex items-center justify-center gap-2 sm:gap-3 md:gap-3.5 z-20 font-sans select-none flex-nowrap ${className}`}>
      {/* MODULE 1: COMMAND SQUIRCLE [ ⌘ ] */}
      <button
        type="button"
        onClick={() => handleSelectModule("command")}
        className={`group relative h-12 sm:h-14 md:h-15 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md shrink-0 ${
          activeModuleId === "command"
            ? "bg-[#1d63ff] text-white px-4 sm:px-6 md:px-7 font-mono font-bold tracking-wider text-xs sm:text-sm md:text-base shadow-[0_0_25px_rgba(29,99,255,0.45)] scale-105"
            : "w-12 sm:w-14 md:w-15 bg-[#25282e] hover:bg-[#2e323a] text-white text-base sm:text-lg md:text-xl font-mono"
        }`}
      >
        {activeModuleId !== "command" && (
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#1d63ff] border-2 border-[#0a0c0f] shadow-[0_0_6px_#1d63ff] animate-pulse" />
        )}
        <span>{activeModuleId === "command" ? "COMMAND" : "⌘"}</span>
      </button>

      {/* MODULE 2: BRIDGE LINK SQUIRCLE [ ≍ ] */}
      <button
        type="button"
        onClick={() => handleSelectModule("connect")}
        className={`group relative h-12 sm:h-14 md:h-15 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md shrink-0 ${
          activeModuleId === "connect"
            ? "bg-[#1d63ff] text-white px-4 sm:px-6 md:px-7 font-mono font-bold tracking-wider text-xs sm:text-sm md:text-base shadow-[0_0_25px_rgba(29,99,255,0.45)] scale-105"
            : "w-12 sm:w-14 md:w-15 bg-[#25282e] hover:bg-[#2e323a] text-white text-base sm:text-lg md:text-xl font-mono"
        }`}
      >
        <span>{activeModuleId === "connect" ? "CONNECT" : "≍"}</span>
      </button>

      {/* MODULE 3: EXPANDED COBALT BLUE CAPSULE [ PORTFOLIO ] */}
      <button
        type="button"
        onClick={() => handleSelectModule("portfolio")}
        className={`group relative h-12 sm:h-14 md:h-15 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md shrink-0 ${
          activeModuleId === "portfolio"
            ? "bg-[#1d63ff] text-white px-5 sm:px-7 md:px-8 font-mono font-bold tracking-[0.14em] text-xs sm:text-sm md:text-base shadow-[0_0_28px_rgba(29,99,255,0.5)] scale-105"
            : "w-12 sm:w-14 md:w-15 bg-[#25282e] hover:bg-[#2e323a] text-white text-sm sm:text-base md:text-lg font-mono"
        }`}
      >
        {activeModuleId === "portfolio" && (
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#1d63ff] shadow-[0_0_6px_#ffffff] animate-bounce" />
        )}
        <span>{activeModuleId === "portfolio" ? "PORTFOLIO" : "◈"}</span>
      </button>

      {/* MODULE 4: KEYBOARD / CONSOLE SQUIRCLE [ ⌨ ] */}
      <button
        type="button"
        onClick={() => handleSelectModule("terminal")}
        className={`group relative h-12 sm:h-14 md:h-15 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md shrink-0 ${
          activeModuleId === "terminal"
            ? "bg-[#1d63ff] text-white px-4 sm:px-6 md:px-7 font-mono font-bold tracking-wider text-xs sm:text-sm md:text-base shadow-[0_0_25px_rgba(29,99,255,0.45)] scale-105"
            : "w-12 sm:w-14 md:w-15 bg-[#25282e] hover:bg-[#2e323a] text-white text-base sm:text-lg md:text-xl font-mono"
        }`}
      >
        <span>{activeModuleId === "terminal" ? "TERMINAL" : "⌨"}</span>
      </button>
    </div>
  );
}
