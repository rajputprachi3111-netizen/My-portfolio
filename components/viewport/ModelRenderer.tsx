'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SampleItemKey, ShadingMode } from '@/types';
import { createModelObject } from '@/lib/proceduralGeometry';
import { decimateGeometry } from '@/lib/decimation';

interface ModelRendererProps {
  meshType: SampleItemKey | 'custom';
  shadingMode: ShadingMode;
  decimationRatio: number;
  autoRotate: boolean;
  textureUrl?: string | null;
  onMeshStatsUpdate?: (stats: {
    triangles: number;
    vertices: number;
    dimensions: { x: number; y: number; z: number };
  }) => void;
  onModelReady?: (object: THREE.Object3D) => void;
}

export const ModelRenderer: React.FC<ModelRendererProps> = ({
  meshType,
  shadingMode,
  decimationRatio,
  autoRotate,
  textureUrl,
  onMeshStatsUpdate,
  onModelReady,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const baseObjectRef = useRef<THREE.Group | null>(null);

  // Load custom texture if provided
  const texture = useMemo(() => {
    if (!textureUrl) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(textureUrl);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [textureUrl]);

  // Build the procedural 3D model whenever meshType changes
  useEffect(() => {
    const obj = createModelObject(meshType, texture);
    baseObjectRef.current = obj;

    if (groupRef.current) {
      // Clear previous children
      while (groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }
      groupRef.current.add(obj);
    }

    if (onModelReady) {
      onModelReady(obj);
    }
  }, [meshType, texture, onModelReady]);

  // Apply decimation and shading modes dynamically to the mesh instances
  useEffect(() => {
    if (!baseObjectRef.current || !groupRef.current) return;

    let totalTris = 0;
    let totalVerts = 0;

    // Materials for clay and wireframe modes
    const clayMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.6,
      metalness: 0.1,
      flatShading: false,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      wireframeLinewidth: 1.5,
    });

    baseObjectRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Cache original geometry and material if not already cached
        if (!mesh.userData.originalGeometry) {
          mesh.userData.originalGeometry = mesh.geometry.clone();
        }
        if (!mesh.userData.originalMaterial) {
          mesh.userData.originalMaterial = mesh.material;
        }

        // Apply Decimation if ratio is < 1.0
        if (decimationRatio < 0.98) {
          const { geometry, triangles, vertices } = decimateGeometry(
            mesh.userData.originalGeometry,
            decimationRatio
          );
          mesh.geometry.dispose();
          mesh.geometry = geometry;
          totalTris += triangles;
          totalVerts += vertices;
        } else {
          // Restore full fidelity geometry
          mesh.geometry.dispose();
          mesh.geometry = mesh.userData.originalGeometry.clone();
          const triCount = mesh.geometry.index
            ? mesh.geometry.index.count / 3
            : mesh.geometry.attributes.position.count / 3;
          totalTris += Math.round(triCount);
          totalVerts += mesh.geometry.attributes.position.count;
        }

        // Apply Shading Mode
        if (shadingMode === 'clay') {
          mesh.material = clayMaterial;
        } else if (shadingMode === 'wireframe') {
          mesh.material = wireframeMaterial;
        } else {
          // 'pbr' mode: restore original rich materials
          mesh.material = mesh.userData.originalMaterial;
        }
      }
    });

    // Compute updated bounding box
    const box = new THREE.Box3().setFromObject(baseObjectRef.current);
    const size = new THREE.Vector3();
    box.getSize(size);

    if (onMeshStatsUpdate) {
      onMeshStatsUpdate({
        triangles: totalTris,
        vertices: totalVerts,
        dimensions: {
          x: parseFloat(size.x.toFixed(2)),
          y: parseFloat(size.y.toFixed(2)),
          z: parseFloat(size.z.toFixed(2)),
        },
      });
    }
  }, [shadingMode, decimationRatio, onMeshStatsUpdate]);

  // Turntable smooth continuous rotation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return <group ref={groupRef} position={[0, 0, 0]} />;
};
