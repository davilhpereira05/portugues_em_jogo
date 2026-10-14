import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/ui-game";
import { LESSONS } from "@/components/lessons";
import { PHASES } from "@/lib/phases";

export const Route = createFileRoute("/aprender")({
  head: () => ({
    meta: [
      { title: "Aprender — Coesão, Coerência, Conectivos e Pronomes" },
      { name: "description", content: "Todo o conteúdo de coesão e coerência textual em linguagem simples, com exemplos visuais." },
      { property: "og:title", content: "Aprender — Coesão e Coerência" },
      { property: "og:description", content: "Conteúdo completo e visual de coesão e coerência textual." },
    ],
  }),
  component: Aprender,
});

function Aprender() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Conteúdo" title="Aprender o conteúdo">Coesão = conexão entre as partes. Coerência = sentido e organização das ideias.</PageHeader>
      <nav className="flex flex-wrap gap-2" aria-label="Tópicos">
        {PHASES.map((p) => <a key={p.id} href={`#t${p.id}`} className="rounded-full bg-card px-4 py-2 font-bold shadow-soft hover:bg-sky-soft">{p.emoji} {p.title}</a>)}
      </nav>
      {PHASES.map((p, i) => {
        const L = LESSONS[i]!;
        return (
          <Section key={p.id}>
            <h2 id={`t${p.id}`} className="mb-4 scroll-mt-32 text-3xl font-bold text-sky-deep">{p.emoji} {p.title}</h2>
            <L />
            <Link to="/fase/$id" params={{ id: String(p.id) }} className="btn-game mt-6 bg-tangerine text-ink">Praticar esta fase →</Link>
          </Section>
        );
      })}
    </div>
  );
}
