import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import { PageHeader, Section, Feedback, ProgressBar } from "@/components/ui-game";
import { DragFill } from "@/components/DragFill";
import { Leco, LecoSays } from "@/components/Leco";
import { useGame } from "@/lib/game";

export const Route = createFileRoute("/desafio")({
  head: () => ({
    meta: [
      { title: "Desafio Final — Mestre dos Textos" },
      { name: "description", content: "Organize frases, escolha conectivos, identifique pronomes e corrija a coerência para virar Mestre dos Textos." },
      { property: "og:title", content: "Desafio Final — Mestre dos Textos" },
      { property: "og:description", content: "O grande desafio da aventura de coesão e coerência." },
    ],
  }),
  component: Desafio,
});

const ORDER = ["Ana acordou atrasada.", "Ela correu até o ponto de ônibus.", "Mas o ônibus já tinha passado.", "Por isso, chegou tarde à escola."];
const SHUFFLED = [2, 0, 3, 1];

function Desafio() {
  const { mode, finishFinal, confetti, addXp, phases, finalDone } = useGame();
  const kid = mode === "infantil";
  const [step, setStep] = useState(0);
  const [won, setWon] = useState(false);
  const steps = ["Organizar", "Conectivos", "Pronomes", "Coerência"];

  const advance = () => {
    addXp(10, `Etapa “${steps[step]}” concluída`);
    if (step + 1 < steps.length) setStep(step + 1);
    else { setWon(true); finishFinal(); }
  };

  useEffect(() => {
    if (!won) return;
    confetti();
    const t1 = setTimeout(confetti, 900);
    const t2 = setTimeout(confetti, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [won, confetti]);

  if (won)
    return (
      <div className="mx-auto max-w-2xl rounded-[2rem] bg-grad-grape p-8 text-center text-primary-foreground shadow-soft animate-pop md:p-12">
        <p className="text-6xl">👑🏆✨</p>
        <Leco mood="comemorando" size={200} className="mx-auto animate-float" />
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">Parabéns!</h1>
        <p className="mt-3 text-xl font-bold">Você completou a aventura e se tornou um Mestre dos Textos.</p>
        <p className="mt-2 font-semibold">{finalDone ? "+100 XP pela conquista final!" : ""}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/conquistas" className="btn-game bg-sun text-ink">🏅 Ver conquistas</Link>
          <button onClick={() => { setWon(false); setStep(0); }} className="btn-game bg-card text-grape-deep">🔄 Jogar de novo</button>
          <Link to="/aventura" className="btn-game bg-sky text-primary-foreground">🗺️ Mapa</Link>
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Fase Final" title="DESAFIO FINAL — MESTRE DOS TEXTOS" tone="grape">Um texto ficou todo bagunçado. Conserte-o em 4 etapas!</PageHeader>
      {!phases.includes(5) && <p className="rounded-2xl border-2 border-dashed border-grape bg-grape-soft p-3 font-semibold text-grape-deep">🔒 Dica: no mapa, o desafio desbloqueia após a Fase 5 — mas você já pode tentar!</p>}
      <div className="card-game p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {steps.map((s, j) => (
            <span key={s} className={`rounded-full px-3 py-1 text-sm font-bold ${j < step ? "bg-leaf text-ink" : j === step ? "bg-grape text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{j < step ? "✔" : j + 1}. {s}</span>
          ))}
        </div>
        <ProgressBar value={Math.round((step / steps.length) * 100)} tone="grape" />
      </div>
      <Section key={step}>
        {step === 0 && <OrderStep kid={kid} onDone={advance} />}
        {step === 1 && <ConnStep kid={kid} onDone={advance} />}
        {step === 2 && <PronStep onDone={advance} />}
        {step === 3 && <CohStep onDone={advance} />}
      </Section>
    </div>
  );
}

function OrderStep({ kid, onDone }: { kid: boolean; onDone: () => void }) {
  const target = kid ? ORDER.slice(0, 3) : ORDER;
  const [items, setItems] = useState<string[]>(() => (kid ? [ORDER[2]!, ORDER[0]!, ORDER[1]!] : SHUFFLED.map((n) => ORDER[n]!)));
  const [drag, setDrag] = useState<number | null>(null);
  const [checked, setChecked] = useState<null | boolean>(null);
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const a = [...items]; const [x] = a.splice(from, 1); a.splice(to, 0, x!); setItems(a); setChecked(null);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-grape-deep">1. Organize as frases</h2>
      <p className="mb-4 text-muted-foreground">Arraste as frases (ou use as setas) para colocá-las na ordem que faz sentido.</p>
      <ol className="space-y-2">
        {items.map((s, j) => (
          <li key={s} draggable onDragStart={() => setDrag(j)} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag !== null) move(drag, j); setDrag(null); }}
            className={`flex items-center gap-2 rounded-2xl border-2 bg-card p-3 text-lg font-semibold shadow-soft ${checked === true ? "border-leaf" : "border-border"} cursor-grab`}>
            <GripVertical className="shrink-0 text-muted-foreground" aria-hidden />
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-grape-soft font-display text-grape-deep">{j + 1}</span>
            <span className="flex-1">{s}</span>
            <button aria-label="Mover para cima" onClick={() => move(j, j - 1)} className="rounded-lg bg-muted p-2"><ArrowUp className="h-5 w-5" /></button>
            <button aria-label="Mover para baixo" onClick={() => move(j, j + 1)} className="rounded-lg bg-muted p-2"><ArrowDown className="h-5 w-5" /></button>
          </li>
        ))}
      </ol>
      {checked !== null && <Feedback ok={checked}>{checked ? "A sequência tem começo, meio e fim!" : "Dica: comece por quem acordou. “Ela” só aparece depois de sabermos quem é Ana, e “Por isso” vem no fim, como consequência."}</Feedback>}
      <div className="mt-4 flex gap-3">
        {checked !== true ? (
          <button className="btn-game bg-grape text-primary-foreground" onClick={() => setChecked(items.every((s, j) => s === target[j]))}>Verificar ordem</button>
        ) : (
          <button className="btn-game bg-leaf text-ink" onClick={onDone}>Próxima etapa →</button>
        )}
      </div>
    </div>
  );
}

function ConnStep({ kid, onDone }: { kid: boolean; onDone: () => void }) {
  const items = [
    { before: "Ana ficou triste", after: "perdeu a primeira aula.", options: ["PORQUE", "MAS", "E"], correct: "PORQUE", hint: "A segunda parte explica o motivo da tristeza." },
    { before: "Ela aprendeu a lição;", after: ", agora coloca o despertador mais cedo.", options: ["PORTANTO", "PORQUE", "MAS"], correct: "PORTANTO", hint: "É uma conclusão do que aconteceu." },
  ].slice(0, kid ? 1 : 2);
  const [res, setRes] = useState<(boolean | null)[]>(items.map(() => null));
  const [keys, setKeys] = useState(items.map(() => 0));
  const all = res.every((r) => r === true);
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-grape-deep">2. Escolha os conectivos</h2>
      {items.map((it, j) => (
        <div key={j} className="rounded-2xl bg-tangerine-soft p-4">
          <DragFill key={keys[j]} {...it} disabled={res[j] === true} onAnswer={(_, ok) => setRes(res.map((r, x) => (x === j ? ok : r)))} />
          {res[j] === false && (
            <div><Feedback ok={false}>Dica: {it.hint}</Feedback>
              <button className="btn-game mt-2 bg-sky text-primary-foreground" onClick={() => { setKeys(keys.map((k, x) => (x === j ? k + 1 : k))); setRes(res.map((r, x) => (x === j ? null : r))); }}>Tentar de novo</button></div>
          )}
          {res[j] === true && <Feedback ok>Conectivo perfeito!</Feedback>}
        </div>
      ))}
      {all && <button className="btn-game bg-leaf text-ink" onClick={onDone}>Próxima etapa →</button>}
    </div>
  );
}

function PronStep({ onDone }: { onDone: () => void }) {
  const [pick, setPick] = useState<string | null>(null);
  const ok = pick === "Ana";
  return (
    <div>
      <h2 className="text-2xl font-bold text-grape-deep">3. Identifique o pronome</h2>
      <p className="mt-3 rounded-2xl bg-sky-soft p-4 text-xl font-semibold">Ana acordou atrasada. <mark className="rounded bg-sun px-1">Ela</mark> correu até o ponto de ônibus.</p>
      <p className="mt-3 font-bold">A quem “Ela” se refere?</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        {["Ana", "A escola", "A aula"].map((o) => (
          <button key={o} disabled={ok} onClick={() => setPick(o)} className={`btn-game border-2 ${pick === o ? (ok ? "border-leaf bg-leaf-soft" : "border-tangerine bg-tangerine-soft") : "border-border bg-card"} text-ink`}>{pick === o && (ok ? "✔ " : "✖ ")}{o}</button>
        ))}
      </div>
      {pick && <Feedback ok={ok}>{ok ? "“Ela” retoma “Ana”, evitando repetir o nome." : "Dica: quem acordou atrasada e depois correu?"}</Feedback>}
      {ok && <button className="btn-game mt-4 bg-leaf text-ink" onClick={onDone}>Próxima etapa →</button>}
    </div>
  );
}

function CohStep({ onDone }: { onDone: () => void }) {
  const [res, setRes] = useState<boolean | null>(null);
  const [k, setK] = useState(0);
  return (
    <div>
      <h2 className="text-2xl font-bold text-grape-deep">4. Corrija a coerência</h2>
      <p className="mt-2 rounded-2xl border-2 border-dashed border-tangerine bg-card p-4 text-lg">
        Texto original: “Como estava com muito frio, para se esquentar, Ana <s className="decoration-destructive decoration-2">tomou um banho gelado</s>.”
      </p>
      <LecoSays mood="confuso" size={70}>Banho gelado não esquenta ninguém! Troque pela opção que faz sentido.</LecoSays>
      <div className="mt-2 rounded-2xl bg-tangerine-soft p-4">
        <DragFill key={k} before="Como estava com muito frio, para se esquentar, Ana" after="." options={["tomou um sorvete", "tomou um chocolate quente", "abriu a janela"]} correct="tomou um chocolate quente" disabled={res === true} onAnswer={(_, ok) => setRes(ok)} />
      </div>
      {res === false && <><Feedback ok={false}>Dica: o que ajuda a esquentar o corpo?</Feedback><button className="btn-game mt-2 bg-sky text-primary-foreground" onClick={() => { setRes(null); setK(k + 1); }}>Tentar de novo</button></>}
      {res === true && <><Feedback ok>Agora o texto faz sentido do começo ao fim!</Feedback><button className="btn-game mt-4 bg-grape text-primary-foreground" onClick={onDone}>Concluir desafio 👑</button></>}
    </div>
  );
}
