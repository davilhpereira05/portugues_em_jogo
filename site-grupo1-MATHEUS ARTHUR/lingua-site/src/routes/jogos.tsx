import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { questions, textoApoio } from "@/lib/quiz";
import { useStudent } from "@/lib/student";
import { MAX_TENTATIVAS, addAttempt, useAttempts } from "@/lib/attempts";

export const Route = createFileRoute("/jogos")({
  head: () => ({
    meta: [
      { title: "Área de Jogos — Quiz A Escolha Consciente" },
      {
        name: "description",
        content:
          "Quiz de 10 perguntas sobre leitura, interpretação e tipos de texto, baseado no texto A Escolha Consciente.",
      },
      { property: "og:title", content: "Área de Jogos — Quiz A Escolha Consciente" },
      {
        property: "og:description",
        content: "10 perguntas de interpretação e tipologia textual com correção imediata.",
      },
    ],
  }),
  component: Jogos,
});

const letras = ["A", "B", "C", "D"];

function TextoApoio() {
  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-ink">
        Texto de apoio
      </span>
      <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight">
        {textoApoio.titulo}
      </h2>
      <div className="mt-4 space-y-4 text-pretty text-base text-muted-foreground">
        {textoApoio.paragrafos.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
        <p>{textoApoio.chamada}</p>
        <ul className="space-y-2">
          {textoApoio.passos.map((passo, i) => (
            <li key={passo} className="flex gap-2">
              <span className="font-display font-semibold text-accent-ink">{i + 1}.</span>
              {passo}
            </li>
          ))}
        </ul>
        <p className="font-medium text-foreground">{textoApoio.fecho}</p>
      </div>
    </div>
  );
}

function Jogos() {
  const student = useStudent();
  const [attempts, setAttempts] = useAttempts(student);
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);

  const q = questions[indice]!;
  const respondeu = escolha !== null;
  const usadas = attempts?.length ?? 0;
  const restantes = MAX_TENTATIVAS - usadas;

  function responder(i: number) {
    if (respondeu) return;
    setEscolha(i);
    if (i === q.correta) setAcertos((a) => a + 1);
  }

  function proxima() {
    if (indice + 1 >= questions.length) {
      if (student) setAttempts(addAttempt(student, acertos));
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

  const resumo = attempts && attempts.length > 0 ? (
    <p className="mt-2 text-sm text-muted-foreground">
      Tentativas: {attempts.map((s, i) => `${i + 1}ª ${s}/10`).join(" · ")} · Melhor:{" "}
      {Math.max(...attempts)}/10
    </p>
  ) : null;

  if (fim) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent-ink">
            Quiz concluído
          </p>
          <h1 className="mt-2 text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {student ? `${student.nome}, você acertou` : "Você acertou"} {acertos} de{" "}
            {questions.length}
          </h1>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            {acertos >= 8
              ? "Excelente leitura! Você domina interpretação e tipologia textual."
              : acertos >= 5
                ? "Bom trabalho! Revise o guia de estudo para melhorar ainda mais."
                : "Vale uma revisão: leia o guia de estudo e tente novamente."}
          </p>
          {resumo}
          <p className="mt-1 text-sm font-medium">
            {restantes > 0
              ? `Você ainda tem ${restantes} tentativa${restantes > 1 ? "s" : ""}.`
              : "Você usou todas as tentativas."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {restantes > 0 ? (
              <button
                onClick={reiniciar}
                className="rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground ring-1 ring-primary/40 transition-transform hover:-translate-y-0.5"
              >
                Jogar de novo
              </button>
            ) : null}
            <Link
              to="/aprendizado"
              className="rounded-xl px-6 py-3.5 text-base font-semibold ring-1 ring-border"
            >
              Ir para o guia de estudo
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (attempts && restantes <= 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent-ink">
            Limite atingido
          </p>
          <h1 className="mt-2 text-balance font-display text-4xl font-semibold tracking-tight">
            Você já usou as {MAX_TENTATIVAS} tentativas
          </h1>
          {resumo}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/home"
              className="rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground"
            >
              Voltar ao início
            </Link>
            <Link
              to="/aprendizado"
              className="rounded-xl px-6 py-3.5 text-base font-semibold ring-1 ring-border"
            >
              Ir para o guia de estudo
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent-ink">
              Quiz · {textoApoio.titulo}
            </p>
            <h1 className="mt-1 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Pergunta {indice + 1} de {questions.length}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-card px-4 py-2 text-sm font-medium ring-1 ring-border">
              Acertos: {acertos}
            </span>
            <div className="h-2 w-40 overflow-hidden rounded-full bg-card ring-1 ring-border">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${((indice + (respondeu ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <TextoApoio />
          </aside>

          <section>
            <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary-ink">
                {q.tag}
              </span>
              <p className="mt-4 text-pretty text-lg">{q.enunciado}</p>

              <div className="mt-6 space-y-3">
                {q.opcoes.map((opcao, i) => {
                  const correta = i === q.correta;
                  const escolhida = escolha === i;
                  let estado = "bg-background ring-1 ring-border text-muted-foreground";
                  if (respondeu && correta)
                    estado = "bg-success/10 ring-2 ring-success text-foreground";
                  else if (escolhida)
                    estado = "bg-destructive/10 ring-2 ring-destructive text-foreground";
                  let marcador = "bg-card text-muted-foreground ring-1 ring-border";
                  if (respondeu && correta) marcador = "bg-success text-success-foreground";
                  else if (escolhida) marcador = "bg-destructive text-destructive-foreground";

                  return (
                    <button
                      key={opcao}
                      onClick={() => responder(i)}
                      disabled={respondeu}
                      className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition-colors ${estado} ${
                        respondeu ? "cursor-default" : "cursor-pointer hover:ring-primary"
                      }`}
                    >
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${marcador}`}
                      >
                        {letras[i]}
                      </span>
                      <span className="text-pretty text-base">{opcao}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {respondeu ? (
              <>
                <div className="mt-4 rounded-2xl bg-accent/10 p-4 ring-1 ring-accent/20">
                  <p className="text-sm font-semibold text-accent-ink">
                    {escolha === q.correta ? "Resposta correta!" : "Não foi dessa vez."}
                  </p>
                  <p className="mt-1 text-pretty text-sm text-muted-foreground">{q.explicacao}</p>
                </div>
                <button
                  onClick={proxima}
                  className="mt-4 w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground ring-1 ring-primary/40 transition-transform hover:-translate-y-0.5"
                >
                  {indice + 1 === questions.length ? "Ver resultado" : "Próxima pergunta"}
                </button>
              </>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}
