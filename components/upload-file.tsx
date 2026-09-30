"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function UploadFile() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center p-12 min-h-[300px] w-full">
      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        animate={{ 
          scale: dragActive ? 1.02 : 1,
          borderColor: dragActive ? "rgba(79, 70, 229, 0.4)" : "rgba(0,0,0,0.1)",
          backgroundColor: dragActive ? "rgba(79, 70, 229, 0.05)" : "transparent"
        }}
        className={`relative w-80 h-56 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-colors ${!file ? 'cursor-pointer group hover:bg-zinc-50 dark:hover:bg-zinc-900/50' : ''} dark:border-white/10`}
      >
        <input type="file" ref={inputRef} className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
        
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center gap-4 pointer-events-none">
              <motion.div 
                animate={{ y: [0, -6, 0] }} 
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-2xl bg-zinc-900 dark:bg-white shadow-xl flex items-center justify-center text-white dark:text-black group-hover:scale-110 transition-transform"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </motion.div>
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Upload Document</span>
                <span className="text-xs font-medium text-zinc-500 mt-1">Drag & drop or click</span>
              </div>
            </motion.div>
          ) : (
            <motion.div key="file" initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex flex-col items-center gap-3 w-full px-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
              </div>
              <div className="flex flex-col items-center text-center w-full">
                <span className="text-sm font-bold text-zinc-900 dark:text-white w-full truncate">{file.name}</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                Remove
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
