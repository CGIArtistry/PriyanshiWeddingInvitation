import React, { useEffect, useRef } from "react";

export const SparkleSnowCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const petals = [];
    const stars = [];
    const TAU = Math.PI * 2;

    const initPetals = () => {
      petals.length = 0;
      const count = Math.round(Math.min(Math.max((width * height) / 22000, 10), 32));
      for (let i = 0; i < count; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * -height,
          drift: Math.random() * 2 - 1,
          fall: 0.5 + Math.random() * 1.15,
          flip: Math.random() * TAU,
          flipSpeed: 0.02 + Math.random() * 0.05,
          size: 8 + Math.random() * 10,
          sway: 0.4 + Math.random() * 1,
          swayPhase: Math.random() * TAU,
          tint: Math.random(),
        });
      }
    };

    const initStars = () => {
      stars.length = 0;
      const count = Math.round(Math.min(Math.max((width * height) / 9000, 24), 85));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          depth: 0.35 + Math.random() * 0.65,
          drift: Math.random() * 2 - 1,
          fall: 0.35 + Math.random() * 0.95,
          rotation: Math.random() * TAU,
          spin: (Math.random() * 2 - 1) * 0.012,
          twinkle: Math.random() * TAU,
          twinkleSpeed: 0.012 + Math.random() * 0.03,
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
      initPetals();
      initStars();
    };

    const drawStar = (s) => {
      const arm = s.depth * (4 + Math.sin(s.twinkle) * 1.6);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.globalAlpha = 0.2 + (Math.sin(s.twinkle) + 1) * 0.34;
      ctx.strokeStyle = "rgba(226, 245, 253, 0.95)";
      ctx.lineWidth = 0.85;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -arm);
        ctx.moveTo(0, -arm * 0.58);
        ctx.lineTo(arm * 0.3, -arm * 0.8);
        ctx.moveTo(0, -arm * 0.58);
        ctx.lineTo(-arm * 0.3, -arm * 0.8);
      }
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(0, 0, arm * 0.16, 0, TAU);
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (p) => {
      const sz = p.size;
      const flipSin = Math.sin(p.flip) * 0.65 + 0.55;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.drift * 0.5 + Math.sin(p.flip) * 0.4);

      const grad = ctx.createLinearGradient(-sz * 0.5, -sz * 0.5, sz * 0.5, sz * 0.5);
      if (p.tint < 0.5) {
        grad.addColorStop(0, "rgba(255, 236, 240, 0.95)");
        grad.addColorStop(1, "rgba(238, 166, 180, 0.78)");
      } else {
        grad.addColorStop(0, "rgba(255, 249, 232, 0.95)");
        grad.addColorStop(1, "rgba(233, 205, 143, 0.78)");
      }

      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.55 + flipSin * 0.4;
      ctx.beginPath();
      ctx.moveTo(0, -sz * 0.62);
      ctx.bezierCurveTo(sz * 0.74, -sz * 0.38, sz * 0.48, sz * 0.58, 0, sz * 0.7);
      ctx.bezierCurveTo(-sz * 0.48, sz * 0.58, -sz * 0.74, -sz * 0.38, 0, -sz * 0.62);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      for (const p of petals) {
        p.y += p.fall;
        p.x += Math.sin(t * 0.5 + p.swayPhase) * p.sway + p.drift * 0.35;
        p.flip += p.flipSpeed;
        if (p.y > height + 40) {
          p.y = -40;
          p.x = Math.random() * width;
        }
        drawPetal(p);
      }

      for (const s of stars) {
        s.y += s.fall * s.depth;
        s.x += Math.sin(t * 0.8 * s.depth + s.rotation) * 0.34 + s.drift * 0.06;
        s.rotation += s.spin;
        s.twinkle += s.twinkleSpeed;
        if (s.y > height + 30) {
          s.y = -30;
          s.x = Math.random() * width;
        }
        drawStar(s);
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

  return <canvas ref={canvasRef} className="sparkle-snow" aria-hidden="true" />;
};
