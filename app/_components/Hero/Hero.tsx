'use client';

import React, { useEffect, useState } from 'react';
import DriftingMist from '../DriftingMist';
import { Aurora } from '../Backgrounds';
import { playClickSound } from '../../_utils/sound';
import './Hero.css';

interface HeroProps {
  onExplore?: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle mouse parallax for cinematic, living depth
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleLetterHover = () => {
    playClickSound('tick');
  };

  return (
    <section className="hero" id="hero">
      {/* 1. Pure Code ReactBits Aurora Light Horizon */}
      <div
        className="hero__sky-backdrop"
        style={{
          transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -5}px, 0) scale(1.02)`,
        }}
        aria-hidden="true"
      >
        <Aurora
          colorStops={['#38bdf8', '#0ea5e9', '#10b981', '#6366f1', '#a855f7']}
          amplitude={1.15}
          blend={0.55}
          speed={0.55}
          glow={0.65}
          brightness={1.1}
          opacity={0.65}
          lightMode={true}
        />
        {/* Subtle luminous light grade */}
        <div className="hero__sky-overlay" />
      </div>

      {/* 2. Atmospheric Solar Aura */}
      <div
        className="hero__dawn-aura"
        style={{
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -10}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* 3. Monumental Brand Emblem Watermark: The 4-Pointed Star & Astrolabe Celestial Rings */}
      <div
        className="hero__brand-emblem"
        style={{
          transform: `translate3d(calc(-50% + ${mousePos.x * 5}px), calc(-50% + ${mousePos.y * 3}px), 0)`,
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 500" className="hero__brand-emblem-svg">
          {/* Orbital Celestial Rings */}
          <circle cx="250" cy="250" r="210" className="hero__emblem-ring hero__emblem-ring--outer" />
          <circle cx="250" cy="250" r="160" className="hero__emblem-ring hero__emblem-ring--mid" />
          <circle cx="250" cy="250" r="105" className="hero__emblem-ring hero__emblem-ring--inner" />

          {/* Compass Alignment Axes */}
          <line x1="250" y1="20" x2="250" y2="480" className="hero__emblem-axis" />
          <line x1="20" y1="250" x2="480" y2="250" className="hero__emblem-axis" />

          {/* Diagonal Astrolabe Ticks */}
          <line x1="100" y1="100" x2="120" y2="120" className="hero__emblem-tick" />
          <line x1="400" y1="100" x2="380" y2="120" className="hero__emblem-tick" />
          <line x1="100" y1="400" x2="120" y2="380" className="hero__emblem-tick" />
          <line x1="400" y1="400" x2="380" y2="380" className="hero__emblem-tick" />

          {/* Iconic 4-Pointed Star Brand Contour (Matching LOGO.png) */}
          <path
            d="M 250 50
               Q 250 250 50 250
               Q 250 250 250 450
               Q 250 250 450 250
               Q 250 250 250 50 Z"
            className="hero__emblem-star"
          />
        </svg>
      </div>

      {/* 4. Soft valley mist drifting across mountain base */}
      <DriftingMist opacity={0.3} speedMultiplier={0.9} />

      {/* 5. Editorial Header: Brand Monogram (Left) */}
      <header className="hero__header">
        {/* Striking Brand Monogram */}
        <div className="hero__brand-stamp">
          <span className="hero__brand-star" aria-hidden="true">✦</span>
          <div className="hero__brand-meta">
            <span className="hero__brand-title">DAVID CARDOSO</span>
            <span className="hero__brand-sub">STUDIO AUTORAL</span>
          </div>
        </div>
      </header>

      {/* 6. Center Title "DAVID" — Crisp Luxury Calligraphy with subtle Mouse Parallax */}
      <div
        className="hero__title-wrapper"
        style={{
          transform: `translate3d(${Math.round(mousePos.x * 12)}px, ${Math.round(mousePos.y * 6)}px, 0)`,
        }}
      >
        <div className="hero__eyebrow" aria-hidden="true">
          <span className="hero__eyebrow-line" />
          <span className="hero__eyebrow-text">ENGENHARIA & DESIGN SENSORIAL</span>
          <span className="hero__eyebrow-line" />
        </div>

        <h1 className="hero__title" aria-label="DAVID">
          {['D', 'A', 'V', 'I', 'D'].map((char, index) => (
            <span
              key={index}
              className="hero__char"
              style={{ '--char-index': index } as React.CSSProperties}
              onMouseEnter={handleLetterHover}
            >
              <span className="hero__char-stroke" aria-hidden="true">
                {char}
              </span>
              <span className="hero__char-fill" aria-hidden="true">
                {char}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* 7. Luminous horizon mist and ambient light depth */}
      <div className="hero__horizon-glow" aria-hidden="true" />

      {/* 8. Discreet, High-Fashion Scroll Cue at Bottom Right */}
      <footer className="hero__footer">
        {onExplore && (
          <button
            type="button"
            onClick={onExplore}
            className="hero__scroll-cue"
            aria-label="Rolar para explorar a jornada"
          >
            <span className="hero__scroll-cue-line" aria-hidden="true" />
            <span className="hero__scroll-cue-text">EXPLORAR</span>
          </button>
        )}
      </footer>

      {/* 9. Opening transition curtain */}
      <div className="hero__curtain" aria-hidden="true" />
    </section>
  );
}
