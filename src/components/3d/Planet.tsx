import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ActiveSection } from '../../types';

interface PlanetProps {
  id: ActiveSection;
  name: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  glowColor: string;
  radius: number;
  orbitDistance: number;
  orbitSpeed: number;
  rotationSpeed: number;
  description: string;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (id: ActiveSection | null) => void;
  onSelect: (id: ActiveSection) => void;
}

export const Planet: React.FC<PlanetProps> = ({
  id,
  name,
  title,
  subtitle,
  badge,
  color,
  glowColor,
  radius,
  orbitDistance,
  orbitSpeed,
  rotationSpeed,
  description,
  isSelected,
  isHovered,
  onHover,
  onSelect
}) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Individual phase offset based on ID so they start spaced out around the sun
  const phaseOffset = {
    web: 0,
    blender: Math.PI * 0.55,
    media: Math.PI * 1.15,
    contact: Math.PI * 1.7
  }[id as string] || 0;

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

  return (
    <group ref={planetGroupRef}>
      {/* Planet Sphere */}
      <mesh
        ref={planetMeshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[radius, 36, 36]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered || isSelected ? 1.6 : 0.4}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Planetary Atmosphere / Glow Shield */}
      <mesh scale={1.2}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered || isSelected ? 0.35 : 0.12}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Distinct Orbital Accent Ring for specific planets */}
      {(id === 'blender' || id === 'web') && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[radius * 1.45, radius * 1.7, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Local point light highlighting the planet */}
      <pointLight color={color} intensity={isSelected ? 4 : 1.5} distance={6} decay={2} />

      {/* Floating Sci-Fi HUD Tooltip when Hovered or Selected */}
      {isHovered && (
        <Html
          position={[0, radius + 1.2, 0]}
          center
          distanceFactor={15}
          className="pointer-events-none select-none z-50"
        >
          <div
            className="hud-panel p-3 rounded-lg border text-left min-w-[210px] shadow-2xl transition-all"
            style={{ borderColor: color, boxShadow: `0 0 20px ${glowColor}` }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400">
                {name}
              </span>
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded tracking-widest font-semibold"
                style={{ backgroundColor: `${color}25`, color: color }}
              >
                {badge}
              </span>
            </div>

            <div className="text-sm font-orbitron font-bold text-white mb-0.5">
              {title}
            </div>

            <div className="text-[11px] font-mono text-cyan-300/80 mb-2">
              {subtitle}
            </div>

            <p className="text-[10px] font-sans text-slate-300 leading-tight mb-2">
              {description}
            </p>

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-slate-700/60 pt-1.5">
              <span className="text-[#00F0FF] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                TELEMETRY LOCKED
              </span>
              <span className="text-white font-semibold">TAP TO ENGAGE &gt;&gt;</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
