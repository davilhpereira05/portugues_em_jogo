import { createFileRoute, Link } from "@tanstack/react-router";
import { PartyPopper } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { questoes, rotuloArea } from "@/data/questoes";
import { XP, useProgresso, type Area } from "@/lib/progresso";

export const Route = createFileRoute("/resultado")({
  head: () => ({
    meta: [
      { title: "Resultado do desafio — Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Veja acertos, erros, precisão, XP ganho e seu desempenho por área: concordância verbal, nominal e casos especiais.",
      },
      { property: "og:title", content: "Resultado do desafio" },
      {
        property: "og:description",
        content: "Precisão, XP, nível e desempenho por área depois dos 15 desafios.",
      },
    ],
  }),
  component: Resultado,
});

const areas: Area[] = ["verbal", "nominal", "especiais"];

function Resultado() {
  const { estado, nivel } = useProgresso();
  const quiz = estado.ultimoQuiz;

  if (!quiz) {
    return (
      <PageShell
        etiqueta="Resultado"
        titulo="Nenhum desafio concluído ainda"
        descricao="Assim que você terminar os 15 desafios, o resultado completo aparece aqui com precisão, XP e desempenho por área."
      >
        <div className="surface-card p-6">
          <p className="text-sm text-muted-foreground">
            Que tal começar agora? Você pode jogar no modo aprendizagem (com feedback) ou no modo
            prova (sem feedback até o final).
          </p>
          <Link
            to="/desafio"
            className="brand-gradient mt-4 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            Começar desafio
          </Link>
        </div>
      </PageShell>
    );
  }

  const total = quiz.respostas.length;
  const acertos = quiz.respostas.filter((r) => r.correta).length;
  const erros = total - acertos;
  const precisao = total ? Math.round((acertos / total) * 100) : 0;
  const xpGanho = quiz.modo === "prova" ? 0 : quiz.respostas.reduce((soma, r) => {
    const questao = questoes.find((q) => q.id === r.id);
    return soma + (r.correta ? (questao?.xp ?? XP.acerto) : 0);
  }, 0);

  const porArea = areas.map((area) => {
    const doArea = quiz.respostas.filter((r) => r.area === area);
    const certos = doArea.filter((r) => r.correta).length;
    return {
      area,
      total: doArea.length,
      certos,
      pct: doArea.length ? Math.round((certos / doArea.length) * 100) : 0,
    };
  });

  return (
    <PageShell
      etiqueta="Resultado"
      titulo="🎉 Desafio concluído"
      descricao={`Modo ${quiz.modo === "prova" ? "prova" : "aprendizagem"} · concluído em ${new Date(
        quiz.concluidoEm,
      ).toLocaleString("pt-BR")}`}
      acoes={
        <>
          <Link
            to="/gabarito"
            className="brand-gradient rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            Ver gabarito comentado
          </Link>
          <Link
            to="/desafio"
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Jogar de novo
          </Link>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid gap-5">
          <section className="surface-card p-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <PartyPopper className="size-4" aria-hidden />
              Resumo
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { rotulo: "Questões", valor: String(total) },
                { rotulo: "Acertos", valor: String(acertos) },
                { rotulo: "Erros", valor: String(erros) },
                { rotulo: "Precisão", valor: `${precisao}%` },
                { rotulo: "XP ganho", valor: quiz.modo === "prova" ? "— (modo prova)" : `+${xpGanho}` },
                { rotulo: "Nível", valor: `${nivel.nivel} — ${nivel.nome}` },
              ].map((item) => (
                <div key={item.rotulo} className="rounded-xl border border-border bg-secondary/40 p-4">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    {item.rotulo}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold">{item.valor}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="font-display text-lg font-bold">Desempenho por conteúdo</h2>
            <div className="mt-4 grid gap-4">
              {porArea.map((item) => (
                <div key={item.area}>
                  <div className="mb-1 flex justify-between text-sm font-semibold">
                    <span>{rotuloArea[item.area]}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {item.certos}/{item.total} · {item.pct}%
                    </span>
                  </div>
                  <div
                    className="h-3 overflow-hidden rounded-full bg-secondary"
                    role="progressbar"
                    aria-valuenow={item.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Desempenho em ${rotuloArea[item.area]}`}
                  >
                    <div
                      className="brand-gradient h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${Math.max(2, item.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="surface-card p-5">
          <h2 className="font-display text-base font-bold">Próximo passo</h2>
          <ol className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <li>1. Abrir o gabarito explicado</li>
            <li>2. Revisar somente os seus erros</li>
            <li>3. Voltar ao conteúdo que ficou fraco</li>
            <li>4. Encarar o desafio final</li>
          </ol>
          <div className="mt-4 grid gap-2">
            <Link
              to="/gabarito"
              className="rounded-xl border border-border px-4 py-2.5 text-center text-sm font-semibold transition-colors hover:bg-secondary"
            >
              📚 Revisar meus erros
            </Link>
            <Link
              to="/desafio-final"
              className="rounded-xl border border-border px-4 py-2.5 text-center text-sm font-semibold transition-colors hover:bg-secondary"
            >
              👑 Desafio final
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
