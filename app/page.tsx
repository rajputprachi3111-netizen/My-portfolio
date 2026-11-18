'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { Navbar } from '@/components/layout/Navbar';
import { LeftSidebar } from '@/components/panels/LeftSidebar';
import { RightSidebar } from '@/components/panels/RightSidebar';
import { AssetDrawer } from '@/components/modals/AssetDrawer';
import { PricingModal } from '@/components/modals/PricingModal';
import { SAMPLE_IMAGES, QUALITY_PRESETS_DATA } from '@/lib/sampleData';
import {
  SampleImage,
  SampleItemKey,
  QualityPreset,
  ShadingMode,
  LightingPreset,
  ModelMetadata,
  SavedAsset,
  GenerationState,
} from '@/types';

// Dynamic import for ThreeViewport to guarantee clean Next.js SSR hydration
const ThreeViewport = dynamic(
  () => import('@/components/viewport/ThreeViewport').then((mod) => mod.ThreeViewport),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 h-full w-full bg-studio-950 flex flex-col items-center justify-center text-zinc-500">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-3" />
        <span className="text-xs font-medium">Initializing WebGL 2.0 Viewport...</span>
      </div>
    ),
  }
);

// Initial starter assets
const INITIAL_SAVED_ASSETS: SavedAsset[] = [
  {
    id: 'asset_init_1',
    name: 'Apex Tactical Helmet',
    meshType: 'helmet',
    createdAt: 'Nov 18, 2026',
    triangles: 34800,
    preset: 'standard',
    thumbnailUrl: SAMPLE_IMAGES[0].thumbnail,
    sourceImageUrl: SAMPLE_IMAGES[0].thumbnail,
    format: 'glb',
    fileSizeMb: 4.2,
  },
  {
    id: 'asset_init_2',
    name: 'Neo-Runner V3 Sneaker',
    meshType: 'sneaker',
    createdAt: 'Nov 17, 2026',
    triangles: 38200,
    preset: 'high',
    thumbnailUrl: SAMPLE_IMAGES[1].thumbnail,
    sourceImageUrl: SAMPLE_IMAGES[1].thumbnail,
    format: 'obj',
    fileSizeMb: 5.6,
  },
];

export default function MeshCraftStudio() {
  // App state
  const [creditBalance, setCreditBalance] = useState(10);
  const [currentImage, setCurrentImage] = useState<string | null>(SAMPLE_IMAGES[0].thumbnail);
  const [cleanedImage, setCleanedImage] = useState<string | null>(SAMPLE_IMAGES[0].thumbnail);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [autoRemoveBg, setAutoRemoveBg] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<QualityPreset>('standard');

  // 3D Model state
  const [meshType, setMeshType] = useState<SampleItemKey | 'custom'>('helmet');
  const [modelName, setModelName] = useState('Apex Tactical Helmet');
  const [shadingMode, setShadingMode] = useState<ShadingMode>('pbr');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studio');
  const [decimationRatio, setDecimationRatio] = useState(1.0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [activeModelObject, setActiveModelObject] = useState<THREE.Object3D | null>(null);

  // Model Metadata
  const [metadata, setMetadata] = useState<ModelMetadata>({
    id: 'mc_helmet_default',
    name: 'Apex Tactical Helmet',
    meshType: 'helmet',
    triangles: 34800,
    vertices: 17402,
    originalTriangles: 34800,
    dimensions: { x: 1.85, y: 2.1, z: 1.95 },
    textureResolution: '1024×1024 px (PBR Albedo + Roughness)',
    preset: 'standard',
    createdAt: 'Just now',
    thumbnailUrl: SAMPLE_IMAGES[0].thumbnail,
    sourceImageUrl: SAMPLE_IMAGES[0].thumbnail,
    shadingMode: 'pbr',
    decimationRatio: 1.0,
  });

  // Modals & Drawers
  const [isAssetDrawerOpen, setIsAssetDrawerOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [savedAssets, setSavedAssets] = useState<SavedAsset[]>(INITIAL_SAVED_ASSETS);

  // Generation Pipeline State
  const [generationState, setGenerationState] = useState<GenerationState>({
    isGenerating: false,
    currentStep: 1,
    progress: 0,
    statusText: 'Idle',
    elapsedSeconds: 0,
  });

  // Load saved assets and credits from localStorage on mount
  useEffect(() => {
    try {
      const storedAssets = localStorage.getItem('meshcraft_assets');
      if (storedAssets) {
        setSavedAssets(JSON.parse(storedAssets));
      }
      const storedCredits = localStorage.getItem('meshcraft_credits');
      if (storedCredits) {
        setCreditBalance(parseInt(storedCredits, 10));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, []);

  // Persist credits
  const updateCredits = useCallback((newBalance: number) => {
    setCreditBalance(newBalance);
    try {
      localStorage.setItem('meshcraft_credits', newBalance.toString());
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Save new asset to library
  const handleSaveToLibrary = useCallback((newAsset: SavedAsset) => {
    setSavedAssets((prev) => {
      const updated = [newAsset, ...prev];
      try {
        localStorage.setItem('meshcraft_assets', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  // Delete asset from library
  const handleDeleteAsset = useCallback((id: string) => {
    setSavedAssets((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      try {
        localStorage.setItem('meshcraft_assets', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  // Rename asset in library
  const handleRenameAsset = useCallback((id: string, newName: string) => {
    setSavedAssets((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, name: newName } : a));
      try {
        localStorage.setItem('meshcraft_assets', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  // Load an asset into the studio
  const handleLoadAsset = useCallback((asset: SavedAsset) => {
    setMeshType(asset.meshType);
    setModelName(asset.name);
    setCurrentImage(asset.sourceImageUrl);
    setCleanedImage(asset.thumbnailUrl);
    setDecimationRatio(1.0);
    setMetadata({
      id: asset.id,
      name: asset.name,
      meshType: asset.meshType,
      triangles: asset.triangles,
      vertices: Math.round(asset.triangles * 0.5),
      originalTriangles: asset.triangles,
      dimensions: { x: 1.9, y: 2.1, z: 2.0 },
      textureResolution:
        asset.preset === 'high' ? '2048×2048 px' : asset.preset === 'standard' ? '1024×1024 px' : '512×512 px',
      preset: asset.preset,
      createdAt: asset.createdAt,
      thumbnailUrl: asset.thumbnailUrl,
      sourceImageUrl: asset.sourceImageUrl,
      shadingMode: 'pbr',
      decimationRatio: 1.0,
    });
  }, []);

  // Select Sample Image
  const handleSelectSample = (sample: SampleImage) => {
    setCurrentImage(sample.thumbnail);
    setCleanedImage(sample.thumbnail);
    setMeshType(sample.meshType);
    setModelName(sample.name);
    setDecimationRatio(1.0);
  };

  // Upload or Paste User Image
  const handleImageSelected = async (dataUrl: string, name?: string) => {
    setCurrentImage(dataUrl);
    setCleanedImage(dataUrl);
    setMeshType('custom');
    setModelName(name ? name.replace(/\.[^/.]+$/, '') : 'Custom 3D Reconstruction');

    if (autoRemoveBg) {
      setIsRemovingBg(true);
      try {
        const res = await fetch('/api/remove-bg', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: dataUrl }),
        });
        const data = await res.json();
        if (data.processedImage) {
          setCleanedImage(data.processedImage);
        }
      } catch (err) {
        console.error('BG removal failed', err);
      } finally {
        setIsRemovingBg(false);
      }
    }
  };

  // Run 3D Generation Pipeline
  const handleGenerate = async () => {
    const requiredCredits = QUALITY_PRESETS_DATA[selectedPreset].credits;
    if (creditBalance < requiredCredits) {
      setIsPricingModalOpen(true);
      return;
    }

    // Deduct credits
    updateCredits(creditBalance - requiredCredits);

    // Initialize Generation Progress Stepper
    setGenerationState({
      isGenerating: true,
      currentStep: 1,
      progress: 5,
      statusText: 'Step 1/4: Removing background & isolating alpha...',
      elapsedSeconds: 0,
    });

    const startTime = Date.now();
    const interval = setInterval(() => {
      setGenerationState((prev) => {
        if (!prev.isGenerating) return prev;
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        return { ...prev, elapsedSeconds: elapsed };
      });
    }, 1000);

    try {
      // Step 1: Background removal (0 - 25%)
      await new Promise((r) => setTimeout(r, 600));
      setGenerationState((prev) => ({
        ...prev,
        currentStep: 2,
        progress: 28,
        statusText: 'Step 2/4: Estimating depth normals & multi-view synthesis...',
      }));

      // Step 2: Depth estimation (25% - 55%)
      await new Promise((r) => setTimeout(r, 900));
      setGenerationState((prev) => ({
        ...prev,
        currentStep: 3,
        progress: 62,
        statusText: 'Step 3/4: Marching tetrahedra 3D mesh reconstruction...',
      }));

      // Step 3: Call /api/generate-3d
      const res = await fetch('/api/generate-3d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: cleanedImage || currentImage,
          preset: selectedPreset,
          meshType,
        }),
      });

      const apiResult = await res.json();

      // Step 4: Baking PBR Textures (55% - 95%)
      setGenerationState((prev) => ({
        ...prev,
        currentStep: 4,
        progress: 88,
        statusText: 'Step 4/4: Baking albedo, normal & roughness PBR maps...',
      }));

      await new Promise((r) => setTimeout(r, 700));

      setGenerationState((prev) => ({
        ...prev,
        progress: 100,
        statusText: 'Model successfully reconstructed!',
      }));

      await new Promise((r) => setTimeout(r, 400));

      // Update metadata with reconstructed metrics
      const tris = apiResult.triangles || (selectedPreset === 'high' ? 84920 : selectedPreset === 'standard' ? 35640 : 12480);
      const verts = apiResult.vertices || Math.round(tris * 0.5);

      setMetadata({
        id: apiResult.modelId || `mc_${Date.now()}`,
        name: modelName,
        meshType,
        triangles: tris,
        vertices: verts,
        originalTriangles: tris,
        dimensions: apiResult.dimensions || { x: 1.95, y: 2.1, z: 2.05 },
        textureResolution: apiResult.textureResolution || QUALITY_PRESETS_DATA[selectedPreset].texture,
        preset: selectedPreset,
        createdAt: 'Just now',
        thumbnailUrl: cleanedImage || currentImage || '',
        sourceImageUrl: currentImage || '',
        shadingMode,
        decimationRatio: 1.0,
      });

      setDecimationRatio(1.0);
    } catch (err) {
      console.error('Generation error', err);
      alert('An error occurred during 3D reconstruction.');
    } finally {
      clearInterval(interval);
      setGenerationState((prev) => ({ ...prev, isGenerating: false }));
    }
  };

  // Mesh Stats callback from Viewport
  const handleMeshStatsUpdate = useCallback(
    (stats: {
      triangles: number;
      vertices: number;
      dimensions: { x: number; y: number; z: number };
    }) => {
      setMetadata((prev) => ({
        ...prev,
        triangles: stats.triangles,
        vertices: stats.vertices,
        dimensions: stats.dimensions,
      }));
    },
    []
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-studio-950 font-sans">
      {/* 1. Top Navigation Bar */}
      <Navbar
        creditBalance={creditBalance}
        savedAssetsCount={savedAssets.length}
        onSelectSample={handleSelectSample}
        onOpenPricing={() => setIsPricingModalOpen(true)}
        onToggleAssetDrawer={() => setIsAssetDrawerOpen(true)}
      />

      {/* 2. Main 3-Panel Studio Layout */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: 2D Input & Generation Controls */}
        <LeftSidebar
          currentImage={currentImage}
          cleanedImage={cleanedImage}
          isRemovingBg={isRemovingBg}
          autoRemoveBg={autoRemoveBg}
          selectedPreset={selectedPreset}
          creditBalance={creditBalance}
          isGenerating={generationState.isGenerating}
          onImageSelected={handleImageSelected}
          onToggleAutoRemoveBg={setAutoRemoveBg}
          onPresetSelect={setSelectedPreset}
          onGenerate={handleGenerate}
        />

        {/* Center Canvas: Interactive Three.js 3D Viewport */}
        <ThreeViewport
          meshType={meshType}
          shadingMode={shadingMode}
          lightingPreset={lightingPreset}
          decimationRatio={decimationRatio}
          autoRotate={autoRotate}
          textureUrl={cleanedImage || currentImage}
          previewImage={cleanedImage || currentImage || undefined}
          generationState={generationState}
          onShadingChange={setShadingMode}
          onLightingChange={setLightingPreset}
          onAutoRotateToggle={() => setAutoRotate(!autoRotate)}
          onMeshStatsUpdate={handleMeshStatsUpdate}
          onModelReady={setActiveModelObject}
          onCancelGeneration={() =>
            setGenerationState((prev) => ({ ...prev, isGenerating: false }))
          }
        />

        {/* Right Sidebar: Mesh Inspection & Export */}
        <RightSidebar
          metadata={metadata}
          decimationRatio={decimationRatio}
          activeModelObject={activeModelObject}
          creditBalance={creditBalance}
          onDecimationChange={setDecimationRatio}
          onSaveToLibrary={handleSaveToLibrary}
          onDeductCredit={(amount) => updateCredits(Math.max(0, creditBalance - amount))}
        />
      </main>

      {/* 3. Collapsible Asset Library Drawer */}
      <AssetDrawer
        isOpen={isAssetDrawerOpen}
        assets={savedAssets}
        onClose={() => setIsAssetDrawerOpen(false)}
        onLoadAsset={handleLoadAsset}
        onDeleteAsset={handleDeleteAsset}
        onRenameAsset={handleRenameAsset}
      />

      {/* 4. Credits & Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onAddCredits={(amount) => updateCredits(creditBalance + amount)}
      />
    </div>
  );
}
