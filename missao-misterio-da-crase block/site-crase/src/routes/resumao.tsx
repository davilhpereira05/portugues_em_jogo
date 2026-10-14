import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, LinkButton, PageShell, Panel } from "@/components/ui-kit";

export const Route = createFileRoute("/resumao")({
  head: () => ({
    meta: [
      { title: "Resumão para a prova — Regência e crase" },
      {
        name: "description",
        content:
          "Resumo visual de regência verbal e nominal, regras da crase, macete do masculino e as pegadinhas mais comuns da prova.",
      },
      { property: "og:title", content: "Resumão para a prova — Regência e crase" },
      {
        property: "og:description",
        content: "Tudo o que cai na prova sobre regência e crase, em cards curtos e visuais.",
      },
    ],
  }),
  component: Resumao,
});

const PEGADINHAS = [
  {
    errado: "à estudar",
    certo: "a estudar",
    ok: false,
    explicacao: "Estudar é verbo, e não ocorre crase antes de verbo.",
  },
  {
    errado: "à pé",
    certo: "a pé",
    ok: false,
    explicacao: "Pé é palavra masculina e não aceita o artigo a, logo não há crase.",
  },
  {
    errado: "à ele",
    certo: "a ele",
    ok: false,
    explicacao: "Antes de pronome pessoal não ocorre crase.",
  },
  {
    errado: "",
    certo: "à escola",
    ok: true,
    explicacao:
      "Aqui a crase está correta: o verbo pede a preposição a e escola aceita o artigo a (a + a = à).",
  },
];

function Resumao() {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <PageShell
      eyebrow="Arquivo de revisão"
      title="📖 RESUMÃO PARA A PROVA"
      subtitle="Tudo o que você precisa lembrar, em blocos curtos."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel hover>
          <Badge tone="primary">Regência</Badge>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="rounded-lg border border-border bg-secondary/40 p-3">
              → Verbo pode exigir preposição.
            </li>
            <li className="rounded-lg border border-border bg-secondary/40 p-3">
              → Nome pode exigir preposição.
            </li>
            <li className="rounded-lg border border-border bg-secondary/40 p-3 font-mono">
              gostar de · precisar de · obedecer a · assistir a · preferir a
            </li>
          </ul>
        </Panel>

        <Panel hover>
          <Badge tone="accent">Crase</Badge>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="rounded-lg border border-border bg-secondary/40 p-3 text-center font-display text-xl font-bold">
              A + A = À
            </li>
            <li className="rounded-lg border border-border bg-secondary/40 p-3">
              → Feminino + preposição “a” + artigo “a”.
            </li>
            <li className="rounded-lg border border-destructive/40 bg-destructive/10 p-3">
              → Não ocorre antes de verbo.
            </li>
            <li className="rounded-lg border border-destructive/40 bg-destructive/10 p-3">
              → Não ocorre antes de palavra masculina.
            </li>
            <li className="rounded-lg border border-destructive/40 bg-destructive/10 p-3">
              → Não ocorre antes de pronome pessoal.
            </li>
          </ul>
        </Panel>

        <Panel hover className="border-gold/50">
          <Badge tone="gold">🧠 Macete</Badge>
          <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm font-bold">
            “Troque o feminino pelo masculino.”
          </p>
          <p className="mt-3 rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm font-bold">
            “Se aparecer AO, use À.”
          </p>
          <p className="mt-3 font-mono text-sm text-muted-foreground">
            Vou à escola → Vou ao colégio ✅
          </p>
        </Panel>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">🚨 PEGADINHAS DA PROVA</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PEGADINHAS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAberta((a) => (a === i ? null : i))}
              aria-expanded={aberta === i}
              className={`panel panel-hover p-4 text-left ${aberta === i ? "border-primary/60" : ""}`}
            >
              {p.ok ? (
                <p className="font-mono text-lg text-success">✅ {p.certo}</p>
              ) : (
                <>
                  <p className="font-mono text-lg text-destructive">❌ {p.errado}</p>
                  <p className="font-mono text-lg text-success">✅ {p.certo}</p>
                </>
              )}
              {aberta === i ? (
                <p className="animate-pop mt-3 text-sm text-muted-foreground">{p.explicacao}</p>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">Clique para ver a explicação</p>
              )}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton to="/desafio">🎮 Testar no DESAFIO</LinkButton>
        <LinkButton to="/" variant="ghost">
          ← Início
        </LinkButton>
      </div>
    </PageShell>
  );
}
