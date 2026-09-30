"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function WalletAddCash() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <div className="flex items-center justify-center p-12 w-full min-h-[400px]">
      <motion.div
        layout
        className="bg-white dark:bg-zinc-950 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col justify-center relative"
        style={{ width: isOpen ? 320 : 160, height: isOpen ? 360 : 64 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M16 12h.01"/></svg>
              Add Cash
            </motion.button>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="p-6 flex flex-col justify-between h-full w-full absolute inset-0"
            >
              <div className="flex justify-between items-center">
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M16 12h.01"/></svg>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 py-4">
                <span className="text-zinc-400 font-semibold text-xs tracking-widest uppercase mb-1">Amount</span>
                <span className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white tabular-nums h-12 flex items-center">
                  ${amount || "0"}
                </span>
                <div className="flex gap-2 mt-6">
                  {['10', '50', '100'].map(val => (
                    <button 
                      key={val}
                      onClick={() => setAmount(val)}
                      className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 transition-all"
                    >
                      +${val}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full h-14 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl shadow-black/10">
                Confirm
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
