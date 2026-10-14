import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Highlight, LinkButton, PageShell, Panel } from "@/components/ui-kit";

export const Route = createFileRoute("/aprenda")({
  head: () => ({
    meta: [
      { title: "Aprenda — Regência, preposições e crase" },
      {
        name: "description",
        content:
          "Teoria interativa de regência verbal e nominal, tabela de preposições exigidas, regras da crase e o macete do teste do masculino.",
      },
      { property: "og:title", content: "Aprenda — Regência, preposições e crase" },
      {
        property: "og:description",
        content: "Cards e tabelas interativas com a teoria completa de regência e crase.",
      },
    ],
  }),
  component: Aprenda,
});

const TABELA = [
  ["gostar", "de", "Gosto de futebol."],
  ["precisar", "de", "Preciso de ajuda."],
  ["obedecer", "a", "Obedeço às regras."],
  ["assistir", "a", "Assisti ao filme."],
  ["chegar", "a", "Cheguei à escola."],
  ["ir", "a", "Fui à biblioteca."],
  ["lembrar-se", "de", "Lembro-me de você."],
  ["esquecer-se", "de", "Esqueci-me do compromisso."],
  ["preferir", "a", "Prefiro café a chá."],
  ["aspirar (desejar)", "a", "Aspiro ao cargo."],
];

const USAR = [
  { t: "Antes de palavras femininas", e: "Fui à escola." },
  { t: "Antes de horas", e: "A aula começa às 8h." },
  { t: "Em locuções femininas", e: "à noite · à tarde · às vezes · à esquerda" },
];

const NAO_USAR = [
  { t: "Antes de palavras masculinas", e: "Fui a pé." },
  { t: "Antes de verbos", e: "Começou a estudar." },
  { t: "Antes de pronomes pessoais", e: "Entreguei o trabalho a ela." },
  { t: "Em palavras repetidas", e: "cara a cara · frente a frente" },
];

const TABS = ["Regência", "Preposições", "Crase", "Macete"] as const;

function Aprenda() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Regência");
  const [sentido, setSentido] = useState<"ver" | "ajudar">("ver");

  return (
    <PageShell
      eyebrow="Etapa 2 · Treinamento"
      title="📚 APRENDA"
      subtitle="A base teórica da investigação: regência, preposições exigidas e crase, em blocos curtos e visuais."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-bold transition-all ${
              tab === t
                ? "border-primary bg-primary/20 text-primary-glow"
                : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Regência" && (
        <div className="grid animate-pop gap-5">
          <Panel>
            <Badge>Bloco 1</Badge>
            <h2 className="mt-3 text-2xl font-bold">O que é regência?</h2>
            <p className="mt-2 text-muted-foreground">
              Regência é a relação entre uma palavra e o termo que completa seu sentido, mostrando
              principalmente qual <Highlight>preposição</Highlight> deve ser utilizada.
            </p>
          </Panel>

          <div className="grid gap-5 md:grid-cols-2">
            <Panel hover>
              <Badge tone="accent">⚡ Regência verbal</Badge>
              <p className="mt-3 text-muted-foreground">Relação entre verbo + complemento.</p>
              <p className="mt-4 rounded-lg border border-border bg-secondary/40 p-3 font-mono text-sm">
                Eu <Highlight>gosto</Highlight> de música.
              </p>
              <p className="mt-3 font-display text-lg font-bold text-primary-glow">
                gosto → DE
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                O verbo <strong>gostar</strong> exige a preposição <strong>de</strong>.
              </p>
            </Panel>

            <Panel hover>
              <Badge tone="accent">🧩 Regência nominal</Badge>
              <p className="mt-3 text-muted-foreground">Relação entre nome + complemento.</p>
              <p className="mt-4 rounded-lg border border-border bg-secondary/40 p-3 font-mono text-sm">
                Tenho <Highlight>necessidade</Highlight> de ajuda.
              </p>
              <p className="mt-3 font-display text-lg font-bold text-primary-glow">
                necessidade → DE
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                O nome <strong>necessidade</strong> exige a preposição <strong>de</strong>.
              </p>
            </Panel>
          </div>
        </div>
      )}

      {tab === "Preposições" && (
        <div className="grid animate-pop gap-5">
          <Panel className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3">Palavra</th>
                    <th className="px-5 py-3">Preposição</th>
                    <th className="px-5 py-3">Exemplo</th>
                  </tr>
                </thead>
                <tbody>
                  {TABELA.map(([p, prep, ex]) => (
                    <tr
                      key={p}
                      className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/50"
                    >
                      <td className="px-5 py-3 font-bold">{p}</td>
                      <td className="px-5 py-3">
                        <Badge tone="primary">{prep}</Badge>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel className="border-destructive/40">
            <Badge tone="danger">🚨 Atenção</Badge>
            <p className="mt-3 text-muted-foreground">
              Alguns verbos podem mudar de sentido dependendo da preposição.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSentido("ver")}
                className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-bold ${sentido === "ver" ? "border-primary bg-primary/20 text-primary-glow" : "border-border bg-secondary/40"}`}
              >
                “Assisti ao filme.”
              </button>
              <button
                type="button"
                onClick={() => setSentido("ajudar")}
                className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-bold ${sentido === "ajudar" ? "border-primary bg-primary/20 text-primary-glow" : "border-border bg-secondary/40"}`}
              >
                “Assisti o paciente.”
              </button>
            </div>
            <p className="mt-4 animate-pop rounded-lg border border-border bg-secondary/40 p-4 text-sm">
              {sentido === "ver"
                ? "→ significa VI o filme. No sentido de ver, assistir exige a preposição a."
                : "→ significa PRESTEI ASSISTÊNCIA ao paciente. Nesse sentido, assistir não pede preposição."}
            </p>
          </Panel>
        </div>
      )}

      {tab === "Crase" && (
        <div className="grid animate-pop gap-5">
          <Panel className="text-center">
            <Badge tone="gold">🔤 Fusão detectada</Badge>
            <p className="mt-4 text-muted-foreground">
              Crase é a fusão da preposição <strong>a</strong> com o artigo feminino{" "}
              <strong>a</strong>.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-display text-4xl font-bold sm:text-5xl">
              <span className="rounded-xl border border-primary/50 bg-primary/10 px-5 py-3">A</span>
              <span className="text-muted-foreground">+</span>
              <span className="rounded-xl border border-accent/50 bg-accent/10 px-5 py-3">A</span>
              <span className="text-muted-foreground">=</span>
              <span className="animate-beacon rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-primary-foreground">
                À
              </span>
            </div>
            <p className="mt-6 font-mono text-sm">Vou à escola.</p>
            <p className="text-sm text-muted-foreground">Vou a + a escola = vou à escola.</p>
          </Panel>

          <div className="grid gap-5 md:grid-cols-2">
            <Panel className="border-success/40">
              <Badge tone="success">✅ Quando usar crase</Badge>
              <ul className="mt-4 grid gap-3">
                {USAR.map((c) => (
                  <li key={c.t} className="rounded-lg border border-border bg-secondary/40 p-3">
                    <p className="text-sm font-bold">{c.t}</p>
                    <p className="mt-1 font-mono text-sm text-success">{c.e}</p>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel className="border-destructive/40">
              <Badge tone="danger">❌ Quando NÃO usar crase</Badge>
              <ul className="mt-4 grid gap-3">
                {NAO_USAR.map((c) => (
                  <li key={c.t} className="rounded-lg border border-border bg-secondary/40 p-3">
                    <p className="text-sm font-bold">{c.t}</p>
                    <p className="mt-1 font-mono text-sm text-destructive">{c.e}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-center font-display text-lg font-bold">
                <span className="text-destructive">❌ À</span>{" "}
                <span className="text-muted-foreground">|</span>{" "}
                <span className="text-success">✅ A</span>
              </p>
            </Panel>
          </div>
        </div>
      )}

      {tab === "Macete" && (
        <Panel className="animate-pop border-gold/50">
          <Badge tone="gold">🧠 Ferramenta de investigação</Badge>
          <h2 className="mt-3 text-2xl font-bold">TESTE DO MASCULINO</h2>
          <p className="mt-2 text-muted-foreground">
            Troque a palavra feminina por uma masculina. Se aparecer <Highlight>AO</Highlight>,
            geralmente haverá <Highlight>À</Highlight> na versão feminina.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              ["Vou à escola.", "Vou ao colégio.", "Apareceu AO.", "Vou à escola. ✅"],
              [
                "Entreguei o trabalho à professora.",
                "Entreguei o trabalho ao professor.",
                "Apareceu AO.",
                "Entreguei o trabalho à professora. ✅",
              ],
            ].map((lines, i) => (
              <div key={i} className="rounded-xl border border-gold/40 bg-gold/5 p-4">
                {lines.map((l, j) => (
                  <p key={j} className="font-mono text-sm">
                    {j > 0 && <span className="block text-gold">↓</span>}
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Panel>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton to="/exemplos">🔎 Ir para CAÇA AO ERRO</LinkButton>
        <LinkButton to="/" variant="ghost">
          ← Voltar ao início
        </LinkButton>
      </div>
    </PageShell>
  );
}
