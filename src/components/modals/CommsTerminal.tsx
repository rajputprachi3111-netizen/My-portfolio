import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../../data/portfolioData';
import { soundEffects } from '../hud/SoundEffects';
import confetti from 'canvas-confetti';
import {
  X,
  Send,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Camera,
  MessageCircle,
  MessageSquare,
  Radio,
  CheckCircle,
  ExternalLink,
  Shield,
  Terminal,
  Sparkles
} from 'lucide-react';

interface CommsTerminalProps {
  onClose: () => void;
}

export const CommsTerminal: React.FC<CommsTerminalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin className="w-4 h-4 text-sky-400" />;
      case 'Github':
        return <Github className="w-4 h-4 text-white" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4 text-sky-300" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'Camera':
        return <Camera className="w-4 h-4 text-fuchsia-400" />;
      case 'MessageCircle':
        return <MessageCircle className="w-4 h-4 text-yellow-300" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-amber-300" />;
      default:
        return <Radio className="w-4 h-4 text-[#00F0FF]" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEffects.playBeep(1100, 0.1);
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmissionSuccess(true);
      soundEffects.playTransmissionSent();

      // Confetti burst for successful mission transmission
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F0FF', '#10B981', '#38BDF8', '#F59E0B']
        });
      } catch {
        // Ignore if confetti not supported
      }

      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-void-950/80 backdrop-blur-md animate-fade-in">
      <div className="hud-panel-emerald w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl border border-emerald-500/40 shadow-glow-emerald flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-950/80 flex items-center justify-between bg-void-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                  SECTOR BEACON-IV // HAILING FREQUENCIES
                </span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-mono rounded font-bold">
                  ENCRYPTED RELAY
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-orbitron font-bold text-white tracking-wide">
                Hailing Frequencies & Comms Array
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playBeep(640, 0.08);
              onClose();
            }}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-emerald-400 hover:bg-emerald-400/10 transition-all"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          {/* Top Half: Social Array Grid */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
              <span className="font-bold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> ORBITAL SOCIAL NODES (7 CHANNELS)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                INSTANT HANDSHAKE AVAILABLE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEffects.playBeep(1050, 0.05)}
                  className="p-3 rounded-xl border border-slate-800 bg-void-950/70 hover:border-emerald-400/70 hover:shadow-glow-emerald transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/60 group-hover:scale-110 transition-transform">
                      {getPlatformIcon(link.icon)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-orbitron font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {link.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        {link.handle}
                      </div>
                    </div>
                  </div>

                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-300 transition-colors shrink-0 ml-1" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Half: Direct Subspace Transmission Form */}
          <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-void-950/70 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <Shield className="w-4 h-4" /> DIRECT SUBSPACE TRANSMISSION
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                256-BIT QUANTUM HASH
              </span>
            </div>

            {transmissionSuccess ? (
              <div className="p-6 rounded-lg bg-emerald-950/30 border border-emerald-500/50 text-center space-y-2 animate-fade-in">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-orbitron font-bold text-white">
                  TRANSMISSION DISPATCHED // ACKNOWLEDGED
                </h4>
                <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                  Your telemetry signal packet has been broadcast to sub-orbital relay nodes. The Angry East Indian will respond shortly.
                </p>
                <button
                  onClick={() => setTransmissionSuccess(false)}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-mono font-bold hover:bg-emerald-400 transition-colors"
                >
                  TRANSMIT ANOTHER PACKET
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">
                      OPERATOR CALLSIGN / NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Commander Shepard"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-void-light border border-slate-700 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 focus:shadow-glow-emerald transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">
                      SUBSPACE FREQUENCY / EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. operator@orbital-station.space"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-void-light border border-slate-700 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 focus:shadow-glow-emerald transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">
                    TRANSMISSION PAYLOAD / MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter mission objectives, collaboration requests, or 3D/engineering inquiries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-void-light border border-slate-700 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 focus:shadow-glow-emerald transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-orbitron font-bold text-xs tracking-wider transition-all shadow-glow-emerald flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isTransmitting ? 'ENCRYPTING & TRANSMITTING...' : 'TRANSMIT SUBSPACE BEAM >>'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-void-950/90 border-t border-emerald-950/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <Terminal className="w-3.5 h-3.5" />
            COMMUNICATION ARRAY STANDBY: ALL 7 HARBORS SYNCHRONIZED
          </span>
          <span className="text-slate-500 hidden sm:inline">BEACON-IV ONLINE</span>
        </div>
      </div>
    </div>
  );
};
