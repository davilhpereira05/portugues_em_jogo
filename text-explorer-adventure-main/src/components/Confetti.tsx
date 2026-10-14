import { useEffect, useState } from "react";
import { useGame } from "@/lib/game";

const COLORS = ["var(--sun)", "var(--sky)", "var(--leaf)", "var(--tangerine)", "var(--bubble)", "var(--grape)", "var(--aqua)"];

export function Confetti() {
  const { confettiKey } = useGame();
  const [pieces, setPieces] = useState<{ id: number; left: number; dx: number; delay: number; color: string; star: boolean; dur: number }[]>([]);
  useEffect(() => {
    if (!confettiKey) return;
    const arr = Array.from({ length: 60 }, (_, i) => ({
      id: confettiKey * 1000 + i,
      left: Math.random() * 100,
      dx: (Math.random() - 0.5) * 200,
      delay: Math.random() * 0.4,
      color: COLORS[i % COLORS.length]!,
      star: i % 6 === 0,
      dur: 1.8 + Math.random() * 1.2,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 3500);
    return () => clearTimeout(t);
  }, [confettiKey]);
  if (!pieces.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            ["--dx" as string]: `${p.dx}px`,
            animation: `confetti-fall ${p.dur}s ${p.delay}s ease-in forwards`,
            width: p.star ? "auto" : 10,
            height: p.star ? "auto" : 14,
            background: p.star ? undefined : p.color,
            borderRadius: 3,
            fontSize: 20,
          }}
        >
          {p.star ? "⭐" : ""}
        </span>
      ))}
    </div>
  );
}
