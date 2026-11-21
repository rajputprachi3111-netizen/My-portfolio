// Web Audio API Synthesizer for Zero-Dependency Sci-Fi HUD Audio Effects
class SoundSystem {
    constructor() {
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "enabled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    initCtx() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
            if (AudioCtxClass) {
                this.ctx = new AudioCtxClass();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
    toggleSound() {
        this.enabled = !this.enabled;
        if (this.enabled) {
            this.initCtx();
            this.playBeep(880, 0.08, 'sine');
        }
        return this.enabled;
    }
    playHover() {
        if (!this.enabled)
            return;
        try {
            this.initCtx();
            if (!this.ctx)
                return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        }
        catch {
            // Audio context might be restricted
        }
    }
    playBeep(freq = 920, duration = 0.08, type = 'triangle') {
        if (!this.enabled)
            return;
        try {
            this.initCtx();
            if (!this.ctx)
                return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);
            gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        }
        catch {
            // Ignore audio error
        }
    }
    playPlanetSelect() {
        if (!this.enabled)
            return;
        try {
            this.initCtx();
            if (!this.ctx)
                return;
            const now = this.ctx.currentTime;
            // Chord harmonic swell
            [440, 554.37, 659.25, 880].forEach((freq, idx) => {
                if (!this.ctx)
                    return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.04);
                gain.gain.setValueAtTime(0, now + idx * 0.04);
                gain.gain.linearRampToValueAtTime(0.03, now + idx * 0.04 + 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.45);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + idx * 0.04);
                osc.stop(now + idx * 0.04 + 0.45);
            });
        }
        catch {
            // Ignore audio error
        }
    }
    playTransmissionSent() {
        if (!this.enabled)
            return;
        try {
            this.initCtx();
            if (!this.ctx)
                return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(1400, now + 0.25);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        }
        catch {
            // Ignore
        }
    }
}
export const soundEffects = new SoundSystem();
