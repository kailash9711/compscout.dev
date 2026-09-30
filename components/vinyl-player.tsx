"use client";
import React, { useState, useEffect } from 'react';

interface VinylMusicPlayerProps {
    title?: string;
    artist?: string;
    albumArt?: string;
}

export default function VinylMusicPlayer({
    title = "Retrograde",
    artist = "James Blake",
    albumArt = "https://compscout.dev/new/cock.webp"
}: VinylMusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Simulate progress bar moving
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => (p >= 100 ? 0 : p + 0.5));
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative w-full max-w-[420px] h-[300px] flex items-center justify-start ml-0 md:ml-[-60px] font-sans">
                
                {/* Vinyl Record (Slides out to the right) */}
                <div 
                    className={`absolute left-2 top-1/2 -translate-y-1/2 transition-transform duration-[1000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 ${
                        isPlaying ? 'translate-x-[140px]' : 'translate-x-[20px]'
                    }`}
                >
                    <div 
                        className="w-[250px] h-[250px] bg-[#111] dark:bg-[#050505] rounded-full shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/10 flex items-center justify-center relative"
                        style={{ animation: isPlaying ? 'spin 3s linear infinite' : 'none' }}
                    >
                        {/* Grooves */}
                        <div className="absolute inset-[6px] rounded-full border border-white/5 pointer-events-none" />
                        <div className="absolute inset-[18px] rounded-full border border-white/5 pointer-events-none" />
                        <div className="absolute inset-[30px] rounded-full border border-white/5 pointer-events-none" />
                        <div className="absolute inset-[42px] rounded-full border border-white/5 pointer-events-none" />
                        <div className="absolute inset-[54px] rounded-full border border-white/5 pointer-events-none" />
                        
                        {/* Center Label (Mini Album Art) */}
                        <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-[3px] border-[#111] relative z-20">
                            <img src={albumArt} className="w-full h-full object-cover" alt="Vinyl Label" />
                        </div>
                        
                        {/* Spindle Hole */}
                        <div className="absolute w-3 h-3 bg-zinc-50 dark:bg-[#0a0a0c] rounded-full z-30 shadow-inner" />
                        
                        {/* Light Reflection Simulation */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-white/10 via-transparent to-white/5 pointer-events-none mix-blend-screen" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Album Sleeve */}
                <div 
                    className="relative z-20 w-[270px] h-[270px] rounded-sm shadow-[20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden bg-zinc-200 group cursor-pointer"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    <img src={albumArt} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" alt="Album Cover" />
                    
                    {/* Shadow overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 border border-white/10 pointer-events-none" />

                    {/* Minimalist Controls - slide up on hover */}
                    <div 
                        className="absolute inset-x-0 bottom-0 p-5 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-[20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col"
                        onClick={(e) => e.stopPropagation()} // Prevent clicking controls from triggering sleeve click
                    >
                        
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col min-w-0 pr-4">
                                <h3 className="text-white font-extrabold text-lg tracking-tight truncate">{title}</h3>
                                <p className="text-zinc-300 text-[10px] font-bold uppercase tracking-[0.2em] truncate mt-1">{artist}</p>
                            </div>
                            
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-all duration-300 shrink-0 shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                            >
                                {isPlaying ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="6" width="3" height="12" rx="1"></rect><rect x="14" y="6" width="3" height="12" rx="1"></rect></svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M5.5 4.5l14 7.5-14 7.5v-15z" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" /></svg>
                                )}
                            </button>
                        </div>
                        
                        {/* Minimal Progress Line */}
                        <div className="w-full h-[3px] bg-white/20 mt-5 rounded-full overflow-hidden cursor-pointer group/progress relative">
                            <div 
                                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500 ease-linear" 
                                style={{ width: `${progress}%` }} 
                            />
                        </div>
                    </div>
                    
                    {/* Pause icon overlay when playing but not hovered (optional minimal touch) */}
                    {isPlaying && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981] group-hover:opacity-0 transition-opacity" />
                    )}
                </div>

        </div>
    );
}
