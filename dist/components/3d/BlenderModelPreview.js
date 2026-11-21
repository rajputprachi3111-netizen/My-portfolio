import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
const ProceduralFootball = ({ wireframe, viewMode }) => {
    const groupRef = useRef(null);
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.4;
            groupRef.current.rotation.x += delta * 0.15;
        }
    });
    return (_jsxs("group", { ref: groupRef, children: [_jsxs("mesh", { castShadow: true, receiveShadow: true, children: [_jsx("icosahedronGeometry", { args: [1.5, 2] }), _jsx("meshStandardMaterial", { color: viewMode === 'solid' ? '#CBD5E1' : '#F8FAFC', roughness: viewMode === 'solid' ? 0.8 : 0.25, metalness: viewMode === 'solid' ? 0.1 : 0.2, wireframe: wireframe || viewMode === 'wireframe' })] }), _jsxs("mesh", { scale: 1.002, children: [_jsx("dodecahedronGeometry", { args: [1.48, 0] }), _jsx("meshStandardMaterial", { color: viewMode === 'solid' ? '#475569' : '#0F172A', roughness: 0.4, metalness: 0.6, wireframe: wireframe || viewMode === 'wireframe' })] }), _jsxs("mesh", { scale: 1.01, children: [_jsx("icosahedronGeometry", { args: [1.5, 1] }), _jsx("meshBasicMaterial", { color: "#00F0FF", wireframe: true, transparent: true, opacity: viewMode === 'solid' ? 0.15 : 0.45 })] })] }));
};
const ProceduralDoughnut = ({ wireframe, viewMode }) => {
    const groupRef = useRef(null);
    // Generate random sprinkles scattered around torus
    const sprinkles = useMemo(() => {
        const list = [];
        const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#FFFFFF'];
        const count = 75;
        for (let i = 0; i < count; i++) {
            const u = Math.random() * Math.PI * 2;
            const v = (Math.random() - 0.5) * Math.PI * 0.8; // top half for icing
            const R = 1.35; // Torus major radius
            const r = 0.58; // Torus minor radius
            const x = (R + r * Math.cos(v)) * Math.cos(u);
            const y = r * Math.sin(v) + 0.05;
            const z = (R + r * Math.cos(v)) * Math.sin(u);
            const rotX = Math.random() * Math.PI;
            const rotY = Math.random() * Math.PI;
            const rotZ = Math.random() * Math.PI;
            const color = colors[Math.floor(Math.random() * colors.length)];
            list.push({ pos: [x, y, z], rot: [rotX, rotY, rotZ], color });
        }
        return list;
    }, []);
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.35;
            groupRef.current.rotation.x = Math.sin(delta * 2) * 0.05 + 0.35;
        }
    });
    return (_jsxs("group", { ref: groupRef, rotation: [0.4, 0, 0], children: [_jsxs("mesh", { castShadow: true, receiveShadow: true, children: [_jsx("torusGeometry", { args: [1.3, 0.55, 32, 64] }), _jsx("meshStandardMaterial", { color: viewMode === 'solid' ? '#94A3B8' : '#D97706', roughness: viewMode === 'solid' ? 0.9 : 0.65, metalness: 0.05, wireframe: wireframe || viewMode === 'wireframe' })] }), viewMode !== 'wireframe' && (_jsxs("mesh", { position: [0, 0.08, 0], scale: [1.02, 1.05, 1.02], children: [_jsx("torusGeometry", { args: [1.3, 0.53, 32, 64, Math.PI * 2] }), _jsx("meshStandardMaterial", { color: viewMode === 'solid' ? '#64748B' : '#EC4899', roughness: viewMode === 'solid' ? 0.5 : 0.15, metalness: 0.1, wireframe: wireframe })] })), viewMode === 'rendered' &&
                sprinkles.map((sp, idx) => (_jsxs("mesh", { position: sp.pos, rotation: sp.rot, children: [_jsx("cylinderGeometry", { args: [0.035, 0.035, 0.18, 8] }), _jsx("meshStandardMaterial", { color: sp.color, roughness: 0.3 })] }, idx)))] }));
};
export const BlenderModelPreview = ({ type, wireframe, viewMode, autoRotate }) => {
    return (_jsxs("div", { className: "w-full h-full min-h-[280px] sm:min-h-[340px] relative rounded-lg overflow-hidden bg-void-950/80 border border-slate-800", children: [_jsxs(Canvas, { camera: { position: [0, 1.5, 4.2], fov: 45 }, gl: { antialias: true, alpha: true }, children: [_jsx("ambientLight", { intensity: viewMode === 'solid' ? 1.2 : 0.7 }), _jsx("directionalLight", { position: [5, 8, 5], intensity: 1.8, castShadow: true }), _jsx("directionalLight", { position: [-5, -2, -4], intensity: 0.6, color: "#00F0FF" }), _jsx("pointLight", { position: [0, -2, 2], intensity: 0.8, color: "#F59E0B" }), type === 'football' ? (_jsx(ProceduralFootball, { wireframe: wireframe, viewMode: viewMode })) : (_jsx(ProceduralDoughnut, { wireframe: wireframe, viewMode: viewMode })), _jsx(OrbitControls, { enableZoom: true, enablePan: false, autoRotate: autoRotate, autoRotateSpeed: 1.5, maxDistance: 7, minDistance: 2.5 })] }), _jsxs("div", { className: "absolute top-2.5 left-3 pointer-events-none flex items-center gap-1.5 text-[10px] font-mono text-[#00F0FF]", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" }), "LIVE 3D VIEWPORT // ", type.toUpperCase()] }), _jsx("div", { className: "absolute bottom-2.5 right-3 pointer-events-none text-[9px] font-mono text-slate-400 bg-void-950/80 px-2 py-0.5 rounded border border-slate-700", children: "DRAG TO ROTATE \u2022 PINCH TO ZOOM" })] }));
};
