import { createFileRoute } from "@tanstack/react-router";
import { Badge, Expandable, LinkButton, PageShell, Panel } from "@/components/ui-kit";
import { PHASES, QUESTIONS } from "@/lib/quiz-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/gabarito")({
  head: () => ({
    meta: [
      { title: "Gabarito comentado — Regência e crase" },
      {
        name: "description",
        content:
          "Gabarito explicativo das 15 questões: resposta correta e justificativa de regência, preposição ou crase em cada item.",
      },
      { property: "og:title", content: "Gabarito comentado" },
      {
        property: "og:description",
        content: "Cada questão com a resposta certa e a explicação completa.",
      },
    ],
  }),
  component: Gabarito,
});

const LETTERS = ["A", "B", "C", "D"];

function Gabarito() {
  const { state, correctCount, answeredCount } = useProgress();

  return (
    <PageShell
      eyebrow="Etapa 6 · Relatório do caso"
      title="✅ GABARITO COMENTADO"
      subtitle="Cada questão traz a resposta correta e a explicação. Abra os cards conforme precisar."
    >
      <Panel className="mb-6 flex flex-wrap items-center gap-3">
        <Badge tone="primary">Seu desempenho</Badge>
        <span className="text-sm text-muted-foreground">
          {answeredCount} questões respondidas · {correctCount} acertos
        </span>
      </Panel>

      <div className="grid gap-8">
        {PHASES.map((p) => (
          <section key={p.id}>
            <h2 className="mb-3 text-xl font-bold">
              {p.icon} Fase {p.id} — {p.name}
            </h2>
            <div className="grid gap-3">
              {QUESTIONS.filter((q) => q.phase === p.id).map((q) => {
                const rec = state.answers[q.id];
                return (
                  <Expandable
                    key={q.id}
                    title={`QUESTÃO ${q.id} — ${q.prompt}`}
                    badge={
                      rec ? (
                        <Badge tone={rec.correct ? "success" : "danger"}>
                          {rec.correct ? "acertou" : "errou"}
                        </Badge>
                      ) : (
                        <Badge tone="muted">não respondida</Badge>
                      )
                    }
                  >
                    <p className="font-display text-base font-bold text-foreground">
                      Resposta: {LETTERS[q.correct]} — {q.options[q.correct]}
                    </p>
                    <p className="mt-2">{q.explanation}</p>
                  </Expandable>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton to="/final" variant="gold">
          🚨 Ir para o DESAFIO FINAL
        </LinkButton>
        <LinkButton to="/desafio" variant="ghost">
          ← Voltar ao Desafio
        </LinkButton>
      </div>
    </PageShell>
  );
}
