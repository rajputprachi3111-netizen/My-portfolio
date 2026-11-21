import React from 'react';
import { ActiveSection } from '../../types';
import { soundEffects } from './SoundEffects';
import { Sun, Globe, Box, Radio, Send, Compass } from 'lucide-react';

interface NavigationPillsProps {
  activeSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
}

export const NavigationPills: React.FC<NavigationPillsProps> = ({
  activeSection,
  onSelectSection
}) => {
  const navItems = [
    {
      id: 'overview' as const,
      label: 'Core Hub',
      shortLabel: 'Hub',
      icon: Sun,
      color: '#00F0FF',
      glow: 'shadow-glow-cyan'
    },
    {
      id: 'web' as const,
      label: 'Web Missions',
      shortLabel: 'Web',
      icon: Globe,
      color: '#00F0FF',
      glow: 'shadow-glow-cyan'
    },
    {
      id: 'blender' as const,
      label: 'The Foundry',
      shortLabel: '3D/Blender',
      icon: Box,
      color: '#F59E0B',
      glow: 'shadow-glow-amber'
    },
    {
      id: 'media' as const,
      label: 'Subspace Media',
      shortLabel: 'Media',
      icon: Radio,
      color: '#8B5CF6',
      glow: 'shadow-glow-violet'
    },
    {
      id: 'contact' as const,
      label: 'Comms Array',
      shortLabel: 'Comms',
      icon: Send,
      color: '#10B981',
      glow: 'shadow-glow-emerald'
    }
  ];

  const handleClick = (id: ActiveSection) => {
    soundEffects.playBeep(980, 0.06);
    if (activeSection === id) {
      onSelectSection(null);
    } else {
      onSelectSection(id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw] px-2">
      <div className="hud-panel rounded-full p-1.5 sm:p-2 border border-slate-700/80 backdrop-blur-xl shadow-2xl flex items-center gap-1 sm:gap-2">
        {/* Reset / Free Orbit Camera Pill */}
        <button
          onClick={() => {
            soundEffects.playBeep(720, 0.08);
            onSelectSection(null);
          }}
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
            activeSection === null
              ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/60 shadow-glow-cyan'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Free Orbital Cam"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden md:inline">FREE ORBIT</span>
        </button>

        <div className="w-[1px] h-5 bg-slate-700/60 mx-0.5" />

        {/* Planet Navigation Pills */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all duration-300 ${
                isActive
                  ? 'text-white border'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
              style={{
                backgroundColor: isActive ? `${item.color}25` : undefined,
                borderColor: isActive ? item.color : undefined,
                boxShadow: isActive ? `0 0 16px ${item.color}40` : undefined
              }}
            >
              <Icon
                className="w-3.5 h-3.5 transition-transform duration-300"
                style={{ color: isActive ? item.color : '#94A3B8' }}
              />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="inline sm:hidden">{item.shortLabel}</span>

              {isActive && (
                <span
                  className="w-1.5 h-1.5 rounded-full animate-ping absolute -top-0.5 -right-0.5"
                  style={{ backgroundColor: item.color }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
