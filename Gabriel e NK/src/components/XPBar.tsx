import { Flame, Sparkles } from "lucide-react";
import { useProgresso } from "@/lib/progresso";
import { cn } from "@/lib/utils";

export function XPBar({ compacto = false }: { compacto?: boolean }) {
  const { estado, nivel, ultimoGanho } = useProgresso();

  return (
    <div className={cn("w-full", compacto ? "max-w-[15rem]" : "")}>
      <div className="mb-1 flex items-center justify-between gap-3 text-xs font-medium">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Sparkles className="size-3.5 text-accent" aria-hidden />
          Nível {nivel.nivel} · {nivel.nome}
        </span>
        <span className="relative tabular-nums text-muted-foreground">
          {estado.xp.toLocaleString("pt-BR")} / {nivel.xpMax.toLocaleString("pt-BR")} XP
          {ultimoGanho ? (
            <span
              key={ultimoGanho.chave}
              className="pointer-events-none absolute -top-1 right-0 animate-xp text-sm font-bold text-success"
            >
              +{ultimoGanho.valor}
            </span>
          ) : null}
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={nivel.progressoNivel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso do nível ${nivel.nivel}`}
      >
        <div
          className="brand-gradient h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${Math.max(3, nivel.progressoNivel)}%` }}
        />
      </div>
      {estado.combo >= 2 && !compacto ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-warning">
          <Flame className="size-3.5" aria-hidden /> Combo x{estado.combo}
        </p>
      ) : null}
    </div>
  );
}
