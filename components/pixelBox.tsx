"use client";

import React, { useRef, useEffect } from "react";

const COLS = 33;
const ROWS = 44;
const NUM_CELLS = COLS * ROWS;

export default function PixelSmokeFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let cachedRect: DOMRect | null = null;
    let dpr = 1;
    let width = 0;
    let height = 0;

    // Pixel state arrays
    const gridR = new Float32Array(NUM_CELLS);
    const gridG = new Float32Array(NUM_CELLS);
    const gridB = new Float32Array(NUM_CELLS);
    const gridA = new Float32Array(NUM_CELLS);

    const particles: Particle[] = [];
    let time = 0;

    // Neon color palette
    const palette = [
      [0, 243, 255],   // Cyan
      [255, 0, 153],   // Magenta
      [255, 251, 0],   // Yellow
      [255, 85, 0],    // Orange
      [255, 255, 255], // White
      [112, 0, 255],   // Purple
      [0, 255, 102],   // Green
    ];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      g: number;
      b: number;
      life: number;
      decay: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        const color = palette[Math.floor(Math.random() * palette.length)];
        this.r = color[0];
        this.g = color[1];
        this.b = color[2];

        this.life = 1.0;
        this.decay = 0.01 + Math.random() * 0.02;
      }

      update() {
        const s = 0.15;
        const a = Math.sin(this.x * s + time) + Math.sin(this.y * s * 1.3 - time * 0.8);
        const b = Math.cos(this.x * s * 0.8 - time * 0.5) + Math.cos(this.y * s * 1.1 + time * 0.7);
        const angle = (a + b) * Math.PI;

        this.vx += Math.cos(angle) * 0.15;
        this.vy += Math.sin(angle) * 0.15;

        this.vx *= 0.95;
        this.vy *= 0.95;

        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }
    }

    // Interaction state
    let mouseX = COLS / 2;
    let mouseY = ROWS / 2;
    let isMouseMoving = false;
    let mouseTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) cachedRect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - cachedRect.left) / cachedRect.width) * COLS;
      mouseY = ((e.clientY - cachedRect.top) / cachedRect.height) * ROWS;

      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => { isMouseMoving = false; }, 150);

      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });

    let patternCanvas: HTMLCanvasElement | null = null;
    let patternCtx: CanvasRenderingContext2D | null = null;

    const updateSize = () => {
      dpr = window.devicePixelRatio || 1;
      cachedRect = canvas.getBoundingClientRect();
      width = cachedRect.width;
      height = cachedRect.height;
      if (width === 0 || height === 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Cache the empty grid pattern to prevent drawing 1400+ cells every frame
      if (!patternCanvas) {
        patternCanvas = document.createElement("canvas");
        patternCtx = patternCanvas.getContext("2d", { alpha: false });
      }
      patternCanvas.width = width * dpr;
      patternCanvas.height = height * dpr;
      
      if (patternCtx) {
        patternCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        patternCtx.fillStyle = "#09090b";
        patternCtx.fillRect(0, 0, width, height);

        const gap = 2;
        const cellW = (width - gap * (COLS - 1)) / COLS;
        const cellH = (height - gap * (ROWS - 1)) / ROWS;

        patternCtx.fillStyle = "rgba(255, 255, 255, 0.015)";
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const px = Math.floor(x * (cellW + gap));
            const py = Math.floor(y * (cellH + gap));
            const w = Math.ceil(cellW);
            const h = Math.ceil(cellH);
            patternCtx.fillRect(px, py, w, h);
          }
        }
      }
    };

    updateSize();
    
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(canvas);

    // Emitters for when mouse is idle
    const emitters = [
      { angle: 0, speed: 0.02, radius: COLS * 0.25, dir: 1 },
      { angle: Math.PI, speed: 0.03, radius: COLS * 0.2, dir: -1 },
      { angle: Math.PI / 2, speed: 0.015, radius: COLS * 0.35, dir: 1 },
    ];

    const render = () => {
      time += 0.03;

      // 1. Emit particles automatically if mouse is idle
      if (!isMouseMoving) {
        const cx = COLS / 2;
        const cy = ROWS / 2;

        for (let i = 0; i < emitters.length; i++) {
          const e = emitters[i];
          e.angle += e.speed * e.dir;
          const ex = cx + Math.cos(e.angle) * e.radius;
          const ey = cy + Math.sin(e.angle) * (e.radius * 0.6);

          if (Math.random() > 0.2) {
            particles.push(new Particle(ex, ey));
          }
        }
      }

      // 2. Update particles and write to Grid
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();

        if (p.life <= 0 || p.x < 0 || p.x >= COLS || p.y < 0 || p.y >= ROWS) {
          particles.splice(i, 1);
          continue;
        }

        const cx = Math.floor(p.x);
        const cy = Math.floor(p.y);
        const idx = cy * COLS + cx;

        if (idx >= 0 && idx < NUM_CELLS) {
          gridR[idx] = p.r;
          gridG[idx] = p.g;
          gridB[idx] = p.b;
          gridA[idx] = 1.0;
        }
      }

      // 3. Draw cached background grid
      if (patternCanvas) {
        ctx.drawImage(patternCanvas, 0, 0, patternCanvas.width, patternCanvas.height, 0, 0, width, height);
      } else {
        ctx.fillStyle = "#09090b";
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Render only the active grid cells
      const gap = 2;
      const cellW = (width - gap * (COLS - 1)) / COLS;
      const cellH = (height - gap * (ROWS - 1)) / ROWS;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const idx = y * COLS + x;
          
          if (gridA[idx] > 0.01) {
            gridA[idx] *= 0.90; // Fade trail
            const px = Math.floor(x * (cellW + gap));
            const py = Math.floor(y * (cellH + gap));
            const w = Math.ceil(cellW);
            const h = Math.ceil(cellH);
            ctx.fillStyle = `rgba(${gridR[idx] | 0}, ${gridG[idx] | 0}, ${gridB[idx] | 0}, ${gridA[idx].toFixed(3)})`;
            ctx.fillRect(px, py, w, h);
          } else {
            gridA[idx] = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(mouseTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none p-4 will-change-transform">
      <div className="relative p-2 border border-white/10 bg-zinc-950 rounded-xl overflow-hidden shadow-2xl w-full max-w-[320px] aspect-[3/4] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair block rounded-lg"
        />
      </div>
    </div>
  );
}
