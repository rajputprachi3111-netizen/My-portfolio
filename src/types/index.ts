export type ActiveSection = 'overview' | 'web' | 'blender' | 'media' | 'contact' | null;

export interface WebProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  githubUrl?: string;
  category: 'Full-Stack' | '3D / AI' | 'Game Dev' | 'Web App' | 'Portfolio';
  tags: string[];
  metrics: {
    status: 'ACTIVE MISSION' | 'ORBITAL' | 'OPERATIONAL' | 'DEPLOYED';
    sector: string;
    techStack: string[];
    highlight: string;
  };
  featured?: boolean;
}

export interface BlenderProject {
  id: string;
  title: string;
  fileSource: string; // e.g. '3D_Football.blend' | 'Doughnut 3D Model.blend'
  category: 'Hard-Surface Asset' | 'Procedural Shading & SSS';
  description: string;
  specs: {
    engine: 'Cycles' | 'EEVEE Next' | 'Cycles & EEVEE';
    polygonCount: string;
    materials: string;
    lighting: string;
    features: string[];
  };
  sampleType: 'football' | 'doughnut';
}

export interface MediaChannel {
  id: string;
  title: string;
  handle: string;
  url: string;
  frequency: string;
  type: 'Orbital Video Transmissions' | 'Subspace Visuals & Lifestyle';
  description: string;
  stats: {
    subscribers: string;
    transmissions: string;
    signalStrength: string;
    resolution: string;
  };
  tags: string[];
}

export interface SocialLink {
  id: string;
  name: string;
  platform: 'LinkedIn' | 'GitHub' | 'X (Twitter)' | 'Instagram' | 'Snapchat';
  variant?: 'main' | 'alt' | 'primary' | 'secondary';
  url: string;
  handle: string;
  badge: string;
  icon: string;
  protocol: string;
}

export interface TelemetryData {
  solarTime: string;
  orbitalVelocity: string;
  fps: number;
  coordinates: { x: number; y: number; z: number };
  activeAnomaly: string;
}
