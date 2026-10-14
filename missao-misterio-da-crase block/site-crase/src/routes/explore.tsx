import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ActionButton, Badge, LinkButton, PageShell, Panel } from "@/components/ui-kit";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Mapa mental, vídeo, áudio e infográfico" },
      {
        name: "description",
        content:
          "Recursos multimídia sobre regência e crase: mapa mental interativo, espaço para vídeo, plantão em áudio e infográfico Crase em 30 segundos.",
      },
      { property: "og:title", content: "Explore — Recursos da investigação" },
      {
        property: "og:description",
        content: "Mapa mental, vídeo, áudio e infográfico para revisar regência e crase.",
      },
    ],
  }),
  component: Explore,
});

const MAPA: { id: string; ramo: string; label: string; detalhe: string }[] = [
  {
    id: "verbal",
    ramo: "REGÊNCIA",
    label: "verbal",
    detalhe: "Relação entre verbo e complemento. Ex.: Gosto de música (gostar → de).",
  },
  {
    id: "nominal",
    ramo: "REGÊNCIA",
    label: "nominal",
    detalhe: "Relação entre nome e complemento. Ex.: necessidade de ajuda (necessidade → de).",
  },
  {
    id: "prep",
    ramo: "REGÊNCIA",
    label: "preposições",
    detalhe: "Cada palavra exige sua preposição: obedecer a, precisar de, preferir a, aspirar a.",
  },
  {
    id: "fusao",
    ramo: "CRASE",
    label: "A + A = À",
    detalhe: "Crase é a fusão da preposição a com o artigo feminino a.",
  },
  {
    id: "usar",
    ramo: "CRASE",
    label: "quando usar",
    detalhe: "Palavras femininas (Fui à escola), horas (às 8h) e locuções (à noite, às vezes).",
  },
  {
    id: "nao",
    ramo: "CRASE",
    label: "quando não usar",
    detalhe:
      "Antes de verbo (comecei a estudar), palavra masculina (a pé), pronome pessoal (a ela) e palavras repetidas (cara a cara).",
  },
  {
    id: "macete",
    ramo: "CRASE",
    label: "macete",
    detalhe: "Troque o feminino pelo masculino: se aparecer AO, use À.",
  },
];

const RESUMO_TXT = `MISSÃO: O MISTÉRIO DA CRASE — RESUMO

REGÊNCIA
- Regência é a relação entre uma palavra e o termo que completa seu sentido.
- Regência verbal: verbo + complemento (gostar de, precisar de, obedecer a, assistir a, chegar a, ir a, preferir a, aspirar a).
- Regência nominal: nome + complemento (necessidade de, respeito a, apto a).

CRASE
- Crase = preposição A + artigo feminino A = À.
- USA-SE: antes de palavras femininas (Fui à escola), antes de horas (às 8h) e em locuções femininas (à noite, à tarde, às vezes, à esquerda).
- NÃO SE USA: antes de palavra masculina (a pé), antes de verbo (começou a estudar), antes de pronome pessoal (a ela) e em palavras repetidas (cara a cara).

MACETE — TESTE DO MASCULINO
- Troque a palavra feminina por uma masculina.
- Se aparecer AO, geralmente haverá À na versão feminina.
- Vou à escola → Vou ao colégio → correto: Vou à escola.

CRASE EM 30 SEGUNDOS
1) Existe preposição A?
2) A palavra aceita artigo A?
Sim + Sim = À. Ex.: Vou à escola.
`;

function Explore() {
  const [aberto, setAberto] = useState<string | null>("fusao");

  const baixarResumo = () => {
    const blob = new Blob([RESUMO_TXT], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resumo-regencia-e-crase.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell
      eyebrow="Etapa 4 · Central de recursos"
      title="🔎 EXPLORE"
      subtitle="Quatro recursos de apoio à investigação: mapa mental, vídeo, áudio e infográfico."
    >
      <div className="grid gap-6">
        <Panel>
          <Badge tone="primary">Recurso 1 · Mapa mental interativo</Badge>
          <p className="mt-3 text-sm text-muted-foreground">
            Clique em cada ramo para abrir a explicação.
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {["REGÊNCIA", "CRASE"].map((ramo) => (
              <div key={ramo} className="rounded-xl border border-border bg-secondary/30 p-4">
                <h3 className="text-center font-display text-lg font-bold text-primary-glow">
                  {ramo}
                </h3>
                <div className="mt-3 grid gap-2">
                  {MAPA.filter((n) => n.ramo === ramo).map((n) => (
                    <div key={n.id}>
                      <button
                        type="button"
                        onClick={() => setAberto((a) => (a === n.id ? null : n.id))}
                        aria-expanded={aberto === n.id}
                        className={`min-h-11 w-full rounded-lg border px-4 py-2 text-left text-sm font-bold transition-all ${
                          aberto === n.id
                            ? "border-primary bg-primary/20 text-primary-glow"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        → {n.label}
                      </button>
                      {aberto === n.id && (
                        <p className="animate-pop mt-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                          {n.detalhe}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-6 md:grid-cols-2">
          <Panel hover>
            <Badge tone="accent">Recurso 2 · Vídeo</Badge>
            <h3 className="mt-3 text-lg font-bold">🎥 Regência e Crase em 3 minutos</h3>
            <div className="mt-4 grid aspect-video place-items-center rounded-xl border border-dashed border-border bg-secondary/40 text-center">
              <div>
                <span className="text-4xl">▶</span>
                <p className="mt-2 text-sm text-muted-foreground">
                  Espaço reservado para o vídeo da equipe
                </p>
                <p className="text-xs text-muted-foreground">
                  Basta inserir aqui o link/incorporação quando o vídeo estiver pronto.
                </p>
              </div>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li>👤 Pessoa 1 — Regência verbal</li>
              <li>👤 Pessoa 2 — Regência nominal</li>
              <li>👤 Pessoa 3 — Preposições</li>
              <li>👤 Pessoa 4 — Crase</li>
            </ul>
          </Panel>

          <Panel hover>
            <Badge tone="danger">Recurso 3 · Áudio</Badge>
            <h3 className="mt-3 text-lg font-bold">🎙️ PLANTÃO DA LÍNGUA PORTUGUESA</h3>
            <p className="mt-3 rounded-lg border border-border bg-secondary/40 p-4 text-sm italic text-muted-foreground">
              “Plantão! Um erro grave de crase foi encontrado na frase ‘Fui a escola’. Nossa equipe
              foi investigar...”
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/30 p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/15 text-xl">
                🔊
              </span>
              <div className="min-w-0">
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-full w-0 rounded-full bg-primary" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Área preparada para o arquivo de áudio da reportagem.
                </p>
              </div>
            </div>
          </Panel>
        </div>

        <Panel>
          <Badge tone="gold">Recurso 4 · Infográfico</Badge>
          <h3 className="mt-3 text-lg font-bold">⏱️ CRASE EM 30 SEGUNDOS</h3>
          <div className="mt-5 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="rounded-xl border border-primary/40 bg-primary/10 p-4 text-center text-sm font-bold">
              Existe preposição A?
            </div>
            <span aria-hidden className="text-center text-2xl text-muted-foreground">
              →
            </span>
            <div className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-center text-sm font-bold">
              A palavra aceita artigo A?
            </div>
            <span aria-hidden className="text-center text-2xl text-muted-foreground">
              →
            </span>
            <div className="rounded-xl bg-gradient-to-r from-primary to-accent p-4 text-center font-display text-xl font-bold text-primary-foreground">
              Sim + Sim = À
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-sm">Exemplo: “Vou à escola.”</p>
          <div className="mt-5 flex justify-center">
            <ActionButton variant="gold" onClick={baixarResumo}>
              📥 BAIXAR RESUMO
            </ActionButton>
          </div>
        </Panel>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton to="/desafio">🎮 Iniciar o DESAFIO</LinkButton>
        <LinkButton to="/exemplos" variant="ghost">
          ← Voltar para Exemplos
        </LinkButton>
      </div>
    </PageShell>
  );
}
