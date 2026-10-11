'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { playClickSound } from '../../_utils/sound';
import './DockNav.css';

interface DockNavProps {
  scrollY: number;
  totalHeight: number;
  activeSceneId?: string;
  chapterOffsets?: Record<string, number>;
  /** Hides the dock (e.g. while Contemplation Mode is active) */
  hidden?: boolean;
}

export interface ChapterItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  image: string;
}

const CHAPTERS: ChapterItem[] = [
  {
    id: 'hero',
    num: '01',
    title: 'Início',
    subtitle: 'Alvorada & Identidade Autoral',
    image: '/images/BACK1.png',
  },
  {
    id: 'about',
    num: '02',
    title: 'Sobre',
    subtitle: 'Filosofia, Rigor & Construção',
    image: '/images/landscape_about.jpg',
  },
  {
    id: 'projects',
    num: '03',
    title: 'Projetos',
    subtitle: 'Sistemas Interativos & WebGL',
    image: '/images/landscape_projects.jpg',
  },
  {
    id: 'showcase',
    num: '04',
    title: 'Capacidades',
    subtitle: 'Arquitetura Full-Stack & Métricas',
    image: '/images/landscape_showcase.jpg',
  },
  {
    id: 'idea',
    num: '05',
    title: 'Contato',
    subtitle: 'Conceito, Criação & Parcerias',
    image: '/images/landscape_idea.jpg',
  },
];

export default function DockNav({
  scrollY,
  totalHeight,
  activeSceneId = 'hero',
  chapterOffsets = {},
  hidden = false,
}: DockNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Compute live scroll percentage (0% to 100%)
  const maxScroll = Math.max(
    1,
    totalHeight - (typeof window !== 'undefined' ? window.innerHeight : 900)
  );
  const scrollPercentage = Math.min(Math.max(Math.round((scrollY / maxScroll) * 100), 0), 100);

  // Current active chapter index
  const activeChapterIndex = useMemo(() => {
    const idx = CHAPTERS.findIndex(
      (c) => c.id === activeSceneId || (c.id === 'idea' && activeSceneId === 'contact')
    );
    return idx >= 0 ? idx : 0;
  }, [activeSceneId]);

  const [previewIndex, setPreviewIndex] = useState(activeChapterIndex);

  // Synchronize previewIndex when activeChapterIndex changes (if not hovering another)
  useEffect(() => {
    setPreviewIndex(activeChapterIndex);
  }, [activeChapterIndex]);

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
    try {
      playClickSound('tick');
    } catch {}
    setIsExpanded((prev) => !prev);
  };

  const getOffsetForChapter = (id: string) => {
    switch (id) {
      case 'hero':
        return 0;
      case 'about':
        return chapterOffsets.about || 800;
      case 'projects':
        return chapterOffsets.projects || 2200;
      case 'showcase':
        return chapterOffsets.showcase || 3600;
      case 'idea':
        return chapterOffsets.contact || 5000;
      default:
        return 0;
    }
  };

  const handleNavigate = (id: string) => {
    try {
      playClickSound('tick');
    } catch {}
    setIsExpanded(false);
    const targetOffset = getOffsetForChapter(id);
    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth',
    });
  };

  const handleSocialClick = (type: string) => {
    try {
      playClickSound('tick');
    } catch {}
    if (type === 'schedule') {
      const text = encodeURIComponent('Olá David, vi seu portfólio e gostaria de agendar uma conversa sobre um projeto.');
      window.open(`https://wa.me/?text=${text}`, '_blank');
    } else if (type === 'github') {
      window.open('https://github.com/DavidCSdO', '_blank');
    } else if (type === 'linkedin') {
      window.open('https://linkedin.com', '_blank');
    } else if (type === 'whatsapp') {
      window.open('https://wa.me/?text=Olá%20David,%20gostaria%20de%20conversar%20sobre%20um%20projeto.', '_blank');
    } else if (type === 'email') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('davidcsdo@gmail.com');
      }
    }
  };

  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];
  const activePreview = CHAPTERS[previewIndex] || currentChapter;

  return (
    <div
      className={`dock-nav-root ${hidden ? 'dock-nav-root--hidden' : ''}`.trim()}
      aria-hidden={hidden || undefined}
    >
      <div className="dock-nav-intro">
      {!isExpanded ? (
        /* 1. Minimized Resting Pill (Contemporary Floating Island) */
        <button
          type="button"
          onClick={handleToggleExpand}
          className="dock-nav-pill"
          aria-label="Expandir índice e navegação"
          title="Abrir índice de navegação"
        >
          <span className="dock-nav-pill__dot" aria-hidden="true" />
          <span className="dock-nav-pill__chapter">
            {currentChapter.num} {currentChapter.title}
          </span>
          <span className="dock-nav-pill__separator" aria-hidden="true">·</span>
          <span className="dock-nav-pill__gauge">{scrollPercentage}%</span>
          <span className="dock-nav-pill__action">
            <span>ÍNDICE</span>
            <span className="dock-nav-pill__arrow" aria-hidden="true">↑</span>
          </span>
        </button>
      ) : (
        /* 2. Expanded Navigation Card with Image Previews */
        <div
          ref={cardRef}
          className="dock-nav-card"
          role="navigation"
          aria-label="Navegação e pré-visualização de capítulos"
        >
          {/* Card Header */}
          <div className="dock-nav-card__header">
            <div className="dock-nav-card__meta">
              <span className="dock-nav-pill__dot" aria-hidden="true" />
              <span className="dock-nav-card__tag">Índice Geral · David Cardoso</span>
            </div>
            <button
              type="button"
              onClick={handleToggleExpand}
              className="dock-nav-card__close-btn"
              aria-label="Recolher navegação"
            >
              <span>Recolher</span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>

          {/* Two-Column Stage */}
          <div className="dock-nav-stage">
            {/* Left Column: Chapters & Social Links */}
            <div className="dock-nav-stage__menu">
              <div className="dock-nav-section-title">Capítulos</div>
              <ul className="dock-nav-list" role="list">
                {CHAPTERS.map((item, index) => {
                  const isCurrent = activeChapterIndex === index;
                  const isHovered = previewIndex === index;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`dock-nav-list__btn ${
                          isCurrent ? 'dock-nav-list__btn--current' : ''
                        } ${isHovered ? 'dock-nav-list__btn--hovered' : ''}`}
                        onClick={() => handleNavigate(item.id)}
                        onMouseEnter={() => setPreviewIndex(index)}
                      >
                        <span className="dock-nav-list__num">{item.num}</span>
                        <span className="dock-nav-list__label">{item.title}</span>
                        {isCurrent && <span className="dock-nav-list__indicator" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Conexões */}
              <div className="dock-nav-section-title dock-nav-section-title--socials">
                Conexões
              </div>
              <div className="dock-nav-socials">
                <button
                  type="button"
                  className="dock-nav-social-btn dock-nav-social-btn--featured"
                  onClick={() => handleSocialClick('schedule')}
                >
                  ✦ Agendar Conversa
                </button>
                <button
                  type="button"
                  className="dock-nav-social-btn"
                  onClick={() => handleSocialClick('github')}
                >
                  GitHub ↗
                </button>
                <button
                  type="button"
                  className="dock-nav-social-btn"
                  onClick={() => handleSocialClick('linkedin')}
                >
                  LinkedIn ↗
                </button>
                <button
                  type="button"
                  className="dock-nav-social-btn"
                  onClick={() => handleSocialClick('whatsapp')}
                >
                  WhatsApp ↗
                </button>
                <button
                  type="button"
                  className="dock-nav-social-btn"
                  onClick={() => handleSocialClick('email')}
                >
                  Copiar E-mail
                </button>
              </div>
            </div>

            {/* Right Column: Dynamic Landscape Image Preview */}
            <div className="dock-nav-stage__preview">
              <div
                className="dock-nav-preview-box"
                onClick={() => handleNavigate(activePreview.id)}
                role="button"
                tabIndex={0}
                aria-label={`Ir para ${activePreview.title}`}
                title={`Clique para ir direto a ${activePreview.title}`}
              >
                <Image
                  key={activePreview.image}
                  src={activePreview.image}
                  alt={activePreview.title}
                  fill
                  priority={false}
                  sizes="(max-width: 900px) 100vw, 420px"
                  className="dock-nav-preview-img"
                />
                <div className="dock-nav-preview-overlay" />

                {/* Caption Badge */}
                <div className="dock-nav-preview-caption">
                  <span className="dock-nav-preview-tag">
                    {activePreview.num} · {activePreview.title}
                  </span>
                  <span className="dock-nav-preview-sub">
                    {activePreview.subtitle}
                  </span>
                </div>

                {/* Direct Jump Arrow */}
                <div className="dock-nav-preview-jump" aria-hidden="true">
                  <span>Explorar</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
