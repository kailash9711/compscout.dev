"use client";

import React from "react";
import { Coffee, Check } from "lucide-react";

export interface CardCoffeeRoastProps {
  title?: string;
  category?: string;
  price?: string;
  ingredients?: string[];
  buttonText?: string;
  onOrder?: () => void;
  className?: string;
}

const defaultIngredients = ["Double Espresso Shot", "Velvet Steamed Milk", "Microfoam Art"];

/**
 * @prop {string} title - Coffee beverage name (Default: 'Cappuccino')
 * @prop {string} category - Monospace category tracking label (Default: 'Signature Roast')
 * @prop {string} price - Price string displayed in order summary (Default: '$4.50')
 * @prop {string[]} ingredients - List of ingredients with checkbox icons (Default: 3 coffee ingredients)
 * @prop {string} buttonText - Call-to-action button label (Default: 'Add to Order')
 * @prop {function} onOrder - Callback fired when order button is clicked (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function CardCoffeeRoast({
  title = "Cappuccino",
  category = "Signature Roast",
  price = "$4.50",
  ingredients = defaultIngredients,
  buttonText = "Add to Order",
  onOrder,
  className = ""
}: CardCoffeeRoastProps = {}) {
  return (
    <div 
      className={`group relative flex w-full max-w-[290px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-[#080808] p-4 sm:p-4.5 shadow-xl transition-all duration-700 hover:border-neutral-600 hover:shadow-2xl active:scale-[0.98] font-sans ${className}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
      {/* Subtle espresso/amber aura */}
      <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 -translate-y-1/2 translate-x-1/4 rounded-full bg-orange-600/10 blur-[40px] transition-opacity duration-700 group-hover:opacity-100 opacity-40" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div 
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/60 shadow-inner transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] rotate-0 scale-100 group-hover:rotate-12 group-hover:scale-110"
        >
          <Coffee className="h-4.5 w-4.5 text-stone-400 stroke-[1.5] transition-colors duration-500 group-hover:text-stone-300" />
        </div>
        
        <div className="flex flex-col">
          <p className="text-[9px] font-bold tracking-[0.2em] text-stone-500 uppercase">
            {category}
          </p>
          <h3 className="text-base sm:text-lg font-medium tracking-wide text-zinc-200 transition-colors duration-500 group-hover:text-white">
            {title}
          </h3>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="relative z-10 mt-3.5 flex flex-col gap-2">
        {ingredients.map((item, i) => (
          <div 
            key={i} 
            className="flex items-center gap-2.5 text-xs text-stone-400"
            style={{ animation: `fade-in-right 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s both` }}
          >
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-stone-800 text-stone-600 transition-colors duration-500 group-hover:border-stone-600 group-hover:text-stone-400 bg-neutral-900/40">
              <Check className="h-2.5 w-2.5 stroke-[2.5]" />
            </div>
            <span className="tracking-wide font-light text-zinc-400 transition-colors duration-500 group-hover:text-zinc-200 text-xs sm:text-[13px]">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Footer / CTA */}
      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-neutral-800/80 pt-3.5">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-500 uppercase">Total</span>
          <span className="text-base sm:text-lg font-light tracking-wide text-zinc-100">{price}</span>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOrder?.();
          }}
          className="flex h-[32px] items-center justify-center rounded-lg border px-3.5 text-[9px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 cursor-pointer bg-transparent text-[#d6d3d1] border-[#57534e]/50 hover:bg-white hover:text-black hover:border-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
