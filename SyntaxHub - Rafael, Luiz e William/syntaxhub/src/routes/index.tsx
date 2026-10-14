import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { lessons, type Lesson } from "@/data/lessons";
import { contents } from "@/data/content";

type Level = "facil" | "medio" | "dificil";
const LEVELS: { id: Level; label: string; info: string }[] = [
  { id: "facil", label: "Fácil", info: "3 perguntas · 2 opções" },
  { id: "medio", label: "Médio", info: "todas · 4 opções" },
  { id: "dificil", label: "Difícil", info: "embaralhado · 15s" },
];
const TIME = 15;

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j]!, b[i]!];
  }
  return b;
}

function buildLesson(l: Lesson, level: Level): Lesson {
  if (level === "facil") {
    return {
      ...l,
      questions: l.questions.slice(0, 3).map((q) => {
        const wrong = q.options.findIndex((_, i) => i !== q.correct);
        const opts = shuffle([q.correct, wrong]);
        return { ...q, options: opts.map((i) => q.options[i]!), correct: opts.indexOf(q.correct) };
      }),
    };
  }
  if (level === "dificil") {
    return {
      ...l,
      questions: shuffle(l.questions).map((q) => {
        const order = shuffle(q.options.map((_, i) => i));
        return { ...q, options: order.map((i) => q.options[i]!), correct: order.indexOf(q.correct) };
      }),
    };
  }
  return l;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SyntaxHub — Período composto e termos da oração em quizzes" },
      {
        name: "description",
        content:
          "Aprenda termos da oração e período composto jogando: quizzes rápidos, 3 vidas, gabarito ao errar e game over.",
      },
      { property: "og:title", content: "SyntaxHub — Gramática gamificada" },
      {
        property: "og:description",
        content:
          "Trilha de lições com quizzes de sintaxe: termos da oração, período composto, conectivos e subordinação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LETTERS = ["A", "B", "C", "D"];

function Hearts({ lives, dead = false }: { lives: number; dead?: boolean }) {
  return (
    <div className="flex gap-1.5 text-xl leading-none" aria-label={`${lives} vidas`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={
            dead ? "text-blood" : i < lives ? "text-cyan" : "text-frost/15"
          }
        >
          ❤
        </span>
      ))}
    </div>
  );
}

function Index() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [lives, setLives] = useState(3);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<"playing" | "over" | "win">("playing");
  const [level, setLevel] = useState<Level>("medio");
  const [menu, setMenu] = useState<string | null>(null);
  const [view, setView] = useState<"quiz" | "content">("content");
  const [contentId, setContentId] = useState<string>(lessons[0]!.id);
  const [time, setTime] = useState(TIME);

  const startLesson = (l: Lesson, lv: Level = level) => {
    const base = lessons.find((x) => x.id === l.id) ?? l;
    setLevel(lv);
    setMenu(null);
    setView("quiz");
    setTime(TIME);
    setLesson(buildLesson(base, lv));
    setStep(0);
    setLives(3);
    setPicked(null);
    setScore(0);
    setStatus("playing");
  };

  const backToTrail = () => {
    setLesson(null);
    setView("quiz");
  };
  const openContent = (id: string) => {
    setContentId(id);
    setView("content");
    setMenu(null);
  };

  const q = lesson?.questions[step];
  const wrong = picked !== null && q ? picked !== q.correct : false;

  useEffect(() => {
    if (level !== "dificil" || !lesson || status !== "playing" || picked !== null || view !== "quiz") return;
    if (time <= 0) {
      choose(-1);
      return;
    }
    const t = setTimeout(() => setTime((x) => x - 1), 1000);
    return () => clearTimeout(t);
  });

  const choose = (i: number) => {
    if (picked !== null || !q) return;
    setPicked(i);
    if (i === q.correct) {
      setScore((s) => s + 1);
    } else {
      const left = lives - 1;
      setLives(left);
      if (left <= 0) setTimeout(() => setStatus("over"), 700);
    }
  };

  const next = () => {
    if (!lesson) return;
    if (step + 1 >= lesson.questions.length) {
      setDone((d) => (d.includes(lesson.id) ? d : [...d, lesson.id]));
      setStatus("win");
    } else {
      setStep((s) => s + 1);
      setPicked(null);
      setTime(TIME);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink font-body text-frost antialiased selection:bg-cyan/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-32 size-[520px] animate-[drift_14s_var(--ease-snap)_infinite] rounded-full bg-cyan/20 blur-[120px]" />
        <div className="absolute top-1/3 right-[-120px] size-[460px] rounded-full bg-ink-2 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <button onClick={backToTrail} className="flex items-center gap-3">
            <div className="grid size-9 rotate-45 place-items-center rounded-[8px] bg-cyan shadow-[0_0_24px_rgb(34_211_238/0.4)] ring-1 ring-white/20">
              <span className="-rotate-45 font-display text-lg leading-none text-ink">S</span>
            </div>
            <span className="font-display text-2xl leading-none tracking-tight">
              SYNTAX<span className="text-cyan">HUB</span>
            </span>
          </button>
          <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
            <span className="text-base text-amber">✦</span>
            <span className="font-mono text-xs text-frost-2">{done.length * 100} XP</span>
          </div>
        </header>

        <main className="mt-10 grid items-start gap-8 lg:grid-cols-[340px_1fr]">
          <section className="animate-[rise_0.5s_var(--ease-snap)_both]">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
              Trilha
            </div>
            <div className="glass relative overflow-hidden rounded-[18px] p-5">
              <div className="absolute -right-16 -top-16 size-40 rounded-full bg-cyan/10 blur-2xl" />
              <div className="relative flex flex-col gap-1">
                {lessons.map((l, i) => {
                  const completed = done.includes(l.id);
                  const active = lesson?.id === l.id;
                  return (
                    <div key={l.id} className="relative">
                    <div className="flex items-center gap-1">
                    <button
                      onClick={() => startLesson(l)}
                      className="flex flex-1 items-center gap-4 rounded-2xl p-1 text-left transition-colors hover:bg-white/5"
                    >
                      <div
                        className={`grid size-11 shrink-0 place-items-center rounded-full font-mono text-sm ${
                          completed
                            ? "bg-green/20 text-green ring-1 ring-green/50"
                            : active
                              ? "animate-[pulseGlow_2s_var(--ease-snap)_infinite] bg-cyan font-display text-lg text-ink ring-4 ring-cyan/25"
                              : "bg-white/5 text-frost-2 ring-1 ring-white/15"
                        }`}
                      >
                        {completed ? "✓" : i + 1}
                      </div>
                      <div className="pb-3">
                        <div className="text-sm font-semibold">{l.title}</div>
                        <div
                          className={`font-mono text-[11px] ${active ? "text-cyan" : "text-frost-2"}`}
                        >
                          {completed
                            ? "concluído"
                            : active
                              ? "em andamento"
                              : l.subtitle}
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setMenu(menu === l.id ? null : l.id)}
                      aria-label={`Opções de ${l.title}`}
                      className={`grid size-9 shrink-0 place-items-center rounded-xl font-display text-xl leading-none transition-colors hover:bg-white/10 ${menu === l.id ? "bg-white/10 text-cyan" : "text-frost-2"}`}
                    >
                      ⋯
                    </button>
                    </div>
                    {menu === l.id && (
                      <div className="mb-3 ml-14 animate-[rise_0.25s_var(--ease-snap)_both] rounded-2xl bg-ink-2/80 p-2 ring-1 ring-cyan/30">
                        <div className="px-2 pb-1 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                          Dificuldade
                        </div>
                        {LEVELS.map((lv, n) => (
                          <button
                            key={lv.id}
                            onClick={() => startLesson(l, lv.id)}
                            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/5"
                          >
                            <span className="font-mono text-xs text-amber">{"★".repeat(n + 1)}{"☆".repeat(2 - n)}</span>
                            <span className="text-sm font-semibold">{lv.label}</span>
                            <span className="ml-auto font-mono text-[10px] text-frost-2">{lv.info}</span>
                          </button>
                        ))}
                        <div className="my-1 h-px bg-white/10" />
                        <button
                          onClick={() => openContent(l.id)}
                          className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm font-semibold transition-colors hover:bg-white/5"
                        >
                          <span className="text-cyan">▤</span> Conteúdo
                        </button>
                      </div>
                    )}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="mt-3 font-mono text-[11px] text-frost-2/70">
              {done.length}/{lessons.length} lições · 3 vidas por lição
            </p>
          </section>

          <section className="animate-[rise_0.5s_var(--ease-snap)_both] [animation-delay:120ms]">
            <div className="glass mb-4 inline-flex rounded-full p-1">
              {(["content", "quiz"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${view === v ? "bg-cyan text-ink" : "text-frost-2 hover:text-frost"}`}
                >
                  {v === "quiz" ? "Quiz" : "Conteúdos"}
                </button>
              ))}
            </div>

            {view === "content" && (
              <div className="glass rounded-[18px] p-5 sm:p-7">
                <div className="flex flex-wrap gap-2">
                  {lessons.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setContentId(l.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-colors ${contentId === l.id ? "bg-cyan/15 text-cyan ring-cyan/50" : "text-frost-2 ring-white/15 hover:text-frost"}`}
                    >
                      {l.title}
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {(contents[contentId] ?? []).map((c) => (
                    <div key={c.term} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <div className="font-display text-xl tracking-tight text-cyan">{c.term}</div>
                      <div className="mt-1 text-sm">{c.def}</div>
                      <div className="mt-2 font-mono text-[11px] text-frost-2">ex: {c.ex}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => startLesson(lessons.find((l) => l.id === contentId)!)}
                  className="mt-6 rounded-2xl bg-cyan px-6 py-3 font-display tracking-tight text-ink transition-colors hover:bg-frost"
                >
                  Praticar agora
                </button>
              </div>
            )}

            {view === "quiz" && (<>
            {!lesson && (
              <div className="glass rounded-[18px] p-7">
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
                  Começar
                </div>
                <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
                  Sintaxe em modo <span className="text-cyan">arcade</span>.
                </h1>
                <p className="mt-3 max-w-md text-sm text-frost-2">
                  Escolha uma lição na trilha. Errou 3 vezes? Game over.
                </p>
                <button
                  onClick={() => startLesson(lessons[0]!)}
                  className="mt-6 rounded-2xl bg-cyan px-8 py-4 font-display text-lg tracking-tight text-ink shadow-[0_0_30px_rgb(34_211_238/0.45)] ring-1 ring-white/20 transition-colors hover:bg-frost"
                >
                  Jogar agora
                </button>
              </div>
            )}

             </>)}
          </section>
        </main>

        {lesson && view === "quiz" && (
          <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-sm">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-ink/80 px-5 py-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid size-8 rotate-45 place-items-center rounded-[6px] bg-cyan ring-1 ring-white/20">
                  <span className="-rotate-45 font-display text-sm leading-none text-ink">S</span>
                </div>
                <span className="font-display text-lg leading-none tracking-tight">
                  SYNTAX<span className="text-cyan">HUB</span>
                </span>
              </div>
              <button
                onClick={backToTrail}
                aria-label="Sair do quiz"
                className="grid size-10 place-items-center rounded-full bg-white/5 text-frost-2 ring-1 ring-white/15 transition-colors hover:bg-blood/20 hover:text-blood"
              >
                ✕
              </button>
            </div>
            <div className="mx-auto w-full max-w-[720px] flex-1 px-5 py-6 sm:px-8">
              {status === "over" && (
                <div className="relative overflow-hidden rounded-[18px] bg-[#1A0B0D] p-6 ring-1 ring-blood/40 sm:p-10">
                  <div className="absolute inset-0 animate-[flash_1.1s_var(--ease-snap)_both] bg-blood/25" />
                  <div className="absolute -bottom-24 -right-10 size-72 rounded-full bg-blood/30 blur-[90px]" />
                  <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-blood/80">
                        Sem vidas
                      </div>
                      <div className="screen-shake font-display text-5xl leading-none tracking-tight text-blood sm:text-6xl">
                        GAME OVER
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <span className="rounded-full bg-blood/10 px-3 py-1.5 font-mono text-xs text-blood/80">
                          {score}/{lesson.questions.length} acertos
                        </span>
                        <span className="rounded-full bg-blood/10 px-3 py-1.5 font-mono text-xs text-blood/80">
                          +0 XP
                        </span>
                      </div>
                      {q && (
                        <div className="mt-5 max-w-md rounded-2xl bg-blood/10 p-4 ring-1 ring-blood/30">
                          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blood/80">
                            Gabarito
                          </p>
                          <p className="mt-1 font-semibold">
                            {LETTERS[q.correct]} — {q.options[q.correct]}
                          </p>
                          <p className="mt-1 text-sm text-frost-2">{q.gabarito}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 sm:flex-col">
                      <Hearts lives={0} dead />
                      <button
                        onClick={() => startLesson(lesson)}
                        className="rounded-2xl bg-blood px-8 py-4 font-display text-lg tracking-tight text-ink shadow-[0_0_30px_rgb(239_68_68/0.5)] ring-1 ring-white/20 transition-colors hover:bg-frost"
                      >
                        Tentar de novo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {status === "win" && (
                <div className="glass rounded-[18px] p-7 text-center">
                  <div className="font-display text-5xl tracking-tight text-green">
                    LIÇÃO COMPLETA
                  </div>
                  <p className="mt-3 text-sm text-frost-2">
                    {score}/{lesson.questions.length} acertos · +100 XP
                  </p>
                  <button
                    onClick={backToTrail}
                    className="mt-6 rounded-2xl bg-cyan px-8 py-4 font-display text-lg tracking-tight text-ink ring-1 ring-white/20 transition-colors hover:bg-frost"
                  >
                    Voltar à trilha
                  </button>
                </div>
              )}

              {status === "playing" && q && (
                <>
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
                    Quiz
                  </div>
                  <div
                    className={`glass rounded-[18px] p-5 sm:p-7 ${wrong ? "screen-shake ring-2 ring-blood" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Hearts lives={lives} />
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-cyan shadow-[0_0_16px_rgb(34_211_238/0.6)] transition-all duration-500"
                          style={{
                            width: `${((step + 1) / lesson.questions.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-mono text-xs text-frost-2">
                        {step + 1}/{lesson.questions.length}
                      </span>
                      {level === "dificil" && (
                        <span className={`font-mono text-xs ${time <= 5 ? "text-blood" : "text-amber"}`}>
                          {time}s
                        </span>
                      )}
                    </div>

                    <h2 className="mt-6 font-display text-3xl leading-[1.05] tracking-tight text-balance sm:text-4xl">
                      {q.prompt} {q.highlight && <span className="text-cyan">{q.highlight}</span>}
                    </h2>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-frost-2/70">
                      {lesson.title} · {LEVELS.find((x) => x.id === level)!.label}
                    </p>

                    <div className="mt-6 grid gap-3">
                      {q.options.map((opt, i) => {
                        const isCorrect = picked !== null && i === q.correct;
                        const isWrongPick = picked === i && i !== q.correct;
                        return (
                          <button
                            key={opt}
                            onClick={() => choose(i)}
                            disabled={picked !== null}
                            className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors ${
                              isCorrect
                                ? "animate-[snapIn_0.45s_var(--ease-snap)_both] bg-green/15 ring-2 ring-green"
                                : isWrongPick
                                  ? "bg-blood/15 ring-2 ring-blood"
                                  : "glass hover:border-cyan/60"
                            }`}
                          >
                            <span
                              className={`grid size-7 place-items-center rounded-lg font-mono text-xs ${
                                isCorrect
                                  ? "bg-green/20 text-green"
                                  : isWrongPick
                                    ? "bg-blood/20 text-blood"
                                    : "bg-white/5 text-frost-2"
                              }`}
                            >
                              {LETTERS[i]}
                            </span>
                            <span
                              className={`font-medium ${isCorrect ? "text-green" : isWrongPick ? "text-blood" : ""}`}
                            >
                              {opt}
                            </span>
                            {isCorrect && (
                              <span className="ml-auto font-mono text-xs text-green">✓</span>
                            )}
                            {isWrongPick && (
                              <span className="ml-auto font-mono text-xs text-blood">✕</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {picked !== null && (
                      <div
                        className={`mt-5 flex flex-wrap items-center gap-3 rounded-2xl px-5 py-4 ${
                          wrong
                            ? "bg-blood/10 ring-1 ring-blood/40"
                            : "bg-green/10 ring-1 ring-green/40"
                        }`}
                      >
                        <span
                          className={`font-display text-lg ${wrong ? "text-blood" : "text-green"}`}
                        >
                          {wrong ? "ERROU" : "CERTO"}
                        </span>
                        <span className="text-sm text-frost-2">{q.gabarito}</span>
                        {lives > 0 && (
                          <button
                            onClick={next}
                            className="ml-auto rounded-xl bg-cyan px-5 py-2.5 font-display tracking-tight text-ink transition-colors hover:bg-frost"
                          >
                            Continuar
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
