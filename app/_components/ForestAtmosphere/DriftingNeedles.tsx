'use client';

import React from 'react';

interface NeedleSpec {
  left: string;
  duration: string;
  delay: string;
  tumbleDuration: string;
  scale: number;
  opacity: number;
  type: 'single' | 'pair' | 'cluster';
}

const NEEDLES: NeedleSpec[] = [
  { left: '12%', duration: '24s', delay: '-7s', tumbleDuration: '7s', scale: 0.85, opacity: 0.22, type: 'pair' },
  { left: '28%', duration: '28s', delay: '-18s', tumbleDuration: '9s', scale: 0.65, opacity: 0.18, type: 'single' },
  { left: '44%', duration: '22s', delay: '-3s', tumbleDuration: '6.5s', scale: 0.95, opacity: 0.25, type: 'cluster' },
  { left: '62%', duration: '26s', delay: '-14s', tumbleDuration: '8s', scale: 0.75, opacity: 0.2, type: 'pair' },
  { left: '78%', duration: '30s', delay: '-9s', tumbleDuration: '10s', scale: 0.7, opacity: 0.17, type: 'single' },
  { left: '91%', duration: '25s', delay: '-21s', tumbleDuration: '7.5s', scale: 0.8, opacity: 0.23, type: 'single' },
  { left: '5%', duration: '27s', delay: '-12s', tumbleDuration: '8.5s', scale: 0.6, opacity: 0.15, type: 'single' },
];

export default function DriftingNeedles({
  className = '',
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`drifting-needles-layer ${className}`.trim()}
      style={{ opacity }}
      aria-hidden="true"
    >
      {NEEDLES.map((needle, idx) => (
        <div
          key={idx}
          className="drifting-needle-track"
          style={{
            left: needle.left,
            animationDuration: needle.duration,
            animationDelay: needle.delay,
            opacity: needle.opacity,
          }}
        >
          <div
            className="drifting-needle-body"
            style={{
              animationDuration: needle.tumbleDuration,
              transform: `scale(${needle.scale})`,
            }}
          >
            {needle.type === 'single' ? (
              <svg width="22" height="6" viewBox="0 0 22 6" fill="none">
                {/* Slender curved pine needle */}
                <path
                  d="M 1,1 C 8,5 15,4 21,2"
                  stroke="rgba(190, 215, 200, 0.85)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            ) : needle.type === 'pair' ? (
              <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
                {/* Twin conifer needle joined at fascicle base */}
                <path
                  d="M 1,6 C 8,1 18,2 25,5"
                  stroke="rgba(180, 210, 195, 0.85)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 1,6 C 9,10 17,11 24,8"
                  stroke="rgba(165, 200, 185, 0.8)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <circle cx="1.5" cy="6" r="1.2" fill="rgba(140, 170, 155, 0.9)" />
              </svg>
            ) : (
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                {/* Tiny cedar scale sprig */}
                <path
                  d="M 2,7 L 22,7"
                  stroke="rgba(185, 215, 200, 0.75)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 7,7 L 11,2 M 12,7 L 16,2 M 17,7 L 21,3"
                  stroke="rgba(175, 205, 190, 0.7)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M 7,7 L 11,12 M 12,7 L 16,12 M 17,7 L 21,11"
                  stroke="rgba(175, 205, 190, 0.7)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
