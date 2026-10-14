import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-game";
import { QUIZ } from "@/lib/quiz";

export const Route = createFileRoute("/gabarito")({
  head: () => ({
    meta: [
      { title: "Gabarito Explicativo — Quiz de Coesão e Coerência" },
      { name: "description", content: "Respostas corretas e explicações das 15 questões do quiz e do desafio final." },
      { property: "og:title", content: "Gabarito Explicativo" },
      { property: "og:description", content: "Todas as respostas do quiz com explicações claras." },
    ],
  }),
  component: Gabarito,
});

function Gabarito() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Revisão" title="Gabarito Explicativo">Todas as 15 questões do quiz com a resposta correta e o porquê.</PageHeader>
      <ol className="space-y-4">
        {QUIZ.map((q, i) => (
          <li key={i} className="card-game p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky font-display text-lg font-bold text-primary-foreground">{i + 1}</span>
              <div>
                <p className="text-sm font-bold uppercase text-tangerine-deep">{q.format}</p>
                <p className="font-bold"><span className="text-muted-foreground">Pergunta:</span> {q.type === "drag" ? `${q.before} ______ ${q.after}` : q.type === "click" ? `${q.q} “${q.options.join(" ")}”` : q.q}</p>
                <p className="mt-1 rounded-lg bg-leaf-soft px-2 py-1 font-bold text-leaf-deep">✔ Resposta: {q.correct}</p>
                <p className="mt-1"><span className="font-bold">Explicação:</span> {q.explanation}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <section className="card-game border-grape p-5">
        <h2 className="text-2xl font-bold text-grape-deep">👑 Desafio Final — respostas</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li><strong>Ordem:</strong> Ana acordou atrasada → Ela correu até o ponto → Mas o ônibus já tinha passado → Por isso, chegou tarde à escola.</li>
          <li><strong>Conectivos:</strong> “porque” (causa) e “portanto” (conclusão).</li>
          <li><strong>Pronome:</strong> “Ela” retoma “Ana”.</li>
          <li><strong>Coerência:</strong> a frase “para se esquentar, tomou um banho gelado” é incoerente; a correção é “tomou um chocolate quente”.</li>
        </ul>
      </section>
      <Link to="/quiz" className="btn-game bg-sky text-primary-foreground">Fazer o quiz</Link>
    </div>
  );
}
