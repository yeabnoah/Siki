"use client";

import { useEffect, useRef } from "react";

export function Spotlight() {
  return (
    <>
      {/* Dark overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-20 bg-black/40"
      />

      {/* Multiple diagonal light beams */}
      <div
        className="pointer-events-none fixed inset-0 z-25"
        style={{
          background: `
            linear-gradient(145deg, 
              transparent 0%,
              rgba(255, 255, 255, 0.04) 15%,
              rgba(255, 255, 255, 0.02) 25%,
              transparent 40%
            ),
            linear-gradient(135deg,
              transparent 20%,
              rgba(255, 255, 255, 0.03) 35%,
              transparent 50%
            ),
            linear-gradient(165deg,
              transparent 10%,
              rgba(255, 255, 255, 0.02) 30%,
              transparent 60%
            )
          `
        }}
      />
    </>
  );
}
