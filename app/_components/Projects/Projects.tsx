"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FlexCarousel from "../FlexCarousel";
import CircularText from "../CircularText";
import "./Projects.css";

export const PROJECT_ITEMS = [
  {
    src: "/images/car11.png",
    alt: "Sanchez No. 1 - Astrolábio e Alta Relojoaria",
    title: "Sanchez No. 1",
    subtitle: "Astrolábio & Craft"
  },
  {
    src: "/images/car12.png",
    alt: "Sanchez No. 1 - Mostrador Vinho e Mecanismo ETA",
    title: "Aurélien Automatic",
    subtitle: "Luxury E-Commerce"
  },
  {
    src: "/images/car13.png",
    alt: "Perfeição Mecânica - Editorial e Narrativa",
    title: "Perfeição Mecânica",
    subtitle: "Storytelling & Motion"
  },
  {
    src: "/images/car14.png",
    alt: "Identidade Visual e Sistema de Design",
    title: "Brand Identity",
    subtitle: "Design System"
  },
  {
    src: "/images/car15.png",
    alt: "Plataforma Web e Aplicação Interativa",
    title: "Digital Platform",
    subtitle: "Full-Stack Experience"
  },
  {
    src: "/images/car16.png",
    alt: "Design de Experiência e Interface Moderna",
    title: "Creative Studio",
    subtitle: "Web Experience"
  },
  {
    src: "/images/car17.png",
    alt: "Dashboard Fintech e Métricas em Tempo Real",
    title: "Fintech Dashboard",
    subtitle: "Data Analytics"
  },
  {
    src: "/images/car18.png",
    alt: "Aplicativo Mobile e Interface Touch",
    title: "Mobile Interface",
    subtitle: "App Suite"
  },
  {
    src: "/images/car19.png",
    alt: "Espaço e Arquitetura Digital",
    title: "Spatial Tech",
    subtitle: "Editorial Architecture"
  },
  {
    src: "/images/car110.png",
    alt: "Laboratório Criativo e Código Generativo",
    title: "Creative Lab",
    subtitle: "WebGL & AI"
  },
  {
    src: "/images/car111.png",
    alt: "Publicação Digital e Tipografia Editorial",
    title: "Digital Edition",
    subtitle: "High Performance"
  },
  {
    src: "/images/car112.png",
    alt: "Porto Mais - Interface e Presença Digital",
    title: "Porto Mais",
    subtitle: "Modern Web System"
  }
];

interface ProjectsProps {
  scrollProgress: number; // 0 to 1 (when inside projects scroll phase)
  viewportW: number;
  viewportH: number;
  onContainerHeightChange?: (height: number) => void;
  nextPortalProgress?: number;
}

export default function Projects({
  scrollProgress,
  viewportW,
  viewportH,
  onContainerHeightChange,
  nextPortalProgress
}: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(1600);

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

  // BACK3.jpg is 736 x 1308 (aspect ratio 736/1308)
  // Parallax calculations: cover full viewport with 0 black borders
  const imgAspect = 736 / 1308;
  let bgRenderedW = viewportW;
  let bgRenderedH = viewportW / imgAspect;
  if (bgRenderedH < viewportH) {
    bgRenderedH = viewportH;
    bgRenderedW = viewportH * imgAspect;
  }
  const maxBgScrollY = Math.max(0, bgRenderedH - viewportH);
  const bgTranslateX = -Math.max(0, (bgRenderedW - viewportW) / 2);
  const bgTranslateY = scrollProgress * maxBgScrollY;

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
      {/* Background Track: BACK3.jpg with seamless parallax */}
      <div
        className="projects__bg-track"
        style={{
          width: `${bgRenderedW}px`,
          height: `${bgRenderedH}px`,
          transform: `translate3d(${bgTranslateX}px, -${bgTranslateY}px, 0)`
        }}
      >
        <Image
          src="/images/BACK3.jpg"
          alt="Paisagem montanhosa com névoa - Projetos"
          fill
          priority={false}
          className="projects__bg-img"
          sizes="100vw"
        />
        <div className="projects__bg-overlay" aria-hidden="true" />
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="projects__container"
        style={{
          transform: `translate3d(0, -${contentTranslateY}px, 0)`
        }}
      >
        {/* Top Section: FlexCarousel with liquid wave preset */}
        <div className="projects__carousel-section">
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
              captureWheel
            />
          </div>
        </div>

        {/* Content Section: 2-Column layout matching Attachment 2 */}
        <div className="projects__content-section">
          <div className="projects__content-grid">
            {/* Left Column: Frosted Glass Card with exact text */}
            <div className="projects__left">
              <div className="projects__card">
                <div className="projects__card-header">
                  <h3 className="projects__card-title">
                    CADA PROJETO TEM UMA HISTÓRIA.<br />
                    OUTRO COMEÇO, OU APENAS ALGO QUE EU QUIS CRIAR.
                  </h3>
                </div>

                <p>
                  Alguns foram comerciais, outros testes, outros apenas para ver se funcionava.<br />
                  Alguns só existem na internet,<br />
                  outros transformaram a forma como pessoas reais trabalham ou compram coisas.
                </p>

                <p>
                  Aqui tem de tudo: ecommerce, apps, landing pages, identidades visuais...<br />
                  Do zero até o final.<br />
                  Sem templates prontos, sem atalhos fáceis.<br />
                  Construídos do jeito certo.
                </p>

                <p>
                  Tem projeto que virou empresa.<br />
                  Tem projeto que virou portfólio.<br />
                  Tem projeto que me fez passar madrugadas em claro tentando entender por que não compilava.
                </p>

                <p className="projects__card-highlight">
                  <strong>Aqui estão alguns deles:</strong><br />
                  Explore eles.
                </p>

                <p>
                  Se você quiser saber como algum deles foi feito,<br />
                  ou quiser conversar sobre como podemos fazer algo parecido para você,<br />
                  me manda uma mensagem no Instagram, pelo LinkedIn ou por email.<br />
                  Vou adorar trocar uma ideia.
                </p>

                <p>
                  Muito obrigado pela visita até aqui.<br />
                  Foi muito bom ter você por perto.<br />
                  Não se sinta tímido: me mande uma mensagem.
                </p>

                <div className="projects__card-signature">
                  DAVID. CARDOSO. DEV. DESIGN.<br />
                  PORTO MAIS.
                </div>
              </div>
            </div>

            {/* Right Column: Spaced title matching Attachment 2 */}
            <div className="projects__right">
              <span className="projects__label">
                CADA PROJETO COMEÇA COM UMA IDEIA.
              </span>
            </div>
          </div>
        </div>

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
                  filter: `drop-shadow(0 0 ${20 * starScale}px rgba(188, 255, 126, ${starGlow}))`
                }}
              >
                <Image
                  src="/images/LOGO.png"
                  alt="Porto Mais Star Logo"
                  width={96}
                  height={96}
                  className="projects__portal-logo-img"
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
