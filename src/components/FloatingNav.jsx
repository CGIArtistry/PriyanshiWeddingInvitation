import React, { useState, useEffect } from "react";
import { ArrowUp, Calendar, Heart, Image, Mail, Sparkles, BookOpen, Clock } from "lucide-react";
import { weddingConfig } from "../config/weddingConfig";

export const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [lang, setLang] = useState("hi");

  const { couple } = weddingConfig;

  // Listen for language changes from other sections
  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && (e.detail === "hi" || e.detail === "en")) {
        setLang(e.detail);
      }
    };
    window.addEventListener("wedding-lang-change", handleSync);
    return () => window.removeEventListener("wedding-lang-change", handleSync);
  }, []);

  const handleToggleLang = (newLang) => {
    setLang(newLang);
    window.dispatchEvent(new CustomEvent("wedding-lang-change", { detail: newLang }));
  };

  // Scroll tracking: visibility, progress, and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Show floating dock after scrolling past initial hero
      setIsVisible(scrollY > 320);

      // Active section detection
      const sections = ["save-the-date", "story", "gallery", "invitation", "events", "rsvp"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.15) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    {
      id: "save-the-date",
      href: "#save-the-date",
      labelHi: "शुभ तिथि",
      labelEn: "Date",
      icon: <Calendar size={14} />,
    },
    {
      id: "story",
      href: "#story",
      labelHi: "हमारी कहानी",
      labelEn: "Story",
      icon: <BookOpen size={14} />,
    },
    {
      id: "gallery",
      href: "#gallery",
      labelHi: "तस्वीरें",
      labelEn: "Gallery",
      icon: <Image size={14} />,
    },
    {
      id: "invitation",
      href: "#invitation",
      labelHi: "निमंत्रण",
      labelEn: "Invitation",
      icon: <Mail size={14} />,
    },
    {
      id: "events",
      href: "#events",
      labelHi: "कार्यक्रम",
      labelEn: "Events",
      icon: <Clock size={14} />,
    },
    {
      id: "rsvp",
      href: "#rsvp",
      labelHi: "आशीर्वाद",
      labelEn: "RSVP",
      icon: <Heart size={14} />,
    },
  ];

  return (
    <>
      {/* 1. Golden Scroll Progress Line at Top of Window */}
      <div
        className="scroll-progress-line"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      {/* 2. Floating Luxury Navigation Capsule */}
      <header
        className={`floating-nav-dock ${isVisible ? "is-visible" : ""}`}
        aria-label="Floating Invitation Navigation"
      >
        <div className="floating-nav-capsule">
          {/* Couple Monogram Crest (Return to Top) */}
          <button
            type="button"
            className="nav-dock-monogram"
            onClick={scrollToTop}
            title={lang === "hi" ? "शीर्ष पर जाएं" : "Scroll to top"}
            aria-label="Scroll to top"
          >
            <span className="dock-monogram-initials">
              {couple.groom.firstName[0]}&amp;{couple.bride.firstName[0]}
            </span>
          </button>

          <span className="nav-dock-divider" aria-hidden="true" />

          {/* Quick Jump Anchors */}
          <nav className="nav-dock-links" aria-label="Section links">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const label = lang === "hi" ? item.labelHi : item.labelEn;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`nav-dock-link ${isActive ? "is-active" : ""}`}
                  title={label}
                >
                  <span className="dock-link-icon">{item.icon}</span>
                  <span className="dock-link-text">{label}</span>
                </a>
              );
            })}
          </nav>

          <span className="nav-dock-divider" aria-hidden="true" />

          {/* Global Synchronized Language Switcher */}
          <div className="nav-dock-lang-switch" role="group" aria-label="Switch Language">
            <button
              type="button"
              className={`dock-lang-btn ${lang === "hi" ? "is-active" : ""}`}
              onClick={() => handleToggleLang("hi")}
              title="सम्पूर्ण वेबसाइट हिन्दी में देखें"
            >
              हिन्दी
            </button>
            <button
              type="button"
              className={`dock-lang-btn ${lang === "en" ? "is-active" : ""}`}
              onClick={() => handleToggleLang("en")}
              title="View entire website in English"
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* 3. Smooth Floating Back to Top Button */}
      <button
        type="button"
        className={`floating-back-to-top ${isVisible ? "is-visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title={lang === "hi" ? "ऊपर जाएं" : "Back to top"}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
};
