"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { playClickSound } from "../../_utils/sound";
import { useContemplation } from "../../_utils/contemplation";
import "./Showcase.css";

const LineWaves = dynamic(() => import("../Backgrounds/LineWaves"), { ssr: false });

interface ShowcaseProps {
  scrollProgress?: number; // kept for back-compat, no longer driven per frame
  viewportH: number;
  viewportW: number;
  lowPerformance: boolean;
  effectsActive: boolean;
  mountEffects: boolean;
  onContainerHeightChange?: (height: number) => void;
  contentOpacity?: number;
}

const SPECS: { label: string; value: string }[] = [
  { label: "Entrega", value: "Sites, aplicações e sistemas web" },
  { label: "Tecnologias", value: "Next.js, React, TypeScript, Java e SQL" },
  { label: "Etapas", value: "Definição de escopo, desenvolvimento e publicação" },
  { label: "Atendimento", value: "Alinhamento e acompanhamento direto" },
  { label: "Disponibilidade", value: "Novos projetos em 2026" },
];

interface CapabilityItem {
  number: string;
  title: string;
  stack: string;
  description: string;
  details?: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    number: "01",
    title: "Sites e sistemas web sob medida",
    stack: "Next.js · React · TypeScript",
    description:
      "Sites e aplicações web para apresentar serviços e facilitar as tarefas dos usuários.",
    details:
      "Estrutura e recursos são definidos pelo objetivo do projeto, com atenção a responsividade, acessibilidade e manutenção.",
  },
  {
    number: "02",
    title: "Back-end, APIs e bancos de dados",
    stack: "Java · Spring Boot · SQL · REST APIs",
    description:
      "APIs e bancos de dados conectam interfaces, informações e regras de negócio.",
    details:
      "Autenticação, modelagem de dados e arquitetura são definidas conforme os requisitos do sistema.",
  },
  {
    number: "03",
    title: "Automações e integrações",
    stack: "Python · APIs · Webhooks",
    description:
      "Integra ferramentas para reduzir tarefas manuais e sincronizar informações.",
    details:
      "Conexão com serviços existentes e uso de IA quando ela trouxer benefício concreto ao processo.",
  },
  {
    number: "04",
    title: "Interações e movimento na interface",
    stack: "GSAP · Matter.js · Motion",
    description:
      "Interações e animações orientam a navegação e dão retorno às ações.",
    details:
      "O movimento tem propósito; conteúdo e navegação continuam funcionais sem depender de animações.",
  },
];

const CORE_TECH_TAGS = [
  "Next.js",
  "React",
  "TypeScript",
  "Java",
  "SQL",
  "Python",
  "GSAP",
  "Matter.js",
];

function Showcase({
  viewportH,
  viewportW,
  lowPerformance,
  effectsActive,
  mountEffects,
  onContainerHeightChange,
  contentOpacity = 1,
}: ShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerHRef = useRef(1100);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isContemplating = useContemplation();

  const updateHeight = useCallback(() => {
    if (containerRef.current) {
      const h = containerRef.current.offsetHeight;
      containerHRef.current = h;
      onContainerHeightChange?.(h);
    }
  }, [onContainerHeightChange]);

  useEffect(() => {
    updateHeight();
    const timer = setTimeout(updateHeight, 250);
    window.addEventListener("resize", updateHeight);

    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateHeight);
      ro.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHeight);
      ro?.disconnect();
    };
  }, [updateHeight, expandedIndex]);

  // Event-driven rAF: reads scrollProgress on scroll, writes transform directly
  useEffect(() => {
    if (!effectsActive) return;

    let rafId: number | null = null;
    const tick = () => {
      rafId = null;
      const layer = containerRef.current?.closest<HTMLElement>("[data-scroll-progress]");
      const sp = layer ? parseFloat(layer.dataset.scrollProgress ?? "0") : 0;
      const maxContentScroll = Math.max(0, containerHRef.current - viewportH + 90);
      const translateY = sp * maxContentScroll;
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(0, -${translateY}px, 0)`;
      }
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

  const handleToggleRow = (index: number) => {
    playClickSound("tick");
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="showcase-scene">
      {/* Pure Code Light Atmosphere Background */}
      <div className="showcase__light-bg" aria-hidden="true" />

      <div className="showcase__line-waves" aria-hidden="true">
        {mountEffects && !lowPerformance && <LineWaves
          color1="#0284C7"
          color2="#059669"
          color3="#BCFF7E"
          speed={lowPerformance ? 0.16 : 0.3}
          lineCount={lowPerformance ? 30 : 48}
          lineWidth={1.3}
          highlight={1}
          warpIntensity={1}
          rotation={-33}
          enableMouseInteraction={!lowPerformance && viewportW > 900}
          colorCycleSpeed={1}
          glow={0.6}
          brightness={1}
          highlightWidth={1}
          warpScale={1}
          edgeFade={0}
          mouseInfluence={2}
          clickRipple={!lowPerformance}
          intro
          lightMode={false}
          opacity={lowPerformance ? 0.55 : 0.8}
          maxDevicePixelRatio={lowPerformance ? 1 : 1.15}
          paused={!effectsActive}
        />}
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="showcase__container"
        style={{
          opacity: isContemplating ? 0 : contentOpacity,
          transition: "opacity 0.5s ease",
          pointerEvents: isContemplating ? "none" : undefined,
        }}
      >
        {/* Star Clearance Spacer so the floating star portal NEVER touches this content */}
        <div className="showcase__star-spacer" />

        {/* Two-column layout for service summary and details */}
        <div className="showcase__content">
          {/* Left Column: Editorial Manifesto & Specs */}
          <div className="showcase__left">
            <div className="showcase__index">
              <span className="showcase__index-num">03</span>
              <span className="showcase__index-line" aria-hidden="true" />
              <span className="showcase__index-label">Capacidades</span>
            </div>

            <h2 className="showcase__kicker">Sites e sistemas web.</h2>

            <p className="showcase__statement">
              Soluções digitais planejadas para atender a necessidades <em>reais de negócio</em>.
            </p>

            <dl className="showcase__specs">
              {SPECS.map((row) => (
                <div key={row.label} className="showcase__row">
                  <dt className="showcase__row-label">{row.label}</dt>
                  <dd className="showcase__row-value">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="showcase__footer">
              <a href="#contato" className="showcase__link" onClick={() => playClickSound("tick")}>
                <span className="showcase__link-text">Solicitar uma proposta</span>
                <span className="showcase__link-arrow" aria-hidden="true">→</span>
              </a>

              <span className="showcase__signature" aria-hidden="true">David</span>
            </div>
          </div>

          {/* Right Column: Refined Capabilities Directory */}
          <div className="showcase__right">
            <div className="showcase__card">
              <div className="showcase__directory-header">
                <span className="showcase__directory-title">Diretório de Soluções</span>
                <span className="showcase__directory-sub">Serviços</span>
              </div>

              <div className="showcase__directory-list">
                {CAPABILITIES.map((cap, idx) => {
                  const isExpanded = expandedIndex === idx;
                  return (
                    <div
                      key={cap.number}
                      className={`showcase__item ${isExpanded ? "showcase__item--expanded" : ""}`}
                      onClick={() => handleToggleRow(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleToggleRow(idx);
                        }
                      }}
                      aria-expanded={isExpanded}
                    >
                      <div className="showcase__item-top">
                        <span className="showcase__item-num">{cap.number}</span>
                        <div className="showcase__item-head">
                          <h3 className="showcase__item-title">{cap.title}</h3>
                          <span className="showcase__item-stack">{cap.stack}</span>
                        </div>
                        <span className="showcase__item-indicator" aria-hidden="true">
                          {isExpanded ? "—" : "+"}
                        </span>
                      </div>

                      <p className="showcase__item-desc">{cap.description}</p>

                      {isExpanded && cap.details && (
                        <div className="showcase__item-details">
                          <p>{cap.details}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Minimalist Tech Tags Ribbon */}
              <div className="showcase__tech-ribbon">
                <span className="showcase__tech-ribbon-label">Ecossistema técnico:</span>
                <div className="showcase__tech-pills">
                  {CORE_TECH_TAGS.map((tech) => (
                    <span key={tech} className="showcase__tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Showcase);
