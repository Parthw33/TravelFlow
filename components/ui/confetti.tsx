"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

const Confetti = () => {
  useEffect(() => {
    // Function to trigger the confetti effect
    const triggerConfetti = () => {
      const duration = 4000; // Duration of the effect
      const end = Date.now() + duration;

      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
        }
        confetti({
          particleCount: 10,
          angle: Math.random() * 360,
          spread: Math.random() * 100 + 50,
          origin: {
            x: Math.random(),
            y: Math.random(),
          },
          colors: ["#ff00ff", "#00ffff", "#ff6600", "#ff0000", "#0000ff"],
        });
      }, 200); // Confetti bursts every 200ms
    };

    // Trigger the confetti on component mount
    triggerConfetti();
  }, []);

  return null; // No UI component to render, it just triggers confetti
};

export default Confetti;
