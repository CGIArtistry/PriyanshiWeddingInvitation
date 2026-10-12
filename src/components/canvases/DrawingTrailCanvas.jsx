import React, { useEffect, useRef } from "react";

export const DrawingTrailCanvas = () => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e) => {
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        time: performance.now(),
      });
    };

    const onPointerDown = (e) => {
      const now = performance.now();
      // Burst 8 little sparks
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const dist = 15 + Math.random() * 25;
        pointsRef.current.push({
          x: e.clientX + Math.cos(angle) * dist,
          y: e.clientY + Math.sin(angle) * dist,
          time: now,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const now = performance.now();

      // Keep only points from last 900ms
      pointsRef.current = pointsRef.current.filter((p) => now - p.time < 900);
      const pts = pointsRef.current;

      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        if (p2.time - p1.time > 120) continue;

        const life = Math.max(0, 1 - (now - p1.time) / 900);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(221, 242, 253, ${life * 0.85})`;
        ctx.shadowBlur = 16;
        ctx.shadowColor = "#ddf2fd";
        ctx.lineWidth = 1.2 + life * 2;
        ctx.stroke();

        if (i === pts.length - 2) {
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, 2.5 + life * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(221, 242, 253, ${life})`;
          ctx.fill();

          // Little cross spark
          const arm = 8 + life * 4;
          ctx.beginPath();
          ctx.moveTo(p2.x, p2.y - arm);
          ctx.lineTo(p2.x, p2.y + arm);
          ctx.moveTo(p2.x - arm, p2.y);
          ctx.lineTo(p2.x + arm, p2.y);
          ctx.strokeStyle = `rgba(255, 244, 214, ${life * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="drawing-layer" aria-hidden="true" />;
};
