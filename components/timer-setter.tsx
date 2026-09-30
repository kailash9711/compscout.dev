"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function TimerSetter() {
  const [minutes, setMinutes] = useState(15);
  
  return (
    <div className="flex items-center justify-center p-12 w-full min-h-[300px]">
      <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-[2rem] flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/5 dark:border-white/5">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setMinutes(m => Math.max(1, m - 1))}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/></svg>
        </motion.button>
        
        <div className="w-28 flex flex-col items-center justify-center relative h-16 overflow-hidden">
           <span className="text-[10px] font-bold text-zinc-300 dark:text-zinc-600 uppercase tracking-widest absolute top-1 pointer-events-none">Timer</span>
           <AnimatePresence mode="popLayout">
             <motion.span 
               key={minutes}
               initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
               animate={{ y: 4, opacity: 1, filter: "blur(0px)" }}
               exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
               transition={{ duration: 0.2 }}
               className="text-3xl font-black tabular-nums tracking-tighter text-zinc-900 dark:text-white pointer-events-none"
             >
               {minutes}:00
             </motion.span>
           </AnimatePresence>
        </div>

        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setMinutes(m => Math.min(120, m + 1))}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </motion.button>
      </div>
    </div>
  );
}
