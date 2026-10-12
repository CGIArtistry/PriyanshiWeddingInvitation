import React, { useEffect, useRef } from "react";

export const HeroFirefliesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId;
    let width = 0;
    let height = 0;
    const fireflies = [];
    const TAU = Math.PI * 2;

    const init = () => {
      fireflies.length = 0;
      const count = Math.round(Math.min(Math.max((width * height) / 24000, 14), 36));
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 2.2,
          rise: 0.08 + Math.random() * 0.16,
          driftSpeed: 0.2 + Math.random() * 0.3,
          driftPhase: Math.random() * TAU,
          pulseSpeed: 0.012 + Math.random() * 0.02,
          pulsePhase: Math.random() * TAU,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      for (const f of fireflies) {
        f.y -= f.rise;
        f.x += Math.sin(t * f.driftSpeed + f.driftPhase) * 0.3;
        f.pulsePhase += f.pulseSpeed;

        if (f.y < -12) {
          f.y = height + 12;
          f.x = Math.random() * width;
        }

        const pulse = (Math.sin(f.pulsePhase) + 1) * 0.5;
        ctx.globalAlpha = 0.25 + pulse * 0.55;
        ctx.fillStyle = "rgba(255, 244, 214, 0.95)";
        ctx.shadowBlur = 6 + pulse * 8;
        ctx.shadowColor = "rgba(232, 184, 83, 0.9)";
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, TAU);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-fireflies" aria-hidden="true" />;
};
