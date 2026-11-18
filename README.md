# MeshCraft AI — 2D-to-3D Neural Reconstruction Studio

![MeshCraft AI Studio](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

**MeshCraft AI** is a production-grade, browser-based 2D-to-3D model converter platform built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Three.js (`@react-three/fiber` & `@react-three/drei`)**. It turns 2D conceptual artwork, product photos, and game sprites into textured 3D meshes ready for Web, AR, 3D printing, and game engines.

---

## 🚀 Key Features

### 1. Modern 3-Panel Studio Interface
- **Left Sidebar — Input & Generation Controls:**
  - Drag-and-drop file upload, file picker, and `Ctrl+V` / `Cmd+V` clipboard paste listener.
  - Pre-processing preview on transparent checkerboard pattern.
  - **Auto Remove Background** toggle with sub-2s neural alpha matting.
  - Preset selector cards:
    - **Draft Mode:** ~15s, ~12k tris, 512px texture, 1 credit
    - **Standard Mode:** ~40s, ~35k tris, 1024px texture, 2 credits
    - **High-Detail PBR:** ~75s, ~85k tris, 2048px Albedo/Normal/Roughness maps, 5 credits (PRO)
  - Advanced Generation Options (bilateral symmetry, quad remesh solver, seed).

- **Center Canvas — Interactive 3D Viewport:**
  - 60 FPS Three.js WebGL canvas with smooth `OrbitControls` (rotate, pan, zoom).
  - **4-Step Holographic Stepper Overlay** during generation:
    1. *Removing Background*
    2. *Estimating Depth & Multi-View*
    3. *Generating 3D Mesh*
    4. *Baking PBR Textures*
  - Floating Viewport Toolbar:
    - **Shading Mode Switcher:** `Textured (PBR)` | `Clay / Matcap` | `Wireframe`
    - **HDRI Lighting Presets:** `Studio` | `Outdoor` | `Warm` | `Dark`
    - **Auto-Rotate Turntable** toggle
    - **Reset Camera (R)** shortcut
    - Fullscreen & Infinite Ground Grid toggle

- **Right Sidebar — Mesh Inspection & Export:**
  - **Live Model Metadata Card:** Triangles count, Vertices count, Bounding Box (`X × Y × Z`), and Texture Resolution.
  - **Live Mesh Decimation Slider (10% to 100%):** Real-time client-side edge collapse algorithm that simplifies polygon density and recalculates normals.
  - **Export Module:** One-click download for `.GLB` (Web/AR), `.OBJ` (Universal), `.FBX` (Game Engines), and `.STL` (Watertight 3D Printing).
  - **Save to Asset Library:** LocalStorage-backed persistence with thumbnails and poly counts.

### 2. Collapsible Asset Drawer & Pricing Modal
- **My Assets Drawer:** Slide-over drawer to search, load, rename, download, and delete saved models.
- **Credit Balance & Pricing Modal:** Free ($0/mo, 10 credits) vs. Pro ($19/mo, 250 credits) with instant refill simulator and celebratory confetti.

### 3. Keyboard Shortcuts
- `R`: Reset camera to default 45° perspective
- `Space`: Toggle turntable rotation
- `W`: Toggle wireframe shading
- `Ctrl+V` / `Cmd+V`: Paste image directly anywhere in window

---

## 🛠️ Architecture & Tech Stack

```text
├── app/
│   ├── api/
│   │   ├── generate-3d/route.ts   # TripoSR / InstantMesh proxy & simulation
│   │   ├── remove-bg/route.ts      # RMBG-2.0 worker proxy & edge detection
│   │   └── export/route.ts         # Server-side format packaging
│   ├── globals.css                # Custom scrollbars & keyframe animations
│   ├── layout.tsx                 # Root layout & dark mode
│   └── page.tsx                   # Main 3-panel studio coordinator
├── components/
│   ├── layout/
│   │   └── Navbar.tsx             # Brand, sample picker, credits pill
│   ├── modals/
│   │   ├── AssetDrawer.tsx        # Persistent saved asset drawer
│   │   └── PricingModal.tsx       # $19/mo Free vs Pro upgrade modal
│   ├── panels/
│   │   ├── LeftSidebar.tsx        # Dropzone, paste, presets, CTA
│   │   └── RightSidebar.tsx       # Metadata, decimation slider, export
│   └── viewport/
│       ├── GenerationProgressOverlay.tsx  # 4-step pipeline overlay
│       ├── LightingRig.tsx        # HDRI & 3-point studio lighting
│       ├── ModelRenderer.tsx      # Procedural & displaced PBR meshes
│       └── ThreeViewport.tsx      # R3F Canvas & OrbitControls
├── lib/
│   ├── decimation.ts              # Real-time polygon reduction algorithm
│   ├── exporters.ts               # GLB, OBJ, STL Three.js exporters
│   ├── proceduralGeometry.ts      # Procedural 3D models & relief meshes
│   ├── sampleData.ts              # High-fidelity SVG sample illustrations
│   └── utils.ts                   # Formatting & download helpers
└── types/
    └── index.ts                   # Strict TypeScript definitions
```

---

## 🔌 Connecting Real GPU Workers

To plug in a Python GPU worker running **TripoSR**, **InstantMesh**, or **RMBG-2.0**, create a `.env.local` file:

```env
INFERENCE_API_URL=https://your-gpu-worker.example.com
```

When `INFERENCE_API_URL` is omitted, the studio automatically runs in **Simulation Mode**, providing instant, fully interactive 3D reconstruction and export testing without requiring GPU hardware!

---

## 💻 Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run local development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the 3D studio.
