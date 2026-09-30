"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";


interface ColorProfile {
  id: string;
  name: string;
  hue: string;
  secondaryHue: string;
  freq: number;
  gradient: string;
  fluidConic: string;
  glowShadow: string;
}

const COLOR_PALETTES: ColorProfile[] = [
  {
    id: "cyan",
    name: "Cyan Caustic",
    hue: "#00F2FE",
    secondaryHue: "#4FACFE",
    freq: 520,
    gradient: "linear-gradient(135deg, rgba(0, 242, 254, 0.3) 0%, rgba(79, 172, 254, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #00F2FE 90deg, #4FACFE 180deg, transparent 270deg, #00F2FE 360deg)",
    glowShadow: "rgba(0, 242, 254, 0.5)"
  },
  {
    id: "fuchsia",
    name: "Fuchsia Pulse",
    hue: "#FF007F",
    secondaryHue: "#7928CA",
    freq: 660,
    gradient: "linear-gradient(135deg, rgba(255, 0, 127, 0.3) 0%, rgba(121, 40, 202, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #FF007F 90deg, #7928CA 180deg, transparent 270deg, #FF007F 360deg)",
    glowShadow: "rgba(255, 0, 127, 0.5)"
  },
  {
    id: "emerald",
    name: "Acid Emerald",
    hue: "#00FFA3",
    secondaryHue: "#00B894",
    freq: 780,
    gradient: "linear-gradient(135deg, rgba(0, 255, 163, 0.3) 0%, rgba(0, 184, 148, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #00FFA3 90deg, #00B894 180deg, transparent 270deg, #00FFA3 360deg)",
    glowShadow: "rgba(0, 255, 163, 0.5)"
  },
  {
    id: "plasma",
    name: "Solar Plasma",
    hue: "#FF8A00",
    secondaryHue: "#FF0055",
    freq: 880,
    gradient: "linear-gradient(135deg, rgba(255, 138, 0, 0.3) 0%, rgba(255, 0, 85, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #FF8A00 90deg, #FF0055 180deg, transparent 270deg, #FF8A00 360deg)",
    glowShadow: "rgba(255, 138, 0, 0.5)"
  },
  {
    id: "violet",
    name: "Hyper Violet",
    hue: "#8B5CF6",
    secondaryHue: "#EC4899",
    freq: 980,
    gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #8B5CF6 90deg, #EC4899 180deg, transparent 270deg, #8B5CF6 360deg)",
    glowShadow: "rgba(139, 92, 246, 0.5)"
  },
  {
    id: "amber",
    name: "Radiant Gold",
    hue: "#FFD700",
    secondaryHue: "#FF6A00",
    freq: 1100,
    gradient: "linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 106, 0, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #FFD700 90deg, #FF6A00 180deg, transparent 270deg, #FFD700 360deg)",
    glowShadow: "rgba(255, 215, 0, 0.5)"
  },
  {
    id: "electric-blue",
    name: "Electric Azure",
    hue: "#0066FF",
    secondaryHue: "#00F2FE",
    freq: 580,
    gradient: "linear-gradient(135deg, rgba(0, 102, 255, 0.3) 0%, rgba(0, 242, 254, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #0066FF 90deg, #00F2FE 180deg, transparent 270deg, #0066FF 360deg)",
    glowShadow: "rgba(0, 102, 255, 0.5)"
  },
  {
    id: "crimson",
    name: "Neon Crimson",
    hue: "#FF2A6D",
    secondaryHue: "#05D9E8",
    freq: 720,
    gradient: "linear-gradient(135deg, rgba(255, 42, 109, 0.3) 0%, rgba(5, 217, 232, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #FF2A6D 90deg, #05D9E8 180deg, transparent 270deg, #FF2A6D 360deg)",
    glowShadow: "rgba(255, 42, 109, 0.5)"
  }
];

interface GridBlockBase {
  id: number;
  col: number;
  rowOffset: string;
}

const GRID_STRUCTURE: GridBlockBase[] = [
  { id: 1, col: 1, rowOffset: "translate-y-[50px] sm:translate-y-[70px] md:translate-y-[90px]" },
  { id: 2, col: 2, rowOffset: "translate-y-0" },
  { id: 3, col: 2, rowOffset: "translate-y-0" },
  { id: 4, col: 3, rowOffset: "translate-y-[60px] sm:translate-y-[80px] md:translate-y-[100px]" },
  { id: 5, col: 3, rowOffset: "translate-y-[60px] sm:translate-y-[80px] md:translate-y-[100px]" },
  { id: 6, col: 4, rowOffset: "translate-y-[120px] sm:translate-y-[150px] md:translate-y-[180px]" }
];

export default function FluidGridCascadeWidget() {
  const [colorIndices, setColorIndices] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [activeBlock, setActiveBlock] = useState<number | null>(2);
  const [flowSpeed, setFlowSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [allFluidActive, setAllFluidActive] = useState(true);
  const [shuffleCount, setShuffleCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastShuffleTime = useRef<number>(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 26, stiffness: 140 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const playHarmonicTone = useCallback((freq: number) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, now);
      osc1.frequency.exponentialRampToValueAtTime(freq * 1.4, now + 0.12);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2.01, now);
      osc2.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.15);
      osc2.stop(now + 0.15);
    } catch {
      // AudioContext unavailable
    }
  }, [soundEnabled]);

  const triggerColorShuffle = useCallback((hoveredBlockId: number) => {
    const now = Date.now();
    if (now - lastShuffleTime.current < 120) return;
    lastShuffleTime.current = now;

    setColorIndices((prev) => {
      const newIndices = [...prev];
      const step = 1;
      const rotated = newIndices.map((idx, i) => {
        return (idx + step + (i === hoveredBlockId - 1 ? 1 : 0)) % COLOR_PALETTES.length;
      });
      return rotated;
    });

    setShuffleCount((c) => c + 1);

    const currentColor = COLOR_PALETTES[colorIndices[(hoveredBlockId - 1) % colorIndices.length]];
    if (currentColor) {
      playHarmonicTone(currentColor.freq);
    }
  }, [colorIndices, playHarmonicTone]);

  const handleManualShuffle = () => {
    setColorIndices((prev) => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled;
    });
    setShuffleCount((c) => c + 1);
    playHarmonicTone(880);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const col1 = GRID_STRUCTURE.filter((b) => b.col === 1);
  const col2 = GRID_STRUCTURE.filter((b) => b.col === 2);
  const col3 = GRID_STRUCTURE.filter((b) => b.col === 3);
  const col4 = GRID_STRUCTURE.filter((b) => b.col === 4);

  const activeColor = COLOR_PALETTES[colorIndices[(activeBlock ? activeBlock - 1 : 0) % colorIndices.length]];

  return (
    <div className="relative w-full h-full col-span-1 md:col-span-2 min-h-[500px] bg-transparent text-white flex flex-col items-center justify-center p-4 sm:p-8 font-sans select-none overflow-hidden antialiased">

      {/* Grid */}
      <div
        style={{ perspective: 1400 }}
        className="relative w-full max-w-[940px] flex items-center justify-center py-4"
      >
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full grid grid-cols-4 gap-3 sm:gap-4 md:gap-5 items-start justify-center pb-24 sm:pb-32"
        >
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {col1.map((block) => {
              const color = COLOR_PALETTES[colorIndices[(block.id - 1) % colorIndices.length]];
              return (
                <DynamicColorBlock
                  key={block.id}
                  block={block}
                  color={color}
                  isActive={activeBlock === block.id}
                  allFluidActive={allFluidActive}
                  flowSpeed={flowSpeed}
                  onHover={() => triggerColorShuffle(block.id)}
                  onClick={() => {
                    setActiveBlock(block.id);
                    triggerColorShuffle(block.id);
                  }}
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {col2.map((block) => {
              const color = COLOR_PALETTES[colorIndices[(block.id - 1) % colorIndices.length]];
              return (
                <DynamicColorBlock
                  key={block.id}
                  block={block}
                  color={color}
                  isActive={activeBlock === block.id}
                  allFluidActive={allFluidActive}
                  flowSpeed={flowSpeed}
                  onHover={() => triggerColorShuffle(block.id)}
                  onClick={() => {
                    setActiveBlock(block.id);
                    triggerColorShuffle(block.id);
                  }}
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {col3.map((block) => {
              const color = COLOR_PALETTES[colorIndices[(block.id - 1) % colorIndices.length]];
              return (
                <DynamicColorBlock
                  key={block.id}
                  block={block}
                  color={color}
                  isActive={activeBlock === block.id}
                  allFluidActive={allFluidActive}
                  flowSpeed={flowSpeed}
                  onHover={() => triggerColorShuffle(block.id)}
                  onClick={() => {
                    setActiveBlock(block.id);
                    triggerColorShuffle(block.id);
                  }}
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {col4.map((block) => {
              const color = COLOR_PALETTES[colorIndices[(block.id - 1) % colorIndices.length]];
              return (
                <DynamicColorBlock
                  key={block.id}
                  block={block}
                  color={color}
                  isActive={activeBlock === block.id}
                  allFluidActive={allFluidActive}
                  flowSpeed={flowSpeed}
                  onHover={() => triggerColorShuffle(block.id)}
                  onClick={() => {
                    setActiveBlock(block.id);
                    triggerColorShuffle(block.id);
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </div>



    </div>
  );
}

function DynamicColorBlock({
  block,
  color,
  isActive,
  allFluidActive,
  flowSpeed,
  onHover,
  onClick
}: {
  block: GridBlockBase;
  color: ColorProfile;
  isActive: boolean;
  allFluidActive: boolean;
  flowSpeed: number;
  onHover: () => void;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const showFluid = allFluidActive || isActive || isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`relative w-full ${block.rowOffset}`}>
      <motion.div
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.04, y: -5 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-[18px] sm:rounded-[22px] p-[2px] cursor-pointer select-none group"
      >
        {showFluid && (
          <div className="absolute -inset-[1.8px] rounded-[20px] sm:rounded-[24px] overflow-hidden pointer-events-none z-0">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: (isActive ? 3 : 5.5) / flowSpeed,
              }}
              className="w-[250%] h-[250%] -top-[75%] -left-[75%] absolute transition-all duration-500"
              style={{
                background: color.fluidConic,
              }}
            />

            <div
              className={`absolute inset-0 rounded-[20px] blur-[10px] transition-all duration-500 ${isActive ? "opacity-100" : isHovered ? "opacity-85" : "opacity-45"
                }`}
              style={{
                background: `linear-gradient(135deg, ${color.hue}, ${color.secondaryHue})`
              }}
            />
          </div>
        )}

        <div
          className="relative w-full h-full rounded-[16px] sm:rounded-[20px] bg-[#0E1015]/90 backdrop-blur-2xl p-4 sm:p-5 flex flex-col justify-between border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.8)] overflow-hidden z-10"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-85 mix-blend-screen transition-all duration-500"
            style={{
              background: color.gradient
            }}
          />

          <motion.div
            animate={{
              scale: isActive ? [1, 1.18, 1] : isHovered ? [1, 1.1, 1] : 1,
              opacity: isActive ? 0.7 : isHovered ? 0.5 : 0.25,
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: color.hue }}
          />

          <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-white/50 group-hover:text-white transition-colors">
              0{block.id}
            </span>

            <motion.span
              animate={{
                scale: isActive ? [1, 1.35, 1] : 1,
                opacity: isActive ? 1 : 0.5
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full transition-colors duration-500"
              style={{ backgroundColor: color.hue }}
            />
          </div>

          <div className="relative z-10 my-auto flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300"
            >
              <div
                className="w-3.5 h-3.5 rounded-full shadow-md transition-colors duration-500"
                style={{ backgroundColor: color.hue }}
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-300 truncate transition-colors duration-500">
              {color.name}
            </span>

            <span
              className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 transition-colors duration-500"
              style={{ color: color.hue }}
            >
              HEX
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
