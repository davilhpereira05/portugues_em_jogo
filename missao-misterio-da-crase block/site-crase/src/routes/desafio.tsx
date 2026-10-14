import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ActionButton, Badge, LinkButton, PageShell, Panel } from "@/components/ui-kit";
import { PHASES, QUESTIONS, XP_PER_QUESTION } from "@/lib/quiz-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/desafio")({
  head: () => ({
    meta: [
      { title: "Desafio — 5 fases, 15 questões, 1500 XP" },
      {
        name: "description",
        content:
          "Quiz gamificado de regência verbal, regência nominal, crase, caça ao erro e desafio misto, com XP, medalhas e questões cronometradas.",
      },
      { property: "og:title", content: "Desafio — 5 fases, 15 questões" },
      {
        property: "og:description",
        content: "Responda 15 questões de regência e crase e conquiste até 1500 XP.",
      },
    ],
  }),
  component: Desafio,
});

const LETTERS = ["A", "B", "C", "D"];

function Desafio() {
  const { state, answerQuestion, xp, percent, rank, medals, correctCount, startMission } =
    useProgress();
  const [fase, setFase] = useState(1);
  const perguntas = useMemo(() => QUESTIONS.filter((q) => q.phase === fase), [fase]);

  return (
    <PageShell
      eyebrow="Etapa 5 · Operação principal"
      title="🎮 DESAFIO"
      subtitle="5 fases, 15 questões, 100 XP por acerto. Cada resposta traz uma explicação."
    >
      <Panel className="mb-6">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <p className="font-display text-2xl font-bold text-gold">⭐ {xp} / 1500 XP</p>
            <p className="text-sm text-muted-foreground">
              {rank.icon} {rank.name} · {correctCount} acertos de {QUESTIONS.length}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {medals.map((m) => (
              <span
                key={m.id}
                title={m.unlocked ? m.name : `Bloqueada — ${m.hint}`}
                className={`grid size-11 place-items-center rounded-xl border text-lg transition-all ${
                  m.unlocked
                    ? "border-gold/60 bg-gold/15"
                    : "border-border bg-secondary/40 opacity-40 grayscale"
                }`}
              >
                {m.unlocked ? m.icon : "🔒"}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </Panel>

      <div className="mb-6 flex flex-wrap gap-2">
        {PHASES.map((p) => {
          const respondidas = QUESTIONS.filter(
            (q) => q.phase === p.id && state.answers[q.id],
          ).length;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setFase(p.id)}
              aria-pressed={fase === p.id}
              className={`min-h-11 rounded-lg border px-4 py-2 text-left text-sm font-bold transition-all ${
                fase === p.id
                  ? "border-primary bg-primary/20 text-primary-glow"
                  : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.icon} Fase {p.id} · {p.name}
              <span className="ml-2 text-xs opacity-70">{respondidas}/3</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5">
        {perguntas.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            record={state.answers[q.id]}
            onAnswer={(choice) => {
              startMission();
              answerQuestion(q.id, choice, choice === q.correct);
            }}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {fase < 5 ? (
          <ActionButton onClick={() => setFase((f) => f + 1)}>
            ➡ Próxima fase: {PHASES[fase]?.name}
          </ActionButton>
        ) : (
          <LinkButton to="/gabarito">✅ Ver o GABARITO</LinkButton>
        )}
        <LinkButton to="/final" variant="gold">
          🚨 Ir para o DESAFIO FINAL
        </LinkButton>
      </div>
    </PageShell>
  );
}

function QuestionCard({
  question,
  record,
  onAnswer,
}: {
  question: (typeof QUESTIONS)[number];
  record?: { choice: number; correct: boolean } | undefined;
  onAnswer: (choice: number) => void;
}) {
  const respondida = !!record;
  const [restante, setRestante] = useState(10);
  const [iniciado, setIniciado] = useState(false);
  const cronometrado = !!question.timed && !respondida;

  useEffect(() => {
    if (!cronometrado || !iniciado) return;
    if (restante <= 0) {
      onAnswer(-1);
      return;
    }
    const t = setTimeout(() => setRestante((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [cronometrado, iniciado, restante, onAnswer]);

  const esgotou = respondida && record?.choice === -1;

  return (
    <Panel
      className={
        record ? (record.correct ? "border-success/60" : "border-destructive/60") : undefined
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="muted">Questão {question.id}</Badge>
        {question.timed && (
          <Badge tone="danger">⏱️ Contra o tempo{respondida ? "" : ` — ${restante}s`}</Badge>
        )}
        <Badge tone="gold">⭐ {XP_PER_QUESTION} XP</Badge>
      </div>

      <p className="mt-4 text-lg font-bold">{question.prompt}</p>

      {cronometrado && !iniciado && (
        <div className="mt-4">
          <ActionButton variant="ghost" onClick={() => setIniciado(true)}>
            ▶ Iniciar cronômetro de 10 segundos
          </ActionButton>
          <p className="mt-2 text-xs text-muted-foreground">
            As alternativas ficam ativas assim que o cronômetro começa.
          </p>
        </div>
      )}

      {cronometrado && iniciado && (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-destructive transition-all duration-1000"
            style={{ width: `${(restante / 10) * 100}%` }}
          />
        </div>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {question.options.map((opt, i) => {
          const escolhida = record?.choice === i;
          const certa = respondida && i === question.correct;
          const bloqueada = respondida || (cronometrado && !iniciado);
          return (
            <button
              key={i}
              type="button"
              disabled={bloqueada}
              onClick={() => onAnswer(i)}
              className={`min-h-12 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-all disabled:cursor-not-allowed ${
                certa
                  ? "border-success bg-success/15 text-success"
                  : escolhida
                    ? "border-destructive bg-destructive/15 text-destructive"
                    : "border-border bg-secondary/40 hover:border-primary/60 hover:bg-secondary disabled:opacity-60"
              }`}
            >
              <span className="mr-2 font-display font-bold">{LETTERS[i]})</span>
              {opt}
            </button>
          );
        })}
      </div>

      {record && (
        <div
          className={`mt-4 animate-pop rounded-lg border p-4 text-sm ${
            record.correct
              ? "border-success/50 bg-success/10"
              : "border-destructive/50 bg-destructive/10"
          }`}
        >
          <p className="font-display text-base font-bold">
            {record.correct
              ? `✅ Resposta correta! +${XP_PER_QUESTION} XP`
              : esgotou
                ? "⏱️ Tempo esgotado!"
                : "❌ Resposta incorreta."}
          </p>
          <p className="mt-2 text-muted-foreground">
            Resposta certa: <strong>{LETTERS[question.correct]}</strong> —{" "}
            {question.options[question.correct]}
          </p>
          <p className="mt-1 text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </Panel>
  );
}
