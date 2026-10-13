import React, { useState, useEffect } from "react";
import { Send, Heart, Phone, Sparkles } from "lucide-react";
import { weddingConfig } from "../config/weddingConfig";

export const RsvpSection = () => {
  const [lang, setLang] = useState("hi");
  const [formData, setFormData] = useState({
    name: "",
    attendance: "attending",
    guests: "1",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && (e.detail === "hi" || e.detail === "en")) {
        setLang(e.detail);
      }
    };
    window.addEventListener("wedding-lang-change", handleSync);
    return () => window.removeEventListener("wedding-lang-change", handleSync);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    setSubmitted(true);
  };

  const { contacts } = weddingConfig;

  const t = {
    hi: {
      badge: "शुभकामनाएं एवं उपस्थिति",
      title: "वर-वधू को आशीर्वाद प्रेषित करें",
      note: "आपकी गरिमामयी उपस्थिति, स्नेह एवं मंगल आशीर्वाद हमारे लिए अनमोल हैं",
      nameLabel: "आपका शुभ नाम",
      namePlaceholder: "अपना नाम दर्ज करें...",
      attendanceLabel: "समारोह में उपस्थिति",
      attendingOption: "आनंदपूर्वक अवश्य पधारेंगे (Joyfully Attending)",
      unableOption: "हार्दिक शुभकामनाएं (Regretfully Unable)",
      guestsLabel: "सम्मिलित होने वाले सदस्य",
      guest1: "1 व्यक्ति (1 Person)",
      guest2: "2 व्यक्ति (2 Persons)",
      guest3: "3 व्यक्ति (3 Persons)",
      guest4: "4+ सपरिवार (Family)",
      messageLabel: "अभिषेक एवं प्रियंशी के लिए मंगल आशीष व संदेश",
      messagePlaceholder: "वर-वधू के लिए शुभकामना संदेश लिखें...",
      submitBtn: "आशीर्वाद संदेश भेजें",
      thankTitle: "हार्दिक धन्यवाद",
      thankMessage: "आपका स्नेहिल आशीर्वाद एवं उपस्थिति संदेश हमें प्राप्त हो गया है।",
      helplineTitle: "सम्पर्क एवं दर्शनाभिलाषी",
    },
    en: {
      badge: "Warm Wishes & RSVP",
      title: "Send Your Blessings",
      note: "Your love, presence, and blessings mean the world to us",
      nameLabel: "Your Full Name",
      namePlaceholder: "Enter your full name...",
      attendanceLabel: "Will you join us?",
      attendingOption: "Joyfully Attending",
      unableOption: "Regretfully Unable to Attend",
      guestsLabel: "Number of Guests",
      guest1: "1 Person",
      guest2: "2 Persons",
      guest3: "3 Persons",
      guest4: "4+ Family",
      messageLabel: "Your Blessings & Message for the Couple",
      messagePlaceholder: "Leave a warm blessing for Abhishek & Priyanshi...",
      submitBtn: "Send Blessings & RSVP",
      thankTitle: "Thank You",
      thankMessage: "Your warm wishes and RSVP have been received with love.",
      helplineTitle: "Contact & RSVP Helplines",
    },
  }[lang] || {};

  return (
    <section
      className={`section-wrap ${lang === "hi" ? "is-hindi-version" : "is-english-version"}`}
      id="rsvp"
      lang={lang}
    >
      <div className="rsvp-shell">
        <div className="section-intro">
          <div className="label-badge">
            {lang === "hi" ? <span className="hindi-badge-text">{t.badge}</span> : t.badge}
          </div>
          <h2 className="main-heading">{t.title}</h2>
          <p className="rsvp-note">{t.note}</p>
        </div>

        {submitted ? (
          <div className="rsvp-success">
            <Heart size={40} color="#b68d40" style={{ margin: "0 auto 1rem", display: "block" }} />
            <h3>{t.thankTitle}, <strong>{formData.name}</strong>!</h3>
            <p>{t.thankMessage}</p>
          </div>
        ) : (
          <form className="rsvp-form-grid" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="guest-name">{t.nameLabel}</label>
              <input
                id="guest-name"
                type="text"
                required
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="field-group">
              <label htmlFor="guest-attendance">{t.attendanceLabel}</label>
              <select
                id="guest-attendance"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
              >
                <option value="attending">{t.attendingOption}</option>
                <option value="unable">{t.unableOption}</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="guest-count">{t.guestsLabel}</label>
              <select
                id="guest-count"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              >
                <option value="1">{t.guest1}</option>
                <option value="2">{t.guest2}</option>
                <option value="3">{t.guest3}</option>
                <option value="4">{t.guest4}</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="guest-msg">{t.messageLabel}</label>
              <textarea
                id="guest-msg"
                rows={3}
                placeholder={t.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button className="submit-cta" type="submit">
              <Send size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
              {t.submitBtn}
            </button>
          </form>
        )}

        {/* Direct Contact & RSVP Helpline Badges */}
        <div className="rsvp-contact-helpline">
          <div className="rsvp-helpline-title">
            <Phone size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
            {t.helplineTitle}
          </div>
          <div className="rsvp-contact-cards">
            {contacts &&
              contacts.map((c, idx) => (
                <a
                  key={idx}
                  href={`tel:${c.tel}`}
                  className="rsvp-contact-chip"
                  title={`Call ${c.name} (${c.phone})`}
                >
                  <span className="rsvp-contact-name">{c.name}</span>
                  <span className="rsvp-contact-phone">{c.phone}</span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
