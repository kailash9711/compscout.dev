"use client";

import React, { useId } from 'react';

export interface AvatarLiquidRevealProps {
  avatarUrl?: string;
  alt?: string;
  className?: string;
}

/**
 * @prop {string} avatarUrl - Image source URL for morphing liquid reveal avatar (Default: High quality Unsplash portrait)
 * @prop {string} alt - Alternate text description for accessibility (Default: 'Liquid Mask Avatar')
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function AvatarLiquidReveal({
  avatarUrl = "https://compscout.dev/card/ou9spusiqwwixogtgneg.webp",
  alt = "Liquid Mask Avatar",
  className = ""
}: AvatarLiquidRevealProps = {}) {
  const clipId = useId().replace(/:/g, "");

  const initialPath = "M0.5 0.25C0.35 0.25 0.25 0.35 0.25 0.5C0.25 0.65 0.35 0.75 0.5 0.75C0.65 0.75 0.75 0.65 0.75 0.5C0.75 0.35 0.65 0.25 0.5 0.25Z";
  const revealPath = "M0.5 0C0.2 0 0 0.2 0 0.5C0 0.8 0.2 1 0.5 1C0.8 1 1 0.8 1 0.5C1 0.2 0.8 0 0.5 0Z";

  return (
    <div className={`flex justify-center py-2 font-sans ${className}`}>
      <style dangerouslySetInnerHTML={{__html: `
        .liquid-path-${clipId} {
          d: path('${initialPath}');
          transition: d 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .group:hover .liquid-path-${clipId} {
          d: path('${revealPath}');
        }
      `}} />
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 cursor-pointer group">
        {/* SVG Mask Definition */}
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <clipPath id={`liquidClip-${clipId}`} clipPathUnits="objectBoundingBox">
              <path className={`liquid-path-${clipId}`} />
            </clipPath>
          </defs>
        </svg>

        {/* Background Placeholder */}
        <div className="absolute inset-0 bg-zinc-900/40 rounded-full scale-[0.98] border border-white/5 shadow-inner" />

        {/* Masked Image */}
        <img
          src={avatarUrl}
          alt={alt}
          className="w-full h-full object-cover shadow-2xl transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-[0.8] -rotate-[5deg] group-hover:scale-100 group-hover:rotate-0"
          style={{ clipPath: `url(#liquidClip-${clipId})` }}
        />

        {/* Gloss Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-full" />
      </div>
    </div>
  );
}
