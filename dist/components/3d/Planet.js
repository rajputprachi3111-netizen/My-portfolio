import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
export const Planet = ({ id, name, title, subtitle, badge, color, glowColor, radius, orbitDistance, orbitSpeed, rotationSpeed, description, isSelected, isHovered, onHover, onSelect }) => {
    const planetGroupRef = useRef(null);
    const planetMeshRef = useRef(null);
    const ringRef = useRef(null);
    // Individual phase offset based on ID so they start spaced out around the sun
    const phaseOffset = {
        web: 0,
        blender: Math.PI * 0.55,
        media: Math.PI * 1.15,
        contact: Math.PI * 1.7
    }[id] || 0;
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * orbitSpeed + phaseOffset;
        // Calculate orbital position
        const x = Math.cos(t) * orbitDistance;
        const z = Math.sin(t) * orbitDistance;
        if (planetGroupRef.current) {
            planetGroupRef.current.position.set(x, 0, z);
        }
        if (planetMeshRef.current) {
            planetMeshRef.current.rotation.y += rotationSpeed;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z += rotationSpeed * 1.5;
        }
    });
    return (_jsxs("group", { ref: planetGroupRef, children: [_jsxs("mesh", { ref: planetMeshRef, onClick: (e) => {
                    e.stopPropagation();
                    onSelect(id);
                }, onPointerOver: (e) => {
                    e.stopPropagation();
                    onHover(id);
                    document.body.style.cursor = 'pointer';
                }, onPointerOut: () => {
                    onHover(null);
                    document.body.style.cursor = 'auto';
                }, children: [_jsx("sphereGeometry", { args: [radius, 36, 36] }), _jsx("meshStandardMaterial", { color: color, emissive: color, emissiveIntensity: isHovered || isSelected ? 1.6 : 0.4, roughness: 0.3, metalness: 0.7 })] }), _jsxs("mesh", { scale: 1.2, children: [_jsx("sphereGeometry", { args: [radius, 24, 24] }), _jsx("meshBasicMaterial", { color: color, transparent: true, opacity: isHovered || isSelected ? 0.35 : 0.12, wireframe: true, blending: THREE.AdditiveBlending })] }), (id === 'blender' || id === 'web') && (_jsxs("mesh", { ref: ringRef, rotation: [Math.PI / 3, 0, 0], children: [_jsx("ringGeometry", { args: [radius * 1.45, radius * 1.7, 48] }), _jsx("meshBasicMaterial", { color: color, transparent: true, opacity: 0.5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending })] })), _jsx("pointLight", { color: color, intensity: isSelected ? 4 : 1.5, distance: 6, decay: 2 }), isHovered && (_jsx(Html, { position: [0, radius + 1.2, 0], center: true, distanceFactor: 15, className: "pointer-events-none select-none z-50", children: _jsxs("div", { className: "hud-panel p-3 rounded-lg border text-left min-w-[210px] shadow-2xl transition-all", style: { borderColor: color, boxShadow: `0 0 20px ${glowColor}` }, children: [_jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [_jsx("span", { className: "text-[10px] font-mono tracking-wider font-bold text-slate-400", children: name }), _jsx("span", { className: "text-[9px] font-mono px-1.5 py-0.5 rounded tracking-widest font-semibold", style: { backgroundColor: `${color}25`, color: color }, children: badge })] }), _jsx("div", { className: "text-sm font-orbitron font-bold text-white mb-0.5", children: title }), _jsx("div", { className: "text-[11px] font-mono text-cyan-300/80 mb-2", children: subtitle }), _jsx("p", { className: "text-[10px] font-sans text-slate-300 leading-tight mb-2", children: description }), _jsxs("div", { className: "flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-slate-700/60 pt-1.5", children: [_jsxs("span", { className: "text-[#00F0FF] flex items-center gap-1", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" }), "TELEMETRY LOCKED"] }), _jsx("span", { className: "text-white font-semibold", children: "TAP TO ENGAGE >>" })] })] }) }))] }));
};
