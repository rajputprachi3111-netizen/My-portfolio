import React from 'react';
import { soundEffects } from '../hud/SoundEffects';
import { X, HelpCircle, Compass, MousePointer, Smartphone, Zap } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-950/80 backdrop-blur-md animate-fade-in">
      <div className="hud-panel w-full max-w-md rounded-2xl border border-[#00F0FF]/40 shadow-glow-cyan p-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] font-bold">
            <HelpCircle className="w-4 h-4" /> ORBITAL TELEMETRY MANUAL
          </div>
          <button
            onClick={() => {
              soundEffects.playBeep(640, 0.08);
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 text-xs">
          <div className="flex items-start gap-3 p-2.5 rounded-lg bg-void-light border border-slate-800">
            <Compass className="w-4 h-4 text-[#00F0FF] mt-0.5 shrink-0" />
            <div>
              <div className="font-orbitron font-bold text-white mb-0.5">3D Navigation</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Left-click / one-finger swipe to rotate the solar view. Scroll wheel / two-finger pinch to zoom in and out.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-lg bg-void-light border border-slate-800">
            <MousePointer className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-orbitron font-bold text-white mb-0.5">Planetary Portals</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Hover or tap any glowing celestial body (Sun or 4 Orbiting Planets) to bring up real-time telemetry and open project drawers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-lg bg-void-light border border-slate-800">
            <Smartphone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-orbitron font-bold text-white mb-0.5">One-Thumb Mobile Pill Bar</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Use the bottom pill bar for instantaneous sector docking on any screen without needing to pan around space.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-lg bg-void-light border border-slate-800">
            <Zap className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-orbitron font-bold text-white mb-0.5">2D / Low-Power Mode</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Toggle "2D MODE" in the top command bar anytime for high accessibility and minimal GPU/battery consumption.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundEffects.playBeep(920, 0.05);
            onClose();
          }}
          className="mt-5 w-full py-2 rounded-lg bg-[#00F0FF] text-black font-orbitron font-bold text-xs hover:bg-cyan-300 transition-colors shadow-glow-cyan"
        >
          RETURN TO COMMAND BRIDGE
        </button>
      </div>
    </div>
  );
};
