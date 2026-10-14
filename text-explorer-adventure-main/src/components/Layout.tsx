import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Star, Baby, GraduationCap, RotateCcw } from "lucide-react";
import { useGame } from "@/lib/game";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/aventura", label: "Aventura" },
  { to: "/aprender", label: "Aprender" },
  { to: "/exemplos", label: "Exemplos" },
  { to: "/explore", label: "Explore" },
  { to: "/jogos", label: "Jogos" },
  { to: "/quiz", label: "Quiz" },
  { to: "/gabarito", label: "Gabarito" },
  { to: "/conquistas", label: "Conquistas" },
  { to: "/desafio", label: "Desafio Final" },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const { xp, progress, mode, setMode, reset } = useGame();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-card focus:p-2">Pular para o conteúdo</a>
      <header className="sticky top-0 z-40 border-b-2 border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold leading-tight text-sky-deep">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-grad-sun text-xl shadow-pop">🎮</span>
            <span className="hidden sm:block">Português<br className="hidden" /> em Jogo</span>
          </Link>
          <nav className="ml-4 hidden flex-1 flex-wrap gap-1 xl:flex" aria-label="Principal">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="rounded-xl px-3 py-2 text-sm font-bold text-ink hover:bg-sky-soft"
                activeProps={{ className: "bg-sky text-primary-foreground hover:bg-sky" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-sun px-3 py-1.5 font-display font-bold text-ink shadow-pop" aria-label={`XP: ${xp}`}>
              <Star className="h-4 w-4 fill-current" /> XP: {xp}
            </div>
            <button onClick={() => setMode(mode === "infantil" ? "estudante" : "infantil")}
              className={`hidden items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold sm:flex ${mode === "infantil" ? "bg-bubble text-primary-foreground" : "bg-grape-soft text-grape-deep"}`}
              aria-pressed={mode === "infantil"}>
              {mode === "infantil" ? <><Baby className="h-4 w-4" /> Modo Infantil</> : <><GraduationCap className="h-4 w-4" /> Modo Estudante</>}
            </button>
            <button className="rounded-xl p-2 xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-2">
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="whitespace-nowrap">Aventura: {progress}% concluída</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da aventura">
              <div className="h-full rounded-full bg-grad-leaf transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        {open && (
          <nav className="border-t-2 border-border bg-card px-4 py-3 xl:hidden animate-fade-in" aria-label="Menu móvel">
            <div className="grid grid-cols-2 gap-2">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
                  className="rounded-xl bg-sky-soft px-3 py-3 font-bold text-sky-deep" activeProps={{ className: "bg-sky text-primary-foreground" }}>{n.label}</Link>
              ))}
            </div>
            <button onClick={() => setMode(mode === "infantil" ? "estudante" : "infantil")} className="btn-game mt-3 w-full bg-bubble text-primary-foreground sm:hidden">
              Trocar para {mode === "infantil" ? "Modo Estudante" : "Modo Infantil"}
            </button>
          </nav>
        )}
      </header>

      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

      <footer className="mt-12 bg-ink text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
          <div>
            <p className="font-display text-2xl font-bold text-sun">Projeto Português em Jogo</p>
            <p className="mt-1 font-bold">Grupo 03 — Coesão e Coerência Textual</p>
            <p>Integrantes: Arthur Seif e Alessandro</p>
            <p className="mt-3 opacity-80">Material desenvolvido para revisão de Língua Portuguesa.</p>
          </div>
          <div className="md:text-right">
            {!confirm ? (
              <button onClick={() => setConfirm(true)} className="btn-game bg-bubble text-primary-foreground"><RotateCcw className="h-4 w-4" /> REINICIAR AVENTURA</button>
            ) : (
              <div className="inline-block rounded-2xl bg-card p-4 text-left text-ink" role="alertdialog" aria-label="Confirmar reinício">
                <p className="font-bold">Tem certeza? Todo o XP, fases e conquistas serão apagados.</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => { reset(); setConfirm(false); }} className="btn-game bg-destructive text-destructive-foreground">Sim, apagar</button>
                  <button onClick={() => setConfirm(false)} className="btn-game bg-muted text-ink">Cancelar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
