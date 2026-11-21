import { jsx as _jsx, jsxs as _jsxs } from "https://esm.sh/react@18.3.1/jsx-runtime";
import { useRef } from 'https://esm.sh/react@18.3.1';
import { useFrame } from 'https://esm.sh/@react-three/fiber@8.17.10?external=react,react-dom,three';
import { Html } from 'https://esm.sh/@react-three/drei@9.117.0?external=react,react-dom,three,@react-three/fiber';
import * as THREE from 'https://esm.sh/three@0.168.0';
export const Sun = ({ onSelect, isHovered, onHover }) => {
    const meshRef = useRef(null);
    const coronaRef = useRef(null);
    const ringRef1 = useRef(null);
    const ringRef2 = useRef(null);
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.15;
        }
        if (coronaRef.current) {
            coronaRef.current.rotation.y = -t * 0.2;
            coronaRef.current.rotation.z = t * 0.1;
            // Gentle breathing pulse
            const pulse = 1 + Math.sin(t * 2.5) * 0.04;
            coronaRef.current.scale.set(pulse, pulse, pulse);
        }
        if (ringRef1.current) {
            ringRef1.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.1;
            ringRef1.current.rotation.z = t * 0.3;
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.4) * 0.1;
            ringRef2.current.rotation.x = -t * 0.25;
        }
    });
    return (_jsxs("group", { position: [0, 0, 0], children: [_jsxs("mesh", { ref: meshRef, onClick: (e) => {
                    e.stopPropagation();
                    onSelect();
                }, onPointerOver: (e) => {
                    e.stopPropagation();
                    onHover(true);
                    document.body.style.cursor = 'pointer';
                }, onPointerOut: () => {
                    onHover(false);
                    document.body.style.cursor = 'auto';
                }, children: [_jsx("sphereGeometry", { args: [2.2, 48, 48] }), _jsx("meshStandardMaterial", { color: "#00F0FF", emissive: "#00E5FF", emissiveIntensity: isHovered ? 2.4 : 1.8, roughness: 0.15, metalness: 0.8 })] }), _jsxs("mesh", { ref: coronaRef, scale: 1.25, children: [_jsx("sphereGeometry", { args: [2.2, 32, 32] }), _jsx("meshBasicMaterial", { color: "#38BDF8", transparent: true, opacity: isHovered ? 0.35 : 0.2, wireframe: true, blending: THREE.AdditiveBlending })] }), _jsxs("mesh", { ref: ringRef1, children: [_jsx("torusGeometry", { args: [3.2, 0.03, 16, 64] }), _jsx("meshBasicMaterial", { color: "#00F0FF", transparent: true, opacity: 0.6 })] }), _jsxs("mesh", { ref: ringRef2, children: [_jsx("torusGeometry", { args: [3.8, 0.02, 16, 64] }), _jsx("meshBasicMaterial", { color: "#60A5FA", transparent: true, opacity: 0.4 })] }), _jsx("pointLight", { color: "#00F0FF", intensity: 18, distance: 60, decay: 1.5 }), _jsx("pointLight", { color: "#FFFFFF", intensity: 10, distance: 25, decay: 2 }), isHovered && (_jsx(Html, { position: [0, 3.4, 0], center: true, distanceFactor: 14, className: "pointer-events-none select-none", children: _jsxs("div", { className: "hud-panel px-3 py-1.5 rounded border border-[#00F0FF] shadow-glow-cyan text-center whitespace-nowrap animate-fade-in", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#00F0FF]", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" }), "SOLAR CORE // IDENT MATRIX"] }), _jsx("div", { className: "text-xs font-orbitron font-bold text-white tracking-wider", children: "THE ANGRY EAST INDIAN" }), _jsx("div", { className: "text-[9px] font-mono text-slate-300", children: "Overview & Master Telemetry" })] }) }))] }));
};
