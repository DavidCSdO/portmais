'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import { playClickSound } from '../../_utils/sound';
import './Hero.css';

interface HeroProps {
  onExplore?: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const handleLetterHover = () => {
    playClickSound('tick');
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__backdrop" aria-hidden="true">
        <Image
          src="/images/hero_editorial_sky_2x.webp"
          alt=""
          fill
          sizes="108vw"
          className="hero__backdrop-image"
          quality={60}
        />
      </div>
      <div className="hero__sky" aria-hidden="true" />

      <div className="hero__title-wrapper">
        <h1 className="hero__title" aria-label="DAVID">
          {['D', 'A', 'V', 'I', 'D'].map((char, index) => (
            <span
              key={index}
              className="hero__char"
              style={{ '--char-index': index } as CSSProperties}
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

      <div className="hero__mountain-layer" aria-hidden="true">
        <Image
          src="/images/BACK1.webp"
          alt=""
          width={2560}
          height={1082}
          sizes="(max-width: 600px) 165vh, 120vw"
          className="hero__mountain"
          quality={65}
          fetchPriority="high"
        />
      </div>

      <header className="hero__header">
        <div className="hero__brand-stamp">
          <Image
            src="/images/LOGO.webp"
            alt=""
            width={40}
            height={27}
            sizes="40px"
            className="hero__brand-mark"
          />
          <div className="hero__brand-meta">
            <span className="hero__brand-title">DAVID CARDOSO</span>
            <span className="hero__brand-sub">SITES E SISTEMAS WEB</span>
          </div>
        </div>
      </header>

      <footer className="hero__footer">
        {onExplore && (
          <button
            type="button"
            onClick={onExplore}
            className="hero__scroll-cue"
            aria-label="Rolar para explorar a jornada"
          >
            <span className="hero__scroll-cue-line" aria-hidden="true" />
            <span className="hero__scroll-cue-text">EXPLORAR PORTFÓLIO</span>
          </button>
        )}
      </footer>

      <div className="hero__curtain" aria-hidden="true" />
    </section>
  );
}
