import React, { useEffect, useRef } from "react";

export const BubbleVeilCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const bubbles = [];
    const mouse = { x: -999, y: -999 };
    const TAU = Math.PI * 2;

    const init = () => {
      bubbles.length = 0;
      const count = Math.round(Math.min(Math.max((width * height) / 30000, 12), 36));
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * width,
          y: height + Math.random() * height,
          drift: Math.random() * 2 - 1,
          radius: 6 + Math.random() * 20,
          shade: Math.random(),
          sway: 0.3 + Math.random() * 0.9,
          swayPhase: Math.random() * TAU,
          rise: 0.25 + Math.random() * 0.7,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const onPointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      for (const b of bubbles) {
        b.y -= b.rise;
        b.x += Math.sin(t * 0.6 + b.swayPhase) * b.sway + b.drift * 0.25;

        if (mouse.x > -1) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < b.radius * 6 && dist > 0.01) {
            b.x += (dx / dist) * 1.5;
            b.y += (dy / dist) * 1.5;
          }
        }

        if (b.y + b.radius < -20) {
          b.y = height + b.radius;
          b.x = Math.random() * width;
        }

        const colorStr = b.shade < 0.4 ? "255, 249, 236" : "221, 242, 253";
        const grad = ctx.createRadialGradient(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.35,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );
        grad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
        grad.addColorStop(0.42, `rgba(${colorStr}, 0.18)`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, TAU);
        ctx.fill();

        ctx.globalAlpha = 0.38;
        ctx.strokeStyle = `rgba(${colorStr}, 0.7)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, TAU);
        ctx.stroke();

        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(
          b.x - b.radius * 0.32,
          b.y - b.radius * 0.4,
          Math.max(1, b.radius * 0.16),
          0,
          TAU
        );
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="bubble-veil" aria-hidden="true" />;
};
