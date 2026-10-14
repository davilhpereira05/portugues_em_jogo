import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Rota =
  | "/"
  | "/barroco"
  | "/arcadismo"
  | "/comparacao"
  | "/quiz"
  | "/mapa"
  | "/resultado";

export function SecaoTitulo({
  titulo,
  legenda,
  escuro = false,
}: {
  titulo: string;
  legenda?: string;
  escuro?: boolean;
}) {
  return (
    <div className="mb-6">
      <h2
        className={cn(
          "text-2xl font-bold sm:text-3xl",
          escuro ? "text-gold" : "text-foreground",
        )}
      >
        {titulo}
      </h2>
      {legenda && (
        <p className={cn("mt-1 text-sm", escuro ? "text-cream/80" : "text-muted-foreground")}>
          {legenda}
        </p>
      )}
    </div>
  );
}

export function Pill({ children, escuro }: { children: ReactNode; escuro?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        escuro
          ? "bg-gold/15 text-gold ring-1 ring-gold/40"
          : "bg-arcadia/12 text-arcadia ring-1 ring-arcadia/30",
      )}
    >
      {children}
    </span>
  );
}

export function NavProxima({
  voltarPara,
  voltarLabel,
  proximoPara,
  proximoLabel,
  escuro = false,
}: {
  voltarPara?: Rota;
  voltarLabel?: string;
  proximoPara: Rota;
  proximoLabel: string;
  escuro?: boolean;
}) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
      {voltarPara ? (
        <Link
          to={voltarPara}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
            escuro
              ? "border-gold/40 text-cream hover:bg-gold/15"
              : "border-border text-foreground hover:bg-accent",
          )}
        >
          <ArrowLeft className="size-4" /> {voltarLabel ?? "Voltar"}
        </Link>
      ) : (
        <span />
      )}
      <Link
        to={proximoPara}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5",
          escuro
            ? "bg-gold text-barroco-deep shadow-lg"
            : "bg-primary text-primary-foreground shadow-lg",
        )}
      >
        {proximoLabel} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export function Rodape() {
  return (
    <footer className="border-t border-border bg-secondary/60 py-8 text-center text-sm text-muted-foreground">
      <p className="font-display text-base text-foreground">Barroco & Arcadismo</p>
      <p className="mt-1">Uma viagem pela literatura brasileira</p>
      <p className="mt-3">Trabalho de Português — Gui Maba e Gui Freitas</p>
    </footer>
  );
}
