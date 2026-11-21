import { jsx as _jsx, jsxs as _jsxs } from "https://esm.sh/react@18.3.1/jsx-runtime";
import { useState } from 'https://esm.sh/react@18.3.1';
import { SYSTEM_INFO } from '../../data/portfolioData.js';
import { soundEffects } from './SoundEffects.js';
import { Volume2, VolumeX, BatteryCharging, Zap, HelpCircle } from 'https://esm.sh/lucide-react@0.454.0';
export const HudOverlay = ({ activeSection, onSelectSection, is2DMode, onToggle2DMode, onOpenHelp }) => {
    const [audioEnabled, setAudioEnabled] = useState(false);
    const handleToggleAudio = () => {
        const newState = soundEffects.toggleSound();
        setAudioEnabled(newState);
    };
    return (_jsxs("div", { className: "pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-3 sm:p-5", children: [_jsxs("header", { className: "pointer-events-auto flex items-center justify-between gap-3 w-full", children: [_jsxs("div", { onClick: () => {
                            soundEffects.playBeep(880, 0.08);
                            onSelectSection('overview');
                        }, className: "hud-panel cursor-pointer px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-[#00F0FF]/40 shadow-glow-cyan hover:border-[#00F0FF] transition-all flex items-center gap-3 group", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF] flex items-center justify-center font-orbitron font-extrabold text-[#00F0FF] text-xs group-hover:scale-105 transition-transform", children: "EI" }), _jsx("span", { className: "w-2 h-2 rounded-full bg-[#00F0FF] absolute -bottom-0.5 -right-0.5 animate-ping" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-[10px] font-mono text-[#00F0FF] tracking-widest font-bold", children: ["[CALLSIGN: ", SYSTEM_INFO.callsign, "]"] }), _jsx("span", { className: "hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" })] }), _jsx("h1", { className: "text-xs sm:text-sm font-orbitron font-bold text-white tracking-wider group-hover:text-[#00F0FF] transition-colors", children: SYSTEM_INFO.title })] })] }), _jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5", children: [_jsxs("button", { onClick: handleToggleAudio, className: `hud-panel px-2.5 py-2 sm:px-3 sm:py-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${audioEnabled
                                    ? 'border-[#00F0FF] text-[#00F0FF] shadow-glow-cyan bg-[#00F0FF]/15'
                                    : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'}`, title: audioEnabled ? 'Mute HUD Audio FX' : 'Enable Sci-Fi HUD Audio FX', children: [audioEnabled ? _jsx(Volume2, { className: "w-4 h-4" }) : _jsx(VolumeX, { className: "w-4 h-4" }), _jsx("span", { className: "hidden md:inline", children: audioEnabled ? 'AUDIO: ON' : 'AUDIO: OFF' })] }), _jsxs("button", { onClick: () => {
                                    soundEffects.playBeep(750, 0.08);
                                    onToggle2DMode();
                                }, className: `hud-panel px-2.5 py-2 sm:px-3 sm:py-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${is2DMode
                                    ? 'border-amber-500 text-amber-400 shadow-glow-amber bg-amber-500/15'
                                    : 'border-[#00F0FF]/40 text-cyan-300 hover:border-[#00F0FF] hover:text-white'}`, title: is2DMode ? 'Switch to 3D Solar Canvas' : 'Toggle 2D / Low-Power Mode', children: [is2DMode ? _jsx(BatteryCharging, { className: "w-4 h-4" }) : _jsx(Zap, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline font-bold", children: is2DMode ? '2D MODE' : '3D ORBIT' })] }), _jsx("button", { onClick: () => {
                                    soundEffects.playBeep(900, 0.06);
                                    onOpenHelp();
                                }, className: "hud-panel p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/60 transition-all", title: "Telemetry Protocol Help", children: _jsx(HelpCircle, { className: "w-4 h-4" }) })] })] }), _jsx("div", { className: "pointer-events-none fixed top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#00F0FF]/40" }), _jsx("div", { className: "pointer-events-none fixed top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00F0FF]/40" }), _jsx("div", { className: "pointer-events-none fixed bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#00F0FF]/40" }), _jsx("div", { className: "pointer-events-none fixed bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#00F0FF]/40" }), _jsx("div", { className: "pointer-events-none fixed inset-0 scanlines opacity-40 z-10" })] }));
};
