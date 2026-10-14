import { useState } from "react";
import { useGame } from "@/lib/game";
import { DragFill } from "./DragFill";
import { Feedback, ProgressBar } from "./ui-game";
import { LecoSays } from "./Leco";

type Round = { before: string; after: string; options: string[]; correct: string; hint: string; why: string };

const PONTE_STUDENT: Round[] = [
  { before: "Eu estudei bastante,", after: "consegui uma boa nota.", options: ["MAS", "PORQUE", "POR ISSO"], correct: "POR ISSO", hint: "Estudar bastante teve um RESULTADO. Qual conectivo mostra consequência?", why: "“Por isso” indica consequência: a boa nota foi resultado do estudo." },
  { before: "O time jogou bem,", after: "perdeu a partida.", options: ["MAS", "E", "PORTANTO"], correct: "MAS", hint: "Jogar bem e perder são ideias que se opõem.", why: "“Mas” liga ideias opostas: era esperado ganhar, mas perdeu." },
  { before: "Fiquei em casa", after: "estava doente.", options: ["POR ISSO", "PORQUE", "MAS"], correct: "PORQUE", hint: "A segunda parte explica o MOTIVO de ficar em casa.", why: "“Porque” introduz a causa: estar doente é o motivo." },
  { before: "Todos os testes foram aprovados;", after: ", o produto pode ser lançado.", options: ["PORTANTO", "MAS", "PORQUE"], correct: "PORTANTO", hint: "A segunda parte é uma CONCLUSÃO tirada da primeira.", why: "“Portanto” introduz uma conclusão lógica." },
];
const PONTE_KID: Round[] = [
  PONTE_STUDENT[0]!,
  { before: "Eu gosto de bolo", after: "de sorvete.", options: ["E", "MAS", "PORQUE"], correct: "E", hint: "Estamos juntando mais uma coisa que eu gosto!", why: "“E” soma ideias: bolo E sorvete." },
  { before: "Eu queria brincar,", after: "estava chovendo.", options: ["E", "MAS", "PORTANTO"], correct: "MAS", hint: "Queria brincar... só que algo atrapalhou!", why: "“Mas” mostra uma ideia contrária." },
];

export function ConstruaPonte({ onComplete }: { onComplete?: () => void }) {
  const { mode, addXp, confetti } = useGame();
  const rounds = mode === "infantil" ? PONTE_KID : PONTE_STUDENT;
  const [i, setI] = useState(0);
  const [res, setRes] = useState<null | boolean>(null);
  const [k, setK] = useState(0);
  const [done, setDone] = useState(false);
  const r = rounds[i]!;

  if (done)
    return <LecoSays mood="comemorando">Ponte construída! Você ligou todas as ideias. 🌉</LecoSays>;

  return (
    <div>
      <ProgressBar value={Math.round((i / rounds.length) * 100)} label={`Ponte ${i + 1} de ${rounds.length}`} tone="sun" />
      <div className="relative mt-6 rounded-2xl bg-tangerine-soft p-5">
        <DragFill key={`${i}-${k}`} before={r.before} after={r.after} options={r.options} correct={r.correct} disabled={res === true}
          onAnswer={(_, ok) => { setRes(ok); if (ok) { addXp(10, "Conectivo certo!"); confetti(); } }} />
      </div>
      {res === true && <Feedback ok>{r.why}</Feedback>}
      {res === false && <Feedback ok={false}>Dica: {r.hint}</Feedback>}
      <div className="mt-4 flex gap-3">
        {res === false && <button className="btn-game bg-sky text-primary-foreground" onClick={() => { setRes(null); setK(k + 1); }}>Tentar de novo</button>}
        {res === true && (
          <button className="btn-game bg-leaf text-ink" onClick={() => {
            if (i + 1 < rounds.length) { setI(i + 1); setRes(null); } else { setDone(true); onComplete?.(); }
          }}>{i + 1 < rounds.length ? "Próxima ponte →" : "Concluir"}</button>
        )}
      </div>
    </div>
  );
}

type PronRound = { text: string; pron: string; options: string[]; correct: string; hint: string; why: string };
const PRON_STUDENT: PronRound[] = [
  { text: "Lucas encontrou seu cachorro. Ele estava muito feliz.", pron: "Ele", options: ["Lucas", "O cachorro", "Os dois"], correct: "Lucas", hint: "Quem fez a ação principal da primeira frase? O pronome costuma retomar o sujeito.", why: "“Ele” retoma o sujeito “Lucas”. (Em textos reais, essa frase pode ser ambígua — por isso vale cuidado ao escrever!)" },
  { text: "A professora elogiou os alunos e os parabenizou pela apresentação.", pron: "os", options: ["A professora", "os alunos", "a apresentação"], correct: "os alunos", hint: "“os” é masculino e plural.", why: "“os” (parabenizou-os) retoma “os alunos”: masculino plural." },
  { text: "Ana e Júlia viajaram ao Rio. Lá, elas visitaram o Cristo Redentor.", pron: "Lá", options: ["Ana e Júlia", "o Rio", "o Cristo Redentor"], correct: "o Rio", hint: "“Lá” indica um lugar.", why: "“Lá” é um advérbio que retoma o lugar já citado: o Rio." },
  { text: "O livro que comprei é ótimo. Recomendo-o a todos.", pron: "o", options: ["O livro", "todos", "eu"], correct: "O livro", hint: "O que eu recomendo?", why: "“o” em “recomendo-o” retoma “o livro”." },
];
const PRON_KID: PronRound[] = [
  PRON_STUDENT[0]!,
  { text: "A gata subiu no telhado. Ela miou bem alto.", pron: "Ela", options: ["A gata", "O telhado"], correct: "A gata", hint: "Quem consegue miar?", why: "“Ela” é a gata — telhado não mia! 🐱" },
  { text: "Pedro ganhou uma bola. Ele chutou a bola longe.", pron: "Ele", options: ["Pedro", "A bola"], correct: "Pedro", hint: "Quem chutou?", why: "“Ele” é o Pedro." },
];

export function DetetivePronomes({ onComplete }: { onComplete?: () => void }) {
  const { mode, addXp, confetti } = useGame();
  const rounds = mode === "infantil" ? PRON_KID : PRON_STUDENT;
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const r = rounds[i]!;
  const ok = pick === r?.correct;
  if (done) return <LecoSays mood="comemorando">Caso resolvido, detetive! 🔍 Você encontrou todas as retomadas.</LecoSays>;

  const parts = r.text.split(new RegExp(`(\\b${r.pron}\\b)`));
  let marked = false;
  return (
    <div>
      <ProgressBar value={Math.round((i / rounds.length) * 100)} label={`Caso ${i + 1} de ${rounds.length}`} tone="sky" />
      <p className="mt-6 rounded-2xl bg-sky-soft p-5 text-xl font-semibold md:text-2xl">
        {parts.map((p, j) => {
          if (p === r.pron && !marked) { marked = true; return <mark key={j} className="rounded-lg bg-sun px-2 font-bold text-ink">{p}</mark>; }
          return <span key={j}>{p}</span>;
        })}
      </p>
      <p className="mt-4 font-display text-xl font-semibold">🔎 A quem “{r.pron}” se refere?</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {r.options.map((o) => (
          <button key={o} disabled={ok} onClick={() => { setPick(o); if (o === r.correct) { addXp(10, "Pista encontrada!"); confetti(); } }}
            className={`btn-game border-2 ${pick === o ? (ok ? "border-leaf bg-leaf-soft text-leaf-deep" : "border-tangerine bg-tangerine-soft text-tangerine-deep") : "border-border bg-card text-ink"}`}>
            {pick === o && (ok ? "✔ " : "✖ ")}{o}
          </button>
        ))}
      </div>
      {pick && <Feedback ok={ok}>{ok ? r.why : `Dica: ${r.hint}`}</Feedback>}
      {ok && <button className="btn-game mt-4 bg-leaf text-ink" onClick={() => { if (i + 1 < rounds.length) { setI(i + 1); setPick(null); } else { setDone(true); onComplete?.(); } }}>{i + 1 < rounds.length ? "Próximo caso →" : "Concluir"}</button>}
    </div>
  );
}

type Level = { name: string; options: string[]; wrong: number; why: string };
const CACA_STUDENT: Level[] = [
  { name: "Nível 1 — Fácil", options: ["Estava com fome, então fiz um sanduíche.", "Estava com sono, então tomei um copo de areia.", "Choveu, por isso a rua ficou molhada."], wrong: 1, why: "Ninguém toma “copo de areia” para resolver o sono — a ideia não faz sentido." },
  { name: "Nível 2 — Médio", options: ["Marina é vegetariana; por isso, pediu uma salada.", "Carlos é alérgico a leite; portanto, tomou um milk-shake para se sentir melhor.", "O museu estava fechado, mas voltamos no dia seguinte."], wrong: 1, why: "Alguém alérgico a leite não tomaria milk-shake para melhorar — a conclusão contradiz a premissa." },
  { name: "Nível 3 — Difícil", options: ["Nasci em 2008 e, hoje, aos 16 anos, estou no Ensino Médio.", "O deserto do Saara, um dos lugares mais secos do mundo, é famoso por suas chuvas constantes durante o ano todo.", "Apesar do frio, os atletas mantiveram o treino ao ar livre."], wrong: 1, why: "Contradição com o conhecimento de mundo: o Saara é seco, não tem chuvas constantes." },
];
const CACA_KID: Level[] = [
  { name: "Nível 1", options: ["Estava chovendo, então peguei o guarda-chuva.", "Estava chovendo, então coloquei óculos de sol para não me molhar."], wrong: 1, why: "Óculos de sol não protegem da chuva! ☔" },
  { name: "Nível 2", options: ["O peixe nada no mar.", "O peixe voou até a árvore e fez um ninho."], wrong: 1, why: "Peixe não voa nem faz ninho. 🐟" },
  { name: "Nível 3", options: ["Fiquei com frio e vesti um casaco.", "Fiquei com frio e tirei o casaco para me esquentar."], wrong: 1, why: "Tirar o casaco deixa a gente com mais frio, não esquenta! 🧥" },
];

export function CacaFrase({ onComplete }: { onComplete?: () => void }) {
  const { mode, addXp, confetti } = useGame();
  const levels = mode === "infantil" ? CACA_KID : CACA_STUDENT;
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const l = levels[i]!;
  const ok = pick === l?.wrong;
  if (done) return <LecoSays mood="comemorando">Você caçou todas as frases estranhas! 🛡️</LecoSays>;
  return (
    <div>
      <ProgressBar value={Math.round((i / levels.length) * 100)} label={l.name} tone="grape" />
      <p className="mt-5 font-display text-xl font-semibold">🕵️ Qual frase NÃO faz sentido?</p>
      <div className="mt-3 grid gap-3">
        {l.options.map((o, j) => (
          <button key={j} disabled={ok} onClick={() => { setPick(j); if (j === l.wrong) { addXp(10, "Frase estranha encontrada!"); confetti(); } }}
            className={`rounded-2xl border-2 p-4 text-left text-lg font-semibold transition ${pick === j ? (ok ? "border-leaf bg-leaf-soft" : "border-tangerine bg-tangerine-soft animate-wiggle") : "border-border bg-card hover:border-grape"}`}>
            {pick === j && (ok ? "✔ " : "✖ ")}{o}
          </button>
        ))}
      </div>
      {pick !== null && <Feedback ok={ok}>{ok ? l.why : "Essa frase faz sentido. Procure uma ideia que contradiz o que sabemos sobre o mundo."}</Feedback>}
      {ok && <button className="btn-game mt-4 bg-leaf text-ink" onClick={() => { if (i + 1 < levels.length) { setI(i + 1); setPick(null); } else { setDone(true); onComplete?.(); } }}>{i + 1 < levels.length ? "Próximo nível →" : "Concluir"}</button>}
    </div>
  );
}

/** Phase 1 simple activity + phase 5 mixed */
export function MiniChoice({ items, onComplete }: { items: { q: string; options: string[]; correct: number; why: string; hint: string }[]; onComplete?: () => void }) {
  const { addXp, confetti } = useGame();
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const it = items[i]!;
  const ok = pick === it?.correct;
  if (done) return <LecoSays mood="comemorando">Atividade concluída! Mandou bem! 🎉</LecoSays>;
  return (
    <div>
      <ProgressBar value={Math.round((i / items.length) * 100)} label={`Pergunta ${i + 1} de ${items.length}`} tone="leaf" />
      <p className="mt-5 text-xl font-semibold">{it.q}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {it.options.map((o, j) => (
          <button key={j} disabled={ok} onClick={() => { setPick(j); if (j === it.correct) { addXp(10); confetti(); } }}
            className={`btn-game border-2 text-left ${pick === j ? (ok ? "border-leaf bg-leaf-soft text-leaf-deep" : "border-tangerine bg-tangerine-soft text-tangerine-deep") : "border-border bg-card text-ink"}`}>
            {pick === j && (ok ? "✔ " : "✖ ")}{o}
          </button>
        ))}
      </div>
      {pick !== null && <Feedback ok={ok}>{ok ? it.why : `Dica: ${it.hint}`}</Feedback>}
      {ok && <button className="btn-game mt-4 bg-leaf text-ink" onClick={() => { if (i + 1 < items.length) { setI(i + 1); setPick(null); } else { setDone(true); onComplete?.(); } }}>{i + 1 < items.length ? "Próxima →" : "Concluir"}</button>}
    </div>
  );
}
