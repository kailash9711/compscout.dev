'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Globe, Fingerprint, Layers } from 'lucide-react';

export interface PrismFAQItem {
  q: string;
  a: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tag?: string;
}

export interface FAQPrismSpotlightProps {
  items?: PrismFAQItem[];
  statusBadgeText?: string;
  title?: string;
  spotlightRadius?: number;
  spotlightColor?: string;
  className?: string;
}

const defaultFaqs: PrismFAQItem[] = [
  {
    q: "How fast is the data processing?",
    a: "Our core engine processes streams instantaneously, ensuring seamless operations without any perceptible delay.",
    icon: Globe,
    tag: "Latency"
  },
  {
    q: "Is my information secure?",
    a: "Security is our foundation. We employ advanced cryptographic layers to keep your assets completely isolated.",
    icon: Fingerprint,
    tag: "Crypto"
  },
  {
    q: "Do you support external integrations?",
    a: "Yes, our modular architecture allows you to easily connect with third-party tools and export your workspaces.",
    icon: Layers,
    tag: "APIs"
  },
];

/**
 * @prop {PrismFAQItem[]} items - Array of interactive prism spotlight FAQ cards (Default: 3 preset inquiry cards)
 * @prop {string} statusBadgeText - Pill tag text displayed above headline (Default: 'System_Online')
 * @prop {string} title - Main headline title text (Default: 'Advanced Insights.')
 * @prop {number} spotlightRadius - Pixel radius of cursor radial spotlight aura (Default: 200)
 * @prop {string} spotlightColor - RGBA color string of spotlight flare (Default: 'rgba(255, 255, 255, 0.06)')
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function FAQPrismSpotlight({
  items = defaultFaqs,
  statusBadgeText = "System_Online",
  title = "Advanced Insights.",
  spotlightRadius = 200,
  spotlightColor = "rgba(255, 255, 255, 0.06)",
  className = ""
}: FAQPrismSpotlightProps = {}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`
    radial-gradient(
      ${spotlightRadius}px circle at ${mouseX}px ${mouseY}px,
      ${spotlightColor},
      transparent 80%
    )
  `;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative w-full bg-[#09090b] rounded-2xl sm:rounded-3xl flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans antialiased overflow-hidden group/container ${className}`}
    >
      <div className="max-w-4xl w-full space-y-6 sm:space-y-8">

        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-300">{statusBadgeText}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 relative">
          {items.map((faq, i) => {
            const Icon = faq.icon || Globe;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-zinc-900/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-zinc-800 transition-all duration-500 hover:border-zinc-600 hover:-translate-y-1 shadow-2xl cursor-pointer"
              >
                {/* Individual Item Spotlight */}
                <motion.div
                  className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: spotlightBg,
                  }}
                />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    {faq.tag && (
                      <span className="text-[9px] font-mono font-medium text-zinc-500 uppercase tracking-widest bg-zinc-800/40 px-2 py-0.5 rounded-md border border-zinc-700/50">
                        {faq.tag}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
