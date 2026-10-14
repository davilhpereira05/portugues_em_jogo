import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, Sparkles, Swords } from "lucide-react";
import { ProgressDashboard } from "@/components/ProgressDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Concordância Verbal & Nominal — Revisão gamificada" },
      {
        name: "description",
        content:
          "Uma palavra fora do lugar pode mudar tudo. Aprenda, pratique e evolua na concordância verbal e nominal com XP, combos e 15 desafios.",
      },
      { property: "og:title", content: "Concordância Verbal & Nominal" },
      {
        property: "og:description",
        content:
          "Plataforma gamificada para revisar concordância verbal e nominal no Ensino Médio: aprenda, pratique, erre, entenda e evolua.",
      },
    ],
  }),
  component: Inicio,
});

const frasesFlutuantes = [
  { texto: "“Os alunos chegaram.”", classe: "left-[4%] top-[14%] animate-float-slow" },
  {
    texto: "“A maioria dos estudantes participou.”",
    classe: "right-[5%] top-[24%] [animation-delay:-3s] animate-float-slow",
  },
  { texto: "“Havia muitas pessoas.”", classe: "left-[8%] bottom-[16%] [animation-delay:-5s] animate-float-slow" },
  {
    texto: "“As equipes chegaram ao local.”",
    classe: "right-[10%] bottom-[10%] [animation-delay:-1.5s] animate-float-slow",
  },
];

const etapas = [
  { titulo: "Aprenda", texto: "Conteúdo em cards curtos, com exemplo certo e errado.", rota: "/aprenda" as const },
  { titulo: "Pratique", texto: "Testes rápidos, laboratório de frases e caça ao erro.", rota: "/laboratorio" as const },
  { titulo: "Desafie-se", texto: "15 atividades diferentes com XP, combo e timer.", rota: "/desafio" as const },
  { titulo: "Evolua", texto: "Resultado, gabarito explicado e revisão dos seus erros.", rota: "/gabarito" as const },
];

function Inicio() {
  return (
    <main>
      <section className="hero-glow relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {frasesFlutuantes.map((frase) => (
            <span
              key={frase.texto}
              className={`absolute rounded-xl border border-border bg-card/70 px-3 py-1.5 font-display text-sm text-muted-foreground shadow-soft backdrop-blur ${frase.classe}`}
            >
              {frase.texto}
            </span>
          ))}
          <span className="absolute left-[46%] top-[8%] size-3 rounded-full bg-accent/60 animate-float-slow" />
          <span className="absolute right-[28%] bottom-[22%] size-5 rotate-45 rounded bg-primary/30 animate-float-slow [animation-delay:-4s]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur">
            <Sparkles className="size-3.5" aria-hidden />
            Português em Jogo
          </p>
          <h1 className="mt-6 font-display text-6xl font-bold tracking-tighter sm:text-8xl">
            <span className="text-brand-gradient">Concordância Verbal &amp; Nominal</span>
          </h1>
          <p className="mt-3 font-display text-xl font-semibold sm:text-2xl">
            Aprenda, pratique e evolua
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            “Uma palavra fora do lugar pode mudar tudo.”
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/desafio"
              className="brand-gradient inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <Swords className="size-4" aria-hidden />
              Começar desafio
            </Link>
            <Link
              to="/aprenda"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide transition-colors hover:bg-secondary"
            >
              <BookOpen className="size-4" aria-hidden />
              Aprender primeiro
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Compass className="size-4" aria-hidden />
              Como funciona?
            </a>
          </div>

          <p className="mt-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Não apenas ler — aprender → praticar → errar → entender → evoluir
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <ProgressDashboard />

        <section id="como-funciona" className="mt-14 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Como funciona?</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            “Não leia. Jogue. Erre. Entenda. Tente novamente.” Cada etapa da plataforma tem uma
            interação — e todo o seu progresso fica salvo no próprio navegador.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {etapas.map((etapa, i) => (
              <Link
                key={etapa.titulo}
                to={etapa.rota}
                className="surface-card group p-5 transition-transform hover:-translate-y-1"
              >
                <span className="font-display text-3xl font-bold text-accent/40">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{etapa.titulo}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{etapa.texto}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Acessar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="surface-card mt-14 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">⚡ Resumão</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-secondary/40 p-5">
              <h3 className="font-display text-base font-bold">Concordância verbal</h3>
              <p className="mt-2 font-display text-xl font-bold text-accent">SUJEITO ↔ VERBO</p>
              <p className="mt-2 text-sm text-muted-foreground">
                O verbo se ajusta ao número e à pessoa do sujeito.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/40 p-5">
              <h3 className="font-display text-base font-bold">Concordância nominal</h3>
              <p className="mt-2 font-display text-xl font-bold text-accent">
                SUBSTANTIVO ↔ PALAVRAS QUE O ACOMPANHAM
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Artigo, adjetivo, pronome e numeral seguem o substantivo em gênero e número.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
