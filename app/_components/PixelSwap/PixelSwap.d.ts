import React from 'react';

export interface PixelSwapProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  pixelSize?: number;
  gap?: number;
  pixelRadius?: number;
  pixelSpin?: number;
  pixelScale?: number;
  fade?: boolean;
  duration?: number;
  pixelDuration?: number;
  pattern?:
    | 'random'
    | 'center'
    | 'edges'
    | 'left-to-right'
    | 'right-to-left'
    | 'top-to-bottom'
    | 'bottom-to-top'
    | 'diagonal'
    | 'spiral';
  randomness?: number;
  easing?: string;
  trigger?: 'hover' | 'click' | 'none';
  initialActive?: boolean;
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
  onComplete?: (active: boolean) => void;
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare const PixelSwap: React.FC<PixelSwapProps>;
export default PixelSwap;
