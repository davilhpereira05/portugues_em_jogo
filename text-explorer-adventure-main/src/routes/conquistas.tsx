import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, ProgressBar } from "@/components/ui-game";
import { LecoSays } from "@/components/Leco";
import { ACHIEVEMENTS, useGame, type AchievementId } from "@/lib/game";

export const Route = createFileRoute("/conquistas")({
  head: () => ({
    meta: [
      { title: "Conquistas e XP — Português em Jogo" },
      { name: "description", content: "Veja suas medalhas, XP, melhor pontuação e progresso na aventura." },
      { property: "og:title", content: "Conquistas — Português em Jogo" },
      { property: "og:description", content: "Medalhas e progresso da aventura de coesão e coerência." },
    ],
  }),
  component: Conquistas,
});

function Conquistas() {
  const { achievements, xp, bestScore, progress, phases, quizDone, finalDone } = useGame();
  const ids = Object.keys(ACHIEVEMENTS) as AchievementId[];
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Recompensas" title="Suas conquistas" tone="grape">Desbloqueie todas as medalhas para virar Mestre dos Textos!</PageHeader>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card-game bg-sun-soft p-5"><p className="text-sm font-bold uppercase">XP total</p><p className="font-display text-4xl font-bold">⭐ {xp}</p></div>
        <div className="card-game bg-leaf-soft p-5"><p className="text-sm font-bold uppercase">Melhor pontuação no quiz</p><p className="font-display text-4xl font-bold">🏆 {bestScore}</p></div>
        <div className="card-game bg-sky-soft p-5"><p className="text-sm font-bold uppercase">Fases</p><p className="font-display text-4xl font-bold">🗺️ {phases.length}/5</p><p className="text-sm font-semibold">Quiz {quizDone ? "✔" : "—"} · Final {finalDone ? "✔" : "—"}</p></div>
      </div>
      <ProgressBar value={progress} label="Aventura concluída" />
      <LecoSays mood={achievements.length === ids.length ? "comemorando" : "feliz"}>
        {achievements.length === ids.length ? "Você conquistou tudo! Incrível!" : `Você tem ${achievements.length} de ${ids.length} medalhas. Continue!`}
      </LecoSays>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map((id) => {
          const A = ACHIEVEMENTS[id];
          const has = achievements.includes(id);
          return (
            <div key={id} className={`card-game p-5 text-center ${has ? "border-sun animate-pop" : "opacity-60 grayscale"}`}>
              <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl ${has ? "bg-grad-sun shadow-pop" : "bg-muted"}`}>{has ? A.emoji : "🔒"}</div>
              <p className="mt-3 font-display text-xl font-bold">{A.title}</p>
              <p className="text-sm font-semibold text-muted-foreground">{A.desc}</p>
              <p className={`mt-2 text-sm font-bold ${has ? "text-leaf-deep" : "text-muted-foreground"}`}>{has ? "✔ Desbloqueada" : "Bloqueada"}</p>
            </div>
          );
        })}
      </div>
      <Link to="/aventura" className="btn-game bg-sky text-primary-foreground">Voltar ao mapa</Link>
    </div>
  );
}
