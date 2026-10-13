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

        {/* Traditional Two-Sided Lineage & Couple Pairing */}
        <div className="formal-family-layout">
          {/* Groom's Family Side */}
          <div className="family-column groom-column">
            <div className="family-side-tag">वर पक्ष · Groom's Family</div>
            <h3 className="family-person-name">{couple.groom.fullName}</h3>
            
            <div className="family-kinship-card">
              <div className="kinship-row">
                <span className="kinship-badge">{couple.groom.grandparentsLabel}</span>
                <span className="kinship-names">{couple.groom.grandparents}</span>
              </div>
              <div className="kinship-row">
                <span className="kinship-badge">{couple.groom.parentsLabel}</span>
                <span className="kinship-names">{couple.groom.parents}</span>
              </div>
            </div>
          </div>

          {/* Central Sacred Knot / Weds Seal */}
          <div className="formal-weds-seal" aria-hidden="true">
            <span className="weds-knot-symbol">परिणय</span>
            <span className="weds-ampersand">&amp;</span>
            <span className="weds-knot-sub">WEDS</span>
          </div>

          {/* Bride's Family Side */}
          <div className="family-column bride-column">
            <div className="family-side-tag">वधू पक्ष · Bride's Family</div>
            <h3 className="family-person-name">{couple.bride.fullName}</h3>
            
            <div className="family-kinship-card">
              <div className="kinship-row">
                <span className="kinship-badge">{couple.bride.grandparentsLabel}</span>
                <span className="kinship-names">{couple.bride.grandparents}</span>
              </div>
              <div className="kinship-row">
                <span className="kinship-badge">{couple.bride.parentsLabel}</span>
                <span className="kinship-names">{couple.bride.parents}</span>
              </div>
            </div>
          </div>
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

          <div className="formal-detail-item formal-contacts-block">
            <span className="formal-detail-label">
              <Phone size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              Contact &amp; RSVP
            </span>
            <div className="formal-contacts-list">
              {formalCard.contacts && formalCard.contacts.length > 0 ? (
                formalCard.contacts.map((c, i) => (
                  <a
                    key={i}
                    href={`tel:${c.tel}`}
                    className="formal-contact-pill"
                    title={`Call ${c.name} at ${c.phone}`}
                  >
                    <span className="contact-name">{c.name}</span>
                    <span className="contact-sep">·</span>
                    <span className="contact-phone">{c.phone}</span>
                  </a>
                ))
              ) : (
                <span className="formal-detail-val">{formalCard.contactPlaceholder}</span>
              )}
            </div>
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
