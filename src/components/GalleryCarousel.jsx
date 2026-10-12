import React, { useRef, useState, useEffect, useCallback } from "react";
import { weddingConfig } from "../config/weddingConfig";

const CarouselTrack = ({ items, direction = 1, onSelect }) => {
  const trackRef = useRef(null);
  const setRef = useRef(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const isPausedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragRef = useRef(null);
  const hasDraggedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const updateTransform = useCallback(() => {
    if (!trackRef.current || !setWidthRef.current) return;
    const w = setWidthRef.current;
    const pos = direction === 1 ? offsetRef.current : w - offsetRef.current;
    trackRef.current.style.transform = `translate3d(${-pos}px, 0, 0)`;
  }, [direction]);

  // Measure single track width
  useEffect(() => {
    const measure = () => {
      if (!setRef.current || !trackRef.current) return;
      const computed = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(computed.gap || "0");
      setWidthRef.current = setRef.current.offsetWidth + gap;
      updateTransform();
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (setRef.current) observer.observe(setRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [updateTransform]);

  // RequestAnimationFrame smooth loop
  useEffect(() => {
    let animId;
    let lastTime;

    const loop = (now) => {
      if (lastTime === undefined) lastTime = now;
      const delta = Math.min(now - lastTime, 40);
      lastTime = now;

      const w = setWidthRef.current;
      if (!isPausedRef.current && w > 0) {
        offsetRef.current = (offsetRef.current + delta * 0.035) % w;
        updateTransform();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [updateTransform]);

  const pause = () => {
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const resume = () => {
    if (!dragRef.current && !isHoveredRef.current) {
      isPausedRef.current = false;
      setIsPaused(false);
    }
  };

  return (
    <div
      className={`carousel-track ${isPaused ? "is-paused" : ""}`}
      ref={trackRef}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        pause();
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        resume();
      }}
      onPointerDown={(e) => {
        pause();
        dragRef.current = {
          startX: e.clientX,
          startOffset: offsetRef.current,
        };
        hasDraggedRef.current = false;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragRef.current || !setWidthRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        if (Math.abs(dx) > 5) hasDraggedRef.current = true;

        offsetRef.current =
          (dragRef.current.startOffset - dx * direction) % setWidthRef.current;
        if (offsetRef.current < 0) offsetRef.current += setWidthRef.current;
        updateTransform();
      }}
      onPointerUp={(e) => {
        dragRef.current = null;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        setTimeout(() => {
          hasDraggedRef.current = false;
        }, 50);
        resume();
      }}
      onPointerCancel={(e) => {
        dragRef.current = null;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
        resume();
      }}
    >
      {[0, 1, 2].map((setIndex) => (
        <div
          key={setIndex}
          className="gallery-track-set"
          ref={setIndex === 0 ? setRef : undefined}
        >
          {items.map((item, idx) => (
            <div
              key={`${setIndex}-${idx}`}
              className="gallery-item"
              onClick={() => {
                if (!hasDraggedRef.current) onSelect(item);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(item);
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              <span className="gallery-overlay-badge">{item.title}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const GalleryCarousel = ({ onSelectPhoto }) => {
  const { gallery } = weddingConfig;

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-intro gallery-header">
        <div className="label-badge">{gallery.eyebrow}</div>
        <h2 className="main-heading">{gallery.title}</h2>
        <p className="italic-note">{gallery.subtitle}</p>
      </div>

      <div className="gallery-carousel-wrapper">
        <CarouselTrack
          items={gallery.itemsTrack1}
          direction={1}
          onSelect={onSelectPhoto}
        />
        <CarouselTrack
          items={gallery.itemsTrack2}
          direction={-1}
          onSelect={onSelectPhoto}
        />
      </div>

      <div className="pause-indicator">
        ◉ Hover or touch to pause · Drag to slide · Click photo to view in detail ◉
      </div>
    </section>
  );
};
