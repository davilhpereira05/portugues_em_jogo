import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import {
  questoes,
  rotuloArea,
  type Questao,
  type QuestaoAssociacao,
  type QuestaoCaca,
  type QuestaoFinal,
  type QuestaoMultipla,
  type QuestaoVF,
} from "@/data/questoes";
import { useProgresso } from "@/lib/progresso";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gabarito")({
  head: () => ({
    meta: [
      { title: "Gabarito explicado e revisão dos erros — Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Gabarito comentado das 15 atividades de concordância, com a resposta correta e a explicação de cada questão, além do modo revisão dos seus erros.",
      },
      { property: "og:title", content: "Gabarito explicado" },
      {
        property: "og:description",
        content: "Questão, resposta correta e o motivo — mais o modo revisão só com os seus erros.",
      },
    ],
  }),
  component: Gabarito,
});

function respostaCorreta(q: Questao): string {
  switch (q.tipo) {
    case "multipla":
    case "complete":
    case "relampago": {
      const m = q as QuestaoMultipla;
      return `${String.fromCharCode(65 + m.correta)}) ${m.opcoes[m.correta]}`;
    }
    case "vf":
      return (q as QuestaoVF).correta ? "Verdadeiro" : "Falso";
    case "caca": {
      const c = q as QuestaoCaca;
      return `“${c.palavras[c.indiceErro]}” — ${c.correcao}`;
    }
    case "associacao":
      return (q as QuestaoAssociacao).pares.map((p) => `${p.sujeito} → ${p.verbo}`).join(" · ");
    case "final": {
      const f = q as QuestaoFinal;
      return f.detalhes.map((d) => `${d.de} → ${d.para}`).join(" · ");
    }
  }
}

function Gabarito() {
  const { estado } = useProgresso();
  const [somenteErros, setSomenteErros] = useState(false);

  const quiz = estado.ultimoQuiz;
  const mapa = new Map(quiz?.respostas.map((r) => [r.id, r]) ?? []);
  const errosDoQuiz = questoes.filter((q) => mapa.get(q.id)?.correta === false);

  const lista = somenteErros ? errosDoQuiz : questoes;

  return (
    <PageShell
      etiqueta="Gabarito"
      titulo="Gabarito explicado"
      descricao="Cada questão vem com a resposta correta e o motivo. Aqui não existe só “certo” ou “errado” — o objetivo é entender a regra."
      acoes={
        <>
          <button
            type="button"
            onClick={() => setSomenteErros((s) => !s)}
            aria-pressed={somenteErros}
            className={cn(
              "rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors",
              somenteErros ? "border-accent bg-accent/15 text-accent" : "border-border hover:bg-secondary",
            )}
          >
            📚 {somenteErros ? "Ver todas as questões" : "Revisar meus erros"}
          </button>
          <Link
            to="/desafio"
            className="brand-gradient rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            Tentar novamente
          </Link>
        </>
      }
    >
      {!quiz ? (
        <div className="surface-card mb-5 p-5">
          <p className="text-sm text-muted-foreground">
            Você ainda não concluiu o desafio. O gabarito abaixo está completo; depois de jogar, esta
            página também mostra o que você acertou e permite revisar só os erros.
          </p>
        </div>
      ) : null}

      {somenteErros && errosDoQuiz.length === 0 ? (
        <div className="surface-card p-6">
          <p className="font-display text-base font-bold text-success">
            Nenhum erro registrado no último desafio. 🎉
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Aproveite para encarar o desafio final ou tentar o modo prova.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/desafio-final"
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              👑 Desafio final
            </Link>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4">
        {lista.map((q) => {
          const minha = mapa.get(q.id);
          return (
            <article key={q.id} className="surface-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">
                  Questão {q.numero} · {q.rotulo}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {rotuloArea[q.area]}
                </span>
                {minha ? (
                  <span
                    className={cn(
                      "ml-auto rounded-full border px-3 py-1 text-xs font-bold",
                      minha.correta
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-destructive/40 bg-destructive/10 text-destructive",
                    )}
                  >
                    {minha.correta ? "Você acertou" : "Você errou"}
                  </span>
                ) : null}
              </div>

              <h2 className="mt-3 font-display text-base font-bold">{q.enunciado}</h2>
              {q.tipo === "vf" ? (
                <p className="mt-1 font-display text-sm italic">{(q as QuestaoVF).afirmacao}</p>
              ) : null}

              <p className="mt-3 rounded-xl border border-success/40 bg-success/10 p-3 text-sm font-semibold text-success">
                Resposta correta: {respostaCorreta(q)}
              </p>

              {minha && !minha.correta ? (
                <p className="mt-2 text-sm text-destructive">Você respondeu: {minha.resposta || "—"}</p>
              ) : null}

              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{q.explicacao}</p>

              {minha && !minha.correta ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to="/desafio"
                    className="rounded-xl border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
                  >
                    Tentar novamente
                  </Link>
                  <Link
                    to="/aprenda"
                    className="rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
                  >
                    Revisar conteúdo: {rotuloArea[q.area]}
                  </Link>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
