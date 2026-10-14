import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Search, Target, Map as MapIcon } from "lucide-react";
import heroAsset from "@/assets/hero.jpg.asset.json";
import { Pill } from "@/components/ui-partes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barroco & Arcadismo — Uma viagem pela literatura brasileira" },
      {
        name: "description",
        content:
          "Aprenda Barroco e Arcadismo com cards, comparações, quiz e um mapa literário gamificado.",
      },
      { property: "og:title", content: "Barroco & Arcadismo" },
      {
        property: "og:description",
        content:
          "Aprenda Barroco e Arcadismo com cards, comparações, quiz e um mapa literário gamificado.",
      },
    ],
  }),
  component: Inicio,
});

const cards = [
  {
    icone: BookOpen,
    titulo: "Conteúdo",
    texto: "Aprenda sobre o contexto histórico, características, linguagem, autores e obras.",
    to: "/barroco",
  },
  {
    icone: Search,
    titulo: "Comparação",
    texto: "Entenda rapidamente as diferenças entre Barroco e Arcadismo.",
    to: "/comparacao",
  },
  {
    icone: Target,
    titulo: "Quiz",
    texto: "Teste seus conhecimentos e descubra quanto você aprendeu.",
    to: "/quiz",
  },
  {
    icone: MapIcon,
    titulo: "Mapa literário",
    texto: "Explore os conceitos e desbloqueie novos caminhos.",
    to: "/mapa",
  },
] as const;

function Inicio() {
  return (
    <>
      <section className="relative isolate">
        <img
          src={heroAsset.url}
          alt="Ilustração unindo a estética barroca e a paisagem árcade"
          className="h-[62vh] min-h-[380px] w-full object-cover object-center sm:h-[70vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-barroco-deep from-15% via-barroco-deep/70 via-35% to-transparent to-60%" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-5 pb-8 text-center sm:pb-12">
          <Pill escuro>Uma viagem pela literatura brasileira</Pill>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-cream sm:text-base">
            Explore dois importantes movimentos da literatura brasileira, conheça suas
            características, autores e obras e descubra as principais diferenças entre eles.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/barroco"
              className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-barroco-deep shadow-xl transition-transform hover:-translate-y-0.5"
            >
              COMEÇAR A EXPERIÊNCIA
            </Link>
            <Link
              to="/barroco"
              className="rounded-full border border-gold/60 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-gold/15"
            >
              CONHECER O BARROCO
            </Link>
            <Link
              to="/arcadismo"
              className="rounded-full border border-arcadia-light/70 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-arcadia-light/20"
            >
              CONHECER O ARCADISMO
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">O que você vai encontrar?</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Conteúdo curto, atividades e progresso salvo enquanto você explora.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Link
              key={c.titulo}
              to={c.to}
              className="lift rise group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/50 hover:shadow-lg"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                <c.icone className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{c.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.texto}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50 py-14">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">🧠 Para não esquecer</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Revisão rápida antes do quiz.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-gold/30 bg-barroco p-6 text-cream shadow-lg">
              <h3 className="text-xl font-bold text-gold">BARROCO = CONFLITO</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "fé × razão",
                  "corpo × alma",
                  "pecado × perdão",
                  "religiosidade",
                  "contraste",
                  "linguagem elaborada",
                ].map((t) => (
                  <li key={t} className="rounded-lg bg-cream/10 px-3 py-2">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-arcadia/30 bg-arcadia-panel p-6 shadow-lg">
              <h3 className="text-xl font-bold text-arcadia">ARCADISMO = EQUILÍBRIO</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "natureza",
                  "simplicidade",
                  "razão",
                  "vida pastoril",
                  "carpe diem",
                  "fugere urbem",
                ].map((t) => (
                  <li key={t} className="rounded-lg bg-arcadia/10 px-3 py-2">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/quiz"
              className="inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              IR PARA O QUIZ →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
