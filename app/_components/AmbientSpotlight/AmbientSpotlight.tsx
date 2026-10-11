'use client';

import React, { useEffect, useRef, useState } from 'react';
import './AmbientSpotlight.css';

export default function AmbientSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -1000, y: -1000 });
  const target = useRef({ x: -1000, y: -1000 });
  const [isActive, setIsActive] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only activate on devices with mouse/fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!isActive) setIsActive(true);
    };

    const onMouseLeave = () => {
      setIsActive(false);
      target.current.x = -1000;
      target.current.y = -1000;
    };

    const onMouseEnter = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      setIsActive(true);
    };

    const updatePosition = () => {
      // Smooth lerp follow (0.09 factor gives swift yet fluid organic physics)
      pos.current.x += (target.current.x - pos.current.x) * 0.09;
      pos.current.y += (target.current.y - pos.current.y) * 0.09;

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--spot-x', `${pos.current.x.toFixed(1)}px`);
        spotlightRef.current.style.setProperty('--spot-y', `${pos.current.y.toFixed(1)}px`);
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isActive]);

  return (
    <div
      ref={spotlightRef}
      className={`ambient-spotlight ${isActive ? 'ambient-spotlight--active' : ''}`}
      aria-hidden="true"
    />
  );
}
