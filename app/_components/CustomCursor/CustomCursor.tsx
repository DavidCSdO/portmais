'use client';

import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);
  const hoverTarget = useRef<Element | null>(null);
  const hoverText = useRef<string | null>(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined') return;
    const isTouchOrSmall =
      window.innerWidth <= 900 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (isTouchOrSmall || !isFinePointer) {
      return;
    }

    const render = () => {
      rafId.current = null;
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (
        Math.abs(mousePos.current.x - ringPos.current.x) > 0.5 ||
        Math.abs(mousePos.current.y - ringPos.current.y) > 0.5
      ) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, [data-cursor], .folder-card, .canvas-interactive'
        );
        const customTextAttr =
          target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') ?? null;

        if (hoverTarget.current !== interactive || hoverText.current !== customTextAttr) {
          hoverTarget.current = interactive;
          hoverText.current = customTextAttr;
          setCursorText(customTextAttr);
          setIsHovered(Boolean(customTextAttr || interactive));
        }
      }

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onTouchStart = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`custom-cursor-root ${isHovered ? 'is-hover' : ''} ${cursorText ? 'has-text' : ''}`}>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring">
        {cursorText && <span className="custom-cursor-label">{cursorText}</span>}
      </div>
    </div>
  );
}
