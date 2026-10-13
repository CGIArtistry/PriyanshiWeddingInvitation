import React from "react";
import { weddingConfig } from "../config/weddingConfig";
import { MapPin, Clock, Calendar, Phone } from "lucide-react";

export const FormalCard = () => {
  const { couple, weddingDate, formalCard } = weddingConfig;

  return (
    <section className="section-wrap" id="invitation">
      <div className="formal-card">
        {/* Auspicious Invocation */}
        <div className="sacred-shloka-header">{formalCard.sacredInvocation}</div>

        <div className="label-badge">{formalCard.title}</div>

        <p className="host-intro">
          {formalCard.hostIntroText}
          <br />
          <strong>{formalCard.familyNamesPlaceholder}</strong>
          <br />
          <em>{formalCard.cordialMessage}</em>
        </p>

        <div className="couple-pairing">
          <span className="person-name">{couple.groom.fullName}</span>
          <span className="ampersand">&amp;</span>
          <span className="person-name">{couple.bride.fullName}</span>
        </div>

        {/* Wedding Details Grid with Placeholders */}
        <div className="formal-details-grid">
          <div className="formal-detail-item">
            <span className="formal-detail-label">
              <Calendar size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              Wedding Date
            </span>
            <span className="formal-detail-val">
              {weddingDate.displayWeekday}, {weddingDate.displayDay} {weddingDate.displayMonth} {weddingDate.displayYear}
            </span>
          </div>

          <div className="formal-detail-item">
            <span className="formal-detail-label">
              <Clock size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              Ceremony Timings
            </span>
            <span className="formal-detail-val">{formalCard.timingsPlaceholder}</span>
          </div>

          <div className="formal-detail-item">
            <span className="formal-detail-label">
              <MapPin size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              Wedding Venue
            </span>
            {formalCard.mapUrl ? (
              <a
                href={formalCard.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="formal-detail-val formal-detail-link"
                title="Open Srishti Club on Google Maps"
              >
                {formalCard.venuePlaceholder} <span className="venue-map-badge">📍 View on Maps</span>
              </a>
            ) : (
              <span className="formal-detail-val">{formalCard.venuePlaceholder}</span>
            )}
          </div>

          <div className="formal-detail-item">
            <span className="formal-detail-label">
              <Phone size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              Contact &amp; RSVP
            </span>
            <span className="formal-detail-val">{formalCard.contactPlaceholder}</span>
          </div>
        </div>

        {/* Sacred Blessing Pill */}
        <div className="scripture-pill" style={{ margin: "2rem auto 0" }}>
          <div className="scripture-text">{formalCard.blessingQuote}</div>
          <div className="scripture-citation">{formalCard.blessingCitation}</div>
        </div>
      </div>
    </section>
  );
};
