import React, { useState, useMemo, useEffect } from "react";
import { CelestialIntro } from "./components/CelestialIntro";
import { HeroSection } from "./components/HeroSection";
import { SaveTheDateReveal } from "./components/SaveTheDateReveal";
import { OurStory } from "./components/OurStory";
import { GalleryCarousel } from "./components/GalleryCarousel";
import { FormalCard } from "./components/FormalCard";
import { CeremonyCards } from "./components/CeremonyCards";
import { RsvpSection } from "./components/RsvpSection";
import { HeavenlyFinale } from "./components/HeavenlyFinale";
import { AudioPlayer } from "./components/AudioPlayer";
import { LightboxModal } from "./components/LightboxModal";
import { FloatingNav } from "./components/FloatingNav";
import { CursorGlow } from "./components/CursorGlow";
import { weddingConfig } from "./config/weddingConfig";

export function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Background atmosphere floating bubbles
  const atmosphereParticles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        size: 6 + (i % 8) * 3,
        left: `${(i * 29) % 100}%`,
        delay: `${(i % 13) * -1.7}s`,
        duration: `${13 + (i % 8) * 1.8}s`,
      })),
    []
  );

  const handleEnterInvitation = () => {
    setIsTransitioning(true);
    setShouldPlayAudio(true);

    const isMobile = window.innerWidth <= 768;
    const delay = isMobile ? 280 : 600;

    // Transition timing matching mobile fade or desktop glow-wash
    setTimeout(() => {
      setHasEntered(true);
      window.scrollTo({ top: 0, behavior: "instant" });
      if (isMobile) {
        setTimeout(() => setIsTransitioning(false), 380);
      }
    }, delay);
  };

  // Lightbox photo list for prev/next
  const allGalleryPhotos = useMemo(
    () => [
      ...weddingConfig.gallery.itemsTrack1,
      ...weddingConfig.gallery.itemsTrack2,
    ],
    []
  );

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currIndex = allGalleryPhotos.findIndex((p) => p.src === selectedPhoto.src);
    const nextIndex = (currIndex + 1) % allGalleryPhotos.length;
    setSelectedPhoto(allGalleryPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currIndex = allGalleryPhotos.findIndex((p) => p.src === selectedPhoto.src);
    const prevIndex = (currIndex - 1 + allGalleryPhotos.length) % allGalleryPhotos.length;
    setSelectedPhoto(allGalleryPhotos[prevIndex]);
  };

  // Smooth Scroll-Triggered Reveal Animation
  useEffect(() => {
    if (!hasEntered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const targets = document.querySelectorAll(
      ".section-wrap, .promise-section, .royal-reveal-section, .carousel-shell, .formal-card, .arch-card, .rsvp-shell"
    );

    targets.forEach((el) => {
      el.classList.add("reveal-on-scroll");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasEntered]);

  return (
    <div className={`app-root ${hasEntered ? "is-entered" : "is-entry"}`}>
      {/* 1. Opening Screen — Celestial Animation */}
      {!hasEntered && (
        <CelestialIntro onEnter={handleEnterInvitation} />
      )}

      {/* Glow Transition Wash */}
      {isTransitioning && (
        <div className="glow-transition" aria-hidden="true" />
      )}

      {/* 2. Main Wedding Invitation Page */}
      {hasEntered && (
        <div className="wedding-wrapper">
          {/* Subtle Ambient Cursor Light Follower (Desktop) */}
          <CursorGlow />

          {/* Floating Luxury Navigation Dock & Progress Bar */}
          <FloatingNav />

          {/* Ambient Falling Atmosphere Particles */}
          <div className="falling-atmosphere" aria-hidden="true">
            {atmosphereParticles.map((p) => (
              <span
                key={p.id}
                className="atmosphere-particle atmosphere-bubble"
                style={{
                  "--particle-size": `${p.size}px`,
                  "--particle-left": p.left,
                  "--particle-delay": p.delay,
                  "--particle-duration": p.duration,
                }}
              />
            ))}
          </div>

          {/* Clean Main Page Content: Hero Section Flush at Very Top */}
          <main className="wedding-page" id="top">
            {/* 3. Main Hero Section */}
            <HeroSection />

            {/* 4. Save The Date & Live Dynamic Countdown */}
            <SaveTheDateReveal />

            {/* 5. Our Story — Editorial Layout */}
            <OurStory />

            {/* 6. Wedding Photography Gallery */}
            <GalleryCarousel onSelectPhoto={setSelectedPhoto} />

            {/* 7. Wedding Information Formal Card */}
            <FormalCard />

            {/* 8. Ceremony & Celebration Cards */}
            <CeremonyCards />

            {/* 9. Warm Wishes & RSVP Section */}
            <RsvpSection />

            {/* 10. Heavenly Finale & Footer */}
            <HeavenlyFinale />
          </main>

          {/* Floating Audio Music Controller */}
          <AudioPlayer autoStart={shouldPlayAudio} />

          {/* Photo Gallery Lightbox */}
          <LightboxModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            onNext={handleNextPhoto}
            onPrev={handlePrevPhoto}
          />
        </div>
      )}
    </div>
  );
}

export default App;
