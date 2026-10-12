import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "../config/weddingConfig";

export const AudioPlayer = ({ autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(weddingConfig.audio.src);
    audio.loop = true;
    audio.volume = weddingConfig.audio.defaultVolume || 0.5;
    audioRef.current = audio;

    const handleVisibility = () => {
      if (document.hidden && audio) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // When autoStart changes to true (after user clicks "Open Our Invitation")
  useEffect(() => {
    if (autoStart && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play prevented until direct interaction:", err);
        });
    }
  }, [autoStart]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio play error:", err));
    }
  };

  return (
    <button
      className={`floating-audio-pill ${isPlaying ? "" : "is-paused"}`}
      onClick={togglePlay}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}

      <div className="soundwave-bars" aria-hidden="true">
        <span className="soundwave-bar" />
        <span className="soundwave-bar" />
        <span className="soundwave-bar" />
        <span className="soundwave-bar" />
      </div>

      <span style={{ fontSize: "0.68rem" }}>
        {isPlaying ? "Music Playing" : "Music Paused"}
      </span>
    </button>
  );
};
