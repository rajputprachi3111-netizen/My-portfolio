/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#030509',
          DEFAULT: '#05070D',
          light: '#0A0E1A',
          card: 'rgba(7, 11, 22, 0.75)',
        },
        hud: {
          cyan: '#00F0FF',
          cobalt: '#1E40AF',
          blue: '#3B82F6',
          amber: '#F59E0B',
          gold: '#EAB308',
          violet: '#8B5CF6',
          emerald: '#10B981',
          rose: '#F43F5E',
          white: '#F8FAFC',
          muted: '#94A3B8',
          dark: '#0f172a'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'glow-cyan-lg': '0 0 35px rgba(0, 240, 255, 0.55)',
        'glow-amber': '0 0 25px rgba(245, 158, 11, 0.4)',
        'glow-violet': '0 0 25px rgba(139, 92, 246, 0.4)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'reverse-spin': 'spin 20s linear infinite reverse',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
