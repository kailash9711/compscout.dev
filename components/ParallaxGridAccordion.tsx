'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { Layers, Zap, Globe, ArrowUpRight, Sparkles } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const defaultItems: ParallaxGridItem[] = [
  {
    id: 1,
    title: 'Spatial Layer',
    tag: '01',
    icon: Layers,
    gradient: 'from-violet-600 via-purple-700 to-indigo-800',
    glow: '#7c3aed',
    accent: '#a78bfa',
    noise: 'rgba(167,139,250,0.08)',
    content: 'Experience deep architectural depth with parallax grid integration and immersive spatial computing transitions.',
    stat: '12 ms',
    statLabel: 'Response',
  },
  {
    id: 2,
    title: 'Kinetic Frame',
    tag: '02',
    icon: Zap,
    gradient: 'from-cyan-500 via-sky-600 to-blue-700',
    glow: '#0ea5e9',
    accent: '#38bdf8',
    noise: 'rgba(56,189,248,0.08)',
    content: "Responsive tilting that reacts to your cursor's coordinate matrix in real-time with buttery-smooth spring physics.",
    stat: '60 fps',
    statLabel: 'Smooth',
  },
  {
    id: 3,
    title: 'Void Concept',
    tag: '03',
    icon: Globe,
    gradient: 'from-emerald-500 via-teal-600 to-green-800',
    glow: '#10b981',
    accent: '#6ee7b7',
    noise: 'rgba(110,231,183,0.08)',
    content: 'Minimalist geometry meets advanced spatial computing — where every pixel breathes purpose and motion.',
    stat: '∞',
    statLabel: 'Depth',
  },
];

/* ─── Types ─────────────────────────────────────────────────────────────────── */
export interface ParallaxGridItem {
  id: number;
  title: string;
  tag: string;
  icon?: React.ElementType;
  gradient: string;
  glow: string;
  accent: string;
  noise?: string;
  content: string;
  stat?: string;
  statLabel?: string;
}

export interface ParallaxGridAccordionProps {
  items?: ParallaxGridItem[];
  defaultActiveId?: number | null;
  springStiffness?: number;
  springDamping?: number;
  showAmbientBlobs?: boolean;
  onCardChange?: (id: number | null) => void;
  className?: string;
}

interface GridItemProps {
  item: ParallaxGridItem;
  i: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
  hasHover: boolean;
}

/* ─── Noise SVG texture (desktop only — feTurbulence is expensive on mobile) ─── */
function NoiseSVG({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-overlay"
    >
      <filter id={`noise-${color.replace(/[^a-z]/gi, '')}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#noise-${color.replace(/[^a-z]/gi, '')})`} />
    </svg>
  );
}

/* ─── Floating orbs background ───────────────────────────────────────────────── */
function FloatingOrb({ color, delay, size, top, left }: { color: string; delay: number; size: number; top: string; left: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
        width: size,
        height: size,
        top,
        left,
        filter: 'blur(40px)',
      }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ─── Grid Card ──────────────────────────────────────────────────────────────── */
function GridItem({ item, i, springX, springY, activeId, setActiveId, hasHover }: GridItemProps) {
  const Icon = item.icon;
  const isActive = activeId === item.id;

  /* All parallax / 3D transforms only on hover-capable (desktop) devices */
  const factor = 0.04 + i * 0.01;
  const rotX = useTransform(springY, (v: number) => hasHover ? -v * factor * 0.4 : 0);
  const rotY = useTransform(springX, (v: number) => hasHover ? v * factor * 0.4 : 0);
  const tx = useTransform(springX, (v: number) => hasHover ? v * factor : 0);
  const ty = useTransform(springY, (v: number) => hasHover ? v * factor : 0);

  /* Shine highlight — only computed on desktop (useMotionTemplate must always be called) */
  const shineX = useTransform(springX, [-400, 400], ['120%', '-20%']);
  const shineY = useTransform(springY, [-400, 400], ['120%', '-20%']);
  const shineBg = useMotionTemplate`radial-gradient(ellipse 60% 60% at ${shineX} ${shineY}, rgba(255,255,255,0.12), transparent)`;

  return (
    <motion.div
      onClick={() => setActiveId(isActive ? null : item.id)}
      className="relative cursor-pointer group select-none"
      /* perspective only matters when 3D rotations are active (desktop) */
      style={hasHover ? { perspective: 1200 } : undefined}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: hasHover ? 0.6 : 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={hasHover ? { rotateX: rotX, rotateY: rotY, x: tx, y: ty } : undefined}
        className="relative h-full"
        whileHover={hasHover ? { scale: 1.025 } : undefined}
        whileTap={{ scale: 0.975 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        {/* Card Shell */}
        <div
          className={`relative rounded-xl sm:rounded-2xl overflow-hidden h-full transition-shadow duration-500 ${isActive ? 'shadow-2xl' : 'shadow-lg group-hover:shadow-xl'
            }`}
          style={{
            boxShadow: isActive
              ? `0 0 0 1.5px ${item.accent}55, 0 24px 60px ${item.glow}40, 0 4px 20px rgba(0,0,0,0.5)`
              : `0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

          {/* Noise grain — skip on touch devices (feTurbulence is GPU expensive) */}
          {hasHover && <NoiseSVG color={item.glow} />}

          {/* Subtle mesh grid — static, cheap on all devices */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `linear-gradient(${item.accent}33 1px, transparent 1px), linear-gradient(90deg, ${item.accent}33 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Shine overlay — desktop only */}
          {hasHover && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: shineBg }}
            />
          )}

          {/* Glow orb inside card — skip animation on mobile */}
          {hasHover && <FloatingOrb color={item.glow} delay={i * 0.5} size={200} top="-20%" left="60%" />}

          {/* Content */}
          <div className="relative z-10 h-full p-3.5 sm:p-4 md:p-5 flex flex-col justify-between text-white min-h-[160px] sm:min-h-[170px] md:min-h-[200px]">

            {/* Top row */}
            <div className="flex items-start justify-between">
              <motion.div
                /* backdrop-blur is very expensive on mobile — only on desktop */
                className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl${hasHover ? ' backdrop-blur-md' : ''}`}
                style={{ background: `${item.glow}30`, border: `1px solid ${item.accent}40` }}
                whileHover={hasHover ? { rotate: 10, scale: 1.1 } : undefined}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: item.accent }} />}
              </motion.div>

              <div className="flex flex-col items-end gap-1">
                <span
                  className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] uppercase px-1.5 py-0.5 rounded-full"
                  style={{ background: `${item.accent}18`, color: item.accent, border: `1px solid ${item.accent}30` }}
                >
                  {item.tag}
                </span>
                <motion.div
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-40" />
                </motion.div>
              </div>
            </div>

            {/* Middle — title + content */}
            <div className="flex-1 flex flex-col justify-end gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              <h3
                className="text-sm sm:text-base md:text-lg font-black tracking-tight leading-[1.1] uppercase"
                style={{ textShadow: `0 2px 20px ${item.glow}80` }}
              >
                {item.title}
              </h3>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-white/70 pr-1">
                      {item.content}
                    </p>

                    {/* Stats pill */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 }}
                      className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-lg"
                      style={{ background: `${item.glow}25`, border: `1px solid ${item.accent}30` }}
                    >
                      <Sparkles className="w-2.5 h-2.5" style={{ color: item.accent }} />
                      <span className="text-[9px] sm:text-[10px] font-bold" style={{ color: item.accent }}>{item.stat}</span>
                      <span className="text-[9px] sm:text-[10px] text-white/40 font-medium">{item.statLabel}</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between mt-3 pt-2.5 sm:mt-4 sm:pt-3" style={{ borderTop: `1px solid ${item.accent}20` }}>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                  style={{ background: item.accent }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.15em] uppercase text-white/40">
                  Depth Matrix
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-10 sm:w-12 h-0.5 rounded-full overflow-hidden" style={{ background: `${item.accent}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: item.accent }}
                  initial={{ width: '30%' }}
                  animate={{ width: isActive ? '100%' : '30%' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
/**
 * @prop {ParallaxGridItem[]} items - Array of 3D parallax grid items with title, tag, theme colors, and content (Default: 3 preset items)
 * @prop {number} defaultActiveId - The ID of the item to be expanded initially (Default: null)
 * @prop {number} springStiffness - Stiffness coefficient for cursor 3D tilting spring physics (Default: 80)
 * @prop {number} springDamping - Damping coefficient for cursor 3D tilting spring physics (Default: 20)
 * @prop {boolean} showAmbientBlobs - Whether to render ambient colorful gradient orbs in background (Default: true)
 * @prop {function} onCardChange - Callback fired when a parallax card is clicked or toggled (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function ParallaxGridAccordion({
  items = defaultItems,
  defaultActiveId = null,
  springStiffness = 80,
  springDamping = 20,
  showAmbientBlobs = true,
  onCardChange,
  className = ""
}: ParallaxGridAccordionProps = {}) {
  const [activeId, setActiveId] = useState<number | null>(defaultActiveId);
  const [hasHover, setHasHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: springStiffness, damping: springDamping, mass: 0.8 });
  const springY = useSpring(y, { stiffness: springStiffness, damping: springDamping, mass: 0.8 });

  const handleSelect = (id: number | null) => {
    setActiveId(id);
    onCardChange?.(id);
  };

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    const frame = requestAnimationFrame(() => {
      setHasHover(mq.matches);
    });
    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mq.addEventListener('change', handler);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener('change', handler);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasHover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-full relative flex flex-col items-center justify-center p-2 sm:p-3 md:p-5 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {/* Ambient background blobs — animated only on desktop, static on mobile */}
      {showAmbientBlobs && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {hasHover ? (
            <>
              <motion.div
                className="absolute w-96 h-96 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', top: '-10%', left: '-5%', filter: 'blur(80px)' }}
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-80 h-80 rounded-full opacity-15"
                style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)', bottom: '-10%', right: '-5%', filter: 'blur(80px)' }}
                animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </>
          ) : (
            /* Static blobs — zero animation cost on touch devices */
            <>
              <div className="absolute w-64 h-64 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', top: '-5%', left: '-5%', filter: 'blur(60px)' }} />
              <div className="absolute w-56 h-56 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)', bottom: '-5%', right: '-5%', filter: 'blur(60px)' }} />
            </>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3">
        {items.map((item, i) => (
          <GridItem
            key={item.id}
            item={item}
            i={i}
            springX={springX}
            springY={springY}
            activeId={activeId}
            setActiveId={setActiveId}
            hasHover={hasHover}
          />
        ))}
      </div>
    </div>
  );
}
