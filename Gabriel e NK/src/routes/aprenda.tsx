import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { TesteRapido } from "@/components/TesteRapido";
import { MissionCard } from "@/components/MissionCard";
import { topicosNominal, topicosVerbal, type TopicoAprenda } from "@/data/conteudo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/aprenda")({
  head: () => ({
    meta: [
      { title: "Aprenda — Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Regras de concordância verbal e nominal em cards curtos: sujeito simples e composto, haver, fazer, partitivas, adjetivos e casos especiais.",
      },
      { property: "og:title", content: "Aprenda concordância em cards interativos" },
      {
        property: "og:description",
        content:
          "Explicação rápida, exemplo errado e certo, e um teste rápido logo depois de cada regra.",
      },
    ],
  }),
  component: Aprenda,
});

function CardTopico({ topico }: { topico: TopicoAprenda }) {
  const [aberto, setAberto] = useState(false);

  return (
    <article className="surface-card overflow-hidden">
      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-secondary/40"
      >
        <div className="flex-1">
          <h3 className="font-display text-base font-bold">{topico.titulo}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{topico.resumo}</p>
        </div>
        <ChevronDown
          className={cn("size-5 shrink-0 text-accent transition-transform", aberto && "rotate-180")}
          aria-hidden
        />
      </button>

      {aberto ? (
        <div className="animate-rise border-t border-border p-5">
          {topico.errado ? (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 font-display text-sm">
              ❌ {topico.errado}
            </p>
          ) : null}
          {topico.certo ? (
            <p className="mt-2 rounded-lg border border-success/40 bg-success/10 px-3 py-2 font-display text-sm">
              ✅ {topico.certo}
            </p>
          ) : null}
          <ul className="mt-4 grid gap-2">
            {topico.pontos.map((ponto) => (
              <li key={ponto} className="flex gap-2 text-sm text-foreground/90">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {ponto}
              </li>
            ))}
          </ul>
          {topico.teste ? <TesteRapido teste={topico.teste} /> : null}
        </div>
      ) : null}
    </article>
  );
}

function Aprenda() {
  return (
    <PageShell
      etiqueta="Aprenda"
      titulo="Concordância em pequenas doses"
      descricao="Cada card traz a regra, um exemplo errado, a versão correta e — quando faz sentido — um teste rápido para você praticar na hora."
      acoes={
        <Link
          to="/desafio"
          className="brand-gradient rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          Ir para o desafio
        </Link>
      }
    >
      <div className="grid gap-10">
        <section className="surface-card p-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">⚡ Regra em 10 segundos</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <p className="rounded-xl bg-secondary/50 p-4 font-display text-lg font-bold">
              Verbal: <span className="text-accent">sujeito ↔ verbo</span>
            </p>
            <p className="rounded-xl bg-secondary/50 p-4 font-display text-lg font-bold">
              Nominal: <span className="text-accent">substantivo ↔ palavras que o acompanham</span>
            </p>
          </div>
        </section>

        <section aria-labelledby="verbal">
          <h2 id="verbal" className="font-display text-2xl font-bold">
            Concordância verbal
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            “É a relação entre o verbo e o sujeito, fazendo com que o verbo se ajuste em número e
            pessoa.” Singular: “O aluno estudou.” Plural: “Os alunos estudaram.”
          </p>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {topicosVerbal.map((t) => (
              <CardTopico key={t.id} topico={t} />
            ))}
          </div>
        </section>

        <section aria-labelledby="nominal">
          <h2 id="nominal" className="font-display text-2xl font-bold">
            Concordância nominal
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            “É a relação de concordância entre o substantivo e as palavras que o acompanham.”
          </p>

          <div className="surface-card mt-5 p-6">
            <p className="font-display text-sm text-destructive">❌ As menina bonita.</p>
            <p className="mt-1 font-display text-lg font-bold text-success">✅ As meninas bonitas.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["As", "meninas", "bonitas"].map((palavra) => (
                <span key={palavra} className="rounded-xl border border-accent/40 bg-accent/10 px-3 py-2 text-center">
                  <span className="block font-display text-base font-bold">{palavra}</span>
                  <span className="block text-xs text-muted-foreground">plural / feminino</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {topicosNominal.map((t) => (
              <CardTopico key={t.id} topico={t} />
            ))}
          </div>
        </section>

        <MissionCard
          id="missao-aprenda"
          titulo="Revisar as regras de concordância"
          descricao="Marque como concluída depois de abrir os cards e fazer os testes rápidos desta página."
        />
      </div>
    </PageShell>
  );
}
