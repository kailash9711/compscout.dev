"use client";


export interface Button3DPushShineProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * @prop {string} label - Button text label (Default: 'Press Me')
 * @prop {function} onClick - Optional click handler callback (Default: undefined)
 * @prop {string} className - Additional CSS classes for custom container styling (Default: '')
 */
export default function Button3DPushShine({
  label = "Press Me",
  onClick,
  className = ""
}: Button3DPushShineProps = {}) {
  return (
    <div className={`flex items-center justify-center p-6 font-sans ${className}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine-sweep {
          0% { transform: translateX(-150%) skewX(-12deg); }
          28% { transform: translateX(300%) skewX(-12deg); }
          100% { transform: translateX(300%) skewX(-12deg); }
        }
        .animate-shine-sweep {
          animation: shine-sweep 3.5s ease-in-out infinite;
        }
      `}} />
      <button
        onClick={onClick}
        className="group relative overflow-hidden rounded-xl border-2 border-red-700 bg-red-500 px-8 py-3.5 font-bold uppercase tracking-wider text-white transition-all duration-200 ease-out hover:bg-red-400 cursor-pointer select-none outline-none transform translate-y-0 shadow-[0_6px_0_#b91c1c] hover:-translate-y-0.5 hover:shadow-[0_8px_0_#b91c1c] active:translate-y-1.5 active:shadow-[0_0px_0_#b91c1c]"
      >
        <span className="relative z-10">{label}</span>
        
        {/* Infinite Shine Animation */}
        <div
          className="absolute inset-0 z-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-sweep"
        />
      </button>
    </div>
  );
}
