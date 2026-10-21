"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CircularText from "../CircularText";
import DriftingMist from "../DriftingMist";
import { Threads } from "../Backgrounds";
import { useContemplation } from "../../_utils/contemplation";
import "./Projects.css";

const ATOM_SERVICES = [
  "Sites institucionais e landing pages",
  "Portfólios e páginas de serviços",
  "Lojas virtuais e experiências digitais",
  "Automações e integração entre ferramentas",
  "Atendimento via WhatsApp e chatbots",
  "CRM, funis comerciais e agendamento",
  "SEO e presença digital",
];

const ATOM_PRACTICES = [
  {
    number: "01",
    title: "Interface & experiência",
    description:
      "Hierarquia visual, navegação intuitiva e interfaces responsivas com uma identidade futurista própria.",
    status: "Em desenvolvimento",
  },
  {
    number: "02",
    title: "Desenvolvimento web",
    description:
      "React e Next.js para estruturar páginas, componentes reutilizáveis e funcionalidades que evoluem com cada solução.",
    status: "Base tecnológica",
  },
  {
    number: "03",
    title: "Backend & dados",
    description:
      "Planejamento de serviços, persistência e integrações externas; Supabase, APIs e CMS aparecem como opções para evolução.",
    status: "Frente planejada",
  },
  {
    number: "04",
    title: "Automação",
    description:
      "Fluxos de atendimento, captação e agendamento com ferramentas como n8n e Google Calendar.",
    status: "Frente planejada",
  },
  {
    number: "05",
    title: "Publicação & evolução",
    description:
      "Git e GitHub organizam o desenvolvimento; Vercel é considerada para publicação, manutenção e expansão.",
    status: "Evolução contínua",
  },
];

const OTHER_PROJECTS = [
  {
    number: "02",
    name: "Chá de Panela",
    category: "Aplicação web",
    status: "Projeto desenvolvido",
    monogram: "JD",
    artLabel: "Uma celebração feita para compartilhar",
    description:
      "Lista de presentes digital personalizada para David e Júlia, com catálogo temático e seleção de itens para evitar escolhas duplicadas.",
    challenge:
      "Modelar os dados e as regras de seleção, manter a disponibilidade dos presentes atualizada e tornar a experiência simples para os convidados.",
    stack:
      "Desenvolvimento web · JavaScript · Banco de dados · Hospedagem",
    highlight:
      "Regras de negócio aplicadas a uma necessidade real, com atenção à experiência e à integridade dos dados.",
    href: "https://cha-front.vercel.app/",
    linkLabel: "Visitar lista",
    theme: "wedding",
  },
  {
    number: "03",
    name: "AcheAqui",
    category: "Conceito de SaaS",
    status: "Conceito de produto",
    monogram: "A/",
    artLabel: "Encontre oportunidades com contexto",
    description:
      "Conceito de plataforma para descobrir empresas e organizar oportunidades comerciais em um só lugar.",
    challenge:
      "Planejar fontes de dados, filtros de busca, interfaces de consulta e uma estrutura clara para organizar empresas e leads.",
    stack: "Aplicação web · APIs · Banco de dados · Pesquisa comercial",
    highlight:
      "Visão de produto SaaS: partir de uma dor comercial e desenhar uma solução preparada para crescer.",
    theme: "ache",
  },
  {
    number: "04",
    name: "Symphony of Robots",
    category: "Estudo de design & front-end",
    status: "Experiência publicada",
    monogram: "S",
    artLabel: "Art Déco encontra ficção científica",
    description:
      "Experiência digital imersiva inspirada pelo Art Déco, pelo noir urbano dos anos 1930 e pela ficção científica.",
    challenge:
      "Usar tipografia, composição editorial e animação para dar personalidade a uma apresentação de produtos.",
    stack: "Direção de arte · UI · Animação · Desenvolvimento front-end",
    highlight:
      "Narrativa de marca e implementação técnica reunidas em uma experiência visual autoral.",
    href: "https://symphony-pearl.vercel.app/",
    linkLabel: "Explorar experiência",
    theme: "symphony",
  },
  {
    number: "05",
    name: "ATOM Agenda",
    category: "Projeto mobile",
    status: "Escopo planejado",
    monogram: "A.",
    artLabel: "Tempo, tarefas e rotina em um só lugar",
    description:
      "Proposta de aplicativo de organização pessoal, com calendário, eventos, categorias, autenticação e persistência.",
    challenge:
      "Levar a identidade da ATOM para o mobile e planejar navegação, estado, sincronização e notificações locais.",
    stack: "React Native · Expo · TypeScript · Supabase · PostgreSQL",
    highlight:
      "Expansão do desenvolvimento web para uma aplicação móvel com arquitetura organizada.",
    theme: "agenda",
  },
];

const SKILLS = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Integração de APIs",
  "Git & GitHub",
  "Arquitetura",
  "UI/UX",
  "Automação",
  "Visão de produto",
];

interface ProjectsProps {
  scrollProgress: number;
  viewportH: number;
  onContainerHeightChange?: (height: number) => void;
  nextPortalProgress?: number;
}

export default function Projects({
  scrollProgress,
  viewportH,
  onContainerHeightChange,
  nextPortalProgress,
}: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(2400);
  const isContemplating = useContemplation();

  useEffect(() => {
    const updateHeight = () => {
      if (!containerRef.current) return;
      const height = containerRef.current.offsetHeight;
      setContainerH(height);
      onContainerHeightChange?.(height);
    };

    updateHeight();
    const timer = window.setTimeout(updateHeight, 300);
    window.addEventListener("resize", updateHeight);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateHeight)
        : null;
    if (containerRef.current) observer?.observe(containerRef.current);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateHeight);
      observer?.disconnect();
    };
  }, [onContainerHeightChange]);

  const maxContentScroll = Math.max(0, containerH - viewportH + 120);
  const contentTranslateY = scrollProgress * maxContentScroll;
  const portalProgress =
    typeof nextPortalProgress === "number"
      ? nextPortalProgress
      : Math.min(Math.max((scrollProgress - 0.82) / 0.18, 0), 1);
  const starScale = 1 + Math.sin(portalProgress * (Math.PI / 2)) * 3.6;
  const starGlow = 0.5 + portalProgress * 0.45;
  const circularTextOpacity = Math.max(0, 1 - portalProgress * 2.2);

  return (
    <div className="projects-scene">
      <div className="projects__light-bg" aria-hidden="true" />

      <div className="projects__threads" aria-hidden="true">
        <Threads
          color={[0.3, 0.42, 0.2]}
          accentColor={[0.55, 0.72, 0.34]}
          lineCount={36}
          amplitude={1.1}
          distance={0.35}
          enableMouseInteraction={true}
          thickness={0.75}
          softness={1.4}
          speed={0.2}
          waves={1}
          opacity={0.2}
        />
      </div>

      <DriftingMist opacity={0.08} speedMultiplier={0.7} />

      <div
        ref={containerRef}
        className="projects__container"
        style={{
          opacity: isContemplating ? 0 : 1,
          transform: `translate3d(0, -${contentTranslateY}px, 0)`,
          transition: "opacity 0.5s ease",
          pointerEvents: isContemplating ? "none" : undefined,
        }}
      >
        <header className="projects__intro">
          <div className="projects__section-index">
            <span className="projects__section-index-num">02</span>
            <span className="projects__section-index-line" aria-hidden="true" />
            <span>Projetos selecionados</span>
          </div>
          <div className="projects__intro-copy">
            <p className="projects__eyebrow">Produto, engenharia & experiência</p>
            <h2 id="projects-title" className="projects__headline">
              Ideias que ganham <em>estrutura.</em>
            </h2>
            <p className="projects__intro-text">
              Projetos que conectam necessidades reais a experiências digitais
              cuidadosas — da primeira decisão de produto à implementação.
            </p>
          </div>
          <span className="projects__intro-count">01 — 05</span>
        </header>

        <main className="projects__content">
          <section className="projects__atom" aria-labelledby="atom-title">
            <div className="projects__atom-copy">
              <div className="projects__project-meta">
                <span className="projects__status-dot" />
                <span>Projeto principal</span>
                <span className="projects__meta-divider">/</span>
                <span>Plataforma web & soluções digitais</span>
              </div>

              <h3 id="atom-title" className="projects__atom-title">
                ATOM<span>.</span>
              </h3>
              <p className="projects__atom-lead">
                Uma base digital para transformar desafios de negócio em
                ferramentas úteis, integradas e prontas para evoluir.
              </p>
              <p className="projects__atom-description">
                A ATOM é um projeto de agência digital que une design,
                desenvolvimento de software e automação. Mais do que uma
                presença institucional, sua proposta é construir uma identidade
                própria e uma plataforma capaz de ampliar os serviços conforme
                as necessidades de cada cliente.
              </p>

              <a
                className="projects__external-link projects__external-link--primary"
                href="https://www.atom-autocon.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conhecer a ATOM <span aria-hidden="true">↗</span>
              </a>

              <div className="projects__atom-caption">
                <span>01 / Plataforma em evolução</span>
                <span>Produto digital · Desenvolvimento web</span>
              </div>
            </div>

            <a
              className="projects__atom-visual"
              href="https://www.atom-autocon.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar o site da ATOM"
            >
              <Image
                src="/images/ATOM.png"
                alt="Interface da plataforma digital ATOM"
                fill
                sizes="(max-width: 800px) 100vw, 48vw"
                className="projects__atom-image"
                priority
              />
              <span className="projects__visual-shade" aria-hidden="true" />
              <span className="projects__visual-topline">
                <span>ATOM / STUDIO</span>
                <span>WEB · SYSTEMS · AUTOMATION</span>
              </span>
              <span className="projects__visual-mark" aria-hidden="true">
                ATOM
              </span>
              <span className="projects__visual-bottom">
                Explorar plataforma <span aria-hidden="true">↗</span>
              </span>
            </a>
          </section>

          <section className="projects__offer" aria-labelledby="atom-offer-title">
            <div className="projects__section-heading">
              <span className="projects__section-kicker">Visão de produto</span>
              <h3 id="atom-offer-title">
                Um ecossistema de soluções, não apenas um site.
              </h3>
              <p>
                A proposta comercial da ATOM contempla ferramentas digitais
                que ajudam empresas a apresentar, vender e operar melhor.
              </p>
            </div>
            <ul className="projects__service-list">
              {ATOM_SERVICES.map((service, index) => (
                <li key={service}>
                  <span className="projects__service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{service}</span>
                  <span className="projects__service-arrow" aria-hidden="true">
                    ↗
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="projects__architecture" aria-labelledby="atom-architecture-title">
            <div className="projects__section-heading projects__section-heading--row">
              <div>
                <span className="projects__section-kicker">
                  Desenvolvimento & arquitetura
                </span>
                <h3 id="atom-architecture-title">
                  Pensada para crescer por etapas.
                </h3>
              </div>
              <p>
                A base separa interface, integrações e publicação para que a
                solução possa evoluir com o produto.
              </p>
            </div>

            <div className="projects__practice-grid">
              {ATOM_PRACTICES.map((practice) => (
                <article className="projects__practice-card" key={practice.number}>
                  <span className="projects__practice-number">{practice.number}</span>
                  <span className="projects__practice-status">{practice.status}</span>
                  <h4>{practice.title}</h4>
                  <p>{practice.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="projects__principles" aria-labelledby="atom-principles-title">
            <div className="projects__principles-heading">
              <span className="projects__section-kicker">O que orienta o projeto</span>
              <h3 id="atom-principles-title">
                Tecnologia com intenção, do produto ao detalhe.
              </h3>
              <p>
                O objetivo é construir uma base tecnológica e comercial para
                soluções digitais personalizadas, sem depender de ferramentas
                desconectadas.
              </p>
            </div>

            <div className="projects__principles-list">
              <article>
                <span>01</span>
                <div>
                  <h4>Visão de produto</h4>
                  <p>Transformar uma necessidade comercial em uma solução digital clara.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h4>Desenvolvimento full stack</h4>
                  <p>Conectar interfaces, lógica de aplicação, dados e integrações.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h4>Arquitetura evolutiva</h4>
                  <p>Organizar responsabilidades e componentes pensando nos próximos passos.</p>
                </div>
              </article>
              <article>
                <span>04</span>
                <div>
                  <h4>Experiência & negócio</h4>
                  <p>Alinhar usabilidade, aquisição, conversão e manutenção.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="projects__other" aria-labelledby="other-projects-title">
            <div className="projects__section-heading projects__section-heading--row">
              <div>
                <span className="projects__section-kicker">Outros projetos</span>
                <h3 id="other-projects-title">
                  Diferentes problemas. Outras formas de construir.
                </h3>
              </div>
              <p>
                Aplicações, conceitos de produto e estudos visuais que ampliam
                a prática em desenvolvimento e direção criativa.
              </p>
            </div>

            <div className="projects__project-grid">
              {OTHER_PROJECTS.map((project) => (
                <article
                  className={`projects__project-card projects__project-card--${project.theme}`}
                  key={project.number}
                >
                  <div className="projects__project-art">
                    <span className="projects__project-art-index">
                      {project.number} / CASE
                    </span>
                    <span className="projects__project-monogram" aria-hidden="true">
                      {project.monogram}
                    </span>
                    <span className="projects__project-art-label">
                      {project.artLabel}
                    </span>
                    <span className="projects__project-art-ring" aria-hidden="true" />
                  </div>

                  <div className="projects__project-body">
                    <div className="projects__project-meta">
                      <span>{project.category}</span>
                      <span className="projects__project-status">{project.status}</span>
                    </div>
                    <h4>{project.name}</h4>
                    <p className="projects__project-description">
                      {project.description}
                    </p>

                    <div className="projects__project-detail">
                      <span>Desafio</span>
                      <p>{project.challenge}</p>
                    </div>
                    <div className="projects__project-detail">
                      <span>Tecnologias & abordagem</span>
                      <p>{project.stack}</p>
                    </div>

                    <div className="projects__project-highlight">
                      <span>Destaque</span>
                      <p>{project.highlight}</p>
                    </div>

                    {project.href && (
                      <a
                        className="projects__external-link projects__external-link--card"
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.linkLabel} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="projects__skills" aria-label="Competências demonstradas">
            <div>
              <span className="projects__section-kicker">Competências em prática</span>
              <p>
                Um repertório técnico aplicado com foco no problema e no
                resultado.
              </p>
            </div>
            <ul>
              {SKILLS.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          <p className="projects__precision-note">
            <span aria-hidden="true">i</span>
            As tecnologias e automações indicadas como planejadas representam
            frentes de evolução — não funcionalidades confirmadas como
            concluídas.
          </p>
        </main>

        <div className="projects__badge-section">
          <div
            className="projects__circular-wrapper"
            style={{
              opacity: circularTextOpacity,
              transform: `scale(${1 + portalProgress * 0.25})`,
            }}
          >
            <CircularText
              text="✦ CADA PROJETO UMA HISTÓRIA ✦ DESIGN & DESENVOLVIMENTO ✦ EXPERIÊNCIAS DIGITAIS ✦ "
              spinDuration={24}
              onHover="speedUp"
            >
              <div
                className="projects__portal-logo-wrapper"
                style={{
                  transform: `scale(${starScale})`,
                  filter: `drop-shadow(0 0 ${20 * starScale}px rgba(101, 163, 13, ${starGlow}))`,
                }}
              >
                <Image
                  src="/images/LOGO.webp"
                  alt="Símbolo do portfólio de David Cardoso"
                  width={96}
                  height={96}
                  className="projects__portal-logo-img"
                  unoptimized
                  priority
                />
              </div>
            </CircularText>
          </div>
        </div>
      </div>
    </div>
  );
}
