'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Target, Zap, Circle, X, ChevronRight } from 'lucide-react';

const defaultOptions: RadialOption[] = [
  {
    id: 1,
    icon: Zap,
    label: "Energy",
    color: "bg-amber-400 text-amber-900 border-amber-300",
    glow: "shadow-amber-400/20",
    themeColor: "text-amber-600 border-amber-200 bg-amber-50",
    tagline: "Boost Daily Performance",
    desc: "Maximize task output, deploy key metrics tracking, and speed up execution processes using our real-time kinetic engine."
  },
  {
    id: 2,
    icon: Target,
    label: "Focus",
    color: "bg-rose-400 text-rose-900 border-rose-300",
    glow: "shadow-rose-400/20",
    themeColor: "text-rose-600 border-rose-200 bg-rose-50",
    tagline: "Slay Distractions",
    desc: "Define high-priority sprints, lock down notification triggers, and channel mental bandwidth directly into key assets."
  },
  {
    id: 3,
    icon: Compass,
    label: "Explore",
    color: "bg-indigo-400 text-indigo-900 border-indigo-300",
    glow: "shadow-indigo-400/20",
    themeColor: "text-indigo-600 border-indigo-200 bg-indigo-50",
    tagline: "Discover Protocols",
    desc: "Navigate spatial grid systems, map database routes, and discover external third-party integration pipelines."
  },
];

export interface RadialOption {
  id: number;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  glow: string;
  themeColor: string;
  tagline: string;
  desc: string;
}

export interface RadialElasticAccordionProps {
  options?: RadialOption[];
  defaultActiveId?: number | null;
  baseRadius?: number;
  showGrid?: boolean;
  actionButtonText?: string;
  onOptionSelect?: (id: number | null) => void;
  className?: string;
}

/**
 * @prop {RadialOption[]} options - Array of radial dial options with icons, color themes, and description (Default: 3 preset options)
 * @prop {number} defaultActiveId - The ID of the radial option selected by default (Default: null)
 * @prop {number} baseRadius - Base pixel radius of expanding satellite options from hub center (Default: 130)
 * @prop {boolean} showGrid - Whether to display the subtle background coordinate grid texture (Default: true)
 * @prop {string} actionButtonText - Call-to-action button label shown on selected option card (Default: 'Initialize Action')
 * @prop {function} onOptionSelect - Callback fired when a radial option is clicked or toggled (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function RadialElasticAccordion({
  options = defaultOptions,
  defaultActiveId = null,
  baseRadius = 130,
  showGrid = true,
  actionButtonText = "Initialize Action",
  onOptionSelect,
  className = ""
}: RadialElasticAccordionProps = {}) {
  const [activeId, setActiveId] = useState<number | null>(defaultActiveId);
  const [radius, setRadius] = useState(baseRadius);
  const [isMobile, setIsMobile] = useState(false);
  const isOpen = activeId !== null;

  const handleSelect = (id: number | null) => {
    setActiveId(id);
    onOptionSelect?.(id);
  };

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 640) {
        setRadius(Math.round(baseRadius * 0.7)); // Mobile
      } else if (width < 1024) {
        setRadius(Math.round(baseRadius * 0.85)); // Tablet
      } else {
        setRadius(baseRadius); // Desktop
      }
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [baseRadius]);

  const activeOption = options.find(opt => opt.id === activeId);

  return (
    <div className={`w-full max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 p-2 sm:p-4 relative font-sans select-none ${className}`}>
      {/* Left Interactive Circular Dial Zone */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center min-h-[180px] sm:min-h-[220px]">
        {/* Central Hub Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect(isOpen ? null : (options[0]?.id || 1))}
          className="absolute z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-lg group border border-white/20 dark:border-black/20 transition-all cursor-pointer"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Circle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-blue-400 dark:text-blue-600" />
          )}
        </motion.button>

        {/* Radial Option Buttons */}
        {options.map((opt, i) => {
          const targetAngleDesktop = 0; // Right towards text
          const targetAngleMobile = 90; // Down towards text
          const targetAngle = isMobile ? targetAngleMobile : targetAngleDesktop;
          
          const naturalAngle = i * (360 / options.length);
          
          const selectedIndex = activeId ? options.findIndex(o => o.id === activeId) : -1;
          const selectedNaturalAngle = selectedIndex !== -1 ? selectedIndex * (360 / options.length) : 0;
          
          const rotationOffset = activeId ? (targetAngle - selectedNaturalAngle) : 0;
          
          const finalAngleDeg = naturalAngle + rotationOffset;
          const finalAngleRad = finalAngleDeg * (Math.PI / 180);
          
          const currentRadius = isOpen ? radius : 0;
          const x = Math.cos(finalAngleRad) * currentRadius;
          const y = Math.sin(finalAngleRad) * currentRadius;
          const isSelected = activeId === opt.id;

          return (
            <div
              key={opt.id}
              style={{
                position: 'absolute',
                transform: `translate(${x}px, ${y}px)`,
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: isSelected ? 20 : 10,
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? '1' : '0',
              }}
              className="transition-all duration-300"
            >
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(opt.id)}
                className={`w-10 h-10 sm:w-13 sm:h-13 rounded-full ${opt.color} p-1 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow border-2 border-white dark:border-zinc-800 relative cursor-pointer ${opt.glow} ${isSelected ? 'ring-3 ring-zinc-950/30 dark:ring-white/40 scale-110' : ''}`}
              >
                {opt.icon ? (
                  React.createElement(opt.icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })
                ) : (
                  <Circle className="w-4 h-4 sm:w-5 sm:h-5" />
                )}

                {/* Label Reveal tooltip */}
                <div className="absolute bottom-full mb-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[9px] font-bold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                  {opt.label}
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Right Info Panels - Revealing content based on selection */}
      <div className="w-full md:w-1/2 flex flex-col justify-center min-h-[130px] z-10 text-zinc-900 dark:text-white">
        <AnimatePresence mode="wait">
          {activeOption ? (
            <motion.div
              key={activeOption.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-2.5 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${activeOption.themeColor}`}>
                  {activeOption.label}
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">0{activeOption.id}</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold leading-tight">
                {activeOption.tagline}
              </h2>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs">
                {activeOption.desc}
              </p>

              <div className="pt-1">
                <button className="flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-white group hover:gap-2 transition-all cursor-pointer">
                  <span>{actionButtonText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2 text-center md:text-left py-2"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto md:mx-0">
                <Circle className="w-4 h-4 text-blue-500 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold">Select a Protocol</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                Click the central pulse icon to expand radial options.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
