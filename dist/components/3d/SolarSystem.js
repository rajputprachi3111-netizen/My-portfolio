import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { PLANET_CONFIGS } from '../../data/portfolioData';
import { Starfield } from './Starfield';
import { Sun } from './Sun';
import { OrbitPath } from './OrbitPath';
import { Planet } from './Planet';
import { soundEffects } from '../hud/SoundEffects';
// Camera Director for smooth sci-fi zoom & framing transitions
const CameraDirector = ({ activeSection }) => {
    const { camera } = useThree();
    const targetPos = useRef(new THREE.Vector3(0, 22, 38));
    const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
    useEffect(() => {
        if (!activeSection) {
            targetPos.current.set(0, 22, 38);
            lookTarget.current.set(0, 0, 0);
        }
        else if (activeSection === 'overview') {
            targetPos.current.set(0, 5, 12);
            lookTarget.current.set(0, 0, 0);
        }
        else if (activeSection === 'web') {
            targetPos.current.set(6, 6, 12);
            lookTarget.current.set(7, 0, 2);
        }
        else if (activeSection === 'blender') {
            targetPos.current.set(10, 8, 16);
            lookTarget.current.set(12, 0, 5);
        }
        else if (activeSection === 'media') {
            targetPos.current.set(14, 10, 20);
            lookTarget.current.set(16, 0, 8);
        }
        else if (activeSection === 'contact') {
            targetPos.current.set(18, 12, 24);
            lookTarget.current.set(20, 0, 10);
        }
    }, [activeSection]);
    useFrame(() => {
        camera.position.lerp(targetPos.current, 0.05);
    });
    return null;
};
export const SolarSystem = ({ activeSection, onSelectSection, hoveredSection, onHoverSection }) => {
    const handlePlanetSelect = (id) => {
        soundEffects.playPlanetSelect();
        onSelectSection(id);
    };
    const handleHover = (id) => {
        if (id && id !== hoveredSection) {
            soundEffects.playHover();
        }
        onHoverSection(id);
    };
    return (_jsx("div", { className: "w-full h-full absolute inset-0 z-0", children: _jsxs(Canvas, { camera: { position: [0, 24, 40], fov: 45 }, gl: { antialias: true, powerPreference: 'high-performance', alpha: false }, onPointerMissed: () => {
                // If clicked outside, close modal or keep selected
            }, children: [_jsx("color", { attach: "background", args: ['#05070D'] }), _jsx("ambientLight", { intensity: 0.25 }), _jsx(Starfield, { count: 3200 }), _jsx(Sun, { onSelect: () => handlePlanetSelect('overview'), isHovered: hoveredSection === 'overview', onHover: (hovered) => handleHover(hovered ? 'overview' : null) }), PLANET_CONFIGS.map((planet) => {
                    const isHighlighted = hoveredSection === planet.id || activeSection === planet.id;
                    return (_jsxs(React.Fragment, { children: [_jsx(OrbitPath, { radius: planet.orbitDistance, color: planet.color, isHighlighted: isHighlighted }), _jsx(Planet, { id: planet.id, name: planet.name, title: planet.title, subtitle: planet.subtitle, badge: planet.badge, color: planet.color, glowColor: planet.glowColor, radius: planet.radius, orbitDistance: planet.orbitDistance, orbitSpeed: planet.orbitSpeed, rotationSpeed: planet.rotationSpeed, description: planet.description, isSelected: activeSection === planet.id, isHovered: hoveredSection === planet.id, onHover: handleHover, onSelect: handlePlanetSelect })] }, planet.id));
                }), _jsx(CameraDirector, { activeSection: activeSection }), _jsx(OrbitControls, { enableDamping: true, dampingFactor: 0.06, rotateSpeed: 0.7, zoomSpeed: 0.9, maxDistance: 70, minDistance: 8, maxPolarAngle: Math.PI / 2 + 0.15, minPolarAngle: Math.PI / 8 })] }) }));
};
