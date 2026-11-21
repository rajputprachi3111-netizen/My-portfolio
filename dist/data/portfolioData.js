export const SYSTEM_INFO = {
    callsign: "THE ANGRY EAST INDIAN",
    title: "The angry east indian's work",
    role: "Full-Stack Sci-Fi Developer, Creative Technologist & 3D Blender Artist",
    location: "Sector 07 // Sub-orbital Earth Station (IN)",
    tagline: "Architecting interactive 3D solar systems, resilient web engines, and boundary-pushing Blender digital sculptures.",
    status: "DEFCON 1 // ALL SYSTEMS GREEN",
    stardate: "2026.326 // TELEMETRY LINKED",
    version: "v4.0.9-ORBITAL"
};
export const WEB_PROJECTS = [
    {
        id: "meshcraft-ai",
        title: "MeshCraft AI",
        tagline: "Browser-based 2D-to-3D Model Generation & Viewport Suite",
        description: "An advanced browser-based AI conversion workspace converting 2D artwork and blueprints into 3D meshes with interactive WebGL viewports, decimation engines, and multi-format exporters (OBJ/GLTF/STL).",
        url: "https://meshcraft-ai.vercel.app/",
        githubUrl: "https://github.com/rajputprachi3111-netizen",
        category: "3D / AI",
        featured: true,
        tags: ["React", "Three.js", "WebGL", "TypeScript", "Tailwind CSS", "Next.js"],
        metrics: {
            status: "ACTIVE MISSION",
            sector: "Sector 01: Deep Compute",
            techStack: ["Next.js 14", "Three.js", "R3F", "Canvas API"],
            highlight: "Real-time client-side mesh generation & lighting rig"
        }
    },
    {
        id: "playzone",
        title: "PlayZone Progress Tracker",
        tagline: "High-Performance Interactive Gaming & Task Telemetry Dashboard",
        description: "Dynamic tracking suite built for real-time progress monitoring, session metrics, leveling systems, and responsive telemetry analysis across gaming sessions and sprint roadmaps.",
        url: "https://playzone-ruby-sigma.vercel.app/",
        githubUrl: "https://github.com/rajputprachi3111-netizen",
        category: "Full-Stack",
        featured: true,
        tags: ["React", "TypeScript", "Telemetry", "Framer Motion", "Vercel"],
        metrics: {
            status: "ORBITAL",
            sector: "Sector 02: Performance",
            techStack: ["React", "Vite", "Tailwind CSS", "LocalCache"],
            highlight: "Sub-millisecond state updates & interactive milestones"
        }
    },
    {
        id: "pixelserpent",
        title: "PixelSerpent",
        tagline: "Arcade-Class Retro Cybernetic Snake Simulation",
        description: "A neon-infused, cybernetic reimagining of the classic arcade Snake game with fluid velocity mechanics, reactive audio chiptunes, retro HUD scorekeeping, and instantaneous keyboard/touch controls.",
        url: "https://pixelserpent.netlify.app/",
        githubUrl: "https://github.com/rajputprachi3111-netizen",
        category: "Game Dev",
        featured: false,
        tags: ["JavaScript", "HTML5 Canvas", "Game Loop", "Netlify", "Audio Synth"],
        metrics: {
            status: "DEPLOYED",
            sector: "Sector 03: Retro Arcades",
            techStack: ["Vanilla JS", "Canvas 2D", "CSS Grid", "Netlify CI"],
            highlight: "60 FPS hardware-accelerated canvas game loop"
        }
    },
    {
        id: "radzero",
        title: "RadZero",
        tagline: "Resilient Cloud Application Deployed on Google Firebase",
        description: "Full-featured web application engineered with real-time Firestore database synchronization, cloud authentication, resilient offline caching, and responsive cross-device layout.",
        url: "https://radzero.web.app/",
        githubUrl: "https://github.com/rajputprachi3111-netizen",
        category: "Web App",
        featured: false,
        tags: ["Firebase", "Cloud Firestore", "React", "Authentication", "SPA"],
        metrics: {
            status: "OPERATIONAL",
            sector: "Sector 04: Cloud Infrastructure",
            techStack: ["Firebase Hosting", "Cloud Functions", "React", "Tailwind"],
            highlight: "Global edge CDN distribution & real-time sync"
        }
    },
    {
        id: "dev-portfolio",
        title: "Dev Portfolio Archive",
        tagline: "Personal Developer Showcase & Mission Archive",
        description: "Interactive portfolio archive presenting design iterations, engineering experiments, creative coding labs, and responsive UX components.",
        url: "https://prachi-dev-five.vercel.app/",
        githubUrl: "https://github.com/rajputprachi3111-netizen",
        category: "Portfolio",
        featured: false,
        tags: ["React", "Portfolio", "Vercel", "CSS3", "Responsive Design"],
        metrics: {
            status: "DEPLOYED",
            sector: "Sector 05: Origin Log",
            techStack: ["React", "Tailwind", "Vercel", "Framer"],
            highlight: "Minimalist dark aesthetic & micro-interactions"
        }
    },
    {
        id: "github-core",
        title: "GitHub Core Repository",
        tagline: "Central Source Code Telemetry & Open-Source Modules",
        description: "The primary command center for all source repositories, full-stack commits, experimental branches, Blender script automations, and open-source contributions.",
        url: "https://github.com/rajputprachi3111-netizen",
        category: "Full-Stack",
        featured: true,
        tags: ["Git", "Open Source", "CI/CD", "Repositories", "Architecture"],
        metrics: {
            status: "ACTIVE MISSION",
            sector: "Sector 00: Source Matrix",
            techStack: ["Git", "GitHub Actions", "Markdown", "OSS"],
            highlight: "50+ repositories & continuous deployment pipelines"
        }
    }
];
export const BLENDER_PROJECTS = [
    {
        id: "football-3d",
        title: "3D Football Model",
        fileSource: "3D_Football.blend",
        category: "Hard-Surface Asset",
        description: "Precision-engineered sports equipment asset created in Blender featuring truncated icosahedron geometry, stitched seams, leather bump micro-textures, and high-contrast studio rim lighting.",
        sampleType: "football",
        specs: {
            engine: "Cycles & EEVEE",
            polygonCount: "8,420 Polygons // 16,840 Tris",
            materials: "PBR Specular / Roughness Leather with Normal Seam Insets",
            lighting: "3-Point Orbital Studio Rig + Ambient Blue Fill",
            features: [
                "Truncated Icosahedron topology with clean quad flow",
                "Subdivision-ready mesh with non-destructive bevel modifier",
                "Procedural bump maps for authentic leather micro-pores",
                "Dual-tone aerodynamic seam stitching geometry"
            ]
        }
    },
    {
        id: "doughnut-3d",
        title: "3D Doughnut Render",
        fileSource: "Doughnut 3D Model.blend",
        category: "Procedural Shading & SSS",
        description: "Iconic masterwork demonstrating mastery of Blender geometry nodes, Subsurface Scattering (SSS) for golden-brown fried dough, dripping glossy icing, and procedural particle sprinkle distributions.",
        sampleType: "doughnut",
        specs: {
            engine: "Cycles",
            polygonCount: "12,650 Polygons // 25,300 Tris",
            materials: "Subsurface Scattering (SSS) Dough + Dielectric Glaze",
            lighting: "Warm Key Light + Soft Overhead Rim + Cool Shadow Accent",
            features: [
                "Subsurface Scattering depth tuned for organic pastry realism",
                "Geometry Node instanced colorful candy sprinkles with random color ramps",
                "Organic gravitational icing drips sculpted via weight painting",
                "Procedural noise displacement for baked dough crust variation"
            ]
        }
    }
];
export const MEDIA_CHANNELS = [
    {
        id: "theangryeastindian",
        title: "The Angry East Indian",
        handle: "@theangryeastindian",
        url: "https://youtube.com/@theangryeastindian?si=pwVErbKh1PCMsq0x",
        frequency: "108.4 MHz // Orbital Frequency Alpha",
        type: "Orbital Video Transmissions",
        description: "Primary orbital transmission node featuring tech commentaries, creative workflows, unapologetic developer insights, and deep-dive digital culture analyses.",
        stats: {
            subscribers: "12.4K+ Operatives",
            transmissions: "50+ Video Logs",
            signalStrength: "99.8% Beam Purity",
            resolution: "4K HDR Orbital Stream"
        },
        tags: ["Tech Deep-Dives", "Developer Culture", "Unfiltered Commentary", "3D Art & Tech"]
    },
    {
        id: "beautifulgirls",
        title: "Beautiful Girls",
        handle: "@beautifulgirls-x7m",
        url: "https://youtube.com/@beautifulgirls-x7m?si=1ifuE0DEvw37t5sV",
        frequency: "242.1 MHz // Subspace Frequency Gamma",
        type: "Subspace Visuals & Lifestyle",
        description: "Curated aesthetic broadcast channel delivering visual narratives, cinematic creative edits, music atmospheres, and contemporary cultural highlights.",
        stats: {
            subscribers: "Subspace Sync Active",
            transmissions: "Curated Edits",
            signalStrength: "98.4% Sub-carrier",
            resolution: "1080p60 Ultra-Smooth"
        },
        tags: ["Visual Edits", "Cinematics", "Aesthetic Streams", "Creative Atmosphere"]
    }
];
export const SOCIAL_LINKS = [
    {
        id: "linkedin",
        name: "LinkedIn",
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/prachi-rajput-bangs",
        handle: "in/prachi-rajput-bangs",
        badge: "Professional Network",
        icon: "Linkedin",
        protocol: "HYPERLINK / LINKEDIN-NET"
    },
    {
        id: "github",
        name: "GitHub",
        platform: "GitHub",
        url: "https://github.com/rajputprachi3111-netizen",
        handle: "@rajputprachi3111-netizen",
        badge: "Source Matrix",
        icon: "Github",
        protocol: "SSH / GIT-SECURE"
    },
    {
        id: "twitter",
        name: "X (Twitter)",
        platform: "X (Twitter)",
        url: "https://x.com/Rosesarerekn",
        handle: "@Rosesarerekn",
        badge: "Subspace Wire",
        icon: "Twitter",
        protocol: "WEBSOCKET / X-FIREHOSE"
    },
    {
        id: "insta-main",
        name: "Instagram (Main / Vibes)",
        platform: "Instagram",
        variant: "main",
        url: "https://www.instagram.com/girlsvibes.7233476?cnvx=ejNrNnd5Y3NoZDZs",
        handle: "@girlsvibes.7233476",
        badge: "Visual Log (Alpha)",
        icon: "Instagram",
        protocol: "OPTICAL / INSTA-FEED-01"
    },
    {
        id: "insta-alt",
        name: "Instagram (Alt)",
        platform: "Instagram",
        variant: "alt",
        url: "https://www.instagram.com/vis463065?jplx=YjRmbHplcTh0b3V4",
        handle: "@vis463065",
        badge: "Visual Log (Beta)",
        icon: "Camera",
        protocol: "OPTICAL / INSTA-FEED-02"
    },
    {
        id: "snap-primary",
        name: "Snapchat (Primary)",
        platform: "Snapchat",
        variant: "primary",
        url: "https://www.snapchat.com/add/theangryeast?share_id=kIBApX2qq00&locale=en-IN",
        handle: "theangryeast",
        badge: "Ephemeral Comms 1",
        icon: "MessageCircle",
        protocol: "BURST / SNAP-NODE-01"
    },
    {
        id: "snap-secondary",
        name: "Snapchat (Secondary)",
        platform: "Snapchat",
        variant: "secondary",
        url: "https://www.snapchat.com/add/theangryeastind?share_id=sX3G1Mfg1AM&locale=en-IN",
        handle: "theangryeastind",
        badge: "Ephemeral Comms 2",
        icon: "MessageSquare",
        protocol: "BURST / SNAP-NODE-02"
    }
];
export const PLANET_CONFIGS = [
    {
        id: 'web',
        name: 'Sector Cyber-I',
        title: 'Web Engineering & Mission Logs',
        subtitle: 'Interactive Apps, 3D WebGL & AI',
        color: '#00F0FF',
        glowColor: 'rgba(0, 240, 255, 0.4)',
        radius: 1.1,
        orbitDistance: 8.5,
        orbitSpeed: 0.28,
        rotationSpeed: 0.015,
        badge: '6 MISSIONS ACTIVE',
        textureDetail: 'Circuit Grids & Cyber Latices',
        description: 'Launchpad for MeshCraft AI, PlayZone, PixelSerpent, RadZero & GitHub repos.'
    },
    {
        id: 'blender',
        name: 'Sector Vulcan-II',
        title: 'The Blender Foundry',
        subtitle: '3D Modeling, Shaders & Photorealism',
        color: '#F59E0B',
        glowColor: 'rgba(245, 158, 11, 0.45)',
        radius: 1.35,
        orbitDistance: 13.5,
        orbitSpeed: 0.19,
        rotationSpeed: 0.012,
        badge: 'CYCLES & EEVEE CORE',
        textureDetail: 'Molten Gold & Topo Striations',
        description: 'Interactive 3D Football, Doughnut SSS Showcase, wireframe inspection & Blender specs.'
    },
    {
        id: 'media',
        name: 'Sector Pulsar-III',
        title: 'Subspace Broadcasts',
        subtitle: 'YouTube Channels & Digital Media',
        color: '#8B5CF6',
        glowColor: 'rgba(139, 92, 246, 0.45)',
        radius: 1.2,
        orbitDistance: 18.5,
        orbitSpeed: 0.14,
        rotationSpeed: 0.009,
        badge: '2 FREQUENCIES LOCKED',
        textureDetail: 'Atmospheric Violet Ion Clouds',
        description: 'Direct satellite telemetry to The Angry East Indian & Beautiful Girls channels.'
    },
    {
        id: 'contact',
        name: 'Sector Beacon-IV',
        title: 'Hailing Frequencies',
        subtitle: 'Comms Array & Social Relay Matrix',
        color: '#10B981',
        glowColor: 'rgba(16, 185, 129, 0.45)',
        radius: 1.05,
        orbitDistance: 23.5,
        orbitSpeed: 0.10,
        rotationSpeed: 0.007,
        badge: 'TRANSMITTER ONLINE',
        textureDetail: 'Bio-luminescent Emerald Matrix',
        description: 'Secure transmission terminal, LinkedIn, GitHub, X, Instagram and Snapchat links.'
    }
];
