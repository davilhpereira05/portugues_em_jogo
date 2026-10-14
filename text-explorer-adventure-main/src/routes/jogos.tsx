import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/ui-game";
import { ConstruaPonte, DetetivePronomes, CacaFrase } from "@/components/games";
import { useGame } from "@/lib/game";

export const Route = createFileRoute("/jogos")({
  head: () => ({
    meta: [
      { title: "Jogos — Construa a Ponte, Detetive dos Pronomes e Caça à Frase" },
      { name: "description", content: "Jogos interativos para praticar conectivos, pronomes e coerência textual." },
      { property: "og:title", content: "Jogos — Português em Jogo" },
      { property: "og:description", content: "Pratique coesão e coerência jogando." },
    ],
  }),
  component: Jogos,
});

const GAMES = [
  { id: "ponte", t: "Construa a Ponte", e: "🌉", d: "Arraste o conectivo certo.", c: "bg-tangerine", phase: 2 },
  { id: "detetive", t: "Detetive dos Pronomes", e: "🔍", d: "Descubra quem é quem.", c: "bg-sky", phase: 3 },
  { id: "caca", t: "Caça à Frase Estranha", e: "🕵️", d: "Encontre a frase sem sentido.", c: "bg-grape", phase: 4 },
] as const;

function Jogos() {
  const [g, setG] = useState<(typeof GAMES)[number]["id"]>("ponte");
  const [k, setK] = useState(0);
  const { completePhase } = useGame();
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Jogos" title="Escolha seu desafio" tone="sun">Cada acerto vale +10 XP. Completar um jogo conclui a fase correspondente!</PageHeader>
      <div className="grid gap-4 sm:grid-cols-3">
        {GAMES.map((x) => (
          <button key={x.id} onClick={() => { setG(x.id); setK(k + 1); }} aria-pressed={g === x.id}
            className={`rounded-3xl p-5 text-left text-primary-foreground shadow-pop transition hover:-translate-y-1 ${x.c} ${g === x.id ? "ring-4 ring-ink ring-offset-2" : ""}`}>
            <span className="text-4xl">{x.e}</span>
            <span className="mt-2 block font-display text-xl font-bold">{x.t}</span>
            <span className="font-semibold">{x.d}</span>
          </button>
        ))}
      </div>
      <Section key={`${g}-${k}`}>
        {g === "ponte" && <ConstruaPonte onComplete={() => completePhase(2)} />}
        {g === "detetive" && <DetetivePronomes onComplete={() => completePhase(3)} />}
        {g === "caca" && <CacaFrase onComplete={() => completePhase(4)} />}
      </Section>
      <div className="flex flex-wrap gap-3">
        <Link to="/quiz" className="btn-game bg-sky text-primary-foreground">Ir para o Quiz →</Link>
        <Link to="/desafio" className="btn-game bg-grape text-primary-foreground">Desafio Final 👑</Link>
      </div>
    </div>
  );
}
