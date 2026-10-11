'use client';

import React from 'react';
import DriftingNeedles from './DriftingNeedles';
import './ForestAtmosphere.css';

interface ForestAtmosphereProps {
  className?: string;
  showNeedles?: boolean;
  needlesOpacity?: number;
}

export default function ForestAtmosphere({
  className = '',
  showNeedles = true,
  needlesOpacity = 0.5,
}: ForestAtmosphereProps) {
  return (
    <div className={`forest-atmosphere-container ${className}`.trim()} aria-hidden="true">
      {showNeedles && (
        <DriftingNeedles opacity={needlesOpacity} />
      )}
    </div>
  );
}
