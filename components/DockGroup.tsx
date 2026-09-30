"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export interface DockGroupAvatarProps {
  className?: string;
}

const team = [
  { id: "1", name: "Emma", img: "https://compscout.dev/avatar/bt7zf5dcfn4vvury1i6a.webp" },
  { id: "2", name: "Alex", img: "https://compscout.dev/avatar/h6ayxz0ewcpim6twzitl.webp" },
  { id: "3", name: "Sarah", img: "https://compscout.dev/avatar/labjj25d1oln29chvxq9.webp" },
  { id: "4", name: "David", img: "https://compscout.dev/avatar/mezlylrpq1acez8o02ft.webp" },
  { id: "5", name: "Lisa", img: "https://compscout.dev/avatar/ob8p7hqfvdvyolx88872.webp" },
];

function DockItem({ member, mouseX }: { member: any; mouseX: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale based on distance to mouse - smoother spring
  const scaleSync = useTransform(distance, [-100, 0, 100], [1, 1.8, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 200, damping: 14 });

  // Margin based on distance to push neighbors away
  const marginSync = useTransform(distance, [-100, 0, 100], [0, 24, 0]);
  const margin = useSpring(marginSync, { mass: 0.1, stiffness: 200, damping: 14 });

  return (
    <motion.div
      ref={ref}
      style={{ scale, marginInline: margin }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <img 
        src={member.img} 
        alt={member.name} 
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain origin-bottom drop-shadow-md" 
      />
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-20"
          >
            <div className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-medium rounded-full whitespace-nowrap shadow-lg">
              {member.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DockGroupAvatar({ className = "" }: DockGroupAvatarProps = {}) {
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => mouseX.set(e.pageX);
    const handleMouseLeave = () => mouseX.set(Infinity);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX]);

  return (
    <>
      {team.map((member) => (
        <DockItem key={member.id} member={member} mouseX={mouseX} />
      ))}
    </>
  );
}



