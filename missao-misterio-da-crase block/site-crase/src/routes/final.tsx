import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ActionButton, Badge, LinkButton, PageShell, Panel } from "@/components/ui-kit";
import { QUESTIONS } from "@/lib/quiz-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "Desafio final — Corrija o texto misterioso" },
      {
        name: "description",
        content:
          "A última investigação: encontre e corrija os quatro erros de regência e crase escondidos no documento e conclua a missão.",
      },
      { property: "og:title", content: "Desafio final — O texto misterioso" },
      {
        property: "og:description",
        content: "Encontre os quatro erros do documento e receba seu relatório final de missão.",
      },
    ],
  }),
  component: Final,
});

type Trecho = { text: string; errado?: boolean; id?: number; correcao?: string; motivo?: string };

const TEXTO: Trecho[] = [
  { text: "Ontem fui " },
  {
    text: "a escola",
    errado: true,
    id: 1,
    correcao: "à escola",
    motivo:
      "O verbo ir exige a preposição a e escola aceita o artigo a. A fusão a + a resulta em à.",
  },
  { text: " e " },
  {
    text: "assisti o filme",
    errado: true,
    id: 2,
    correcao: "assisti ao filme",
    motivo:
      "No sentido de ver, assistir exige a preposição a. Com filme (masculino), a + o = ao.",
  },
  { text: " que a professora indicou. Depois, comecei " },
  {
    text: "à fazer",
    errado: true,
    id: 3,
    correcao: "a fazer",
    motivo: "Não ocorre crase antes de verbo: comecei a fazer.",
  },
  { text: " o trabalho e pedi ajuda " },
  {
    text: "a professora",
    errado: true,
    id: 4,
    correcao: "à professora",
    motivo:
      "O nome ajuda pede a preposição a e professora aceita o artigo a: a + a = à professora.",
  },
  { text: "." },
];

const ERROS = TEXTO.filter((t) => t.errado);

function Final() {
  const {
    xp,
    rank,
    medals,
    correctCount,
    accuracy,
    elapsedLabel,
    state,
    completeFinal,
    reset,
  } = useProgress();
  const [achados, setAchados] = useState<number[]>([]);
  const [erroAtual, setErroAtual] = useState<string | null>(null);

  const concluido = achados.length === ERROS.length;

  const clicar = (t: Trecho) => {
    if (t.errado && t.id) {
      if (!achados.includes(t.id)) {
        const novos = [...achados, t.id];
        setAchados(novos);
        setErroAtual(null);
        if (novos.length === ERROS.length) completeFinal();
      }
    } else {
      setErroAtual(t.text);
    }
  };

  return (
    <PageShell
      eyebrow="Etapa 7 · Última investigação"
      title="🚨 O TEXTO FINAL"
      subtitle="Você chegou à última investigação. Agora encontre todos os erros escondidos no documento."
    >
      <Panel className="grid-scan">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="danger">🔐 Documento apreendido</Badge>
          <Badge tone="primary">
            Erros encontrados: {achados.length} / {ERROS.length}
          </Badge>
        </div>
        <p className="mt-5 text-lg leading-loose">
          {TEXTO.map((t, i) => {
            const encontrado = t.id ? achados.includes(t.id) : false;
            return (
              <button
                key={i}
                type="button"
                onClick={() => clicar(t)}
                className={`rounded px-1 text-left transition-colors ${
                  encontrado
                    ? "bg-success/20 font-bold text-success"
                    : "hover:bg-primary/15 hover:text-primary-glow"
                }`}
              >
                {encontrado ? t.correcao : t.text}
              </button>
            );
          })}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Clique nos trechos suspeitos. Ao acertar, o trecho é corrigido automaticamente no
          documento.
        </p>
        {erroAtual && !concluido && (
          <p className="mt-3 animate-pop rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm">
            ❌ “{erroAtual}” está correto — continue procurando problemas de regência e crase.
          </p>
        )}
      </Panel>

      {concluido && (
        <div className="mt-6 grid animate-pop gap-6">
          <Panel className="border-success/60 text-center">
            <h2 className="font-display text-3xl font-bold text-success">MISSÃO CONCLUÍDA!</h2>
            <p className="mt-3 text-muted-foreground">Versão corrigida:</p>
            <p className="mt-2 font-mono text-base">
              “Ontem fui à escola e assisti ao filme que a professora indicou. Depois, comecei a
              fazer o trabalho e pedi ajuda à professora.”
            </p>
          </Panel>

          <div className="grid gap-4 sm:grid-cols-2">
            {ERROS.map((e) => (
              <Panel key={e.id}>
                <p className="font-mono text-sm">
                  <span className="text-destructive">{e.text}</span> →{" "}
                  <span className="text-success">{e.correcao}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{e.motivo}</p>
              </Panel>
            ))}
          </div>

          <Panel className="border-gold/60">
            <h2 className="text-center font-display text-3xl font-bold text-gold">
              🎉 MISSÃO CONCLUÍDA!
            </h2>
            <p className="mt-2 text-center text-muted-foreground">Parabéns, investigador!</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["XP total", `⭐ ${xp} / 1500`],
                ["Classificação", `${rank.icon} ${rank.name}`],
                ["Questões corretas", `${correctCount} / ${QUESTIONS.length}`],
                ["Porcentagem de acerto", `${accuracy}%`],
                ["Tempo da missão", elapsedLabel],
                ["Texto final", state.finalDone ? "Corrigido ✅" : "Pendente"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-xl border border-border bg-secondary/40 p-4 text-center"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {k}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {medals.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-xl border px-4 py-3 text-center text-sm font-bold ${
                    m.unlocked
                      ? "border-gold/60 bg-gold/15 text-gold"
                      : "border-border bg-secondary/40 text-muted-foreground opacity-60"
                  }`}
                >
                  <span className="text-xl">{m.unlocked ? m.icon : "🔒"}</span>
                  <p className="mt-1">{m.name}</p>
                  {!m.unlocked && <p className="text-[11px] font-normal">{m.hint}</p>}
                </div>
              ))}
            </div>

            {xp >= 1500 && (
              <p className="mt-6 text-center font-display text-2xl font-bold text-gold">
                👑 MESTRE DA CRASE
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ActionButton
                variant="gold"
                onClick={() => {
                  reset();
                  setAchados([]);
                  setErroAtual(null);
                }}
              >
                🔄 JOGAR NOVAMENTE
              </ActionButton>
              <LinkButton to="/aprenda" variant="ghost">
                📖 REVISAR CONTEÚDO
              </LinkButton>
            </div>
          </Panel>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton to="/gabarito" variant="ghost">
          ← Voltar ao Gabarito
        </LinkButton>
        <LinkButton to="/resumao" variant="ghost">
          📖 Resumão para a prova
        </LinkButton>
      </div>
    </PageShell>
  );
}
