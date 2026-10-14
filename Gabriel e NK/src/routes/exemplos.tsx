import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { MissionCard } from "@/components/MissionCard";
import { exemplos } from "@/data/conteudo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exemplos")({
  head: () => ({
    meta: [
      { title: "Exemplos do dia a dia — Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Concordância verbal e nominal em frases reais de redes sociais, notícias, escola e jogos. Clique e descubra a explicação.",
      },
      { property: "og:title", content: "Concordância em frases do dia a dia" },
      {
        property: "og:description",
        content: "Redes sociais, notícias, escola e jogos: veja o erro, a correção e o motivo.",
      },
    ],
  }),
  component: Exemplos,
});

const categorias = ["Todas", "Redes sociais", "Notícia", "Escola", "Jogos"] as const;

const selos = {
  erro: { texto: "🔴 Erro", classe: "border-destructive/40 bg-destructive/10 text-destructive" },
  correto: { texto: "🟢 Correto", classe: "border-success/40 bg-success/10 text-success" },
  depende: { texto: "🟡 Depende do contexto", classe: "border-warning/50 bg-warning/10 text-warning" },
} as const;

function Exemplos() {
  const [categoria, setCategoria] = useState<(typeof categorias)[number]>("Todas");
  const [abertos, setAbertos] = useState<string[]>([]);

  const lista = exemplos.filter((e) => categoria === "Todas" || e.categoria === categoria);

  return (
    <PageShell
      etiqueta="Exemplos"
      titulo="Concordância fora da sala de aula"
      descricao="Frases que aparecem em post, manchete, mural da escola e chat de jogo. Clique em uma frase para ver o veredito e a explicação."
    >
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          {categorias.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoria(c)}
              aria-pressed={categoria === c}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                categoria === c
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {lista.map((exemplo) => {
            const aberto = abertos.includes(exemplo.id);
            const selo = selos[exemplo.status];
            return (
              <article key={exemplo.id} className="surface-card p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {exemplo.emoji} {exemplo.categoria}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setAbertos((atual) =>
                      atual.includes(exemplo.id)
                        ? atual.filter((id) => id !== exemplo.id)
                        : [...atual, exemplo.id],
                    )
                  }
                  aria-expanded={aberto}
                  className="mt-3 w-full rounded-xl border border-border bg-secondary/40 p-4 text-left font-display text-lg transition-colors hover:border-accent"
                >
                  “{exemplo.frase}”
                  {!aberto ? (
                    <span className="mt-2 block text-xs font-semibold uppercase tracking-wide text-accent">
                      Clique para ver a análise
                    </span>
                  ) : null}
                </button>

                {aberto ? (
                  <div className="animate-rise mt-3">
                    <p className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-bold", selo.classe)}>
                      {selo.texto}
                    </p>
                    {exemplo.corrigida ? (
                      <p className="mt-3 font-display text-base font-semibold">{exemplo.corrigida}</p>
                    ) : null}
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{exemplo.explicacao}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <MissionCard
          id="missao-exemplos"
          titulo="Analisar exemplos reais"
          descricao="Abra as frases das quatro categorias e confira as explicações antes de marcar como concluída."
        />
      </div>
    </PageShell>
  );
}
