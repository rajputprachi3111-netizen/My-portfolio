import React, { useState, useEffect } from 'react';
import { ActiveSection } from '../../types';
import { SYSTEM_INFO } from '../../data/portfolioData';
import { Activity, ShieldCheck, Cpu, Radio, ChevronDown, ChevronUp } from 'lucide-react';

interface TelemetryWidgetProps {
  activeSection: ActiveSection;
}

export const TelemetryWidget: React.FC<TelemetryWidgetProps> = ({ activeSection }) => {
  const [fps, setFps] = useState(60);
  const [collapsed, setCollapsed] = useState(true);
  const [coords, setCoords] = useState({ ra: '19h 50m', dec: '+08° 52′', dist: '1.42 AU' });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Update coords based on active sector
  useEffect(() => {
    switch (activeSection) {
      case 'overview':
        setCoords({ ra: '00h 00m', dec: '+00° 00′', dist: '0.00 AU' });
        break;
      case 'web':
        setCoords({ ra: '05h 32m', dec: '+12° 44′', dist: '8.50 AU' });
        break;
      case 'blender':
        setCoords({ ra: '12h 18m', dec: '-24° 10′', dist: '13.5 AU' });
        break;
      case 'media':
        setCoords({ ra: '18h 45m', dec: '+40° 12′', dist: '18.5 AU' });
        break;
      case 'contact':
        setCoords({ ra: '22h 11m', dec: '-14° 08′', dist: '23.5 AU' });
        break;
      default:
        setCoords({ ra: '19h 50m', dec: '+08° 52′', dist: '38.2 AU' });
        break;
    }
  }, [activeSection]);

  return (
    <div className="fixed top-20 left-4 z-30 pointer-events-auto">
      <div className="hud-panel rounded-lg p-2.5 sm:p-3 max-w-[260px] text-xs font-mono transition-all duration-300">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
          <div className="flex items-center gap-1.5 text-[#00F0FF]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-bold tracking-wider">ORBITAL TELEMETRY</span>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-white p-0.5"
            title="Toggle Telemetry details"
          >
            {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Minimal Always-Visible Row */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-slate-500 block text-[9px]">ENGINE CLK</span>
            <span className="text-[#00F0FF] font-semibold flex items-center gap-1">
              <Activity className="w-3 h-3" /> {fps} FPS
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[9px]">SECTOR LINK</span>
            <span className="text-amber-400 font-semibold uppercase truncate">
              {activeSection || 'GLOBAL ORBIT'}
            </span>
          </div>
        </div>

        {/* Expandable Technical Telemetry */}
        {!collapsed && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1.5 text-[10px]">
            <div className="flex justify-between text-slate-400">
              <span>DEFCON STATUS:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> GREEN
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>CELESTIAL RA:</span>
              <span className="text-white font-mono">{coords.ra}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>DECLINATION:</span>
              <span className="text-white font-mono">{coords.dec}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>RADIAL DIST:</span>
              <span className="text-[#00F0FF] font-mono">{coords.dist}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>STARDATE:</span>
              <span className="text-slate-300 font-mono">{SYSTEM_INFO.stardate}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
