"use client";
import React, { useState, useEffect } from 'react';

interface MinimalMusicPlayerProps {
    title?: string;
    artist?: string;
    albumArt?: string;
}

export default function MinimalMusicPlayer({
    title = "Silent Whisper",
    artist = "Ethereal Echoes",
    albumArt = "https://compscout.dev/new/cock.webp"
}: MinimalMusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(33);

    // Simulate progress bar moving
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => (p >= 100 ? 0 : p + 0.5));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative w-full max-w-[340px] bg-white dark:bg-[#0f0f0f] rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] overflow-hidden border border-zinc-100 dark:border-zinc-800/50 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] font-sans">
                
                {/* Abstract Rotating Record (Top Right) */}
                <div 
                    className="absolute -top-16 -right-12 w-64 h-64 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-[8px] border-white dark:border-[#0f0f0f] overflow-hidden animate-[spin_20s_linear_infinite]"
                    style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                >
                    <img src={albumArt} alt="Album Art" className="w-full h-full object-cover scale-105" />
                    
                    {/* Vintage Vinyl Grooves Simulation */}
                    <div className="absolute inset-0 rounded-full border border-black/5 dark:border-white/5 pointer-events-none" />
                    <div className="absolute inset-4 rounded-full border border-black/5 dark:border-white/5 pointer-events-none" />
                    <div className="absolute inset-8 rounded-full border border-black/5 dark:border-white/5 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 mix-blend-overlay pointer-events-none" />

                    {/* Center Spindle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-[#0f0f0f] rounded-full shadow-inner flex items-center justify-center border border-zinc-100 dark:border-zinc-800/80">
                        <div className="w-3 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full shadow-inner" />
                    </div>
                </div>

                {/* Content Container */}
                <div className="px-8 pb-8 pt-[220px] relative z-10 flex flex-col">
                    
                    {/* Track Info */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-1.5 leading-none">
                            {title}
                        </h2>
                        <p className="text-[11px] font-bold tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase mt-2">
                            {artist}
                        </p>
                    </div>

                    {/* Progress Bar (Ultra Thin) */}
                    <div className="mb-8 group">
                        <div className="relative h-[3px] w-full bg-zinc-100 dark:bg-zinc-800/60 rounded-full overflow-hidden cursor-pointer">
                            <div 
                                className="absolute top-0 left-0 h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-1000 ease-linear" 
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mt-4 uppercase">
                            <span>01:24</span>
                            <span>04:12</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between px-2">
                        <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors active:scale-90">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
                        </button>

                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black shadow-[0_8px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_20px_rgba(255,255,255,0.2)] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            {isPlaying ? (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="6" width="3" height="12" rx="1.5"></rect><rect x="14" y="6" width="3" height="12" rx="1.5"></rect></svg>
                            ) : (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M5.5 4.5l14 7.5-14 7.5v-15z" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" /></svg>
                            )}
                        </button>

                        <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors active:scale-90">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
                        </button>
                    </div>

                </div>
        </div>
    );
}
