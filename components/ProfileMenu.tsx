"use client";

import React, { useState } from "react";
import {
  Home,
  FileText,
  Activity,
  Hexagon,
  User,
  BookOpen,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Lock,
} from "lucide-react";

export default function ProfileMenu({ className = "" }: { className?: string } = {}) {
  const [activeItem, setActiveItem] = useState<string>("Overview");
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | "system">("light"); // default matching image!
  const [isSignedOut, setIsSignedOut] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // TOAST
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1800);
  };

  // SELECT ITEM
  const handleSelectItem = (label: string) => {
    setActiveItem(label);

    if (label === "Sign out") {
      setIsSignedOut(true);
      triggerToast("🔒 Signed out of session");
    } else {
      triggerToast(`Opened ${label}`);
    }
  };

  // SWITCH THEME
  const handleThemeSwitch = (t: "light" | "dark" | "system") => {
    setSelectedTheme(t);
    triggerToast(`Theme set to ${t.toUpperCase()}`);
  };

  // RESET
  const handleReset = () => {
    setActiveItem("Overview");
    setSelectedTheme("light");
    setIsSignedOut(false);
  };

  const isDarkModeActive =
    selectedTheme === "dark" ||
    (selectedTheme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className={`relative w-full flex flex-col items-center justify-center py-6 px-2 font-sans select-none ${className}`}>
      {/* The Elevated Popover Card Container */}
      <div
        className={`w-72 sm:w-80 rounded-[28px] p-4.5 sm:p-5 border shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between ${
          isDarkModeActive
            ? "bg-[#181a1f] border-white/10 text-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            : "bg-[#f8f7f5] border-neutral-200/90 text-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
        }`}
      >
        {/* SECTION 1: PRIMARY NAVIGATION LINKS */}
        <div className="space-y-1">
          {/* 1. Overview */}
          <button
            onClick={() => handleSelectItem("Overview")}
            className={`w-full px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium flex items-center gap-3 transition-all cursor-pointer ${
              activeItem === "Overview"
                ? isDarkModeActive
                  ? "bg-white/10 font-bold text-white"
                  : "bg-black/5 font-bold text-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Overview</span>
          </button>

          {/* 2. Canvases */}
          <button
            onClick={() => handleSelectItem("Canvases")}
            className={`w-full px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium flex items-center gap-3 transition-all cursor-pointer ${
              activeItem === "Canvases"
                ? isDarkModeActive
                  ? "bg-white/10 font-bold text-white"
                  : "bg-black/5 font-bold text-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Canvases</span>
          </button>

          {/* 3. Live Stream */}
          <button
            onClick={() => handleSelectItem("Live Stream")}
            className={`w-full px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium flex items-center gap-3 transition-all cursor-pointer ${
              activeItem === "Live Stream"
                ? isDarkModeActive
                  ? "bg-white/10 font-bold text-white"
                  : "bg-black/5 font-bold text-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <Activity className="w-4 h-4 shrink-0" />
            <span>Live Stream</span>
          </button>

          {/* 4. System Config */}
          <button
            onClick={() => handleSelectItem("System Config")}
            className={`w-full px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium flex items-center gap-3 transition-all cursor-pointer ${
              activeItem === "System Config"
                ? isDarkModeActive
                  ? "bg-white/10 font-bold text-white"
                  : "bg-black/5 font-bold text-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <Hexagon className="w-4 h-4 shrink-0" />
            <span>System Config</span>
          </button>
        </div>

        {/* Hairline Divider Line */}
        <div
          className={`w-full h-[1px] my-2.5 ${
            isDarkModeActive ? "bg-white/10" : "bg-neutral-200/80"
          }`}
        />

        {/* SECTION 2: UTILITIES & SIGN OUT */}
        <div className="space-y-1">
          {/* 5. Account & Security */}
          <button
            onClick={() => handleSelectItem("Account & Security")}
            className={`w-full px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium flex items-center gap-3 transition-all cursor-pointer ${
              activeItem === "Account & Security"
                ? isDarkModeActive
                  ? "bg-white/10 font-bold text-white"
                  : "bg-black/5 font-bold text-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Account & Security</span>
          </button>

          {/* 6. API Reference */}
          <button
            onClick={() => handleSelectItem("API Reference")}
            className={`w-full px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium flex items-center gap-3 transition-all cursor-pointer ${
              activeItem === "API Reference"
                ? isDarkModeActive
                  ? "bg-white/10 font-bold text-white"
                  : "bg-black/5 font-bold text-black"
                : "opacity-75 hover:opacity-100 hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>API Reference</span>
          </button>

          {/* 7. Sign out */}
          <button
            onClick={() => handleSelectItem("Sign out")}
            className="w-full px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold flex items-center gap-3 text-[#c2410c] dark:text-[#fb923c] hover:bg-[#c2410c]/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign out</span>
          </button>
        </div>

        {/* SECTION 3: 3-WAY SEGMENTED THEME SWITCHER */}
        <div
          className={`mt-3 p-1 rounded-2xl flex items-center justify-between border ${
            isDarkModeActive
              ? "bg-[#121316] border-white/5"
              : "bg-[#eeebe7] border-neutral-200/60"
          }`}
        >
          {/* 1. Light Mode (☀️) */}
          <button
            onClick={() => handleThemeSwitch("light")}
            className={`flex-1 py-1.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              selectedTheme === "light"
                ? "bg-white text-neutral-900 shadow-md font-bold scale-102"
                : "opacity-50 hover:opacity-100 text-neutral-600 dark:text-neutral-400"
            }`}
            title="Light Mode"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* 2. Dark Mode (🌙) */}
          <button
            onClick={() => handleThemeSwitch("dark")}
            className={`flex-1 py-1.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              selectedTheme === "dark"
                ? "bg-white dark:bg-[#252830] text-black dark:text-white shadow-md font-bold scale-102"
                : "opacity-50 hover:opacity-100 text-neutral-600 dark:text-neutral-400"
            }`}
            title="Dark Mode"
          >
            <Moon className="w-4 h-4" />
          </button>

          {/* 3. System Mode (🖥️) */}
          <button
            onClick={() => handleThemeSwitch("system")}
            className={`flex-1 py-1.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              selectedTheme === "system"
                ? "bg-white dark:bg-[#252830] text-black dark:text-white shadow-md font-bold scale-102"
                : "opacity-50 hover:opacity-100 text-neutral-600 dark:text-neutral-400"
            }`}
            title="System Preference"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>

        {/* SECTION 4: USER PROFILE CAPSULE */}
        <div
          className={`mt-3.5 pt-3 border-t flex items-center gap-2.5 ${
            isDarkModeActive ? "border-white/10" : "border-neutral-200/80"
          }`}
        >
          {/* Avatar Headshot */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-500 p-[1.5px] shrink-0">
            <div className="w-full h-full rounded-full bg-[#eeebe7] dark:bg-[#252830] flex items-center justify-center font-bold text-xs">
              AV
            </div>
          </div>

          {/* Name + Admin Badge + Email */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold truncate">Alex Vance</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase ${
                  isDarkModeActive
                    ? "bg-white/10 text-neutral-300"
                    : "bg-neutral-200/80 text-neutral-600"
                }`}
              >
                Architect
              </span>
            </div>
            <div className="text-[10px] font-mono opacity-50 truncate">
              alex@frontier.design
            </div>
          </div>
        </div>
      </div>

      {/* SIGN OUT MODAL */}
      {isSignedOut && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 rounded-[28px] animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#181a1f] text-neutral-900 dark:text-white rounded-[24px] p-5 max-w-[280px] w-full shadow-2xl border border-white/20 text-center space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold">Session Locked</h3>
            <p className="text-[11px] opacity-60">
              You have been signed out. Click below to restore active workspace credentials.
            </p>
            <button
              onClick={() => {
                setIsSignedOut(false);
                triggerToast("✓ Welcome back, Alex!");
              }}
              className="w-full py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs cursor-pointer shadow-md"
            >
              Re-authenticate ➔
            </button>
          </div>
        </div>
      )}

      {/* TOAST BAR */}
      {toastMessage && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-xl bg-black dark:bg-zinc-900 text-white text-[11px] font-mono font-bold shadow-xl border border-white/10 animate-in fade-in duration-150 whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
