import React, { useRef } from "react";
import { HeroFirefliesCanvas } from "./canvases/HeroFirefliesCanvas";
import { weddingConfig } from "../config/weddingConfig";

export const HeroSection = () => {
  const badgeRef = useRef(null);

  const handleMonogramClick = () => {
    const badge = badgeRef.current;
    if (!badge) return;

    const tinyHearts = badge.querySelectorAll(".monogram-tiny-heart");
    const sparks = badge.querySelectorAll(".monogram-spark");
    const mainHeart = badge.querySelector(".monogram-heart");

    // Pop the main heart
    if (mainHeart) {
      mainHeart.animate(
        [
          { opacity: 0, transform: "translate(-50%, -50%) scale(0)" },
          { opacity: 1, transform: "translate(-50%, -50%) scale(1.3)", offset: 0.3 },
          { opacity: 0, transform: "translate(-50%, -50%) scale(0.6)" },
        ],
        { duration: 800, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    }

    // Scatter tiny hearts
    tinyHearts.forEach((th) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 90;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      th.animate(
        [
          { opacity: 0, transform: "translate(-50%, -50%) scale(0) rotate(0deg)" },
          { opacity: 0.9, transform: `translate(calc(-50% + ${x * 0.6}px), calc(-50% + ${y * 0.6}px)) scale(1) rotate(${Math.random() * 60 - 30}deg)`, offset: 0.4 },
          { opacity: 0, transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.4) rotate(${Math.random() * 120 - 60}deg)` },
        ],
        { duration: 750 + Math.random() * 350, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    });

    // Scatter sparks
    sparks.forEach((sp) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 100;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      sp.animate(
        [
          { opacity: 0, transform: "translate(-50%, -50%) scale(0)" },
          { opacity: 1, transform: `translate(calc(-50% + ${x * 0.5}px), calc(-50% + ${y * 0.5}px)) scale(1.2)`, offset: 0.4 },
          { opacity: 0, transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.2)` },
        ],
        { duration: 850 + Math.random() * 300, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    });
  };

  const { couple, hero } = weddingConfig;

  return (
    <header className="hero" id="hero">
      <HeroFirefliesCanvas />

      {/* Interactive Monogram Badge */}
      <button
        className="monogram-badge"
        ref={badgeRef}
        type="button"
        onClick={handleMonogramClick}
        aria-label="Interactive wedding monogram"
        title="Tap for love & sparks!"
      >
        <span className="monogram-letters">
          <span className="monogram-letter monogram-letter-a">A</span>
          <span className="monogram-letter monogram-letter-p">P</span>
          
          <span className="monogram-heart" aria-hidden="true">♥</span>
          
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={`heart-${i}`} className="monogram-tiny-heart" aria-hidden="true">♥</span>
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={`spark-${i}`} className="monogram-spark" aria-hidden="true">✦</span>
          ))}
        </span>
      </button>

      <div className="hero-subtitle">{hero.subtitle}</div>

      <h1 className="hero-title">
        <span className="name-abhishek">{couple.groom.firstName}</span>
        <span className="ampersand">&amp;</span>
        <span className="name-priyanshi">{couple.bride.firstName}</span>
      </h1>

      <div className="hashtag">{couple.hashtag}</div>

      {/* Vedic Mangal Shloka / Blessing Pill */}
      <div className="scripture-pill">
        <div className="scripture-text">“{hero.shlokaSanskrit}”</div>
        <div style={{ marginTop: "0.4rem", fontSize: "0.95rem", color: "var(--muted)", fontStyle: "italic" }}>
          {hero.shlokaTranslation}
        </div>
        <div className="scripture-citation">{hero.shlokaSource}</div>
      </div>
    </header>
  );
};
