"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DriftingMist from "../DriftingMist";
import ForestAtmosphere from "../ForestAtmosphere";
import NatureSpotlight from "../NatureSpotlight";
import { playClickSound } from "../../_utils/sound";
import { useContemplation } from "../../_utils/contemplation";
import "./Showcase.css";

interface ShowcaseProps {
  scrollProgress: number; // 0 to 1
  viewportW: number;
  viewportH: number;
  onContainerHeightChange?: (height: number) => void;
  contentOpacity?: number;
}

const SPECS: { label: string; value: string }[] = [
  { label: "Escopo", value: "Sistemas web, SaaS, APIs de alta escala e automações com IA" },
  { label: "Stack", value: "Next.js, React, Java, Spring Boot, SQL, Python, Docker" },
  { label: "Método", value: "Código limpo, arquitetura modular e zero templates genéricos" },
  { label: "Entrega", value: "Performance máxima, SEO estruturado e comunicação direta" },
  { label: "Agora", value: "Disponível para novos projetos e parcerias — 2026" },
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
    title: "Aplicações Web & Plataformas SaaS",
    stack: "Next.js 15 · React 19 · TypeScript · Tailwind CSS",
    description:
      "Dashboards administrativos, portais corporativos e plataformas SaaS concebidos para carregamento instantâneo, SEO técnico e usabilidade fluida.",
    details:
      "Arquitetura com Server Components, renderização híbrida (SSR / SSG) e minimização extrema de bundles para tempos de resposta sub-segundo.",
  },
  {
    number: "02",
    title: "Engenharia Back-End & Bancos de Dados",
    stack: "Java · Spring Boot · PostgreSQL · MySQL · Docker · REST APIs",
    description:
      "Microsserviços resilientes, arquitetura limpa e modelagem relacional estrita (ACID). Regras de negócio seguras com autenticação JWT e OpenAPI.",
    details:
      "Clean Architecture, desacoplamento de camadas, pool de conexões HikariCP otimizado e orquestração de contêineres para paridade de ambientes.",
  },
  {
    number: "03",
    title: "Automação Inteligente & Soluções com IA",
    stack: "Python · APIs de LLM (OpenAI / Claude) · Webhooks · Pipelines",
    description:
      "Integração de modelos de linguagem e automações sob medida aos processos internos da empresa, reduzindo tarefas manuais repetitivas e acelerando decisões.",
    details:
      "Pipelines assíncronos orientados a eventos, tratamento robusto de erros e orquestração de chamadas de IA com controle de custo e latência.",
  },
  {
    number: "04",
    title: "Experiências Visuais & Design Sensorial",
    stack: "GSAP · Matter.js · Design Systems · 60 FPS · Motion",
    description:
      "Interfaces autorais com microinterações táteis e físicas em tempo real que diferenciam a sua marca no mercado e transmitem credibilidade imediata.",
    details:
      "Animações aceleradas por hardware (GPU), layout containment para prevenção de reflows e transição fiel de protótipos do Figma para código limpo.",
  },
];

const CORE_TECH_TAGS = [
  "Next.js",
  "React",
  "TypeScript",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "SQL",
  "Python",
  "Docker",
  "GSAP",
  "Tailwind",
  "REST APIs",
];

export default function Showcase({
  scrollProgress,
  viewportW,
  viewportH,
  onContainerHeightChange,
  contentOpacity = 1,
}: ShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(1100);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isContemplating = useContemplation();

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const h = containerRef.current.offsetHeight;
        setContainerH(h);
        onContainerHeightChange?.(h);
      }
    };

    updateHeight();
    const timer = setTimeout(updateHeight, 250);
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
  }, [onContainerHeightChange, expandedIndex]);

  // landscape_showcase.jpg is 2560 x 1707 (aspect ratio 2560/1707 = 1.5)
  // Ultra-high definition 4K pine forest with atmospheric parallax
  const imgAspect = 2560 / 1707;
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

  const handleToggleRow = (index: number) => {
    playClickSound("tick");
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="showcase-scene">
      {/* Background Track: landscape_showcase.jpg (Taiga Boreal de Oulanka 4K) */}
      <div
        className="showcase__bg-track"
        style={{
          width: `${bgRenderedW}px`,
          height: `${bgRenderedH}px`,
          transform: `translate3d(${bgTranslateX}px, -${bgTranslateY}px, 0)`,
        }}
      >
        <Image
          src="/images/landscape_showcase.jpg"
          alt="Taiga Conífera de Oulanka - Floresta com névoa em 4K"
          fill
          priority={false}
          className="showcase__bg-img"
          sizes={`${Math.ceil(bgRenderedW)}px`}
          quality={90}
        />
        <div className="showcase__bg-overlay" aria-hidden="true" />
      </div>

      {/* Atmospheric Forest Mist drifting through the trees */}
      <DriftingMist opacity={0.32} speedMultiplier={1.05} />

      {/* Living Forest Atmosphere: subtle slow drifting pine needles */}
      <ForestAtmosphere needlesOpacity={0.4} />

      {/* Contemporary Scenic Spotlight Discovery */}
      <NatureSpotlight sceneId="showcase" position="top-right" />

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="showcase__container"
        style={{
          opacity: isContemplating ? 0 : contentOpacity,
          transform: `translate3d(0, -${contentTranslateY}px, 0)`,
          transition: "opacity 0.5s ease",
          pointerEvents: isContemplating ? "none" : undefined,
        }}
      >
        {/* Star Clearance Spacer so the floating star portal NEVER touches this content */}
        <div className="showcase__star-spacer" />

        {/* Two-Column Editorial Layout (Harmonious with Section 02) */}
        <div className="showcase__content">
          {/* Left Column: Editorial Manifesto & Specs */}
          <div className="showcase__left">
            <div className="showcase__index">
              <span className="showcase__index-num">04</span>
              <span className="showcase__index-line" aria-hidden="true" />
              <span className="showcase__index-label">Capacidades</span>
              <span className="showcase__biome-tag" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1L3 6h3L2 11h4L1 15h14l-5-4h4l-4-5h3L8 1z" />
                </svg>
                TAIGA BOREAL · 45°50&apos;N
              </span>
            </div>

            <h2 className="showcase__kicker">Engenharia, design e sistemas.</h2>

            <p className="showcase__statement">
              Eu construo sistemas e produtos digitais que geram <em>resultado real</em>.
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
                <span className="showcase__link-text">Iniciar um projeto</span>
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
                <span className="showcase__directory-sub">2026 // Produção</span>
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
                <span className="showcase__tech-ribbon-label">Ecosistema técnico:</span>
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
