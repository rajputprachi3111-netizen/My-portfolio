'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import {
  RotateCcw,
  Sun,
  Eye,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Grid as GridIcon,
} from 'lucide-react';
import {
  SampleItemKey,
  ShadingMode,
  LightingPreset,
  GenerationState,
} from '@/types';
import { LightingRig } from './LightingRig';
import { ModelRenderer } from './ModelRenderer';
import { GenerationProgressOverlay } from './GenerationProgressOverlay';

interface ThreeViewportProps {
  meshType: SampleItemKey | 'custom';
  shadingMode: ShadingMode;
  lightingPreset: LightingPreset;
  decimationRatio: number;
  autoRotate: boolean;
  textureUrl?: string | null;
  previewImage?: string;
  generationState: GenerationState;
  onShadingChange: (mode: ShadingMode) => void;
  onLightingChange: (preset: LightingPreset) => void;
  onAutoRotateToggle: () => void;
  onMeshStatsUpdate: (stats: {
    triangles: number;
    vertices: number;
    dimensions: { x: number; y: number; z: number };
  }) => void;
  onModelReady: (object: THREE.Object3D) => void;
  onCancelGeneration?: () => void;
}

export const ThreeViewport: React.FC<ThreeViewportProps> = ({
  meshType,
  shadingMode,
  lightingPreset,
  decimationRatio,
  autoRotate,
  textureUrl,
  previewImage,
  generationState,
  onShadingChange,
  onLightingChange,
  onAutoRotateToggle,
  onMeshStatsUpdate,
  onModelReady,
  onCancelGeneration,
}) => {
  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset Camera smoothly to default 45 degree angle
  const handleResetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.object.position.set(0, 2, 5.5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);

  // Keyboard accessibility: 'R' to reset camera, 'Space' to toggle turntable, 'W' to toggle wireframe
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleResetCamera();
      } else if (e.code === 'Space') {
        e.preventDefault();
        onAutoRotateToggle();
      } else if (e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        onShadingChange(shadingMode === 'wireframe' ? 'pbr' : 'wireframe');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleResetCamera, onAutoRotateToggle, onShadingChange, shadingMode]);

  // Fullscreen toggle handler
  const handleFullscreenToggle = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full w-full bg-studio-950 overflow-hidden select-none flex flex-col"
    >
      {/* 3D Generation Progress Overlay */}
      {generationState.isGenerating && (
        <GenerationProgressOverlay
          currentStep={generationState.currentStep}
          progress={generationState.progress}
          statusText={generationState.statusText}
          elapsedSeconds={generationState.elapsedSeconds}
          previewImage={previewImage}
          onCancel={onCancelGeneration}
        />
      )}

      {/* Floating Top-Left Status Indicator */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 rounded-full border border-zinc-800/80 bg-studio-900/80 px-3 py-1.5 backdrop-blur-md shadow-lg">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-zinc-300">
            WebGL 2.0 • 60 FPS Studio Viewport
          </span>
        </div>
      </div>

      {/* Floating Center-Bottom Viewport Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-2xl border border-zinc-800/80 bg-studio-900/90 p-1.5 shadow-2xl backdrop-blur-md">
        {/* Shading Mode Switcher */}
        <div className="flex items-center rounded-xl bg-studio-950/80 p-0.5 border border-zinc-800/60">
          <button
            onClick={() => onShadingChange('pbr')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              shadingMode === 'pbr'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
            title="Textured PBR Shading"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>PBR</span>
          </button>
          <button
            onClick={() => onShadingChange('clay')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              shadingMode === 'clay'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
            title="Clay / Matcap Model Inspection"
          >
            <span>Clay</span>
          </button>
          <button
            onClick={() => onShadingChange('wireframe')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              shadingMode === 'wireframe'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
            title="Topology Wireframe (Press W)"
          >
            <span>Wireframe</span>
          </button>
        </div>

        <div className="h-5 w-[1px] bg-zinc-800" />

        {/* HDRI Lighting Preset Selector */}
        <div className="flex items-center rounded-xl bg-studio-950/80 p-0.5 border border-zinc-800/60">
          {(['studio', 'outdoor', 'warm', 'dark'] as LightingPreset[]).map((preset) => (
            <button
              key={preset}
              onClick={() => onLightingChange(preset)}
              className={`capitalize px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                lightingPreset === preset
                  ? 'bg-zinc-800 text-amber-300 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title={`${preset} lighting`}
            >
              {preset}
            </button>
          ))}
        </div>

        <div className="h-5 w-[1px] bg-zinc-800" />

        {/* Auto-Rotate Turntable */}
        <button
          onClick={onAutoRotateToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            autoRotate
              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              : 'border-zinc-800/80 bg-studio-950/80 text-zinc-400 hover:text-white'
          }`}
          title="Toggle Turntable Rotation (Spacebar)"
        >
          {autoRotate ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          <span>Turntable</span>
        </button>

        {/* Reset Camera (R) */}
        <button
          onClick={handleResetCamera}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-zinc-800/80 bg-studio-950/80 text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all text-xs font-medium"
          title="Reset Camera Viewport (Key: R)"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset (R)</span>
        </button>

        {/* Grid Toggle */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-1.5 rounded-xl border text-xs transition-all ${
            showGrid
              ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
              : 'border-zinc-800/80 bg-studio-950/80 text-zinc-400 hover:text-white'
          }`}
          title="Toggle Ground Grid"
        >
          <GridIcon className="h-3.5 w-3.5" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={handleFullscreenToggle}
          className="p-1.5 rounded-xl border border-zinc-800/80 bg-studio-950/80 text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all text-xs"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Main Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 2, 5.5], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      >
        <LightingRig preset={lightingPreset} />

        <ModelRenderer
          meshType={meshType}
          shadingMode={shadingMode}
          decimationRatio={decimationRatio}
          autoRotate={autoRotate}
          textureUrl={textureUrl}
          onMeshStatsUpdate={onMeshStatsUpdate}
          onModelReady={onModelReady}
        />

        {showGrid && (
          <Grid
            renderOrder={-1}
            position={[0, -1.8, 0]}
            infiniteGrid
            cellSize={0.5}
            cellThickness={0.6}
            cellColor="#2e384d"
            sectionSize={2.0}
            sectionThickness={1.2}
            sectionColor="#4f46e5"
            fadeDistance={30}
            fadeStrength={1.5}
          />
        )}

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={1.5}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2 + 0.15}
        />
      </Canvas>
    </div>
  );
};
