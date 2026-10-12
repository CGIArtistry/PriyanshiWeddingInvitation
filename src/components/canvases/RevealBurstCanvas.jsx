import React, { useEffect, useRef } from "react";

export const RevealBurstCanvas = ({ triggerRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    const particles = [];
    const TAU = Math.PI * 2;
    const colors = ["#f7d89e", "#b68d40", "#ecd6a0", "#c65b67", "#ffffff", "#fad4c0"];

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
    };

    const triggerBurst = (originX, originY) => {
      const now = performance.now();
      const count = 75;

      // Radial flash
      particles.push({
        type: "flash",
        x: originX,
        y: originY,
        radius: 10,
        maxRadius: 280,
        life: 600,
        born: now,
      });

      // Rings
      particles.push({
        type: "ring",
        x: originX,
        y: originY,
        maxRadius: 360,
        life: 900,
        born: now,
      });

      // Sparks and Confetti
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * TAU;
        const speed = 70 + Math.random() * 220;
        particles.push({
          type: "spark",
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: 2 + Math.random() * 3,
          life: 800 + Math.random() * 600,
          born: now,
        });
      }
    };

    if (triggerRef) {
      triggerRef.current = triggerBurst;
    }

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = now - p.born;
        const progress = age / p.life;

        if (progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = 1 - progress;

        if (p.type === "flash") {
          const r = p.maxRadius * Math.sin((progress * Math.PI) / 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          grad.addColorStop(0, `rgba(255, 250, 235, ${alpha * 0.9})`);
          grad.addColorStop(0.5, `rgba(247, 216, 158, ${alpha * 0.4})`);
          grad.addColorStop(1, "rgba(247, 216, 158, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, TAU);
          ctx.fill();
        } else if (p.type === "ring") {
          const r = p.maxRadius * (1 - Math.pow(1 - progress, 2));
          ctx.strokeStyle = `rgba(255, 244, 214, ${alpha * 0.85})`;
          ctx.lineWidth = 3 * alpha + 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, TAU);
          ctx.stroke();
        } else if (p.type === "spark") {
          const t = age / 1000;
          const currX = p.x + p.vx * t;
          const currY = p.y + p.vy * t + 140 * t * t; // gravity
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(currX, currY, p.radius * alpha + 1, 0, TAU);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      if (triggerRef) triggerRef.current = null;
    };
  }, [triggerRef]);

  return <canvas ref={canvasRef} className="reveal-canvas" aria-hidden="true" />;
};
