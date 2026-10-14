import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Star, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const phases = [
  ["/", "Início"], ["/aprenda", "Aprenda"], ["/exemplos", "Exemplos"], ["/explore", "Explore"],
  ["/desafio", "Desafio"], ["/gabarito", "Gabarito"], ["/chefao", "Chefão"],
] as const;

export function GameShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const active = Math.max(0, phases.findIndex(([to]) => to === path));
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-50 border-b-4 border-foreground bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold"><span className="logo-tile">L</span><span className="hidden sm:inline">Liga das Variedades</span></Link>
        <nav className="hidden items-center gap-1 lg:flex">{phases.map(([to,label], i) => <Link key={to} to={to} className={`nav-link ${path === to ? "nav-link-active" : ""}`}><span>{i+1}</span>{label}</Link>)}</nav>
        <div className="flex items-center gap-2"><span className="score-pill"><Star size={15} fill="currentColor" /> Fase {active+1}/7</span><button aria-label={open ? "Fechar menu" : "Abrir menu"} className="icon-button lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
      </div>
      <div className="h-1 bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${((active+1)/7)*100}%` }} /></div>
      {open && <nav className="grid grid-cols-2 gap-2 border-t-2 border-foreground p-3 lg:hidden">{phases.map(([to,label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`nav-link ${path === to ? "nav-link-active" : ""}`}>{label}</Link>)}</nav>}
    </header>
    <main>{children}</main>
    <footer className="mx-auto max-w-7xl px-4 py-12"><div className="flex flex-col items-center justify-between gap-3 rounded-2xl border-4 border-foreground bg-foreground p-6 text-primary-foreground sm:flex-row"><strong className="font-display">Liga das Variedades · Grupo 04</strong><span className="text-sm font-bold opacity-75">Davi Luiz & João Cunha · 2º ano · PASSE / AVALIA II</span></div></footer>
  </div>;
}

export function PageIntro({ phase, title, description }: { phase: string; title: string; description: string }) {
  return <div className="mb-10 text-center"><span className="phase-chip">{phase}</span><h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h1><p className="mx-auto mt-3 max-w-2xl text-lg font-semibold text-muted-foreground">{description}</p></div>;
}
