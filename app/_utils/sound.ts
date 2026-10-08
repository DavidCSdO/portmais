'use client';

// Minimalist Web Audio API synthesizer for tactile mechanical feedback
let audioCtx: AudioContext | null = null;
let isAudioEnabled = false;

export const toggleAudio = (enable?: boolean): boolean => {
  if (typeof enable === 'boolean') {
    isAudioEnabled = enable;
  } else {
    isAudioEnabled = !isAudioEnabled;
  }
  if (isAudioEnabled && !audioCtx && typeof window !== 'undefined') {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    } catch {
      // AudioContext not supported
    }
  }
  if (audioCtx && audioCtx.state === 'suspended' && isAudioEnabled) {
    audioCtx.resume();
  }
  return isAudioEnabled;
};

export const getAudioState = (): boolean => isAudioEnabled;

export const playClickSound = (type: 'tick' | 'wood' | 'chime' = 'tick') => {
  if (!isAudioEnabled || !audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;

  if (type === 'tick') {
    // Soft mechanical analog switch click (45ms)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } else if (type === 'wood') {
    // Organic tactile pop (60ms)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.05);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.055);
  } else if (type === 'chime') {
    // Elegant ethereal tone for copy / success
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1174.66, now); // D6
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12); // A6

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }
};
