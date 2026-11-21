import React from 'react';
import { MEDIA_CHANNELS } from '../../data/portfolioData';
import { soundEffects } from '../hud/SoundEffects';
import {
  X,
  Radio,
  Youtube,
  Tv,
  Signal,
  ExternalLink,
  Video,
  Sparkles,
  Wifi
} from 'lucide-react';

interface MediaHubModalProps {
  onClose: () => void;
}

export const MediaHubModal: React.FC<MediaHubModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-void-950/80 backdrop-blur-md animate-fade-in">
      <div className="hud-panel-violet w-full sm:max-w-3xl max-h-[90vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl border border-violet-500/40 shadow-glow-violet flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-violet-950/80 flex items-center justify-between bg-void-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/50 text-violet-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">
                  SECTOR PULSAR-III // SUBSPACE BROADCAST ARRAY
                </span>
                <span className="px-1.5 py-0.2 bg-violet-500/20 text-violet-300 text-[9px] font-mono rounded font-bold">
                  SATELLITE SYNC
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-orbitron font-bold text-white tracking-wide">
                Subspace Broadcasts & Media Hub
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playBeep(640, 0.08);
              onClose();
            }}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-violet-400 hover:bg-violet-400/10 transition-all"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          <div className="text-xs text-slate-300 font-mono bg-violet-950/30 p-3 rounded-xl border border-violet-800/40 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-violet-400 shrink-0" />
            <span>
              BROADCAST FREQUENCIES ACTIVE: High-throughput video telemetry streaming on YouTube and digital media nodes.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEDIA_CHANNELS.map((channel) => (
              <div
                key={channel.id}
                className="rounded-xl border border-slate-800 bg-void-950/70 p-4 hover:border-violet-500/70 hover:shadow-glow-violet transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Simulated Transmission Scanline Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none opacity-50" />

                <div>
                  {/* Frequency & Signal Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className="text-violet-300 font-bold flex items-center gap-1.5">
                      <Signal className="w-3.5 h-3.5 text-violet-400" />
                      {channel.frequency}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-violet-950/80 border border-violet-700/50 text-violet-200">
                      {channel.type}
                    </span>
                  </div>

                  {/* Channel Title & Handle */}
                  <h3 className="text-base font-orbitron font-bold text-white group-hover:text-violet-300 transition-colors mb-0.5">
                    {channel.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-2">
                    {channel.handle}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {channel.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono p-2.5 rounded-lg bg-void-light border border-slate-800 mb-3">
                    <div>
                      <span className="text-slate-500 block">SUBSCRIBERS</span>
                      <span className="text-white font-bold">{channel.stats.subscribers}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">TRANSMISSIONS</span>
                      <span className="text-violet-300 font-bold">{channel.stats.transmissions}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">SIGNAL PURITY</span>
                      <span className="text-emerald-400 font-bold">{channel.stats.signalStrength}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">OUTPUT STREAM</span>
                      <span className="text-slate-300 font-bold">{channel.stats.resolution}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {channel.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Channel Link */}
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEffects.playBeep(1200, 0.08)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-red-600 via-violet-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-orbitron font-bold text-xs tracking-wider transition-all shadow-md hover:shadow-glow-violet"
                >
                  <Youtube className="w-4 h-4 text-white" />
                  <span>TUNE IN BROADCAST</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-void-950/90 border-t border-violet-950/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-violet-300">
            <Tv className="w-3.5 h-3.5" />
            24/7 SATELLITE TELEMETRY UPLINK ESTABLISHED
          </span>
          <span className="text-slate-500 hidden sm:inline">PULSAR PROTOCOL VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
