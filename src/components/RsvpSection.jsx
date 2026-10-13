import React, { useState } from "react";
import { Send, Heart, Phone } from "lucide-react";
import { weddingConfig } from "../config/weddingConfig";

export const RsvpSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "attending",
    guests: "1",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    setSubmitted(true);
  };

  const { contacts } = weddingConfig;

  return (
    <section className="section-wrap" id="rsvp">
      <div className="rsvp-shell">
        <div className="section-intro">
          <div className="label-badge">Warm Wishes &amp; RSVP</div>
          <h2 className="main-heading">Send Your Blessings</h2>
          <p className="rsvp-note">
            Your love, presence, and blessings mean the world to us
          </p>
        </div>

        {submitted ? (
          <div className="rsvp-success">
            <Heart size={36} color="#b68d40" style={{ margin: "0 auto 1rem", display: "block" }} />
            <p>
              Thank you, <strong>{formData.name}</strong>!
              <br />
              Your warm wishes and RSVP have been received with love.
            </p>
          </div>
        ) : (
          <form className="rsvp-form-grid" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="guest-name">Your Full Name</label>
              <input
                id="guest-name"
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="field-group">
              <label htmlFor="guest-attendance">Will you join us?</label>
              <select
                id="guest-attendance"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
              >
                <option value="attending">Joyfully Attending</option>
                <option value="unable">Regretfully Unable to Attend</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="guest-count">Number of Guests</label>
              <select
                id="guest-count"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4+ Family</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="guest-msg">Your Blessings &amp; Message for the Couple</label>
              <textarea
                id="guest-msg"
                rows={3}
                placeholder="Leave a blessing or note for Abhishek & Priyanshi..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button className="submit-cta" type="submit">
              <Send size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
              Send Blessings &amp; RSVP
            </button>
          </form>
        )}

        {/* Direct Contact & RSVP Helpline Badges */}
        <div className="rsvp-contact-helpline">
          <div className="rsvp-helpline-title">
            <Phone size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
            Contact &amp; RSVP
          </div>
          <div className="rsvp-contact-cards">
            {contacts && contacts.map((c, idx) => (
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
