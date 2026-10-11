'use client';

import React from 'react';
import './DriftingMist.css';

interface DriftingMistProps {
  className?: string;
  speedMultiplier?: number;
  opacity?: number;
}

export default function DriftingMist({
  className = '',
  speedMultiplier = 1,
  opacity = 0.45
}: DriftingMistProps) {
  return (
    <div
      className={`drifting-mist-container ${className}`.trim()}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Layer 1: Low-altitude heavy rolling fog */}
      <div
        className="drifting-mist-layer drifting-mist-layer--primary"
        style={{ animationDuration: `${52 / speedMultiplier}s` }}
      />

      {/* Layer 2: Mid-altitude lighter mist drifting in reverse */}
      <div
        className="drifting-mist-layer drifting-mist-layer--secondary"
        style={{ animationDuration: `${68 / speedMultiplier}s` }}
      />
    </div>
  );
}
