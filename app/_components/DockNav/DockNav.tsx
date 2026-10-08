'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import BranchedMenu, { type BranchedMenuItem, type BranchedMenuChild } from '../BranchedMenu';
import MorphSlider, { type MorphItem } from '../MorphSlider';
import SloshGauge from '../SloshGauge';
import { playClickSound } from '../../_utils/sound';
import './DockNav.css';

interface DockNavProps {
  scrollY: number;
  totalHeight: number;
  activeSceneId?: string;
  chapterOffsets?: Record<string, number>;
}

const PREVIEW_SLIDES: MorphItem[] = [
  {
    image: '/images/BACK1.png',
    caption: '01 // Início'
  },
  {
    image: '/images/BACK2.jpg',
    caption: '02 // Sobre'
  },
  {
    image: '/images/BACK3.jpg',
    caption: '03 // Projetos'
  },
  {
    image: '/images/BACK4.jpg',
    caption: '04 // Galeria'
  },
  {
    image: '/images/scale_hero.jpg',
    caption: '05 // Criação & Escala'
  }
];

const SCENE_NAMES: Record<string, string> = {
  hero: '01 // Início',
  about: '02 // Sobre',
  projects: '03 // Projetos',
  showcase: '04 // Galeria',
  idea: '05 // Criação',
  contact: '06 // Contato'
};

export default function DockNav({
  scrollY,
  totalHeight,
  activeSceneId = 'hero',
  chapterOffsets = {}
}: DockNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate live scroll percentage (0 to 100)
  const maxScroll = Math.max(
    1,
    totalHeight - (typeof window !== 'undefined' ? window.innerHeight : 900)
  );
  const scrollPercentage = Math.min(Math.max(Math.round((scrollY / maxScroll) * 100), 0), 100);

  // Close when clicking outside of the dock card
  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExpanded]);

  const handleToggleExpand = () => {
    playClickSound('tick');
    setIsExpanded(prev => !prev);
  };

  const handleGaugeChange = useCallback((newPercent: number) => {
    const targetY = (newPercent / 100) * maxScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, [maxScroll]);

  const handleItemSelect = (value: string, item: BranchedMenuChild | BranchedMenuItem) => {
    playClickSound('tick');
    if ('targetY' in item && typeof item.targetY === 'number') {
      window.scrollTo({ top: item.targetY, behavior: 'smooth' });
      setIsExpanded(false);
      return;
    }

    if (value === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSlide(0);
      setIsExpanded(false);
    } else if (value === 'about') {
      const target = chapterOffsets['about'] ?? 800;
      window.scrollTo({ top: target, behavior: 'smooth' });
      setActiveSlide(1);
      setIsExpanded(false);
    } else if (value === 'projects') {
      const target = chapterOffsets['projects'] ?? 2400;
      window.scrollTo({ top: target, behavior: 'smooth' });
      setActiveSlide(2);
      setIsExpanded(false);
    } else if (value === 'gallery') {
      const target = chapterOffsets['showcase'] ?? 4200;
      window.scrollTo({ top: target, behavior: 'smooth' });
      setActiveSlide(3);
      setIsExpanded(false);
    } else if (value === 'idea') {
      const target = chapterOffsets['idea'] ?? 6000;
      window.scrollTo({ top: target, behavior: 'smooth' });
      setActiveSlide(4);
      setIsExpanded(false);
    } else if (value === 'contact') {
      const target = chapterOffsets['contact'] ?? 9500;
      window.scrollTo({ top: target, behavior: 'smooth' });
      setIsExpanded(false);
    } else if (value === 'github') {
      window.open('https://github.com/DavidCSdO', '_blank');
    } else if (value === 'linkedin') {
      window.open('https://linkedin.com', '_blank');
    } else if (value === 'whatsapp') {
      window.open('https://wa.me/?text=Olá%20David,%20gostaria%20de%20conversar%20sobre%20um%20projeto.', '_blank');
    } else if (value === 'email') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('davidcsdo@gmail.com');
        playClickSound('chime');
      }
    }
  };

  const menuItems: BranchedMenuItem[] = [
    {
      label: 'Capítulos',
      children: [
        {
          value: 'hero',
          label: '01 Início',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          )
        },
        {
          value: 'about',
          label: '02 Sobre',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          )
        },
        {
          value: 'projects',
          label: '03 Projetos',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          )
        },
        {
          value: 'gallery',
          label: '04 Galeria',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )
        },
        {
          value: 'idea',
          label: '05 Criação',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )
        },
        {
          value: 'contact',
          label: '06 Contato',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          )
        }
      ]
    },
    {
      label: 'Conexões',
      children: [
        {
          value: 'github',
          label: 'GitHub ↗',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          )
        },
        {
          value: 'linkedin',
          label: 'LinkedIn ↗',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          )
        },
        {
          value: 'whatsapp',
          label: 'WhatsApp ↗',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          )
        },
        {
          value: 'email',
          label: 'Copiar E-mail',
          icon: (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )
        }
      ]
    }
  ];

  const currentChapterLabel = SCENE_NAMES[activeSceneId] ?? '01 // Início';

  return (
    <div className="dock-island-root">
      {!isExpanded ? (
        /* 1. Resting Compact Pill */
        <button
          type="button"
          onClick={handleToggleExpand}
          className="dock-island-pill"
          aria-label="Expandir dock de navegação"
        >
          <span className="dock-island-pill__dot" aria-hidden="true" />
          <span className="dock-island-pill__title">{currentChapterLabel}</span>
          <span className="dock-island-pill__divider" aria-hidden="true" />
          <span className="dock-island-pill__gauge">{scrollPercentage}%</span>
          <span className="dock-island-pill__action">
            <span>ÍNDICE</span>
            <span aria-hidden="true">↑</span>
          </span>
        </button>
      ) : (
        /* 2. Expanded Floating Dock (Zero Screen Blackout) */
        <div ref={cardRef} className="dock-island-card" role="navigation" aria-label="Navegação do Portfólio">
          {/* Header */}
          <div className="dock-island-card__header">
            <div className="dock-island-card__meta">
              <span className="dock-island-pill__dot" aria-hidden="true" />
              <span className="dock-island-card__tag">Índice Geral • David Cardoso</span>
            </div>
            <button
              type="button"
              onClick={handleToggleExpand}
              className="dock-island-card__collapse-btn"
              aria-label="Recolher menu"
            >
              <span>Recolher</span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>

          {/* Three-Column Stage */}
          <div className="dock-island-stage">
            {/* Col 1: Branched Menu */}
            <div className="dock-island-col--menu">
              <BranchedMenu
                items={menuItems}
                defaultOpen={[0]}
                onSelect={handleItemSelect}
                color="#f0f2f5"
                accentColor="#d4af37"
                lineColor="rgba(255, 255, 255, 0.15)"
                width={230}
                rowHeight={30}
                indent={34}
                fontSize={12}
              />
            </div>

            {/* Col 2: Morph Slider */}
            <div className="dock-island-col--slider">
              <MorphSlider
                items={PREVIEW_SLIDES}
                startIndex={activeSlide}
                transition="melt"
                duration={1.0}
                intensity={0.45}
                radius={16}
                showCaptions={true}
                showControls={true}
                showIndicators={true}
              />
            </div>

            {/* Col 3: Slosh Gauge */}
            <div className="dock-island-col--gauge">
              <SloshGauge
                value={scrollPercentage}
                onChange={handleGaugeChange}
                interactive={true}
                liquidColor="#f5f5f5"
                glassColor="#1a1c22"
                width={76}
                height={190}
                radius={20}
                ticks={4}
                unit="%"
                ariaLabel="Nível de rolagem da página"
              />
              <span className="dock-island-gauge-caption">
                Nível de<br />Rolagem
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
