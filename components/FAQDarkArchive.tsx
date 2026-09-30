'use client';

import React, { useRef } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Shield, Target, Zap } from 'lucide-react';

export interface ArchiveFAQCard {
  q: string;
  a: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color?: string;
}

export interface FAQDarkArchiveProps {
  cards?: ArchiveFAQCard[];
  tiltMaxAngle?: number;
  springStiffness?: number;
  springDamping?: number;
  showNodeTag?: boolean;
  showGlow?: boolean;
  className?: string;
}

const defaultFaqs: ArchiveFAQCard[] = [
  {
    q: "System Reliability",
    a: "Our framework runs on a decentralized network designed to guarantee constant availability and peak performance.",
    icon: Shield,
    color: "from-blue-500/20"
  },
  {
    q: "Precision Rendering",
    a: "Every component is meticulously crafted to deliver a flawless, high-resolution visual experience across devices.",
    icon: Target,
    color: "from-emerald-500/20"
  },
  {
    q: "Fluid Animations",
    a: "Interactivity is powered by a custom-built physics logic, making every user action feel natural and responsive.",
    icon: Zap,
    color: "from-amber-500/20"
  },
];

interface CardProps {
  faq: ArchiveFAQCard;
  index: number;
  tiltMaxAngle: number;
  springStiffness: number;
  springDamping: number;
  showNodeTag: boolean;
  showGlow: boolean;
}

function ArchiveCard({
  faq,
  index,
  tiltMaxAngle,
  springStiffness,
  springDamping,
  showNodeTag,
  showGlow
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = faq.icon || Shield;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: springStiffness, damping: springDamping });
  const mouseYSpring = useSpring(y, { stiffness: springStiffness, damping: springDamping });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltMaxAngle}deg`, `-${tiltMaxAngle}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltMaxAngle}deg`, `${tiltMaxAngle}deg`]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="group relative bg-zinc-900/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-zinc-800/50 backdrop-blur-xl transition-colors hover:border-zinc-700/50 flex flex-col h-full cursor-pointer"
    >
      {/* Mouse Glow */}
      {showGlow && (
        <div className={`absolute inset-0 bg-gradient-to-br ${faq.color || 'from-indigo-500/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10`} />
      )}

      <div style={{ transform: "translateZ(30px)" }} className="space-y-4 sm:space-y-5 flex-1">
        <div className="flex items-center justify-between">
          {showNodeTag && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500">Node_0{index + 1}</span>
            </div>
          )}
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 group-hover:text-zinc-300 transition-colors" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
            {faq.q}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-4">
            {faq.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * @prop {ArchiveFAQCard[]} cards - Array of dark glassmorphic archive cards with 3D cursor tilt physics (Default: 3 preset cards)
 * @prop {number} tiltMaxAngle - Maximum tilt angle in degrees when cursor hovers near card edges (Default: 10)
 * @prop {number} springStiffness - Physics spring stiffness for the tilt reaction (Default: 120)
 * @prop {number} springDamping - Physics spring damping for smooth settle after cursor leaves (Default: 20)
 * @prop {boolean} showNodeTag - Whether to display node sequence indicator e.g. Node_01 (Default: true)
 * @prop {boolean} showGlow - Whether to display reactive ambient colored gradient glow on hover (Default: true)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function FAQDarkArchive({
  cards = defaultFaqs,
  tiltMaxAngle = 10,
  springStiffness = 120,
  springDamping = 20,
  showNodeTag = true,
  showGlow = true,
  className = ""
}: FAQDarkArchiveProps = {}) {
  return (
    <div className={`w-full bg-[#0a0a0a] rounded-2xl sm:rounded-3xl flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans antialiased ${className}`}>
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((faq, i) => (
            <ArchiveCard
              key={i}
              faq={faq}
              index={i}
              tiltMaxAngle={tiltMaxAngle}
              springStiffness={springStiffness}
              springDamping={springDamping}
              showNodeTag={showNodeTag}
              showGlow={showGlow}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
