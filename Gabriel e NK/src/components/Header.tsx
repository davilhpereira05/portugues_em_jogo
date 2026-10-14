import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, Volume2, VolumeX, X } from "lucide-react";
import { navItens } from "./nav-itens";
import { XPBar } from "./XPBar";
import { useTema } from "@/lib/theme";
import { useProgresso } from "@/lib/progresso";
import { cn } from "@/lib/utils";

export function Header() {
  const [aberto, setAberto] = useState(false);
  const { tema, alternarTema } = useTema();
  const { som, alternarSom, tocar } = useProgresso();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Concordância Verbal e Nominal — ir para o início">
          <span className="brand-gradient grid size-9 place-items-center rounded-xl font-display text-lg font-bold text-primary-foreground shadow-soft">
            CV
          </span>
          <span className="leading-none">
            <span className="block max-w-40 font-display text-sm font-bold leading-tight sm:max-w-none sm:text-base">
              Concordância Verbal &amp; Nominal
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              Português em Jogo
            </span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {navItens.map((item) => {
              const ativo = pathname === item.rota;
              return (
                <li key={item.rota}>
                  <Link
                    to={item.rota}
                    className={cn(
                      "rounded-lg px-2.5 py-2 text-[0.8rem] font-semibold uppercase tracking-wide transition-colors",
                      ativo
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                    )}
                  >
                    {item.titulo}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-2">
          <div className="hidden w-44 lg:block">
            <XPBar compacto />
          </div>
          <button
            type="button"
            onClick={() => {
              alternarSom();
              if (!som) tocar("xp");
            }}
            aria-label={som ? "Desligar sons" : "Ligar sons"}
            aria-pressed={som}
            className="grid size-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            {som ? <Volume2 className="size-4.5" aria-hidden /> : <VolumeX className="size-4.5" aria-hidden />}
          </button>
          <button
            type="button"
            onClick={alternarTema}
            aria-label={tema === "escuro" ? "Ativar tema claro" : "Ativar tema escuro"}
            className="grid size-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            {tema === "escuro" ? <Sun className="size-4.5" aria-hidden /> : <Moon className="size-4.5" aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => setAberto((a) => !a)}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            className="grid size-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary xl:hidden"
          >
            {aberto ? <X className="size-4.5" aria-hidden /> : <Menu className="size-4.5" aria-hidden />}
          </button>
        </div>
      </div>

      {aberto ? (
        <nav aria-label="Navegação móvel" className="border-t border-border bg-card/95 xl:hidden">
          <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-3 sm:px-6">
            {navItens.map((item) => (
              <li key={item.rota}>
                <Link
                  to={item.rota}
                  onClick={() => setAberto(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                    pathname === item.rota
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {item.titulo}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4 sm:px-6 lg:hidden">
            <XPBar />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
