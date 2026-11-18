'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Upload,
  Sparkles,
  Scissors,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  Zap,
  Sliders,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { QualityPreset } from '@/types';
import { QUALITY_PRESETS_DATA } from '@/lib/sampleData';

interface LeftSidebarProps {
  currentImage: string | null;
  cleanedImage: string | null;
  isRemovingBg: boolean;
  autoRemoveBg: boolean;
  selectedPreset: QualityPreset;
  creditBalance: number;
  isGenerating: boolean;
  onImageSelected: (dataUrl: string, name?: string) => void;
  onToggleAutoRemoveBg: (val: boolean) => void;
  onPresetSelect: (preset: QualityPreset) => void;
  onGenerate: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentImage,
  cleanedImage,
  isRemovingBg,
  autoRemoveBg,
  selectedPreset,
  creditBalance,
  isGenerating,
  onImageSelected,
  onToggleAutoRemoveBg,
  onPresetSelect,
  onGenerate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showCleaned, setShowCleaned] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [symmetry, setSymmetry] = useState(true);
  const [quadRemesh, setQuadRemesh] = useState(true);
  const [seed, setSeed] = useState(42);

  // Clipboard paste support (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processFile = (file: File) => {
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onImageSelected(dataUrl, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const requiredCredits = QUALITY_PRESETS_DATA[selectedPreset].credits;
  const hasEnoughCredits = creditBalance >= requiredCredits;
  const activeDisplayImage = (showCleaned && cleanedImage) ? cleanedImage : currentImage;

  return (
    <aside className="w-80 flex-shrink-0 border-r border-zinc-800/80 bg-studio-900/95 flex flex-col h-full overflow-hidden select-none z-10">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Input & Generation
          </h2>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">Step 1 of 2</span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
        {/* Dropzone & Preview Container */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-300">2D Source Image</span>
            {currentImage && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-indigo-400 hover:text-indigo-300 text-[11px] font-medium"
              >
                Change Image
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                processFile(e.target.files[0]);
              }
            }}
          />

          {!currentImage ? (
            /* Empty State Dropzone */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer group ${
                isDragOver
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-zinc-700/60 hover:border-zinc-500 bg-studio-950/60'
              }`}
            >
              <div className="mb-3 rounded-full bg-zinc-800/80 p-3 text-zinc-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium text-zinc-200 text-center">
                Drag & drop image or <span className="text-indigo-400 underline">browse</span>
              </p>
              <p className="mt-1 text-[11px] text-zinc-400 text-center">
                PNG, JPG, WEBP (Max 15MB)
              </p>
              <div className="mt-3 flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-2.5 py-1 text-[10px] text-zinc-400">
                <Zap className="h-3 w-3 text-amber-400" />
                <span>Paste with Ctrl+V / Cmd+V</span>
              </div>
            </div>
          ) : (
            /* Pre-Processing Preview */
            <div className="space-y-3">
              <div className="relative rounded-2xl border border-zinc-800 overflow-hidden bg-studio-950 group">
                {/* Checkerboard Background for Transparency */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'linear-gradient(45deg, #475569 25%, transparent 25%), linear-gradient(-45deg, #475569 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #475569 75%), linear-gradient(-45deg, transparent 75%, #475569 75%)',
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                  }}
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeDisplayImage || ''}
                  alt="Source"
                  className="relative z-10 w-full h-44 object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Loading State for Remove BG */}
                {isRemovingBg && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-studio-950/80 backdrop-blur-sm">
                    <Scissors className="h-6 w-6 text-indigo-400 animate-bounce mb-2" />
                    <span className="text-xs font-medium text-zinc-300">
                      Removing Background...
                    </span>
                  </div>
                )}

                {/* View Original / Cleaned Toggle Switch */}
                {cleanedImage && (
                  <div className="absolute top-2 right-2 z-20 flex items-center rounded-lg bg-studio-950/80 p-0.5 border border-zinc-800 backdrop-blur-sm text-[10px]">
                    <button
                      onClick={() => setShowCleaned(false)}
                      className={`px-2 py-0.5 rounded ${
                        !showCleaned ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
                      }`}
                    >
                      Original
                    </button>
                    <button
                      onClick={() => setShowCleaned(true)}
                      className={`px-2 py-0.5 rounded ${
                        showCleaned ? 'bg-indigo-600 text-white font-medium' : 'text-zinc-400'
                      }`}
                    >
                      Cleaned
                    </button>
                  </div>
                )}
              </div>

              {/* Auto Remove Background Toggle */}
              <div className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-studio-950/60 p-2.5">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-indigo-500/10 p-1.5 text-indigo-400">
                    <Scissors className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-200">Auto Remove Background</p>
                    <p className="text-[10px] text-zinc-400">AI Subject Alpha Matting</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleAutoRemoveBg(!autoRemoveBg)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    autoRemoveBg ? 'bg-indigo-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      autoRemoveBg ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quality & Topology Presets */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-zinc-300">Quality & Topology</span>
            <span className="text-[11px] text-zinc-400">Mesh Resolution</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {(Object.keys(QUALITY_PRESETS_DATA) as QualityPreset[]).map((key) => {
              const preset = QUALITY_PRESETS_DATA[key];
              const isSelected = selectedPreset === key;

              return (
                <div
                  key={key}
                  onClick={() => onPresetSelect(key)}
                  className={`relative cursor-pointer rounded-xl border p-3 transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-sm'
                      : 'border-zinc-800 bg-studio-950/50 hover:border-zinc-700 hover:bg-studio-950/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">
                          {preset.label}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${preset.badgeColor}`}
                        >
                          {preset.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-400 leading-tight">
                        {preset.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        {preset.credits} {preset.credits === 1 ? 'Credit' : 'Credits'}
                      </span>
                      <span className="text-[10px] text-zinc-400">{preset.time}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-3 border-t border-zinc-800/60 pt-2 text-[10px] text-zinc-400 font-mono">
                    <span>{preset.tris}</span>
                    <span>•</span>
                    <span>{preset.texture}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advanced Options Accordion */}
        <div className="rounded-xl border border-zinc-800/80 bg-studio-950/40 overflow-hidden">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-3 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sliders className="h-3.5 w-3.5 text-zinc-400" />
              <span>Advanced Generation Controls</span>
            </div>
            {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showAdvanced && (
            <div className="p-3 pt-0 space-y-3 border-t border-zinc-800/60 text-xs">
              <div className="flex items-center justify-between pt-2">
                <span className="text-zinc-400">Bilateral Symmetry</span>
                <input
                  type="checkbox"
                  checked={symmetry}
                  onChange={(e) => setSymmetry(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Quad Remesh Solver</span>
                <input
                  type="checkbox"
                  checked={quadRemesh}
                  onChange={(e) => setQuadRemesh(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Generation Seed</span>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                  className="w-16 rounded bg-zinc-800 px-2 py-1 text-right text-xs font-mono text-zinc-200 border border-zinc-700"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary CTA Bottom Bar */}
      <div className="p-4 border-t border-zinc-800/80 bg-studio-950/80 backdrop-blur space-y-2">
        <button
          onClick={onGenerate}
          disabled={!currentImage || isGenerating || !hasEnoughCredits}
          className={`w-full relative flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-semibold text-xs tracking-wide shadow-lg transition-all ${
            !currentImage
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
              : !hasEnoughCredits
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 cursor-not-allowed'
              : isGenerating
              ? 'bg-indigo-700 text-indigo-200 cursor-wait'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-500/25 active:scale-[0.98]'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>
            {isGenerating
              ? 'Generating Mesh...'
              : !currentImage
              ? 'Upload Image to Start'
              : !hasEnoughCredits
              ? 'Insufficient Credits'
              : `Generate 3D Model (${requiredCredits} ${requiredCredits === 1 ? 'Credit' : 'Credits'})`}
          </span>
        </button>

        <p className="text-[10px] text-center text-zinc-400">
          Powered by TripoSR & InstantMesh Neural Reconstruction
        </p>
      </div>
    </aside>
  );
};
