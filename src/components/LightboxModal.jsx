import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const LightboxModal = ({ photo, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      className="lightbox-modal"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close photo preview"
        >
          <X size={28} />
        </button>

        {onPrev && (
          <button
            className="lightbox-nav prev"
            onClick={onPrev}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <img src={photo.src} alt={photo.title || "Wedding photo"} />

        {photo.title && (
          <div className="lightbox-caption">
            <strong>{photo.title}</strong>
            {photo.caption && <div className="lightbox-subcaption">{photo.caption}</div>}
          </div>
        )}

        {onNext && (
          <button
            className="lightbox-nav next"
            onClick={onNext}
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};
