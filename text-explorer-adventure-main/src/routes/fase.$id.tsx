import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/ui-game";
import { LESSONS } from "@/components/lessons";
import { ConstruaPonte, DetetivePronomes, CacaFrase, MiniChoice } from "@/components/games";
import { useGame } from "@/lib/game";
import { PHASES } from "@/lib/phases";

export const Route = createFileRoute("/fase/$id")({
  loader: ({ params }) => {
    const p = PHASES.find((x) => String(x.id) === params.id);
    if (!p) throw notFound();
    return { phase: p };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `Fase ${loaderData.phase.id}: ${loaderData.phase.title} — Português em Jogo` : "Fase não encontrada";
    const desc = loaderData ? `${loaderData.phase.short} Explicação, exemplos e atividade interativa.` : "Fase inexistente.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] };
  },
  component: Fase,
});

const P1_STUDENT = [
  { q: "Em “Ana acordou cedo. Por isso, chegou a tempo.”, qual expressão liga as frases?", options: ["Ana", "acordou", "Por isso", "a tempo"], correct: 2, why: "“Por isso” conecta as ideias, mostrando consequência.", hint: "Procure a expressão que fica entre as duas ideias." },
  { q: "Coesão é…", options: ["o sentido geral do texto", "a ligação entre as partes do texto", "o título do texto", "a quantidade de parágrafos"], correct: 1, why: "Coesão = conexão entre as partes.", hint: "Lembre da corrente!" },
];
const P1_KID = [
  { q: "Qual palavra liga as frases? “Fiquei com fome. Por isso, comi uma maçã.”", options: ["maçã", "Por isso"], correct: 1, why: "“Por isso” é a pontezinha entre as frases!", hint: "É a palavra do meio, que junta as ideias." },
];
const P5 = [
  { q: "“Choveu muito, mas as ruas ficaram alagadas.” Qual é o problema?", options: ["Coesão: o conectivo “mas” está errado", "Coerência: chuva não alaga ruas", "Não há problema"], correct: 0, why: "Não há oposição: o conectivo correto seria “por isso”. É um problema de coesão.", hint: "As ideias fazem sentido; olhe para a palavra que liga." },
  { q: "“O João comprou um carro. O João lavou o carro. O João adora o carro.” Qual é o problema?", options: ["Coerência", "Coesão: repetição excessiva", "Nenhum"], correct: 1, why: "Repetir “O João” e “o carro” deixa o texto cansativo. Use “Ele” e “o”: “Ele o lavou”.", hint: "O texto faz sentido, mas soa repetitivo." },
  { q: "“Ganhei na loteria e fiquei sem dinheiro para comprar pão, por isso fiquei rico.” Qual é o problema?", options: ["Coerência: há contradição", "Coesão: faltam pronomes", "Nenhum"], correct: 0, why: "Ficar sem dinheiro e “por isso ficar rico” é contraditório — problema de coerência.", hint: "As ideias se contradizem?" },
];

function Fase() {
  const { phase } = Route.useLoaderData();
  const { isUnlocked, phases, completePhase, mode } = useGame();
  const Lesson = LESSONS[phase.id - 1]!;
  const done = phases.includes(phase.id);
  const unlocked = isUnlocked(phase.id);
  const onComplete = () => completePhase(phase.id);
  const tone = (["sky", "tangerine", "leaf", "grape", "sun"] as const)[phase.id - 1]!;

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={`Fase ${phase.id} ${done ? "· Concluída ✔" : ""}`} title={`${phase.emoji} ${phase.title}`} tone={tone}>{phase.short}</PageHeader>
      {!unlocked && (
        <div className="rounded-2xl border-2 border-dashed border-grape bg-grape-soft p-4 font-semibold text-grape-deep">
          🔒 Esta fase ainda está bloqueada no mapa. Você pode estudar e jogar normalmente — mas conclua a fase {phase.id - 1} para seguir a trilha em ordem.
        </div>
      )}
      <Section><Lesson /></Section>
      <Section className="border-tangerine">
        <h2 className="mb-4 text-2xl font-bold text-tangerine-deep">🎯 Atividade da fase</h2>
        {phase.id === 1 && <MiniChoice items={mode === "infantil" ? P1_KID : P1_STUDENT} onComplete={onComplete} />}
        {phase.id === 2 && <><h3 className="mb-3 text-xl font-bold">Jogo: Construa a Ponte</h3><ConstruaPonte onComplete={onComplete} /></>}
        {phase.id === 3 && <><h3 className="mb-3 text-xl font-bold">Jogo: Detetive dos Pronomes</h3><DetetivePronomes onComplete={onComplete} /></>}
        {phase.id === 4 && <><h3 className="mb-3 text-xl font-bold">Jogo: Caça à Frase Estranha</h3><CacaFrase onComplete={onComplete} /></>}
        {phase.id === 5 && <MiniChoice items={mode === "infantil" ? P5.slice(0, 2) : P5} onComplete={onComplete} />}
      </Section>
      <div className="flex flex-wrap justify-between gap-3">
        <Link to="/aventura" className="btn-game bg-card text-sky-deep">← Voltar ao mapa</Link>
        {phase.id < 5 ? (
          <Link to="/fase/$id" params={{ id: String(phase.id + 1) }} className="btn-game bg-sky text-primary-foreground">Próxima fase →</Link>
        ) : (
          <Link to="/desafio" className="btn-game bg-grape text-primary-foreground">Desafio Final 👑</Link>
        )}
      </div>
    </div>
  );
}
