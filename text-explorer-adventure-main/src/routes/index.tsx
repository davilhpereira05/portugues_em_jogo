import { createFileRoute, Link } from "@tanstack/react-router";
import { Leco } from "@/components/Leco";
import { ProgressBar } from "@/components/ui-game";
import { useGame } from "@/lib/game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Aventura da Coesão e da Coerência — Português em Jogo" },
      { name: "description", content: "Aprenda, pratique e teste seus conhecimentos sobre coesão e coerência textual com jogos, quiz e o guia Leco." },
      { property: "og:title", content: "A Aventura da Coesão e da Coerência" },
      { property: "og:description", content: "Aprenda, pratique e teste seus conhecimentos sobre coesão e coerência textual." },
    ],
  }),
  component: Index,
});

function Index() {
  const { progress, mode } = useGame();
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] bg-grad-sky p-6 text-primary-foreground shadow-soft md:p-12">
        <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-sun/40 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-60 w-60 rounded-full bg-bubble/30 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-3 inline-block rounded-full bg-sun px-4 py-1 font-display font-bold text-ink shadow-pop">Grupo 03 · Português em Jogo</p>
            <h1 className="text-4xl font-bold leading-tight drop-shadow md:text-6xl">A AVENTURA DA COESÃO E DA COERÊNCIA</h1>
            <p className="mt-3 font-display text-xl font-semibold md:text-2xl">Aprenda, pratique e teste seus conhecimentos.</p>
            <p className="mt-4 max-w-xl text-lg font-semibold opacity-95">
              {mode === "infantil"
                ? "Vamos brincar com as palavras! Você vai ligar ideias e criar textos que fazem sentido."
                : "Prepare-se para uma aventura pelo mundo das palavras. Você vai aprender a conectar ideias, organizar frases e descobrir como construir textos que fazem sentido."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/aventura" className="btn-game bg-sun text-ink">🚀 COMEÇAR A AVENTURA</Link>
              <Link to="/aprender" className="btn-game bg-card text-sky-deep">📘 APRENDER O CONTEÚDO</Link>
              <Link to="/jogos" className="btn-game bg-tangerine text-ink">🎯 VER DESAFIOS</Link>
            </div>
            <div className="mt-6 max-w-md rounded-2xl bg-card/95 p-3 text-ink">
              <ProgressBar value={progress} label="Aventura concluída" />
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="relative mb-2 rounded-2xl bg-card px-4 py-3 font-bold text-ink shadow-soft animate-pop">
              Olá! Vamos descobrir como deixar os textos muito mais legais?
            </div>
            <Leco mood="feliz" size={240} className="animate-float" />
            <p className="font-display text-lg font-bold">Leco, o Explorador das Palavras</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="card-game border-sky p-6">
          <p className="text-4xl">🔗</p>
          <h2 className="mt-2 text-3xl font-bold text-sky-deep">Coesão</h2>
          <p className="mt-1 text-lg font-semibold">= <strong>conexão</strong> entre as partes do texto.</p>
        </div>
        <div className="card-game border-grape p-6">
          <p className="text-4xl">💡</p>
          <h2 className="mt-2 text-3xl font-bold text-grape-deep">Coerência</h2>
          <p className="mt-1 text-lg font-semibold">= <strong>sentido</strong> e organização das ideias.</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { e: "📚", t: "Aprender", d: "Explicações curtas e visuais.", to: "/aprender" as const, c: "bg-sky-soft" },
          { e: "🎮", t: "Jogar", d: "Arraste, descubra, cace frases.", to: "/jogos" as const, c: "bg-tangerine-soft" },
          { e: "🧭", t: "Explorar", d: "Mapa mental e infográfico.", to: "/explore" as const, c: "bg-aqua-soft" },
          { e: "🏅", t: "Conquistar", d: "XP, medalhas e desafio final.", to: "/conquistas" as const, c: "bg-sun-soft" },
        ].map((x) => (
          <Link key={x.t} to={x.to} className={`card-game ${x.c} p-5 transition hover:-translate-y-1`}>
            <p className="text-4xl">{x.e}</p>
            <p className="mt-2 font-display text-2xl font-bold">{x.t}</p>
            <p className="font-semibold text-muted-foreground">{x.d}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
