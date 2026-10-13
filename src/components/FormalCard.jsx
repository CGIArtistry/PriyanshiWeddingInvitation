import React, { useState } from "react";
import { weddingConfig } from "../config/weddingConfig";
import { MapPin, Clock, Calendar, Phone, Languages } from "lucide-react";

export const FormalCard = () => {
  const { formalCard } = weddingConfig;
  const [lang, setLang] = useState("hi");

  React.useEffect(() => {
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

  const c = formalCard[lang] || formalCard.hi;

  return (
    <section className="section-wrap" id="invitation">
      <div className={`formal-card ${lang === "hi" ? "is-hindi-version" : "is-english-version"}`} lang={lang}>
        {/* Language Selection Switcher */}
        <div className="formal-lang-toolbar">
          <div className="formal-lang-pill-group" role="tablist" aria-label="Select Invitation Language">
            <button
              type="button"
              role="tab"
              aria-selected={lang === "hi"}
              className={`lang-tab-pill ${lang === "hi" ? "is-active" : ""}`}
              onClick={() => handleSelectLang("hi")}
              title="हिन्दी संस्करण देखें"
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
              title="View English Version"
            >
              <span className="lang-tab-primary">English</span>
              <span className="lang-tab-secondary">अंग्रेज़ी</span>
            </button>
          </div>
        </div>

        {/* Auspicious Invocation */}
        <div className="sacred-shloka-header">{c.sacredInvocation}</div>

        <div className="label-badge">{c.title}</div>

        <p className="host-intro">
          {c.hostIntroText}
          <br />
          <strong>{c.familyNames}</strong>
          <br />
          <em>{c.cordialMessage}</em>
        </p>

        {/* Traditional Two-Sided Lineage & Couple Pairing */}
        <div className="formal-family-layout">
          {/* Groom's Family Side */}
          <div className="family-column groom-column">
            <div className="family-side-tag">{c.groomSideTag}</div>
            <h3 className="family-person-name">{c.groomName}</h3>

            <div className="family-kinship-card">
              <div className="kinship-row">
                <span className="kinship-badge">{c.groomGrandparentsLabel}</span>
                <span className="kinship-names">{c.groomGrandparents}</span>
              </div>
              <div className="kinship-row">
                <span className="kinship-badge">{c.groomParentsLabel}</span>
                <span className="kinship-names">{c.groomParents}</span>
              </div>
            </div>
          </div>

          {/* Central Sacred Knot / Weds Seal */}
          <div className="formal-weds-seal" aria-hidden="true">
            <span className="weds-knot-symbol">{c.wedsLigature}</span>
            <span className="weds-ampersand">&amp;</span>
            <span className="weds-knot-sub">{c.wedsSub}</span>
          </div>

          {/* Bride's Family Side */}
          <div className="family-column bride-column">
            <div className="family-side-tag">{c.brideSideTag}</div>
            <h3 className="family-person-name">{c.brideName}</h3>

            <div className="family-kinship-card">
              <div className="kinship-row">
                <span className="kinship-badge">{c.brideGrandparentsLabel}</span>
                <span className="kinship-names">{c.brideGrandparents}</span>
              </div>
              <div className="kinship-row">
                <span className="kinship-badge">{c.brideParentsLabel}</span>
                <span className="kinship-names">{c.brideParents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Details Grid */}
        <div className="formal-details-grid">
          <div className="formal-detail-item">
            <span className="formal-detail-label">
              <Calendar size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              {c.dateLabel}
            </span>
            <span className="formal-detail-val">{c.dateVal}</span>
          </div>

          <div className="formal-detail-item">
            <span className="formal-detail-label">
              <Clock size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              {c.timingsLabel}
            </span>
            <span className="formal-detail-val">{c.timingsVal}</span>
          </div>

          <div className="formal-detail-item">
            <span className="formal-detail-label">
              <MapPin size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              {c.venueLabel}
            </span>
            {formalCard.mapUrl ? (
              <a
                href={formalCard.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="formal-detail-val formal-detail-link"
                title="Open Srishti Resort & Club on Google Maps"
              >
                {c.venueVal} <span className="venue-map-badge">📍 {lang === "hi" ? "गूगल मैप देखें" : "View Map"}</span>
              </a>
            ) : (
              <span className="formal-detail-val">{c.venueVal}</span>
            )}
          </div>

          <div className="formal-detail-item formal-contacts-block">
            <span className="formal-detail-label">
              <Phone size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              {c.contactLabel}
            </span>
            <div className="formal-contacts-list">
              {formalCard.contacts && formalCard.contacts.length > 0 ? (
                formalCard.contacts.map((contact, i) => (
                  <a
                    key={i}
                    href={`tel:${contact.tel}`}
                    className="formal-contact-pill"
                    title={`Call ${contact.name} at ${contact.phone}`}
                  >
                    <span className="contact-name">{contact.name}</span>
                    <span className="contact-sep">·</span>
                    <span className="contact-phone">{contact.phone}</span>
                  </a>
                ))
              ) : null}
            </div>
          </div>
        </div>

        {/* Sacred Blessing Pill */}
        <div className="scripture-pill" style={{ margin: "2.4rem auto 0" }}>
          <div className="scripture-text">{c.blessingQuote}</div>
          <div className="scripture-citation">{c.blessingCitation}</div>
        </div>
      </div>
    </section>
  );
};
