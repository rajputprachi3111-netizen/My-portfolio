import React, { useState } from 'react';
import { BLENDER_PROJECTS } from '../../data/portfolioData';
import { BlenderModelPreview } from '../3d/BlenderModelPreview';
import { soundEffects } from '../hud/SoundEffects';
import {
  X,
  Box,
  Cpu,
  Layers,
  Sparkles,
  RotateCw,
  Eye,
  FileCode,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface BlenderFoundryModalProps {
  onClose: () => void;
}

export const BlenderFoundryModal: React.FC<BlenderFoundryModalProps> = ({ onClose }) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('football-3d');
  const [viewMode, setViewMode] = useState<'rendered' | 'solid' | 'wireframe'>('rendered');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const currentProject =
    BLENDER_PROJECTS.find((p) => p.id === selectedModelId) || BLENDER_PROJECTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-void-950/80 backdrop-blur-md animate-fade-in">
      <div className="hud-panel-amber w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl border border-amber-500/40 shadow-glow-amber flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-950/80 flex items-center justify-between bg-void-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-400">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                  SECTOR VULCAN-II // DIGITAL SCULPTING LAB
                </span>
                <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-400 text-[9px] font-mono rounded font-bold">
                  BLENDER & CYCLES
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-orbitron font-bold text-white tracking-wide">
                The Blender Foundry
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playBeep(640, 0.08);
              onClose();
            }}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-amber-400 hover:bg-amber-400/10 transition-all"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model Tabs Selection */}
        <div className="px-4 sm:px-5 py-2.5 border-b border-amber-950/60 bg-void-950/60 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            {BLENDER_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => {
                  soundEffects.playBeep(1020, 0.05);
                  setSelectedModelId(proj.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  selectedModelId === proj.id
                    ? 'bg-amber-500 text-black font-bold shadow-glow-amber'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{proj.title}</span>
                <span className="text-[10px] opacity-75 font-mono hidden sm:inline">
                  ({proj.fileSource})
                </span>
              </button>
            ))}
          </div>

          {/* Viewport Render Mode Controls */}
          <div className="flex items-center gap-1 bg-void-950 p-1 rounded-lg border border-slate-800">
            {(['rendered', 'solid', 'wireframe'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  soundEffects.playBeep(1200, 0.04);
                  setViewMode(mode);
                }}
                className={`px-2 py-1 rounded text-[10px] font-mono uppercase transition-all ${
                  viewMode === mode
                    ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
            <button
              onClick={() => {
                soundEffects.playBeep(850, 0.04);
                setAutoRotate(!autoRotate);
              }}
              className={`p-1 rounded text-[10px] transition-all ${
                autoRotate ? 'text-amber-400' : 'text-slate-500'
              }`}
              title="Toggle Auto Rotation"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          {/* Top Half: Interactive 3D Model Viewport */}
          <div className="relative">
            <BlenderModelPreview
              type={currentProject.sampleType}
              wireframe={viewMode === 'wireframe'}
              viewMode={viewMode}
              autoRotate={autoRotate}
            />

            {/* Source Blender File Badge */}
            <div className="absolute top-3 right-3 bg-void-950/90 border border-amber-500/50 px-2.5 py-1 rounded-md text-[10px] font-mono text-amber-300 flex items-center gap-1.5 shadow-lg">
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>SOURCE: {currentProject.fileSource}</span>
            </div>
          </div>

          {/* Bottom Half: Detailed Technical Specs Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Specs & Hardware Radar */}
            <div className="p-4 rounded-xl border border-slate-800 bg-void-950/60 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 border-b border-slate-800 pb-1.5">
                <span className="font-bold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> ENGINE TELEMETRY
                </span>
                <span className="text-white bg-amber-500/20 px-2 py-0.5 rounded font-semibold">
                  {currentProject.specs.engine}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">POLYGON COUNT:</span>
                  <span className="text-white font-bold">{currentProject.specs.polygonCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">MATERIAL SHADER:</span>
                  <span className="text-amber-300 text-right max-w-[210px] truncate">
                    {currentProject.specs.materials}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">STUDIO LIGHTING:</span>
                  <span className="text-slate-300 text-right max-w-[210px] truncate">
                    {currentProject.specs.lighting}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                {currentProject.description}
              </p>
            </div>

            {/* Topology & Sculpting Highlights */}
            <div className="p-4 rounded-xl border border-slate-800 bg-void-950/60 space-y-2.5">
              <div className="text-xs font-mono font-bold text-amber-400 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> MODELING SPECIFICATIONS
              </div>

              <ul className="space-y-2">
                {currentProject.specs.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-void-950/90 border-t border-amber-950/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            READY FOR GLTF/GLB WEB-STREAMING & CYCLES PRODUCTION
          </span>
          <span className="text-slate-500 hidden sm:inline">PBR PIPELINE VALIDATED</span>
        </div>
      </div>
    </div>
  );
};
