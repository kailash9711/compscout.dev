"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, CheckSquare, Folder, MessageCircle, Plus } from "lucide-react";

export interface DynamicAuraDockProps {
  className?: string;
}

const navItems = [
  { id: "home", label: "Home", icon: Home, color: "from-blue-500/20 to-cyan-500/20", textColor: "text-blue-500" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, color: "from-emerald-500/20 to-teal-500/20", textColor: "text-emerald-500" },
  { id: "files", label: "Files", icon: Folder, color: "from-amber-500/20 to-orange-500/20", textColor: "text-amber-500" },
  { id: "chat", label: "Chat", icon: MessageCircle, color: "from-purple-500/20 to-pink-500/20", textColor: "text-purple-500" },
];

export default function DynamicAuraDock({ className = "" }: DynamicAuraDockProps = {}) {
  const [hoveredId, setHoveredId] = useState<string | null>("home"); // Default active
  const [isFabHovered, setIsFabHovered] = useState(false);

  return (
    <>
      {/* Main Dock */}
      <motion.div
        className={`flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-white/80 dark:bg-black/60 backdrop-blur-2xl rounded-full border border-zinc-200 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
        onMouseLeave={() => setHoveredId("home")} // Reset to default when leaving dock
        layout
      >
        {navItems.map((item) => {
          const isHovered = hoveredId === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              className="relative flex items-center justify-center rounded-full cursor-pointer h-10 sm:h-12"
              animate={{
                paddingLeft: isHovered ? "1rem" : "0.5rem",
                paddingRight: isHovered ? "1rem" : "0.5rem",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Active Fluid Background */}
              {isHovered && (
                <motion.div
                  layoutId="active-nav-bg"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} border border-black/5 dark:border-white/5`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
             
              {/* Icon & Label */}
              <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Icon
                  size={20}
                  className={`transition-colors duration-300 ${isHovered ? item.textColor : "text-zinc-500 dark:text-zinc-400"}`}
                  strokeWidth={isHovered ? 2.5 : 2}
                />
                <AnimatePresence mode="popLayout">
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                      exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`text-xs sm:text-sm font-semibold whitespace-nowrap overflow-hidden ${item.textColor}`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Floating Action Button (FAB) */}
      <motion.button
        onMouseEnter={() => setIsFabHovered(true)}
        onMouseLeave={() => setIsFabHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg cursor-pointer ml-1.5 sm:ml-2"
      >
        {/* Subtle inner light reflection */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
       
        <motion.div
          animate={{ rotate: isFabHovered ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Plus className="w-5 h-5 sm:w-7 sm:h-7 relative z-10" strokeWidth={2.5} />
        </motion.div>
      </motion.button>
    </>
  );
}



