import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/ui-game";
import { Leco } from "@/components/Leco";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Mapa mental e infográfico de coesão e coerência" },
      { name: "description", content: "Recursos multimídia: mapa mental interativo, infográfico comparativo e espaço para vídeo educativo." },
      { property: "og:title", content: "Explore — Recursos multimídia" },
      { property: "og:description", content: "Mapa mental interativo e infográfico sobre coesão e coerência." },
    ],
  }),
  component: Explore,
});

const NODES = {
  root: { label: "COESÃO E COERÊNCIA", info: "Duas qualidades de um bom texto: as partes ligadas (coesão) e as ideias com sentido (coerência)." },
  coesao: { label: "Coesão", info: "Conexão entre as partes do texto, feita por palavras e expressões." },
  conectivos: { label: "Conectivos", info: "Palavras que ligam orações: e, mas, porque, por isso, portanto." },
  pronomes: { label: "Pronomes", info: "Substituem ou retomam nomes: ele, ela, o, a, lhe, isso." },
  retomadas: { label: "Retomadas", info: "Voltar a algo já dito sem repetir: pronomes, sinônimos, “lá”, “tal fato”." },
  relacoes: { label: "Relações de sentido", info: "Adição, oposição, causa, consequência, conclusão, tempo, condição…" },
  coerencia: { label: "Coerência", info: "Quando as ideias combinam entre si e com o mundo." },
  organizacao: { label: "Organização das ideias", info: "Ordem lógica: começo, meio e fim; uma ideia leva à outra." },
  sentido: { label: "Sentido do texto", info: "O texto não se contradiz e transmite uma mensagem clara." },
} as const;
type K = keyof typeof NODES;

function Explore() {
  const [sel, setSel] = useState<K>("root");
  const Node = ({ k, cls }: { k: K; cls: string }) => (
    <button onClick={() => setSel(k)} aria-pressed={sel === k}
      className={`rounded-2xl px-3 py-2 font-display font-semibold shadow-pop transition hover:-translate-y-0.5 ${cls} ${sel === k ? "ring-4 ring-ink ring-offset-2" : ""}`}>
      {NODES[k].label}
    </button>
  );
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Multimídia" title="Explore" tone="leaf">Dois recursos multimídia para revisar de um jeito visual.</PageHeader>

      <Section>
        <h2 className="mb-1 text-2xl font-bold text-sky-deep">🧠 Recurso 1 — Mapa mental interativo</h2>
        <p className="mb-5 text-muted-foreground">Clique em cada item do mapa.</p>
        <div className="flex flex-col items-center gap-6">
          <Node k="root" cls="bg-sun text-ink text-xl px-6 py-4" />
          <div className="grid w-full gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center gap-3 rounded-3xl bg-sky-soft p-4">
              <Node k="coesao" cls="bg-sky text-primary-foreground text-lg" />
              <div className="flex flex-wrap justify-center gap-2">
                <Node k="conectivos" cls="bg-card text-sky-deep" />
                <Node k="pronomes" cls="bg-card text-sky-deep" />
                <Node k="retomadas" cls="bg-card text-sky-deep" />
                <Node k="relacoes" cls="bg-card text-sky-deep" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-3xl bg-grape-soft p-4">
              <Node k="coerencia" cls="bg-grape text-primary-foreground text-lg" />
              <div className="flex flex-wrap justify-center gap-2">
                <Node k="organizacao" cls="bg-card text-grape-deep" />
                <Node k="sentido" cls="bg-card text-grape-deep" />
              </div>
            </div>
          </div>
          <div key={sel} className="flex w-full max-w-2xl items-center gap-4 rounded-2xl border-2 border-sun bg-sun-soft p-4 animate-pop" aria-live="polite">
            <Leco mood="surpreso" size={70} />
            <p><strong>{NODES[sel].label}:</strong> {NODES[sel].info}</p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="mb-5 text-2xl font-bold text-sky-deep">📊 Recurso 2 — Infográfico</h2>
        <div className="grid gap-0 overflow-hidden rounded-3xl md:grid-cols-2">
          <div className="bg-grad-sky p-6 text-primary-foreground">
            <p className="text-5xl">🔗</p>
            <h3 className="mt-2 text-4xl font-bold">COESÃO</h3>
            <p className="mt-2 text-xl font-bold">“Conecta as partes do texto.”</p>
            <ul className="mt-4 space-y-2 font-semibold">
              <li>🧰 Ferramentas: conectivos, pronomes, sinônimos</li>
              <li>👀 Aparece na superfície do texto (palavras)</li>
              <li>🧩 Pergunta-chave: “As frases estão ligadas?”</li>
              <li>📝 Ex.: “Estudei, <u>por isso</u> passei.”</li>
            </ul>
          </div>
          <div className="bg-grad-grape p-6 text-primary-foreground">
            <p className="text-5xl">💡</p>
            <h3 className="mt-2 text-4xl font-bold">COERÊNCIA</h3>
            <p className="mt-2 text-xl font-bold">“Faz as ideias terem sentido.”</p>
            <ul className="mt-4 space-y-2 font-semibold">
              <li>🧠 Depende da lógica e do conhecimento de mundo</li>
              <li>🌊 Está no sentido geral (ideias)</li>
              <li>❓ Pergunta-chave: “Isso faz sentido?”</li>
              <li>🚫 Ex. incoerente: “Estava com frio e tirei o casaco para me aquecer.”</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 rounded-2xl bg-sun-soft p-4 text-center font-bold">⚖️ Juntas, coesão + coerência = texto claro, ligado e com sentido!</p>
      </Section>

      <Section>
        <h2 className="mb-3 text-2xl font-bold text-sky-deep">🎬 Vídeo educativo</h2>
        <div className="flex aspect-video w-full flex-col items-center justify-center rounded-3xl border-4 border-dashed border-aqua bg-aqua-soft text-center" data-video-slot>
          <p className="text-6xl">▶️</p>
          <p className="mt-2 font-display text-xl font-bold">Espaço reservado para vídeo</p>
          <p className="max-w-sm text-muted-foreground">Aqui será incorporado um vídeo educativo sobre coesão e coerência.</p>
        </div>
      </Section>
    </div>
  );
}
