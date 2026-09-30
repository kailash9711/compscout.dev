"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export interface CardMagneticCompassProps {
  springStiffness?: number;
  springDamping?: number;
  autoRotateInterval?: number;
  needleColorNorth?: string;
  needleColorSouth?: string;
  showDegreeReadout?: boolean;
  className?: string;
}

/**
 * @prop {number} springStiffness - Physics spring stiffness for needle magnetic tracking (Default: 200)
 * @prop {number} springDamping - Physics spring damping for needle stability (Default: 20)
 * @prop {number} autoRotateInterval - Interval in milliseconds for ambient idle needle sweep (Default: 2000)
 * @prop {string} needleColorNorth - Background color CSS class for North needle tip (Default: 'bg-emerald-500')
 * @prop {string} needleColorSouth - Background color CSS class for South needle tip (Default: 'bg-rose-500')
 * @prop {boolean} showDegreeReadout - Whether to render degree numbers and cardinal heading text (Default: true)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function CardMagneticCompass({
  springStiffness = 200,
  springDamping = 20,
  autoRotateInterval = 2000,
  needleColorNorth = "bg-emerald-500",
  needleColorSouth = "bg-rose-500",
  showDegreeReadout = true,
  className = ""
}: CardMagneticCompassProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(0);

  const isHovered = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [displayAngle, setDisplayAngle] = useState(0);
  const [headingStr, setHeadingStr] = useState("North");

  useEffect(() => {
    const t = setInterval(() => setAutoRotate((prev) => prev + 45), autoRotateInterval);
    return () => clearInterval(t);
  }, [autoRotateInterval]);

  const rotationDegrees = useTransform([mouseX, mouseY], ([x, y]: any[]) => {
    if (!ref.current) return autoRotate;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (isHovered.get() === 1) {
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      return angle + 90;
    }
    return autoRotate;
  });

  const smoothRotation = useSpring(rotationDegrees, { damping: springDamping, stiffness: springStiffness });

  useEffect(() => {
    const unsubscribe = smoothRotation.on("change", (latestVal) => {
      let normalized = Math.round(latestVal % 360);
      if (normalized < 0) normalized += 360;

      setDisplayAngle(normalized);

      let dir = "North";
      if (normalized >= 45 && normalized < 135) dir = "East";
      else if (normalized >= 135 && normalized < 225) dir = "South";
      else if (normalized >= 225 && normalized < 315) dir = "West";
      setHeadingStr(dir);
    });
    return unsubscribe;
  }, [smoothRotation]);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        isHovered.set(1);
      }}
      onMouseLeave={() => {
        isHovered.set(0);
      }}
      className={`group relative flex flex-col items-center justify-center gap-3 font-sans select-none cursor-pointer py-2 ${className}`}
    >
      {/* Immersive Compass Aura */}
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-32 w-32 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 blur-[30px] transition-colors duration-500 group-hover:bg-emerald-500/25"
      />

      {/* Crafted Compass Dial */}
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-zinc-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm dark:shadow-inner transition-colors duration-500 group-hover:border-zinc-400 dark:group-hover:border-neutral-700">
        {/* Cardinal Direction Markers */}
        <span className="absolute top-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">N</span>
        <span className="absolute bottom-2 text-[10px] font-bold text-zinc-400 dark:text-neutral-600">S</span>
        <span className="absolute right-2 text-[10px] font-bold text-zinc-400 dark:text-neutral-600">E</span>
        <span className="absolute left-2 text-[10px] font-bold text-zinc-400 dark:text-neutral-600">W</span>

        {/* Magnetic Needle */}
        <motion.div style={{ rotate: smoothRotation }} className="flex h-full w-full items-center justify-center">
          <div className={`absolute top-[16px] h-8 w-[3.5px] rounded-full ${needleColorNorth} shadow-[0_0_10px_rgba(16,185,129,0.8)] z-10`} />
          <div className={`absolute bottom-[16px] h-8 w-[3.5px] rounded-full ${needleColorSouth} z-10`} />
          {/* Axis Pin */}
          <div className="relative z-20 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-neutral-950 bg-zinc-800 dark:bg-white shadow-sm" />
        </motion.div>
      </div>

      {showDegreeReadout && (
        <div className="flex flex-col items-center text-center">
          <span className="font-mono text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            {displayAngle}°
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {headingStr} Heading
          </span>
        </div>
      )}
    </div>
  );
}
