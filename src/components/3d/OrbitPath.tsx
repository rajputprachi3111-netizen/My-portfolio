import React from 'react';
import * as THREE from 'three';

interface OrbitPathProps {
  radius: number;
  color?: string;
  isHighlighted?: boolean;
}

export const OrbitPath: React.FC<OrbitPathProps> = ({
  radius,
  color = '#00F0FF',
  isHighlighted = false
}) => {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* Primary Orbit Ring */}
      <mesh>
        <ringGeometry args={[radius - 0.03, radius + 0.03, 96]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHighlighted ? 0.85 : 0.22}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Subtle outer halo ring for active/hovered orbit */}
      {isHighlighted && (
        <mesh>
          <ringGeometry args={[radius - 0.12, radius + 0.12, 96]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};
