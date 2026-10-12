import React, { useEffect, useRef } from "react";
import { SparkleSnowCanvas } from "./canvases/SparkleSnowCanvas";
import { BubbleVeilCanvas } from "./canvases/BubbleVeilCanvas";
import { DrawingTrailCanvas } from "./canvases/DrawingTrailCanvas";
import { weddingConfig } from "../config/weddingConfig";

export const CelestialIntro = ({ onEnter }) => {
  const containerRef = useRef(null);
  const haloRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers = Array.from(container.querySelectorAll(".parallax-layer")).map((el) => ({
      depth: Number(el.dataset.depth) || 1,
      element: el,
    }));

    const onPointerMove = (e) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate(${normX * 100}px, ${normY * 60}px)`;
      }

      for (const layer of layers) {
        const factor = Math.min(layer.depth, 4) * 0.55;
        layer.element.style.setProperty("--p-pointer-x", `${(-normX * 26 * factor).toFixed(2)}px`);
        layer.element.style.setProperty("--p-pointer-y", `${(-normY * 18 * factor).toFixed(2)}px`);
      }
    };

    const onPointerDown = (e) => {
      // Create a few burst stars on click
      if (e.target.closest("button")) return;
      for (let i = 0; i < 12; i++) {
        const spark = document.createElement("span");
        spark.className = "spark-burst";
        spark.textContent = "✦";
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        spark.style.color = ["#fff8e6", "#fad4c0", "#ddf2fd"][i % 3];
        container.appendChild(spark);

        const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
        const dist = 30 + Math.random() * 80;
        spark.animate(
          [
            { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
            {
              opacity: 0,
              transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0.3)`,
            },
          ],
          { duration: 800 + Math.random() * 400, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        ).onfinish = () => spark.remove();
      }
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const { intro } = weddingConfig;

  return (
    <main className="entry-scene" ref={containerRef}>
      {/* SVG Depth Filters */}
      <svg className="depth-filters" aria-hidden="true" focusable="false">
        <defs>
          <filter id="entryDepthSoft" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.1" />
          </filter>
          <filter id="entryDepthMid" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="0.95" />
          </filter>
        </defs>
      </svg>

      <div className="entry-vignette" />
      <div className="pointer-halo" ref={haloRef} aria-hidden="true" />

      {/* Floating Orbital Photographic Frames */}
      <div className="parallax-gallery" aria-hidden="true">
        {intro.orbitalFrames.map((frame, index) => (
          <div
            key={frame.id}
            className="parallax-layer"
            data-depth={frame.depth}
            data-band={index < 4 ? "far" : index < 7 ? "mid" : "near"}
          >
            <figure
              className="parallax-frame"
              style={{
                "--depth": frame.depth,
                "--tilt": `rotate(${frame.tilt})`,
                "--float-delay": frame.delay,
                left: `var(${frame.posVar})`,
              }}
            >
              <span className="frame-plate" />
              <span className="frame-photo">
                <img src={frame.src} alt="" loading="eager" draggable="false" />
              </span>
              <span className="frame-sheen" />
            </figure>
          </div>
        ))}
      </div>

      {/* Atmospheric Interactive Canvases */}
      <SparkleSnowCanvas />
      <BubbleVeilCanvas />
      <DrawingTrailCanvas />

      {/* Central Celestial Portal */}
      <section className="entry-content">
        <div className="portrait-portal">
          <span className="portrait-aura" aria-hidden="true" />
          <span className="portrait-ring" aria-hidden="true" />
          <span className="portrait-ring ring-two" aria-hidden="true" />
          
          <span className="portrait-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </span>

          <button
            className="portrait-bubble"
            type="button"
            onClick={onEnter}
            aria-label={`${intro.enterButtonText} — ${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}`}
          >
            <span className="bubble-glass" aria-hidden="true" />
            <span className="bubble-photo">
              <img src={intro.centralPhoto} alt="Abhishek & Priyanshi" draggable="false" />
            </span>
            <span className="bubble-sheen" aria-hidden="true" />
            <span className="bubble-halo" aria-hidden="true" />

            {/* Monogram Wax Seal */}
            <span className="bubble-seal">
              <i>{intro.monogramSeal}</i>
            </span>

            <span className="bubble-copy">
              <strong>{intro.enterButtonText}</strong>
              <span className="bubble-copy-hint">{intro.enterSubtext}</span>
            </span>
          </button>
        </div>
      </section>

      <div className="draw-hint">{intro.hintText}</div>
    </main>
  );
};
