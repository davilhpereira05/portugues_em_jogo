import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Star, X } from "lucide-react";
import { useProgresso } from "@/lib/progresso";

const itens = [
  { to: "/", label: "Início" },
  { to: "/barroco", label: "Barroco" },
  { to: "/arcadismo", label: "Arcadismo" },
  { to: "/comparacao", label: "Comparação" },
  { to: "/quiz", label: "Quiz" },
  { to: "/mapa", label: "Mapa" },
] as const;

export function SiteNav() {
  const [aberto, setAberto] = useState(false);
  const { estado } = useProgresso();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="font-display text-sm font-bold tracking-wide sm:text-base">
          BARROCO <span className="text-primary">&</span> ARCADISMO
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {itens.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              activeOptions={{ exact: i.to === "/" }}
              className="rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-accent"
              activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-secondary px-3 py-1.5 text-sm font-semibold">
            <Star className="size-4 text-gold" aria-hidden />
            {estado.pontos.toLocaleString("pt-BR")}
          </span>
          <button
            type="button"
            onClick={() => setAberto((a) => !a)}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="rounded-full border border-border p-2 md:hidden"
          >
            {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {aberto && (
        <nav className="grid gap-1 border-t border-border px-4 pb-4 pt-2 md:hidden">
          {itens.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              activeOptions={{ exact: i.to === "/" }}
              onClick={() => setAberto(false)}
              className="rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-accent"
              activeProps={{ className: "bg-primary text-primary-foreground" }}
            >
              {i.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
