import React, { useState } from 'react';
import { ActiveSection } from './types';
import { SolarSystem } from './components/3d/SolarSystem';
import { LowPower2DView } from './components/2d/LowPower2DView';
import { HudOverlay } from './components/hud/HudOverlay';
import { NavigationPills } from './components/hud/NavigationPills';
import { TelemetryWidget } from './components/hud/TelemetryWidget';
import { WebProjectsModal } from './components/modals/WebProjectsModal';
import { BlenderFoundryModal } from './components/modals/BlenderFoundryModal';
import { MediaHubModal } from './components/modals/MediaHubModal';
import { CommsTerminal } from './components/modals/CommsTerminal';
import { OverviewModal } from './components/modals/OverviewModal';
import { HelpModal } from './components/modals/HelpModal';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [hoveredSection, setHoveredSection] = useState<ActiveSection>(null);
  const [is2DMode, setIs2DMode] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#05070D] text-[#F8FAFC]">
      {/* 3D Solar System Canvas or 2D Low-Power View */}
      {!is2DMode ? (
        <SolarSystem
          activeSection={activeSection}
          onSelectSection={(section) => setActiveSection(section)}
          hoveredSection={hoveredSection}
          onHoverSection={(section) => setHoveredSection(section)}
        />
      ) : (
        <LowPower2DView
          onSelectSection={(section) => setActiveSection(section)}
          onToggle2DMode={() => setIs2DMode(false)}
        />
      )}

      {/* Sci-Fi HUD Framing, Top Bar, Corner Brackets & Scanlines */}
      <HudOverlay
        activeSection={activeSection}
        onSelectSection={(section) => setActiveSection(section)}
        is2DMode={is2DMode}
        onToggle2DMode={() => setIs2DMode(!is2DMode)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Floating Telemetry Readout (Desktop & Tablet) */}
      {!is2DMode && <TelemetryWidget activeSection={activeSection} />}

      {/* Bottom One-Thumb Quick-Access Planetary Pill Bar */}
      <NavigationPills
        activeSection={activeSection}
        onSelectSection={(section) => setActiveSection(section)}
      />

      {/* Active Section Holographic Drawers / Modals */}
      {activeSection === 'overview' && (
        <OverviewModal
          onClose={() => setActiveSection(null)}
          onSelectSection={(section) => setActiveSection(section)}
        />
      )}

      {activeSection === 'web' && (
        <WebProjectsModal onClose={() => setActiveSection(null)} />
      )}

      {activeSection === 'blender' && (
        <BlenderFoundryModal onClose={() => setActiveSection(null)} />
      )}

      {activeSection === 'media' && (
        <MediaHubModal onClose={() => setActiveSection(null)} />
      )}

      {activeSection === 'contact' && (
        <CommsTerminal onClose={() => setActiveSection(null)} />
      )}

      {/* Help Modal */}
      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
    </main>
  );
};

export default App;
