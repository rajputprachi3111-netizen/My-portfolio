import React from 'react';
import { ActiveSection } from '../../types';
import { SYSTEM_INFO, PLANET_CONFIGS } from '../../data/portfolioData';
import { soundEffects } from '../hud/SoundEffects';
import {
  Sun,
  Globe,
  Box,
  Radio,
  Send,
  Zap,
  BatteryCharging,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface LowPower2DViewProps {
  onSelectSection: (section: ActiveSection) => void;
  onToggle2DMode: () => void;
}

export const LowPower2DView: React.FC<LowPower2DViewProps> = ({
  onSelectSection,
  onToggle2DMode
}) => {
  return (
    <div className="w-full min-h-screen pt-24 pb-28 px-4 sm:px-8 max-w-6xl mx-auto overflow-y-auto">
      {/* 2D Mode Status Banner */}
      <div className="hud-panel p-4 rounded-xl border border-amber-500/40 shadow-glow-amber mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <BatteryCharging className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold">
              2D / LOW-POWER TELEMETRY MODE ACTIVE
            </div>
            <div className="text-xs text-slate-300">
              WebGL 3D engine paused for reduced battery consumption and mobile accessibility.
            </div>
          </div>
        </div>

        <button
          onClick={onToggle2DMode}
          className="px-4 py-2 rounded-lg bg-[#00F0FF] hover:bg-cyan-300 text-black font-orbitron font-bold text-xs transition-colors shadow-glow-cyan flex items-center justify-center gap-1.5 shrink-0"
        >
          <Zap className="w-4 h-4" />
          <span>ENGAGE 3D SOLAR SYSTEM</span>
        </button>
      </div>

      {/* Hero Overview Dossier Card */}
      <div className="hud-panel p-6 sm:p-8 rounded-2xl border border-[#00F0FF]/40 shadow-glow-cyan mb-8 relative">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-2 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          DEFCON 1 // CENTRAL SOLAR COMMAND
        </div>
        <h1 className="text-2xl sm:text-4xl font-orbitron font-extrabold text-white tracking-wider mb-2">
          {SYSTEM_INFO.title}
        </h1>
        <p className="text-sm sm:text-base font-mono text-cyan-300/80 mb-4">
          {SYSTEM_INFO.role}
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
          {SYSTEM_INFO.tagline}
        </p>

        <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
          <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
            {SYSTEM_INFO.location}
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
            {SYSTEM_INFO.status}
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
            {SYSTEM_INFO.stardate}
          </span>
        </div>
      </div>

      {/* 2D Orbital Radar Sector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PLANET_CONFIGS.map((planet) => (
          <div
            key={planet.id}
            onClick={() => {
              soundEffects.playPlanetSelect();
              onSelectSection(planet.id);
            }}
            className="hud-panel p-5 rounded-2xl border border-slate-800 hover:border-[#00F0FF] transition-all cursor-pointer group flex flex-col justify-between"
            style={{
              borderColor: `${planet.color}40`,
              boxShadow: `0 0 20px ${planet.color}15`
            }}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-slate-400 font-bold">{planet.name}</span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold"
                  style={{ backgroundColor: `${planet.color}25`, color: planet.color }}
                >
                  {planet.badge}
                </span>
              </div>

              <h3 className="text-lg font-orbitron font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-1">
                {planet.title}
              </h3>

              <div className="text-xs font-mono text-cyan-300/80 mb-2.5">
                {planet.subtitle}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {planet.description}
              </p>
            </div>

            <div
              className="flex items-center justify-between pt-3 border-t text-xs font-mono font-bold transition-all"
              style={{
                borderColor: `${planet.color}30`,
                color: planet.color
              }}
            >
              <span>ACCESS SECTOR TELEMETRY &gt;&gt;</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
