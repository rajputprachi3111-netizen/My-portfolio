import React, { useState } from 'react';
import { ActiveSection } from '../../types';
import { SYSTEM_INFO } from '../../data/portfolioData';
import { soundEffects } from './SoundEffects';
import {
  Volume2,
  VolumeX,
  BatteryCharging,
  Zap,
  Globe2,
  HelpCircle,
  Terminal,
  RotateCcw
} from 'lucide-react';

interface HudOverlayProps {
  activeSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
  is2DMode: boolean;
  onToggle2DMode: () => void;
  onOpenHelp: () => void;
}

export const HudOverlay: React.FC<HudOverlayProps> = ({
  activeSection,
  onSelectSection,
  is2DMode,
  onToggle2DMode,
  onOpenHelp
}) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleToggleAudio = () => {
    const newState = soundEffects.toggleSound();
    setAudioEnabled(newState);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-3 sm:p-5">
      {/* Top HUD Command Bar */}
      <header className="pointer-events-auto flex items-center justify-between gap-3 w-full">
        {/* Left: Call Sign & Title */}
        <div
          onClick={() => {
            soundEffects.playBeep(880, 0.08);
            onSelectSection('overview');
          }}
          className="hud-panel cursor-pointer px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-[#00F0FF]/40 shadow-glow-cyan hover:border-[#00F0FF] transition-all flex items-center gap-3 group"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF] flex items-center justify-center font-orbitron font-extrabold text-[#00F0FF] text-xs group-hover:scale-105 transition-transform">
              EI
            </div>
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] absolute -bottom-0.5 -right-0.5 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#00F0FF] tracking-widest font-bold">
                [CALLSIGN: {SYSTEM_INFO.callsign}]
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <h1 className="text-xs sm:text-sm font-orbitron font-bold text-white tracking-wider group-hover:text-[#00F0FF] transition-colors">
              {SYSTEM_INFO.title}
            </h1>
          </div>
        </div>

        {/* Right: Telemetry Toggles & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Audio FX Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`hud-panel px-2.5 py-2 sm:px-3 sm:py-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
              audioEnabled
                ? 'border-[#00F0FF] text-[#00F0FF] shadow-glow-cyan bg-[#00F0FF]/15'
                : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
            title={audioEnabled ? 'Mute HUD Audio FX' : 'Enable Sci-Fi HUD Audio FX'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{audioEnabled ? 'AUDIO: ON' : 'AUDIO: OFF'}</span>
          </button>

          {/* 2D / 3D Low-Power Mode Toggle */}
          <button
            onClick={() => {
              soundEffects.playBeep(750, 0.08);
              onToggle2DMode();
            }}
            className={`hud-panel px-2.5 py-2 sm:px-3 sm:py-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
              is2DMode
                ? 'border-amber-500 text-amber-400 shadow-glow-amber bg-amber-500/15'
                : 'border-[#00F0FF]/40 text-cyan-300 hover:border-[#00F0FF] hover:text-white'
            }`}
            title={is2DMode ? 'Switch to 3D Solar Canvas' : 'Toggle 2D / Low-Power Mode'}
          >
            {is2DMode ? <BatteryCharging className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            <span className="hidden sm:inline font-bold">
              {is2DMode ? '2D MODE' : '3D ORBIT'}
            </span>
          </button>

          {/* Help / Guidance Modal Trigger */}
          <button
            onClick={() => {
              soundEffects.playBeep(900, 0.06);
              onOpenHelp();
            }}
            className="hud-panel p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/60 transition-all"
            title="Telemetry Protocol Help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sci-Fi Decorative Corner Brackets (Static HUD Framing) */}
      <div className="pointer-events-none fixed top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#00F0FF]/40" />
      <div className="pointer-events-none fixed top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00F0FF]/40" />
      <div className="pointer-events-none fixed bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#00F0FF]/40" />
      <div className="pointer-events-none fixed bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#00F0FF]/40" />

      {/* Subtle CRT scanline effect */}
      <div className="pointer-events-none fixed inset-0 scanlines opacity-40 z-10" />
    </div>
  );
};
