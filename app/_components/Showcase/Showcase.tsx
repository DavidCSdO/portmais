"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AccordionGallery, { AccordionItem } from "../AccordionGallery";
import "./Showcase.css";

const SHOWCASE_ITEMS: AccordionItem[] = [
  { image: "/images/car11.png", label: "Sanchez No. 1", link: "#", alt: "Sanchez No. 1 Astrolábio" },
  { image: "/images/car12.png", label: "Aurélien", link: "#", alt: "Aurélien Automatic" },
  { image: "/images/car13.png", label: "Perfeição Mecânica", link: "#", alt: "Perfeição Mecânica" },
  { image: "/images/car17.png", label: "Fintech Core", link: "#", alt: "Fintech Dashboard" },
  { image: "/images/car112.png", label: "Porto Mais", link: "#", alt: "Porto Mais Platform" }
];

interface ShowcaseProps {
  scrollProgress: number; // 0 to 1
  viewportW: number;
  viewportH: number;
  onContainerHeightChange?: (height: number) => void;
  contentOpacity?: number;
}

export default function Showcase({
  scrollProgress,
  viewportW,
  viewportH,
  onContainerHeightChange,
  contentOpacity = 1
}: ShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(1100);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const h = containerRef.current.offsetHeight;
        setContainerH(h);
        onContainerHeightChange?.(h);
      }
    };

    updateHeight();
    const timer = setTimeout(updateHeight, 300);
    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHeight);
    };
  }, [onContainerHeightChange]);

  // BACK4.jpg is 735 x 490 (aspect ratio 735/490 = 1.5)
  // Ensure background covers full screen with zero black bars and smooth vertical parallax
  const imgAspect = 735 / 490;
  let bgRenderedW = viewportW;
  let bgRenderedH = viewportW / imgAspect;
  if (bgRenderedH < viewportH * 1.35) {
    bgRenderedH = viewportH * 1.35;
    bgRenderedW = bgRenderedH * imgAspect;
  }
  const maxBgScrollY = Math.max(0, bgRenderedH - viewportH);
  const bgTranslateX = -Math.max(0, (bgRenderedW - viewportW) / 2);
  const bgTranslateY = scrollProgress * maxBgScrollY;

  // Content scroll translation
  const maxContentScroll = Math.max(0, containerH - viewportH + 90);
  const contentTranslateY = scrollProgress * maxContentScroll;

  return (
    <div className="showcase-scene">
      {/* Background Track: BACK4.jpg (Misty pine forest) */}
      <div
        className="showcase__bg-track"
        style={{
          width: `${bgRenderedW}px`,
          height: `${bgRenderedH}px`,
          transform: `translate3d(${bgTranslateX}px, -${bgTranslateY}px, 0)`
        }}
      >
        <Image
          src="/images/BACK4.jpg"
          alt="Floresta de pinheiros com névoa - BACK4"
          fill
          priority={false}
          className="showcase__bg-img"
          sizes="100vw"
        />
        <div className="showcase__bg-overlay" aria-hidden="true" />
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="showcase__container"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, -${contentTranslateY}px, 0)`
        }}
      >
        {/* Star Clearance Spacer */}
        <div className="showcase__star-spacer" />

        {/* Section Header */}
        <div className="showcase__header">
          <div className="showcase__badge">
            <span className="showcase__badge-dot" />
            <span className="showcase__badge-text">DEMONSTRATIVO DE PROJETOS</span>
          </div>

          <h2 className="showcase__title">SELEÇÃO EM DESTAQUE</h2>
          <p className="showcase__subtitle">
            Passe o mouse sobre os painéis para expandir e explorar a atmosfera de cada criação.
          </p>
        </div>

        {/* Accordion Gallery Component */}
        <div className="showcase__gallery-wrapper">
          <AccordionGallery
            items={SHOWCASE_ITEMS}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#ffffff"
            overlayColor="#060010"
            textColor="#ffffff"
            grayscale
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={460}
            gap={10}
            radius={16}
            orientation="horizontal"
          />
        </div>

        {/* Bottom subtle note */}

      </div>
    </div>
  );
}
