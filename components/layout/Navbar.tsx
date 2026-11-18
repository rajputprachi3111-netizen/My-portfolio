'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Zap,
  FolderHeart,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Activity,
  Layers,
  Crown,
} from 'lucide-react';
import { SAMPLE_IMAGES } from '@/lib/sampleData';
import { SampleImage } from '@/types';

interface NavbarProps {
  creditBalance: number;
  savedAssetsCount: number;
  onSelectSample: (sample: SampleImage) => void;
  onOpenPricing: () => void;
  onToggleAssetDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  creditBalance,
  savedAssetsCount,
  onSelectSample,
  onOpenPricing,
  onToggleAssetDrawer,
}) => {
  const [showSampleDropdown, setShowSampleDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSampleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 border-b border-zinc-800/80 bg-studio-900/90 backdrop-blur-md px-4 flex items-center justify-between select-none z-20">
      {/* Brand & Version Badge */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-md shadow-indigo-500/25">
            <Box className="h-5 w-5" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm tracking-tight text-white">
              MeshCraft<span className="text-cyan-400"> AI</span>
            </span>
            <span className="hidden sm:inline-block rounded-md bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-700/50">
              Studio v2.4
            </span>
          </div>
        </div>

        {/* Quick Sample Loader Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowSampleDropdown(!showSampleDropdown)}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-studio-950/60 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Try Sample Image</span>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
          </button>

          {showSampleDropdown && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-zinc-800 bg-studio-900 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Preset Studio Models
              </div>
              <div className="space-y-1">
                {SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      onSelectSample(sample);
                      setShowSampleDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 rounded-xl p-2 text-left hover:bg-zinc-800/70 transition-colors group"
                  >
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden bg-studio-950 border border-zinc-750 p-1 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sample.thumbnail}
                        alt={sample.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-zinc-200 group-hover:text-indigo-300 truncate">
                        {sample.name}
                      </p>
                      <p className="text-[10px] text-zinc-400 truncate">{sample.category}</p>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {sample.polyEstimate.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Worker Status, Credits, Upgrade, My Assets */}
      <div className="flex items-center gap-3">
        {/* Engine Status Indicator */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-800/80 bg-studio-950/60 px-2.5 py-1 text-[11px] text-zinc-400">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Simulation Engine Active</span>
        </div>

        {/* Credit Balance Pill & Upgrade Button */}
        <div className="flex items-center rounded-xl border border-zinc-800 bg-studio-950/80 p-0.5 shadow-sm">
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
            <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400/20" />
            <span className="font-mono font-bold text-white">{creditBalance}</span>
            <span className="text-zinc-400 text-[11px]">Credits</span>
          </div>
          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[11px] font-semibold text-zinc-950 hover:brightness-110 shadow transition-all"
          >
            <Crown className="h-3 w-3" />
            <span>Upgrade to Pro</span>
          </button>
        </div>

        {/* My Assets Drawer Toggle Button */}
        <button
          onClick={onToggleAssetDrawer}
          className="relative flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-studio-950/60 hover:bg-zinc-800/60 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-all"
        >
          <FolderHeart className="h-4 w-4 text-indigo-400" />
          <span>My Assets</span>
          {savedAssetsCount > 0 && (
            <span className="ml-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 px-1.5 py-0.2 text-[10px] font-bold font-mono text-indigo-300">
              {savedAssetsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
