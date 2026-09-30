'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Hexagon, Wind } from 'lucide-react';

export interface BloomFAQItem {
  q: string;
  a: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color?: string;
}

export interface FAQBloomHubProps {
  items?: BloomFAQItem[];
  moduleTag?: string;
  title?: string;
  hoverRotateAngle?: number;
  onHoverChange?: (index: number | null) => void;
  className?: string;
}

const defaultFaqs: BloomFAQItem[] = [
  {
    q: "The Vision?",
    a: "To create a seamless bridge between thought and digital kinetic reality.",
    icon: Compass,
    color: "from-blue-500/20"
  },
  {
    q: "The Logic?",
    a: "High-fidelity nodes driving every interaction with sub-atomic precision.",
    icon: Hexagon,
    color: "from-rose-500/20"
  },
  {
    q: "The Future?",
    a: "A fully decentralized matrix of architectural design protocols.",
    icon: Wind,
    color: "from-amber-500/20"
  },
];

/**
 * @prop {BloomFAQItem[]} items - Array of bloom FAQ questions with answer, icon, and bloom gradient (Default: 3 core inquiry cards)
 * @prop {string} moduleTag - Small monospace tracking category badge above title (Default: 'Inquiry_Module_v2')
 * @prop {string} title - Main headline of the FAQ bloom hub (Default: 'Core Inquiry.')
 * @prop {number} hoverRotateAngle - Degree angle to rotate icon on mouse hover (Default: 90)
 * @prop {function} onHoverChange - Callback fired when hovered card index changes (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function FAQBloomHub({
  items = defaultFaqs,
  moduleTag = "Inquiry_Module_v2",
  title = "Core Inquiry.",
  hoverRotateAngle = 90,
  onHoverChange,
  className = ""
}: FAQBloomHubProps = {}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleHover = (index: number | null) => {
    setHovered(index);
    onHoverChange?.(index);
  };

  return (
    <div className={`w-full bg-[#0c0c0e] rounded-2xl sm:rounded-3xl flex items-center justify-center p-4 sm:p-8 font-sans antialiased overflow-hidden ${className}`}>
      <div className="max-w-4xl w-full">

        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 space-y-1.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-500">{moduleTag}</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative">
          {items.map((faq, i) => {
            const Icon = faq.icon || Compass;
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleHover(null)}
                className="relative group cursor-pointer"
              >
                <div className="relative z-10 flex flex-col items-center text-center space-y-5">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      rotate: isHovered ? hoverRotateAngle : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:border-zinc-700 transition-colors duration-500"
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </motion.div>

                  <div className="space-y-2.5">
                    <h3 className="text-base sm:text-lg font-medium text-zinc-400 group-hover:text-white transition-colors duration-500">
                      {faq.q}
                    </h3>

                    <div className="relative h-16 overflow-hidden">
                      <motion.p
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 10,
                          filter: isHovered ? "blur(0px)" : "blur(10px)"
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-[13px] text-zinc-400 font-light leading-relaxed max-w-[200px] mx-auto italic"
                      >
                        "{faq.a}"
                      </motion.p>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      width: isHovered ? 30 : 0,
                      opacity: isHovered ? 1 : 0
                    }}
                    className="h-px bg-zinc-700"
                  />
                </div>

                {/* Background Bloom Glow */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.4 : 0.8,
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 bg-gradient-to-br ${faq.color || 'from-indigo-500/20'} to-transparent blur-[60px] -z-10`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
