"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Upload, CheckCircle2, X } from "lucide-react";

export interface FloatingCardUploaderProps {
  title?: string;
  subtitle?: string;
  browseButtonText?: string;
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}

/**
 * @prop {string} title - Heading prompt inside expanded modal (Default: 'Upload Files')
 * @prop {string} subtitle - Secondary descriptive prompt text (Default: 'Drop anything here')
 * @prop {string} browseButtonText - Action trigger text for file browser picker (Default: 'Browse Files')
 * @prop {number} maxFiles - Maximum concurrent attached files limit (Default: 5)
 * @prop {function} onFilesSelected - Callback fired when files are dropped or selected (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function FloatingCardUploader({
  title = "Upload Files",
  subtitle = "Drop anything here",
  browseButtonText = "Browse Files",
  maxFiles = 5,
  onFilesSelected,
  className = ""
}: FloatingCardUploaderProps = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovered(false);
    if (e.dataTransfer.files?.length) {
      const added = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      setFiles((prev) => {
        const next = [...prev, ...added].slice(0, maxFiles);
        onFilesSelected?.(next);
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const added = Array.from(e.target.files).slice(0, maxFiles);
      setFiles((prev) => {
        const next = [...prev, ...added].slice(0, maxFiles);
        onFilesSelected?.(next);
        return next;
      });
    }
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      onFilesSelected?.(next);
      return next;
    });
  };

  return (
    <div className={`w-full max-w-sm mx-auto h-[400px] flex items-center justify-center p-4 font-sans ${className}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onDragOver={(e) => { e.preventDefault(); setIsHovered(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsHovered(false); }}
        onDrop={handleDrop}
        animate={{
          width: isHovered || files.length > 0 ? 320 : 120,
          height: isHovered || files.length > 0 ? (files.length > 0 ? 'auto' : 240) : 120,
          borderRadius: isHovered || files.length > 0 ? 24 : 60,
        }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        className="relative bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center group"
      >
        <AnimatePresence mode="wait">
          {!isHovered && files.length === 0 ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Plus size={24} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full p-6 flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 mb-3 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Upload size={22} className="text-zinc-400 group-hover:text-violet-400 transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-200">
                  {title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 mb-4">
                  {subtitle}
                </p>
                <div className="relative">
                  <button className="px-4 py-2 bg-white text-zinc-950 text-xs font-semibold rounded-full hover:scale-105 transition-transform cursor-pointer">
                    {browseButtonText}
                  </button>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {files.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-5 pt-3 border-t border-zinc-800"
                >
                  <div className="max-h-32 overflow-y-auto pr-1 space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between group/item">
                        <div className="flex items-center space-x-2 truncate">
                          <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                          <span className="text-xs text-zinc-300 truncate">
                            {f.name}
                          </span>
                        </div>
                        <button 
                          onClick={() => removeFile(i)}
                          className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
