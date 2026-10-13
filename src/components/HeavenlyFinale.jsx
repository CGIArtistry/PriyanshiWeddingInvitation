import React from "react";
import { FinaleCanvas } from "./canvases/FinaleCanvas";
import { weddingConfig } from "../config/weddingConfig";
import { ArrowUp } from "lucide-react";

export const HeavenlyFinale = () => {
  const { closing, couple, weddingDate } = weddingConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="heavenly-finale" id="finale">
        <FinaleCanvas />

        <div className="heavenly-content">
          <div className="heavenly-eyebrow">{closing.eyebrow}</div>

          <div className="heavenly-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <p className="heavenly-message">
            {closing.message}
          </p>

          <div className="heavenly-names">
            <span>{couple.groom.firstName}</span>
            <span className="ampersand">&amp;</span>
            <span>{couple.bride.firstName}</span>
          </div>

          <div className="heavenly-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <p className="heavenly-quote">{closing.quote}</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>{closing.footerCompliments}</p>
        <strong>
          {couple.hashtag} · {weddingDate.displayDay} {weddingDate.displayMonth} {weddingDate.displayYear}
        </strong>
      </footer>
    </>
  );
};
