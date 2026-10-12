import React, { useEffect, useRef } from "react";

export const FinaleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    const stars = [];
    const TAU = Math.PI * 2;

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

      stars.length = 0;
      const count = Math.min(100, Math.max(45, Math.floor((width * height) / 18000)));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.3,
          opacity: Math.random() * 0.45 + 0.15,
          speedX: (Math.random() - 0.5) * 0.12,
          speedY: -(Math.random() * 0.2 + 0.03),
          phase: Math.random() * TAU,
          twinkle: Math.random() * 0.018 + 0.005,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.x += s.speedX;
        s.y += s.speedY;
        s.phase += s.twinkle;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        const alpha = s.opacity + Math.sin(s.phase) * 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, TAU);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.04, alpha)})`;
        ctx.fill();
      }

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

  return <canvas ref={canvasRef} className="heavenly-canvas" aria-hidden="true" />;
};
