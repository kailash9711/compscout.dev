'use client';

import React, { useState } from 'react';

interface CheckboxItem {
  id: number;
  checked: boolean;
  text: string;
}

const taskTexts = [
  "Complete initial setup",
  "Configure environment variables",
  "Establish secure connection",
  "Initialize core modules",
  "Deploy secondary payload",
  "Sync database records",
  "Run diagnostic tests",
  "Finalize sequence"
];

export default function DynamicCheckboxList() {
  const [items, setItems] = useState<CheckboxItem[]>([
    { id: 1, checked: false, text: taskTexts[0] }
  ]);

  const handleCheck = (id: number) => {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.id === id);
      if (itemIndex === -1) return prevItems;

      const isCurrentlyChecked = prevItems[itemIndex].checked;
      
      const newItems = prevItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      
      const isChecking = !isCurrentlyChecked;
      const isLast = itemIndex === prevItems.length - 1;

      // Only add a new item if we are checking the last item and we have less than 4 items
      if (isChecking && isLast && newItems.length < 4) {
        const nextText = taskTexts[newItems.length] || `Bonus task #${newItems.length + 1}`;
        newItems.push({
          id: Date.now(),
          checked: false,
          text: nextText
        });
      }

      return newItems;
    });
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateY(-20px) scale(0.9); }
          50% { opacity: 1; transform: translateY(5px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0) rotate(-45deg); }
          60% { opacity: 1; transform: scale(1.2) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}} />

      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 group animate-bounce-in"
          >
            {/* Custom Checkbox */}
            <div 
              onClick={() => handleCheck(item.id)}
              className={`relative w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                item.checked 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] border-transparent' 
                  : 'bg-white/5 border border-white/30 group-hover:border-purple-400/80 group-hover:bg-white/10'
              }`}
            >
              {item.checked && (
                <svg
                  className="w-4 h-4 text-white animate-scale-in"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            
            {/* Text */}
            <span 
              className={`text-base font-medium transition-all duration-300 ${
                item.checked 
                  ? 'text-zinc-500 line-through decoration-zinc-500/50' 
                  : 'text-zinc-200'
              }`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
