import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { DragFill } from "@/components/DragFill";
import { Feedback, ProgressBar } from "@/components/ui-game";
import { Leco, LecoSays } from "@/components/Leco";
import { ACHIEVEMENTS, useGame } from "@/lib/game";
import { QUIZ, type Question } from "@/lib/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — 15 questões de Coesão e Coerência" },
      { name: "description", content: "Quiz com 15 questões, 3 vidas, pontuação e XP sobre coesão e coerência textual." },
      { property: "og:title", content: "Quiz de Coesão e Coerência" },
      { property: "og:description", content: "Teste seus conhecimentos com 15 questões interativas." },
    ],
  }),
  component: Quiz,
});

function kidOptions(q: Question) {
  if (q.type === "click" || q.options.length <= 2) return q.options;
  const wrong = q.options.filter((o) => o !== q.correct).slice(0, 1);
  const set = [...wrong, q.correct];
  return q.options.filter((o) => set.includes(o));
}

function Quiz() {
  const { mode, addXp, confetti, finishQuiz, achievements } = useGame();
  const [run, setRun] = useState(0);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [lives, setLives] = useState(3);
  const [answer, setAnswer] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [startAch] = useState(() => achievements.length);

  const q = QUIZ[i]!;
  const opts = useMemo(() => (mode === "infantil" ? kidOptions(q) : q.options), [q, mode]);
  const ok = answer === q.correct;

  const restart = () => { setRun(run + 1); setI(0); setScore(0); setRight(0); setWrong(0); setLives(3); setAnswer(null); setFinished(false); };

  const respond = (v: string) => {
    if (answer) return;
    setAnswer(v);
    if (v === q.correct) { setScore((s) => s + 10); setRight((r) => r + 1); addXp(10, "Resposta correta!"); confetti(); }
    else { setWrong((w) => w + 1); setLives((l) => l - 1); }
  };
  const next = () => {
    if (i + 1 >= QUIZ.length) { setFinished(true); finishQuiz(score); confetti(); return; }
    setI(i + 1); setAnswer(null);
  };

  if (lives <= 0 && answer)
    return (
      <div className="mx-auto max-w-xl card-game p-8 text-center animate-pop">
        <Leco mood="confuso" size={150} className="mx-auto" />
        <h1 className="mt-2 text-3xl font-bold">Suas vidas acabaram!</h1>
        <p className="mt-2 text-lg font-semibold">Você pode tentar novamente.</p>
        <p className="mt-2 rounded-2xl bg-tangerine-soft p-3 text-left"><strong>Última questão:</strong> {q.explanation}</p>
        <button onClick={restart} className="btn-game mt-6 bg-tangerine text-ink">🔄 TENTAR NOVAMENTE</button>
      </div>
    );

  if (finished) {
    const pct = Math.round((right / QUIZ.length) * 100);
    const msg = pct >= 90 ? "Sensacional! Você domina coesão e coerência!" : pct >= 70 ? "Muito bem! Você está quase lá." : pct >= 50 ? "Bom trabalho! Revise o gabarito para melhorar." : "Não desista! Estude o conteúdo e tente de novo.";
    const newAch = achievements.slice(startAch);
    return (
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="rounded-[2rem] bg-grad-grape p-8 text-primary-foreground shadow-soft animate-pop">
          <Leco mood={pct >= 50 ? "comemorando" : "pensando"} size={150} className="mx-auto" />
          <h1 className="text-4xl font-bold">AVENTURA CONCLUÍDA</h1>
          <p className="mt-2 text-lg font-bold">{msg}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[["✔ Acertos", right, "bg-leaf-soft"], ["✖ Erros", wrong, "bg-tangerine-soft"], ["% Porcentagem", `${pct}%`, "bg-sky-soft"], ["🏆 Pontuação", score, "bg-sun-soft"], ["⭐ XP recebido", score + 50, "bg-sun-soft"], ["🏅 Novas conquistas", newAch.length, "bg-bubble-soft"]].map(([l, v, c]) => (
            <div key={l as string} className={`card-game ${c} p-4`}><p className="text-sm font-bold">{l}</p><p className="font-display text-3xl font-bold">{v}</p></div>
          ))}
        </div>
        {newAch.length > 0 && <p className="font-bold">Conquistas: {newAch.map((a) => `${ACHIEVEMENTS[a].emoji} ${ACHIEVEMENTS[a].title}`).join(" · ")}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={restart} className="btn-game bg-tangerine text-ink">🔄 JOGAR NOVAMENTE</button>
          <Link to="/aventura" className="btn-game bg-sky text-primary-foreground">🗺️ VOLTAR AO MAPA</Link>
          <Link to="/desafio" className="btn-game bg-grape text-primary-foreground">👑 DESAFIO FINAL</Link>
          <Link to="/gabarito" className="btn-game bg-card text-sky-deep">📋 Ver gabarito</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="card-game p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 font-display text-lg font-bold">
          <span>Questão {i + 1} de {QUIZ.length}</span>
          <span className="rounded-full bg-sun px-3 py-1 text-ink">Pontuação: {score}</span>
          <span className="flex gap-1" aria-label={`${lives} vidas restantes`}>
            {[0, 1, 2].map((n) => <Heart key={n} className={`h-7 w-7 transition ${n < lives ? "fill-bubble text-bubble-deep" : "text-muted-foreground opacity-40"}`} />)}
          </span>
        </div>
        <div className="mt-3"><ProgressBar value={Math.round((i / QUIZ.length) * 100)} label="Progresso" tone="sky" /></div>
      </div>

      <div key={`${run}-${i}`} className="card-game p-6 animate-fade-in">
        <span className="rounded-full bg-tangerine-soft px-3 py-1 text-sm font-bold text-tangerine-deep">{q.format}</span>
        <h1 className="mt-3 text-2xl font-bold">{mode === "infantil" && q.kidQ ? q.kidQ : q.q}</h1>
        {mode === "infantil" && !answer && <p className="mt-2 font-semibold text-sky-deep">💡 Dica do Leco: {q.hint}</p>}

        <div className="mt-5">
          {(q.type === "mc" || q.type === "tf") && (
            <div className={`grid gap-3 ${q.type === "tf" ? "grid-cols-2" : "sm:grid-cols-2"}`}>
              {opts.map((o) => (
                <button key={o} disabled={!!answer} onClick={() => respond(o)}
                  className={`btn-game border-2 text-left ${answer && o === q.correct ? "border-leaf bg-leaf-soft text-leaf-deep" : answer === o ? "border-tangerine bg-tangerine-soft text-tangerine-deep" : "border-border bg-card text-ink"}`}>
                  {answer && o === q.correct ? "✔ " : answer === o ? "✖ " : ""}{o}
                </button>
              ))}
            </div>
          )}
          {q.type === "drag" && (
            <div className="rounded-2xl bg-tangerine-soft p-5">
              <DragFill before={q.before!} after={q.after!} options={opts} correct={q.correct} disabled={!!answer} onAnswer={(v) => respond(v)} />
            </div>
          )}
          {q.type === "click" && (
            <p className="flex flex-wrap gap-2 rounded-2xl bg-sky-soft p-5 text-xl">
              {q.options.map((w, j) => (
                <button key={j} disabled={!!answer} onClick={() => respond(w)}
                  className={`rounded-lg border-2 px-2 py-1 font-semibold ${answer && w === q.correct ? "border-leaf bg-leaf-soft" : answer === w ? "border-tangerine bg-tangerine-soft" : "border-transparent bg-card hover:border-sky"}`}>
                  {w}
                </button>
              ))}
            </p>
          )}
        </div>

        {answer && (
          <>
            <Feedback ok={ok}>{q.explanation}{!ok && <> <br /><em>Resposta correta: {q.correct}</em></>}</Feedback>
            {mode === "estudante" && q.studentNote && <p className="mt-3 rounded-xl bg-grape-soft p-3 text-sm font-semibold text-grape-deep">📘 Dica de prova: {q.studentNote}</p>}
            <div className="mt-4"><LecoSays mood={ok ? "comemorando" : "confuso"} size={70}>{ok ? "Boa! Essas ideias fazem sentido juntas." : "Ops! Parece que essa ficou meio confusa. Vamos para a próxima!"}</LecoSays></div>
            <button onClick={next} className="btn-game mt-2 bg-sky text-primary-foreground">{i + 1 >= QUIZ.length ? "Ver resultado 🏁" : "Continuar →"}</button>
          </>
        )}
      </div>
    </div>
  );
}
