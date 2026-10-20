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
    tag: "PLANEJAMENTO",
    title: "Entender o projeto",
    summary: "Objetivo, público, conteúdo e escopo são definidos antes da escolha técnica.",
    deliverables: ["Objetivo e requisitos", "Conteúdo e estrutura", "Escopo combinado"],
    deepDive: {
      headline: "Escopo definido",
      description:
        "Prioridades e requisitos são organizados para definir o que entra na primeira versão.",
      metric: "Etapa 1",
      metricLabel: "planejamento"
    }
  },
  {
    number: "02",
    tag: "DESENVOLVIMENTO",
    title: "Construir e testar",
    summary: "A interface e os recursos definidos são implementados e validados nas principais tarefas.",
    deliverables: ["Interface responsiva", "Integrações necessárias", "Testes das principais tarefas"],
    deepDive: {
      headline: "Versão funcional",
      description:
        "A implementação é revisada conforme o escopo antes da publicação.",
      metric: "Etapa 2",
      metricLabel: "implementação"
    }
  },
  {
    number: "03",
    tag: "PUBLICAÇÃO",
    title: "Publicar e acompanhar",
    summary: "Preparo a publicação e confiro os detalhes essenciais para o lançamento.",
    deliverables: ["Configuração de publicação", "Metadados e SEO básico", "Contato direto"],
    deepDive: {
      headline: "Projeto publicado",
      description:
        "Depois da publicação, você sabe o que foi entregue e como seguir com o projeto.",
      metric: "Etapa 3",
      metricLabel: "publicação"
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
        navigator.clipboard.writeText("cardosodavid92@gmail.com");
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
      "Olá, gostaria de conversar sobre um projeto de desenvolvimento web."
    );
    window.open(`https://wa.me/5524992622909?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="idea-block idea-block--process" id="metodologia">
      {/* 1. Header: Identical layout and typography hierarchy as other IdeaSection blocks */}
      <div className="process-heading-group">
        <div className="idea-block__index">
          <span className="idea-block__index-num">06</span>
          <span className="idea-block__index-line" aria-hidden="true" />
          <span className="idea-block__index-label">Metodologia</span>
        </div>

        <h2 className="idea-block__eyebrow">ETAPAS DO PROJETO</h2>

        <p className="idea-block__statement">
            Do alinhamento à publicação, com escopo definido e{" "}
            <em>acompanhamento em cada etapa.</em>
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
            <span className="process-editorial-link__text">Solicitar uma conversa sobre o projeto</span>
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
                  /* Front: the purpose of each project stage */
                  <div className="process-card-front">
                    <Image
                      src="/images/BACK4.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      quality={75}
                      className="process-card-front__image"
                    />
                    <div className="process-card-front__overlay" />

                    <div className="process-card-front__body">
                      <h3 className="process-card-front__title">{step.title}</h3>
                      <p className="process-card-front__desc">{step.summary}</p>

                      <span className="process-card-front__cue" aria-hidden="true">
                        <span className="process-card-front__cue-dot" />
                        <span>Etapa do projeto</span>
                      </span>
                    </div>
                  </div>
                }
                secondContent={
                  /* Back: Tech Card with Star Emblem Logo */
                  <div className="process-card-back">
                    <div className="process-card-back__logo-wrap" aria-hidden="true">
                      <Image
                        src="/images/LOGO.webp"
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
                    src="/images/LOGO.webp"
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
                Apresente os objetivos e requisitos do projeto para alinhar escopo e próximos passos:
              </p>

              <div className="process-modal-actions">
                <button
                  type="button"
                  className="process-modal-btn process-modal-btn--primary"
                  onClick={handleWhatsApp}
                >
                  <div className="process-modal-btn__info">
                    <span className="process-modal-btn__tag">Contato</span>
                    <span className="process-modal-btn__label">WhatsApp</span>
                    <span className="process-modal-btn__sub">Conversa direta com o desenvolvedor</span>
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
                    <span className="process-modal-btn__sub">cardosodavid92@gmail.com</span>
                  </div>
                  <span className="process-modal-btn__arrow" aria-hidden="true">
                    {copiedEmail ? "✓" : "📋"}
                  </span>
                </button>
              </div>

              <div className="process-modal-footer">
                <span className="process-modal-footer__dot" />
                <span>Atendimento direto durante as etapas do projeto.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
