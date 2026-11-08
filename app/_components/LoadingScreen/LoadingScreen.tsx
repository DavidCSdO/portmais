"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./LoadingScreen.css";

function waitForImage(image: HTMLImageElement) {
  if (image.complete) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const finish = () => {
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });
}

export default function LoadingScreen() {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let hasFinished = false;
    let exitTimeout: number | undefined;

    const finish = () => {
      if (hasFinished) return;
      hasFinished = true;
      window.clearTimeout(fallbackTimeout);
      setIsExiting(true);
      exitTimeout = window.setTimeout(() => setIsVisible(false), 650);
    };

    const intro = document.querySelector(".scene-star-portal--intro");
    const introAnimations = intro?.getAnimations() ?? [];
    const introReady =
      introAnimations.length > 0
        ? Promise.all(introAnimations.map((animation) => animation.finished.catch(() => undefined)))
        : Promise.resolve();

    const heroImages = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        ".hero__backdrop-image, .hero__mountain, .scene-star-img",
      ),
    );
    const imagesReady = Promise.all(heroImages.map(waitForImage));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const fallbackTimeout = window.setTimeout(finish, 5000);

    void Promise.all([introReady, imagesReady, fontsReady]).then(finish);

    return () => {
      window.clearTimeout(fallbackTimeout);
      window.clearTimeout(exitTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`loading-screen${isExiting ? " loading-screen--exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Carregando o portfólio"
    >
      <div className="loading-screen__grid" aria-hidden="true" />
      <div className="loading-screen__frame" aria-hidden="true">
        <span className="loading-screen__frame-corner loading-screen__frame-corner--top-left" />
        <span className="loading-screen__frame-corner loading-screen__frame-corner--top-right" />
        <span className="loading-screen__frame-corner loading-screen__frame-corner--bottom-left" />
        <span className="loading-screen__frame-corner loading-screen__frame-corner--bottom-right" />
      </div>

      <div className="loading-screen__header" aria-hidden="true">
        <span>DAVID CARDOSO</span>
        <span>PORTFÓLIO DIGITAL</span>
      </div>

      <div className="loading-screen__core" aria-hidden="true">
        <div className="loading-screen__orbit loading-screen__orbit--outer" />
        <div className="loading-screen__orbit loading-screen__orbit--inner" />
        <div className="loading-screen__halo" />
        <div className="loading-screen__mark">
          <Image
            src="/images/LOGO.webp"
            alt=""
            width={240}
            height={160}
            sizes="180px"
            loading="eager"
          />
        </div>
      </div>

      <div className="loading-screen__footer" aria-hidden="true">
        <div className="loading-screen__caption">
          <span>PREPARANDO PORTFÓLIO</span>
          <span>SITES &amp; SISTEMAS WEB</span>
        </div>
        <div className="loading-screen__progress">
          <span />
        </div>
      </div>
    </div>
  );
}
