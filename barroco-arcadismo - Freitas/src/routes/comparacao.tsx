import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { comparacaoCards, comparacaoLinhas, desafioClassificar } from "@/data/content";
import { NavProxima, SecaoTitulo } from "@/components/ui-partes";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/comparacao")({
  head: () => ({
    meta: [
      { title: "Barroco × Arcadismo — Comparação interativa" },
      {
        name: "description",
        content:
          "Compare Barroco e Arcadismo lado a lado e teste onde encaixar cada característica.",
      },
      { property: "og:title", content: "Barroco × Arcadismo — Comparação interativa" },
      {
        property: "og:description",
        content: "Século, linguagem, temas e estilo dos dois movimentos, em comparação interativa.",
      },
    ],
  }),
  component: Comparacao,
});

function Comparacao() {
  const [aberto, setAberto] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<Record<string, "barroco" | "arcadismo">>({});

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-center text-3xl font-black sm:text-5xl">
        <span className="text-barroco">BARROCO</span>
        <span className="mx-3 text-gold">×</span>
        <span className="text-arcadia">ARCADISMO</span>
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Dois movimentos, duas visões de mundo.
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gold/30 bg-barroco p-6 text-cream shadow-lg">
          <h2 className="text-xl font-bold text-gold">Barroco</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {comparacaoLinhas.map((l) => (
              <li key={l.tema} className="rounded-lg bg-cream/10 px-3 py-2">
                <span className="block text-xs uppercase tracking-wide text-gold/80">{l.tema}</span>
                {l.barroco}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-arcadia/30 bg-arcadia-panel p-6 shadow-lg">
          <h2 className="text-xl font-bold text-arcadia">Arcadismo</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {comparacaoLinhas.map((l) => (
              <li key={l.tema} className="rounded-lg bg-arcadia/10 px-3 py-2">
                <span className="block text-xs uppercase tracking-wide text-arcadia/80">
                  {l.tema}
                </span>
                {l.arcadismo}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <SecaoTitulo
          titulo="Conceitos clicáveis"
          legenda="Toque em um conceito para descobrir a qual movimento ele pertence."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comparacaoCards.map((c) => {
            const ativo = aberto === c.id;
            const barroco = c.movimento === "barroco";
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setAberto(ativo ? null : c.id)}
                className={cn(
                  "lift rounded-2xl border p-4 text-left shadow-sm",
                  ativo && barroco && "border-gold/50 bg-barroco text-cream",
                  ativo && !barroco && "border-arcadia/40 bg-arcadia-panel",
                  !ativo && "border-border bg-card",
                )}
              >
                <h3 className="text-base font-bold">{c.rotulo}</h3>
                {ativo ? (
                  <div className="mt-2">
                    <span
                      className={cn(
                        "text-xs font-bold uppercase tracking-wide",
                        barroco ? "text-gold" : "text-arcadia",
                      )}
                    >
                      {barroco ? "Barroco" : "Arcadismo"}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed">{c.explicacao}</p>
                  </div>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">clique para revelar</p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-border bg-secondary/50 p-6">
        <SecaoTitulo
          titulo="Em qual movimento você colocaria esta característica?"
          legenda="Escolha e veja a explicação na hora."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {desafioClassificar.map((d) => {
            const escolha = respostas[d.id];
            const acertou = escolha === d.movimento;
            return (
              <div key={d.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-base font-semibold">{d.rotulo}</p>
                <div className="mt-3 flex gap-2">
                  {(["barroco", "arcadismo"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      disabled={!!escolha}
                      onClick={() => setRespostas((r) => ({ ...r, [d.id]: m }))}
                      className={cn(
                        "flex-1 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                        m === "barroco"
                          ? "border-barroco/40 hover:bg-barroco hover:text-cream"
                          : "border-arcadia/40 hover:bg-arcadia hover:text-cream",
                        escolha === m && "ring-2 ring-ring",
                        escolha && escolha !== m && "opacity-50",
                      )}
                    >
                      {m === "barroco" ? "BARROCO" : "ARCADISMO"}
                    </button>
                  ))}
                </div>
                {escolha && (
                  <div
                    className={cn(
                      "rise mt-3 flex gap-2 rounded-xl p-3 text-sm",
                      acertou
                        ? "bg-arcadia/12 text-arcadia"
                        : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {acertou ? (
                      <Check className="mt-0.5 size-4 shrink-0" />
                    ) : (
                      <X className="mt-0.5 size-4 shrink-0" />
                    )}
                    <span className="text-foreground">
                      <strong>
                        {acertou ? "Certo!" : "Não é bem isso."} É{" "}
                        {d.movimento === "barroco" ? "Barroco" : "Arcadismo"}.
                      </strong>{" "}
                      {d.explicacao}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <NavProxima
        voltarPara="/arcadismo"
        voltarLabel="Arcadismo"
        proximoPara="/quiz"
        proximoLabel="IR PARA O QUIZ"
      />
    </div>
  );
}
