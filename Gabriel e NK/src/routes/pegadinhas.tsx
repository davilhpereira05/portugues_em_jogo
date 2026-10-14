import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { MissionCard } from "@/components/MissionCard";
import { pegadinhas } from "@/data/conteudo";
import { useProgresso } from "@/lib/progresso";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pegadinhas")({
  head: () => ({
    meta: [
      { title: "Pegadinhas de concordância — Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Houveram, faz dois anos, menas, a maioria dos alunos, é proibida a entrada: as pegadinhas clássicas de concordância explicadas uma a uma.",
      },
      { property: "og:title", content: "Cuidado com as pegadinhas" },
      {
        property: "og:description",
        content: "Cinco armadilhas de concordância com o motivo de cada resposta — nunca só certo ou errado.",
      },
    ],
  }),
  component: Pegadinhas,
});

function Pegadinhas() {
  const [palpites, setPalpites] = useState<Record<string, "erro" | "correto">>({});
  const { registrarResposta } = useProgresso();

  function palpitar(id: string, valor: "erro" | "correto", veredito: "erro" | "correto") {
    if (palpites[id]) return;
    setPalpites((atual) => ({ ...atual, [id]: valor }));
    registrarResposta({
      id: `pegadinha-${id}`,
      area: "especiais",
      correta: valor === veredito,
      resposta: valor,
      xp: 50,
    });
  }

  return (
    <PageShell
      etiqueta="Pegadinhas"
      titulo="⚠️ Cuidado com as pegadinhas"
      descricao="Cinco construções que costumam derrubar estudantes em prova. Dê seu palpite e veja a explicação completa — o importante é entender o motivo."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {pegadinhas.map((p) => {
          const palpite = palpites[p.id];
          const respondido = Boolean(palpite);
          const acertou = palpite === p.veredito;
          return (
            <article key={p.id} className="surface-card p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-warning">
                <AlertTriangle className="size-3.5" aria-hidden />
                Pegadinha {p.numero}
              </p>
              <p className="mt-3 rounded-xl border border-border bg-secondary/40 p-4 font-display text-lg">
                “{p.frase}”
              </p>

              {!respondido ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => palpitar(p.id, "correto", p.veredito)}
                    className="rounded-xl border border-success/50 px-4 py-2 text-sm font-semibold text-success transition-colors hover:bg-success/10"
                  >
                    Está correta
                  </button>
                  <button
                    type="button"
                    onClick={() => palpitar(p.id, "erro", p.veredito)}
                    className="rounded-xl border border-destructive/50 px-4 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
                  >
                    Tem erro
                  </button>
                </div>
              ) : (
                <div className="animate-rise mt-4">
                  <p
                    className={cn(
                      "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
                      acertou
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-destructive/40 bg-destructive/10 text-destructive",
                    )}
                  >
                    {acertou ? "🟢 Você identificou certo" : "🔴 Não é isso"}
                  </p>
                  <p className="mt-3 font-display text-base font-bold">
                    {p.veredito === "erro" ? `Forma adequada: ${p.corrigida}` : "A frase está de acordo com a norma."}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">{p.explicacao}</p>
                  <p className="mt-3 inline-flex items-start gap-2 rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent">
                    <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden />
                    {p.dica}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-5">
        <MissionCard
          id="missao-pegadinhas"
          titulo="Desarmar as pegadinhas"
          descricao="Responda às cinco pegadinhas e leia cada explicação para concluir a missão."
        />
      </div>
    </PageShell>
  );
}
