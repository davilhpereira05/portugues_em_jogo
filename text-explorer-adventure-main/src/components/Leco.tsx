import type { ReactNode } from "react";

export type Mood = "feliz" | "pensando" | "surpreso" | "confuso" | "comemorando";

export function Leco({ mood = "feliz", size = 140, className = "" }: { mood?: Mood; size?: number; className?: string }) {
  const eyes = {
    feliz: <><path d="M70 92 q8 -9 16 0" /><path d="M114 92 q8 -9 16 0" /></>,
    pensando: <><circle cx="78" cy="90" r="6" fill="currentColor" /><circle cx="124" cy="86" r="6" fill="currentColor" /></>,
    surpreso: <><circle cx="78" cy="90" r="9" fill="white" stroke="currentColor" strokeWidth="4" /><circle cx="122" cy="90" r="9" fill="white" stroke="currentColor" strokeWidth="4" /><circle cx="78" cy="90" r="4" fill="currentColor" /><circle cx="122" cy="90" r="4" fill="currentColor" /></>,
    confuso: <><path d="M70 86 l16 8" /><circle cx="122" cy="90" r="6" fill="currentColor" /></>,
    comemorando: <><path d="M70 94 q8 -12 16 0" /><path d="M114 94 q8 -12 16 0" /></>,
  }[mood];
  const mouth = {
    feliz: <path d="M82 116 q18 16 36 0" />,
    pensando: <path d="M88 120 h22" />,
    surpreso: <ellipse cx="100" cy="120" rx="8" ry="10" fill="var(--ink)" />,
    confuso: <path d="M84 122 q8 -6 16 0 q8 6 16 0" />,
    comemorando: <path d="M78 112 q22 26 44 0 z" fill="var(--bubble)" />,
  }[mood];
  const labels: Record<Mood, string> = { feliz: "feliz", pensando: "pensando", surpreso: "surpreso", confuso: "confuso", comemorando: "comemorando" };
  return (
    <svg viewBox="0 0 200 220" width={size} height={size * 1.1} className={className} role="img" aria-label={`Leco, o Explorador das Palavras, ${labels[mood]}`} style={{ color: "var(--ink)" }}>
      {/* arms */}
      {mood === "comemorando" ? (
        <g stroke="var(--sky-deep)" strokeWidth="12" strokeLinecap="round"><path d="M50 150 L22 100" /><path d="M150 150 L178 100" /></g>
      ) : mood === "pensando" ? (
        <g stroke="var(--sky-deep)" strokeWidth="12" strokeLinecap="round"><path d="M50 160 L30 185" /><path d="M150 160 L120 132" /></g>
      ) : (
        <g stroke="var(--sky-deep)" strokeWidth="12" strokeLinecap="round"><path d="M50 160 L28 186" /><path d="M150 160 L172 186" /></g>
      )}
      {/* body */}
      <rect x="55" y="140" width="90" height="62" rx="26" fill="var(--sky)" />
      <rect x="82" y="150" width="36" height="28" rx="6" fill="var(--sun)" />
      <text x="100" y="171" textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="Fredoka" fill="var(--ink)">Aa</text>
      {/* head */}
      <circle cx="100" cy="100" r="58" fill="var(--sun)" />
      {/* explorer hat */}
      <path d="M38 62 q62 -50 124 0 z" fill="var(--tangerine)" />
      <rect x="30" y="58" width="140" height="12" rx="6" fill="var(--tangerine-deep)" />
      <rect x="70" y="40" width="60" height="8" rx="4" fill="var(--leaf)" />
      {/* cheeks */}
      <circle cx="64" cy="112" r="8" fill="var(--bubble)" opacity=".55" />
      <circle cx="136" cy="112" r="8" fill="var(--bubble)" opacity=".55" />
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">{eyes}{mouth}</g>
      {mood === "pensando" && <text x="160" y="40" fontSize="30">💭</text>}
      {mood === "confuso" && <text x="160" y="44" fontSize="30" fill="var(--grape)" fontFamily="Fredoka" fontWeight="700">?</text>}
      {mood === "surpreso" && <text x="158" y="44" fontSize="30" fill="var(--tangerine-deep)" fontFamily="Fredoka" fontWeight="700">!</text>}
      {mood === "comemorando" && <><text x="6" y="70" fontSize="22">✨</text><text x="168" y="70" fontSize="22">⭐</text></>}
    </svg>
  );
}

export function LecoSays({ mood = "feliz", children, size = 96 }: { mood?: Mood; children: ReactNode; size?: number }) {
  return (
    <div className="flex items-end gap-3">
      <Leco mood={mood} size={size} className="shrink-0" />
      <div className="relative mb-6 rounded-2xl rounded-bl-none border-2 border-sky bg-card px-4 py-3 font-semibold shadow-soft animate-pop" aria-live="polite">
        {children}
      </div>
    </div>
  );
}
