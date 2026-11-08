'use client';

import React, { useState } from 'react';
import SplitFlapText from '../SplitFlapText';
import { toggleAudio, playClickSound } from '../../_utils/sound';
import './Footer.css';

interface FooterProps {
  onScrollToTop?: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const email = 'cardosodavid92@gmail.com';

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
            <span className="footer-label">08 · Diálogo & Conexão</span>
            <div className="footer-split-flap-wrapper">
              <SplitFlapText
                words={["TEM UMA IDEIA?", "VAMOS CONVERSAR"]}
                flipDuration={0.12}
                stagger={0.06}
                cycleDelay={2600}
                charset="alphanumeric"
                flipsPerChar={8}
                tileColor="#111827"
                textColor="#f8fafc"
                tileRadius={8}
                gap={5}
                fontSize={32}
                loop
                padTo={15}
                className="footer-intro-split-flap"
              />
            </div>
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
                href="https://www.linkedin.com/in/david-cardoso-659239215/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://wa.me/5524992622909?text=Olá%20David,%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                WhatsApp ↗
              </a>
            </div>
          </div>
        </div>

        {/* ====================================================
           2. MONUMENTAL "DAVID" BRAND
           ==================================================== */}
        <div className="footer-brand-stage" aria-hidden="true">
          <span className="footer-brand-word">DAVID</span>
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
