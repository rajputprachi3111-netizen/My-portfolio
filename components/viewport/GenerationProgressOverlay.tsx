'use client';

import React from 'react';
import { Sparkles, CheckCircle2, Loader2, X } from 'lucide-react';
import { formatTime } from '@/lib/utils';

interface GenerationProgressOverlayProps {
  currentStep: number;
  progress: number;
  statusText: string;
  elapsedSeconds: number;
  previewImage?: string;
  onCancel?: () => void;
}

const STEPS = [
  { id: 1, title: 'Removing Background', detail: 'Isolating subject & alpha matting' },
  { id: 2, title: 'Estimating Depth & Multi-View', detail: 'Inferring 360° geometry normals' },
  { id: 3, title: 'Generating 3D Mesh', detail: 'Marching tetrahedra mesh extraction' },
  { id: 4, title: 'Baking PBR Textures', detail: 'Synthesizing albedo, normal & roughness' },
];

export const GenerationProgressOverlay: React.FC<GenerationProgressOverlayProps> = ({
  currentStep,
  progress,
  statusText,
  elapsedSeconds,
  previewImage,
  onCancel,
}) => {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-studio-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800/80 bg-studio-900/95 p-6 shadow-2xl shadow-indigo-950/30">
        {/* Cancel Button */}
        {onCancel && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            title="Cancel generation"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Synthesizing 3D Model</h3>
            <p className="text-xs text-zinc-400">
              AI Neural Reconstruction Pipeline • {formatTime(elapsedSeconds)} elapsed
            </p>
          </div>
        </div>

        {/* Holographic Image Scanner Preview */}
        {previewImage && (
          <div className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-950/60 shadow-inner flex items-center justify-center">
            {/* Checkerboard */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(45deg, #374151 25%, transparent 25%), linear-gradient(-45deg, #374151 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #374151 75%), linear-gradient(-45deg, transparent 75%, #374151 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt="Source preview"
              className="relative z-10 max-h-full max-w-full object-contain p-2"
            />
            {/* Scanner Line */}
            <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-scanner" />
          </div>
        )}

        {/* Progress Bar & Percentage */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-zinc-300">{statusText}</span>
            <span className="font-mono font-bold text-indigo-400">{Math.round(progress)}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${Math.max(4, Math.min(100, progress))}%` }}
            />
            <div className="absolute inset-0 bg-white/10 animate-shimmer" />
          </div>
        </div>

        {/* 4-Step Animated Pipeline Stepper */}
        <div className="space-y-3">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id || progress >= 100;
            const isCurrent = currentStep === step.id && progress < 100;
            const isPending = currentStep < step.id;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 rounded-lg p-2.5 transition-colors ${
                  isCurrent
                    ? 'bg-indigo-500/10 border border-indigo-500/30'
                    : isCompleted
                    ? 'bg-zinc-850/60 border border-emerald-500/20'
                    : 'opacity-40 border border-transparent'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 text-indigo-400 animate-spin" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-zinc-600 flex items-center justify-center text-[10px] text-zinc-500">
                      {step.id}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs font-semibold ${
                        isCurrent
                          ? 'text-indigo-300'
                          : isCompleted
                          ? 'text-zinc-200'
                          : 'text-zinc-400'
                      }`}
                    >
                      Step {step.id}: {step.title}
                    </p>
                    {isCurrent && (
                      <span className="text-[10px] font-medium text-indigo-400 animate-pulse">
                        Processing...
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
