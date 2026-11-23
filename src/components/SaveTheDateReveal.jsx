import React, { useState, useEffect, useRef, useMemo } from "react";
import { RevealBurstCanvas } from "./canvases/RevealBurstCanvas";
import { weddingConfig } from "../config/weddingConfig";
import { Calendar, ChevronDown, MapPin } from "lucide-react";

/**
 * Robust ISO parser targeting Asia/Kolkata (IST · UTC+05:30)
 * Eliminates browser-specific Date.parse implementation differences
 */
export const parseIsoWithTimezone = (isoString) => {
  if (!isoString) return 0;
  const match = String(isoString).match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(?:([+-])(\d{2}):(\d{2})|Z)?$/
  );
  if (!match) {
    return new Date(isoString).getTime();
  }
  const [, year, month, day, hour, min, sec, , sign, tzHour, tzMin] = match;
  const utcMs = Date.UTC(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hour, 10),
    parseInt(min, 10),
    parseInt(sec, 10)
  );
  if (sign && tzHour && tzMin) {
    const offsetMs =
      (parseInt(tzHour, 10) * 60 + parseInt(tzMin, 10)) * 60 * 1000;
    return sign === "+" ? utcMs - offsetMs : utcMs + offsetMs;
  }
  // Default to Asia/Kolkata (+05:30) if no offset in string
  const istOffsetMs = (5 * 60 + 30) * 60 * 1000;
  return utcMs - istOffsetMs;
};

/**
 * Calculates remaining days, hours, minutes, and seconds accurately
 * Prevents negative countdown values and flags completion
 */
export const computeCountdown = (targetTimestamp) => {
  if (!targetTimestamp) {
    return {
      isComplete: false,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      totalSeconds: 0,
    };
  }
  const now = Date.now();
  const diff = targetTimestamp - now;

  if (diff <= 0) {
    return {
      isComplete: true,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    isComplete: false,
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    totalSeconds,
  };
};

export const SaveTheDateReveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [lang, setLang] = useState("en");
  const burstRef = useRef(null);
  const cardRef = useRef(null);

  const { couple, weddingDate, saveTheDate } = weddingConfig;

  // Language synchronization with global switcher
  useEffect(() => {
    const handleSync = (e) => setLang(e.detail);
    window.addEventListener("wedding-lang-change", handleSync);
    return () => window.removeEventListener("wedding-lang-change", handleSync);
  }, []);

  // Parse target timestamp locked to Asia/Kolkata
  const targetTime = useMemo(
    () => parseIsoWithTimezone(weddingDate.iso),
    [weddingDate.iso]
  );

  // Initialize with exact calculated time (no hardcoded placeholder or delay)
  const [timeLeft, setTimeLeft] = useState(() => computeCountdown(targetTime));

  // Dynamic Live Countdown Timer
  useEffect(() => {
    const tick = () => {
      setTimeLeft(computeCountdown(targetTime));
    };
    tick();
    const interval = setInterval(tick, 1000);
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

  // Google Calendar URL generator with accurate UTC dates
  const formatIsoForCal = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const calendarUrl = (() => {
    const startMs = targetTime;
    const endMs = startMs + 6 * 60 * 60 * 1000; // 6 hours event
    const title = `Wedding Vivah: ${couple.bride.firstName} & ${couple.groom.firstName}`;
    const location = weddingDate.venuePlaceholder;
    const details = `You are cordially invited to celebrate the wedding of ${couple.bride.fullName} and ${couple.groom.fullName}.\n\nDate: ${weddingDate.displayDay} ${weddingDate.displayMonth} ${weddingDate.displayYear}\nVenue: ${weddingDate.venuePlaceholder}\nTime: ${weddingDate.timePlaceholder}\n\n${couple.hashtag}`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${formatIsoForCal(startMs)}/${formatIsoForCal(endMs)}`,
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
            ? (lang === "hi"
                ? "शुभ घड़ी निकट है, हमारे इस पावन उत्सव में पधारकर हमें अनुगृहीत करें"
                : "Mark your calendar and join us as we celebrate our new beginning")
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
                    alt="Priyanshi & Abhishek Royal Wedding Logo"
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
                  alt="Priyanshi & Abhishek Royal Wedding Emblem"
                  className="revealed-wedding-logo"
                />
              </div>
            )}
            <div className="label-badge">{saveTheDate.ceremonyTitle}</div>
            <h3 className="script-name">
              {couple.bride.firstName} &amp; {couple.groom.firstName}
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

            {/* Dynamic Live Countdown Card or Completed State */}
            {timeLeft.isComplete ? (
              <div className="countdown-completed-state" ref={cardRef}>
                <div className="completed-emblem" aria-hidden="true">
                  <span className="completed-sparkle">✦</span>
                  <span className="completed-lotus">🪷</span>
                  <span className="completed-sparkle">✦</span>
                </div>
                <div className="completed-shloka">
                  {lang === "hi"
                    ? "॥ श्री गणेशाय नमः · पावन विवाह उत्सव ॥"
                    : "॥ Sacred Vivah Celebration ॥"}
                </div>
                <h4 className="completed-heading">
                  {lang === "hi"
                    ? "विवाह उत्सव प्रारम्भ हो चुका है!"
                    : "The Wedding Celebration Has Begun!"}
                </h4>
                <p className="completed-subtext">
                  {lang === "hi"
                    ? "प्रियांशी एवं अभिषेक का पावन विवाह समारोह सृष्टि रिसॉर्ट्स एंड क्लब, देवास में आरम्भ हो चुका है। आप सभी का सस्नेह स्वागत है।"
                    : "The royal wedding celebration of Priyanshi & Abhishek is underway at Srishti Resort & Club, Dewas. Welcome to the celebration!"}
                </p>
                <div className="completed-badge">
                  <span className="completed-live-dot" aria-hidden="true" />
                  <span>
                    {lang === "hi"
                      ? "समारोह जारी है · सृष्टि क्लब, देवास"
                      : "Celebration Underway · Srishti Club, Dewas"}
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="countdown-card"
                ref={cardRef}
                onMouseMove={handleCountdownMouseMove}
                onMouseLeave={handleCountdownMouseLeave}
              >
                <div className="countdown-timezone-tag">
                  <span className="tz-dot" aria-hidden="true" />
                  <span>
                    {lang === "hi"
                      ? "भारतीय मानक समय · Asia/Kolkata (IST · UTC+05:30)"
                      : "Indian Standard Time · Asia/Kolkata (IST · UTC+05:30)"}
                  </span>
                </div>

                <div className="timer-unit">
                  <span className="timer-num">{timeLeft.days}</span>
                  <span className="timer-label">{lang === "hi" ? "दिन" : "DAYS"}</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-num">{timeLeft.hours}</span>
                  <span className="timer-label">{lang === "hi" ? "घंटे" : "HOURS"}</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-num">{timeLeft.minutes}</span>
                  <span className="timer-label">{lang === "hi" ? "मिनट" : "MINS"}</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-num">{timeLeft.seconds}</span>
                  <span className="timer-label">{lang === "hi" ? "सेकंड" : "SECS"}</span>
                </div>
              </div>
            )}

            <div className="btn-row">
              {timeLeft.isComplete ? (
                <>
                  <a className="promise-highlight-btn" href="#events">
                    <ChevronDown size={16} /> {lang === "hi" ? "विवाह कार्यक्रम देखें" : "View Wedding Itinerary"}
                  </a>
                  {weddingDate.mapUrl && (
                    <a
                      className="promise-highlight-btn secondary"
                      href={weddingDate.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin size={16} /> {lang === "hi" ? "सृष्टि क्लब मैप्स देखें" : "Venue Directions"}
                    </a>
                  )}
                </>
              ) : (
                <>
                  <a
                    className="promise-highlight-btn"
                    href={calendarUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Add to Google Calendar"
                  >
                    <Calendar size={16} /> {lang === "hi" ? "कैलेंडर में जोड़ें" : "Add to Calendar"}
                  </a>
                  <a className="promise-highlight-btn secondary" href="#events">
                    <ChevronDown size={16} /> {saveTheDate.buttonItinerary}
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
