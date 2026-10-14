import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Check } from "lucide-react";
import { PageHeader } from "@/components/ui-game";
import { LecoSays } from "@/components/Leco";
import { useGame } from "@/lib/game";
import { PHASES, toneBg } from "@/lib/phases";

export const Route = createFileRoute("/aventura")({
  head: () => ({
    meta: [
      { title: "Mapa da Aventura — Coesão e Coerência" },
      { name: "description", content: "Mapa com as fases da aventura: coesão, conectivos, pronomes, coerência, desafio dos textos e fase final." },
      { property: "og:title", content: "Mapa da Aventura — Coesão e Coerência" },
      { property: "og:description", content: "Escolha uma fase e avance na aventura das palavras." },
    ],
  }),
  component: Aventura,
});

function Aventura() {
  const { phases, isUnlocked, finalDone } = useGame();
  const finalUnlocked = phases.includes(5);
  const offsets = ["md:ml-0", "md:ml-[30%]", "md:ml-[55%]", "md:ml-[30%]", "md:ml-0", "md:ml-[35%]"];
  return (
    <div>
      <PageHeader eyebrow="Mapa" title="Mapa da Aventura">Complete uma fase para desbloquear a próxima. Fases bloqueadas ainda podem ser estudadas!</PageHeader>
      <LecoSays mood="pensando">Siga a trilha! Cada fase concluída vale +20 XP.</LecoSays>
      <div className="relative mt-8 rounded-[2rem] bg-aqua-soft p-4 md:p-8">
        <div className="space-y-5">
          {PHASES.map((p, i) => {
            const done = phases.includes(p.id);
            const open = isUnlocked(p.id);
            return (
              <Link key={p.id} to="/fase/$id" params={{ id: String(p.id) }}
                className={`card-game flex max-w-md items-center gap-4 p-4 transition hover:-translate-y-1 ${offsets[i]} ${!open ? "opacity-75" : ""}`}>
                <span className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${toneBg[p.tone]} text-3xl shadow-pop ${open && !done ? "animate-pop" : ""}`}>
                  {p.emoji}
                  {done && <span className="absolute -right-2 -top-2 rounded-full bg-leaf p-1 text-primary-foreground"><Check className="h-4 w-4" /></span>}
                  {!open && <span className="absolute -right-2 -top-2 rounded-full bg-ink p-1 text-primary-foreground"><Lock className="h-4 w-4" /></span>}
                </span>
                <span>
                  <span className="text-sm font-bold uppercase text-muted-foreground">Fase {p.id} · {done ? "Concluída ✔" : open ? "Disponível" : "Bloqueada 🔒"}</span>
                  <span className="block font-display text-xl font-bold">{p.title}</span>
                  <span className="text-sm font-semibold text-muted-foreground">{p.short}</span>
                </span>
              </Link>
            );
          })}
          <Link to="/desafio" className={`flex max-w-md items-center gap-4 rounded-3xl bg-grad-grape p-5 text-primary-foreground shadow-soft transition hover:-translate-y-1 ${offsets[5]} ${!finalUnlocked ? "opacity-80" : ""}`}>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card/25 text-3xl">👑</span>
            <span>
              <span className="text-sm font-bold uppercase">Fase Final · {finalDone ? "Concluída ✔" : finalUnlocked ? "Disponível" : "Bloqueada 🔒 (complete a fase 5)"}</span>
              <span className="block font-display text-2xl font-bold">Mestre dos Textos</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
