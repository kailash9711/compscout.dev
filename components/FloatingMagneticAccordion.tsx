'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MousePointer2, Sparkles, Box } from 'lucide-react';

const defaultCards: FloatingCardItem[] = [
  { id: 1, title: "Magnetic Node", color: "bg-indigo-500", desc: "Interactive mass simulation that follows the cursor path." },
  { id: 2, title: "Floating Logic", color: "bg-rose-500", desc: "Decoupled architectural components with spatial awareness." },
];

export interface FloatingCardItem {
  id: number;
  title: string;
  color: string;
  desc: string;
}

export interface FloatingMagneticAccordionProps {
  cards?: FloatingCardItem[];
  defaultActiveId?: number | null;
  magneticStrength?: number;
  springStiffness?: number;
  springDamping?: number;
  showGrid?: boolean;
  showPointer?: boolean;
  onCardChange?: (id: number | null) => void;
  className?: string;
}

interface CardItemProps {
  card: FloatingCardItem;
  i: number;
  springX: any;
  springY: any;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
  hasHover: boolean;
  magneticStrength: number;
}

function CardItem({ card, i, springX, springY, activeId, setActiveId, hasHover, magneticStrength }: CardItemProps) {
  const factor = magneticStrength + i * 0.02;
  const xTransform = useTransform(springX, (v: number) => hasHover ? v * factor : 0);
  const yTransform = useTransform(springY, (v: number) => hasHover ? v * factor : 0);
  const shadowX = useTransform(springX, (v: number) => hasHover ? v * -0.01 : 0);
  const shadowY = useTransform(springY, (v: number) => hasHover ? v * -0.01 : 0);

  return (
    <motion.div
      style={{
        x: xTransform,
        y: yTransform,
      }}
      onClick={() => setActiveId(activeId === card.id ? null : card.id)}
      className={`relative p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white border border-zinc-100 shadow-2xl cursor-pointer transition-all duration-700 
        ${activeId === card.id
          ? 'w-full max-w-[340px] sm:max-w-[380px] md:w-[400px] scale-[1.02] sm:scale-105'
          : 'w-full max-w-[280px] sm:w-60 md:w-64 h-48 sm:h-56 md:h-64 hover:scale-[1.02] sm:hover:scale-105'}`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center justify-between">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl ${card.color} flex items-center justify-center text-white shadow-lg`}>
            <Box className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-100" />
        </div>

        <div className="space-y-2 sm:space-y-3 md:space-y-4 my-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-zinc-900">{card.title}</h3>
          {activeId === card.id && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-zinc-500 text-xs sm:text-sm md:text-base leading-relaxed italic"
            >
              "{card.desc}"
            </motion.p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-300">Active Node</span>
        </div>
      </div>

      {/* Magnetic Shadow Effect - Responsive opacity */}
      <motion.div
        style={{
          x: shadowX,
          y: shadowY,
        }}
        className="absolute -inset-2 bg-black/5 blur-2xl rounded-[2rem] sm:rounded-[3rem] -z-10 hidden sm:block"
      />
    </motion.div>
  );
}

/**
 * @prop {FloatingCardItem[]} cards - Array of floating cards with title, color, and description (Default: 2 preset cards)
 * @prop {number} defaultActiveId - The ID of the card that is active/expanded by default (Default: null)
 * @prop {number} magneticStrength - Sensitivity factor of the cursor magnetic physics pull (Default: 0.03)
 * @prop {number} springStiffness - Stiffness physics coefficient of the magnetic spring (Default: 100)
 * @prop {number} springDamping - Damping physics coefficient of the magnetic spring (Default: 25)
 * @prop {boolean} showGrid - Whether to render the architectural blueprint background grid (Default: true)
 * @prop {boolean} showPointer - Whether to render custom magnetic cursor follower (Default: true)
 * @prop {function} onCardChange - Callback fired when active card state changes (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function FloatingMagneticAccordion({
  cards = defaultCards,
  defaultActiveId = null,
  magneticStrength = 0.03,
  springStiffness = 100,
  springDamping = 25,
  showGrid = true,
  showPointer = true,
  onCardChange,
  className = ""
}: FloatingMagneticAccordionProps = {}) {
  const [activeId, setActiveId] = useState<number | null>(defaultActiveId);
  const [hasHover, setHasHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: springStiffness, damping: springDamping });
  const springY = useSpring(y, { stiffness: springStiffness, damping: springDamping });

  const handleSelect = (id: number | null) => {
    setActiveId(id);
    onCardChange?.(id);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    const frame = requestAnimationFrame(() => {
      setHasHover(mediaQuery.matches);
    });
    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => {
      cancelAnimationFrame(frame);
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasHover) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full min-h-[350px] sm:min-h-[500px] md:min-h-[600px] bg-transparent rounded-[1.5rem] sm:rounded-[3rem] md:rounded-[4rem] relative overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-12 ${className}`}
    >
      {/* Background Grid */}
      {showGrid && (
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px] md:bg-[size:40px_40px]" />
      )}

      <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center w-full justify-center px-2 sm:px-4">
        {cards.map((card, i) => (
          <CardItem
            key={card.id}
            card={card}
            i={i}
            springX={springX}
            springY={springY}
            activeId={activeId}
            setActiveId={handleSelect}
            hasHover={hasHover}
            magneticStrength={magneticStrength}
          />
        ))}
      </div>

      {/* Floating Indicator - Hidden on touch devices */}
      {showPointer && hasHover && (
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute w-6 h-6 pointer-events-none z-50 mix-blend-difference hidden lg:block"
        >
          <MousePointer2 className="w-full h-full text-white fill-current" />
        </motion.div>
      )}
    </div>
  );
}

