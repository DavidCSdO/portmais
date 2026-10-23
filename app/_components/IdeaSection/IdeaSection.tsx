"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import GradientASCII from "../GradientASCII";
import MaskedHeading from "../MaskedHeading";
import FolderFloat from "../FolderFloat";
import ProcessSection from "../ProcessSection";
import ScrollExpand from "../ScrollExpand";
import Footer from "../Footer";
import ResumeSection from "../ResumeSection/ResumeSection";
import DriftingMist from "../DriftingMist";
import { LightRays } from "../Backgrounds";
import { useContemplation } from "../../_utils/contemplation";
import "./IdeaSection.css";

interface IdeaSectionProps {
  scrollProgress: number; // 0 to 1
  viewportW: number;
  viewportH: number;
  lowPerformance: boolean;
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
  scrollProgress,
  viewportW,
  viewportH,
  lowPerformance,
  onContainerHeightChange,
  onSectionOffsetsChange,
  contentOpacity = 1
}: IdeaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeExperienceRef = useRef<HTMLDivElement>(null);
  const resumeTransitionRef = useRef<HTMLDivElement>(null);
  const footerTransitionRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(1700);
  const [resumeTransitionOffset, setResumeTransitionOffset] = useState(0);
  const [footerTransitionOffset, setFooterTransitionOffset] = useState(0);
  const [isResumeBackgroundVisible, setIsResumeBackgroundVisible] = useState(false);
  const isContemplating = useContemplation();

  useEffect(() => {
    const section = resumeExperienceRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsResumeBackgroundVisible(entry.isIntersecting),
      { rootMargin: "500px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const container = containerRef.current;
      if (container) {
        const h = container.offsetHeight;
        setContainerH(h);
        onContainerHeightChange?.(h);
        const containerTop = container.getBoundingClientRect().top;
        if (resumeTransitionRef.current) {
          setResumeTransitionOffset(
            resumeTransitionRef.current.getBoundingClientRect().top - containerTop
          );
        }
        if (footerTransitionRef.current) {
          setFooterTransitionOffset(
            footerTransitionRef.current.getBoundingClientRect().top - containerTop
          );
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
  }, [onContainerHeightChange, onSectionOffsetsChange]);

  // Content scroll translation: exactly containerH - viewportH so footer aligns flush at the bottom
  const maxContentScroll = Math.max(0, containerH - viewportH);
  const contentTranslateY = scrollProgress * maxContentScroll;
  const resumeTransitionHeight = Math.max(viewportH * 0.22, 1);
  const resumeTransitionProgress = Math.min(
    Math.max(
      (contentTranslateY - (resumeTransitionOffset - viewportH)) /
        Math.max(viewportH + resumeTransitionHeight, 1),
      0
    ),
    1
  );
  const resumeLogoProgress = Math.min(resumeTransitionProgress / 0.86, 1);
  const resumeLogoScale = 0.38 + resumeLogoProgress * 1.9;
  const resumeLogoOpacity =
    resumeLogoProgress < 0.48
      ? 0.9
      : Math.max(0, 0.9 * (1 - (resumeLogoProgress - 0.48) / 0.52));
  const footerTransitionProgress = Math.min(
    Math.max(
      (contentTranslateY - (footerTransitionOffset - viewportH)) / Math.max(viewportH, 1),
      0
    ),
    1
  );

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
        {!lowPerformance && <LightRays
          raysOrigin="top-center"
          raysColor="#65a30d"
          lightMode={true}
          raysSpeed={0.5}
          lightSpread={1.4}
          rayLength={2.6}
          pulsating={true}
          saturation={1.2}
          followMouse={true}
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
          transform: `translate3d(0, -${contentTranslateY}px, 0)`,
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
              src="/images/texture_gold.webp"
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
        <ProcessSection />

        <div ref={resumeExperienceRef} className="resume-visual-scene">
          <div className="resume-visual-scene__background" aria-hidden="true">
            {isResumeBackgroundVisible && !lowPerformance && (
              <GradientASCII
                colors={["#142a45", "#1e3fd8", "#68b9ec", "#a5d8ff"]}
                shape="horizon"
                characters=" =+xX0S8#@"
                cellSize={18}
                density={0.8}
                glyphOpacity={0.68}
                glow={0.12}
                depthOfField={0}
                flicker={0.2}
                softness={0.5}
                scale={1}
                flow={0.5}
                speed={1}
                gradientOpacity={0.72}
                grain={0.05}
                variation={0}
                mouseInteraction
                scrambleRadius={0.1}
                clickEffect="wave"
                intro
                lightMode={false}
              />
            )}
          </div>

          <div
            ref={resumeTransitionRef}
            className="idea-resume-transition idea-resume-transition--resume"
            aria-label="Transição para o currículo"
          >
            <div className="resume-transition__curtain" aria-hidden="true">
              <div
                className="resume-transition__logo"
                style={{
                  opacity: resumeLogoOpacity,
                  transform: `translate(-50%, -50%) scale(${resumeLogoScale})`,
                }}
              >
                <Image
                  src="/images/LOGO.webp"
                  alt=""
                  width={500}
                  height={500}
                  aria-hidden="true"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <ResumeSection />
        </div>

        <div
          ref={footerTransitionRef}
          className="idea-resume-transition idea-resume-transition--footer"
          aria-label="Transição para o rodapé"
        >
          <ScrollExpand
            src="/images/scale_hero.webp"
            alt="Céu noturno sobre uma paisagem"
            startWidth={isMobile ? 78 : 54}
            startHeight={isMobile ? 62 : 58}
            startRadius={24}
            endRadius={0}
            mediaZoom={1.35}
            smoothing={0.1}
            overlayScrim={0.55}
            progress={footerTransitionProgress}
          >
            <Footer />
          </ScrollExpand>
        </div>
      </div>
    </div>
  );
}

export default memo(IdeaSection);
