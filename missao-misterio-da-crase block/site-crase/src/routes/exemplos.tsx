import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, LinkButton, PageShell, Panel } from "@/components/ui-kit";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/exemplos")({
  head: () => ({
    meta: [
      { title: "Caça ao erro — Exemplos de regência e crase" },
      {
        name: "description",
        content:
          "Analise frases e decida se estão corretas ou erradas. Feedback explicativo imediato sobre regência e crase.",
      },
      { property: "og:title", content: "Caça ao erro — Exemplos" },
      {
        property: "og:description",
        content: "Treino livre: julgue frases como certas ou erradas e veja a explicação.",
      },
    ],
  }),
  component: Exemplos,
});

type Caso = {
  id: number;
  frase: string;
  correta: boolean;
  veredito: string;
  explicacao: string;
  corrigida?: string;
};

const CASOS: Caso[] = [
  {
    id: 1,
    frase: "Fui a escola ontem.",
    correta: false,
    veredito: "ERRADO!",
    explicacao: "O verbo ir exige a preposição a e escola admite o artigo a.",
    corrigida: "Fui à escola ontem.",
  },
  {
    id: 2,
    frase: "Gosto de estudar.",
    correta: true,
    veredito: "CORRETO!",
    explicacao: "O verbo gostar exige a preposição de.",
  },
  {
    id: 3,
    frase: "Comecei à estudar.",
    correta: false,
    veredito: "ERRADO!",
    explicacao: "Não ocorre crase antes de verbo.",
    corrigida: "Comecei a estudar.",
  },
  {
    id: 4,
    frase: "Assisti o filme ontem.",
    correta: false,
    veredito: "ERRADO, considerando o sentido de “ver”.",
    explicacao:
      "No sentido de ver, o verbo assistir exige a preposição a: a + o filme = ao filme.",
    corrigida: "Assisti ao filme ontem.",
  },
];

function Exemplos() {
  const { solveHunt, state } = useProgress();
  const [escolhas, setEscolhas] = useState<Record<number, boolean | null>>({});

  const responder = (caso: Caso, escolha: boolean) => {
    setEscolhas((e) => ({ ...e, [caso.id]: escolha }));
    if (escolha === caso.correta) solveHunt(caso.id);
  };

  const resolvidos = state.huntSolved.length;

  return (
    <PageShell
      eyebrow="Etapa 3 · Treino livre"
      title="🔎 CAÇA AO ERRO"
      subtitle="Cada frase é um caso em aberto. Decida se está correta ou errada — e descubra o porquê. Este treino não vale XP: o XP é conquistado na página DESAFIO."
    >
      <Panel className="mb-6 flex flex-wrap items-center gap-3">
        <Badge tone="primary">Casos resolvidos</Badge>
        <span className="font-display text-xl font-bold">
          {resolvidos} / {CASOS.length}
        </span>
        <div className="h-2 min-w-32 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${(resolvidos / CASOS.length) * 100}%` }}
          />
        </div>
      </Panel>

      <div className="grid gap-5 md:grid-cols-2">
        {CASOS.map((caso, i) => {
          const escolha = escolhas[caso.id];
          const respondeu = escolha !== undefined && escolha !== null;
          const acertou = respondeu && escolha === caso.correta;
          return (
            <Panel
              key={caso.id}
              hover
              className={
                respondeu ? (acertou ? "border-success/60" : "border-destructive/60") : undefined
              }
            >
              <Badge tone="muted">Caso #{String(i + 1).padStart(2, "0")}</Badge>
              <p className="mt-3 font-mono text-lg">“{caso.frase}”</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => responder(caso, true)}
                  className="min-h-11 flex-1 rounded-lg border border-success/50 bg-success/10 px-4 py-2 text-sm font-bold text-success transition-colors hover:bg-success/20"
                >
                  ✅ CORRETO
                </button>
                <button
                  type="button"
                  onClick={() => responder(caso, false)}
                  className="min-h-11 flex-1 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm font-bold text-destructive transition-colors hover:bg-destructive/20"
                >
                  ❌ ERRADO
                </button>
              </div>

              {respondeu && (
                <div
                  className={`mt-4 animate-pop rounded-lg border p-4 text-sm ${
                    acertou
                      ? "border-success/50 bg-success/10"
                      : "border-destructive/50 bg-destructive/10"
                  }`}
                >
                  <p className="font-display text-base font-bold">
                    {acertou ? "🎯 Investigação certeira!" : "🔁 Reveja o caso e tente novamente."}
                  </p>
                  {acertou && (
                    <>
                      <p className="mt-2 font-bold">{caso.veredito}</p>
                      <p className="mt-1 text-muted-foreground">{caso.explicacao}</p>
                      {caso.corrigida && (
                        <p className="mt-2 font-mono text-success">Correto: {caso.corrigida}</p>
                      )}
                    </>
                  )}
                  {!acertou && (
                    <p className="mt-2 text-muted-foreground">
                      Dica: verifique a preposição exigida pela palavra e se a palavra seguinte
                      aceita o artigo <strong>a</strong>.
                    </p>
                  )}
                </div>
              )}
            </Panel>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton to="/explore">🧭 Ir para EXPLORE</LinkButton>
        <LinkButton to="/aprenda" variant="ghost">
          ← Voltar para Aprenda
        </LinkButton>
      </div>
    </PageShell>
  );
}
