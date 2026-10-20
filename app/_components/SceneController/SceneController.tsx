"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AboutIntro from "../AboutIntro";
import Projects from "../Projects";
import Showcase from "../Showcase";
import IdeaSection from "../IdeaSection";
import DockNav from "../DockNav";
import { ContemplationExitPill } from "../NatureSpotlight";
import { useContemplation } from "../../_utils/contemplation";
import DriftingMist from "../DriftingMist";
import { Scanner } from "../Backgrounds";
import Hero from "../Hero";
import "../Hero/Hero.css";
import "./SceneController.css";

function detectLowPerformanceDevice() {
  if (typeof window === "undefined") return false;

  const device = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    device.connection?.saveData === true ||
    (device.deviceMemory !== undefined && device.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4)
  );
}

export default function SceneController() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportW, setViewportW] = useState(1920);
  const [viewportH, setViewportH] = useState(1080);
  const [lowPerformance] = useState(detectLowPerformanceDevice);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [containerH, setContainerH] = useState(1200);
  const [showcaseContainerH, setShowcaseContainerH] = useState(1100);
  const [ideaContainerH, setIdeaContainerH] = useState(4200);
  const isAboutContemplating = useContemplation();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lowPerformance) document.documentElement.dataset.performance = "reduced";

    return () => {
      if (document.documentElement.dataset.performance === "reduced") {
        delete document.documentElement.dataset.performance;
      }
    };
  }, [lowPerformance]);

  useEffect(() => {
    let ticking = false;
    let scrollFrame = 0;

    const handleResize = () => {
      setViewportW(window.innerWidth);
      setViewportH(window.innerHeight);
      if (containerRef.current) {
        setContainerH(containerRef.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      if (!ticking) {
        scrollFrame = window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrollY(sy);
          if (sy > 8) setHasScrolled(true);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        if (containerRef.current) {
          setContainerH(containerRef.current.offsetHeight);
        }
      });
      ro.observe(containerRef.current);
    }

    const timer = setTimeout(() => {
      if (containerRef.current) {
        setContainerH(containerRef.current.offsetHeight);
      }
    }, 250);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(scrollFrame);
      ro?.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // 1. Hero -> About Transition distance: star zoom from Hero to About
  const transitionDistance = Math.max(viewportH * 0.85, 650);

  // 2. About scroll distance: enough room to read the introduction comfortably
  const aboutContentScroll = Math.max(0, containerH - viewportH + 90);
  const aboutScrollDistance = Math.max(
    viewportH * 0.65,
    aboutContentScroll + viewportH * 0.35,
    650
  );

  // 3. Projects transition distance: smooth fluid horizon wave transition
  const projectsTransitionDistance = Math.max(viewportH * 0.65, 580);

  // 4. Projects scroll distance: equally large height as about
  const projectsScrollDistance = Math.max(viewportH * 1.6, 1500);

  // 5. Showcase transition distance: modern liquid horizon wave curtain
  const showcaseTransitionDistance = Math.max(viewportH * 0.9, 850);

  // 6. Showcase scroll distance
  const showcaseContentScroll = Math.max(0, showcaseContainerH - viewportH + 90);
  const showcaseScrollDistance = Math.max(
    viewportH * 0.65,
    showcaseContentScroll + viewportH * 0.35,
    650
  );

  // 7. Idea (Back5) transition distance: modern liquid horizon wave curtain
  const ideaTransitionDistance = Math.max(viewportH * 0.9, 850);

  // 8. Idea section scroll distance
  const ideaScrollDistance = Math.max(viewportH * 3.8, ideaContainerH - viewportH + 250, 4000);

  // Total scrollable height for scene-wrapper so scrollbar matches perfectly
  const totalSceneHeight =
    transitionDistance +
    aboutScrollDistance +
    projectsTransitionDistance +
    projectsScrollDistance +
    showcaseTransitionDistance +
    showcaseScrollDistance +
    ideaTransitionDistance +
    ideaScrollDistance +
    viewportH;

  // Transition progress from 0 to 1 (Hero -> About)
  const transitionProgress = Math.min(Math.max(scrollY / transitionDistance, 0), 1);

  // About scroll progress from 0 to 1 (active once Hero transition finishes)
  const aboutExtraScroll = Math.max(0, scrollY - transitionDistance);
  const aboutScrollProgress = Math.min(Math.max(aboutExtraScroll / aboutScrollDistance, 0), 1);

  // Projects transition progress from 0 to 1 (active once About finishes scrolling)
  const projectsTransOffset = transitionDistance + aboutScrollDistance;
  const isAboutEffectsActive =
    scrollY >= transitionDistance * 0.35 && scrollY < projectsTransOffset;
  const projectsTransExtraScroll = Math.max(0, scrollY - projectsTransOffset);
  const projectsTransitionProgress = Math.min(
    Math.max(projectsTransExtraScroll / projectsTransitionDistance, 0),
    1
  );

  // Projects scroll progress from 0 to 1 (active once Projects transition finishes)
  const projectsScrollOffset = projectsTransOffset + projectsTransitionDistance;
  const projectsExtraScroll = Math.max(0, scrollY - projectsScrollOffset);
  const projectsScrollProgress = Math.min(
    Math.max(projectsExtraScroll / projectsScrollDistance, 0),
    1
  );

  // Showcase transition progress from 0 to 1 (modern liquid wave curtain from Projects)
  const showcaseTransOffset = projectsScrollOffset + projectsScrollDistance;
  const showcaseTransExtraScroll = Math.max(0, scrollY - showcaseTransOffset);
  const showcaseTransitionProgress = Math.min(
    Math.max(showcaseTransExtraScroll / showcaseTransitionDistance, 0),
    1
  );

  // Showcase scroll progress from 0 to 1 (active once Showcase transition finishes)
  const showcaseScrollOffset = showcaseTransOffset + showcaseTransitionDistance;
  const showcaseExtraScroll = Math.max(0, scrollY - showcaseScrollOffset);
  const showcaseScrollProgress = Math.min(
    Math.max(showcaseExtraScroll / showcaseScrollDistance, 0),
    1
  );

  // Approach transition progress from 0 to 1
  const ideaTransOffset = showcaseScrollOffset + showcaseScrollDistance;
  const isShowcaseEffectsActive =
    scrollY >= showcaseTransOffset && scrollY < ideaTransOffset + ideaTransitionDistance;
  const ideaTransExtraScroll = Math.max(0, scrollY - ideaTransOffset);
  const ideaTransitionProgress = Math.min(
    Math.max(ideaTransExtraScroll / ideaTransitionDistance, 0),
    1
  );

  // Approach scroll progress from 0 to 1 (active once its transition finishes)
  const ideaScrollOffset = ideaTransOffset + ideaTransitionDistance;
  const ideaExtraScroll = Math.max(0, scrollY - ideaScrollOffset);
  const ideaScrollProgress = Math.min(
    Math.max(ideaExtraScroll / ideaScrollDistance, 0),
    1
  );

  // Content scroll: translates the introduction card smoothly into view.
  const maxContentScroll = aboutContentScroll;
  const contentTranslateY = aboutScrollProgress * maxContentScroll;

  // Unified Star Zoom Transition states (active in Stage 1)
  const isMobile = viewportW <= 600;
  const baseStarTop = isMobile ? 66 : 76;
  let starScale = 1;
  let starTopVh = baseStarTop; // in vh
  let starGlow = 0.45;
  let heroOpacity = 1;
  let aboutOpacity = 0;
  let aboutContentOpacity = 0;
  let starOpacity = 1;

  if (
    projectsScrollProgress > 0 ||
    showcaseTransitionProgress > 0 ||
    showcaseScrollProgress > 0 ||
    ideaTransitionProgress > 0 ||
    ideaScrollProgress > 0
  ) {
    // Stages 3, 4, 5
    heroOpacity = 0;
    aboutOpacity = 0;
    aboutContentOpacity = 0;
    starOpacity = 0;
  } else if (projectsTransitionProgress > 0) {
    // Stage 2 -> 3 Transition: About content and mountain fade out harmoniously as Projects enters
    heroOpacity = 0;
    aboutOpacity = Math.max(0, 1 - Math.pow(projectsTransitionProgress, 1.2) * 1.5);
    aboutContentOpacity = Math.max(0, 1 - Math.pow(projectsTransitionProgress, 1.1) * 1.5);
    starOpacity = 0;
  } else if (transitionProgress <= 0.5) {
    // Stage 1: Hero -> About zoom in
    const p1 = transitionProgress / 0.5;
    heroOpacity = Math.max(0, 1 - Math.pow(p1, 1.3));
    aboutOpacity = Math.min(1, Math.pow(p1, 1.8));
    starScale = 1 + Math.sin(p1 * (Math.PI / 2)) * 3.2;
    starTopVh = baseStarTop - p1 * (baseStarTop - 28); // from baseStarTop to 28vh
    starGlow = 0.45 + p1 * 0.45;
    aboutContentOpacity = 0;
    starOpacity = 1;
  } else {
    // Stage 1: Hero -> About landing at 8vh
    const p2 = (transitionProgress - 0.5) / 0.5;
    heroOpacity = 0;
    aboutOpacity = 1;
    starScale = 4.2 - Math.sin(p2 * (Math.PI / 2)) * 3.74;
    starTopVh = 28 - p2 * 20; // lands at 8vh
    starGlow = 0.9 - p2 * 0.45;
    aboutContentOpacity = Math.min(1, Math.max(0, (p2 - 0.2) / 0.8));
    starOpacity =
      hasScrolled && aboutScrollProgress > 0
        ? Math.max(0, 1 - aboutScrollProgress * 2.2)
        : 1;
  }

  // When transition to Projects starts, About gently lifts and blurs
  let aboutTranslateY = 0;
  let aboutBlur = 0;
  if (projectsTransitionProgress > 0) {
    aboutTranslateY = projectsTransitionProgress * 8; // vh
    aboutBlur = projectsTransitionProgress * 6; // px
  }

  // Projects layer entrance and exit into Showcase
  let projectsLayerOpacity = Math.min(1, Math.pow(projectsTransitionProgress, 1.4));
  let projectsLayerTranslateY = (1 - projectsTransitionProgress) * 14; // vh
  if (showcaseTransitionProgress > 0) {
    projectsLayerOpacity = Math.max(0, 1 - Math.pow(showcaseTransitionProgress, 1.2) * 1.5);
    projectsLayerTranslateY = -showcaseTransitionProgress * 12; // vh
  }

  // Showcase layer entrance and exit into IdeaSection
  let showcaseLayerOpacity = Math.min(1, Math.pow(showcaseTransitionProgress, 1.4));
  let showcaseLayerTranslateY = (1 - showcaseTransitionProgress) * 14; // vh
  let showcaseLayerBlur = 0;
  if (ideaTransitionProgress > 0) {
    showcaseLayerOpacity = Math.max(0, 1 - Math.pow(ideaTransitionProgress, 1.2) * 1.5);
    showcaseLayerTranslateY = -ideaTransitionProgress * 12; // vh
    showcaseLayerBlur = ideaTransitionProgress * 8; // px
  }

  // Approach layer entrance
  const ideaLayerOpacity = Math.min(1, Math.pow(ideaTransitionProgress, 1.4));
  const ideaLayerTranslateY = (1 - ideaTransitionProgress) * 14; // vh

  const starScrollY = aboutScrollProgress * (maxContentScroll * 0.75);

  let activeSceneId = "hero";
  if (scrollY >= ideaScrollOffset + ideaScrollDistance * 0.9) {
    activeSceneId = "contact";
  } else if (scrollY >= ideaTransOffset + ideaTransitionDistance * 0.4) {
    activeSceneId = "idea";
  } else if (scrollY >= showcaseTransOffset + showcaseTransitionDistance * 0.4) {
    activeSceneId = "showcase";
  } else if (scrollY >= projectsTransOffset + projectsTransitionDistance * 0.4) {
    activeSceneId = "projects";
  } else if (scrollY >= transitionDistance - 80) {
    activeSceneId = "about";
  }

  const handleExplore = () => {
    window.scrollTo({
      top: transitionDistance + 60,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="scene-wrapper"
      style={{ height: `${totalSceneHeight}px` }}
    >
      {/* Contemporary Floating Glass Island Dock */}
      <DockNav
        scrollY={scrollY}
        totalHeight={totalSceneHeight}
        activeSceneId={activeSceneId}
        hidden={isAboutContemplating}
        chapterOffsets={{
          about: transitionDistance + 60,
          projects: projectsScrollOffset + 60,
          showcase: showcaseScrollOffset + 60,
          idea: ideaScrollOffset + ideaScrollDistance * 0.08,
          experiment: ideaScrollOffset + ideaScrollDistance * 0.4,
          methodology: ideaScrollOffset + ideaScrollDistance * 0.62,
          contact: ideaScrollOffset + ideaScrollDistance * 0.9,
        }}
      />

      {/* Global Contemplation exit pill (outside transformed layers, above the dock) */}
      <ContemplationExitPill />

      {/* Sticky Fullscreen Stage */}
      <div className="scene-stage">
        {/* Layer 1: Hero Scene */}
        <div
          className="scene-layer scene-layer--hero"
          style={{
            opacity: heroOpacity,
            pointerEvents: transitionProgress > 0.4 ? "none" : "auto",
          }}
        >
          <Hero onExplore={handleExplore} />
        </div>

        {/* Layer 2: About Scene */}
        <div
          className="scene-layer scene-layer--about"
          style={{
            opacity: aboutOpacity,
            transform: `translate3d(0, -${aboutTranslateY}vh, 0)`,
            filter: aboutBlur > 0 ? `blur(${aboutBlur}px)` : undefined,
            pointerEvents:
              transitionProgress > 0.5 && projectsTransitionProgress < 0.4
                ? "auto"
                : "none",
          }}
        >
          {/* Pure Code Light Atmosphere Background */}
          <div className="about__light-bg" aria-hidden="true" />

          <div className="about__scanner-layer" aria-hidden="true">
            <Scanner
              color1="#5227FF"
              color2="#FF9FFC"
              color3="#FFFFFF"
              speed={lowPerformance ? 0.25 : 0.5}
              sweepSpeed={0.25}
              sweepWidth={1.6}
              trail={0.5}
              ripple={0.22}
              bandDensity={lowPerformance ? 8 : 11}
              glow={0.6}
              scanDirection="vertical"
              colorSpread={0.7}
              scanline
              scanlineIntensity={0.5}
              mouseInteraction={!lowPerformance && viewportW > 900}
              clickEffect={lowPerformance ? "none" : "ping"}
              reverse={false}
              scale={1.5}
              frequency={2}
              lineWidth={1.2}
              brightness={1}
              vignette={0.3}
              grain={!lowPerformance}
              grainIntensity={0.04}
              opacity={lowPerformance ? 0.65 : 0.85}
              mouseMode="repel"
              mouseRadius={0.5}
              mouseStrength={0.7}
              intro
              lightMode={false}
              paused={!isAboutEffectsActive}
              dpr={lowPerformance ? 1 : 1.5}
            />
          </div>

          {/* Soft ambient drifting mist */}
          <DriftingMist opacity={0.06} speedMultiplier={1} />

          <div
            ref={containerRef}
            className="about__container"
            style={{
              opacity: isAboutContemplating ? 0 : aboutContentOpacity,
              transform: `translate3d(0, -${contentTranslateY}px, 0)`,
              transition: "opacity 0.5s ease",
              pointerEvents: isAboutContemplating ? "none" : undefined,
            }}
          >
            {/* Generous Star clearance spacer so star NEVER touches the card */}
            <div className="about__star-spacer" />

            {/* Two-column Content with the user's preferred generous scales */}
            <div className="about__content">
              <div className="about__left">
                <AboutIntro />
              </div>

              <div className="about__right">
                <div className="about__card">
                  <h3 className="about__card-heading">Do escopo à publicação</h3>
                  <p>
                    O trabalho começa com o objetivo do negócio, o público e as tarefas que
                    precisam funcionar. Com isso, definimos uma solução adequada ao contexto,
                    em vez de partir de um modelo genérico.
                  </p>

                  <p>
                    O escopo pode reunir arquitetura de páginas, interface responsiva,
                    formulários, áreas administrativas, APIs e estrutura de dados. As entregas
                    são alinhadas antes do desenvolvimento.
                  </p>

                  <p>
                    A experiência de uso é considerada desde o início: conteúdo organizado,
                    navegação clara e interfaces que funcionam em celulares, tablets e
                    computadores.
                  </p>

                  <p>
                    A implementação combina ferramentas adequadas ao escopo, como React,
                    Next.js, TypeScript, Java, SQL e integrações externas. Animações e recursos
                    de IA entram quando resolvem uma necessidade concreta.
                  </p>

                  <p>
                    O processo inclui alinhamento de requisitos, desenvolvimento, validação e
                    preparação para publicação. A comunicação é direta durante as etapas e a
                    entrega inclui orientação para os próximos passos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3: Transition Wave Curtain (Modern Differentiated Liquid Horizon) */}
        {projectsTransitionProgress > 0 && projectsTransitionProgress < 1 && (
          <div
            className="scene-transition-liquid-wave"
            style={{
              transform: `translate3d(-50%, ${(1 - projectsTransitionProgress) * 105}%, 0)`,
              opacity: Math.min(1, projectsTransitionProgress * 2),
            }}
            aria-hidden="true"
          >
            <div className="scene-transition-wave__edge-glow" />
            <div className="scene-transition-wave__light-beam" />
          </div>
        )}

        {/* Layer 4: Projects Scene */}
        <div
          className="scene-layer scene-layer--projects"
          style={{
            opacity: projectsLayerOpacity,
            transform: `translate3d(0, ${projectsLayerTranslateY}vh, 0)`,
            pointerEvents:
              projectsTransitionProgress >= 0.4 && showcaseTransitionProgress < 0.4
                ? "auto"
                : "none",
          }}
        >
          <Projects
            scrollProgress={projectsScrollProgress}
            viewportH={viewportH}
            nextPortalProgress={showcaseTransitionProgress}
          />
        </div>

        {/* Layer 5: Capabilities Scene */}
        <div
          className="scene-layer scene-layer--showcase"
          style={{
            opacity: showcaseLayerOpacity,
            transform: `translate3d(0, ${showcaseLayerTranslateY}vh, 0)`,
            filter: showcaseLayerBlur > 0 ? `blur(${showcaseLayerBlur}px)` : undefined,
            pointerEvents:
              showcaseTransitionProgress >= 0.4 && ideaTransitionProgress < 0.4
                ? "auto"
                : "none",
          }}
        >
          <Showcase
            scrollProgress={showcaseScrollProgress}
            viewportH={viewportH}
            viewportW={viewportW}
            lowPerformance={lowPerformance}
            effectsActive={isShowcaseEffectsActive}
            onContainerHeightChange={setShowcaseContainerH}
          />
        </div>



        {/* Layer 6: Idea / Back5 Scene (NeuralNexus + MaskedHeading + FolderFloat) */}
        <div
          className="scene-layer scene-layer--idea"
          style={{
            opacity: ideaLayerOpacity,
            transform: `translate3d(0, ${ideaLayerTranslateY}vh, 0)`,
            pointerEvents: ideaTransitionProgress >= 0.4 ? "auto" : "none",
          }}
        >
          <IdeaSection
            scrollProgress={ideaScrollProgress}
            viewportW={viewportW}
            viewportH={viewportH}
            onContainerHeightChange={setIdeaContainerH}
          />
        </div>

        {/* Layer 6: The Unified Star Portal */}
        <div
          className={`scene-star-portal ${!hasScrolled ? "scene-star-portal--intro" : ""}`}
          style={{
            top: hasScrolled ? `${starTopVh}vh` : undefined,
            transform: hasScrolled
              ? `translate3d(-50%, calc(-50% - ${starScrollY}px), 0) scale(${starScale})`
              : undefined,
            opacity: isAboutContemplating ? 0 : (hasScrolled ? starOpacity : undefined),
            transition: "opacity 0.5s ease",
            filter: `drop-shadow(0 0 ${35 * Math.min(starScale, 2.5)}px rgba(2, 132, 199, ${starGlow}))`,
          }}
        >
          <Image
            src="/images/LOGO.webp"
            alt="Logo estrela de quatro pontas"
            width={500}
            height={500}
            className="scene-star-img"
            unoptimized
            priority
          />
        </div>
      </div>
    </div>
  );
}
