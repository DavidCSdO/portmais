"use client";

import React, { useState } from "react";
import Image from "next/image";
import PixelSwap from "../PixelSwap";
import { playClickSound } from "../../_utils/sound";
import "./ProcessSection.css";

interface ProcessStep {
  number: string;
  tag: string;
  title: string;
  summary: string;
  natureImage: string;
  natureAlt: string;
  deliverables: string[];
  deepDive: {
    headline: string;
    description: string;
    metric: string;
    metricLabel: string;
  };
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    tag: "DIAGNÓSTICO & ARTE",
    title: "Imersão & Visão Autoral",
    summary: "Mapeamento das regras de negócio, arquitetura e prototipagem sensorial. Zero templates prontos.",
    natureImage: "/images/landscape_about.jpg",
    natureAlt: "Vale Glacial de Kluane",
    deliverables: ["Arquitetura de Informação", "Direção de Arte Exclusiva", "Protótipos em Alta Fidelidade"],
    deepDive: {
      headline: "Concepção Autoral & Rigor",
      description:
        "Antes de qualquer código, definimos a hierarquia e o impacto visual da marca para transmitir autoridade imediata.",
      metric: "100%",
      metricLabel: "Design sob medida"
    }
  },
  {
    number: "02",
    tag: "ENGENHARIA PURA",
    title: "Código Limpo & 60 FPS",
    summary: "Next.js 15, APIs resilientes, modelagem relacional estrita e interações táteis na GPU.",
    natureImage: "/images/landscape_showcase.jpg",
    natureAlt: "Taiga conífera de Oulanka",
    deliverables: ["Next.js 15 & React 19", "APIs Seguras & Bancos ACID", "Física Sensorial a 60 FPS"],
    deepDive: {
      headline: "Construção Robusta & Escala",
      description:
        "Microsserviços desacoplados, Server Components e animações aceleradas por hardware para tempos sub-segundo.",
      metric: "< 0.8s",
      metricLabel: "Tempo de resposta"
    }
  },
  {
    number: "03",
    tag: "LANÇAMENTO & IMPACTO",
    title: "Produção & SEO Técnico",
    summary: "Deploy otimizado, SEO estruturado para indexação máxima e comunicação direta sem agência.",
    natureImage: "/images/landscape_idea.jpg",
    natureAlt: "Weisshorn acima das nuvens",
    deliverables: ["SEO Estruturado & Core Vitals", "Deploy Contínuo Global", "Canal Direto com o Dev"],
    deepDive: {
      headline: "Resultado & Parceria",
      description:
        "Seu produto no ar com métricas de excelência e acompanhamento direto. Do primeiro conceito à escala comercial.",
      metric: "95+",
      metricLabel: "Core Web Vitals"
    }
  }
];

export default function ProcessSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleOpenModal = () => {
    try {
      playClickSound("tick");
    } catch {}
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    try {
      playClickSound("tick");
    } catch {}
    setIsModalOpen(false);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      playClickSound("tick");
      if (navigator.clipboard) {
        navigator.clipboard.writeText("davidcsdo@gmail.com");
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {}
  };

  const handleWhatsApp = () => {
    try {
      playClickSound("tick");
    } catch {}
    const text = encodeURIComponent(
      "Olá David, vi seu portfólio e gostaria de agendar uma conversa sobre o desenvolvimento de um projeto."
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <section className="idea-block idea-block--process" id="metodologia">
      {/* 1. Header: Identical layout and typography hierarchy as other IdeaSection blocks */}
      <div className="process-heading-group">
        <div className="idea-block__index">
          <span className="idea-block__index-num">04</span>
          <span className="idea-block__index-line" aria-hidden="true" />
          <span className="idea-block__index-label">Metodologia</span>
        </div>

        <h2 className="idea-block__eyebrow">ENGENHARIA, RIGOR & ENTREGA</h2>

        <p className="idea-block__statement">
          Da Concepção ao Impacto Real.{" "}
          <em>Três etapas claras sem atalhos.</em>
        </p>

        {/* Minimalist Editorial Quick Booking Action (Seamlessly integrated, no boxy widget) */}
        <div className="process-editorial-action">
          <button
            type="button"
            className="process-editorial-link"
            onClick={handleOpenModal}
            aria-label="Agendar conversa com David Cardoso"
          >
            <span className="process-editorial-link__dot" aria-hidden="true" />
            <span className="process-editorial-link__text">Agendar uma conversa sobre o seu projeto</span>
            <span className="process-editorial-link__arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* 2. Three Step Cards with PixelSwap */}
      <div className="process-steps-grid">
        {PROCESS_STEPS.map((step) => (
          <div key={step.number} className="process-col">
            {/* Step Header */}
            <div className="process-col__header">
              <span className="process-col__num">{step.number}</span>
              <span className="process-col__tag">{step.tag}</span>
            </div>

            {/* PixelSwap Card */}
            <div className="process-card-box">
              <PixelSwap
                pixelSize={28}
                gap={2}
                pixelRadius={0}
                pixelSpin={0}
                pixelScale={0.25}
                duration={900}
                pixelDuration={320}
                pattern="diagonal"
                randomness={0.15}
                fade={true}
                trigger="hover"
                aspectRatio="16 / 11"
                className="process-card-swap"
                firstContent={
                  /* Front: Authentic Landscape with Frosted Vignette */
                  <div className="process-card-front">
                    <Image
                      src={step.natureImage}
                      alt={step.natureAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 360px"
                      className="process-card-front__bg"
                      quality={90}
                    />
                    <div className="process-card-front__overlay" />

                    <div className="process-card-front__body">
                      <h3 className="process-card-front__title">{step.title}</h3>
                      <p className="process-card-front__desc">{step.summary}</p>

                      <span className="process-card-front__cue" aria-hidden="true">
                        <span className="process-card-front__cue-dot" />
                        <span>Passe o cursor para detalhar</span>
                      </span>
                    </div>
                  </div>
                }
                secondContent={
                  /* Back: Tech Card with Star Emblem Logo */
                  <div className="process-card-back">
                    <div className="process-card-back__logo-wrap" aria-hidden="true">
                      <Image
                        src="/images/LOGO.png"
                        alt="David Cardoso Logo"
                        width={54}
                        height={54}
                        className="process-card-back__logo"
                        unoptimized
                      />
                    </div>

                    <div className="process-card-back__body">
                      <span className="process-card-back__tag">Detalhamento Técnico</span>
                      <h4 className="process-card-back__title">{step.deepDive.headline}</h4>
                      <p className="process-card-back__desc">{step.deepDive.description}</p>

                      <div className="process-card-back__metric">
                        <span className="process-card-back__metric-val">{step.deepDive.metric}</span>
                        <span className="process-card-back__metric-lbl">{step.deepDive.metricLabel}</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

            {/* Deliverables Checklist */}
            <ul className="process-deliverables" role="list">
              {step.deliverables.map((item) => (
                <li key={item} className="process-deliverables__item">
                  <span className="process-deliverables__dot" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Booking Modal */}
      {isModalOpen && (
        <div
          className="process-modal-backdrop"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label="Agendar conversa com David Cardoso"
        >
          <div
            className="process-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="process-modal-header">
              <div className="process-modal-brand">
                <div className="process-modal-logo">
                  <Image
                    src="/images/LOGO.png"
                    alt="Logo David Cardoso"
                    width={26}
                    height={26}
                    unoptimized
                  />
                </div>
                <div className="process-modal-meta">
                  <span className="process-modal-title">Iniciar um Projeto</span>
                  <span className="process-modal-sub">David Cardoso // 2026</span>
                </div>
              </div>

              <button
                type="button"
                className="process-modal-close"
                onClick={handleCloseModal}
                aria-label="Fechar modal"
              >
                ✕
              </button>
            </div>

            <div className="process-modal-body">
              <p className="process-modal-desc">
                Seja para uma nova plataforma web, sistemas escaláveis ou design sensorial,
                escolha o canal mais rápido para conversarmos:
              </p>

              <div className="process-modal-actions">
                <button
                  type="button"
                  className="process-modal-btn process-modal-btn--primary"
                  onClick={handleWhatsApp}
                >
                  <div className="process-modal-btn__info">
                    <span className="process-modal-btn__tag">Mais Rápido</span>
                    <span className="process-modal-btn__label">WhatsApp Direto</span>
                    <span className="process-modal-btn__sub">Resposta em poucas horas</span>
                  </div>
                  <span className="process-modal-btn__arrow" aria-hidden="true">↗</span>
                </button>

                <button
                  type="button"
                  className="process-modal-btn"
                  onClick={handleCopyEmail}
                >
                  <div className="process-modal-btn__info">
                    <span className="process-modal-btn__tag">Briefing Formal</span>
                    <span className="process-modal-btn__label">
                      {copiedEmail ? "E-mail Copiado! ✓" : "Copiar E-mail"}
                    </span>
                    <span className="process-modal-btn__sub">davidcsdo@gmail.com</span>
                  </div>
                  <span className="process-modal-btn__arrow" aria-hidden="true">
                    {copiedEmail ? "✓" : "📋"}
                  </span>
                </button>
              </div>

              <div className="process-modal-footer">
                <span className="process-modal-footer__dot" />
                <span>Sem intermediários. Conversa direta com o desenvolvedor.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
