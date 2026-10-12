import React from "react";
import { weddingConfig } from "../config/weddingConfig";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export const CeremonyCards = () => {
  const { events, couple } = weddingConfig;

  const formatIsoForCal = (dateStr) => {
    return new Date(dateStr)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const getCalendarUrl = (event) => {
    const title = `${event.title} · ${couple.groom.firstName} & ${couple.bride.firstName}`;
    const location = `${event.venuePlaceholder}, ${event.addressPlaceholder}`;
    const details = `${event.description}\n\nVenue: ${event.venuePlaceholder}\n${couple.hashtag}`;

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
    const query = encodeURIComponent(`${event.venuePlaceholder} ${event.addressPlaceholder}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <section className="section-wrap" id="events">
      <div className="section-intro">
        <div className="label-badge">Sacred Moments</div>
        <h2 className="main-heading">Ceremony &amp; Celebrations</h2>
        <p className="events-intro-line">
          Every gathering is a cherished chapter in our new beginning
        </p>
      </div>

      <div className="arch-cards-grid">
        {events.map((event) => {
          const calUrl = getCalendarUrl(event);
          const mapUrl = getMapsUrl(event);

          return (
            <article key={event.id} className={`arch-card card-${event.type}`}>
              <div>
                {/* Auspicious Motif */}
                <div className="arch-graphic">{event.motif}</div>

                <div className="save-the-date-tag">Save The Date</div>
                <h3 className="event-script-title">{event.title}</h3>
                <div className="event-subtitle-tag">{event.subtitle}</div>

                {/* Calendar Date Display */}
                <div className="date-row">
                  <span className="day-name">{event.weekday}</span>
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
                  title="View venue on Google Maps"
                >
                  <MapPin size={16} />
                  <strong>{event.venuePlaceholder}</strong>
                  <span>{event.addressPlaceholder} · View Location</span>
                </a>

                <a
                  className="add-to-calendar-btn"
                  href={calUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`Add ${event.title} to Calendar`}
                >
                  <span className="calendar-btn-icon" aria-hidden="true">
                    <span>{event.day}</span>
                    <span style={{ fontSize: "0.55rem", opacity: 0.85 }}>{event.month}</span>
                  </span>
                  <span className="calendar-btn-copy">
                    <strong>Add To Calendar</strong>
                    <span>{event.weekday} · {event.time}</span>
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
