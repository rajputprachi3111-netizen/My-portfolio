import React from 'react';
import { SYSTEM_INFO } from '../../data/portfolioData';
import { ActiveSection } from '../../types';
import { soundEffects } from '../hud/SoundEffects';
import {
  X,
  Sun,
  Code2,
  Box,
  Compass,
  Cpu,
  Shield,
  Layers,
  ArrowRight,
  Globe,
  Radio,
  Send
} from 'lucide-react';

interface OverviewModalProps {
  onClose: () => void;
  onSelectSection: (section: ActiveSection) => void;
}

export const OverviewModal: React.FC<OverviewModalProps> = ({
  onClose,
  onSelectSection
}) => {
  const skills = [
    { category: '3D & Graphics', items: ['Three.js', 'WebGL', 'Blender (Cycles/EEVEE)', 'GLTF/GLB Pipelines', 'Geometry Nodes'] },
    { category: 'Frontend & Architecture', items: ['React 18', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion'] },
    { category: 'Cloud & Deployments', items: ['Vercel', 'Firebase', 'Netlify', 'Cloudflare', 'GitHub Actions CI/CD'] },
    { category: 'Creative & Audio', items: ['PBR Shading', 'Procedural Textures', 'Web Audio Synth', 'Hard-Surface Modeling'] }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-void-950/80 backdrop-blur-md animate-fade-in">
      <div className="hud-panel w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl border border-[#00F0FF]/40 shadow-glow-cyan flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between bg-void-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF]">
              <Sun className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase">
                  SOLAR COMMAND // CENTRAL IDENTITY CORE
                </span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-mono rounded font-bold">
                  DEFCON 1
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-orbitron font-bold text-white tracking-wide">
                {SYSTEM_INFO.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playBeep(640, 0.08);
              onClose();
            }}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          {/* Identity Dossier Banner */}
          <div className="p-4 rounded-xl border border-slate-800 bg-void-950/70 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono text-[#00F0FF] font-bold">
                COMMANDING OFFICER: {SYSTEM_INFO.callsign}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {SYSTEM_INFO.location}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-orbitron font-bold text-white mb-2">
              {SYSTEM_INFO.role}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-3">
              {SYSTEM_INFO.tagline}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                STARDATE: {SYSTEM_INFO.stardate}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                STATUS: {SYSTEM_INFO.status}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                FIRMWARE: {SYSTEM_INFO.version}
              </span>
            </div>
          </div>

          {/* Direct Sector Portals */}
          <div>
            <div className="text-xs font-mono text-[#00F0FF] font-bold mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> PLANETARY NAVIGATION PORTALS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  soundEffects.playPlanetSelect();
                  onSelectSection('web');
                }}
                className="p-3 rounded-xl border border-slate-800 bg-void-950/70 hover:border-[#00F0FF] hover:shadow-glow-cyan text-left transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#00F0FF] font-semibold">SECTOR CYBER-I</div>
                  <div className="text-xs font-orbitron font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    Web Engineering
                  </div>
                  <div className="text-[10px] text-slate-400">MeshCraft AI, PlayZone & Repos</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00F0FF] group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => {
                  soundEffects.playPlanetSelect();
                  onSelectSection('blender');
                }}
                className="p-3 rounded-xl border border-slate-800 bg-void-950/70 hover:border-amber-400 hover:shadow-glow-amber text-left transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-400 font-semibold">SECTOR VULCAN-II</div>
                  <div className="text-xs font-orbitron font-bold text-white group-hover:text-amber-400 transition-colors">
                    The Blender Foundry
                  </div>
                  <div className="text-[10px] text-slate-400">3D Football, Doughnut SSS & Cycles</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => {
                  soundEffects.playPlanetSelect();
                  onSelectSection('media');
                }}
                className="p-3 rounded-xl border border-slate-800 bg-void-950/70 hover:border-violet-400 hover:shadow-glow-violet text-left transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-violet-400 font-semibold">SECTOR PULSAR-III</div>
                  <div className="text-xs font-orbitron font-bold text-white group-hover:text-violet-400 transition-colors">
                    Subspace Broadcasts
                  </div>
                  <div className="text-[10px] text-slate-400">YouTube Transmissions & Channels</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => {
                  soundEffects.playPlanetSelect();
                  onSelectSection('contact');
                }}
                className="p-3 rounded-xl border border-slate-800 bg-void-950/70 hover:border-emerald-400 hover:shadow-glow-emerald text-left transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 font-semibold">SECTOR BEACON-IV</div>
                  <div className="text-xs font-orbitron font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Hailing Frequencies
                  </div>
                  <div className="text-[10px] text-slate-400">Comms Array & Social Relay</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Technical Skills Radar */}
          <div>
            <div className="text-xs font-mono text-[#00F0FF] font-bold mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> TECHNICAL ARSENAL & PROFICIENCIES
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-800 bg-void-950/60">
                  <div className="text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    {s.category}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-cyan-300/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-void-950/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-[#00F0FF]">
            <Shield className="w-3.5 h-3.5" />
            TRANSMISSION PROTOCOL: V24.9-SECURE
          </span>
          <span className="text-slate-500 hidden sm:inline">STATION OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
};
