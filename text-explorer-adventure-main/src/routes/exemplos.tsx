import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/ui-game";
import { LecoSays } from "@/components/Leco";
import { useGame } from "@/lib/game";

export const Route = createFileRoute("/exemplos")({
  head: () => ({
    meta: [
      { title: "Você consegue identificar? — Exemplos interativos" },
      { name: "description", content: "Clique nas palavras para identificar conectivos, pronomes, retomadas e problemas de coesão e coerência." },
      { property: "og:title", content: "Você consegue identificar?" },
      { property: "og:description", content: "Exemplos interativos de coesão e coerência." },
    ],
  }),
  component: Exemplos,
});

type Tag = "conectivo" | "pronome" | "retomado" | "coesao" | "coerencia";
type Piece = string | { w: string; tag: Tag; info: string };

const TAGS: Record<Tag, { label: string; cls: string; icon: string }> = {
  conectivo: { label: "Conectivo / relação de sentido", cls: "bg-tangerine-soft border-tangerine", icon: "🌉" },
  pronome: { label: "Pronome", cls: "bg-sky-soft border-sky", icon: "🔵" },
  retomado: { label: "Palavra retomada", cls: "bg-leaf-soft border-leaf", icon: "🎯" },
  coesao: { label: "Problema de coesão", cls: "bg-bubble-soft border-bubble", icon: "🔗" },
  coerencia: { label: "Problema de coerência", cls: "bg-grape-soft border-grape", icon: "💡" },
};

const TEXTS: { title: string; pieces: Piece[] }[] = [
  {
    title: "Texto 1 — A excursão",
    pieces: [
      "A turma queria visitar o museu, ",
      { w: "mas", tag: "conectivo", info: "“Mas” = oposição: a turma queria ir, porém algo impediu." },
      " o ônibus quebrou. ",
      { w: "Por isso", tag: "conectivo", info: "“Por isso” = consequência: o passeio foi adiado por causa do ônibus." },
      ", a ", { w: "professora", tag: "retomado", info: "Palavra retomada depois pelo pronome “ela”." },
      " remarcou o passeio. ",
      { w: "Ela", tag: "pronome", info: "“Ela” retoma “professora”, evitando repetição." },
      " avisou os pais ", { w: "porque", tag: "conectivo", info: "“Porque” = causa: explica o motivo do aviso." },
      " eles precisavam assinar a autorização.",
    ],
  },
  {
    title: "Texto 2 — Encontre os problemas",
    pieces: [
      "Paulo adora acordar cedo. ",
      { w: "Paulo", tag: "coesao", info: "Repetição desnecessária do nome. Melhor: “Ele”." },
      " acorda às 6h todos os dias. ",
      { w: "Mas", tag: "coesao", info: "Conectivo inadequado: não há oposição. Melhor: “Por isso” ou “Assim”." },
      " ele chega sempre na hora. Ontem, ",
      { w: "Paulo dormiu até meio-dia porque adora acordar cedo", tag: "coerencia", info: "Contradição: dormir até meio-dia não combina com “adora acordar cedo” como causa." },
      ".",
    ],
  },
];

function Exemplos() {
  const { mode } = useGame();
  const [found, setFound] = useState<Record<string, string>>({});
  const total = TEXTS.reduce((a, t) => a + t.pieces.filter((p) => typeof p !== "string").length, 0);
  const count = Object.keys(found).length;
  const texts = mode === "infantil" ? TEXTS.slice(0, 1) : TEXTS;

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Exemplos" title="Você consegue identificar?" tone="leaf">Toque nas palavras escondidas para descobrir o que elas fazem no texto.</PageHeader>
      <LecoSays mood={count ? "surpreso" : "pensando"}>{count ? `Você encontrou ${count} de ${mode === "infantil" ? texts[0]!.pieces.filter((p) => typeof p !== "string").length : total} pistas!` : "Procure as palavras com borda pontilhada. Clique nelas!"}</LecoSays>
      <div className="flex flex-wrap gap-2 text-sm font-bold">
        {Object.entries(TAGS).map(([k, v]) => <span key={k} className={`rounded-full border-2 px-3 py-1 ${v.cls}`}>{v.icon} {v.label}</span>)}
      </div>
      {texts.map((t, ti) => (
        <Section key={ti}>
          <h2 className="mb-4 text-2xl font-bold">{t.title}</h2>
          <p className="text-xl leading-loose">
            {t.pieces.map((p, pi) => {
              if (typeof p === "string") return <span key={pi}>{p}</span>;
              const id = `${ti}-${pi}`;
              const isF = found[id];
              return (
                <button key={pi} onClick={() => setFound({ ...found, [id]: p.info })}
                  className={`mx-0.5 rounded-lg border-2 px-1 font-semibold ${isF ? TAGS[p.tag].cls : "border-dashed border-muted-foreground/50 hover:bg-sun-soft"}`}
                  aria-label={isF ? `${p.w}: ${TAGS[p.tag].label}` : `Palavra para investigar: ${p.w}`}>
                  {isF && TAGS[p.tag].icon} {p.w}
                </button>
              );
            })}
          </p>
          <ul className="mt-4 space-y-2">
            {t.pieces.map((p, pi) => typeof p !== "string" && found[`${ti}-${pi}`] && (
              <li key={pi} className={`rounded-xl border-2 p-3 animate-fade-in ${TAGS[p.tag].cls}`}><strong>{TAGS[p.tag].icon} {TAGS[p.tag].label} — “{p.w}”:</strong> {p.info}</li>
            ))}
          </ul>
        </Section>
      ))}
    </div>
  );
}
