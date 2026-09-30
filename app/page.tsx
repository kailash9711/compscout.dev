"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Layers, Maximize, Sun, Moon, Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { ComponentRegistry, componentNames } from "./registry";
import { getComponentCode } from "./actions";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);



export default function ComponentLibrary() {
  const [selectedComponent, setSelectedComponent] = useState(componentNames[0] || "");
  const [isCodeView, setIsCodeView] = useState(false);
  const [componentCode, setComponentCode] = useState({ tsx: "", jsx: "" });
  const [codeLang, setCodeLang] = useState<'tsx' | 'jsx'>('tsx');
  const [isCopied, setIsCopied] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fetch component code when selection changes
  useEffect(() => {
    if (selectedComponent) {
      getComponentCode(selectedComponent).then((codeData) => {
        setComponentCode(codeData);
        setIsCopied(false);
      });
    }
  }, [selectedComponent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(componentCode[codeLang]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const playClickSound = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtxRef.current = new AudioContextClass();
      }
      
      const ctx = audioCtxRef.current;
      
      // Resume context if browser suspended it
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#09090b] px-4 sm:px-8 md:px-12 transition-colors duration-500">
      
      {/* Animated Shooting Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#fafafa] dark:bg-[#09090b] transition-colors duration-500">
        {/* Base dark grid for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:60px_60px] transition-colors duration-500"></div>

        {/* Shooting Beams Layer */}
        <div className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100">
          {/* Vertical Beams */}
          {[
            { left: 120, delay: 0, duration: 4, color: "via-indigo-500/80" },
            { left: 360, delay: 2, duration: 5, color: "via-sky-500/80" },
            { left: 600, delay: 1, duration: 3.5, color: "via-purple-500/80" },
            { left: 840, delay: 3, duration: 4.5, color: "via-indigo-500/80" },
            { left: 1140, delay: 1.5, duration: 5, color: "via-sky-500/80" },
            { left: 1440, delay: 0.5, duration: 4, color: "via-purple-500/80" },
          ].map((beam, i) => (
            <motion.div
              key={`v-${i}`}
              initial={{ top: "-100%" }}
              animate={{ top: "200%" }}
              transition={{ repeat: Infinity, duration: beam.duration, delay: beam.delay, ease: "linear" }}
              className={`absolute w-[1px] h-[300px] bg-gradient-to-b from-transparent ${beam.color} to-transparent`}
              style={{ left: `${beam.left}px`, boxShadow: "0 0 10px 1px rgba(99,102,241,0.3)" }}
            />
          ))}

          {/* Horizontal Beams */}
          {[
            { top: 120, delay: 1, duration: 6, color: "via-sky-500/80" },
            { top: 300, delay: 0, duration: 5.5, color: "via-purple-500/80" },
            { top: 540, delay: 2.5, duration: 4.5, color: "via-indigo-500/80" },
            { top: 780, delay: 1.5, duration: 5, color: "via-sky-500/80" },
            { top: 960, delay: 3, duration: 6, color: "via-purple-500/80" },
          ].map((beam, i) => (
            <motion.div
              key={`h-${i}`}
              initial={{ left: "-100%" }}
              animate={{ left: "200%" }}
              transition={{ repeat: Infinity, duration: beam.duration, delay: beam.delay, ease: "linear" }}
              className={`absolute h-[1px] w-[400px] bg-gradient-to-r from-transparent ${beam.color} to-transparent`}
              style={{ top: `${beam.top}px`, boxShadow: "0 0 10px 1px rgba(14,165,233,0.3)" }}
            />
          ))}
        </div>
        
        {/* Soft center glow to tie it together */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
      </div>

      {/* Main App Container */}
      <div className="relative z-10 flex h-full w-full max-w-[1200px] bg-[#fafafa] dark:bg-[#18191c] text-zinc-950 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 text-[14px] border-x border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-500">
        
        {/* Left Sidebar */}
        <aside className="w-56 border-r border-zinc-200 dark:border-zinc-800/60 bg-white/90 dark:bg-[#18191c]/90 backdrop-blur-md flex flex-col shrink-0 transition-colors duration-500">
          <div className="h-12 flex items-center justify-between px-5 border-b border-zinc-200 dark:border-zinc-800/60 transition-colors duration-500">
            <a href="https://compscout.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold tracking-tight hover:opacity-80 transition-opacity">
              <Layers className="w-4 h-4 text-zinc-900 dark:text-zinc-100 transition-colors" />
              <span className="text-sm">CompScout Free UI</span>
            </a>
            <a href="https://github.com/kailash9711/compscout.dev" target="_blank" rel="noreferrer" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" title="GitHub Repository">
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
          <div className="p-3 flex-1 overflow-y-auto">
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider px-2 transition-colors">Components</div>
            <nav className="flex flex-col gap-0.5">
              {componentNames.map((comp) => (
                <button
                  key={comp}
                  onClick={() => {
                    playClickSound();
                    setSelectedComponent(comp);
                    setIsCodeView(false);
                  }}
                  className={`text-[13px] px-3 py-1.5 rounded-lg text-left transition-colors ${
                    selectedComponent === comp
                      ? "bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-zinc-100 font-medium"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {comp}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/60 transition-colors duration-500 flex flex-col gap-3 bg-white/50 dark:bg-zinc-900/50">
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
              Created by <a href="https://instagram.com/ksd__.dev" target="_blank" rel="noreferrer" className="text-zinc-900 dark:text-zinc-200 font-semibold hover:underline decoration-zinc-500/30 underline-offset-2">ksd__.dev</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/ksd__.dev" target="_blank" rel="noreferrer" className="text-zinc-400 dark:text-zinc-500 hover:text-rose-500 transition-colors" title="Instagram">
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a href="https://x.com/_97KSH" target="_blank" rel="noreferrer" className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" title="X (Twitter)">
                <XIcon className="w-3 h-3" />
              </a>
            </div>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 relative flex flex-col overflow-hidden bg-[#fafafa] dark:bg-[#131417]/80 transition-colors duration-500">
          {/* Top bar */}
          <header className="h-12 border-b border-zinc-200 dark:border-zinc-800/60 bg-white/50 dark:bg-[#18191c]/50 backdrop-blur-sm flex items-center justify-between px-5 shrink-0 z-20 transition-colors duration-500">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 transition-colors">{selectedComponent}</span>
              
              <div className="flex bg-zinc-100 dark:bg-white/5 rounded-md p-0.5 ml-2 transition-colors">
                <button
                  onClick={() => {
                    playClickSound();
                    setIsCodeView(false);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-[4px] uppercase tracking-wider font-semibold transition-colors ${!isCodeView ? 'bg-white dark:bg-[#18191c] text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                >
                  Preview
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setIsCodeView(true);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-[4px] uppercase tracking-wider font-semibold transition-colors ${isCodeView ? 'bg-white dark:bg-[#18191c] text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                >
                  Code
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {mounted && (
                <button 
                  onClick={() => {
                    playClickSound();
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                  className="p-1.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-md transition-colors" 
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </header>

          {/* Canvas */}
          <div className="flex-1 overflow-auto relative p-6 flex items-center justify-center">

            {/* Dot pattern background */}
            {!isCodeView && <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-60 dark:opacity-40 transition-colors duration-500" />}

            {/* Component Wrapper */}
            <div className={`relative z-10 w-full h-full flex justify-center ${isCodeView ? 'items-start' : 'items-center'}`} ref={componentRef}>
              {isCodeView ? (
                <div className="w-full max-w-4xl h-full overflow-hidden flex flex-col bg-zinc-950 dark:bg-[#09090b] rounded-xl border border-zinc-200/20 shadow-2xl">
                  <div className="px-4 py-2 border-b border-white/10 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      </div>
                      
                      <div className="flex bg-black/40 rounded-lg p-0.5 ml-2 border border-white/5">
                        <button
                          onClick={() => {
                            playClickSound();
                            setCodeLang('tsx');
                          }}
                          className={`text-[11px] px-3 py-1 rounded-md tracking-wide font-medium transition-colors ${codeLang === 'tsx' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                          TypeScript
                        </button>
                        <button
                          onClick={() => {
                            playClickSound();
                            setCodeLang('jsx');
                          }}
                          className={`text-[11px] px-3 py-1 rounded-md tracking-wide font-medium transition-colors ${codeLang === 'jsx' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                          JavaScript
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-zinc-400 hover:text-zinc-200 transition-all"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px] font-medium tracking-wide">{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-sm font-mono text-zinc-300 overflow-auto flex-1">
                    <code>{componentCode[codeLang] || "// Loading code..."}</code>
                  </pre>
                </div>
              ) : (() => {
                const Comp = ComponentRegistry[selectedComponent];
                return Comp ? (
                  <div className="w-full flex items-center justify-center p-8">
                    <Comp />
                  </div>
                ) : (
                  <div className="text-zinc-400 dark:text-zinc-500 text-sm flex flex-col items-center gap-2 px-6 py-5 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 transition-colors">
                    <Layers className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                    <span className="text-[13px]">Component not implemented</span>
                  </div>
                );
              })()}
            </div>
            </div>
        </main>
      </div>
    </div>
  );
}
