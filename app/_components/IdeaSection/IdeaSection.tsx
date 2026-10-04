"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PaperCrumple from "../PaperCrumple";
import MaskedHeading from "../MaskedHeading";
import FolderFloat from "../FolderFloat";
import "./IdeaSection.css";

interface IdeaSectionProps {
  scrollProgress: number; // 0 to 1
  viewportW: number;
  viewportH: number;
  onContainerHeightChange?: (height: number) => void;
  contentOpacity?: number;
}

const FOLDER_ITEMS = [
  "Try a warmer palette",
  "Tighten the spacing",
  "Logo feels small",
  "Love the new hero"
];

export default function IdeaSection({
  scrollProgress,
  viewportW,
  viewportH,
  onContainerHeightChange,
  contentOpacity = 1
}: IdeaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(1500);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const h = containerRef.current.offsetHeight;
        setContainerH(h);
        onContainerHeightChange?.(h);
      }
    };

    updateHeight();
    const timer = setTimeout(updateHeight, 400);
    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHeight);
    };
  }, [onContainerHeightChange]);

  // BACK5.jpg is 1080 x 1920 (aspect ratio 1080/1920 = 0.5625)
  // Ensure background covers full screen with zero black bars and smooth vertical parallax
  const imgAspect = 1080 / 1920;
  let bgRenderedW = viewportW;
  let bgRenderedH = viewportW / imgAspect;
  if (bgRenderedH < viewportH * 1.55) {
    bgRenderedH = viewportH * 1.55;
    bgRenderedW = bgRenderedH * imgAspect;
  }
  const maxBgScrollY = Math.max(0, bgRenderedH - viewportH);
  const bgTranslateX = -Math.max(0, (bgRenderedW - viewportW) / 2);
  const bgTranslateY = scrollProgress * maxBgScrollY;

  // Content scroll translation so user scrolls smoothly through all 3 sections
  const maxContentScroll = Math.max(0, containerH - viewportH + 90);
  const contentTranslateY = scrollProgress * maxContentScroll;

  return (
    <div className="idea-scene">
      {/* Background Track: BACK5.jpg (Misty pine forest) */}
      <div
        className="idea__bg-track"
        style={{
          width: `${bgRenderedW}px`,
          height: `${bgRenderedH}px`,
          transform: `translate3d(${bgTranslateX}px, -${bgTranslateY}px, 0)`
        }}
      >
        <Image
          src="/images/BACK5.jpg"
          alt="Floresta de pinheiros e névoa - BACK5"
          fill
          priority={false}
          className="idea__bg-img"
          sizes="100vw"
        />
        <div className="idea__bg-overlay" aria-hidden="true" />
      </div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="idea__container"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, -${contentTranslateY}px, 0)`
        }}
      >
        {/* Section Header Badge */}
        <div className="idea__header">
          <div className="idea__badge">
            <span className="idea__badge-dot" />
            <span className="idea__badge-text">CONCEITO & EXPERIMENTAÇÃO</span>
          </div>
        </div>

        {/* 1. Part 1: Top - Paper Crumple Carta in glowing neon-blue frame */}
        <section className="idea__letter-section">
          <div className="idea__letter-frame">
            <span className="idea__letter-corner idea__letter-corner--tl" />
            <span className="idea__letter-corner idea__letter-corner--tr" />
            <span className="idea__letter-corner idea__letter-corner--bl" />
            <span className="idea__letter-corner idea__letter-corner--br" />

            <PaperCrumple
              src="/images/letter.jpg"
              alt="Carta manuscrita para amassar"
              width={380}
              height={450}
              sceneHeight={390}
              releaseBehavior="restore"
              crumpleAmount={0.85}
              crumpleDuration={0.55}
              releaseDuration={0.4}
              foldCount={6}
              foldSharpness={0.6}
              wrinkleDepth={0.65}
              creaseStrength={0.18}
              paperColor="#f4f0e8"
              paperTexture={0.08}
              draggable
              returnToOrigin
              imageFit="contain"
              roughness={0.92}
              lightIntensity={1.8}
              lightAngle={-35}
              shadow
              shadowOpacity={0.16}
              dragRotation={10}
              dragRadius={180}
              rotation={0}
              seed={7}
              detail={64}
              disabled={false}
            />
          </div>

          <div className="idea__letter-hint">
            <span>✦ Segure e arraste para amassar a carta • Solte para restaurar</span>
          </div>
        </section>

        {/* 2. Part 2: Middle - MaskedHeading + "TUDO COMEÇA COM UMA IDEIA" */}
        <section className="idea__heading-section">
          <div className="idea__heading-inner">
            <div className="idea__masked-wrapper">
              <MaskedHeading
                text="Designed in the details"
                mediaType="image"
                src="/images/BACK2.jpg"
                fillScale={1.3}
                parallax={26}
                reveal="rise"
                trigger="view"
                drift={18}
                brightness={1.05}
                saturation={1.1}
                grayscale={false}
                duration={1.2}
                stagger={0.09}
                align="center"
                weight={800}
                tracking={-0.03}
                lineHeight={1.08}
                textScale={0.11}
              />
            </div>

            <div className="idea__center-title" aria-hidden="true">
              <span className="idea__center-title-line">TUDO COMEÇA</span>
              <span className="idea__center-title-line">COM UMA IDEIA</span>
            </div>
          </div>
        </section>

        {/* 3. Part 3: Bottom - FolderFloat with physics notes */}
        <section className="idea__folder-section">
          <div className="idea__folder-stage">
            <FolderFloat
              items={FOLDER_ITEMS}
              label="Design feedback"
              sublabel="4 notes"
              trigger="hover"
              closeOnSelect={false}
              physics={true}
              drift={0.5}
              folderColor="#38383f"
              frontColor="#4e4e58"
              paperColor="#ffffff"
              itemColor="#ffffff"
              itemTextColor="#18181b"
              labelColor="#ffffff"
              width={220}
              height={156}
              radius={14}
              spread={190}
              lift={30}
              tilt={8}
              flapAngle={34}
              restAngle={16}
              openDuration={520}
              stagger={45}
              bounce={0.35}
            />
          </div>

          <div className="idea__folder-hint">
            <span>✦ Passe o mouse na pasta para abrir • Arraste os cards de feedback</span>
          </div>
        </section>
      </div>
    </div>
  );
}
