"use client";

import React, { memo, useCallback, useEffect, useRef } from "react";
import MaskedHeading from "../MaskedHeading";
import FolderFloat from "../FolderFloat";
import ProcessSection from "../ProcessSection";
import ScrollExpand from "../ScrollExpand";
import Footer from "../Footer";
import ResumeSection from "../ResumeSection/ResumeSection";
import DriftingMist from "../DriftingMist";
import dynamic from "next/dynamic";
import { useContemplation } from "../../_utils/contemplation";
import "./IdeaSection.css";

const LightRays = dynamic(() => import("../Backgrounds/LightRays/LightRays"), { ssr: false });

interface IdeaSectionProps {
  scrollProgress?: number; // kept for back-compat, no longer driven per frame
  viewportW: number;
  viewportH: number;
  lowPerformance: boolean;
  effectsActive?: boolean;
  mountEffects: boolean;
  onContainerHeightChange?: (height: number) => void;
  onSectionOffsetsChange?: (offsets: { resume: number; contact: number }) => void;
  contentOpacity?: number;
}

const FOLDER_SPECS = [
  { label: "Tecnologia", value: "Matter.js para simular gravidade e colisões" },
  { label: "Interação", value: "Abra a pasta por toque ou cursor para consultar as notas" },
  { label: "Contexto", value: "Demonstração interativa desenvolvida para este portfólio" }
];

const FOLDER_ITEMS = [
  "Validar a tarefa principal",
  "Prototipar antes de ampliar",
  "Projetar para toque e teclado",
  "Escolher efeitos com propósito",
  "Testar antes de publicar",
  "Documentar o que foi entregue"
];

function IdeaSection({
  viewportW,
  viewportH,
  lowPerformance,
  effectsActive = false,
  mountEffects,
  onContainerHeightChange,
  onSectionOffsetsChange,
  contentOpacity = 1
}: IdeaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerTransitionRef = useRef<HTMLDivElement>(null);
  // Refs for direct DOM writes (skip React re-renders on scroll)
  const containerHRef = useRef(1700);
  const footerTransitionOffsetRef = useRef(0);
  const footerTransitionProgressRef = useRef(0);
  const isContemplating = useContemplation();

  const updateLayout = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const h = container.offsetHeight;
      containerHRef.current = h;
      onContainerHeightChange?.(h);
      const containerTop = container.getBoundingClientRect().top;
      if (footerTransitionRef.current) {
        footerTransitionOffsetRef.current =
          footerTransitionRef.current.getBoundingClientRect().top - containerTop;
      }
      const resume = container.querySelector<HTMLElement>("#curriculo");
      const contact = container.querySelector<HTMLElement>("#contato");
      if (resume && contact) {
        onSectionOffsetsChange?.({
          resume: resume.getBoundingClientRect().top - containerTop,
          contact: contact.getBoundingClientRect().top - containerTop,
        });
      }
    }
  }, [onContainerHeightChange, onSectionOffsetsChange]);

  useEffect(() => {
    updateLayout();
    const timer = setTimeout(updateLayout, 300);
    window.addEventListener("resize", updateLayout);

    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateLayout);
      ro.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLayout);
      ro?.disconnect();
    };
  }, [updateLayout]);

  // Event-driven rAF: reads scrollProgress on scroll, writes transforms directly
  useEffect(() => {
    if (!effectsActive) return;

    let rafId: number | null = null;
    const tick = () => {
      rafId = null;
      const layer = containerRef.current?.closest<HTMLElement>("[data-scroll-progress]");
      const sp = layer ? parseFloat(layer.dataset.scrollProgress ?? "0") : 0;
      const maxContentScroll = Math.max(0, containerHRef.current - viewportH);
      const contentTranslateY = sp * maxContentScroll;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(0, -${contentTranslateY}px, 0)`;
      }

      // Footer transition progress (low-frequency React state update with threshold)
      const ftp = Math.min(
        Math.max(
          (contentTranslateY - (footerTransitionOffsetRef.current - viewportH)) / Math.max(viewportH, 1),
          0
        ),
        1
      );
      footerTransitionProgressRef.current = ftp;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [viewportH, effectsActive]);

  // Adaptive folder dimensions
  const isMobile = viewportW < 768;
  const folderWidth = isMobile ? 200 : 230;
  const folderHeight = isMobile ? 145 : 160;
  const folderSpread = isMobile ? 150 : 200;

  return (
    <div className="idea-scene">
      {/* Pure Code Light Atmosphere Background */}
      <div className="idea__light-bg" aria-hidden="true" />

      {/* React Bits LightRays Volumetric Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {mountEffects && !lowPerformance && <LightRays
          raysOrigin="top-center"
          raysColor="#65a30d"
          lightMode={true}
          raysSpeed={0.5}
          lightSpread={1.4}
          rayLength={2.6}
          pulsating={true}
          saturation={1.2}
          followMouse={true}
          paused={!effectsActive}
        />}
      </div>

      {/* Soft Atmospheric Mist */}
      <DriftingMist opacity={0.16} speedMultiplier={0.9} />

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="idea__container"
        style={{
          opacity: isContemplating ? 0 : contentOpacity,
          transition: "opacity 0.5s ease",
          pointerEvents: isContemplating ? "none" : undefined,
        }}
      >
        {/* ====================================================
           1. TOP ZONE: project approach
           ==================================================== */}
        <section className="idea-block idea-block--concept">
          <div className="idea-block__index">
            <span className="idea-block__index-num">04</span>
            <span className="idea-block__index-line" aria-hidden="true" />
            <span className="idea-block__index-label">Abordagem</span>
          </div>

          <h2 className="idea-block__eyebrow">Planejamento antes da implementação</h2>

          <p className="idea-block__statement">
            Requisitos, prioridades e critérios de entrega são definidos antes do desenvolvimento para manter o projeto alinhado aos seus objetivos.
          </p>
        </section>

        {/* ====================================================
           2. MIDDLE ZONE: transition from project scope to delivery
           ==================================================== */}
        <section className="idea-block idea-block--heading">
          <div className="idea-block__heading-inner">
            <MaskedHeading
              text="DO ESCOPO À ENTREGA"
              mediaType="image"
              src={effectsActive ? "/images/texture_gold.webp" : ""}
              fillScale={1.25}
              parallax={26}
              reveal="rise"
              trigger="view"
              drift={0}
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
           3. BOTTOM ZONE: interactive physics experiment
           ==================================================== */}
        <section className="idea-block idea-block--folder">
          <div className="idea-folder-editorial">
            <div className="idea-folder-editorial__left">
              <div className="idea-block__index">
                <span className="idea-block__index-num">05</span>
                <span className="idea-block__index-line" aria-hidden="true" />
                <span className="idea-block__index-label">Experimento</span>
              </div>

              <h2 className="idea-block__eyebrow">Interação com física em tempo real</h2>

              <p className="idea-block__statement">
                Demonstração de uma interface interativa com simulação física feita em Matter.js.
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

            {/* Interactive Matter.js folder */}
            <div className="idea-folder-editorial__right">
              <div className="idea-folder-float-wrap">
                <FolderFloat
                  items={FOLDER_ITEMS}
                  label="Notas de Criação"
                  sublabel="6 diretrizes"
                  trigger={isMobile ? "click" : "hover"}
                  closeOnSelect={false}
                  physics={true}
                  drift={0.5}
                  folderColor="#cbd5e1"
                  frontColor="#e2e8f0"
                  paperColor="#ffffff"
                  itemColor="#ffffff"
                  itemTextColor="#0f172a"
                  labelColor="#0f172a"
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
           4. PROCESS & METHODOLOGY (3 Steps PixelSwap & Quick Booking)
           ==================================================== */}
        <ProcessSection mediaEnabled={effectsActive} />

        <div className="resume-visual-scene">
          <ResumeSection />
        </div>

        <div
          ref={footerTransitionRef}
          className="idea-resume-transition idea-resume-transition--footer"
          aria-label="Transição para o rodapé"
        >
          <ScrollExpand
            src={effectsActive ? "/images/scale_hero.webp" : ""}
            alt="Céu noturno sobre uma paisagem"
            startWidth={isMobile ? 78 : 54}
            startHeight={isMobile ? 62 : 58}
            startRadius={24}
            endRadius={0}
            mediaZoom={1.35}
            smoothing={0.1}
            overlayScrim={0.55}
            progressRef={footerTransitionProgressRef}
          >
            <Footer />
          </ScrollExpand>
        </div>
      </div>
    </div>
  );
}

export default memo(IdeaSection);
