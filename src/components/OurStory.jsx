import React from "react";
import { weddingConfig } from "../config/weddingConfig";

export const OurStory = () => {
  const { story, couple } = weddingConfig;

  return (
    <section className="promise-section" id="story">
      <div className="promise-container">
        {/* Overlapping Polaroid Frames Stage */}
        <div className="photo-stage">
          <div className="interactive-photo">
            <img
              src={story.photo1.src}
              alt={story.photo1.alt}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="interactive-photo">
            <img
              src={story.photo2.src}
              alt={story.photo2.alt}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Monogram Stamp Overlay */}
          <div className="promise-stamp">{couple.monogram}</div>
        </div>

        {/* Editorial Story Content */}
        <div className="promise-content">
          <div className="label-badge">{story.eyebrow}</div>
          <h2 className="promise-heading">{story.title}</h2>

          <div className="quote-block">{story.quote}</div>

          <ul className="bulleted-story">
            {story.milestones.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <p className="story-close">
            {story.closingMessage}
            <br />
            <strong>A lifetime of promises made and promises kept.</strong>
          </p>

          <a className="promise-highlight-btn" href="#gallery">
            Explore Photo Gallery
          </a>
        </div>
      </div>
    </section>
  );
};
