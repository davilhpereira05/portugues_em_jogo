import { createFileRoute } from "@tanstack/react-router";
import { GameShell } from "@/components/GameShell";
import { GameLink } from "@/components/GameButton";
import davi from "@/assets/davi-avatar.png";
import joao from "@/assets/joao-avatar.png";
import board from "@/assets/language-game-board.png";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Liga das Variedades — Português em Jogo" },
    { name: "description", content: "Comece uma jornada gamificada pela variação linguística e pelos níveis de linguagem." },
    { property: "og:title", content: "Liga das Variedades — Português em Jogo" },
    { property: "og:description", content: "Sete fases de revisão para o PASSE e AVALIA II." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Home,
});

function Home() { return <GameShell>
  <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-12 lg:py-20">
    <div className="animate-pop lg:col-span-7"><span className="phase-chip">🎮 PROJETO GAMIFICADO · GRUPO 04</span><h1 className="mt-6 font-display text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">Liga das <span className="block text-primary">Variedades</span><span className="mt-3 block text-3xl sm:text-4xl">A jornada da linguagem</span></h1><p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-muted-foreground">A língua está viva — e você entrou no jogo! Atravesse sete fases, desvende sotaques, registros e mudanças históricas, some pontos e chegue preparado ao <strong>PASSE / AVALIA II</strong>.</p><div className="mt-8 flex flex-wrap gap-4"><GameLink to="/aprenda">▶ Começar a jogar</GameLink><GameLink to="/desafio" tone="paper">Ir para o quiz</GameLink></div><div className="mt-9 flex items-center gap-4"><div className="flex -space-x-3"><img src={davi} alt="Avatar de Davi Luiz" width={816} height={816} className="h-14 w-14 rounded-full border-4 border-foreground object-cover"/><img src={joao} alt="Avatar de João Cunha" width={816} height={816} className="h-14 w-14 rounded-full border-4 border-foreground object-cover"/></div><p className="text-sm font-extrabold">Por <span className="text-primary">Davi Luiz</span> & <span className="text-primary">João Cunha</span></p></div>
    </div>
    <div className="lg:col-span-5"><div className="game-card"><div className="mb-4 flex items-center justify-between"><strong className="font-display text-xl">Missão 01</strong><span className="rounded-full border-2 border-foreground bg-success px-3 py-1 text-xs font-black">EM JOGO</span></div><img src={board} alt="Tabuleiro com mapa do Brasil, microfone e balões de fala" width={1024} height={768} className="aspect-[4/3] w-full rounded-2xl border-2 border-foreground object-cover"/><div className="mt-5 flex justify-between text-xs font-black"><span>JORNADA</span><span>1 / 7 FASES</span></div><div className="mt-2 h-4 overflow-hidden rounded-full border-2 border-foreground bg-muted"><div className="h-full w-[14%] bg-primary"/></div></div></div>
  </section>
  <section className="mx-auto max-w-7xl px-4 pb-8"><h2 className="font-display text-2xl font-bold">Seu mapa de missões</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">{["Aprenda","Exemplos","Explore","Quiz","Gabarito","Boss Fight","Vitória"].map((x,i)=><div key={x} className={`rounded-xl border-2 border-foreground p-3 font-extrabold ${i===0?"bg-accent":"bg-card"}`}><span className="text-xs opacity-60">0{i+1}</span><p>{x}</p></div>)}</div></section>
</GameShell> }
