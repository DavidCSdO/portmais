"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import AboutIntro from "../AboutIntro";
import Projects from "../Projects";
import Showcase from "../Showcase";
import IdeaSection from "../IdeaSection";
import DockNav from "../DockNav";
import { ContemplationExitPill } from "../NatureSpotlight";
import { useContemplation } from "../../_utils/contemplation";
import DriftingMist from "../DriftingMist";
import Hero from "../Hero";
import "../Hero/Hero.css";
import "./SceneController.css";

const Scanner = dynamic(() => import("../Backgrounds/Scanner"), { ssr: false });

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

// ------------------------------------------------------------------
// Helper: clamp(v, 0, 1)
// ------------------------------------------------------------------
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function SceneController() {
  // ----------------------------------------------------------------
  // Static refs — never cause a re-render
  // ----------------------------------------------------------------
  const stateRef = useRef({
    scrollY: 0,
    viewportW: 1920,
    viewportH: 1080,
    containerH: 1200,
    projectsContainerH: 2400,
    showcaseContainerH: 1100,
    ideaContainerH: 4200,
    ideaSectionOffsets: { resume: 0, contact: 0 },
    hasScrolled: false,
    rafId: null as number | null,
  });

  // ----------------------------------------------------------------
  // React state — only what drives JSX structure / class changes
  // ----------------------------------------------------------------
  const [lowPerformance, setLowPerformance] = useState(false);
  const [viewportW, setViewportW] = useState(1920);
  const [viewportH, setViewportH] = useState(1080);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Heights — only needed to compute totalSceneHeight for the wrapper div
  const [totalSceneHeight, setTotalSceneHeight] = useState(10000);
  const [chapterOffsets, setChapterOffsets] = useState({
    about: 800,
    projects: 2200,
    showcase: 3600,
    idea: 5000,
    experiment: 4200,
    methodology: 4400,
    resume: 4700,
  });

  const [activeSceneId, setActiveSceneId] = useState("hero");
  const [isAboutEffectsActive, setIsAboutEffectsActive] = useState(false);
  const [isProjectsEffectsActive, setIsProjectsEffectsActive] = useState(false);
  const [isShowcaseEffectsActive, setIsShowcaseEffectsActive] = useState(false);
  const [isIdeaEffectsActive, setIsIdeaEffectsActive] = useState(false);
  const [isProjectPortalActive, setIsProjectPortalActive] = useState(false);
  const [hasMountedAboutEffects, setHasMountedAboutEffects] = useState(false);
  const [hasMountedProjectsEffects, setHasMountedProjectsEffects] = useState(false);
  const [hasMountedShowcaseEffects, setHasMountedShowcaseEffects] = useState(false);
  const [hasMountedIdeaEffects, setHasMountedIdeaEffects] = useState(false);
  const sceneUiStateRef = useRef({
    activeSceneId: "hero",
    aboutEffects: false,
    projectsEffects: false,
    showcaseEffects: false,
    ideaEffects: false,
    projectPortal: false,
    aboutEffectsMounted: false,
    projectsEffectsMounted: false,
    showcaseEffectsMounted: false,
    ideaEffectsMounted: false,
  });

  const isAboutContemplating = useContemplation();

  // DOM layer refs — for direct style manipulation
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroBackdropRef = useRef<HTMLDivElement>(null);
  const aboutLayerRef = useRef<HTMLDivElement>(null);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const projectsLayerRef = useRef<HTMLDivElement>(null);
  const showcaseLayerRef = useRef<HTMLDivElement>(null);
  const ideaLayerRef = useRef<HTMLDivElement>(null);
  const starPortalRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------------------
  // Compute scene geometry (called when heights change)
  // ----------------------------------------------------------------
  const computeGeometry = useCallback(() => {
    const s = stateRef.current;
    const { viewportH, viewportW } = s;

    const transitionDistance = Math.max(viewportH * 0.85, 650);
    const aboutContentScroll = Math.max(viewportH * 0.2, s.containerH - viewportH + 90);
    const aboutScrollDistance = Math.max(viewportH * 0.65, aboutContentScroll + viewportH * 0.35, 650);
    const projectsTransitionDistance = Math.max(viewportH * 0.65, 580);
    const projectsContentScroll = Math.max(0, s.projectsContainerH - viewportH + 120);
    const projectsScrollDistance = Math.max(viewportH * 0.65, projectsContentScroll + viewportH * 0.35, 1500);
    const showcaseTransitionDistance = Math.max(viewportH * 0.9, 850);
    const showcaseContentScroll = Math.max(0, s.showcaseContainerH - viewportH + 90);
    const showcaseScrollDistance = Math.max(viewportH * 0.65, showcaseContentScroll + viewportH * 0.35, 650);
    const ideaTransitionDistance = Math.max(viewportH * 0.9, 850);
    const ideaScrollDistance = Math.max(viewportH * 3.8, s.ideaContainerH - viewportH + 250, 4000);

    const totalHeight =
      transitionDistance +
      aboutScrollDistance +
      projectsTransitionDistance +
      projectsScrollDistance +
      showcaseTransitionDistance +
      showcaseScrollDistance +
      ideaTransitionDistance +
      ideaScrollDistance +
      viewportH;

    // Offsets
    const projectsTransOffset = transitionDistance + aboutScrollDistance;
    const projectsScrollOffset = projectsTransOffset + projectsTransitionDistance;
    const showcaseTransOffset = projectsScrollOffset + projectsScrollDistance;
    const showcaseScrollOffset = showcaseTransOffset + showcaseTransitionDistance;
    const ideaTransOffset = showcaseScrollOffset + showcaseScrollDistance;
    const ideaScrollOffset = ideaTransOffset + ideaTransitionDistance;

    // Idea section sub-offsets
    const ideaContentScroll = Math.max(0, s.ideaContainerH - viewportH);
    const contentOffsetToScroll = (offset: number) =>
      ideaScrollOffset +
      ideaScrollDistance * clamp01(offset / Math.max(ideaContentScroll, 1));
    const resumeScrollOffset = contentOffsetToScroll(
      s.ideaSectionOffsets.resume || s.ideaContainerH * 0.65
    );
    const contactScrollOffset = contentOffsetToScroll(
      s.ideaSectionOffsets.contact || s.ideaContainerH * 0.88
    );

    return {
      transitionDistance,
      aboutContentScroll,
      aboutScrollDistance,
      projectsTransitionDistance,
      projectsScrollDistance,
      showcaseTransitionDistance,
      showcaseScrollDistance,
      ideaTransitionDistance,
      ideaScrollDistance,
      totalHeight,
      projectsTransOffset,
      projectsScrollOffset,
      showcaseTransOffset,
      showcaseScrollOffset,
      ideaTransOffset,
      ideaScrollOffset,
      resumeScrollOffset,
      contactScrollOffset,
      viewportW,
      viewportH,
    };
  }, []);

  // ----------------------------------------------------------------
  // rAF loop — writes styles directly, no React re-renders
  // ----------------------------------------------------------------
  const applyFrame = useCallback(() => {
    const s = stateRef.current;
    const geo = computeGeometry();
    const sy = s.scrollY;
    const {
      transitionDistance, aboutContentScroll, aboutScrollDistance,
      projectsTransitionDistance, projectsScrollDistance,
      showcaseTransitionDistance, showcaseScrollDistance,
      ideaTransitionDistance,
      projectsTransOffset, projectsScrollOffset,
      showcaseTransOffset, showcaseScrollOffset,
      ideaTransOffset, ideaScrollOffset,
      resumeScrollOffset, contactScrollOffset,
      viewportH, viewportW,
    } = geo;

    // --- Progress values ---
    const transitionProgress = clamp01(sy / transitionDistance);
    const aboutExtraScroll = Math.max(0, sy - transitionDistance);
    const aboutScrollProgress = clamp01(aboutExtraScroll / aboutScrollDistance);

    const projectsTransExtraScroll = Math.max(0, sy - projectsTransOffset);
    const projectsTransitionProgress = clamp01(projectsTransExtraScroll / projectsTransitionDistance);
    const projectsExtraScroll = Math.max(0, sy - projectsScrollOffset);
    const projectsScrollProgress = clamp01(projectsExtraScroll / projectsScrollDistance);

    const showcaseTransExtraScroll = Math.max(0, sy - showcaseTransOffset);
    const showcaseTransitionProgress = clamp01(showcaseTransExtraScroll / showcaseTransitionDistance);
    const showcaseExtraScroll = Math.max(0, sy - showcaseScrollOffset);
    const showcaseScrollProgress = clamp01(showcaseExtraScroll / showcaseScrollDistance);

    const ideaTransExtraScroll = Math.max(0, sy - ideaTransOffset);
    const ideaTransitionProgress = clamp01(ideaTransExtraScroll / ideaTransitionDistance);
    const ideaExtraScroll = Math.max(0, sy - ideaScrollOffset);
    const ideaScrollProgress = clamp01(ideaExtraScroll / Math.max(geo.ideaScrollDistance, 1));

    const maxContentScroll = aboutContentScroll;
    const contentTranslateY = aboutScrollProgress * maxContentScroll;

    // --- Star portal ---
    const isMobile = viewportW <= 600;
    const baseStarTop = isMobile ? 66 : 76;
    let starScale = 1, starTopVh = baseStarTop;
    let heroOpacity = 1, aboutOpacity = 0, aboutContentOpacity = 0, starOpacity = 1;

    const isInLaterStages =
      projectsScrollProgress > 0 ||
      showcaseTransitionProgress > 0 ||
      showcaseScrollProgress > 0 ||
      ideaTransitionProgress > 0 ||
      ideaScrollProgress > 0;

    if (isInLaterStages) {
      heroOpacity = 0; aboutOpacity = 0; aboutContentOpacity = 0; starOpacity = 0;
    } else if (projectsTransitionProgress > 0) {
      heroOpacity = 0;
      aboutOpacity = Math.max(0, 1 - Math.pow(projectsTransitionProgress, 1.2) * 1.5);
      aboutContentOpacity = Math.max(0, 1 - Math.pow(projectsTransitionProgress, 1.1) * 1.5);
      starOpacity = 0;
    } else if (transitionProgress <= 0.5) {
      const p1 = transitionProgress / 0.5;
      heroOpacity = Math.max(0, 1 - Math.pow(p1, 1.3));
      aboutOpacity = Math.min(1, Math.pow(p1, 1.8));
      starScale = 1 + Math.sin(p1 * (Math.PI / 2)) * 3.2;
      starTopVh = baseStarTop - p1 * (baseStarTop - 28);
      aboutContentOpacity = 0;
      starOpacity = 1;
    } else {
      const p2 = (transitionProgress - 0.5) / 0.5;
      heroOpacity = 0; aboutOpacity = 1;
      starScale = 4.2 - Math.sin(p2 * (Math.PI / 2)) * 3.74;
      starTopVh = 28 - p2 * 20;
      aboutContentOpacity = clamp01((p2 - 0.2) / 0.8);
      starOpacity = s.hasScrolled && aboutScrollProgress > 0
        ? Math.max(0, 1 - aboutScrollProgress * 2.2)
        : 1;
    }

    // About translate (no blur — replaced with opacity to avoid expensive GPU pass)
    let aboutTranslateY = 0;
    if (projectsTransitionProgress > 0) {
      aboutTranslateY = projectsTransitionProgress * 8;
    }

    // Projects layer
    let projectsLayerOpacity = Math.min(1, Math.pow(projectsTransitionProgress, 1.4));
    let projectsLayerTranslateY = (1 - projectsTransitionProgress) * 14;
    if (showcaseTransitionProgress > 0) {
      projectsLayerOpacity = Math.max(0, 1 - Math.pow(showcaseTransitionProgress, 1.2) * 1.5);
      projectsLayerTranslateY = -showcaseTransitionProgress * 12;
    }

    // Showcase layer (no blur)
    let showcaseLayerOpacity = Math.min(1, Math.pow(showcaseTransitionProgress, 1.4));
    let showcaseLayerTranslateY = (1 - showcaseTransitionProgress) * 14;
    if (ideaTransitionProgress > 0) {
      showcaseLayerOpacity = Math.max(0, 1 - Math.pow(ideaTransitionProgress, 1.2) * 1.5);
      showcaseLayerTranslateY = -ideaTransitionProgress * 12;
    }

    // Idea layer
    const ideaLayerOpacity = Math.min(1, Math.pow(ideaTransitionProgress, 1.4));
    const ideaLayerTranslateY = (1 - ideaTransitionProgress) * 14;

    const starScrollY = aboutScrollProgress * (maxContentScroll * 0.75);

    // --- Apply styles directly ---
    if (heroBackdropRef.current) {
      const parallaxOffset = Math.min(sy * 0.16, viewportH * 0.18);
      heroBackdropRef.current.style.transform = `translate3d(0, -${parallaxOffset}px, 0)`;
    }

    if (heroLayerRef.current) {
      heroLayerRef.current.style.opacity = String(heroOpacity);
      heroLayerRef.current.style.pointerEvents = transitionProgress > 0.4 ? "none" : "auto";
    }

    if (aboutLayerRef.current) {
      aboutLayerRef.current.style.opacity = String(aboutOpacity);
      aboutLayerRef.current.style.transform = `translate3d(0, -${aboutTranslateY}vh, 0)`;
      aboutLayerRef.current.style.pointerEvents =
        transitionProgress > 0.5 && projectsTransitionProgress < 0.4 ? "auto" : "none";
    }

    if (aboutContainerRef.current) {
      aboutContainerRef.current.style.opacity = String(aboutContentOpacity);
      aboutContainerRef.current.style.transform = `translate3d(0, -${contentTranslateY}px, 0)`;
    }

    if (projectsLayerRef.current) {
      projectsLayerRef.current.style.opacity = String(projectsLayerOpacity);
      projectsLayerRef.current.style.transform = `translate3d(0, ${projectsLayerTranslateY}vh, 0)`;
      projectsLayerRef.current.style.pointerEvents =
        projectsTransitionProgress >= 0.4 && showcaseTransitionProgress < 0.4 ? "auto" : "none";
    }

    if (showcaseLayerRef.current) {
      showcaseLayerRef.current.style.opacity = String(showcaseLayerOpacity);
      showcaseLayerRef.current.style.transform = `translate3d(0, ${showcaseLayerTranslateY}vh, 0)`;
      showcaseLayerRef.current.style.pointerEvents =
        showcaseTransitionProgress >= 0.4 && ideaTransitionProgress < 0.4 ? "auto" : "none";
    }

    if (ideaLayerRef.current) {
      ideaLayerRef.current.style.opacity = String(ideaLayerOpacity);
      ideaLayerRef.current.style.transform = `translate3d(0, ${ideaLayerTranslateY}vh, 0)`;
      ideaLayerRef.current.style.pointerEvents = ideaTransitionProgress >= 0.4 ? "auto" : "none";
    }

    if (starPortalRef.current) {
      if (s.hasScrolled) {
        const starTopOffset = starTopVh - baseStarTop;
        starPortalRef.current.style.transform = `translate3d(-50%, calc(-50% + ${starTopOffset}vh - ${starScrollY}px), 0) scale(${starScale})`;
        starPortalRef.current.style.opacity = isAboutContemplating ? "0" : String(starOpacity);
      } else {
        // Intro animation: keep inline styles cleared so CSS @keyframes heroLogoOpening runs unhindered
        starPortalRef.current.style.transform = "";
        starPortalRef.current.style.opacity = isAboutContemplating ? "0" : "";
      }
    }

    // Wave curtain
    if (waveRef.current) {
      const showWave = projectsTransitionProgress > 0 && projectsTransitionProgress < 1;
      waveRef.current.style.display = showWave ? "" : "none";
      if (showWave) {
        waveRef.current.style.transform = `translate3d(-50%, ${(1 - projectsTransitionProgress) * 105}%, 0)`;
        waveRef.current.style.opacity = String(Math.min(1, projectsTransitionProgress * 2));
      }
    }

    // Pass scroll progress via CSS custom properties to children
    // (children read these via their own rAF if needed — avoids prop drilling on scroll)
    // Expose as data attrs so child components can read via ref
    if (projectsLayerRef.current) {
      projectsLayerRef.current.dataset.scrollProgress = String(projectsScrollProgress);
      projectsLayerRef.current.dataset.portalProgress = String(showcaseTransitionProgress);
    }
    if (showcaseLayerRef.current) {
      showcaseLayerRef.current.dataset.scrollProgress = String(showcaseScrollProgress);
    }
    if (ideaLayerRef.current) {
      ideaLayerRef.current.dataset.scrollProgress = String(ideaScrollProgress);
    }

    // --- Low-frequency React state updates (threshold crossings only) ---
    const newActiveScene =
      sy >= contactScrollOffset - viewportH * 0.15 ? "contact"
      : sy >= resumeScrollOffset - viewportH * 0.15 ? "resume"
      : sy >= ideaTransOffset + ideaTransitionDistance * 0.4 ? "idea"
      : sy >= showcaseTransOffset + showcaseTransitionDistance * 0.4 ? "showcase"
      : sy >= projectsTransOffset + projectsTransitionDistance * 0.4 ? "projects"
      : sy >= transitionDistance - 80 ? "about"
      : "hero";

    if (sceneUiStateRef.current.activeSceneId !== newActiveScene) {
      sceneUiStateRef.current.activeSceneId = newActiveScene;
      setActiveSceneId(newActiveScene);
    }

    const newAboutEffects = sy >= transitionDistance * 0.35 && sy < projectsTransOffset;
    if (sceneUiStateRef.current.aboutEffects !== newAboutEffects) {
      sceneUiStateRef.current.aboutEffects = newAboutEffects;
      setIsAboutEffectsActive(newAboutEffects);
    }
    if (!sceneUiStateRef.current.aboutEffectsMounted && sy >= transitionDistance * 0.05) {
      sceneUiStateRef.current.aboutEffectsMounted = true;
      setHasMountedAboutEffects(true);
    }

    const newProjectsEffects = sy >= projectsTransOffset * 0.85 && sy < showcaseTransOffset;
    if (sceneUiStateRef.current.projectsEffects !== newProjectsEffects) {
      sceneUiStateRef.current.projectsEffects = newProjectsEffects;
      setIsProjectsEffectsActive(newProjectsEffects);
    }
    if (
      !sceneUiStateRef.current.projectsEffectsMounted &&
      sy >= projectsTransOffset + projectsTransitionDistance * 0.05
    ) {
      sceneUiStateRef.current.projectsEffectsMounted = true;
      setHasMountedProjectsEffects(true);
    }

    const newShowcaseEffects = sy >= showcaseTransOffset * 0.85 && sy < ideaTransOffset;
    if (sceneUiStateRef.current.showcaseEffects !== newShowcaseEffects) {
      sceneUiStateRef.current.showcaseEffects = newShowcaseEffects;
      setIsShowcaseEffectsActive(newShowcaseEffects);
    }
    if (
      !sceneUiStateRef.current.showcaseEffectsMounted &&
      sy >= showcaseTransOffset + showcaseTransitionDistance * 0.05
    ) {
      sceneUiStateRef.current.showcaseEffectsMounted = true;
      setHasMountedShowcaseEffects(true);
    }

    const newIdeaEffects = sy >= ideaTransOffset * 0.85;
    if (sceneUiStateRef.current.ideaEffects !== newIdeaEffects) {
      sceneUiStateRef.current.ideaEffects = newIdeaEffects;
      setIsIdeaEffectsActive(newIdeaEffects);
    }
    if (
      !sceneUiStateRef.current.ideaEffectsMounted &&
      sy >= ideaTransOffset + ideaTransitionDistance * 0.05
    ) {
      sceneUiStateRef.current.ideaEffectsMounted = true;
      setHasMountedIdeaEffects(true);
    }

    const newProjectPortalActive =
      showcaseTransitionProgress > 0 && showcaseTransitionProgress < 1;
    if (sceneUiStateRef.current.projectPortal !== newProjectPortalActive) {
      sceneUiStateRef.current.projectPortal = newProjectPortalActive;
      setIsProjectPortalActive(newProjectPortalActive);
    }

  }, [computeGeometry, isAboutContemplating]);

  const scheduleRaf = useCallback(() => {
    const s = stateRef.current;
    if (s.rafId !== null) return;
    s.rafId = requestAnimationFrame(() => {
      s.rafId = null;
      applyFrame();
    });
  }, [applyFrame]);

  // ----------------------------------------------------------------
  // Geometry recompute (on height changes) → update totalSceneHeight
  // ----------------------------------------------------------------
  const recomputeTotalHeight = useCallback(() => {
    const geo = computeGeometry();
    setTotalSceneHeight(geo.totalHeight);
    setChapterOffsets({
      about: geo.transitionDistance + 60,
      projects: geo.projectsScrollOffset + 60,
      showcase: geo.showcaseScrollOffset + 60,
      idea: geo.contactScrollOffset,
      experiment: geo.ideaScrollOffset + geo.ideaScrollDistance * 0.4,
      methodology: geo.ideaScrollOffset + geo.ideaScrollDistance * 0.62,
      resume: geo.resumeScrollOffset,
    });
    scheduleRaf();
  }, [computeGeometry, scheduleRaf]);

  // ----------------------------------------------------------------
  // Stable callbacks for children (no re-renders on every height change)
  // ----------------------------------------------------------------
  const handleProjectsHeightChange = useCallback(
    (h: number) => {
      if (Math.abs(stateRef.current.projectsContainerH - h) < 2) return;
      stateRef.current.projectsContainerH = h;
      recomputeTotalHeight();
    },
    [recomputeTotalHeight]
  );

  const handleShowcaseHeightChange = useCallback(
    (h: number) => {
      if (Math.abs(stateRef.current.showcaseContainerH - h) < 2) return;
      stateRef.current.showcaseContainerH = h;
      recomputeTotalHeight();
    },
    [recomputeTotalHeight]
  );

  const handleIdeaHeightChange = useCallback(
    (h: number) => {
      if (Math.abs(stateRef.current.ideaContainerH - h) < 2) return;
      stateRef.current.ideaContainerH = h;
      recomputeTotalHeight();
    },
    [recomputeTotalHeight]
  );

  const handleIdeaSectionOffsetsChange = useCallback(
    (offsets: { resume: number; contact: number }) => {
      stateRef.current.ideaSectionOffsets = offsets;
      recomputeTotalHeight();
    },
    [recomputeTotalHeight]
  );

  // ----------------------------------------------------------------
  // Effects
  // ----------------------------------------------------------------
  useEffect(() => {
    const reduced = detectLowPerformanceDevice();
    const rafId = reduced
      ? requestAnimationFrame(() => setLowPerformance(true))
      : null;
    if (reduced) document.documentElement.dataset.performance = "reduced";
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (reduced && document.documentElement.dataset.performance === "reduced") {
        delete document.documentElement.dataset.performance;
      }
    };
  }, []);

  useEffect(() => {
    const s = stateRef.current;

    const handleResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      s.viewportW = w; s.viewportH = h;
      if (aboutContainerRef.current) s.containerH = aboutContainerRef.current.offsetHeight;
      setViewportW(w); setViewportH(h);
      recomputeTotalHeight();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      const sy = window.scrollY;
      s.scrollY = sy;
      if (sy > 8 && !s.hasScrolled) {
        s.hasScrolled = true;
        setHasScrolled(true);
      }
      scheduleRaf();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let ro: ResizeObserver | null = null;
    if (aboutContainerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        if (aboutContainerRef.current) {
          s.containerH = aboutContainerRef.current.offsetHeight;
          recomputeTotalHeight();
        }
      });
      ro.observe(aboutContainerRef.current);
    }

    const timer = setTimeout(() => {
      if (aboutContainerRef.current) {
        s.containerH = aboutContainerRef.current.offsetHeight;
        recomputeTotalHeight();
      }
    }, 250);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (s.rafId !== null) { cancelAnimationFrame(s.rafId); s.rafId = null; }
      ro?.disconnect();
      clearTimeout(timer);
    };
  }, [recomputeTotalHeight, scheduleRaf]);

  const handleExplore = useCallback(() => {
    const geo = computeGeometry();
    window.scrollTo({ top: geo.transitionDistance + 60, behavior: "smooth" });
  }, [computeGeometry]);

  return (
    <div
      className="scene-wrapper"
      style={{ height: `${totalSceneHeight}px` }}
    >
      {/* Contemporary Floating Glass Island Dock */}
      <DockNav
        activeSceneId={activeSceneId}
        hidden={isAboutContemplating || activeSceneId === "hero"}
        chapterOffsets={chapterOffsets}
      />

      {/* Global Contemplation exit pill */}
      <ContemplationExitPill />

      {/* Sticky Fullscreen Stage */}
      <div className="scene-stage">
        {/* Layer 1: Hero */}
        <div ref={heroLayerRef} className="scene-layer scene-layer--hero">
          <Hero
            onExplore={handleExplore}
            backdropRef={heroBackdropRef}
          />
        </div>

        {/* Layer 2: About */}
        <div
          ref={aboutLayerRef}
          className="scene-layer scene-layer--about"
          data-effects-active={isAboutEffectsActive}
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          {/* Pure Code Light Atmosphere Background */}
          <div className="about__light-bg" aria-hidden="true" />

          <div className="about__scanner-layer" aria-hidden="true">
            {hasMountedAboutEffects && !lowPerformance && (
              <Scanner
                color1="#5227FF"
                color2="#FF9FFC"
                color3="#FFFFFF"
                speed={0.5}
                sweepSpeed={0.25}
                sweepWidth={1.6}
                trail={0.5}
                ripple={0.22}
                bandDensity={8}
                glow={0.6}
                scanDirection="vertical"
                colorSpread={0.7}
                scanline
                scanlineIntensity={0.5}
                mouseInteraction={viewportW > 900}
                clickEffect="ping"
                reverse={false}
                scale={1.5}
                frequency={2}
                lineWidth={1.2}
                brightness={1}
                vignette={0.3}
                grain
                grainIntensity={0.02}
                opacity={0.85}
                mouseMode="repel"
                mouseRadius={0.5}
                mouseStrength={0.7}
                intro
                lightMode={false}
                paused={!isAboutEffectsActive}
                dpr={0.9}
              />
            )}
          </div>

          <DriftingMist opacity={0.06} speedMultiplier={1} />

          <div
            ref={aboutContainerRef}
            className="about__container"
            style={{ transition: "opacity 0.5s ease" }}
          >
            <div className="about__star-spacer" />
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

        {/* Layer 3: Transition Wave Curtain */}
        <div
          ref={waveRef}
          className="scene-transition-liquid-wave"
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div className="scene-transition-wave__edge-glow" />
          <div className="scene-transition-wave__light-beam" />
        </div>

        {/* Layer 4: Projects */}
        <div
          ref={projectsLayerRef}
          className="scene-layer scene-layer--projects"
          data-effects-active={isProjectsEffectsActive}
          style={{ opacity: 0, transform: "translate3d(0, 14vh, 0)", pointerEvents: "none" }}
        >
          <Projects
            viewportH={viewportH}
            lowPerformance={lowPerformance}
            effectsActive={isProjectsEffectsActive}
            mountEffects={hasMountedProjectsEffects}
            portalTransitionActive={isProjectPortalActive}
            onContainerHeightChange={handleProjectsHeightChange}
          />
        </div>

        {/* Layer 5: Showcase */}
        <div
          ref={showcaseLayerRef}
          className="scene-layer scene-layer--showcase"
          data-effects-active={isShowcaseEffectsActive}
          style={{ opacity: 0, transform: "translate3d(0, 14vh, 0)", pointerEvents: "none" }}
        >
          <Showcase
            scrollProgress={0}
            viewportH={viewportH}
            viewportW={viewportW}
            lowPerformance={lowPerformance}
            effectsActive={isShowcaseEffectsActive}
            mountEffects={hasMountedShowcaseEffects}
            onContainerHeightChange={handleShowcaseHeightChange}
          />
        </div>

        {/* Layer 6: Idea Section */}
        <div
          ref={ideaLayerRef}
          className="scene-layer scene-layer--idea"
          data-effects-active={isIdeaEffectsActive}
          style={{ opacity: 0, transform: "translate3d(0, 14vh, 0)", pointerEvents: "none" }}
        >
          <IdeaSection
            scrollProgress={0}
            viewportW={viewportW}
            viewportH={viewportH}
            lowPerformance={lowPerformance}
            effectsActive={isIdeaEffectsActive}
            mountEffects={hasMountedIdeaEffects}
            onContainerHeightChange={handleIdeaHeightChange}
            onSectionOffsetsChange={handleIdeaSectionOffsetsChange}
          />
        </div>

        {/* Star Portal */}
        <div
          ref={starPortalRef}
          className={`scene-star-portal ${!hasScrolled ? "scene-star-portal--intro" : ""}`}
          style={{ transition: "opacity 0.5s ease" }}
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
