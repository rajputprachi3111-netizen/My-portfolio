'use client';

import React from 'react';
import { LightingPreset } from '@/types';

interface LightingRigProps {
  preset: LightingPreset;
}

export const LightingRig: React.FC<LightingRigProps> = ({ preset }) => {
  switch (preset) {
    case 'outdoor':
      return (
        <>
          <ambientLight intensity={0.7} color="#ffffff" />
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
            color="#fff8eb"
          />
          <directionalLight position={[-6, 4, -6]} intensity={0.5} color="#bfdbfe" />
          <hemisphereLight args={['#e0f2fe', '#334155', 0.8]} />
        </>
      );

    case 'warm':
      return (
        <>
          <ambientLight intensity={0.6} color="#ffe4e6" />
          <directionalLight position={[6, 8, 4]} intensity={2.0} color="#f59e0b" castShadow />
          <directionalLight position={[-6, 3, -4]} intensity={1.0} color="#f43f5e" />
          <pointLight position={[0, -4, 0]} intensity={0.4} color="#fb923c" />
        </>
      );

    case 'dark':
      return (
        <>
          <ambientLight intensity={0.3} color="#1e1b4b" />
          <directionalLight position={[5, 6, 4]} intensity={1.5} color="#06b6d4" />
          <directionalLight position={[-5, 4, -4]} intensity={1.6} color="#ec4899" />
          <pointLight position={[0, 4, 3]} intensity={0.8} color="#a855f7" />
        </>
      );

    case 'studio':
    default:
      return (
        <>
          <ambientLight intensity={0.6} color="#f8fafc" />
          {/* Key Light */}
          <directionalLight
            position={[5, 8, 6]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
            color="#ffffff"
          />
          {/* Fill Light */}
          <directionalLight position={[-6, 4, 2]} intensity={0.8} color="#e2e8f0" />
          {/* Rim / Back Light */}
          <directionalLight position={[0, 6, -7]} intensity={1.2} color="#818cf8" />
          <hemisphereLight args={['#ffffff', '#1e293b', 0.5]} />
        </>
      );
  }
};
