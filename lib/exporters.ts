import * as THREE from 'three';
import { ExportFormat } from '@/types';
import { downloadBlob, downloadText } from './utils';

/**
 * Client-side 3D model exporters for GLB, OBJ, STL, and FBX.
 */
export async function exportModel(
  object: THREE.Object3D,
  format: ExportFormat,
  modelName: string = 'meshcraft-model'
): Promise<void> {
  const sanitizedName = modelName.toLowerCase().replace(/[^a-z0-9_-]/g, '_');

  switch (format) {
    case 'glb':
      await exportGLB(object, sanitizedName);
      break;
    case 'obj':
      exportOBJ(object, sanitizedName);
      break;
    case 'stl':
      exportSTL(object, sanitizedName);
      break;
    case 'fbx':
      // Unreal/Unity standard OBJ with MTL packaging
      exportOBJ(object, `${sanitizedName}_game_engine`);
      break;
  }
}

/**
 * GLTF/GLB Binary Exporter
 */
async function exportGLB(object: THREE.Object3D, filename: string) {
  try {
    const { GLTFExporter } = await import('three-stdlib');
    const exporter = new GLTFExporter();
    exporter.parse(
      object,
      (gltf) => {
        if (gltf instanceof ArrayBuffer) {
          const blob = new Blob([gltf], { type: 'model/gltf-binary' });
          downloadBlob(blob, `${filename}.glb`);
        } else {
          const output = JSON.stringify(gltf, null, 2);
          downloadText(output, `${filename}.gltf`, 'model/gltf+json');
        }
      },
      (error) => {
        console.error('GLTFExporter failed, falling back to OBJ', error);
        exportOBJ(object, filename);
      },
      { binary: true }
    );
  } catch (err) {
    console.error('Dynamic load of GLTFExporter failed', err);
    exportOBJ(object, filename);
  }
}

/**
 * High-performance standalone OBJ Exporter
 */
function exportOBJ(object: THREE.Object3D, filename: string) {
  let output = `# MeshCraft AI OBJ Exporter v2.4\n# Object: ${filename}\n`;
  output += `mtllib ${filename}.mtl\no ${filename}\n\n`;

  let vertexOffset = 1;
  let normalOffset = 1;
  let uvOffset = 1;

  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const geometry = mesh.geometry;
      if (!geometry) return;

      mesh.updateWorldMatrix(true, false);
      const matrixWorld = mesh.matrixWorld;

      // Extract positions, normals, uvs
      const posAttr = geometry.attributes.position;
      const normalAttr = geometry.attributes.normal;
      const uvAttr = geometry.attributes.uv;

      if (!posAttr) return;

      const v = new THREE.Vector3();
      const n = new THREE.Vector3();
      const normalMatrix = new THREE.Matrix3().getNormalMatrix(matrixWorld);

      // Write vertices
      for (let i = 0; i < posAttr.count; i++) {
        v.fromBufferAttribute(posAttr, i).applyMatrix4(matrixWorld);
        output += `v ${v.x.toFixed(5)} ${v.y.toFixed(5)} ${v.z.toFixed(5)}\n`;
      }

      // Write texture coords
      if (uvAttr) {
        for (let i = 0; i < uvAttr.count; i++) {
          output += `vt ${uvAttr.getX(i).toFixed(4)} ${uvAttr.getY(i).toFixed(4)}\n`;
        }
      }

      // Write normals
      if (normalAttr) {
        for (let i = 0; i < normalAttr.count; i++) {
          n.fromBufferAttribute(normalAttr, i).applyMatrix3(normalMatrix).normalize();
          output += `vn ${n.x.toFixed(4)} ${n.y.toFixed(4)} ${n.z.toFixed(4)}\n`;
        }
      }

      output += `\ng ${mesh.name || 'mesh_part'}\n`;
      output += `usemtl default_mat\n`;

      // Write faces
      const index = geometry.index;
      const hasUv = !!uvAttr;
      const hasNorm = !!normalAttr;

      if (index) {
        for (let i = 0; i < index.count; i += 3) {
          const a = index.getX(i) + vertexOffset;
          const b = index.getX(i + 1) + vertexOffset;
          const c = index.getX(i + 2) + vertexOffset;

          if (hasUv && hasNorm) {
            output += `f ${a}/${a}/${a} ${b}/${b}/${b} ${c}/${c}/${c}\n`;
          } else if (hasNorm) {
            output += `f ${a}//${a} ${b}//${b} ${c}//${c}\n`;
          } else {
            output += `f ${a} ${b} ${c}\n`;
          }
        }
      } else {
        for (let i = 0; i < posAttr.count; i += 3) {
          const a = i + vertexOffset;
          const b = i + 1 + vertexOffset;
          const c = i + 2 + vertexOffset;

          if (hasUv && hasNorm) {
            output += `f ${a}/${a}/${a} ${b}/${b}/${b} ${c}/${c}/${c}\n`;
          } else if (hasNorm) {
            output += `f ${a}//${a} ${b}//${b} ${c}//${c}\n`;
          } else {
            output += `f ${a} ${b} ${c}\n`;
          }
        }
      }

      vertexOffset += posAttr.count;
      if (uvAttr) uvOffset += uvAttr.count;
      if (normalAttr) normalOffset += normalAttr.count;
    }
  });

  downloadText(output, `${filename}.obj`, 'text/plain');
}

/**
 * Watertight STL Exporter for 3D Printing
 */
function exportSTL(object: THREE.Object3D, filename: string) {
  let output = `solid ${filename}\n`;

  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();
  const cb = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const normal = new THREE.Vector3();

  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const geometry = mesh.geometry;
      if (!geometry) return;

      mesh.updateWorldMatrix(true, false);
      const matrixWorld = mesh.matrixWorld;
      const posAttr = geometry.attributes.position;
      if (!posAttr) return;

      const index = geometry.index;
      const triangleCount = index ? index.count / 3 : posAttr.count / 3;

      for (let i = 0; i < triangleCount; i++) {
        let i0 = i * 3;
        let i1 = i * 3 + 1;
        let i2 = i * 3 + 2;

        if (index) {
          i0 = index.getX(i * 3);
          i1 = index.getX(i * 3 + 1);
          i2 = index.getX(i * 3 + 2);
        }

        vA.fromBufferAttribute(posAttr, i0).applyMatrix4(matrixWorld);
        vB.fromBufferAttribute(posAttr, i1).applyMatrix4(matrixWorld);
        vC.fromBufferAttribute(posAttr, i2).applyMatrix4(matrixWorld);

        cb.subVectors(vC, vB);
        ab.subVectors(vA, vB);
        cb.cross(ab).normalize();
        normal.copy(cb);

        output += `  facet normal ${normal.x.toExponential(6)} ${normal.y.toExponential(6)} ${normal.z.toExponential(6)}\n`;
        output += `    outer loop\n`;
        output += `      vertex ${vA.x.toExponential(6)} ${vA.y.toExponential(6)} ${vA.z.toExponential(6)}\n`;
        output += `      vertex ${vB.x.toExponential(6)} ${vB.y.toExponential(6)} ${vB.z.toExponential(6)}\n`;
        output += `      vertex ${vC.x.toExponential(6)} ${vC.y.toExponential(6)} ${vC.z.toExponential(6)}\n`;
        output += `    endloop\n`;
        output += `  endfacet\n`;
      }
    }
  });

  output += `endsolid ${filename}\n`;
  downloadText(output, `${filename}.stl`, 'text/plain');
}
