import React from "react";

export interface CarouselItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export interface FlexCarouselProps {
  items?: CarouselItem[];
  preset?: "liquid" | "ribbon" | "vortex" | "arch" | string;
  intro?: "rise" | "bloom" | "spin" | "deal" | "fade" | "none" | string;
  cardHeight?: number;
  gap?: number;
  radius?: number;
  fit?: "natural" | "portrait" | "square" | "landscape" | string;
  lensWidth?: number;
  lensHeight?: number;
  tilt?: number;
  roundness?: number;
  bend?: number;
  reach?: number;
  curl?: "twist" | "rise" | "fall" | string;
  dispersion?: number;
  liquid?: number;
  followCursor?: boolean;
  squeeze?: number;
  focusOnClick?: boolean;
  autoplay?: boolean;
  interval?: number;
  captions?: boolean;
  captureWheel?: boolean;
  onChange?: (index: number, item: CarouselItem) => void;
  onSelect?: (index: number, item: CarouselItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

declare const FlexCarousel: React.FC<FlexCarouselProps>;
export default FlexCarousel;
