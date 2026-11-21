import React, { useState } from 'react';
import { WEB_PROJECTS } from '../../data/portfolioData';
import { soundEffects } from '../hud/SoundEffects';
import {
  X,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  Filter
} from 'lucide-react';

interface WebProjectsModalProps {
  onClose: () => void;
}

export const WebProjectsModal: React.FC<WebProjectsModalProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', '3D / AI', 'Full-Stack', 'Game Dev', 'Web App', 'Portfolio'];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? WEB_PROJECTS
      : WEB_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-void-950/80 backdrop-blur-md animate-fade-in">
      {/* Modal / Bottom-Sheet Container */}
      <div className="hud-panel w-full sm:max-w-4xl max-h-[88vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl border border-[#00F0FF]/40 shadow-glow-cyan-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between bg-void-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#00F0FF] uppercase">
                  SECTOR CYBER-I // DEEP SPACE DEPLOYMENTS
                </span>
                <span className="px-1.5 py-0.2 bg-[#00F0FF]/20 text-[#00F0FF] text-[9px] font-mono rounded">
                  6 MISSIONS
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-orbitron font-bold text-white tracking-wide">
                Web Engineering & Mission Logs
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

        {/* Filter Bar */}
        <div className="px-4 sm:px-5 py-2.5 border-b border-slate-800/60 bg-void-950/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[10px] font-mono text-slate-400 shrink-0">FILTER:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playBeep(1100, 0.04);
                setSelectedCategory(cat);
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00F0FF] text-black font-bold shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scrollable Project Cards */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-slate-800 bg-void-950/70 p-4 hover:border-[#00F0FF]/70 hover:shadow-glow-cyan transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Status & Category Bar */}
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {project.metrics.status}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800/80 text-[#00F0FF] font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-base font-orbitron font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300/80 mb-2">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Telemetry Highlight */}
                  <div className="p-2 rounded bg-void-light border border-slate-800 text-[10px] font-mono text-slate-400 mb-4 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>{project.metrics.highlight}</span>
                  </div>
                </div>

                {/* Live Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEffects.playBeep(1200, 0.08)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#00F0FF] hover:bg-cyan-300 text-black font-orbitron font-bold text-xs transition-colors shadow-glow-cyan"
                  >
                    <span>LAUNCH MISSION</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundEffects.playBeep(980, 0.06)}
                      className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-[#00F0FF] hover:bg-slate-800/80 transition-colors"
                      title="Inspect Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-void-950/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
            ACTIVE STACK: NEXT.JS // REACT // THREE.JS // TYPESCRIPT
          </span>
          <span className="text-slate-500 hidden sm:inline">SEC-01 PROTOCOL OK</span>
        </div>
      </div>
    </div>
  );
};
