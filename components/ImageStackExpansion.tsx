"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface ImageStackExpansionProps {
  images?: string[];
  className?: string;
  cardClassName?: string;
  autoExpand?: boolean;
}

const DEFAULT_IMAGES = [
  "https://compscout.dev/card/nxflaxn3o8pgr2zo4ghe.webp",
  "https://compscout.dev/card/odoq6casy1mki7uam0no.webp",
  "https://compscout.dev/card/ou9spusiqwwixogtgneg.webp",
];

/**
 * Image Stack Expansion component with smooth responsive fan-out animations and interactive hover depth.
 *
 * @prop {string[]} images - Array of image URLs to display in the expanding stack (Default: DEFAULT_IMAGES)
 * @prop {boolean} autoExpand - Whether the stack auto-expands into fan view on load (Default: true)
 * @prop {string} className - Additional CSS classes for the outer component container (Default: '')
 * @prop {string} cardClassName - Additional CSS classes for individual image cards (Default: '')
 */
export default function ImageStackExpansion({
  images = DEFAULT_IMAGES,
  className = "",
  cardClassName = "",
  autoExpand = true,
}: ImageStackExpansionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(autoExpand);

  return (
    <div
      className={`relative flex w-full items-center justify-center py-4 px-3 sm:py-6 sm:px-4 select-none ${className}`}
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <div className="relative w-[140px] h-[195px] xs:w-[170px] xs:h-[235px] sm:w-[200px] sm:h-[280px] md:w-[220px] md:h-[305px] max-w-full">
        {images.map((src, i) => {
          const total = images.length;
          const isLeft = i === 0;
          const isCenter = i === 1;
          const isRight = i === 2;

          // Compute offsets relative to total cards
          const offsetX = isExpanded
            ? isLeft
              ? "-36%"
              : isRight
              ? "36%"
              : "0%"
            : "0%";
          const offsetY = isExpanded
            ? isLeft
              ? "-6%"
              : isRight
              ? "6%"
              : "0%"
            : `${i * -4}px`;
          const rotateAngle = isExpanded
            ? isLeft
              ? -9
              : isRight
              ? 9
              : 0
            : (i - 1) * 3;

          const isHovered = activeIndex === i;

          return (
            <motion.div
              key={i}
              initial={{ y: 0, x: 0, rotate: 0, scale: 0.95 }}
              animate={{
                x: offsetX,
                y: offsetY,
                rotate: isHovered ? 0 : rotateAngle,
                scale: isHovered ? 1.04 : 1,
              }}
              whileHover={{ scale: 1.04, zIndex: 20 }}
              onHoverStart={() => setActiveIndex(i)}
              onHoverEnd={() => setActiveIndex(null)}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                mass: 0.8,
              }}
              className={`absolute inset-0 rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white/20 dark:border-white/10 backdrop-blur-sm cursor-pointer transition-shadow duration-300 ${cardClassName}`}
              style={{
                zIndex: isHovered ? 20 : total - i,
              }}
            >
              <img
                src={src}
                alt={`Stack card ${i + 1}`}
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
