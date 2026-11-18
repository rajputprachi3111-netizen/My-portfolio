import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MeshCraft AI — 2D to 3D Neural Reconstruction Studio',
  description: 'Browser-based 2D-to-3D model converter platform powered by Three.js and neural mesh extraction.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-studio-950 text-slate-100 antialiased overflow-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
