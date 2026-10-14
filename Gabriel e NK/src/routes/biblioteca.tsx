import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, Lock } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { bibliotecaModulos } from "@/data/conteudo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca digital — Português em Jogo | Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Os módulos do projeto Português em Jogo, de interpretação textual a pontuação. O módulo 12 — Concordância verbal e nominal — está disponível.",
      },
      { property: "og:title", content: "Biblioteca digital Português em Jogo" },
      {
        property: "og:description",
        content: "14 módulos planejados de Língua Portuguesa; a concordância já está liberada.",
      },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  return (
    <PageShell
      etiqueta="📚 Português em Jogo"
      titulo="Biblioteca digital"
      descricao="Este site é o módulo 12 de um projeto maior. Os outros módulos ficam como espaços preparados para receber conteúdo no futuro."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {bibliotecaModulos.map((modulo) => {
          const atual = modulo.estado === "atual";
          return (
            <article
              key={modulo.numero}
              className={cn(
                "surface-card p-5",
                atual && "border-success/50 shadow-glow",
                !atual && "opacity-80",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-2xl font-bold text-accent/50">{modulo.numero}</span>
                {atual ? (
                  <span className="rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-bold text-success">
                    🟢 Você está aqui
                  </span>
                ) : (
                  <Lock className="size-4 text-muted-foreground" aria-hidden />
                )}
              </div>
              <h2 className="mt-2 font-display text-base font-bold">{modulo.titulo}</h2>
              {atual ? (
                <>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Concordância verbal e nominal — conteúdo, exemplos, laboratório e 15 desafios.
                  </p>
                  <Link
                    to="/aprenda"
                    className="brand-gradient mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    <BookMarked className="size-4" aria-hidden />
                    Abrir módulo
                  </Link>
                </>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">Módulo futuro do projeto.</p>
              )}
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
