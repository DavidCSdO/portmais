'use client';

import React, { useEffect, useState } from 'react';
import { playClickSound } from '../../_utils/sound';
import { setContemplating, useContemplation } from '../../_utils/contemplation';
import './NatureSpotlight.css';

export interface LandscapeInfo {
  id: string;
  name: string;
  region: string;
  country: string;
  elevation?: string;
  description: string;
}

export const LANDSCAPE_DATA: Record<string, LandscapeInfo> = {
  hero: {
    id: 'hero',
    name: 'Falésias de Seceda',
    region: 'Dolomitas',
    country: 'Itália',
    elevation: '2.519 m',
    description: 'Picos afiados de calcário que se erguem verticalmente sobre vales verdes alpinos, capturando a primeira luz dourada da alvorada.',
  },
  about: {
    id: 'about',
    name: 'Vale Glacial de Kluane',
    region: 'Território de Yukon',
    country: 'Canadá',
    elevation: '1.980 m',
    description: 'Vastidão alpina subártica onde campos de gelo ancestrais encontram florestas de coníferas sob o silêncio do norte.',
  },
  projects: {
    id: 'projects',
    name: 'O Quiraing e o Mar de Névoa',
    region: 'Ilha de Skye',
    country: 'Escócia',
    elevation: '543 m',
    description: 'Encostas basálticas dramáticas esculpidas pelo vento e pelas marés atlânticas, cobertas por brumas matinais em constante movimento.',
  },
  showcase: {
    id: 'showcase',
    name: 'Taiga Boreal de Oulanka',
    region: 'Lapônia',
    country: 'Finlândia',
    elevation: '380 m',
    description: 'Floresta ancestral de pinheiros e abetos árticos, envolta em bruma gélida e iluminada por tons suaves do crepúsculo polar.',
  },
  idea: {
    id: 'idea',
    name: 'Weisshorn Acima das Nuvens',
    region: 'Alpes Peninos',
    country: 'Suíça',
    elevation: '4.506 m',
    description: 'Uma pirâmide solitária de rocha e neve emergindo acima de um mar compacto de nuvens de inversão térmica.',
  },
};

interface NatureSpotlightProps {
  sceneId: 'hero' | 'about' | 'projects' | 'showcase' | 'idea';
  position?: 'top-right' | 'top-left' | 'bottom-right';
  className?: string;
  onToggleContemplation?: (active: boolean) => void;
}

export default function NatureSpotlight({
  sceneId,
  position = 'top-right',
  className = '',
  onToggleContemplation,
}: NatureSpotlightProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isContemplating = useContemplation();

  const data = LANDSCAPE_DATA[sceneId];
  if (!data) return null;

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      playClickSound('tick');
    } catch {}
    setIsOpen(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      playClickSound('tick');
    } catch {}
    setIsOpen(false);
  };

  const handleToggleContemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      playClickSound('chime');
    } catch {}
    const nextState = !isContemplating;
    setContemplating(nextState);
    setIsOpen(false);
    onToggleContemplation?.(nextState);
  };

  return (
    <>
      {/* Discreet, Luxury Floating Trigger Pill */}
      <div className={`spotlight-anchor spotlight-anchor--${position} ${className}`.trim()}>
        <button
          type="button"
          onClick={handleOpen}
          className="spotlight-pill"
          aria-label={`Ver informações do cenário: ${data.name}`}
        >
          <span className="spotlight-pill__icon" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="12 8 8 12 12 16 16 12 12 8" fill="currentColor" opacity="0.7" />
            </svg>
          </span>
          <span className="spotlight-pill__label">{data.name}</span>
        </button>

        {/* Refined Minimalist Modal Card */}
        {isOpen && (
          <div
            className="spotlight-card"
            role="dialog"
            aria-modal="true"
            aria-label={data.name}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="spotlight-card__header">
              <div className="spotlight-card__badge">
                <span className="spotlight-card__badge-dot" />
                <span>Cenário 4K</span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="spotlight-card__close"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="spotlight-card__body">
              <h3 className="spotlight-card__title">{data.name}</h3>
              <p className="spotlight-card__location">
                {data.region} · {data.country} {data.elevation && <span className="spotlight-card__elevation">{data.elevation}</span>}
              </p>

              <p className="spotlight-card__desc">{data.description}</p>

              <button
                type="button"
                onClick={handleToggleContemplate}
                className="spotlight-card__action"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Contemplar Paisagem</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Single, global exit pill for Contemplation Mode.
 * Must be rendered OUTSIDE the transformed scene layers so `position: fixed`
 * is relative to the viewport and it stacks above the DockNav.
 */
export function ContemplationExitPill() {
  const isContemplating = useContemplation();

  useEffect(() => {
    if (!isContemplating) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContemplating(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isContemplating]);

  if (!isContemplating) return null;

  const handleExit = () => {
    try {
      playClickSound('chime');
    } catch {}
    setContemplating(false);
  };

  return (
    <button
      type="button"
      className="spotlight-exit-pill"
      onClick={handleExit}
      aria-label="Sair do modo contemplação"
    >
      <span className="spotlight-exit-pill__dot" />
      <span>Modo Paisagem · Clique para voltar aos textos</span>
      <span className="spotlight-exit-pill__close" aria-hidden="true">✕</span>
    </button>
  );
}
