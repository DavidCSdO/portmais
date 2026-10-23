"use client";

import { useEffect, useState } from "react";
import "./ResumeSection.css";

const STACK_ROTATION = [
  ["SQL Server", "Consultas SQL", "Relatórios SQL"],
  ["React · Node.js", "JavaScript", "React"],
  ["APIs REST", "Integração de sistemas"],
];

const FOCUS_AREAS = [
  {
    number: "01",
    title: "ERP & negócio",
    detail: "Protheus, ADVPL/TLPP, rotinas e relatórios SQL.",
  },
  {
    number: "02",
    title: "Web & integrações",
    detail: "React, JavaScript, Node.js e APIs REST.",
  },
  {
    number: "03",
    title: "Operação",
    detail: "Compras hospitalares, processos diretos e licitações.",
  },
];

const EXPERIENCE = [
  {
    period: "ABR 2025 — FEV 2026",
    role: "Desenvolvedor Jr.",
    context: "ERP Protheus · ADVPL / TLPP",
    details: [
      "Desenvolvimento e customização de rotinas para o ERP Protheus em ADVPL e TLPP.",
      "Criação de relatórios com consultas SQL para apoiar áreas operacionais e administrativas.",
      "Correção de falhas, manutenção e evolução contínua de sistemas internos.",
    ],
  },
  {
    period: "JUN 2022 — ABR 2025",
    role: "Desenvolvimento de software",
    context: "Soluções corporativas e aplicações web",
    details: [
      "Criação de rotinas, consultas SQL e automações para processos administrativos.",
      "Desenvolvimento de interfaces web com React e JavaScript.",
      "Integração de aplicações com serviços e APIs REST.",
    ],
  },
  {
    period: "2021 — PROMOÇÃO EM 2023",
    role: "Comprador",
    context: "SEHAC · Petrópolis, RJ",
    details: [
      "Condução de compras diretas e processos de licitação para diferentes setores hospitalares.",
      "Acompanhamento das demandas e etapas administrativas de aquisição.",
      "Ingresso como apoio administrativo e promoção ao cargo de comprador em 2023.",
    ],
  },
];

const SKILL_GROUPS = [
  {
    number: "01",
    title: "ERP & desenvolvimento",
    description: "Customização de sistemas de gestão e lógica de negócio.",
    skills: ["ADVPL", "TLPP", "TOTVS Protheus", "Java"],
  },
  {
    number: "02",
    title: "Web & integração",
    description: "Interfaces, serviços e comunicação entre aplicações.",
    skills: ["JavaScript", "React", "Node.js", "APIs REST"],
  },
  {
    number: "03",
    title: "Dados & práticas",
    description: "Consultas, versionamento e organização do trabalho.",
    skills: ["SQL Server", "Git & GitHub", "Integração de sistemas", "Scrum"],
  },
];

const EDUCATION = [
  {
    course: "Engenharia de Software",
    institution: "UNICESUMAR · Bacharelado",
    period: "2022 — atual",
  },
  {
    course: "Desenvolvimento de Software",
    institution: "SERRATEC · Residência em TIC · 720 horas",
  },
  {
    course: "Ensino Médio",
    institution: "Colégio Estadual Dom Pedro II",
    period: "2020",
  },
];

const PROJECTS = [
  {
    name: "Soluções empresariais",
    description:
      "Rotinas personalizadas no TOTVS Protheus, relatórios e consultas SQL voltados às necessidades das áreas usuárias.",
    stack: ["TOTVS Protheus", "ADVPL / TLPP", "SQL Server"],
    number: "01",
  },
  {
    name: "Portfólio pessoal",
    description:
      "Site responsivo desenvolvido para apresentar projetos, com experiências interativas e animações.",
    stack: ["React", "JavaScript", "GSAP"],
    number: "02",
  },
  {
    name: "ATOM Web Solutions",
    description:
      "Criação de websites institucionais com atenção a desempenho, SEO e clareza na navegação.",
    stack: ["React", "Performance", "SEO"],
    number: "03",
  },
];

const CERTIFICATIONS = [
  "Scrum Fundamentals Certified",
  "Introdução à Qualidade de Software",
  "Formação de Pregoeiros",
  "Blockchain · ECOA / PUC-Rio",
  "Excel avançado",
  "Formações TOTVS",
];

const RESUME_FACTS = [
  { value: "720h", label: "Residência em TIC · SERRATEC" },
  { value: "2022", label: "Início do bacharelado em Engenharia de Software" },
  { value: "03", label: "Frentes: ERP, web e operações" },
];

export default function ResumeSection() {
  const [stackIndices, setStackIndices] = useState([0, 0, 0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let currentNode = 0;
    const interval = window.setInterval(() => {
      const nodeToUpdate = currentNode;
      currentNode = (currentNode + 1) % STACK_ROTATION.length;
      setStackIndices((indices) =>
        indices.map((index, nodeIndex) =>
          nodeIndex === nodeToUpdate
            ? (index + 1) % STACK_ROTATION[nodeIndex].length
            : index,
        ),
      );
    }, 3800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="resume-stage"
      id="curriculo"
      aria-labelledby="resume-title"
    >
      <div className="resume-stage__inner">
        <header className="resume-header">
          <div className="resume-header__topline">
            <span className="resume-label">
              <span aria-hidden="true" />
              Currículo · 2026
            </span>
            <a
              className="resume-download"
              href="/CV%20David%20Cardoso.pdf"
              download="David-Cardoso-CV.pdf"
            >
              Baixar currículo <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="resume-header__main">
            <div>
              <p className="resume-kicker">David Cardoso · Petrópolis, RJ</p>
              <h2 id="resume-title">
                Software que resolve
                <br />
                <span>o trabalho real.</span>
              </h2>
            </div>
            <p className="resume-header__summary">
              Customização do ERP Protheus em ADVPL e TLPP, consultas SQL e
              manutenção de sistemas internos. Desenvolvimento web com React
              e JavaScript, além de integrações com APIs REST.
            </p>
          </div>

          <div className="resume-header__rule">
            <span>ADVPL / TLPP</span>
            <span>REACT</span>
            <span>SQL</span>
          </div>
        </header>

        <div className="resume-focus-grid" aria-label="Frentes de atuação">
          {FOCUS_AREAS.map((area) => (
            <article className="resume-focus" key={area.number}>
              <span>{area.number}</span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="resume-facts" aria-label="Destaques da trajetória">
          {RESUME_FACTS.map((fact) => (
            <article className="resume-fact" key={fact.value}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </article>
          ))}
        </div>

        <div className="resume-content">
          <section className="resume-experience" aria-labelledby="resume-experience-title">
            <div className="resume-section-heading">
              <span className="resume-index">01 / TRAJETÓRIA</span>
              <h3 id="resume-experience-title">Experiência</h3>
            </div>

            <div className="resume-timeline">
              {EXPERIENCE.map((item) => (
                <article className="resume-job" key={item.role}>
                  <div className="resume-job__marker" aria-hidden="true" />
                  <p className="resume-job__period">{item.period}</p>
                  <div className="resume-job__heading">
                    <h4>{item.role}</h4>
                    <span>{item.context}</span>
                  </div>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <section className="resume-stack-map" aria-label="Tecnologias">
              <div className="resume-stack-map__heading">
                <span className="resume-index">ERP + WEB</span>
                <span>FERRAMENTAS DA TRAJETÓRIA</span>
              </div>
              <div className="resume-stack-map__diagram">
                <div className="resume-stack-map__core">
                  <span>PLATAFORMA</span>
                  <strong>Protheus</strong>
                  <div className="resume-stack-map__languages">
                    <span>ADVPL</span>
                    <span>TLPP</span>
                  </div>
                </div>
                <div className="resume-stack-map__branches">
                  <div className="resume-stack-map__node resume-stack-map__node--data">
                    <span>DADOS</span>
                    <strong
                      key={STACK_ROTATION[0][stackIndices[0]]}
                      className="resume-stack-map__value"
                    >
                      {STACK_ROTATION[0][stackIndices[0]]}
                    </strong>
                  </div>
                  <div className="resume-stack-map__node resume-stack-map__node--web">
                    <span>WEB</span>
                    <strong
                      key={STACK_ROTATION[1][stackIndices[1]]}
                      className="resume-stack-map__value"
                    >
                      {STACK_ROTATION[1][stackIndices[1]]}
                    </strong>
                  </div>
                  <div className="resume-stack-map__node resume-stack-map__node--api">
                    <span>INTEGRAÇÃO</span>
                    <strong
                      key={STACK_ROTATION[2][stackIndices[2]]}
                      className="resume-stack-map__value"
                    >
                      {STACK_ROTATION[2][stackIndices[2]]}
                    </strong>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <aside className="resume-sidebar">
            <section className="resume-skills" aria-labelledby="resume-skills-title">
              <div className="resume-section-heading">
                <span className="resume-index">02 / CONHECIMENTOS</span>
                <h3 id="resume-skills-title">Competências técnicas</h3>
              </div>
              <div className="resume-skill-groups">
                {SKILL_GROUPS.map((group) => (
                  <article className="resume-skill-group" key={group.number}>
                    <div className="resume-skill-group__heading">
                      <span>{group.number}</span>
                      <h4>{group.title}</h4>
                    </div>
                    <p>{group.description}</p>
                    <ul>
                      {group.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-education" aria-labelledby="resume-education-title">
              <div className="resume-section-heading">
                <span className="resume-index">03 / FORMAÇÃO</span>
                <h3 id="resume-education-title">Estudos</h3>
              </div>
              <div className="resume-education-list">
                {EDUCATION.map((item) => (
                  <article key={item.course}>
                    <div>
                      <h4>{item.course}</h4>
                      <p>{item.institution}</p>
                    </div>
                    {item.period && <span>{item.period}</span>}
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-certification-section" aria-labelledby="resume-certifications-title">
              <div className="resume-section-heading">
                <span className="resume-index">04 / APERFEIÇOAMENTO</span>
                <h3 id="resume-certifications-title">Cursos & certificações</h3>
              </div>
              <ul className="resume-certification-list">
                {CERTIFICATIONS.map((certification) => (
                  <li key={certification}>
                    <span aria-hidden="true">↗</span>
                    {certification}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <section className="resume-projects" aria-labelledby="resume-projects-title">
          <div className="resume-projects__heading">
            <div className="resume-section-heading">
              <span className="resume-index">05 / NA PRÁTICA</span>
              <h3 id="resume-projects-title">Projetos & soluções</h3>
            </div>
            <p>
              Da rotina de negócio à experiência digital: soluções com
              objetivos, contextos e escalas diferentes.
            </p>
          </div>

          <div className="resume-project-grid">
            {PROJECTS.map((project) => (
              <article className="resume-project" key={project.number}>
                <span className="resume-project__number">{project.number}</span>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <ul className="resume-project__stack">
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <span className="resume-project__arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </section>

        <footer className="resume-footer">
          <div>
            <span className="resume-index">PERFIL PROFISSIONAL</span>
            <p>
              Experiência que conecta tecnologia e rotina de negócio: do
              desenvolvimento e manutenção de sistemas à compreensão dos
              processos que eles precisam atender.
            </p>
          </div>
          <a href="mailto:cardosodavid92@gmail.com">
            Vamos conversar <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
