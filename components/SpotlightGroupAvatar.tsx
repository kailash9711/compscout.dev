"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SpotlightGroupAvatarProps {
  className?: string;
}

const team = [
  { id: "1", name: "Alice", role: "Product", img: "/avatar/otzu1j51zj8yvd2ewjqp.webp" },
  { id: "2", name: "Bob", role: "Design", img: "/avatar/t88e1gu1wlubuotf5rsk.webp" },
  { id: "3", name: "Charlie", role: "Engineering", img: "/avatar/vfqlydrsdliintvpowio.webp" },
  { id: "4", name: "Diana", role: "Marketing", img: "/avatar/w0cx9vofjchfcuksu9qo.webp" },
];

export default function SpotlightGroupAvatar({ className = "" }: SpotlightGroupAvatarProps = {}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className={`relative flex items-center gap-2 sm:gap-4 ${className}`}
      onMouseLeave={() => setHoveredId(null)}
    >
      {team.map((member) => (
        <div
          key={member.id}
          className="relative flex flex-col items-center justify-center cursor-pointer w-10 h-10 sm:w-12 sm:h-12 shrink-0"
          onMouseEnter={() => setHoveredId(member.id)}
        >
          {/* The Spotlight Background */}
          {hoveredId === member.id && (
            <motion.div
              layoutId="spotlight"
              className="absolute inset-[-6px] sm:inset-[-8px] bg-zinc-200/50 dark:bg-zinc-800/80 rounded-full"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.8
              }}
            />
          )}
         
          {/* Avatar Image */}
          <motion.img
            src={member.img}
            alt={member.name}
            animate={{
              scale: hoveredId === member.id ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md"
          />
         
          {/* Minimalist Tooltip attached to each avatar */}
          <AnimatePresence>
            {hoveredId === member.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute -top-10 sm:-top-12 whitespace-nowrap flex flex-col items-center pointer-events-none z-20"
              >
                <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] sm:text-xs font-medium rounded-lg shadow-md">
                  {member.name}
                </div>
                {/* Small triangle pointer */}
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45 -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}



