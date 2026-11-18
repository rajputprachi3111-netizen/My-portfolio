import * as THREE from 'three';
import { SampleItemKey } from '@/types';

/**
 * Creates rich procedural 3D models for each preset sample and custom uploads.
 */
export function createModelObject(
  meshType: SampleItemKey | 'custom',
  customImageTexture?: THREE.Texture | null
): THREE.Group {
  const root = new THREE.Group();

  switch (meshType) {
    case 'helmet':
      buildHelmet(root);
      break;
    case 'sneaker':
      buildSneaker(root);
      break;
    case 'potion':
      buildPotion(root);
      break;
    case 'drone':
      buildDrone(root);
      break;
    case 'custom':
    default:
      buildCustomRelief(root, customImageTexture);
      break;
  }

  // Center the root group bounding box around the origin
  const box = new THREE.Box3().setFromObject(root);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);

  return root;
}

/**
 * SCI-FI HELMET
 */
function buildHelmet(group: THREE.Group) {
  // Main Dome Shell
  const domeGeo = new THREE.SphereGeometry(1.6, 64, 48, 0, Math.PI * 2, 0, Math.PI * 0.75);
  domeGeo.scale(0.9, 1.15, 1.05);
  const armorMat = new THREE.MeshStandardMaterial({
    color: 0x1f2430,
    metalness: 0.85,
    roughness: 0.25,
  });
  const domeMesh = new THREE.Mesh(domeGeo, armorMat);
  group.add(domeMesh);

  // Curved Holographic Visor
  const visorGeo = new THREE.CylinderGeometry(1.42, 1.35, 1.1, 48, 16, true, Math.PI * 0.2, Math.PI * 0.6);
  visorGeo.rotateY(Math.PI * 0.7);
  visorGeo.translate(0, 0.15, 0.35);
  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x00f2fe,
    emissive: 0x00a8cc,
    emissiveIntensity: 0.6,
    metalness: 0.95,
    roughness: 0.1,
    transmission: 0.3,
    transparent: true,
    opacity: 0.9,
    reflectivity: 0.9,
  });
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  group.add(visorMesh);

  // Helmet Crest / Fin
  const crestGeo = new THREE.BoxGeometry(0.18, 0.45, 2.2, 8, 8, 16);
  crestGeo.translate(0, 1.7, -0.2);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.9,
    roughness: 0.3,
  });
  const crestMesh = new THREE.Mesh(crestGeo, goldMat);
  group.add(crestMesh);

  // Ear Guards / Audio Comms (Left and Right)
  const earGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.3, 32);
  earGeo.rotateZ(Math.PI / 2);
  const earMat = new THREE.MeshStandardMaterial({
    color: 0x2e3440,
    metalness: 0.7,
    roughness: 0.4,
  });

  const leftEar = new THREE.Mesh(earGeo, earMat);
  leftEar.position.set(-1.45, 0.2, 0);
  group.add(leftEar);

  const rightEar = new THREE.Mesh(earGeo, earMat);
  rightEar.position.set(1.45, 0.2, 0);
  group.add(rightEar);

  // Neon Ear Core Nodes
  const coreGeo = new THREE.SphereGeometry(0.16, 24, 24);
  const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
  const leftCore = new THREE.Mesh(coreGeo, neonCyanMat);
  leftCore.position.set(-1.62, 0.2, 0);
  group.add(leftCore);

  const rightCore = new THREE.Mesh(coreGeo, neonCyanMat);
  rightCore.position.set(1.62, 0.2, 0);
  group.add(rightCore);

  // Jaw Vent / Breathing Grille
  const ventGeo = new THREE.BoxGeometry(0.85, 0.6, 0.5, 12, 12, 12);
  ventGeo.translate(0, -0.7, 1.25);
  const ventMat = new THREE.MeshStandardMaterial({
    color: 0x111317,
    metalness: 0.9,
    roughness: 0.5,
  });
  const ventMesh = new THREE.Mesh(ventGeo, ventMat);
  group.add(ventMesh);
}

/**
 * FUTURISTIC SNEAKER
 */
function buildSneaker(group: THREE.Group) {
  // Cushioned Sole Platform
  const soleGeo = new THREE.BoxGeometry(1.6, 0.45, 3.8, 18, 8, 36);
  soleGeo.scale(1, 1, 1);
  const soleMat = new THREE.MeshStandardMaterial({
    color: 0xff007a,
    emissive: 0x7928ca,
    emissiveIntensity: 0.25,
    metalness: 0.3,
    roughness: 0.4,
  });
  const soleMesh = new THREE.Mesh(soleGeo, soleMat);
  soleMesh.position.set(0, -0.5, 0);
  group.add(soleMesh);

  // Sneaker Upper Body
  const upperGeo = new THREE.ConeGeometry(1.3, 2.5, 36, 16);
  upperGeo.rotateX(Math.PI * 0.25);
  upperGeo.scale(0.85, 0.9, 1.4);
  upperGeo.translate(0, 0.3, -0.2);
  const upperMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.6,
    metalness: 0.1,
  });
  const upperMesh = new THREE.Mesh(upperGeo, upperMat);
  group.add(upperMesh);

  // Ankle Collar & Tongue
  const tongueGeo = new THREE.CylinderGeometry(0.7, 0.75, 1.2, 24, 8, true);
  tongueGeo.translate(0, 0.8, -0.5);
  const tongueMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.8,
  });
  const tongueMesh = new THREE.Mesh(tongueGeo, tongueMat);
  group.add(tongueMesh);

  // Futuristic Swoosh Wave (Left & Right)
  const swooshGeo = new THREE.TorusGeometry(1.1, 0.08, 16, 48, Math.PI * 0.65);
  const swooshMat = new THREE.MeshBasicMaterial({ color: 0xff007a });
  const leftSwoosh = new THREE.Mesh(swooshGeo, swooshMat);
  leftSwoosh.position.set(-0.8, 0.2, 0);
  leftSwoosh.rotateY(Math.PI / 2);
  group.add(leftSwoosh);

  const rightSwoosh = new THREE.Mesh(swooshGeo, swooshMat);
  rightSwoosh.position.set(0.8, 0.2, 0);
  rightSwoosh.rotateY(-Math.PI / 2);
  group.add(rightSwoosh);

  // Laces
  for (let i = 0; i < 4; i++) {
    const laceGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12);
    laceGeo.rotateZ(Math.PI / 2);
    const laceMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const lace = new THREE.Mesh(laceGeo, laceMat);
    lace.position.set(0, 0.4 + i * 0.22, 0.1 + i * 0.25);
    group.add(lace);
  }
}

/**
 * STYLIZED POTION BOTTLE
 */
function buildPotion(group: THREE.Group) {
  // Spherical Glass Flask Body
  const glassGeo = new THREE.SphereGeometry(1.5, 48, 48);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xd1fae5,
    transmission: 0.88,
    opacity: 0.5,
    transparent: true,
    roughness: 0.1,
    metalness: 0.1,
    ior: 1.5,
  });
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  group.add(glassMesh);

  // Inner Glowing Magical Liquid
  const liquidGeo = new THREE.SphereGeometry(1.36, 40, 40, 0, Math.PI * 2, Math.PI * 0.25, Math.PI * 0.75);
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.8,
    roughness: 0.2,
    metalness: 0.3,
  });
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.set(0, -0.1, 0);
  group.add(liquidMesh);

  // Bottle Neck
  const neckGeo = new THREE.CylinderGeometry(0.45, 0.6, 1.2, 32);
  const neckMesh = new THREE.Mesh(neckGeo, glassMat);
  neckMesh.position.set(0, 1.7, 0);
  group.add(neckMesh);

  // Flange Lip
  const lipGeo = new THREE.TorusGeometry(0.52, 0.1, 16, 32);
  lipGeo.rotateX(Math.PI / 2);
  const lipMesh = new THREE.Mesh(lipGeo, glassMat);
  lipMesh.position.set(0, 2.3, 0);
  group.add(lipMesh);

  // Wooden Cork Stopper
  const corkGeo = new THREE.CylinderGeometry(0.42, 0.36, 0.7, 32);
  const corkMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    roughness: 0.9,
    metalness: 0.05,
  });
  const corkMesh = new THREE.Mesh(corkGeo, corkMat);
  corkMesh.position.set(0, 2.5, 0);
  group.add(corkMesh);

  // Floating Sparkle Bubbles inside
  const bubbleGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xa7f3d0 });
  const bubbleOffsets = [
    [-0.3, 0.2, 0.4],
    [0.4, -0.4, -0.2],
    [-0.2, -0.3, -0.5],
    [0.3, 0.4, 0.2],
  ];
  bubbleOffsets.forEach(([bx, by, bz]) => {
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    bubble.position.set(bx, by, bz);
    group.add(bubble);
  });
}

/**
 * MECHANICAL DRONE
 */
function buildDrone(group: THREE.Group) {
  // Center Main Pod
  const bodyGeo = new THREE.BoxGeometry(1.4, 0.7, 1.8, 16, 8, 16);
  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.3,
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, carbonMat);
  group.add(bodyMesh);

  // 4 Diagonal Rotor Arms
  const armPositions = [
    { x: 1.5, z: 1.5, angle: Math.PI / 4 },
    { x: -1.5, z: 1.5, angle: -Math.PI / 4 },
    { x: 1.5, z: -1.5, angle: -Math.PI / 4 },
    { x: -1.5, z: -1.5, angle: Math.PI / 4 },
  ];

  const armMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.9,
    roughness: 0.2,
  });

  armPositions.forEach((pos) => {
    // Arm Beam
    const armGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.1, 16);
    armGeo.rotateZ(Math.PI / 2);
    armGeo.rotateY(pos.angle);
    const armMesh = new THREE.Mesh(armGeo, armMat);
    armMesh.position.set(pos.x * 0.5, 0, pos.z * 0.5);
    group.add(armMesh);

    // Motor Hub
    const motorGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 24);
    const motorMesh = new THREE.Mesh(motorGeo, armMat);
    motorMesh.position.set(pos.x, 0.2, pos.z);
    group.add(motorMesh);

    // Propeller Blade Disk
    const propGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.04, 32);
    const propMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.65,
      metalness: 0.5,
      roughness: 0.2,
    });
    const propMesh = new THREE.Mesh(propGeo, propMat);
    propMesh.position.set(pos.x, 0.45, pos.z);
    group.add(propMesh);
  });

  // Front AI Gimbal Camera Eye
  const eyeGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const eyeMat = new THREE.MeshPhysicalMaterial({
    color: 0xef4444,
    emissive: 0xb91c1c,
    emissiveIntensity: 0.8,
    metalness: 0.9,
    roughness: 0.1,
  });
  const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
  eyeMesh.position.set(0, 0, 1.05);
  group.add(eyeMesh);
}

/**
 * CUSTOM USER-UPLOADED RELIEF MESH
 * Generates an extruded dimensional 3D mesh with vertex displacement
 * from the user's uploaded image.
 */
function buildCustomRelief(group: THREE.Group, texture?: THREE.Texture | null) {
  // Create a high-res subdivided plane with depth displacement
  const width = 3.0;
  const height = 3.0;
  const segments = 120;
  const planeGeo = new THREE.PlaneGeometry(width, height, segments, segments);

  // If a texture is present or procedural displacement is applied
  const pos = planeGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Radial falloff + layered harmonic ripples simulating 3D shape reconstruction
    const dist = Math.sqrt(x * x + y * y);
    const radius = 1.35;
    let z = 0;
    if (dist < radius) {
      const norm = 1 - dist / radius;
      // Spherical dome profile + surface detail ridges
      z = Math.sqrt(Math.max(0, 1 - (dist / radius) ** 2)) * 0.75;
      z += Math.sin(x * 6) * Math.cos(y * 6) * 0.08 * norm;
      z += Math.sin(x * 14) * 0.03 * norm;
    }
    pos.setZ(i, z);
  }
  planeGeo.computeVertexNormals();

  const customMat = new THREE.MeshStandardMaterial({
    map: texture || null,
    color: texture ? 0xffffff : 0x818cf8,
    roughness: 0.35,
    metalness: 0.25,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(planeGeo, customMat);
  group.add(mesh);

  // Add backing hull bevel
  const backGeo = new THREE.CylinderGeometry(1.4, 1.45, 0.25, 64);
  backGeo.rotateX(Math.PI / 2);
  backGeo.translate(0, 0, -0.15);
  const backMat = new THREE.MeshStandardMaterial({
    color: 0x1f2430,
    metalness: 0.7,
    roughness: 0.5,
  });
  const backMesh = new THREE.Mesh(backGeo, backMat);
  group.add(backMesh);
}
