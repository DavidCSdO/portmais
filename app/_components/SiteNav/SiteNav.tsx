'use client';

import React from 'react';
import { playClickSound } from '../../_utils/sound';
import './SiteNav.css';

export interface SiteNavProps {
  activeSceneId: string;
  chapterOffsets: {
    about: number;
    projects: number;
    showcase: number;
    idea: number;
    contact: number;
  };
}

export default function SiteNav({ activeSceneId, chapterOffsets }: SiteNavProps) {
  const navItems = [
    { id: 'hero', label: 'Início', offset: 0 },
    { id: 'about', label: 'Sobre', offset: chapterOffsets.about },
    { id: 'projects', label: 'Projetos', offset: chapterOffsets.projects },
    { id: 'showcase', label: 'Capacidades', offset: chapterOffsets.showcase },
    { id: 'contact', label: 'Contato', offset: chapterOffsets.contact },
  ];

  const handleNavClick = (offset: number) => {
    try {
      playClickSound('tick');
    } catch {
      // Sound playback is optional
    }
    window.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="site-nav" aria-label="Navegação principal">
      <div className="site-nav__pill">
        {navItems.map((item) => {
          const isActive =
            activeSceneId === item.id ||
            (item.id === 'contact' && activeSceneId === 'idea');

          return (
            <button
              key={item.id}
              type="button"
              className={`site-nav__link ${isActive ? 'site-nav__link--active' : ''}`}
              onClick={() => handleNavClick(item.offset)}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
              {isActive && <span className="site-nav__indicator" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
