import React, { useState } from "react";
import { weddingConfig } from "../config/weddingConfig";
import { MapPin, ExternalLink, Calendar as CalendarIcon, Sparkles } from "lucide-react";

export const CeremonyCards = () => {
  const { events, couple } = weddingConfig;
  const [activeDay, setActiveDay] = useState("all");

  const dayTabs = [
    { id: "all", label: "All Events", sub: "समस्त 9 कार्यक्रम" },
    { id: "08", label: "8 Dec", sub: "खल मिट्टी" },
    { id: "09", label: "9 Dec", sub: "हल्दी पूजन" },
    { id: "10", label: "10 Dec", sub: "मंडप" },
    { id: "11", label: "11 Dec", sub: "मायन · मामेरा · संगीत" },
    { id: "12", label: "12 Dec", sub: "सगाई · बारात · विवाह" },
  ];

  const filteredEvents = activeDay === "all" ? events : events.filter((e) => e.day === activeDay);

  const formatIsoForCal = (dateStr) => {
    return new Date(dateStr)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const getCalendarUrl = (event) => {
    const title = `${event.titleHindi || event.title} · ${couple.groom.firstName} & ${couple.bride.firstName}`;
    const location = `${event.venuePlaceholder}, ${event.addressPlaceholder}`;
    const details = `${event.description}\n\nTime: ${event.time}\nVenue: ${event.venuePlaceholder}\n${couple.hashtag}`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${formatIsoForCal(event.startIso)}/${formatIsoForCal(event.endIso)}`,
      details,
      location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const getMapsUrl = (event) => {
    if (event.mapUrl) return event.mapUrl;
    const query = encodeURIComponent(`${event.venuePlaceholder} ${event.addressPlaceholder}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <section className="section-wrap" id="events">
      <div className="section-intro">
        <div className="label-badge">Sacred Moments · <span className="hindi-badge-text">वैवाहिक कार्यक्रम</span></div>
        <h2 className="main-heading">Ceremony &amp; Celebrations</h2>
        <p className="events-intro-line">
          08 से 12 दिसम्बर 2026 · समस्त मांगलिक आयोजनों में आपकी गरिमामयी उपस्थिति प्रार्थनीय है
        </p>
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
          const calUrl = getCalendarUrl(event);
          const mapUrl = getMapsUrl(event);

          return (
            <article key={event.id} className={`arch-card card-${event.type}`}>
              <div>
                {/* Auspicious Motif */}
                <div className="arch-graphic">{event.motif}</div>

                <div className="save-the-date-tag">
                  {event.weekdayHindi ? `${event.weekdayHindi} · ${event.weekday}` : "Save The Date"}
                </div>
                <h3 className="event-script-title">{event.titleHindi || event.title}</h3>
                <div className="event-subtitle-tag">{event.subtitle}</div>

                {/* Calendar Date Display */}
                <div className="date-row">
                  <span className="day-name">{event.weekdayHindi || event.weekday}</span>
                  <span className="day-number">{event.day}</span>
                  <span className="month-year">
                    {event.month}
                    <br />
                    {event.year}
                  </span>
                </div>

                <div className="time-pill-badge">◷ {event.time}</div>

                <p className="event-narrative">{event.description}</p>
              </div>

              {/* Card Footer with Location and Calendar Links */}
              <div className="arch-card-footer">
                <a
                  className="venue-bottom-banner"
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`View venue on Google Maps: ${event.venuePlaceholder}`}
                >
                  <MapPin size={16} />
                  <strong>{event.venuePlaceholder}</strong>
                  <span>{event.addressPlaceholder} · View Map</span>
                </a>

                <a
                  className="add-to-calendar-btn"
                  href={calUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`Add ${event.titleHindi || event.title} to Google Calendar`}
                >
                  <span className="calendar-btn-icon" aria-hidden="true">
                    <span>{event.day}</span>
                    <span style={{ fontSize: "0.55rem", opacity: 0.85 }}>{event.month}</span>
                  </span>
                  <span className="calendar-btn-copy">
                    <strong>Add To Calendar</strong>
                    <span>{event.time}</span>
                  </span>
                  <ExternalLink size={14} style={{ marginLeft: "auto", opacity: 0.7 }} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
