"use client";

import React, { useState } from "react";
import {
  Send,
  Trash2,
  Share2,
  Users,
  Bookmark,
  MoreHorizontal,
  ArrowUpRight,
  X,
} from "lucide-react";

interface SocialChannel {
  id: string;
  name: string;
  iconBg: string;
  iconColor: string;
  accentGradient?: string;
  customIcon: "linkedin" | "gmail" | "whatsapp" | "facebook" | "telegram";
}

const CHANNELS: SocialChannel[] = [
  {
    id: "linkedin",
    name: "Linkedin",
    iconBg: "bg-[#0077b5]",
    iconColor: "text-white",
    customIcon: "linkedin",
  },
  {
    id: "gmail",
    name: "Gmail", // active highlighted matching image!
    iconBg: "bg-white",
    iconColor: "text-[#ea4335]",
    accentGradient: "bg-gradient-to-r from-[#ea4335] via-[#f43f5e] to-[#e11d48]",
    customIcon: "gmail",
  },
  {
    id: "whatsapp",
    name: "Whatsapp",
    iconBg: "bg-[#25d366]",
    iconColor: "text-white",
    customIcon: "whatsapp",
  },
  {
    id: "facebook",
    name: "Facebook",
    iconBg: "bg-[#1877f2]",
    iconColor: "text-white",
    customIcon: "facebook",
  },
  {
    id: "telegram",
    name: "Telegram",
    iconBg: "bg-[#229ed9]",
    iconColor: "text-white",
    customIcon: "telegram",
  },
];

export default function OmniShare({ className = "" }: { className?: string } = {}) {
  const [activeChannelId, setActiveChannelId] = useState<string>("gmail"); // default matching image!
  const [activeDockTab, setActiveDockTab] = useState<"send" | "trash" | "share" | "team" | "bookmark">("share"); // default matching image!
  const [isShareOpen, setIsShareOpen] = useState<boolean>(true); // default open matching image!
  const [permission, setPermission] = useState<"anyone" | "team" | "private">("anyone");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [composeModal, setComposeModal] = useState<SocialChannel | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // TOAST
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1800);
  };

  // SELECT CHANNEL
  const handleSelectChannel = (channel: SocialChannel) => {
    setActiveChannelId(channel.id);
  };

  // DISPATCH SHARE
  const handleLaunchShare = (channel: SocialChannel, e: React.MouseEvent) => {
    e.stopPropagation();
    setComposeModal(channel);
  };

  // COPY LINK
  const handleCopyLink = () => {
    setIsCopied(true);
    triggerToast("✓ Link copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  // DOCK CLICK
  const handleDockTabClick = (tab: "send" | "trash" | "share" | "team" | "bookmark") => {
    setActiveDockTab(tab);
    if (tab === "share") {
      setIsShareOpen(!isShareOpen);
    } else {
      triggerToast(`Selected dock mode: ${tab.toUpperCase()}`);
    }
  };

  // RESET
  const handleReset = () => {
    setActiveChannelId("gmail");
    setActiveDockTab("share");
    setIsShareOpen(true);
    setPermission("anyone");
  };

  // RENDER PRECISION BRAND SVG ICONS
  const renderIcon = (type: string) => {
    switch (type) {
      case "linkedin":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0a66c2">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.8V10.9h-2.8M7.86 6.7a1.63 1.63 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
          </svg>
        );
      case "gmail":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" opacity="0.1" />
            <path fill="#EA4335" d="M20 6l-8 5-8-5v-.5c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5V6z" />
            <path fill="#4285F4" d="M4 8l8 5 8-5v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8z" />
            <path fill="#34A853" d="M19 19h1c.55 0 1-.45 1-1V8l-2 1.25V19z" />
            <path fill="#FBBC05" d="M4 8v10c0 .55.45 1 1 1h1V9.25L4 8z" />
          </svg>
        );
      case "whatsapp":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "telegram":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#229ED9">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.868-1.522 6.44-2.213 9.381-.292 1.244-.882 1.423-1.464 1.423-.836 0-1.472-.614-2.28-1.144-1.266-.83-1.98-1.346-3.207-2.155-1.417-.935-.499-1.45.31-2.288.211-.219 3.882-3.559 3.953-3.863.009-.038.016-.18-.069-.256s-.208-.05-.298-.03c-.127.029-2.148 1.366-6.064 4.01-.574.394-1.094.588-1.562.577-.515-.011-1.507-.292-2.244-.532-.904-.294-1.624-.45-1.562-.95.032-.26.39-.527 1.071-.8 4.195-1.828 6.993-3.033 8.396-3.615 3.996-1.66 4.827-1.948 5.369-1.958.12 0 .385.029.558.17.146.12.186.282.203.421.018.14.039.458.023.633z" />
          </svg>
        );
      default:
        return <Share2 className="w-5 h-5 text-neutral-500" />;
    }
  };

  return (
    <div className={`relative w-full flex flex-col items-center justify-center py-6 px-2 font-sans select-none ${className}`}>
      {/* ======================================================================= */}
      {/* 1. THE FLOATING SOCIAL SHARE CARD POPOVER                               */}
      {/* ======================================================================= */}
      {isShareOpen && (
        <div className="relative mb-5 animate-in fade-in zoom-in-95 duration-200 z-20">
          {/* Popover Main Card Frame */}
          <div
            className="w-72 sm:w-88 rounded-[28px] p-4 sm:p-5 border shadow-[0_16px_45px_rgba(0,0,0,0.08)] transition-all duration-300 bg-white dark:bg-[#181a20] border-neutral-200/90 dark:border-white/10 text-neutral-900 dark:text-white"
          >
            {/* Channel List */}
            <div className="space-y-1">
              {CHANNELS.map((ch) => {
                const isSelected = activeChannelId === ch.id;

                return (
                  <div
                    key={ch.id}
                    onClick={() => handleSelectChannel(ch)}
                    className={`group p-2 sm:p-2.5 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#f4f5f8] dark:bg-white/10"
                        : "hover:bg-black/3 dark:hover:bg-white/5"
                    }`}
                  >
                    {/* Left Logo + Name */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        {renderIcon(ch.customIcon)}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold tracking-tight">
                        {ch.name}
                      </span>
                    </div>

                    {/* Right Action Circle Buttons (... and ↗) */}
                    <div className="flex items-center gap-1.5">
                      {/* 1. More Options (...) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerToast(`Options for ${ch.name}`);
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isSelected && ch.accentGradient
                            ? `${ch.accentGradient} text-white shadow-xs`
                            : "bg-neutral-100 dark:bg-white/10 text-neutral-500 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/20"
                        }`}
                      >
                        <MoreHorizontal className="w-3 h-3" />
                      </button>

                      {/* 2. Direct Share Arrow (↗) */}
                      <button
                        onClick={(e) => handleLaunchShare(ch, e)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isSelected && ch.accentGradient
                            ? `${ch.accentGradient} text-white shadow-md hover:scale-105`
                            : "bg-neutral-100 dark:bg-white/10 text-neutral-500 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/20"
                        }`}
                      >
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Popover Bottom Footer Bar */}
            <div
              className="flex items-center justify-between pt-3 mt-2 border-t border-neutral-100 dark:border-white/10 text-xs"
            >
              <button
                onClick={() => {
                  const next = permission === "anyone" ? "team" : permission === "team" ? "private" : "anyone";
                  setPermission(next);
                }}
                className="opacity-60 hover:opacity-100 flex items-center gap-1 font-medium cursor-pointer text-[11px]"
              >
                <span className="capitalize">
                  {permission === "anyone"
                    ? "Anyone with link"
                    : permission === "team"
                    ? "Team only"
                    : "Restricted"}
                </span>
                <span>⌄</span>
              </button>

              <button
                onClick={handleCopyLink}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  isCopied
                    ? "bg-emerald-500 text-white"
                    : "bg-[#f0f1f4] dark:bg-white/10 hover:bg-[#e4e6eb] dark:hover:bg-white/20 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                {isCopied ? "copied!" : "copy link"}
              </button>
            </div>
          </div>

          {/* BOTTOM CENTER TAIL POINTER */}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 border-r border-b bg-white dark:bg-[#181a20] border-neutral-200/90 dark:border-white/10"
          />
        </div>
      )}

      {/* ======================================================================= */}
      {/* 2. THE FLOATING ACTION DOCK / TOOLBAR                                   */}
      {/* ======================================================================= */}
      <div
        className="relative rounded-full px-2.5 py-1.5 border shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 bg-[#f4f5f8] dark:bg-[#181a20] border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-neutral-300 z-10"
      >
        {/* 1. Send Icon */}
        <button
          onClick={() => handleDockTabClick("send")}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            activeDockTab === "send"
              ? "bg-white text-black shadow-md font-bold"
              : "opacity-60 hover:opacity-100"
          }`}
          title="Send"
        >
          <Send className="w-3.5 h-3.5" />
        </button>

        {/* 2. Trash Icon */}
        <button
          onClick={() => handleDockTabClick("trash")}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            activeDockTab === "trash"
              ? "bg-white text-black shadow-md font-bold"
              : "opacity-60 hover:opacity-100"
          }`}
          title="Trash"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        {/* 3. Elevated Share Pill [ Share 🔗 ] */}
        <button
          onClick={() => handleDockTabClick("share")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeDockTab === "share"
              ? "bg-white dark:bg-white text-neutral-900 dark:text-black shadow-md scale-102 border border-neutral-100 dark:border-transparent"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          <span>Share</span>
          <Share2 className="w-3 h-3" />
        </button>

        {/* 4. Group / Team Icon */}
        <button
          onClick={() => handleDockTabClick("team")}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            activeDockTab === "team"
              ? "bg-white text-black shadow-md font-bold"
              : "opacity-60 hover:opacity-100"
          }`}
          title="Team"
        >
          <Users className="w-3.5 h-3.5" />
        </button>

        {/* 5. Bookmark Icon */}
        <button
          onClick={() => handleDockTabClick("bookmark")}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            activeDockTab === "bookmark"
              ? "bg-white text-black shadow-md font-bold"
              : "opacity-60 hover:opacity-100"
          }`}
          title="Bookmark"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* DISPATCH COMPOSE MODAL */}
      {composeModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 rounded-[28px] animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#181a20] text-neutral-900 dark:text-white rounded-[22px] p-4 max-w-[290px] w-full shadow-2xl border border-neutral-100 dark:border-white/10">
            <div className="flex items-center justify-between pb-2 border-b border-current/10 mb-2.5">
              <div className="flex items-center gap-1.5">
                {renderIcon(composeModal.customIcon)}
                <span className="text-xs font-bold font-mono uppercase truncate max-w-[170px]">
                  Share via {composeModal.name}
                </span>
              </div>
              <button
                onClick={() => setComposeModal(null)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[11px] space-y-1.5 mb-3">
              <div className="font-medium opacity-60">Ready to distribute link with {permission} access:</div>
              <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 font-mono text-[10px] break-all">
                https://antigravity.design/artifact/9842
              </div>
            </div>

            <button
              onClick={() => {
                triggerToast(`🚀 Dispatched to ${composeModal.name}!`);
                setComposeModal(null);
              }}
              className="w-full py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs cursor-pointer shadow-md"
            >
              Send to {composeModal.name} ➔
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
