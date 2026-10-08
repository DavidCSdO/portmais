"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MaskedHeading from "../MaskedHeading";
import FolderFloat from "../FolderFloat";
import ScrollExpand from "../ScrollExpand";
import Footer from "../Footer";
import "./IdeaSection.css";

interface IdeaSectionProps {
  scrollProgress: number; // 0 to 1
  viewportW: number;
  viewportH: number;
  onContainerHeightChange?: (height: number) => void;
  contentOpacity?: number;
}

const CONCEPT_SPECS = [
  { label: "Fase", value: "01 / Ideação, pesquisa e prototipagem viva" },
  { label: "Método", value: "Código limpo, arquitetura escalável e física em tempo real" },
  { label: "Foco", value: "Interfaces que unem sensibilidade estética e alto desempenho" },
  { label: "Status", value: "Em constante evolução e refinamento — 2026" }
];

const FOLDER_SPECS = [
  { label: "Física", value: "Simulação de gravidade e inércia em 60 FPS com Matter.js" },
  { label: "Princípios", value: "Menos cliques, mais impacto e arquitetura fluida" },
  { label: "Interação", value: "Passe o cursor ou toque na pasta para abrir e soltar as notas" }
];

const FOLDER_ITEMS = [
  "✨ Menos cliques, mais impacto",
  "⚡ 60 FPS & Física real",
  "🎯 Foco total na experiência",
  "📐 Arquitetura escalável",
  "💎 Cada detalhe importa",
  "🚀 Do protótipo à produção"
];

export default function IdeaSection({
  scrollProgress,
  viewportW,
  viewportH,
  onContainerHeightChange,
  contentOpacity = 1
}: IdeaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(1700);

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

    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        updateHeight();
      });
      ro.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHeight);
      ro?.disconnect();
    };
  }, [onContainerHeightChange]);

  // BACK5.jpg is 1080 x 1920 (aspect ratio 1080/1920 = 0.5625)
  // Ensure background covers full screen with zero black bars and smooth vertical parallax
  const imgAspect = 1080 / 1920;
  let bgRenderedW = viewportW;
  let bgRenderedH = viewportW / imgAspect;
  if (bgRenderedH < viewportH * 1.55) {
    bgRenderedH = viewportH * 1.55;
    bgRenderedW = bgRenderedH * imgAspect;
  }
  const maxBgScrollY = Math.max(0, bgRenderedH - viewportH);
  const bgTranslateX = -Math.max(0, (bgRenderedW - viewportW) / 2);
  const bgTranslateY = scrollProgress * maxBgScrollY;

  // Content scroll translation: exactly containerH - viewportH so footer aligns flush at the bottom
  const maxContentScroll = Math.max(0, containerH - viewportH);
  const contentTranslateY = scrollProgress * maxContentScroll;

  // Adaptive folder dimensions
  const isMobile = viewportW < 768;
  const folderWidth = isMobile ? 200 : 230;
  const folderHeight = isMobile ? 145 : 160;
  const folderSpread = isMobile ? 150 : 200;

  // ScrollExpand progress driven by page scroll when entering the expand section
  const expandProgress = Math.min(Math.max((scrollProgress - 0.48) / 0.42, 0), 1);

  return (
    <div className="idea-scene">
      {/* Background Track: BACK5.jpg (Misty pine forest) */}
      <div
        className="idea__bg-track"
        style={{
          width: `${bgRenderedW}px`,
          height: `${bgRenderedH}px`,
          transform: `translate3d(${bgTranslateX}px, -${bgTranslateY}px, 0)`
        }}
      >
        <Image
          src="/images/BACK5.jpg"
          alt="Floresta de pinheiros e névoa - BACK5"
          fill
          priority={false}
          className="idea__bg-img"
          sizes="100vw"
        />
        <div className="idea__bg-overlay" aria-hidden="true" />
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="idea__container"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, -${contentTranslateY}px, 0)`
        }}
      >
        {/* ====================================================
           1. TOP ZONE: Minimalist Editorial Concept (estilo Anexo 4)
           ==================================================== */}
        <section className="idea-block idea-block--concept">
          <div className="idea-block__index">
            <span className="idea-block__index-num">03</span>
            <span className="idea-block__index-line" aria-hidden="true" />
            <span className="idea-block__index-label">Conceito</span>
          </div>

          <h2 className="idea-block__eyebrow">A Faísca do Invisível</h2>

          <p className="idea-block__statement">
            Tudo começa no abstrato. <em>E ganha vida no detalhe.</em>
          </p>

          <dl className="idea-block__specs">
            {CONCEPT_SPECS.map(row => (
              <div key={row.label} className="idea-block__row">
                <dt className="idea-block__row-label">{row.label}</dt>
                <dd className="idea-block__row-value">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ====================================================
           2. MIDDLE ZONE: MaskedHeading "TUDO COMEÇA COM UMA IDEIA"
           ==================================================== */}
        <section className="idea-block idea-block--heading">
          <div className="idea-block__heading-inner">
            <MaskedHeading
              text="TUDO COMEÇA COM UMA IDEIA"
              mediaType="image"
              src="/images/texture_gold.jpg"
              fillScale={1.25}
              parallax={26}
              reveal="rise"
              trigger="view"
              drift={18}
              brightness={1.12}
              saturation={1.1}
              grayscale={false}
              duration={1.2}
              stagger={0.09}
              align="center"
              weight={800}
              tracking={0.04}
              lineHeight={1.15}
              textScale={isMobile ? 0.088 : 0.075}
            />
          </div>
        </section>

        {/* ====================================================
           3. BOTTOM ZONE: Minimalist Editorial Folder Section (estilo Anexo 4)
           ==================================================== */}
        <section className="idea-block idea-block--folder">
          <div className="idea-folder-editorial">
            <div className="idea-folder-editorial__left">
              <div className="idea-block__index">
                <span className="idea-block__index-num">04</span>
                <span className="idea-block__index-line" aria-hidden="true" />
                <span className="idea-block__index-label">Iteração</span>
              </div>

              <h2 className="idea-block__eyebrow">Caderno de Criação</h2>

              <p className="idea-block__statement">
                A lapidação contínua <em>de cada decisão.</em>
              </p>

              <dl className="idea-block__specs">
                {FOLDER_SPECS.map(row => (
                  <div key={row.label} className="idea-block__row">
                    <dt className="idea-block__row-label">{row.label}</dt>
                    <dd className="idea-block__row-value">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* FolderFloat: minimalista, sobre a floresta, sem caixas pesadas */}
            <div className="idea-folder-editorial__right">
              <div className="idea-folder-float-wrap">
                <FolderFloat
                  items={FOLDER_ITEMS}
                  label="Notas de Criação"
                  sublabel="6 diretrizes"
                  trigger="hover"
                  closeOnSelect={false}
                  physics={true}
                  drift={0.5}
                  folderColor="#27272a"
                  frontColor="#3f3f46"
                  paperColor="#f8fafc"
                  itemColor="#ffffff"
                  itemTextColor="#0f172a"
                  labelColor="#f4f4f5"
                  width={folderWidth}
                  height={folderHeight}
                  radius={14}
                  spread={folderSpread}
                  lift={30}
                  tilt={9}
                  flapAngle={34}
                  restAngle={16}
                  openDuration={520}
                  stagger={45}
                  bounce={0.35}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
           4. EXPAND ZONE & FOOTER: ScrollExpand com Footer Completo
           ==================================================== */}
        <section className="idea-block idea-block--expand" id="contato">
          <div className="idea-block__header">
            <div className="idea-block__index">
              <span className="idea-block__index-num">05</span>
              <span className="idea-block__index-line" aria-hidden="true" />
              <span className="idea-block__index-label">Visão & Precisão</span>
            </div>

            <h2 className="idea-block__eyebrow">Engenharia Sem Fronteiras</h2>

            <p className="idea-block__statement">
              Do conceito ao código. <em>O palco completo para a experiência.</em>
            </p>
          </div>

          <div className="idea-expand-stage">
            <ScrollExpand
              src="/images/scale_hero.jpg"
              alt="Visão & Precisão"
              title="Visão & Precisão"
              scrollHint="Role para expandir"
              startWidth={isMobile ? 82 : 54}
              startHeight={isMobile ? 65 : 56}
              startRadius={24}
              endRadius={0}
              mediaZoom={1.3}
              scrollDistance={1.2}
              holdDistance={0.35}
              smoothing={0.1}
              overlayScrim={0.65}
              enabled
              progress={expandProgress}
              useWindowScroll={true}
            >
              <Footer />
            </ScrollExpand>
          </div>
        </section>
      </div>
    </div>
  );
}
