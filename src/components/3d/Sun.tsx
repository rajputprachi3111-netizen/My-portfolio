import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface SunProps {
  onSelect: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

export const Sun: React.FC<SunProps> = ({ onSelect, isHovered, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

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

  return (
    <group position={[0, 0, 0]}>
      {/* Central Core Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00E5FF"
          emissiveIntensity={isHovered ? 2.4 : 1.8}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>

      {/* Corona Glow Mesh */}
      <mesh ref={coronaRef} scale={1.25}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={isHovered ? 0.35 : 0.2}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Coronal Ring 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[3.2, 0.03, 16, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
      </mesh>

      {/* Outer Coronal Ring 2 */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[3.8, 0.02, 16, 64]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.4} />
      </mesh>

      {/* Central Omnidirectional Light */}
      <pointLight color="#00F0FF" intensity={18} distance={60} decay={1.5} />
      <pointLight color="#FFFFFF" intensity={10} distance={25} decay={2} />

      {/* Hover Telemetry Tag */}
      {isHovered && (
        <Html position={[0, 3.4, 0]} center distanceFactor={14} className="pointer-events-none select-none">
          <div className="hud-panel px-3 py-1.5 rounded border border-[#00F0FF] shadow-glow-cyan text-center whitespace-nowrap animate-fade-in">
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#00F0FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
              SOLAR CORE // IDENT MATRIX
            </div>
            <div className="text-xs font-orbitron font-bold text-white tracking-wider">
              THE ANGRY EAST INDIAN
            </div>
            <div className="text-[9px] font-mono text-slate-300">
              Overview & Master Telemetry
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
