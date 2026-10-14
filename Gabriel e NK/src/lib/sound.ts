export type SoundName = "correto" | "erro" | "xp" | "combo" | "missao" | "nivel";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, duration: number, volume = 0.08, type: OscillatorType = "sine") {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime + start);
  gain.gain.setValueAtTime(0, audio.currentTime + start);
  gain.gain.linearRampToValueAtTime(volume, audio.currentTime + start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.02);
}

const patterns: Record<SoundName, () => void> = {
  correto: () => {
    tone(660, 0, 0.12);
    tone(880, 0.09, 0.16);
  },
  erro: () => {
    tone(220, 0, 0.18, 0.07, "triangle");
    tone(165, 0.1, 0.2, 0.06, "triangle");
  },
  xp: () => tone(1040, 0, 0.1, 0.05),
  combo: () => {
    tone(740, 0, 0.08);
    tone(920, 0.07, 0.08);
    tone(1180, 0.14, 0.12);
  },
  missao: () => {
    tone(520, 0, 0.1);
    tone(780, 0.1, 0.12);
    tone(1040, 0.2, 0.18);
  },
  nivel: () => {
    tone(440, 0, 0.12);
    tone(660, 0.12, 0.12);
    tone(880, 0.24, 0.12);
    tone(1320, 0.36, 0.24);
  },
};

export function playSound(name: SoundName) {
  try {
    patterns[name]();
  } catch {
    /* áudio indisponível — silencioso */
  }
}
