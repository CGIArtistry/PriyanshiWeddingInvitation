import React, { useState, useEffect } from "react";
import { weddingConfig } from "../config/weddingConfig";
import { MapPin, ExternalLink, Calendar as CalendarIcon, Sparkles } from "lucide-react";

// Import authentic atmospheric ceremony backgrounds
import bgKhalMitti from "../assets/images/ceremonies/bg_khal_mitti.jpg";
import bgHaldi from "../assets/images/ceremonies/bg_haldi.jpg";
import bgMandap from "../assets/images/ceremonies/bg_mandap.jpg";
import bgMaayan from "../assets/images/ceremonies/bg_maayan.jpg";
import bgMamera from "../assets/images/ceremonies/bg_mamera.jpg";
import bgSangeet from "../assets/images/ceremonies/bg_sangeet.jpg";
import bgSagai from "../assets/images/ceremonies/bg_sagai.jpg";
import bgBaraat from "../assets/images/ceremonies/bg_baraat.jpg";
import bgReception from "../assets/images/ceremonies/bg_reception.jpg";
import bgVivah from "../assets/images/ceremonies/bg_vivah.jpg";

const ceremonyBackgrounds = {
  "mata-poojan": bgHaldi,
  "mandap": bgMandap,
  "mamera": bgMamera,
  "haldi-mehndi": bgHaldi,
  "mahila-sangeet": bgSangeet,
  "sagai": bgSagai,
  "baraat-swagat": bgBaraat,
  "varmala-reception": bgReception,
  "shubh-vivah": bgVivah,
  // Also include groom aliases for robustness
  "khal-mitti": bgKhalMitti,
  "mata-poojan-haldi": bgHaldi,
  "maayan-poojan": bgMaayan,
  "var-nikasi": bgBaraat,
};

export const CeremonyCards = () => {
  const { events, couple, eventsSection } = weddingConfig;
  const [activeDay, setActiveDay] = useState("all");
  const [lang, setLang] = useState("hi");
  const [hoveredEventId, setHoveredEventId] = useState(null);

  // Listen for language synchronization from FormalCard or global toggle
  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && (e.detail === "hi" || e.detail === "en")) {
        setLang(e.detail);
      }
    };
    window.addEventListener("wedding-lang-change", handleSync);
    return () => window.removeEventListener("wedding-lang-change", handleSync);
  }, []);

  const handleSelectLang = (newLang) => {
    setLang(newLang);
    window.dispatchEvent(new CustomEvent("wedding-lang-change", { detail: newLang }));
  };

  const sec = (eventsSection && eventsSection[lang]) || eventsSection?.hi || {
    badge: "Sacred Moments · Ceremony Schedule",
    title: "Ceremony & Celebrations",
    intro: "10 से 12 दिसम्बर 2026 · समस्त मांगलिक आयोजनों में आपकी गरिमामयी उपस्थिति प्रार्थनीय है",
    saveTheDateTag: "Save The Date",
    viewMap: "View Map",
    addToCalendar: "Add To Calendar",
    dayTabs: [
      { id: "all", label: "All Events", sub: "समस्त 8 कार्यक्रम" },
      { id: "10", label: "10 Dec", sub: "Mata Poojan" },
      { id: "11", label: "11 Dec", sub: "Mandap · Mamera · Sangeet" },
      { id: "12", label: "12 Dec", sub: "Sagai · Baraat · Reception · Vivah" },
    ],
  };

  const dayTabs = sec.dayTabs;
  const filteredEvents = activeDay === "all" ? events : events.filter((e) => e.day === activeDay);

  const formatIsoForCal = (dateStr) => {
    return new Date(dateStr)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const getCalendarUrl = (evData) => {
    const title = `${evData.title} · ${couple.bride.firstName} & ${couple.groom.firstName}`;
    const location = `${evData.venue}, ${evData.address}`;
    const details = `${evData.description}\n\nTime: ${evData.time}\nVenue: ${evData.venue}\n${couple.hashtag}`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${formatIsoForCal(evData.startIso)}/${formatIsoForCal(evData.endIso)}`,
      details,
      location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const getMapsUrl = (evData) => {
    if (evData.mapUrl) return evData.mapUrl;
    const query = encodeURIComponent(`${evData.venue} ${evData.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Active ceremony background: follows pointer hover immediately, or active day tab, or defaults to Mata Poojan
  const activeBgId = hoveredEventId || (
    activeDay === "10" ? "mata-poojan" :
    activeDay === "11" ? "mandap" :
    activeDay === "12" ? "shubh-vivah" :
    "mata-poojan"
  );

  return (
    <section
      className={`section-wrap ceremonies-section ${lang === "hi" ? "is-hindi-version" : "is-english-version"}`}
      id="events"
      lang={lang}
    >
      {/* Dynamic Ceremony Backgrounds that transition smoothly based on Pointer Hover */}
      <div className="ceremony-dynamic-bg-container" aria-hidden="true">
        {Object.entries(ceremonyBackgrounds).map(([id, bgUrl]) => (
          <div
            key={id}
            className={`ceremony-bg-layer ${activeBgId === id ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${bgUrl})` }}
          />
        ))}
        <div className="ceremony-bg-overlay" />
      </div>

      <div className="ceremony-content-inner">
        <div className="section-intro">
          {/* Bilingual Language Selection Toolbar */}
          <div className="formal-lang-toolbar" style={{ marginBottom: "1.6rem" }}>
            <div className="formal-lang-pill-group" role="tablist" aria-label="Select Events Language">
              <button
                type="button"
                role="tab"
                aria-selected={lang === "hi"}
                className={`lang-tab-pill ${lang === "hi" ? "is-active" : ""}`}
                onClick={() => handleSelectLang("hi")}
                title="मांगलिक कार्यक्रम हिन्दी में देखें"
              >
                <span className="lang-tab-primary">हिन्दी</span>
                <span className="lang-tab-secondary">Hindi</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={lang === "en"}
                className={`lang-tab-pill ${lang === "en" ? "is-active" : ""}`}
                onClick={() => handleSelectLang("en")}
                title="View Ceremony Schedule in English"
              >
                <span className="lang-tab-primary">English</span>
                <span className="lang-tab-secondary">अंग्रेज़ी</span>
              </button>
            </div>
          </div>

          <div className="label-badge">
            {lang === "hi" ? <span className="hindi-badge-text">{sec.badge}</span> : sec.badge}
          </div>
          <h2 className="main-heading">{sec.title}</h2>
          <p className="events-intro-line">{sec.intro}</p>
        </div>

        {/* Interactive Day Filter Tabs */}
        <div className="ceremony-tabs-container">
          {dayTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ceremony-tab-pill ${activeDay === tab.id ? "is-active" : ""}`}
              onClick={() => setActiveDay(tab.id)}
              title={`View ${tab.label} events`}
            >
              <span className="tab-pill-label">{tab.label}</span>
              <span className="tab-pill-sub">{tab.sub}</span>
            </button>
          ))}
        </div>

        {/* Responsive Ceremonies Grid */}
        <div className="arch-cards-grid">
          {filteredEvents.map((event) => {
            const ev = (lang === "hi" ? event.hi : event.en) || event.hi || event;
            const title = ev.title || (lang === "hi" ? event.titleHindi : event.title);
            const subtitle = ev.subtitle || event.subtitle;
            const weekday = ev.weekday || (lang === "hi" ? event.weekdayHindi : event.weekday);
            const monthDisplay = ev.month || (lang === "hi" ? "दिस" : event.month);
            const time = ev.time || event.time;
            const venue = ev.venue || event.venuePlaceholder;
            const address = ev.address || event.addressPlaceholder;
            const description = ev.description || event.description;
            const saveTag =
              ev.saveTheDateTag ||
              (lang === "hi" ? `${weekday} · मांगलिक उत्सव` : `${weekday} · Save The Date`);

            const calUrl = getCalendarUrl({
              ...event,
              title,
              venue,
              address,
              description,
              time,
            });
            const mapUrl = getMapsUrl({
              ...event,
              venue,
              address,
            });

            return (
              <article
                key={event.id}
                className={`arch-card card-${event.type} ${
                  lang === "hi" ? "is-hindi-version" : "is-english-version"
                } ${activeBgId === event.id ? "is-hovered-ceremony" : ""}`}
                lang={lang}
                onMouseEnter={() => setHoveredEventId(event.id)}
                onMouseLeave={() => setHoveredEventId(null)}
                onTouchStart={() => setHoveredEventId(event.id)}
                onFocus={() => setHoveredEventId(event.id)}
                onBlur={() => setHoveredEventId(null)}
              >
                <div>
                  {/* Auspicious Motif */}
                  <div className="arch-graphic">{event.motif}</div>

                  <div className="save-the-date-tag">{saveTag}</div>
                  <h3 className="event-script-title">{title}</h3>
                  <div className="event-subtitle-tag">{subtitle}</div>

                  {/* Calendar Date Display */}
                  <div className="date-row">
                    <span className="day-name">{weekday}</span>
                    <span className="day-number">{event.day}</span>
                    <span className="month-year">
                      {monthDisplay}
                      <br />
                      {event.year}
                    </span>
                  </div>

                  <div className="time-pill-badge">◷ {time}</div>

                  <p className="event-narrative">{description}</p>
                </div>

                {/* Card Footer with Location and Calendar Links */}
                <div className="arch-card-footer">
                  <a
                    className="venue-bottom-banner"
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    title={`View venue on Google Maps: ${venue}`}
                  >
                    <MapPin size={16} />
                    <strong>{venue}</strong>
                    <span>
                      {address} · {lang === "hi" ? "गूगल मैप देखें" : "View Map"}
                    </span>
                  </a>

                  <a
                    className="add-to-calendar-btn"
                    href={calUrl}
                    target="_blank"
                    rel="noreferrer"
                    title={`Add ${title} to Google Calendar`}
                  >
                    <span className="calendar-btn-icon" aria-hidden="true">
                      <span>{event.day}</span>
                      <span style={{ fontSize: "0.55rem", opacity: 0.85 }}>{monthDisplay}</span>
                    </span>
                    <span className="calendar-btn-copy">
                      <strong>{lang === "hi" ? "कैलेंडर में जोड़ें" : "Add To Calendar"}</strong>
                      <span>{time}</span>
                    </span>
                    <ExternalLink size={14} style={{ marginLeft: "auto", opacity: 0.7 }} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
