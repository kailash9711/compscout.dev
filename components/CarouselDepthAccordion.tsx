'use client';

import React, { useState, useEffect } from 'react';
import { Box, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const panels = [
  { 
    id: 1, 
    title: "Dimensional Node", 
    color: "bg-zinc-100 dark:bg-zinc-900", 
    textColor: "text-zinc-900 dark:text-white",
    mutedText: "text-zinc-600 dark:text-white/60",
    iconBg: "bg-black/5 dark:bg-white/10",
    lineBg: "bg-zinc-300 dark:bg-white",
    text: "Exploring the Z-axis through kinetic reordering." 
  },
  { 
    id: 2, 
    title: "Inertia Frame", 
    color: "bg-indigo-600", 
    textColor: "text-white",
    mutedText: "text-white/60",
    iconBg: "bg-white/10",
    lineBg: "bg-white",
    text: "Physical simulation of mass and velocity in UI." 
  },
  { 
    id: 3, 
    title: "Depth Matrix", 
    color: "bg-emerald-600", 
    textColor: "text-white",
    mutedText: "text-white/60",
    iconBg: "bg-white/10",
    lineBg: "bg-white",
    text: "Multi-layered visualization of complex data nodes." 
  },
];

export interface PanelData {
  id: number;
  title: string;
  color: string;
  textColor: string;
  mutedText: string;
  iconBg: string;
  lineBg: string;
  text: string;
}

export interface CarouselDepthAccordionProps {
  items?: PanelData[];
  initialIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  onPanelChange?: (index: number) => void;
  className?: string;
}

/**
 * @prop {PanelData[]} items - Array of panels with specific color, icon, and text properties (Default: 3 preset panels)
 * @prop {number} initialIndex - The index of the panel to show initially on load (Default: 0)
 * @prop {boolean} autoPlay - Enable automatic cycling through depth carousel panels (Default: false)
 * @prop {number} autoPlayInterval - Duration in milliseconds between automated panel transitions (Default: 4000)
 * @prop {boolean} showIndicators - Whether to render dot navigation indicators below stage (Default: true)
 * @prop {boolean} showArrows - Whether to render chevron previous/next navigation buttons (Default: true)
 * @prop {function} onPanelChange - Callback fired when the active panel index changes (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function CarouselDepthAccordion({
  items = panels,
  initialIndex = 0,
  autoPlay = false,
  autoPlayInterval = 4000,
  showIndicators = true,
  showArrows = true,
  onPanelChange,
  className = ""
}: CarouselDepthAccordionProps = {}) {
  const [index, setIndex] = useState(initialIndex);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!autoPlay || isExpanded) return;
    const timer = setInterval(() => {
      setIndex((prev) => {
        const nextIdx = (prev + 1) % items.length;
        onPanelChange?.(nextIdx);
        return nextIdx;
      });
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isExpanded, items.length, onPanelChange]);

  const next = () => {
    const nextIdx = (index + 1) % items.length;
    setIndex(nextIdx);
    setIsExpanded(false);
    onPanelChange?.(nextIdx);
  };

  const prev = () => {
    const prevIdx = (index - 1 + items.length) % items.length;
    setIndex(prevIdx);
    setIsExpanded(false);
    onPanelChange?.(prevIdx);
  };

  const currentItem = items[index] || items[0];

  return (
    <div className={`w-full min-h-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-8 md:gap-12 p-4 ${className}`}>
      {/* 3D Stage - Uses 100% of parent height */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes carousel-enter {
          from { 
            opacity: 0; 
            transform: perspective(2000px) rotateY(45deg) translateX(50px) translateZ(-100px); 
          }
          to { 
            opacity: 1; 
            transform: perspective(2000px) rotateY(0deg) translateX(0) translateZ(0); 
          }
        }
        .animate-carousel-enter {
          animation: carousel-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out 0.1s both;
        }
      `}} />
      <div className="relative w-full flex-1 min-h-[280px] sm:min-h-[350px] md:min-h-[420px] flex items-center justify-center perspective-2000">
          <div
            key={index}
            style={{
              width: isExpanded ? '100%' : (isMobile ? '90%' : '380px'),
              height: isExpanded ? '100%' : (isMobile ? '260px' : '360px')
            }}
            className={`animate-carousel-enter relative rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] ${currentItem.color} ${currentItem.textColor} p-5 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between cursor-pointer group overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex justify-between items-start">
              <div className={`w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl ${currentItem.iconBg} flex items-center justify-center`}>
                <Box className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
              </div>
              <Maximize2 className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 opacity-40 group-hover:opacity-100 transition-opacity ${isExpanded ? 'rotate-45' : ''}`} />
            </div>

            <div className="space-y-2.5 sm:space-y-4 my-4">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-serif italic tracking-tight">{currentItem.title}</h3>
              {isExpanded && (
                  <div
                    className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in-up"
                  >
                    <p className={`text-sm sm:text-lg md:text-xl font-medium ${currentItem.mutedText} leading-relaxed`}>
                      {currentItem.text}
                    </p>
                    
                    <div className={`h-px w-full ${currentItem.lineBg} opacity-20`} />
                  </div>
                )}
            </div>

            <div className="flex items-center gap-3 sm:gap-4 opacity-40">
              <div className={`h-px w-8 sm:w-10 ${currentItem.lineBg}`} />
              <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Protocol 143</span>
            </div>
          </div>
      </div>

      {/* Navigation - Stacked or smaller on mobile */}
      {(showArrows || showIndicators) && (
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          {showArrows && (
            <button onClick={prev} className="p-2.5 sm:p-3.5 md:p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95">
              <ChevronLeft className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-zinc-600 dark:text-zinc-400" />
            </button>
          )}

          {showIndicators && (
            <div className="flex gap-1.5 sm:gap-2">
              {items.map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    setIsExpanded(false);
                    onPanelChange?.(i);
                  }}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 cursor-pointer ${index === i ? 'w-5 sm:w-8 bg-zinc-900 dark:bg-zinc-100' : 'w-1 sm:w-1.5 bg-zinc-300 dark:bg-zinc-700'}`}
                />
              ))}
            </div>
          )}

          {showArrows && (
            <button onClick={next} className="p-2.5 sm:p-3.5 md:p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95">
              <ChevronRight className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-zinc-600 dark:text-zinc-400" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
