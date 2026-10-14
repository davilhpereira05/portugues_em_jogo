import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Swords } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { QuizEngine } from "@/components/QuizEngine";
import { distribuicao, questoes } from "@/data/questoes";
import { useProgresso, type Modo } from "@/lib/progresso";

export const Route = createFileRoute("/desafio")({
  head: () => ({
    meta: [
      { title: "Desafio — 15 atividades | Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Quinze desafios diferentes: múltipla escolha, verdadeiro ou falso, caça ao erro, complete a frase, associação, desafio relâmpago e desafio final.",
      },
      { property: "og:title", content: "Desafio: 15 atividades de concordância" },
      {
        property: "og:description",
        content: "Modo aprendizagem com XP e combo, ou modo prova sem feedback até o final.",
      },
    ],
  }),
  component: Desafio,
});

function Desafio() {
  const { estado, definirModo } = useProgresso();
  const [iniciado, setIniciado] = useState(false);
  const [modo, setModo] = useState<Modo>(estado.modo);

  function iniciar(m: Modo) {
    setModo(m);
    definirModo(m);
    setIniciado(true);
  }

  if (iniciado) {
    return (
      <PageShell
        etiqueta="Desafio"
        titulo={modo === "prova" ? "🎓 Modo prova" : "Desafio — 15 atividades"}
        descricao={
          modo === "prova"
            ? "Responda tudo sem feedback. O resultado e o gabarito comentado aparecem no final."
            : "Responda, erre, entenda e tente novamente. Cada acerto vale XP e aumenta seu combo."
        }
      >
        <QuizEngine
          lista={questoes}
          modo={modo}
          titulo={modo === "prova" ? "Avaliação completa" : "Trilha de aprendizagem"}
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      etiqueta="Desafio"
      titulo="Escolha como quer jogar"
      descricao="São 15 atividades de tipos diferentes cobrindo concordância verbal, nominal e casos especiais."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => iniciar("aprendizagem")}
            className="surface-card p-6 text-left transition-transform hover:-translate-y-1"
          >
            <Swords className="size-7 text-accent" aria-hidden />
            <h2 className="mt-3 font-display text-xl font-bold">Modo aprendizagem</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Feedback e explicação depois de cada resposta. Ganha XP, aumenta combo e sobe de nível.
            </p>
            <span className="brand-gradient mt-5 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Começar desafio
            </span>
          </button>

          <button
            type="button"
            onClick={() => iniciar("prova")}
            className="surface-card p-6 text-left transition-transform hover:-translate-y-1"
          >
            <GraduationCap className="size-7 text-accent" aria-hidden />
            <h2 className="mt-3 font-display text-xl font-bold">🎓 Modo prova</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sem XP, sem dicas e sem feedback entre as questões. Você responde tudo e só depois vê
              o resultado e o gabarito comentado.
            </p>
            <span className="mt-5 inline-flex rounded-xl border border-border px-5 py-2.5 text-sm font-semibold">
              Entrar no modo prova
            </span>
          </button>
        </div>

        <aside className="surface-card p-5">
          <h2 className="font-display text-base font-bold">O que você vai encontrar</h2>
          <ul className="mt-3 grid gap-2">
            {distribuicao.map((d) => (
              <li key={d.tipo} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{d.tipo}</span>
                <span className="font-display font-bold tabular-nums">{d.quantidade}</span>
              </li>
            ))}
            <li className="mt-1 flex items-center justify-between border-t border-border pt-2 text-sm font-bold">
              <span>Total</span>
              <span className="tabular-nums">{questoes.length} desafios</span>
            </li>
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
