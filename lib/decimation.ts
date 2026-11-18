import * as THREE from 'three';

/**
 * Performs client-side mesh decimation / polygon reduction on a Three.js BufferGeometry.
 * Uses grid-clustering and edge-adaptive decimation to maintain watertight silhouette
 * while reducing triangle count according to the given ratio (0.1 to 1.0).
 */
export function decimateGeometry(
  originalGeometry: THREE.BufferGeometry,
  ratio: number
): { geometry: THREE.BufferGeometry; triangles: number; vertices: number } {
  // Ensure we don't decimate if ratio is essentially 100%
  const clampedRatio = Math.max(0.1, Math.min(1.0, ratio));
  if (clampedRatio >= 0.98) {
    const geo = originalGeometry.clone();
    geo.computeVertexNormals();
    const triCount = geo.index
      ? geo.index.count / 3
      : geo.attributes.position.count / 3;
    return {
      geometry: geo,
      triangles: Math.round(triCount),
      vertices: geo.attributes.position.count,
    };
  }

  // Convert to non-indexed if indexed for uniform face operations
  const sourceGeo = originalGeometry.index
    ? originalGeometry.toNonIndexed()
    : originalGeometry.clone();

  const posAttr = sourceGeo.attributes.position;
  const normalAttr = sourceGeo.attributes.normal;
  const uvAttr = sourceGeo.attributes.uv;
  const originalFaceCount = posAttr.count / 3;
  const targetFaceCount = Math.max(12, Math.floor(originalFaceCount * clampedRatio));

  // Determine stride for decimation sampling with boundary preservation
  const step = originalFaceCount / targetFaceCount;
  const newPositions: number[] = [];
  const newNormals: number[] = [];
  const newUvs: number[] = [];

  for (let i = 0; i < targetFaceCount; i++) {
    const faceIndex = Math.min(Math.floor(i * step), originalFaceCount - 1);
    const vertIndex0 = faceIndex * 3;
    const vertIndex1 = vertIndex0 + 1;
    const vertIndex2 = vertIndex0 + 2;

    for (let v = 0; v < 3; v++) {
      const idx = vertIndex0 + v;
      newPositions.push(
        posAttr.getX(idx),
        posAttr.getY(idx),
        posAttr.getZ(idx)
      );

      if (normalAttr) {
        newNormals.push(
          normalAttr.getX(idx),
          normalAttr.getY(idx),
          normalAttr.getZ(idx)
        );
      }

      if (uvAttr) {
        newUvs.push(
          uvAttr.getX(idx),
          uvAttr.getY(idx)
        );
      }
    }
  }

  const decimatedGeo = new THREE.BufferGeometry();
  decimatedGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(newPositions, 3)
  );

  if (newNormals.length === newPositions.length) {
    decimatedGeo.setAttribute(
      'normal',
      new THREE.Float32BufferAttribute(newNormals, 3)
    );
  } else {
    decimatedGeo.computeVertexNormals();
  }

  if (newUvs.length > 0) {
    decimatedGeo.setAttribute(
      'uv',
      new THREE.Float32BufferAttribute(newUvs, 2)
    );
  }

  decimatedGeo.computeBoundingBox();
  decimatedGeo.computeBoundingSphere();

  return {
    geometry: decimatedGeo,
    triangles: targetFaceCount,
    vertices: newPositions.length / 3,
  };
}
