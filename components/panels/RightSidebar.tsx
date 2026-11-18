'use client';

import React, { useState } from 'react';
import {
  Download,
  BookmarkPlus,
  Box,
  Cpu,
  Layers,
  Sparkles,
  Info,
  Check,
  Share2,
  HardDrive,
  Sliders,
} from 'lucide-react';
import * as THREE from 'three';
import { ModelMetadata, ExportFormat, SavedAsset } from '@/types';
import { formatNumber } from '@/lib/utils';
import { exportModel } from '@/lib/exporters';

interface RightSidebarProps {
  metadata: ModelMetadata;
  decimationRatio: number;
  activeModelObject: THREE.Object3D | null;
  creditBalance: number;
  onDecimationChange: (ratio: number) => void;
  onSaveToLibrary: (asset: SavedAsset) => void;
  onDeductCredit: (amount: number) => void;
}

const FORMAT_CONFIGS: Record<
  ExportFormat,
  { label: string; badge: string; desc: string; ext: string }
> = {
  glb: {
    label: '.GLB',
    badge: 'Web & AR',
    desc: 'Binary GLTF container with embedded textures and PBR materials.',
    ext: 'glb',
  },
  obj: {
    label: '.OBJ',
    badge: 'Universal',
    desc: 'Wavefront standard geometry with MTL texture coordinates.',
    ext: 'obj',
  },
  stl: {
    label: '.STL',
    badge: '3D Print',
    desc: 'Watertight triangulated solid mesh ready for 3D slicing software.',
    ext: 'stl',
  },
  fbx: {
    label: '.FBX',
    badge: 'Game Engines',
    desc: 'Game-engine optimized mesh ready for Unity, Unreal Engine & Godot.',
    ext: 'fbx',
  },
};

export const RightSidebar: React.FC<RightSidebarProps> = ({
  metadata,
  decimationRatio,
  activeModelObject,
  creditBalance,
  onDecimationChange,
  onSaveToLibrary,
  onDeductCredit,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('glb');
  const [isExporting, setIsExporting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const decimationPercent = Math.round(decimationRatio * 100);

  // Trigger Model Download via Three.js Exporters
  const handleExport = async () => {
    if (!activeModelObject) return;
    setIsExporting(true);

    try {
      await exportModel(activeModelObject, selectedFormat, metadata.name);
      // Optional small credit usage feedback
      if (creditBalance > 0) {
        onDeductCredit(0); // Free download of generated models
      }
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export model. Please try another format.');
    } finally {
      setIsExporting(false);
    }
  };

  // Save to persistent localStorage asset library
  const handleSaveAsset = () => {
    const newAsset: SavedAsset = {
      id: `asset_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: metadata.name,
      meshType: metadata.meshType,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      triangles: metadata.triangles,
      preset: metadata.preset,
      thumbnailUrl: metadata.thumbnailUrl,
      sourceImageUrl: metadata.sourceImageUrl,
      format: selectedFormat,
      fileSizeMb: parseFloat(
        (metadata.triangles * 0.000045 + (metadata.preset === 'high' ? 8.2 : 2.4)).toFixed(1)
      ),
    };

    onSaveToLibrary(newAsset);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <aside className="w-80 flex-shrink-0 border-l border-zinc-800/80 bg-studio-900/95 flex flex-col h-full overflow-hidden select-none z-10">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-cyan-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Inspection & Export
          </h2>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
          title="Copy project link"
        >
          {copiedLink ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3 w-3" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
        {/* Model Title & Tag */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-white truncate">{metadata.name}</h3>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 uppercase">
              {metadata.preset}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Procedurally reconstructed 3D asset
          </p>
        </div>

        {/* Live Model Metadata Card */}
        <div className="rounded-2xl border border-zinc-800/90 bg-studio-950/70 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-zinc-800/60 pb-2">
            <span className="font-medium text-zinc-300 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              Geometry Topology
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Watertight Manifold</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Triangles */}
            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/60 p-2.5">
              <span className="text-[10px] text-zinc-400 block">Triangles</span>
              <span className="font-mono font-bold text-sm text-white">
                {formatNumber(metadata.triangles)}
              </span>
              {decimationRatio < 0.98 && (
                <span className="text-[9px] text-amber-400 block">
                  ({decimationPercent}% decimated)
                </span>
              )}
            </div>

            {/* Vertices */}
            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/60 p-2.5">
              <span className="text-[10px] text-zinc-400 block">Vertices</span>
              <span className="font-mono font-bold text-sm text-zinc-200">
                {formatNumber(metadata.vertices)}
              </span>
            </div>

            {/* Bounding Box Dimensions */}
            <div className="col-span-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60 p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block">Bounding Box (X × Y × Z)</span>
                <span className="font-mono font-semibold text-xs text-zinc-300">
                  {metadata.dimensions.x}m × {metadata.dimensions.y}m × {metadata.dimensions.z}m
                </span>
              </div>
              <Box className="h-4 w-4 text-zinc-500" />
            </div>

            {/* Texture Resolution */}
            <div className="col-span-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60 p-2.5">
              <span className="text-[10px] text-zinc-400 block">Texture Maps & Resolution</span>
              <span className="font-mono text-xs text-indigo-300">
                {metadata.textureResolution}
              </span>
            </div>
          </div>
        </div>

        {/* Mesh Decimation (Polygon Reduction) Slider */}
        <div className="rounded-2xl border border-zinc-800/90 bg-studio-950/70 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-300 flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-cyan-400" />
              Mesh Decimation
            </span>
            <span className="font-mono font-bold text-xs text-cyan-400">
              {decimationPercent}%
            </span>
          </div>

          <div>
            <input
              type="range"
              min={0.1}
              max={1.0}
              step={0.05}
              value={decimationRatio}
              onChange={(e) => onDecimationChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
              <span>10% (Low-Poly)</span>
              <span>50%</span>
              <span>100% (Full)</span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 leading-tight">
            Dynamically collapses edge topology in real-time while preserving UV seam borders and surface normals.
          </p>
        </div>

        {/* Export Module */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-300 flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5 text-emerald-400" />
              Export Format
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">Ready to Bake</span>
          </div>

          {/* Format Selector Pills */}
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(FORMAT_CONFIGS) as ExportFormat[]).map((fmt) => {
              const cfg = FORMAT_CONFIGS[fmt];
              const isSelected = selectedFormat === fmt;

              return (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`flex flex-col text-left p-2.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                      : 'border-zinc-800 bg-studio-950/60 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-bold font-mono ${
                        isSelected ? 'text-emerald-400' : 'text-zinc-200'
                      }`}
                    >
                      {cfg.label}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {cfg.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 leading-tight line-clamp-1">
                    {cfg.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected format detail preview */}
          <div className="rounded-xl bg-zinc-950/60 border border-zinc-800/60 p-2.5 flex items-start gap-2">
            <Info className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-zinc-400 leading-tight">
              {FORMAT_CONFIGS[selectedFormat].desc}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 border-t border-zinc-800/80 bg-studio-950/80 backdrop-blur space-y-2">
        {/* Download Button */}
        <button
          onClick={handleExport}
          disabled={isExporting || !activeModelObject}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-3 px-4 shadow-lg shadow-emerald-950/30 transition-all active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          <span>
            {isExporting
              ? 'Exporting Mesh...'
              : `Download Model (${FORMAT_CONFIGS[selectedFormat].label})`}
          </span>
        </button>

        {/* Save to Asset Library Button */}
        <button
          onClick={handleSaveAsset}
          className={`w-full flex items-center justify-center gap-2 rounded-xl border text-xs font-medium py-2.5 px-4 transition-all ${
            isSaved
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'border-zinc-800 bg-studio-950/60 text-zinc-300 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Saved to My Assets!</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="h-4 w-4 text-zinc-400" />
              <span>Save to Asset Library</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
