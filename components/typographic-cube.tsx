"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TextItem {
  title: string;
  subtitle?: string;
  isBold?: boolean;
}

export default function TypographicCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Motion values for fluid 3D parallax tilt & orbit
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const depthZ = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);

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
    setHoveredItem(null);
  };

  // Top Isometric Face Lines
  const topPlaneItems: TextItem[] = [
    { title: "CORE", subtitle: "Art" },
    { title: "Matrix", subtitle: "Dimension" },
    { title: "3D Kinetic", subtitle: "Space" },
    { title: "Vector Grid", subtitle: "Unit" },
    { title: "Optical Synthesis", subtitle: "Prototype" },
    { title: "Bauhaus Ratio", subtitle: "Proportion" },
    { title: "Dynamic Axis", subtitle: "Motion" },
    { title: "Minimal Form", subtitle: "Structure" },
    { title: "Spatial Rhythm", subtitle: "Cadence" },
    { title: "Infinite Horizon", subtitle: "System" },
    { title: "Monolith Creative Studio", isBold: true },
  ];

  // Left Vertical Face Lines (Descending down the left vertical isometric edge)
  const leftPlaneItems: TextItem[] = [
    { title: "Hyper Spatial Agency", isBold: true },
    { title: "Morph", subtitle: "Organic Rhythm & Void" },
    { title: "Emerge", subtitle: "Quantum State" },
    { title: "Sculpt", subtitle: "Kinetic Balance" },
    { title: "Tension", subtitle: "Geometric Ratio" },
    { title: "Process", subtitle: "De-Construct" },
    { title: "Lattice", subtitle: "Neural Thought" },
    { title: "Iterate", subtitle: "Visual Logic" },
    { title: "Future", subtitle: "Perspective" },
  ];

  // Right Floor Face Lines
  const rightPlaneItems: TextItem[] = [
    { title: "24 Autumn 2026", isBold: true },
    { title: "Origin", subtitle: "Design System" },
    { title: "Balance", subtitle: "Minimal Void" },
    { title: "Gradient", subtitle: "Monotone Surface" },
    { title: "Evolve", subtitle: "Dynamic Canvas" },
    { title: "Measure", subtitle: "Kinetic Physics" },
    { title: "Graphic", subtitle: "Sound Spectrum" },
    { title: "Vision", subtitle: "Infinite Horizon" },
    { title: "Scale", subtitle: "Dimension" },
    { title: "Orbit", subtitle: "Spin" },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[400px] sm:min-h-[600px] bg-[#FFFFFF] dark:bg-zinc-950 text-black dark:text-white overflow-hidden flex flex-col justify-between p-8 sm:p-14 select-none cursor-default font-sans col-span-1 md:col-span-2 subpixel-antialiased transition-colors duration-700"
    >
      {/* Top Left Swiss Editorial Stamp */}
      <div className="absolute top-10 left-10 sm:top-14 sm:left-14 z-30">
        <p className="text-[12px] font-medium tracking-tight text-black dark:text-white font-sans">
          Mono Exhibition
        </p>
      </div>

      {/* 3D Typographic Isometric Trihedral Sculpture */}
      <div className="w-full flex-1 flex items-center justify-center relative perspective-[1200px]">
        <motion.div
          style={{
            rotateX,
            rotateY,
            z: depthZ,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] flex items-center justify-center translate-x-8 sm:translate-x-16"
        >
          {/* Central 3D Trihedral Apex Origin */}
          <div className="relative w-0 h-0" style={{ transformStyle: "preserve-3d" }}>

            {/* ========================================================================= */}
            {/* 1. TOP ISOMETRIC PLANE */}
            {/* ========================================================================= */}
            <div
              style={{
                transform: "rotate(-30deg) skewX(30deg) translate(-2px, -100%)",
                transformOrigin: "bottom right",
                transformStyle: "preserve-3d",
              }}
              className="absolute right-0 bottom-0 flex flex-col items-end gap-[2px] text-right pointer-events-auto"
            >
              {topPlaneItems.map((item, idx) => {
                const isHovered = hoveredItem === `top-${idx}`;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredItem(`top-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      transform: isHovered ? "translateZ(14px) scale(1.04)" : "translateZ(0px)",
                      transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
                      backfaceVisibility: "hidden",
                      WebkitFontSmoothing: "subpixel-antialiased"
                    }}
                    className={`cursor-pointer whitespace-nowrap leading-[1.15] tracking-tight ${
                      item.isBold
                        ? "text-[13.5px] sm:text-[14.5px] font-bold text-black dark:text-white"
                        : "text-[11px] sm:text-[11.5px] text-[#111111] dark:text-zinc-300 font-normal"
                    } ${hoveredItem && !isHovered ? "opacity-30" : "opacity-100"}`}
                  >
                    <span className="font-semibold">{item.title}</span>
                    {item.subtitle && (
                      <span className="text-[#666666] dark:text-zinc-500 font-light ml-1.5 text-[10px] sm:text-[10.5px]">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ========================================================================= */}
            {/* 2. LEFT VERTICAL ISOMETRIC PLANE */}
            {/* ========================================================================= */}
            <div
              style={{
                transform: "rotate(90deg) skewX(-30deg) translate(-100%, 0px)",
                transformOrigin: "top left",
                transformStyle: "preserve-3d",
              }}
              className="absolute left-0 top-0 flex flex-col items-start gap-[2px] text-left pointer-events-auto"
            >
              {leftPlaneItems.map((item, idx) => {
                const isHovered = hoveredItem === `left-${idx}`;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredItem(`left-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      transform: isHovered ? "translateZ(14px) scale(1.04)" : "translateZ(0px)",
                      transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
                      backfaceVisibility: "hidden",
                      WebkitFontSmoothing: "subpixel-antialiased"
                    }}
                    className={`cursor-pointer whitespace-nowrap leading-[1.15] tracking-tight ${
                      item.isBold
                        ? "text-[13.5px] sm:text-[14.5px] font-bold text-black dark:text-white"
                        : "text-[11px] sm:text-[11.5px] text-[#111111] dark:text-zinc-300 font-normal"
                    } ${hoveredItem && !isHovered ? "opacity-30" : "opacity-100"}`}
                  >
                    <span className="font-semibold">{item.title}</span>
                    {item.subtitle && (
                      <span className="text-[#666666] dark:text-zinc-500 font-light ml-1.5 text-[10px] sm:text-[10.5px]">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ========================================================================= */}
            {/* 3. RIGHT ISOMETRIC FLOOR PLANE */}
            {/* ========================================================================= */}
            <div
              style={{
                transform: "rotate(30deg) skewX(-30deg) translate(0px, 0px)",
                transformOrigin: "top left",
                transformStyle: "preserve-3d",
              }}
              className="absolute left-0 top-0 flex flex-col items-start gap-[2px] text-left pointer-events-auto"
            >
              {rightPlaneItems.map((item, idx) => {
                const isHovered = hoveredItem === `right-${idx}`;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredItem(`right-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      transform: isHovered ? "translateZ(14px) scale(1.04)" : "translateZ(0px)",
                      transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
                      backfaceVisibility: "hidden",
                      WebkitFontSmoothing: "subpixel-antialiased"
                    }}
                    className={`cursor-pointer whitespace-nowrap leading-[1.15] tracking-tight ${
                      item.isBold
                        ? "text-[13.5px] sm:text-[14.5px] font-bold text-black dark:text-white"
                        : "text-[11px] sm:text-[11.5px] text-[#111111] dark:text-zinc-300 font-normal"
                    } ${hoveredItem && !isHovered ? "opacity-30" : "opacity-100"}`}
                  >
                    <span className="font-semibold">{item.title}</span>
                    {item.subtitle && (
                      <span className="text-[#666666] dark:text-zinc-500 font-light ml-1.5 text-[10px] sm:text-[10.5px]">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
