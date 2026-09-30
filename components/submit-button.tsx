"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SubmitButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = () => {
    setStatus("loading");
    setTimeout(() => setStatus("success"), 2000);
    setTimeout(() => setStatus("idle"), 4500);
  };

  return (
    <div className="flex items-center justify-center p-12 min-h-[300px] w-full">
      <motion.button
        layout
        onClick={status === "idle" ? handleSubmit : undefined}
        initial={false}
        animate={{ 
          width: status === "loading" ? 64 : status === "success" ? 160 : 140,
          backgroundColor: status === "success" ? "#10b981" : "var(--btn-bg)",
          color: status === "success" ? "#ffffff" : "var(--btn-text)",
          cursor: status !== "idle" ? "default" : "pointer"
        }}
        style={{
          "--btn-bg": "rgba(24, 24, 27, 1)", // zinc-900
          "--btn-text": "#ffffff",
        } as React.CSSProperties}
        className="h-14 rounded-full flex items-center justify-center overflow-hidden font-semibold relative shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-none hover:scale-105 active:scale-95 transition-transform"
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.span 
              key="idle" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="dark:text-black dark:font-bold"
            >
              Submit
            </motion.span>
          )}
          {status === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-1">
              {[1,2,3].map(i => (
                <motion.span 
                  key={i} 
                  className="w-1.5 h-1.5 bg-current rounded-full" 
                  animate={{ y: [0, -4, 0] }} 
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} 
                />
              ))}
            </motion.div>
          )}
          {status === "success" && (
            <motion.div 
              key="success" 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.5 }} 
              className="flex items-center gap-2 text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
              Success
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global style override for dark mode background on idle state */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (prefers-color-scheme: dark) {
            button[style*="rgba(24, 24, 27, 1)"] {
              --btn-bg: #ffffff !important;
              --btn-text: #000000 !important;
            }
          }
          .dark button[style*="rgba(24, 24, 27, 1)"] {
            --btn-bg: #ffffff !important;
            --btn-text: #000000 !important;
          }
        `}} />
      </motion.button>
    </div>
  );
}
