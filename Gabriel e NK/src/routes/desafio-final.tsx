import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, RotateCcw } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { FeedbackCard } from "@/components/FeedbackCard";
import { questoes, type QuestaoFinal } from "@/data/questoes";
import { useProgresso, XP } from "@/lib/progresso";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/desafio-final")({
  head: () => ({
    meta: [
      { title: "Desafio final — Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Encontre os três erros de concordância em um pequeno texto, veja a versão corrigida e entenda cada alteração. Vale 500 XP.",
      },
      { property: "og:title", content: "👑 Desafio final" },
      {
        property: "og:description",
        content: "Um texto, três erros escondidos e a explicação de cada correção.",
      },
    ],
  }),
  component: DesafioFinal,
});

const questaoFinal = questoes.find((q) => q.tipo === "final") as QuestaoFinal;

function DesafioFinal() {
  const [marcadas, setMarcadas] = useState<number[]>([]);
  const [resultado, setResultado] = useState<boolean | null>(null);
  const { registrarResposta } = useProgresso();

  const alvo = questaoFinal.indicesErro.length;

  function corrigir() {
    const acertou =
      marcadas.length === alvo && questaoFinal.indicesErro.every((i) => marcadas.includes(i));
    setResultado(acertou);
    registrarResposta({
      id: "boss-final",
      area: "especiais",
      correta: acertou,
      resposta: marcadas.map((i) => questaoFinal.palavras[i]).join(", "),
      xp: XP.desafioFinal,
    });
  }

  const acertosParciais = marcadas.filter((i) => questaoFinal.indicesErro.includes(i)).length;

  return (
    <PageShell
      etiqueta="Desafio final"
      titulo="👑 Desafio final"
      descricao="O boss da plataforma: um texto curto com três erros de concordância. Encontre todos, confira a versão corrigida e entenda o motivo de cada mudança."
      acoes={
        <Link
          to="/desafio"
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Voltar ao desafio completo
        </Link>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="surface-card p-5 sm:p-7">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-warning">
            <Crown className="size-4" aria-hidden />
            Vale {XP.desafioFinal} XP
          </p>
          <h2 className="mt-3 font-display text-xl font-bold sm:text-2xl">
            Clique nas {alvo} palavras que estão fora de lugar
          </h2>

          <div className="mt-5 flex flex-wrap gap-1.5 rounded-xl border border-border bg-secondary/30 p-4 text-lg leading-loose">
            {questaoFinal.palavras.map((palavra, i) => {
              const marcada = marcadas.includes(i);
              const errada = questaoFinal.indicesErro.includes(i);
              return (
                <button
                  key={`${palavra}-${i}`}
                  type="button"
                  disabled={resultado !== null}
                  onClick={() =>
                    setMarcadas((atual) =>
                      atual.includes(i) ? atual.filter((x) => x !== i) : [...atual, i].slice(-alvo),
                    )
                  }
                  className={cn(
                    "rounded-lg px-2 py-1 font-display transition-all",
                    marcada ? "bg-accent/20 ring-2 ring-accent" : "hover:bg-card",
                    resultado !== null && errada && "bg-success/20 ring-2 ring-success",
                    resultado !== null && marcada && !errada && "bg-destructive/20 ring-2 ring-destructive",
                  )}
                >
                  {palavra}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Selecionadas: {marcadas.length} de {alvo}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={corrigir}
              disabled={marcadas.length !== alvo || resultado !== null}
              className="brand-gradient rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-40"
            >
              Corrigir o texto
            </button>
            {resultado !== null ? (
              <button
                type="button"
                onClick={() => {
                  setMarcadas([]);
                  setResultado(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                <RotateCcw className="size-4" aria-hidden />
                Tentar novamente
              </button>
            ) : null}
          </div>

          {resultado !== null ? (
            <div className="mt-5 grid gap-4">
              <FeedbackCard
                correta={resultado}
                titulo={resultado ? "🟢 Boss derrotado!" : `🔴 Você encontrou ${acertosParciais} de ${alvo}`}
                explicacao={
                  resultado
                    ? "Você identificou os três desvios de concordância do texto."
                    : "As palavras destacadas em verde são os erros reais. Compare com suas escolhas e veja a explicação de cada uma."
                }
                extra={resultado ? `+${XP.desafioFinal} XP` : undefined}
              />
              <div className="rounded-xl border border-success/40 bg-success/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-success">Versão corrigida</p>
                <p className="mt-2 font-display text-base">{questaoFinal.versaoCorrigida}</p>
              </div>
              <ul className="grid gap-3">
                {questaoFinal.detalhes.map((d) => (
                  <li key={d.de} className="rounded-xl border border-border bg-card p-4">
                    <p className="font-display text-base">
                      <span className="font-bold text-destructive line-through">{d.de}</span>
                      <span className="mx-2 text-muted-foreground">→</span>
                      <span className="font-bold text-success">{d.para}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{d.motivo}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="surface-card p-5">
          <h2 className="font-display text-base font-bold">Texto original</h2>
          <p className="mt-2 text-sm italic text-muted-foreground">
            “Os estudantes chegou cedo para a atividade. A maioria dos alunos estavam preparados.
            Haviam muitas tarefas para realizar.”
          </p>
          <h3 className="mt-5 font-display text-sm font-bold">Onde olhar primeiro</h3>
          <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
            <li>1. Ache o sujeito de cada verbo.</li>
            <li>2. Confira o número: singular ou plural?</li>
            <li>3. Desconfie de “haver” e de expressões partitivas.</li>
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
