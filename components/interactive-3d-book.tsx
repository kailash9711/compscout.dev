"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export default function Interactive3DBook() {
  const [currentLeaf, setCurrentLeaf] = useState(0);

  // We have 4 leaves (sheets of paper). 
  // Leaf 0: Cover & Inside Cover
  // Leaf 1: Page 1 & Page 2
  // Leaf 2: Page 3 & Page 4
  // Leaf 3: Page 5 & Back Cover
  const totalLeaves = 4;

  const handleNext = () => {
    if (currentLeaf < totalLeaves) {
      setCurrentLeaf((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentLeaf > 0) {
      setCurrentLeaf((prev) => prev - 1);
    }
  };

  // Content for each leaf (front and back)
  const leaves = [
    {
      // LEAF 0
      front: (
        <div className="w-full h-full bg-[#111] text-white flex flex-col items-center justify-center border-l-8 border-[#0a0a0a] shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=800')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <p className="text-5xl font-serif tracking-widest z-10 font-bold mb-4">ESTAMPES</p>
          <p className="text-sm tracking-widest text-white/50 z-10 uppercase">The Art of Shadows</p>
          <div className="mt-12 z-10 text-xs text-white/30 tracking-widest border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            Click to Open
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#1a1a1a] p-10 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.5)] border-r border-white/5">
          <h2 className="text-white/20 text-xl font-serif mt-20">Introduction</h2>
        </div>
      )
    },
    {
      // LEAF 1
      front: (
        <div className="w-full h-full bg-[#1a1a1a] p-8 md:p-12 text-white/80 shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-xs tracking-[0.2em] text-white/40 mb-6 uppercase">Estampes</h3>
            <p className="text-xs md:text-sm leading-relaxed mb-6 font-serif">
              The intricate dance of ink on paper reveals more than just an image; it captures a fleeting moment in the eternal flow of time. Each stroke carries the weight of history.
            </p>
            
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#222] my-6 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=400" className="w-full h-full object-cover" alt="Art detail" />
            </div>

            <p className="text-[10px] md:text-xs leading-relaxed text-white/50 font-serif italic border-l-2 border-red-900/50 pl-4 mt-6">
              "To see a world in a grain of sand, and a heaven in a wild flower." <br/>
              — The silent poetry of the brush.
            </p>
          </div>
          
          <div className="w-full flex justify-end">
             <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#333]">
                <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=400" className="w-full h-full object-cover filter grayscale" alt="Art detail 2" />
             </div>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#0a0a0a] shadow-[inset_-20px_0_40px_rgba(0,0,0,0.8)] relative">
          <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800" className="w-full h-full object-cover opacity-90" alt="Full page art" />
          <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-4 text-xs font-serif text-white/90 border border-white/20 writing-vertical-rl">
            神聖な風景
          </div>
        </div>
      )
    },
    {
      // LEAF 2
      front: (
        <div className="w-full h-full bg-[#f4f1ea] text-[#222] p-10 shadow-[inset_20px_0_40px_rgba(0,0,0,0.1)] border-l border-black/5 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 border border-black/20 rounded-full flex items-center justify-center mb-8">
            <span className="text-xl font-serif text-red-800">II</span>
          </div>
          <h2 className="text-3xl font-serif mb-6 tracking-widest uppercase text-black/80">The Contrast</h2>
          <p className="text-sm leading-loose max-w-[80%] font-serif text-black/60">
            Light cannot exist without darkness. The blank spaces on the canvas speak just as loudly as the inked lines. This is the essence of balance.
          </p>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#111] shadow-[inset_-20px_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-[80%] h-[80%] border border-white/10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-black mix-blend-overlay"></div>
            <img src="https://images.unsplash.com/photo-1558865869-c93f6f8482af?q=80&w=800" className="w-full h-full object-cover grayscale" alt="Dark art" />
          </div>
        </div>
      )
    },
    {
      // LEAF 3
      front: (
        <div className="w-full h-full bg-[#1a1a1a] text-white p-12 shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/5 flex flex-col justify-between">
          <h2 className="text-2xl font-serif text-white/80">Epilogue</h2>
          <div className="w-full h-[1px] bg-white/10 my-8"></div>
          <p className="text-sm leading-relaxed text-white/50 font-serif">
            As the pages turn, the journey concludes, but the impression remains etched in memory.
          </p>
          <div className="mt-auto">
            <p className="text-[10px] tracking-widest text-white/30 uppercase">FIN</p>
          </div>
        </div>
      ),
      back: (
        <div className="w-full h-full bg-[#0a0a0a] border-r-8 border-[#111] shadow-[inset_-20px_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <p className="text-white/20 text-xs tracking-[0.3em] font-serif uppercase">The End</p>
        </div>
      )
    }
  ];

  return (
    <div className="w-full h-full col-span-1 md:col-span-2 min-h-[600px] md:min-h-[800px] bg-transparent flex items-center justify-center p-4 md:p-12 overflow-hidden perspective-[2000px]">
      
      {/* Book Container */}
      <motion.div
        className="relative w-full max-w-[800px] aspect-[4/3] md:aspect-[2/1.3] rounded-sm"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          // Shift the book to keep it centered when closed vs opened
          x: currentLeaf === 0 ? "-25%" : currentLeaf === totalLeaves ? "25%" : "0%",
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        
        {/* Shadow under the book */}
        <motion.div 
          className="absolute inset-x-0 bottom-[-20px] h-10 bg-black/50 blur-xl rounded-full"
          animate={{
            left: currentLeaf === 0 ? "50%" : currentLeaf === totalLeaves ? "0%" : "0%",
            right: currentLeaf === 0 ? "0%" : currentLeaf === totalLeaves ? "50%" : "0%",
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />

        {leaves.map((leaf, index) => {
          const isFlipped = currentLeaf > index;
          const zIndex = isFlipped ? index : totalLeaves - index;

          return (
            <motion.div
              key={index}
              className="absolute top-0 right-0 w-1/2 h-full origin-left cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                zIndex: zIndex,
              }}
              initial={false}
              animate={{
                rotateY: isFlipped ? -180 : 0,
                // Add a slight tilt to the pages to simulate thickness
                rotateZ: isFlipped ? -0.5 : 0.5,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 45, 
                damping: 18,
                mass: 1.2
              }}
              onClick={() => {
                if (isFlipped) {
                  // If clicking a flipped page (left side), turn back
                  handlePrev();
                } else {
                  // If clicking an unflipped page (right side), turn next
                  handleNext();
                }
              }}
            >
              {/* Front Face (Right side page) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden rounded-r-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                {leaf.front}
                
                {/* Book Spine Shadow (Inner Edge) */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/40 to-transparent mix-blend-multiply pointer-events-none"></div>
                
                {/* Page Hover interaction area hint */}
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/0 to-transparent hover:from-white/10 transition-colors pointer-events-none"></div>
              </div>

              {/* Back Face (Left side page) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden rounded-l-lg"
                style={{ 
                  backfaceVisibility: "hidden", 
                  transform: "rotateY(180deg)" 
                }}
              >
                {leaf.back}
                
                {/* Book Spine Shadow (Inner Edge) */}
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/40 to-transparent mix-blend-multiply pointer-events-none"></div>
                
                {/* Page Hover interaction area hint */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/0 to-transparent hover:from-white/10 transition-colors pointer-events-none"></div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
