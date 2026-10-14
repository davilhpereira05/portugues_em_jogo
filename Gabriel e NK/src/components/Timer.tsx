import { useEffect, useState } from "react";
import { Timer as TimerIcone } from "lucide-react";
import { cn } from "@/lib/utils";

export function Timer({
  segundos,
  ativo,
  onFim,
  chave,
}: {
  segundos: number;
  ativo: boolean;
  onFim: () => void;
  chave: string | number;
}) {
  const [restante, setRestante] = useState(segundos);

  useEffect(() => {
    setRestante(segundos);
  }, [segundos, chave]);

  useEffect(() => {
    if (!ativo) return;
    if (restante <= 0) {
      onFim();
      return;
    }
    const id = window.setTimeout(() => setRestante((r) => r - 1), 1000);
    return () => window.clearTimeout(id);
  }, [restante, ativo, onFim]);

  const pct = Math.max(0, (restante / segundos) * 100);
  const critico = restante <= 3;

  return (
    <div className="w-full max-w-xs">
      <p
        className={cn(
          "flex items-center gap-2 font-display text-lg font-bold tabular-nums",
          critico ? "text-destructive" : "text-accent",
        )}
        role="timer"
        aria-live="off"
      >
        <TimerIcone className={cn("size-4.5", critico && "animate-pulse")} aria-hidden />
        00:{String(Math.max(0, restante)).padStart(2, "0")}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all duration-1000 ease-linear", critico ? "bg-destructive" : "bg-accent")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
