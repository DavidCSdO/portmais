'use client';

import React, { useState } from 'react';
import TechText from '../TechText';
import { toggleAudio, playClickSound, getAudioState } from '../../_utils/sound';
import './Footer.css';

interface FooterProps {
  onScrollToTop?: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [fps, setFps] = useState(60);
  const email = 'davidcsdo@gmail.com';

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      setIsTouch(isCoarse || window.innerWidth < 768);
      setSoundActive(getAudioState());

      // Live FPS calculation for technical performance specs
      let frameCount = 0;
      let lastTime = performance.now();
      let animId: number;

      const calcFps = (now: number) => {
        frameCount++;
        if (now - lastTime >= 1000) {
          const currentFps = Math.min(Math.round((frameCount * 1000) / (now - lastTime)), 120);
          setFps(currentFps);
          frameCount = 0;
          lastTime = now;
        }
        animId = requestAnimationFrame(calcFps);
      };
      animId = requestAnimationFrame(calcFps);
      return () => cancelAnimationFrame(animId);
    }
  }, []);

  const handleToggleAudio = () => {
    const nextState = toggleAudio();
    setSoundActive(nextState);
    if (nextState) {
      playClickSound('chime');
    }
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      playClickSound('chime');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    playClickSound('tick');
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section" id="contato">
      <div className="footer-wrapper">
        {/* ====================================================
           1. TOP INFORMATION ROW
           ==================================================== */}
        <div className="footer-top">
          <div className="footer-top__intro">
            <h2 className="footer-heading">
              Do conceito à execução técnica.<br />
              Vamos construir algo <em>extraordinário</em>.
            </h2>
          </div>

          <div className="footer-top__contact">
            <span className="footer-label">Contato Direto</span>
            <div className="footer-email-wrap">
              <a
                href={`mailto:${email}`}
                className="footer-email"
                title="Enviar e-mail para David"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`footer-copy-btn ${copied ? 'footer-copy-btn--copied' : ''}`}
                title="Copiar e-mail"
                aria-live="polite"
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            <div className="footer-socials">
              <a
                href="https://github.com/DavidCSdO"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://wa.me/?text=Olá%20David,%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                WhatsApp ↗
              </a>
            </div>
          </div>

          <div className="footer-top__meta">
            <span className="footer-label">Localização & Specs</span>
            <div className="footer-meta-text">
              <p className="footer-meta-line">
                São Paulo, Brasil • 23°33′S 46°38′W
              </p>
              <p className="footer-meta-line">
                Next.js 16 • React 19 • Canvas & WebGL
              </p>
              <div className="footer-fps-badge">
                <span className="footer-fps-dot" aria-hidden="true" />
                <span>{fps} FPS // TAXA NATIVA</span>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
           2. MONUMENTAL "DAVID" (React Bits TechText — Exato Anexo com Fonte do Hero)
           ==================================================== */}
        <div className="footer-brand-stage" data-cursor-text={isTouch ? undefined : "ARRASTAR"}>
          <TechText
            text="DAVID"
            fontWeight={400}
            fontSize={320}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={16}
            fontFamily="'Delamoore', serif"
            color="#ffffff"
            accentColor="#ffffff"
            letterSpacing={0.01}
            reach={220}
            softness={0.7}
            strokeWidth={1.8}
            speed={1}
            lineStyle="dashed"
            selection={true}
            labels={true}
            draggable={!isTouch}
            sweep={false}
            verticalAlign="center"
            fitToWidth={true}
          />
        </div>

        {/* ====================================================
           3. BOTTOM COPYRIGHT & BACK TO TOP BAR
           ==================================================== */}
        <div className="footer-bottom-bar">
          <span className="footer-cr">
            © {new Date().getFullYear()} David Cardoso. Todos os direitos reservados.
          </span>

          <div className="footer-bottom-actions">
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`footer-audio-btn ${soundActive ? 'footer-audio-btn--on' : ''}`}
              title="Ativar/desativar feedback sonoro"
              aria-label="Controle de áudio tátil"
            >
              <span className="footer-audio-dot" aria-hidden="true" />
              <span>SOM: {soundActive ? 'LIGADO' : 'MUDO'}</span>
            </button>

            <button
              type="button"
              onClick={handleScrollTop}
              className="footer-back-top"
            >
              <span>Voltar ao topo</span>
              <span className="footer-back-top__arrow" aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
