import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useProgress } from "@/lib/progress";

const NAV = [
  { to: "/", label: "Início", icon: "🏠" },
  { to: "/aprenda", label: "Aprenda", icon: "📚" },
  { to: "/exemplos", label: "Exemplos", icon: "✏️" },
  { to: "/explore", label: "Explore", icon: "🔎" },
  { to: "/desafio", label: "Desafio", icon: "🎮" },
  { to: "/gabarito", label: "Gabarito", icon: "✅" },
  { to: "/final", label: "Final", icon: "🏆" },
  { to: "/resumao", label: "Resumão", icon: "📖" },
] as const;

const STEPS = [
  { to: "/", label: "INÍCIO" },
  { to: "/aprenda", label: "APRENDA" },
  { to: "/exemplos", label: "EXEMPLOS" },
  { to: "/explore", label: "EXPLORE" },
  { to: "/desafio", label: "DESAFIO" },
  { to: "/gabarito", label: "GABARITO" },
  { to: "/final", label: "FINAL" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { xp, percent, rank } = useProgress();

  const currentStep = Math.max(
    0,
    STEPS.findIndex((s) => s.to === pathname),
  );
  const stepLabel = STEPS[currentStep]?.label ?? "INÍCIO";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-lg">🔎</span>
          <span className="hidden font-display text-sm font-bold tracking-wide sm:block">
            MISSÃO: O MISTÉRIO DA CRASE
          </span>
          <span className="font-display text-sm font-bold sm:hidden">MISSÃO CRASE</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              <span aria-hidden>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <div className="hidden rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold text-gold sm:block">
            ⭐ {xp} / 1500 XP
          </div>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-md border border-border text-base lg:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-border px-4 pb-4 pt-2 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              <span aria-hidden>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
      )}

      <div className="border-t border-border/70 bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {STEPS.map((s, i) => (
              <span key={s.to} className="flex items-center gap-1">
                <span className={i <= currentStep ? "text-primary-glow" : ""}>{s.label}</span>
                {i < STEPS.length - 1 && <span aria-hidden className="opacity-40">→</span>}
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progresso da missão"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="shrink-0 text-[11px] font-bold text-muted-foreground">
              {percent}% · {rank.icon} {rank.name}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground sm:hidden">
            ⭐ {xp} / 1500 XP · Fase atual: {stepLabel}
          </p>
          <p className="mt-1 hidden text-[11px] text-muted-foreground sm:block">
            Fase atual: {stepLabel}
          </p>
        </div>
      </div>
    </header>
  );
}
