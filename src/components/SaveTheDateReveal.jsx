import React, { useState, useEffect, useRef } from "react";
import { RevealBurstCanvas } from "./canvases/RevealBurstCanvas";
import { weddingConfig } from "../config/weddingConfig";
import { Calendar, ChevronDown } from "lucide-react";

export const SaveTheDateReveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });
  const burstRef = useRef(null);
  const cardRef = useRef(null);

  const { couple, weddingDate, saveTheDate } = weddingConfig;
  const targetTime = new Date(weddingDate.iso).getTime();

  // Dynamic Live Countdown Timer
  useEffect(() => {
    const calculateCountdown = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // Handle Envelope Click
  const handleEnvelopeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height * 0.45;

    if (burstRef.current) {
      burstRef.current(originX, originY);
    }
    setIsRevealed(true);
  };

  // Cursor radial glow tracker on countdown card
  const handleCountdownMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--countdown-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--countdown-y", `${e.clientY - rect.top}px`);
    card.classList.add("is-hovered");
  };

  const handleCountdownMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("is-hovered");
  };

  // Google Calendar URL generator
  const formatIsoForCal = (date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const calendarUrl = (() => {
    const start = new Date(weddingDate.iso);
    const end = new Date(start.getTime() + 6 * 60 * 60 * 1000); // 6 hours event
    const title = `Wedding Vivah: ${couple.groom.firstName} & ${couple.bride.firstName}`;
    const location = weddingDate.venuePlaceholder;
    const details = `You are cordially invited to celebrate the wedding of ${couple.groom.fullName} and ${couple.bride.fullName}.\n\nDate: ${weddingDate.displayDay} ${weddingDate.displayMonth} ${weddingDate.displayYear}\nVenue: ${weddingDate.venuePlaceholder}\n\n${couple.hashtag}`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${formatIsoForCal(start)}/${formatIsoForCal(end)}`,
      details,
      location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  return (
    <section className="royal-reveal-section" id="save-the-date">
      <RevealBurstCanvas triggerRef={burstRef} />

      <div className="section-intro">
        <div className="label-badge">{saveTheDate.eyebrow}</div>
        <h2 className="main-heading">{saveTheDate.title}</h2>
        <p className="italic-note">
          {isRevealed
            ? "Mark your calendar and join us as we celebrate our new beginning"
            : saveTheDate.hintBeforeReveal}
        </p>
      </div>

      <div className="reveal-stage-box">
        {!isRevealed ? (
          <div className="envelope-portal">
            <span className="envelope-aura" aria-hidden="true" />
            <span className="envelope-ring" aria-hidden="true" />
            <span className="envelope-ring ring-two" aria-hidden="true" />

            <button
              className="royal-envelope"
              type="button"
              onClick={handleEnvelopeClick}
              aria-label="Unveil royal invitation"
            >
              <div className="royal-wax-seal-wrapper">
                {saveTheDate.logo ? (
                  <img
                    src={saveTheDate.logo}
                    alt="Abhishek & Priyanshi Royal Wedding Logo"
                    className="wax-seal-logo-img"
                  />
                ) : (
                  <span className="wax-seal">{couple.monogram}</span>
                )}
              </div>
              <span className="seal-invitation-text">{saveTheDate.envelopeText}</span>
              <span className="seal-hint">{saveTheDate.envelopeHint}</span>
            </button>
          </div>
        ) : (
          <div className="revealed-content">
            {saveTheDate.logo && (
              <div className="revealed-wedding-logo-crest">
                <img
                  src={saveTheDate.logo}
                  alt="Abhishek & Priyanshi Royal Wedding Emblem"
                  className="revealed-wedding-logo"
                />
              </div>
            )}
            <div className="label-badge">{saveTheDate.ceremonyTitle}</div>
            <h3 className="script-name">
              {couple.groom.firstName} &amp; {couple.bride.firstName}
            </h3>

            <div className="royal-date-display">
              <div className="royal-day">{weddingDate.displayDay}</div>
              <div className="royal-month-year">
                {weddingDate.displayMonth} {weddingDate.displayYear} · {weddingDate.displayWeekday}
              </div>
            </div>

            <p className="date-location">
              {weddingDate.mapUrl ? (
                <a
                  href={weddingDate.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="venue-quick-link"
                  title="View Srishti Club on Google Maps"
                >
                  📍 {weddingDate.venuePlaceholder} · {weddingDate.timePlaceholder}
                </a>
              ) : (
                <>{weddingDate.venuePlaceholder} · {weddingDate.timePlaceholder}</>
              )}
            </p>

            {/* Dynamic Live Countdown Card */}
            <div
              className="countdown-card"
              ref={cardRef}
              onMouseMove={handleCountdownMouseMove}
              onMouseLeave={handleCountdownMouseLeave}
            >
              <div className="timer-unit">
                <span className="timer-num">{timeLeft.days}</span>
                <span className="timer-label">DAYS</span>
              </div>
              <div className="timer-unit">
                <span className="timer-num">{timeLeft.hours}</span>
                <span className="timer-label">HOURS</span>
              </div>
              <div className="timer-unit">
                <span className="timer-num">{timeLeft.minutes}</span>
                <span className="timer-label">MINS</span>
              </div>
              <div className="timer-unit">
                <span className="timer-num">{timeLeft.seconds}</span>
                <span className="timer-label">SECS</span>
              </div>
            </div>

            <div className="btn-row">
              <a
                className="promise-highlight-btn"
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                title="Add to Google Calendar"
              >
                <Calendar size={16} /> Add to Calendar
              </a>
              <a className="promise-highlight-btn secondary" href="#events">
                <ChevronDown size={16} /> {saveTheDate.buttonItinerary}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
