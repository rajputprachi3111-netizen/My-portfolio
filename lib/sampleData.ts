import { SampleImage } from '@/types';

// High-fidelity SVG illustration data URIs that work 100% offline and look gorgeous
const HELMET_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0f19"/>
      <stop offset="100%" stop-color="#141c2e"/>
    </linearGradient>
    <linearGradient id="armor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3b4252"/>
      <stop offset="50%" stop-color="#2e3440"/>
      <stop offset="100%" stop-color="#1e222a"/>
    </linearGradient>
    <linearGradient id="visor" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#4facfe"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f6d365"/>
      <stop offset="100%" stop-color="#fda085"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="32" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="180" fill="none" stroke="#2563eb" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="8 8"/>
  <g transform="translate(0, -10)">
    <!-- Helmet Main Shell -->
    <path d="M140 240 C140 140 210 110 256 110 C302 110 372 140 372 240 C372 320 340 380 256 390 C172 380 140 320 140 240 Z" fill="url(#armor)" stroke="#4c566a" stroke-width="4"/>
    <!-- Crest / Mohawk fin -->
    <path d="M246 90 L266 90 L262 170 L250 170 Z" fill="url(#gold)"/>
    <path d="M236 100 L276 100 L268 150 L244 150 Z" fill="#f59e0b" opacity="0.4"/>
    <!-- Glowing Visor -->
    <path d="M165 210 Q256 195 347 210 Q355 270 256 295 Q157 270 165 210 Z" fill="url(#visor)" filter="url(#glow)"/>
    <!-- Visor Highlight Sheen -->
    <path d="M185 220 Q256 210 327 220 Q280 235 185 220 Z" fill="#ffffff" opacity="0.6"/>
    <!-- Side Ear Guards / Comms -->
    <rect x="120" y="225" width="28" height="65" rx="8" fill="#2e3440" stroke="#00f2fe" stroke-width="2"/>
    <rect x="364" y="225" width="28" height="65" rx="8" fill="#2e3440" stroke="#00f2fe" stroke-width="2"/>
    <circle cx="134" cy="257" r="7" fill="#00f2fe" filter="url(#glow)"/>
    <circle cx="378" cy="257" r="7" fill="#00f2fe" filter="url(#glow)"/>
    <!-- Respirator / Jaw Vent -->
    <path d="M210 320 L302 320 L286 365 L226 365 Z" fill="#181b22" stroke="#3b4252" stroke-width="2"/>
    <line x1="225" y1="332" x2="287" y2="332" stroke="#00f2fe" stroke-width="2" opacity="0.8"/>
    <line x1="230" y1="344" x2="282" y2="344" stroke="#00f2fe" stroke-width="2" opacity="0.8"/>
    <line x1="236" y1="356" x2="276" y2="356" stroke="#00f2fe" stroke-width="2" opacity="0.8"/>
  </g>
  <text x="256" y="445" font-family="sans-serif" font-weight="700" font-size="16" fill="#64748b" text-anchor="middle" letter-spacing="4">APEX TACTICAL HELMET</text>
</svg>
`)}`;

const SNEAKER_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#181124"/>
      <stop offset="100%" stop-color="#2a183d"/>
    </linearGradient>
    <linearGradient id="sole" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff007a"/>
      <stop offset="100%" stop-color="#7928ca"/>
    </linearGradient>
    <linearGradient id="upper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <filter id="sneaker-glow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="32" fill="url(#bg)"/>
  <!-- Decorative Ring -->
  <circle cx="256" cy="256" r="190" fill="none" stroke="#ff007a" stroke-opacity="0.15" stroke-width="2"/>
  <g transform="translate(15, 30)">
    <!-- Aerodynamic Cushioned Sole -->
    <path d="M80 320 C100 300 130 310 180 315 C260 320 330 300 400 325 C420 332 430 348 420 365 C400 375 320 380 230 380 C130 380 70 365 72 345 Z" fill="url(#sole)" filter="url(#sneaker-glow)"/>
    <path d="M100 345 L395 345" stroke="#ffffff" stroke-width="3" stroke-dasharray="12 8" opacity="0.6"/>
    <!-- Sneaker Upper Body -->
    <path d="M125 310 C135 270 170 230 200 200 C210 190 230 185 245 200 C260 215 280 245 320 270 C360 280 400 300 405 320 C380 315 280 310 125 310 Z" fill="url(#upper)" stroke="#94a3b8" stroke-width="3"/>
    <!-- Collar and Tongue -->
    <path d="M185 210 L155 170 C160 160 185 160 205 175 L215 200 Z" fill="#0f172a"/>
    <path d="M210 180 L235 155 C245 155 255 165 250 185 L230 210 Z" fill="#ff007a"/>
    <!-- Iconic Swoosh / Wave -->
    <path d="M170 275 Q260 290 350 250 Q280 305 180 290 Z" fill="#ff007a" filter="url(#sneaker-glow)"/>
    <!-- Laces -->
    <line x1="210" y1="215" x2="235" y2="235" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
    <line x1="225" y1="235" x2="255" y2="255" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
    <line x1="245" y1="255" x2="275" y2="275" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
  </g>
  <text x="256" y="445" font-family="sans-serif" font-weight="700" font-size="16" fill="#a855f7" text-anchor="middle" letter-spacing="4">NEO-RUNNER V3 PRO</text>
</svg>
`)}`;

const POTION_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#091b17"/>
      <stop offset="100%" stop-color="#0c2d25"/>
    </linearGradient>
    <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="50%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="cork" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
    <filter id="emerald-glow">
      <feGaussianBlur stdDeviation="14" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="32" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="185" fill="none" stroke="#10b981" stroke-opacity="0.15" stroke-width="2"/>
  <g transform="translate(0, 5)">
    <!-- Cork Stopper -->
    <polygon points="230,105 282,105 276,140 236,140" fill="url(#cork)"/>
    <ellipse cx="256" cy="105" rx="26" ry="7" fill="#f59e0b"/>
    <!-- Bottle Lip & Neck -->
    <path d="M225 140 H287 V155 H275 V205 H237 V155 H225 Z" fill="#6ee7b7" fill-opacity="0.3" stroke="#a7f3d0" stroke-width="3"/>
    <!-- Glass Spherical Flask Body -->
    <circle cx="256" cy="295" r="115" fill="#064e3b" fill-opacity="0.4" stroke="#a7f3d0" stroke-width="4"/>
    <!-- Magic Glowing Liquid -->
    <path d="M152 320 C160 250 210 240 256 240 C302 240 352 250 360 320 C364 360 320 400 256 400 C192 400 148 360 152 320 Z" fill="url(#liquid)" filter="url(#emerald-glow)"/>
    <!-- Liquid Surface Waves -->
    <path d="M165 265 Q210 250 256 265 Q300 280 347 265" fill="none" stroke="#ecfdf5" stroke-width="4" stroke-linecap="round"/>
    <!-- Magic Bubbles -->
    <circle cx="230" cy="315" r="8" fill="#ffffff" opacity="0.75"/>
    <circle cx="280" cy="335" r="12" fill="#ffffff" opacity="0.65"/>
    <circle cx="250" cy="360" r="6" fill="#ffffff" opacity="0.8"/>
    <circle cx="265" cy="290" r="5" fill="#ffffff" opacity="0.9"/>
    <!-- Glass Reflection Highlights -->
    <path d="M175 240 C160 270 160 320 180 355" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
  </g>
  <text x="256" y="450" font-family="sans-serif" font-weight="700" font-size="16" fill="#34d399" text-anchor="middle" letter-spacing="4">ELIXIR OF VITALITY</text>
</svg>
`)}`;

const DRONE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="carbon" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#374151"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <filter id="sensor-glow">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="32" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="185" fill="none" stroke="#6366f1" stroke-opacity="0.2" stroke-width="2"/>
  <g transform="translate(0, -10)">
    <!-- 4 Diagonal Rotor Arms -->
    <line x1="256" y1="260" x2="130" y2="150" stroke="#4b5563" stroke-width="12" stroke-linecap="round"/>
    <line x1="256" y1="260" x2="382" y2="150" stroke="#4b5563" stroke-width="12" stroke-linecap="round"/>
    <line x1="256" y1="260" x2="130" y2="370" stroke="#4b5563" stroke-width="12" stroke-linecap="round"/>
    <line x1="256" y1="260" x2="382" y2="370" stroke="#4b5563" stroke-width="12" stroke-linecap="round"/>
    <!-- Rotor Blade Guards and Spinning Propellers -->
    <circle cx="130" cy="150" r="48" fill="#1f2937" stroke="#6366f1" stroke-width="3" opacity="0.8"/>
    <ellipse cx="130" cy="150" rx="42" ry="10" fill="#818cf8" opacity="0.5"/>
    <circle cx="382" cy="150" r="48" fill="#1f2937" stroke="#6366f1" stroke-width="3" opacity="0.8"/>
    <ellipse cx="382" cy="150" rx="42" ry="10" fill="#818cf8" opacity="0.5"/>
    <circle cx="130" cy="370" r="48" fill="#1f2937" stroke="#6366f1" stroke-width="3" opacity="0.8"/>
    <ellipse cx="130" cy="370" rx="42" ry="10" fill="#818cf8" opacity="0.5"/>
    <circle cx="382" cy="370" r="48" fill="#1f2937" stroke="#6366f1" stroke-width="3" opacity="0.8"/>
    <ellipse cx="382" cy="370" rx="42" ry="10" fill="#818cf8" opacity="0.5"/>
    <!-- Central Main Pod Body -->
    <path d="M210 230 C210 200 240 190 256 190 C272 190 302 200 302 230 L302 290 C302 320 272 330 256 330 C240 330 210 320 210 290 Z" fill="url(#carbon)" stroke="#4f46e5" stroke-width="4"/>
    <!-- AI Gimbal Camera Optical Eye -->
    <circle cx="256" cy="260" r="24" fill="#030712" stroke="#6366f1" stroke-width="3"/>
    <circle cx="256" cy="260" r="14" fill="#ef4444" filter="url(#sensor-glow)"/>
    <circle cx="251" cy="255" r="4" fill="#ffffff" opacity="0.8"/>
    <!-- Status LED Bars -->
    <rect x="236" y="210" width="40" height="4" rx="2" fill="#10b981"/>
    <rect x="240" y="305" width="32" height="4" rx="2" fill="#f59e0b"/>
  </g>
  <text x="256" y="445" font-family="sans-serif" font-weight="700" font-size="16" fill="#818cf8" text-anchor="middle" letter-spacing="4">SCOUT-X RECON DRONE</text>
</svg>
`)}`;

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'helmet',
    name: 'Sci-Fi Helmet',
    category: 'Game Asset / Hard Surface',
    description: 'Cybernetic tactical combat helmet with emissive visor and PBR composite shell.',
    thumbnail: HELMET_SVG,
    creditCost: 2,
    estTime: '35s',
    polyEstimate: '34,800 tris',
    meshType: 'helmet',
  },
  {
    id: 'sneaker',
    name: 'Sneaker',
    category: 'Apparel / E-Commerce',
    description: 'Streetwear runner with nitrogen-infused midsole, mesh upper, and neon accents.',
    thumbnail: SNEAKER_SVG,
    creditCost: 2,
    estTime: '40s',
    polyEstimate: '38,200 tris',
    meshType: 'sneaker',
  },
  {
    id: 'potion',
    name: 'Stylized Potion Bottle',
    category: 'Fantasy / Stylized Prop',
    description: 'Spherical alchemical flask with bubbling liquid, cork seal, and emerald refraction.',
    thumbnail: POTION_SVG,
    creditCost: 1,
    estTime: '20s',
    polyEstimate: '22,400 tris',
    meshType: 'potion',
  },
  {
    id: 'drone',
    name: 'Mechanical Drone',
    category: 'Robotics / Sci-Fi Vehicle',
    description: 'Autonomous quad-rotor surveillance drone with gimbal sensor and carbon frame.',
    thumbnail: DRONE_SVG,
    creditCost: 2,
    estTime: '45s',
    polyEstimate: '42,100 tris',
    meshType: 'drone',
  },
];

export const QUALITY_PRESETS_DATA = {
  draft: {
    label: 'Draft Mode',
    time: '~15s',
    tris: '12,400 tris',
    texture: '512×512 px',
    credits: 1,
    badge: 'Fast',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    description: 'Quick concept prototyping with optimized low-poly density.',
  },
  standard: {
    label: 'Standard Mode',
    time: '~40s',
    tris: '35,600 tris',
    texture: '1024×1024 px',
    credits: 2,
    badge: 'Popular',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    description: 'Balanced topology with crisp diffuse and roughness maps.',
  },
  high: {
    label: 'High-Detail PBR',
    time: '~75s',
    tris: '84,900 tris',
    texture: '2048×2048 px',
    credits: 5,
    badge: 'PRO',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    description: 'Cinematic quality with Albedo, Normal, Roughness, and Metalness maps.',
  },
};
