import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Model3DProps {
  type: 'football' | 'doughnut';
  wireframe: boolean;
  viewMode: 'rendered' | 'solid' | 'wireframe';
  autoRotate: boolean;
}

const ProceduralFootball: React.FC<{ wireframe: boolean; viewMode: string }> = ({
  wireframe,
  viewMode
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Football Shell (Truncated Icosahedron approximation) */}
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color={viewMode === 'solid' ? '#CBD5E1' : '#F8FAFC'}
          roughness={viewMode === 'solid' ? 0.8 : 0.25}
          metalness={viewMode === 'solid' ? 0.1 : 0.2}
          wireframe={wireframe || viewMode === 'wireframe'}
        />
      </mesh>

      {/* Dark Pentagon Facets */}
      <mesh scale={1.002}>
        <dodecahedronGeometry args={[1.48, 0]} />
        <meshStandardMaterial
          color={viewMode === 'solid' ? '#475569' : '#0F172A'}
          roughness={0.4}
          metalness={0.6}
          wireframe={wireframe || viewMode === 'wireframe'}
        />
      </mesh>

      {/* Holographic Seam Insets */}
      <mesh scale={1.01}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={viewMode === 'solid' ? 0.15 : 0.45}
        />
      </mesh>
    </group>
  );
};

const ProceduralDoughnut: React.FC<{ wireframe: boolean; viewMode: string }> = ({
  wireframe,
  viewMode
}) => {
  const groupRef = useRef<THREE.Group>(null);

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
      list.push({ pos: [x, y, z] as [number, number, number], rot: [rotX, rotY, rotZ] as [number, number, number], color });
    }
    return list;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x = Math.sin(delta * 2) * 0.05 + 0.35;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {/* Dough Base (Torus) */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.3, 0.55, 32, 64]} />
        <meshStandardMaterial
          color={viewMode === 'solid' ? '#94A3B8' : '#D97706'}
          roughness={viewMode === 'solid' ? 0.9 : 0.65}
          metalness={0.05}
          wireframe={wireframe || viewMode === 'wireframe'}
        />
      </mesh>

      {/* Glossy Dripping Frosting */}
      {viewMode !== 'wireframe' && (
        <mesh position={[0, 0.08, 0]} scale={[1.02, 1.05, 1.02]}>
          <torusGeometry args={[1.3, 0.53, 32, 64, Math.PI * 2]} />
          <meshStandardMaterial
            color={viewMode === 'solid' ? '#64748B' : '#EC4899'}
            roughness={viewMode === 'solid' ? 0.5 : 0.15}
            metalness={0.1}
            wireframe={wireframe}
          />
        </mesh>
      )}

      {/* Colorful Sprinkles */}
      {viewMode === 'rendered' &&
        sprinkles.map((sp, idx) => (
          <mesh key={idx} position={sp.pos} rotation={sp.rot}>
            <cylinderGeometry args={[0.035, 0.035, 0.18, 8]} />
            <meshStandardMaterial color={sp.color} roughness={0.3} />
          </mesh>
        ))}
    </group>
  );
};

export const BlenderModelPreview: React.FC<Model3DProps> = ({
  type,
  wireframe,
  viewMode,
  autoRotate
}) => {
  return (
    <div className="w-full h-full min-h-[280px] sm:min-h-[340px] relative rounded-lg overflow-hidden bg-void-950/80 border border-slate-800">
      <Canvas
        camera={{ position: [0, 1.5, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={viewMode === 'solid' ? 1.2 : 0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
        <directionalLight position={[-5, -2, -4]} intensity={0.6} color="#00F0FF" />
        <pointLight position={[0, -2, 2]} intensity={0.8} color="#F59E0B" />

        {type === 'football' ? (
          <ProceduralFootball wireframe={wireframe} viewMode={viewMode} />
        ) : (
          <ProceduralDoughnut wireframe={wireframe} viewMode={viewMode} />
        )}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          maxDistance={7}
          minDistance={2.5}
        />
      </Canvas>

      {/* Sci-Fi Overlay Watermark & Interaction Cue */}
      <div className="absolute top-2.5 left-3 pointer-events-none flex items-center gap-1.5 text-[10px] font-mono text-[#00F0FF]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
        LIVE 3D VIEWPORT // {type.toUpperCase()}
      </div>

      <div className="absolute bottom-2.5 right-3 pointer-events-none text-[9px] font-mono text-slate-400 bg-void-950/80 px-2 py-0.5 rounded border border-slate-700">
        DRAG TO ROTATE &bull; PINCH TO ZOOM
      </div>
    </div>
  );
};
