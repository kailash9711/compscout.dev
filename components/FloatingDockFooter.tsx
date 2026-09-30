"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Compass, MessageCircle, User, Settings, Command } from "lucide-react";

export interface FloatingDockItem {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface FloatingDockFooterProps {
  items?: FloatingDockItem[];
  className?: string;
}

const defaultItems: FloatingDockItem[] = [
  { icon: <Home size={20} />, label: "Home" },
  { icon: <Compass size={20} />, label: "Explore" },
  { icon: <MessageCircle size={20} />, label: "Messages" },
  { icon: <User size={20} />, label: "Profile" },
  { icon: <Settings size={20} />, label: "Settings" },
];

/**
 * @prop {FloatingDockItem[]} items - List of navigation dock icons with tooltips and magnification physics (Default: 5 dock items)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function FloatingDockFooter({
  items = defaultItems,
  className = ""
}: FloatingDockFooterProps = {}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`w-full flex items-center justify-center py-6 font-sans select-none ${className}`}>
      {/* Floating Dock */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center space-x-2"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="relative"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold py-1.5 px-3 rounded-md shadow-lg pointer-events-none whitespace-nowrap"
                >
                  {item.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={item.onClick}
              className={`p-3 rounded-full flex items-center justify-center transition-colors cursor-pointer outline-none ${
                hoveredIndex === i 
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white' 
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              <motion.div
                animate={{
                  scale: hoveredIndex === i ? 1.2 : 1,
                  y: hoveredIndex === i ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {item.icon || <Command size={20} />}
              </motion.div>
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
