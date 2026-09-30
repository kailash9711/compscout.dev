"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Check, RotateCcw } from "lucide-react";

interface SocialBadge {
  id: string;
  name: string;
  subscribers: string;
  handle: string;
}

const BADGES: SocialBadge[] = [
  { id: "facebook", name: "Facebook", subscribers: "320K", handle: "@antigravity_hub" },
  { id: "instagram", name: "Instagram", subscribers: "1.4M", handle: "@antigravity.live" },
  { id: "whatsapp", name: "WhatsApp", subscribers: "89K", handle: "+1 (800) COMMUNITY" },
  { id: "youtube", name: "YouTube", subscribers: "2.1M", handle: "@AntigravityStudio" },
  { id: "telegram", name: "Telegram", subscribers: "560K", handle: "t.me/antigravity_vip" },
];

const LETTERS = ["F", "O", "L", "L", "O", "W", " ", "U", "S", " ", "O", "N"];

export default function CleanBorderSocial({ className = "" }: { className?: string } = {}) {
  // Active Followed States
  const [followed, setFollowed] = useState<Record<string, boolean>>({
    facebook: false,
    instagram: false,
    whatsapp: false,
    youtube: false,
    telegram: false,
  });

  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; x: number; y: number; color: string; vy: number; vx: number; opacity: number }>
  >([]);

  const animFrameRef = useRef<number | null>(null);

  // TOGGLE INDIVIDUAL FOLLOW
  const toggleFollow = (id: string) => {
    const next = !followed[id];
    setFollowed((prev) => ({ ...prev, [id]: next }));
    if (next) spawnConfettiBurst();
  };

  // FOLLOW ALL CASCADE
  const followAll = () => {
    const allActive = Object.values(followed).every(Boolean);
    const targetState = !allActive;

    BADGES.forEach((b, idx) => {
      setTimeout(() => {
        setFollowed((prev) => ({ ...prev, [b.id]: targetState }));
      }, idx * 80);
    });

    if (targetState) {
      setTimeout(() => {
        spawnConfettiBurst();
      }, 450);
    }
  };

  // SPAWN CELEBRATORY CONFETTI
  const spawnConfettiBurst = () => {
    const colors = ["#000000", "#ef4444", "#3b82f6", "#10b981", "#eab308", "#8b5cf6"];
    const newPieces = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x: 120 + (Math.random() - 0.5) * 160,
      y: 60,
      color: colors[i % colors.length],
      vx: (Math.random() - 0.5) * 4,
      vy: -3 - Math.random() * 4,
      opacity: 1,
    }));
    setConfetti((prev) => [...prev, ...newPieces]);
  };

  // CONFETTI PHYSICS LOOP
  useEffect(() => {
    const updateConfetti = () => {
      setConfetti((prev) =>
        prev
          .map((c) => ({
            ...c,
            x: c.x + c.vx,
            y: c.y + c.vy,
            vy: c.vy + 0.22,
            opacity: c.opacity - 0.025,
          }))
          .filter((c) => c.opacity > 0)
      );
      animFrameRef.current = requestAnimationFrame(updateConfetti);
    };

    animFrameRef.current = requestAnimationFrame(updateConfetti);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // INTERACTIVE TYPOGRAPHY LETTER HOVER
  const handleLetterHover = (index: number) => {
    setHoveredLetter(index);
    setTimeout(() => setHoveredLetter(null), 300);
  };

  const resetAll = () => {
    setFollowed({
      facebook: false,
      instagram: false,
      whatsapp: false,
      youtube: false,
      telegram: false,
    });
  };

  return (
    <div className={`w-full max-w-full flex flex-col items-center justify-center font-sans select-none ${className}`}>
      {/* THE 5 ICONS ROW - Perfectly sized to fit 100% inside small and large cards */}
      <div className="relative flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 flex-nowrap max-w-full">
        {/* 1. FACEBOOK */}
        <button
          type="button"
          onClick={() => toggleFollow("facebook")}
          className={`relative w-8.5 h-8.5 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-[10px] sm:rounded-[14px] flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 bg-black text-white shadow-sm shrink-0 ${
            followed.facebook ? "ring-2 ring-black" : ""
          }`}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 64 28 L 52 28 C 44 28 40 33 40 42 L 40 50 L 28 50 L 28 66 L 40 66 L 40 96 L 56 96 L 56 66 L 70 66 L 72 50 L 56 50 L 56 43 C 56 40 58 38 62 38 L 72 38 L 72 28 Z" />
          </svg>
          {followed.facebook && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-in zoom-in-50">
              <Check className="w-2 h-2 stroke-[3]" />
            </div>
          )}
        </button>

        {/* 2. INSTAGRAM */}
        <button
          type="button"
          onClick={() => toggleFollow("instagram")}
          className={`relative w-8.5 h-8.5 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-[10px] sm:rounded-[14px] border-[2.5px] sm:border-[3.5px] flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 shrink-0 ${
            followed.instagram
              ? "border-black bg-black text-white"
              : "border-black dark:border-white bg-white dark:bg-zinc-900 text-black dark:text-white shadow-sm"
          }`}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="18" y="18" width="64" height="64" rx="20" />
            <circle cx="50" cy="50" r="16" />
            <circle cx="70" cy="30" r="4.5" fill="currentColor" stroke="none" />
          </svg>
          {followed.instagram && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-in zoom-in-50">
              <Check className="w-2 h-2 stroke-[3]" />
            </div>
          )}
        </button>

        {/* 3. WHATSAPP */}
        <button
          type="button"
          onClick={() => toggleFollow("whatsapp")}
          className="relative w-8.5 h-8.5 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 shrink-0"
        >
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
            <path
              d="
                M 50 12
                C 28 12 10 28 10 50
                C 10 58 13 66 18 73
                L 8 92
                L 28 85
                C 35 89 42 90 50 90
                C 72 90 90 72 90 50
                C 90 28 72 12 50 12 Z
              "
              fill={followed.whatsapp ? "#000000" : "#ffffff"}
              stroke="#000000"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            <path
              d="M 64 62 C 63 64 60 66 57 66 C 54 66 48 63 42 57 C 36 51 33 45 33 42 C 33 39 35 36 37 35 C 38 34 39 34 40 34 C 41 34 42 35 43 37 L 45 42 C 45 43 45 44 44 45 L 43 46 C 44 48 47 51 49 53 L 50 52 C 51 51 52 51 53 51 L 58 54 C 60 55 60 56 60 57 L 64 62 Z"
              fill={followed.whatsapp ? "#ffffff" : "#000000"}
            />
          </svg>
          {followed.whatsapp && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-in zoom-in-50">
              <Check className="w-2 h-2 stroke-[3]" />
            </div>
          )}
        </button>

        {/* 4. YOUTUBE */}
        <button
          type="button"
          onClick={() => toggleFollow("youtube")}
          className={`relative w-8.5 h-8.5 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 bg-black text-white shadow-sm shrink-0 ${
            followed.youtube ? "ring-2 ring-black" : ""
          }`}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 100 100" fill="currentColor">
            <rect x="15" y="24" width="70" height="52" rx="16" fill="currentColor" />
            <polygon points="42,38 64,50 42,62" fill="#000000" />
          </svg>
          {followed.youtube && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-in zoom-in-50">
              <Check className="w-2 h-2 stroke-[3]" />
            </div>
          )}
        </button>

        {/* 5. TELEGRAM */}
        <button
          type="button"
          onClick={() => toggleFollow("telegram")}
          className={`relative w-8.5 h-8.5 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 bg-black text-white shadow-sm shrink-0 ${
            followed.telegram ? "ring-2 ring-black" : ""
          }`}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 18 48 L 84 22 L 56 82 L 44 58 L 68 34 L 36 54 Z" />
          </svg>
          {followed.telegram && (
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-in zoom-in-50">
              <Check className="w-2 h-2 stroke-[3]" />
            </div>
          )}
        </button>
      </div>

      {/* INTERACTIVE TYPOGRAPHY: F O L L O W   U S   O N */}
      <div className="mt-3 sm:mt-4 flex items-center justify-center gap-0.5 sm:gap-1 select-none">
        {LETTERS.map((char, index) =>
          char === " " ? (
            <span key={index} className="w-1 sm:w-1.5" />
          ) : (
            <span
              key={index}
              onMouseEnter={() => handleLetterHover(index)}
              className={`inline-block font-sans font-black text-[11px] sm:text-sm md:text-base tracking-wider cursor-pointer transition-all duration-200 ${
                hoveredLetter === index
                  ? "text-rose-500 scale-120 -translate-y-0.5 drop-shadow-sm"
                  : "text-zinc-900 dark:text-white hover:opacity-80"
              }`}
            >
              {char}
            </span>
          )
        )}
      </div>

      {/* FLOATING PARTICLES CANVAS */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: `${c.x}px`,
            top: `${c.y}px`,
            backgroundColor: c.color,
            opacity: c.opacity,
          }}
        />
      ))}

      {/* ONE-CLICK 'CONNECT ALL' & RESET */}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={followAll}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-black bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3 h-3 fill-current" />
          <span>Connect All (5)</span>
        </button>

        <button
          type="button"
          onClick={resetAll}
          className="p-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-sm"
          title="Reset"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
