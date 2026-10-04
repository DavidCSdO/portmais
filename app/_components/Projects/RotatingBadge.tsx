"use client";

import Image from "next/image";
import "./RotatingBadge.css";

interface RotatingBadgeProps {
  text?: string;
  size?: number;
  className?: string;
}

export default function RotatingBadge({
  text = "✦ CADA PROJETO UMA NOVA HISTÓRIA ✦ DESIGN & CÓDIGO ✦ EXPERIÊNCIAS DIGITAIS ✦",
  size = 200,
  className = "",
}: RotatingBadgeProps) {
  // Radius of the text circle
  const r = 76;
  const circumference = Math.round(2 * Math.PI * r);

  return (
    <div
      className={`rotating-badge ${className}`.trim()}
      style={{ "--badge-size": `${size}px` } as React.CSSProperties}
      aria-label={text}
    >
      {/* Outer subtle decorative ring */}
      <div className="rotating-badge__outer-ring" />

      {/* Spinning SVG with textPath */}
      <div className="rotating-badge__spinner">
        <svg
          viewBox="0 0 200 200"
          className="rotating-badge__svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="rotatingBadgePath"
              d={`M 100, 100 m -${r}, 0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
            />
          </defs>
          <text className="rotating-badge__text">
            <textPath
              href="#rotatingBadgePath"
              startOffset="0%"
              textLength={`${circumference}`}
              lengthAdjust="spacing"
            >
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center 4-pointed Star Core */}
      <div className="rotating-badge__center">
        <div className="rotating-badge__core-glow" />
        <Image
          src="/images/LOGO.png"
          alt="Porto Mais Star"
          width={32}
          height={32}
          className="rotating-badge__star-icon"
        />
      </div>
    </div>
  );
}
