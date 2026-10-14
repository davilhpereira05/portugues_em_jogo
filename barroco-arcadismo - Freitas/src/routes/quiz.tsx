import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { quizQuestoes } from "@/data/content";
import { useProgresso } from "@/lib/progresso";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — Barroco ou Arcadismo?" },
      {
        name: "description",
        content: "10 perguntas para testar se você identifica Barroco e Arcadismo.",
      },
      { property: "og:title", content: "Quiz — Barroco ou Arcadismo?" },
      {
        property: "og:description",
        content: "10 perguntas com explicação e pontuação para revisar os dois movimentos.",
      },
    ],
  }),
  component: Quiz,
});

function Quiz() {
  const { registrarQuiz } = useProgresso();
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);

  const q = quizQuestoes[indice]!;
  const total = quizQuestoes.length;

  function responder(i: number) {
    if (escolha !== null) return;
    setEscolha(i);
    if (i === q.correta) setAcertos((a) => a + 1);
  }

  function avancar() {
    const acertosFinais = acertos;
    if (indice + 1 >= total) {
      registrarQuiz(acertosFinais);
      setFim(true);
      return;
    }
    setIndice((i) => i + 1);
    setEscolha(null);
  }

  function reiniciar() {
    setIndice(0);
    setEscolha(null);
    setAcertos(0);
    setFim(false);
  }

  if (fim) {
    const pct = Math.round((acertos / total) * 100);
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <h1 className="text-3xl font-black sm:text-4xl">Resultado</h1>
        <p className="mt-3 text-lg">
          Você acertou <strong>{acertos}</strong> de {total}!
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Bloco rotulo="Acertos" valor={`${acertos}/${total}`} />
          <Bloco rotulo="Aproveitamento" valor={`${pct}%`} />
          <Bloco rotulo="Pontuação" valor={`${acertos * 100} pts`} />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reiniciar}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
          >
            JOGAR NOVAMENTE
          </button>
          <Link
            to="/barroco"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
          >
            VOLTAR AO CONTEÚDO
          </Link>
          <Link
            to="/mapa"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
          >
            IR PARA O MAPA LITERÁRIO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-center text-3xl font-black sm:text-4xl">Barroco ou Arcadismo?</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Você consegue identificar a qual movimento pertence cada característica?
      </p>

      <div className="mt-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span>
            Pergunta {indice + 1} de {total}
          </span>
          <span>{acertos * 100} pts</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((indice + (escolha !== null ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      <div key={indice} className="rise mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-lg font-semibold leading-relaxed">{q.pergunta}</p>
        <div className="mt-5 grid gap-2.5">
          {q.opcoes.map((o, i) => {
            const certo = i === q.correta;
            const marcado = escolha === i;
            return (
              <button
                key={o}
                type="button"
                onClick={() => responder(i)}
                disabled={escolha !== null}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-base transition-colors",
                  escolha === null && "border-border hover:border-primary hover:bg-accent",
                  escolha !== null && certo && "border-arcadia bg-arcadia/12",
                  escolha !== null && marcado && !certo && "border-destructive bg-destructive/10",
                  escolha !== null && !certo && !marcado && "border-border opacity-60",
                )}
              >
                {o}
                {escolha !== null && certo && <Check className="size-5 text-arcadia" />}
                {escolha !== null && marcado && !certo && <X className="size-5 text-destructive" />}
              </button>
            );
          })}
        </div>

        {escolha !== null && (
          <div className="rise mt-5 rounded-xl bg-secondary p-4 text-sm leading-relaxed">
            <strong>{escolha === q.correta ? "Acertou! +100 pontos" : "Quase!"}</strong>{" "}
            {q.explicacao}
          </div>
        )}

        <button
          type="button"
          onClick={avancar}
          disabled={escolha === null}
          className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-40"
        >
          {indice + 1 >= total ? "VER RESULTADO" : "PRÓXIMA PERGUNTA →"}
        </button>
      </div>
    </div>
  );
}

function Bloco({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{rotulo}</p>
      <p className="mt-1 text-xl font-bold">{valor}</p>
    </div>
  );
}
