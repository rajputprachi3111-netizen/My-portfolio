'use client';

import React, { useState } from 'react';
import { X, Check, Zap, Crown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCredits: (amount: number) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onAddCredits,
}) => {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setSuccess(true);
      onAddCredits(250);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  const handleFreeRefill = () => {
    onAddCredits(10);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-800 bg-studio-900 p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Scale Your 3D Production</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Flexible Plans for 3D Creators
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Reconstruct production-ready 3D models with AI neural textures and high-poly geometry.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Free Tier */}
          <div className="rounded-2xl border border-zinc-800 bg-studio-950/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base text-zinc-200">Starter Free</h3>
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                  Current
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$0</span>
                <span className="text-xs text-zinc-400">/ forever</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Ideal for hobbyists exploring 2D-to-3D concept prototyping.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>10 Initial Generation Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Draft & Standard Modes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Export to GLB, OBJ, STL</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <X className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  <span>No 2048px High-Detail PBR</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleFreeRefill}
              className="mt-6 w-full rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-white font-medium text-xs py-2.5 transition-colors"
            >
              Refill +10 Free Credits
            </button>
          </div>

          {/* Pro Tier */}
          <div className="relative rounded-2xl border-2 border-indigo-500 bg-gradient-to-b from-indigo-950/40 via-studio-950 to-studio-950 p-6 flex flex-col justify-between shadow-xl shadow-indigo-950/50">
            <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-3 py-0.5 text-[10px] font-bold text-zinc-950 uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <h3 className="font-semibold text-base text-white">Studio Pro</h3>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$19</span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Designed for indie game devs, VFX artists, and 3D studio designers.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-200">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-white">250 Monthly Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>High-Detail PBR (2048px Maps)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Prioritized Dedicated GPU Queue</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Full Commercial Rights License</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulateUpgrade}
              disabled={isUpgrading || success}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs py-3 shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98]"
            >
              {success ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Upgraded! +250 Credits Added</span>
                </>
              ) : isUpgrading ? (
                <span>Processing Upgrade...</span>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-amber-300 fill-amber-300" />
                  <span>Upgrade to Pro ($19/mo)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
