import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
export const Starfield = ({ count = 3500 }) => {
    const pointsRef = useRef(null);
    const { positions, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const colorChoices = [
            new THREE.Color('#FFFFFF'),
            new THREE.Color('#00F0FF'),
            new THREE.Color('#38BDF8'),
            new THREE.Color('#818CF8'),
            new THREE.Color('#FDE047')
        ];
        for (let i = 0; i < count; i++) {
            // Spherical distribution around solar system
            const radius = 40 + Math.random() * 80;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
            const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }
        return { positions: pos, colors: col };
    }, [count]);
    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.012;
            pointsRef.current.rotation.x += delta * 0.004;
        }
    });
    return (_jsxs("points", { ref: pointsRef, children: [_jsxs("bufferGeometry", { children: [_jsx("bufferAttribute", { attach: "attributes-position", count: positions.length / 3, array: positions, itemSize: 3 }), _jsx("bufferAttribute", { attach: "attributes-color", count: colors.length / 3, array: colors, itemSize: 3 })] }), _jsx("pointsMaterial", { size: 0.65, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true, blending: THREE.AdditiveBlending })] }));
};
