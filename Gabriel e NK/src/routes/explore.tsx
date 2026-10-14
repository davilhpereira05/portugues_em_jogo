import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Film, Play, RotateCcw } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { MindMap } from "@/components/MindMap";
import { MissionCard } from "@/components/MissionCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Infográfico, mapa mental e animação | Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Área multimídia da plataforma: infográfico de concordância, mapa mental interativo, espaço para vídeo e animação de correção de frase.",
      },
      { property: "og:title", content: "Explore a concordância em recursos visuais" },
      {
        property: "og:description",
        content: "Infográfico, mapa mental clicável, espaço para vídeo e animação de correção.",
      },
    ],
  }),
  component: Explore,
});

function Animacao() {
  const [etapa, setEtapa] = useState(0);

  return (
    <div className="surface-card p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold">Animação — o verbo se ajusta</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Clique em “Corrigir” e veja a frase se ajustar ao sujeito.
      </p>

      <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-6 text-center">
        <p className="font-display text-2xl font-bold sm:text-3xl">
          Os alunos{" "}
          <span
            className={cn(
              "inline-block rounded-lg px-2 transition-all duration-500",
              etapa === 0 && "bg-destructive/20 text-destructive",
              etapa >= 1 && "animate-pop bg-success/20 text-success",
            )}
          >
            {etapa === 0 ? "estudou" : "estudaram"}
          </span>
          .
        </p>
        <p className="mt-3 text-sm font-semibold">
          {etapa === 0 ? "estudou ❌" : "estudaram ✅"}
        </p>
        {etapa >= 1 ? (
          <p className="animate-rise mt-4 text-sm text-muted-foreground">
            O verbo concorda com o sujeito: “os alunos” está no plural, então o verbo também vai
            para o plural.
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setEtapa(1)}
          disabled={etapa === 1}
          className="brand-gradient inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-40"
        >
          <Play className="size-4" aria-hidden />
          Corrigir
        </button>
        <button
          type="button"
          onClick={() => setEtapa(0)}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          <RotateCcw className="size-4" aria-hidden />
          Recomeçar
        </button>
      </div>
    </div>
  );
}

function Infografico() {
  return (
    <div className="surface-card p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold">Infográfico — sujeito ↔ verbo</h3>
      <div className="mt-5 grid gap-4">
        <p className="brand-gradient rounded-xl px-4 py-3 text-center font-display text-base font-bold uppercase tracking-[0.2em] text-primary-foreground">
          Concordância
        </p>
        <p className="text-center font-display text-sm font-bold text-accent">SUJEITO ↔ VERBO</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Singular</p>
            <p className="mt-2 font-display text-lg font-bold">
              aluno <span className="text-accent">→</span> estudou
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Um núcleo, verbo no singular.</p>
          </div>
          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Plural</p>
            <p className="mt-2 font-display text-lg font-bold">
              alunos <span className="text-accent">→</span> estudaram
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Mais de um, verbo no plural.</p>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { titulo: "Número", detalhe: "singular / plural" },
            { titulo: "Pessoa", detalhe: "eu, tu, ele, nós…" },
            { titulo: "Bloco nominal", detalhe: "artigo + substantivo + adjetivo" },
          ].map((item) => (
            <div key={item.titulo} className="rounded-xl border border-accent/30 bg-accent/5 p-3 text-center">
              <p className="font-display text-sm font-bold">{item.titulo}</p>
              <p className="text-xs text-muted-foreground">{item.detalhe}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EspacoVideo() {
  return (
    <div className="surface-card p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold">Vídeo educativo (1–3 min)</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Espaço reservado para o vídeo da dupla. Quando o arquivo estiver pronto, ele entra aqui sem
        mudar o resto da página.
      </p>
      <div className="mt-4 grid aspect-video place-items-center rounded-xl border-2 border-dashed border-accent/40 bg-secondary/30 text-center">
        <div className="px-6">
          <Film className="mx-auto size-10 text-accent" aria-hidden />
          <p className="mt-3 font-display text-base font-bold">Vídeo ainda não publicado</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Componente pronto para receber o vídeo — nenhum link inventado.
          </p>
        </div>
      </div>
    </div>
  );
}

function Explore() {
  return (
    <PageShell
      etiqueta="Explore"
      titulo="Recursos visuais e multimídia"
      descricao="Quatro recursos para entender a concordância de outra forma: infográfico, mapa mental interativo, espaço de vídeo e animação de correção."
    >
      <div className="grid gap-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <Infografico />
          <Animacao />
        </div>
        <MindMap />
        <EspacoVideo />
        <MissionCard
          id="missao-explore"
          titulo="Explorar os recursos multimídia"
          descricao="Use o infográfico, abra ramos do mapa mental e rode a animação de correção."
        />
      </div>
    </PageShell>
  );
}
