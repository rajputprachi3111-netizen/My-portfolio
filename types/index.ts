export type QualityPreset = 'draft' | 'standard' | 'high';

export type ShadingMode = 'pbr' | 'clay' | 'wireframe';

export type LightingPreset = 'studio' | 'outdoor' | 'warm' | 'dark';

export type ExportFormat = 'glb' | 'obj' | 'stl' | 'fbx';

export type SampleItemKey = 'helmet' | 'sneaker' | 'potion' | 'drone';

export interface SampleImage {
  id: SampleItemKey;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  creditCost: number;
  estTime: string;
  polyEstimate: string;
  meshType: SampleItemKey;
}

export interface ModelMetadata {
  id: string;
  name: string;
  meshType: SampleItemKey | 'custom';
  triangles: number;
  vertices: number;
  originalTriangles: number;
  dimensions: {
    x: number;
    y: number;
    z: number;
  };
  textureResolution: string;
  preset: QualityPreset;
  createdAt: string;
  thumbnailUrl: string;
  sourceImageUrl: string;
  shadingMode: ShadingMode;
  decimationRatio: number;
}

export interface SavedAsset {
  id: string;
  name: string;
  meshType: SampleItemKey | 'custom';
  createdAt: string;
  triangles: number;
  preset: QualityPreset;
  thumbnailUrl: string;
  sourceImageUrl: string;
  format: ExportFormat;
  fileSizeMb: number;
}

export interface GenerationStep {
  step: number;
  title: string;
  detail: string;
  progressPercent: number;
}

export interface GenerationState {
  isGenerating: boolean;
  currentStep: number;
  progress: number;
  statusText: string;
  elapsedSeconds: number;
}
