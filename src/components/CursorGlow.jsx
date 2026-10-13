import React, { useEffect, useRef, useState } from "react";

export const CursorGlow = () => {
  const glowRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    let mouseX = -200;
    let mouseY = -200;
    let currentX = -200;
    let currentY = -200;
    let animId;

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      // Smooth linear interpolation (lerp) for silky lag-free motion
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isEnabled) return null;

  return <div ref={glowRef} className="cursor-ambient-glow" aria-hidden="true" />;
};
