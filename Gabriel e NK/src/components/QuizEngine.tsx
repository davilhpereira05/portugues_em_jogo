import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Flame, GraduationCap } from "lucide-react";
import { FeedbackCard } from "./FeedbackCard";
import { Timer } from "./Timer";
import {
  rotuloArea,
  type Questao,
  type QuestaoAssociacao,
  type QuestaoCaca,
  type QuestaoFinal,
  type QuestaoMultipla,
  type QuestaoVF,
} from "@/data/questoes";
import { useProgresso, type Modo, type RespostaRegistrada } from "@/lib/progresso";
import { cn } from "@/lib/utils";

type RespostaLocal = { correta: boolean; texto: string };

function Opcao({
  texto,
  letra,
  selecionada,
  correta,
  revelado,
  onClick,
}: {
  texto: string;
  letra: string;
  selecionada: boolean;
  correta: boolean;
  revelado: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selecionada}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all sm:text-base",
        "border-border bg-card hover:border-accent hover:shadow-soft",
        selecionada && !revelado && "border-accent bg-accent/10 font-semibold",
        revelado && correta && "border-success bg-success/15 font-semibold text-success",
        revelado && selecionada && !correta && "animate-shake border-destructive bg-destructive/15 text-destructive",
      )}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-secondary font-display text-xs font-bold">
        {letra}
      </span>
      {texto}
    </button>
  );
}

export function QuizEngine({
  lista,
  modo,
  titulo,
}: {
  lista: Questao[];
  modo: Modo;
  titulo: string;
}) {
  const navigate = useNavigate();
  const { registrarResposta, salvarQuiz, estado, tocar } = useProgresso();

  const [indice, setIndice] = useState(0);
  const [resposta, setResposta] = useState<RespostaLocal | null>(null);
  const [selecao, setSelecao] = useState<number | null>(null);
  const [multi, setMulti] = useState<number[]>([]);
  const [pares, setPares] = useState<Record<number, string>>({});
  const [registradas, setRegistradas] = useState<RespostaRegistrada[]>([]);

  const questao = lista[indice]!;
  const aprendizagem = modo === "aprendizagem";
  const revelado = resposta !== null;

  const limpar = useCallback(() => {
    setResposta(null);
    setSelecao(null);
    setMulti([]);
    setPares({});
  }, []);

  const concluir = useCallback(
    (todas: RespostaRegistrada[]) => {
      salvarQuiz(todas, modo);
      tocar("missao");
      void navigate({ to: "/resultado" });
    },
    [salvarQuiz, modo, navigate, tocar],
  );

  const responder = useCallback(
    (correta: boolean, texto: string) => {
      if (revelado) return;
      setResposta({ correta, texto });
      const registro: RespostaRegistrada = { id: questao.id, area: questao.area, correta, resposta: texto };
      setRegistradas((atual) => [...atual, registro]);
      if (aprendizagem) {
        registrarResposta({
          id: questao.id,
          area: questao.area,
          correta,
          resposta: texto,
          xp: questao.xp,
        });
        if (correta && estado.combo + 1 >= 2) tocar("combo");
      } else {
        tocar(correta ? "xp" : "xp");
        // modo prova: sem feedback imediato, avança automaticamente
        const todas = [...registradas, registro];
        if (indice + 1 >= lista.length) {
          concluir(todas);
        } else {
          setIndice(indice + 1);
          limpar();
        }
      }
    },
    [
      revelado,
      questao,
      aprendizagem,
      registrarResposta,
      estado.combo,
      tocar,
      registradas,
      indice,
      lista.length,
      concluir,
      limpar,
    ],
  );

  const avancar = useCallback(() => {
    if (indice + 1 >= lista.length) {
      concluir(registradas);
      return;
    }
    setIndice(indice + 1);
    limpar();
  }, [indice, lista.length, concluir, registradas, limpar]);

  const progresso = useMemo(() => Math.round((indice / lista.length) * 100), [indice, lista.length]);

  function renderQuestao() {
    if (questao.tipo === "multipla" || questao.tipo === "complete" || questao.tipo === "relampago") {
      const q = questao as QuestaoMultipla;
      return (
        <>
          {q.tipo === "relampago" && !revelado ? (
            <div className="mb-4">
              <Timer
                segundos={q.tempoLimite ?? 10}
                ativo={!revelado}
                chave={q.id}
                onFim={() => responder(false, "tempo esgotado")}
              />
            </div>
          ) : null}
          <div className="grid gap-2.5">
            {q.opcoes.map((opcao, i) => (
              <Opcao
                key={opcao}
                texto={opcao}
                letra={String.fromCharCode(65 + i)}
                selecionada={selecao === i}
                correta={i === q.correta}
                revelado={revelado}
                onClick={() => {
                  setSelecao(i);
                  responder(i === q.correta, opcao);
                }}
              />
            ))}
          </div>
        </>
      );
    }

    if (questao.tipo === "vf") {
      const q = questao as QuestaoVF;
      return (
        <>
          <p className="mb-4 rounded-xl border border-border bg-secondary/40 p-4 font-display text-lg">
            {q.afirmacao}
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[true, false].map((valor) => (
              <Opcao
                key={String(valor)}
                texto={valor ? "Verdadeiro" : "Falso"}
                letra={valor ? "V" : "F"}
                selecionada={selecao === (valor ? 1 : 0)}
                correta={valor === q.correta}
                revelado={revelado}
                onClick={() => {
                  setSelecao(valor ? 1 : 0);
                  responder(valor === q.correta, valor ? "Verdadeiro" : "Falso");
                }}
              />
            ))}
          </div>
        </>
      );
    }

    if (questao.tipo === "caca") {
      const q = questao as QuestaoCaca;
      return (
        <div className="flex flex-wrap gap-2">
          {q.palavras.map((palavra, i) => (
            <button
              key={`${palavra}-${i}`}
              type="button"
              onClick={() => {
                setSelecao(i);
                responder(i === q.indiceErro, palavra);
              }}
              className={cn(
                "rounded-xl border border-border bg-card px-3.5 py-2.5 font-display text-base transition-all hover:border-accent hover:shadow-soft",
                revelado && i === q.indiceErro && "border-success bg-success/15 text-success",
                revelado && selecao === i && i !== q.indiceErro && "animate-shake border-destructive bg-destructive/15 text-destructive",
              )}
            >
              {palavra}
            </button>
          ))}
        </div>
      );
    }

    if (questao.tipo === "associacao") {
      const q = questao as QuestaoAssociacao;
      const verbos = [...new Set(q.pares.map((p) => p.verbo))];
      const completo = Object.keys(pares).length === q.pares.length;
      return (
        <div className="grid gap-3">
          {q.pares.map((par, i) => (
            <div key={par.sujeito} className="rounded-xl border border-border bg-card p-3">
              <p className="font-display text-base font-semibold">{par.sujeito}…</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {verbos.map((verbo) => {
                  const escolhido = pares[i] === verbo;
                  return (
                    <button
                      key={verbo}
                      type="button"
                      disabled={revelado}
                      onClick={() => setPares((atual) => ({ ...atual, [i]: verbo }))}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-sm transition-all",
                        escolhido ? "border-accent bg-accent/15 font-semibold" : "border-border hover:bg-secondary",
                        revelado && escolhido && verbo === par.verbo && "border-success bg-success/15 text-success",
                        revelado && escolhido && verbo !== par.verbo && "border-destructive bg-destructive/15 text-destructive",
                      )}
                    >
                      {verbo}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {!revelado ? (
            <button
              type="button"
              disabled={!completo}
              onClick={() => {
                const acertou = q.pares.every((par, i) => pares[i] === par.verbo);
                responder(acertou, q.pares.map((p, i) => `${p.sujeito} → ${pares[i]}`).join(" | "));
              }}
              className="brand-gradient w-fit rounded-xl px-5 py-2.5 font-semibold text-primary-foreground shadow-soft transition-opacity disabled:opacity-40"
            >
              Conferir associação
            </button>
          ) : null}
        </div>
      );
    }

    const q = questao as QuestaoFinal;
    const alvo = q.indicesErro.length;
    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-secondary/30 p-4">
          {q.palavras.map((palavra, i) => {
            const marcada = multi.includes(i);
            const errada = q.indicesErro.includes(i);
            return (
              <button
                key={`${palavra}-${i}`}
                type="button"
                disabled={revelado}
                onClick={() =>
                  setMulti((atual) =>
                    atual.includes(i) ? atual.filter((x) => x !== i) : [...atual, i].slice(-alvo),
                  )
                }
                className={cn(
                  "rounded-lg px-2 py-1 font-display text-base transition-all",
                  marcada ? "bg-accent/20 ring-2 ring-accent" : "hover:bg-card",
                  revelado && errada && "bg-success/20 ring-2 ring-success",
                  revelado && marcada && !errada && "bg-destructive/20 ring-2 ring-destructive",
                )}
              >
                {palavra}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground">
          Selecionadas: {multi.length} de {alvo}
        </p>
        {!revelado ? (
          <button
            type="button"
            disabled={multi.length !== alvo}
            onClick={() => {
              const acertou = q.indicesErro.every((i) => multi.includes(i)) && multi.length === alvo;
              responder(acertou, multi.map((i) => q.palavras[i]).join(", "));
            }}
            className="brand-gradient w-fit rounded-xl px-5 py-2.5 font-semibold text-primary-foreground shadow-soft transition-opacity disabled:opacity-40"
          >
            Corrigir o texto
          </button>
        ) : (
          <div className="rounded-xl border border-success/40 bg-success/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-success">Versão corrigida</p>
            <p className="mt-2 font-display text-base">{q.versaoCorrigida}</p>
            <ul className="mt-3 grid gap-2">
              {q.detalhes.map((d) => (
                <li key={d.de} className="text-sm text-foreground/90">
                  <span className="font-semibold text-destructive line-through">{d.de}</span>
                  {" → "}
                  <span className="font-semibold text-success">{d.para}</span>
                  <span className="block text-muted-foreground">{d.motivo}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="surface-card animate-rise p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide">
            {questao.numero}/{lista.length} · {questao.rotulo}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            {rotuloArea[questao.area]}
          </span>
          {aprendizagem && estado.combo >= 2 ? (
            <span className="ml-auto flex items-center gap-1 text-xs font-bold text-warning">
              <Flame className="size-3.5" aria-hidden /> Combo x{estado.combo}
            </span>
          ) : null}
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="brand-gradient h-full rounded-full transition-[width] duration-500"
            style={{ width: `${Math.max(3, progresso)}%` }}
          />
        </div>

        <h2 className="mt-6 font-display text-xl font-bold sm:text-2xl">{questao.enunciado}</h2>

        <div className="mt-5">{renderQuestao()}</div>

        {revelado && aprendizagem ? (
          <div className="mt-6 grid gap-4">
            <FeedbackCard
              correta={resposta.correta}
              titulo={resposta.correta ? "🟢 Mandou bem!" : "🔴 Quase!"}
              explicacao={questao.explicacao}
              extra={
                questao.tipo === "caca" && !resposta.correta
                  ? `Forma correta: ${(questao as QuestaoCaca).correcao}`
                  : resposta.correta
                    ? `+${questao.xp} XP`
                    : undefined
              }
            />
            <button
              type="button"
              onClick={avancar}
              className="brand-gradient inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 font-semibold text-primary-foreground shadow-soft"
            >
              {indice + 1 >= lista.length ? "Ver resultado" : "Próximo desafio"}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>

      <aside className="grid content-start gap-4">
        <div className="surface-card p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Modo</p>
          <p className="mt-1 flex items-center gap-2 font-display text-base font-bold">
            {aprendizagem ? "🎯 Aprendizagem" : "🎓 Modo prova"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {aprendizagem
              ? "Feedback e explicação após cada resposta, com XP e combo."
              : "Sem XP, sem dicas e sem feedback: o resultado e o gabarito aparecem só no final."}
          </p>
          <p className="mt-3 font-display text-sm font-semibold">{titulo}</p>
        </div>

        <div className="surface-card p-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Caminho
          </p>
          <ol className="mt-2 grid gap-1.5 text-sm text-muted-foreground">
            <li>1. Responder os {lista.length} desafios</li>
            <li>2. Ver o resultado e a precisão</li>
            <li>3. Consultar o gabarito explicado</li>
            <li>4. Revisar seus erros</li>
          </ol>
          <Link
            to="/aprenda"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <GraduationCap className="size-4" aria-hidden />
            Revisar conteúdo
          </Link>
        </div>
      </aside>
    </section>
  );
}
