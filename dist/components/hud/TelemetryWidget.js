import { jsx as _jsx, jsxs as _jsxs } from "https://esm.sh/react@18.3.1/jsx-runtime";
import { useState, useEffect } from 'https://esm.sh/react@18.3.1';
import { SYSTEM_INFO } from '../../data/portfolioData.js';
import { Activity, ShieldCheck, Radio, ChevronDown, ChevronUp } from 'https://esm.sh/lucide-react@0.454.0';
export const TelemetryWidget = ({ activeSection }) => {
    const [fps, setFps] = useState(60);
    const [collapsed, setCollapsed] = useState(true);
    const [coords, setCoords] = useState({ ra: '19h 50m', dec: '+08° 52′', dist: '1.42 AU' });
    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        let animId;
        const measureFps = (now) => {
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
    return (_jsx("div", { className: "fixed top-20 left-4 z-30 pointer-events-auto", children: _jsxs("div", { className: "hud-panel rounded-lg p-2.5 sm:p-3 max-w-[260px] text-xs font-mono transition-all duration-300", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-[#00F0FF]", children: [_jsx(Radio, { className: "w-3.5 h-3.5 animate-pulse" }), _jsx("span", { className: "font-bold tracking-wider", children: "ORBITAL TELEMETRY" })] }), _jsx("button", { onClick: () => setCollapsed(!collapsed), className: "text-slate-400 hover:text-white p-0.5", title: "Toggle Telemetry details", children: collapsed ? _jsx(ChevronDown, { className: "w-3.5 h-3.5" }) : _jsx(ChevronUp, { className: "w-3.5 h-3.5" }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-[11px]", children: [_jsxs("div", { children: [_jsx("span", { className: "text-slate-500 block text-[9px]", children: "ENGINE CLK" }), _jsxs("span", { className: "text-[#00F0FF] font-semibold flex items-center gap-1", children: [_jsx(Activity, { className: "w-3 h-3" }), " ", fps, " FPS"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-500 block text-[9px]", children: "SECTOR LINK" }), _jsx("span", { className: "text-amber-400 font-semibold uppercase truncate", children: activeSection || 'GLOBAL ORBIT' })] })] }), !collapsed && (_jsxs("div", { className: "mt-2.5 pt-2 border-t border-slate-800/80 space-y-1.5 text-[10px]", children: [_jsxs("div", { className: "flex justify-between text-slate-400", children: [_jsx("span", { children: "DEFCON STATUS:" }), _jsxs("span", { className: "text-emerald-400 font-bold flex items-center gap-1", children: [_jsx(ShieldCheck, { className: "w-3 h-3" }), " GREEN"] })] }), _jsxs("div", { className: "flex justify-between text-slate-400", children: [_jsx("span", { children: "CELESTIAL RA:" }), _jsx("span", { className: "text-white font-mono", children: coords.ra })] }), _jsxs("div", { className: "flex justify-between text-slate-400", children: [_jsx("span", { children: "DECLINATION:" }), _jsx("span", { className: "text-white font-mono", children: coords.dec })] }), _jsxs("div", { className: "flex justify-between text-slate-400", children: [_jsx("span", { children: "RADIAL DIST:" }), _jsx("span", { className: "text-[#00F0FF] font-mono", children: coords.dist })] }), _jsxs("div", { className: "flex justify-between text-slate-400", children: [_jsx("span", { children: "STARDATE:" }), _jsx("span", { className: "text-slate-300 font-mono", children: SYSTEM_INFO.stardate })] })] }))] }) }));
};
