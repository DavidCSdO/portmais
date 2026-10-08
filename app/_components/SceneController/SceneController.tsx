"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AboutIntro from "../AboutIntro";
import Projects from "../Projects";
import Showcase from "../Showcase";
import IdeaSection from "../IdeaSection";
import DockNav from "../DockNav";
import "../Hero/Hero.css";
import "./SceneController.css";

export default function SceneController() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportW, setViewportW] = useState(1920);
  const [viewportH, setViewportH] = useState(1080);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [containerH, setContainerH] = useState(1200);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

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
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrollY(sy);
          if (sy > 8 && !hasScrolled) {
            setHasScrolled(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const timer = setTimeout(() => {
      if (containerRef.current) {
        setContainerH(containerRef.current.offsetHeight);
      }
    }, 150);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [hasScrolled]);

  // 1. Hero -> About Transition distance: star zoom from Hero to About
  const transitionDistance = Math.max(viewportH * 0.85, 650);

  // 2. About scroll distance: generous scroll to comfortably read card & view full mountain
  const aboutScrollDistance = Math.max(viewportH * 1.5, 1400);

  // 3. Projects transition distance: modern differentiated liquid horizon transition
  const projectsTransitionDistance = Math.max(viewportH * 0.9, 850);

  // 4. Projects scroll distance: equally large height as about
  const projectsScrollDistance = Math.max(viewportH * 1.6, 1500);

  // 5. Showcase transition distance: modern liquid horizon wave curtain
  const showcaseTransitionDistance = Math.max(viewportH * 0.9, 850);

  // 6. Showcase scroll distance: scroll through BACK4.jpg pine forest and AccordionGallery
  const showcaseScrollDistance = Math.max(viewportH * 1.5, 1400);

  // 7. Idea (Back5) transition distance: modern liquid horizon wave curtain
  const ideaTransitionDistance = Math.max(viewportH * 0.9, 850);

  // 8. Idea (Back5) scroll distance: scroll through Conceito, MaskedHeading, FolderFloat, ScrollExpand and Footer
  const ideaScrollDistance = Math.max(viewportH * 4.2, 4200);

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

  // Idea (Back5) transition progress from 0 to 1 (modern liquid wave curtain from Showcase)
  const ideaTransOffset = showcaseScrollOffset + showcaseScrollDistance;
  const ideaTransExtraScroll = Math.max(0, scrollY - ideaTransOffset);
  const ideaTransitionProgress = Math.min(
    Math.max(ideaTransExtraScroll / ideaTransitionDistance, 0),
    1
  );

  // Idea (Back5) scroll progress from 0 to 1 (active once Idea transition finishes)
  const ideaScrollOffset = ideaTransOffset + ideaTransitionDistance;
  const ideaExtraScroll = Math.max(0, scrollY - ideaScrollOffset);
  const ideaScrollProgress = Math.min(
    Math.max(ideaExtraScroll / ideaScrollDistance, 0),
    1
  );

  // BACK2.jpg is 1200 x 2133 (aspect ratio 1200/2133)
  // Calculate rendered dimensions so image NEVER stretches and ALWAYS covers viewport
  const imgAspect = 1200 / 2133;
  let bgRenderedW = viewportW;
  let bgRenderedH = viewportW / imgAspect;
  if (bgRenderedH < viewportH) {
    bgRenderedH = viewportH;
    bgRenderedW = viewportH * imgAspect;
  }
  const maxBgScrollY = Math.max(0, bgRenderedH - viewportH);
  const bgTranslateX = -Math.max(0, (bgRenderedW - viewportW) / 2);
  const bgTranslateY = aboutScrollProgress * maxBgScrollY;

  // Content scroll: translates the card smoothly up so all 9 paragraphs are read comfortably
  const maxContentScroll = Math.max(0, containerH - viewportH + 90);
  const contentTranslateY = aboutScrollProgress * maxContentScroll;

  // Unified Star Zoom Transition states (active in Stage 1)
  let starScale = 1;
  let starTopVh = 76; // in vh
  let starGlow = 0.45;
  let heroOpacity = 1;
  let aboutOpacity = 0;
  let aboutContentOpacity = 0;
  let starOpacity = 1;

  if (
    projectsTransitionProgress > 0 ||
    projectsScrollProgress > 0 ||
    showcaseTransitionProgress > 0 ||
    showcaseScrollProgress > 0 ||
    ideaTransitionProgress > 0 ||
    ideaScrollProgress > 0
  ) {
    // Stages 2, 3, 4, 5
    heroOpacity = 0;
    aboutOpacity = 0;
    starOpacity = 0;
  } else if (transitionProgress <= 0.5) {
    // Stage 1: Hero -> About zoom in
    const p1 = transitionProgress / 0.5;
    heroOpacity = Math.max(0, 1 - Math.pow(p1, 1.3));
    aboutOpacity = Math.min(1, Math.pow(p1, 1.8));
    starScale = 1 + Math.sin(p1 * (Math.PI / 2)) * 3.2;
    starTopVh = 76 - p1 * 48; // from 76vh to 28vh
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

  // When transition to Projects starts, About fades, gently lifts and blurs
  let aboutTranslateY = 0;
  let aboutBlur = 0;
  if (projectsTransitionProgress > 0) {
    aboutOpacity = Math.max(0, 1 - Math.pow(projectsTransitionProgress, 1.2) * 1.5);
    aboutTranslateY = projectsTransitionProgress * 12; // vh
    aboutBlur = projectsTransitionProgress * 8; // px
  }

  // Projects layer entrance and exit into Showcase
  let projectsLayerOpacity = Math.min(1, Math.pow(projectsTransitionProgress, 1.4));
  let projectsLayerTranslateY = (1 - projectsTransitionProgress) * 14; // vh
  let projectsLayerBlur = 0;
  if (showcaseTransitionProgress > 0) {
    projectsLayerOpacity = Math.max(0, 1 - Math.pow(showcaseTransitionProgress, 1.2) * 1.5);
    projectsLayerTranslateY = -showcaseTransitionProgress * 12; // vh
    projectsLayerBlur = showcaseTransitionProgress * 8; // px
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

  // IdeaSection (Back5) layer entrance
  const ideaLayerOpacity = Math.min(1, Math.pow(ideaTransitionProgress, 1.4));
  const ideaLayerTranslateY = (1 - ideaTransitionProgress) * 14; // vh

  const starScrollY = aboutScrollProgress * (maxContentScroll * 0.75);

  let activeSceneId = "hero";
  if (scrollY >= ideaScrollOffset + ideaScrollDistance * 0.78) {
    activeSceneId = "contact";
  } else if (scrollY >= ideaScrollOffset - 80) {
    activeSceneId = "idea";
  } else if (scrollY >= showcaseScrollOffset - 80) {
    activeSceneId = "showcase";
  } else if (scrollY >= projectsScrollOffset - 80) {
    activeSceneId = "projects";
  } else if (scrollY >= transitionDistance - 80) {
    activeSceneId = "about";
  }

  return (
    <div
      className="scene-wrapper"
      style={{ height: `${totalSceneHeight}px` }}
    >
      {/* Minimalist Floating Island Dock (Desktop - 4: BranchedMenu + MorphSlider + SloshGauge) */}
      <DockNav
        scrollY={scrollY}
        totalHeight={totalSceneHeight}
        activeSceneId={activeSceneId}
        chapterOffsets={{
          about: transitionDistance + 60,
          projects: projectsScrollOffset + 60,
          showcase: showcaseScrollOffset + 60,
          idea: ideaScrollOffset + 60,
          contact: ideaScrollOffset + ideaScrollDistance * 0.94
        }}
      />

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
          {/* Title — handwritten reveal behind mountains */}
          <h1 className="hero__title" aria-label="DAVID">
            {["D", "A", "V", "I", "D"].map((char, index) => (
              <span
                key={index}
                className="hero__char"
                style={{ "--char-index": index } as React.CSSProperties}
              >
                <span className="hero__char-stroke" aria-hidden="true">{char}</span>
                <span className="hero__char-fill" aria-hidden="true">{char}</span>
              </span>
            ))}
          </h1>

          {/* Mountain landscape */}
          <div className="hero__mountain-wrapper">
            <Image
              src="/images/BACK1.png"
              alt="Paisagem montanhosa"
              width={2560}
              height={1080}
              className="hero__mountain"
              priority
            />
          </div>

          {/* Opening transition curtain */}
          <div className="hero__curtain" aria-hidden="true" />
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
          {/* Full vertical height mountain track (zero black gap, full mountain reveal from peak to clouds) */}
          <div
            className="about__bg-track"
            style={{
              width: `${bgRenderedW}px`,
              height: `${bgRenderedH}px`,
              transform: `translate3d(${bgTranslateX}px, -${bgTranslateY}px, 0)`,
            }}
          >
            <Image
              src="/images/BACK2.jpg"
              alt="Paisagem montanhosa com neve e nuvens"
              fill
              priority={false}
              className="about__bg-img"
              sizes="100vw"
            />
          </div>

          <div
            ref={containerRef}
            className="about__container"
            style={{
              opacity: aboutContentOpacity,
              transform: `translate3d(0, -${contentTranslateY}px, 0)`,
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
                  <p>
                    Eu gosto de criar coisas.<br />
                    Sites, sistemas, experiências, ideias.
                  </p>

                  <p>
                    Às vezes começa com um problema. Às vezes só com uma ideia que eu quero ver funcionando.
                  </p>

                  <p>
                    Eu acredito em começar simples.<br />
                    Testar. Errar. Ajustar.<br />
                    E transformar uma ideia em algo que realmente funciona.
                  </p>

                  <p>
                    Gosto de tecnologia, mas principalmente do que dá para fazer com ela.<br />
                    React. Java. SQL. APIs. Automação. IA.<br />
                    Um pouco de tudo que me ajude a construir melhor.
                  </p>

                  <p>
                    Também crio para empresas.<br />
                    Websites, sistemas e soluções digitais pensadas para cada negócio.<br />
                    Sem depender de template pronto.<br />
                    Se precisa ser criado, eu gosto de descobrir como fazer.
                  </p>

                  <p>
                    A tecnologia me ajuda a ir mais rápido.<br />
                    A IA me ajuda a explorar mais possibilidades.<br />
                    Mas ainda sou eu quem pensa, testa, quebra e constrói.
                  </p>

                  <p>
                    Eu gosto de entender o problema antes de escolher a ferramenta.<br />
                    Porque código por código não significa muita coisa.<br />
                    O resultado é o que importa.
                  </p>

                  <p>
                    No fim, sou eu por trás de tudo.<br />
                    Do primeiro rascunho ao último detalhe.<br />
                    Sem complicar. Sem fazer só por fazer.
                  </p>

                  <p>
                    Tenho uma ideia?<br />
                    Eu provavelmente já estou pensando em como construir.
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

        {/* Layer 4: Projects Scene (BACK3 mountain, FlexCarousel, card, title, circular text) */}
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
            viewportW={viewportW}
            viewportH={viewportH}
            nextPortalProgress={showcaseTransitionProgress}
          />
        </div>

        {/* Layer 5: Showcase Scene (BACK4 misty pine forest + AccordionGallery) */}
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
            viewportW={viewportW}
            viewportH={viewportH}
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
            opacity: hasScrolled ? starOpacity : undefined,
            filter: `drop-shadow(0 0 ${35 * Math.min(starScale, 2.5)}px rgba(188, 255, 126, ${starGlow}))`,
          }}
        >
          <Image
            src="/images/LOGO.png"
            alt="Logo estrela de quatro pontas"
            width={500}
            height={500}
            className="scene-star-img"
            priority
          />
        </div>
      </div>
    </div>
  );
}
