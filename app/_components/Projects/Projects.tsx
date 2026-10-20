"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FlexCarousel from "../FlexCarousel";
import CircularText from "../CircularText";
import DriftingMist from "../DriftingMist";
import { Threads } from "../Backgrounds";
import { useContemplation } from "../../_utils/contemplation";
import "./Projects.css";

export const PROJECT_ITEMS = [
  "car13.png",
  "car15.png",
  "car16.png",
  "car17.png",
  "car18.png",
].map((image, index) => ({
  src: `/images/${image}`,
  alt: `Estudo visual de interface ${index + 1}`,
  title: `Estudo visual ${String(index + 1).padStart(2, "0")}`,
  subtitle: "Exploração de interface",
}));

interface ProjectsProps {
  scrollProgress: number; // 0 to 1 (when inside projects scroll phase)
  viewportH: number;
  onContainerHeightChange?: (height: number) => void;
  nextPortalProgress?: number;
}

export default function Projects({
  scrollProgress,
  viewportH,
  onContainerHeightChange,
  nextPortalProgress
}: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(1600);
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
    const timer = setTimeout(updateHeight, 300);
    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHeight);
    };
  }, [onContainerHeightChange]);

  // Content scroll translation
  const maxContentScroll = Math.max(0, containerH - viewportH + 120);
  const contentTranslateY = scrollProgress * maxContentScroll;

  // Next page portal transition progress (zooms star up into the next page)
  const portalProgress =
    typeof nextPortalProgress === "number"
      ? nextPortalProgress
      : Math.min(Math.max((scrollProgress - 0.82) / 0.18, 0), 1);

  const starScale = 1 + Math.sin(portalProgress * (Math.PI / 2)) * 3.6;
  const starGlow = 0.5 + portalProgress * 0.45;
  const circularTextOpacity = Math.max(0, 1 - portalProgress * 2.2);

  return (
    <div className="projects-scene">
      {/* Pure Code Light Atmosphere Background */}
      <div className="projects__light-bg" aria-hidden="true" />

      {/* React Bits Threads Overlay in Rich Cyan & Accent Emerald */}
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
        <Threads
          color={[0.08, 0.45, 0.65]}
          accentColor={[0.1, 0.65, 0.38]}
          lineCount={65}
          amplitude={1.3}
          distance={0.35}
          enableMouseInteraction={true}
          thickness={0.8}
          softness={1.2}
          speed={0.45}
          waves={1.1}
          opacity={0.55}
        />
      </div>

      {/* Soft ambient mist */}
      <DriftingMist opacity={0.16} speedMultiplier={0.9} />

      {/* Main Content Container */}
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
        <section className="projects__featured-section" aria-label="Projetos e estudos">
          <div className="projects__section-index">
            <span className="projects__section-index-num">02</span>
            <span className="projects__section-index-line" aria-hidden="true" />
            <span>Projetos</span>
          </div>
        </section>

        <section className="projects__carousel-section" aria-label="Galeria de estudos visuais">
          <div className="projects__carousel-wrapper">
            <FlexCarousel
              items={PROJECT_ITEMS}
              preset="liquid"
              intro="rise"
              cardHeight={0.5}
              gap={12}
              squeeze={0.2}
              focusOnClick
              captions
              fit="natural"
              radius={0}
              lensWidth={0.74}
              lensHeight={1.18}
              tilt={62}
              roundness={1}
              bend={0.34}
              reach={0.38}
              curl="twist"
              dispersion={0.45}
              liquid={0}
              followCursor={false}
              autoplay={false}
              interval={4}
              captureWheel={false}
            />
          </div>
        </section>

        <section className="projects__content-section">
          <div className="projects__content-grid">
            <div className="projects__left">
              <article className="projects__case-card">
                <div className="projects__card-header">
                  <span className="projects__case-kicker">Case em destaque</span>
                  <h2 className="projects__case-title">Portfólio David Cardoso</h2>
                </div>

                <p className="projects__case-summary">
                  Um espaço para apresentar meu trabalho, mostrar como construo experiências
                  web e facilitar o contato com quem precisa de um site ou sistema sob medida.
                </p>

                <dl className="projects__case-details">
                  <div>
                    <dt>O que fiz</dt>
                    <dd>Design e desenvolvimento do portfólio, das seções às interações.</dd>
                  </div>
                  <div>
                    <dt>Stack</dt>
                    <dd>Next.js, React, TypeScript, GSAP e Matter.js.</dd>
                  </div>
                  <div>
                    <dt>Resultado</dt>
                    <dd>Projeto publicado e acessível online.</dd>
                  </div>
                </dl>

                <a
                  className="projects__case-link"
                  href="https://portmais.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acessar o projeto <span aria-hidden="true">↗</span>
                </a>
              </article>
            </div>

            <div className="projects__right">
              <span className="projects__label">
                Cada projeto começa com uma ideia.
              </span>
            </div>
          </div>
        </section>

        {/* Bottom Section: Circular Text with Center Logo & Next Page Portal Transition */}
        <div className="projects__badge-section">
          <div
            className="projects__circular-wrapper"
            style={{
              opacity: circularTextOpacity,
              transform: `scale(${1 + portalProgress * 0.25})`
            }}
          >
            <CircularText
              text="✦ CADA PROJETO UMA HISTÓRIA ✦ DESIGN & DESENVOLVIMENTO ✦ EXPERIÊNCIAS DIGITAIS ✦ "
              spinDuration={24}
              onHover="speedUp"
            >
              {/* Clean, double-sized central logo ready for next-page zoom transition */}
              <div
                className="projects__portal-logo-wrapper"
                style={{
                  transform: `scale(${starScale})`,
                  filter: `drop-shadow(0 0 ${20 * starScale}px rgba(2, 132, 199, ${starGlow}))`
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
