"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

export function ConfettiEffect() {
  useEffect(() => {
    const end = Date.now() + 3000;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
}
