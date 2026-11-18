import { NextRequest, NextResponse } from 'next/server';
import { QualityPreset } from '@/types';

/**
 * /api/generate-3d
 * 2D-to-3D Model Reconstruction Endpoint.
 * Bridges to TripoSR / InstantMesh / Shap-E / Wonder3D GPU workers via INFERENCE_API_URL,
 * or serves realistic 3D reconstruction parameters via built-in simulation mode.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      image,
      preset = 'standard',
      meshType = 'custom',
      symmetry = true,
      seed = 42,
    } = body as {
      image: string;
      preset: QualityPreset;
      meshType: string;
      symmetry?: boolean;
      seed?: number;
    };

    if (!image) {
      return NextResponse.json(
        { error: 'Input image is required' },
        { status: 400 }
      );
    }

    const inferenceApiUrl = process.env.INFERENCE_API_URL;

    // GPU worker proxy
    if (inferenceApiUrl) {
      try {
        const response = await fetch(`${inferenceApiUrl}/generate-3d`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image,
            preset,
            symmetry,
            seed,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          return NextResponse.json({
            success: true,
            mode: 'gpu-worker',
            ...result,
          });
        }
      } catch (err) {
        console.warn('GPU Worker unreachable, engaging simulation mode', err);
      }
    }

    // Realistic Simulation Response based on preset specs
    const presetMetrics = {
      draft: {
        triangles: 12480,
        vertices: 6242,
        textureResolution: '512×512 px',
        bakeTimeMs: 1200,
        dimensions: { x: 1.85, y: 2.1, z: 1.95 },
      },
      standard: {
        triangles: 35640,
        vertices: 17822,
        textureResolution: '1024×1024 px',
        bakeTimeMs: 2500,
        dimensions: { x: 1.92, y: 2.15, z: 2.05 },
      },
      high: {
        triangles: 84920,
        vertices: 42462,
        textureResolution: '2048×2048 px (PBR Normal + Roughness)',
        bakeTimeMs: 4000,
        dimensions: { x: 2.04, y: 2.22, z: 2.12 },
      },
    }[preset] || {
      triangles: 35640,
      vertices: 17822,
      textureResolution: '1024×1024 px',
      bakeTimeMs: 2500,
      dimensions: { x: 1.92, y: 2.15, z: 2.05 },
    };

    return NextResponse.json({
      success: true,
      mode: 'simulation-engine',
      modelId: `mc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      preset,
      meshType,
      seed,
      symmetryApplied: symmetry,
      ...presetMetrics,
      maps: {
        albedo: true,
        normal: preset === 'high',
        roughness: preset === 'high' || preset === 'standard',
        metalness: preset === 'high',
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/generate-3d:', error);
    return NextResponse.json(
      { error: error?.message || '3D generation pipeline failed' },
      { status: 500 }
    );
  }
}
