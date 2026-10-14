import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/aprendizado")({
  head: () => ({
    meta: [
      { title: "Área de Aprendizado — Leitura e tipos de texto" },
      {
        name: "description",
        content:
          "Guia rápido de estudo: compreensão, interpretação, tema, finalidade e os cinco tipos textuais.",
      },
      { property: "og:title", content: "Área de Aprendizado — Leitura e tipos de texto" },
      {
        property: "og:description",
        content: "Compreensão, interpretação, tema, finalidade e os cinco tipos textuais.",
      },
    ],
  }),
  component: Aprendizado,
});

const conceitos = [
  {
    titulo: "Compreensão",
    texto: "É entender o que está explícito (escrito claramente) no texto.",
  },
  {
    titulo: "Interpretação / Inferência",
    texto: "É deduzir o que está implícito (nas entrelinhas) usando as pistas do texto.",
  },
  { titulo: "Tema", texto: "É o assunto central do texto." },
  {
    titulo: "Finalidade",
    texto: "É o objetivo do texto (para que ele serve: informar, divertir, convencer, ensinar).",
  },
];

const tipos = [
  { titulo: "Narrativo", texto: "Conta uma história (fatos, personagens, tempo, espaço)." },
  { titulo: "Descritivo", texto: "Detalha características de algo ou alguém (uso de adjetivos)." },
  { titulo: "Expositivo", texto: "Explica ou apresenta um assunto de forma neutra e objetiva." },
  { titulo: "Argumentativo", texto: "Defende uma opinião (tese) usando argumentos para convencer." },
  {
    titulo: "Injuntivo",
    texto:
      "Dá ordens, conselhos ou instruções de como fazer algo (usa verbos de comando como faça, misture, siga).",
  },
];

function Card({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="rounded-2xl bg-card p-5 ring-1 ring-border">
      <h3 className="font-display text-lg font-semibold">{titulo}</h3>
      <p className="mt-1 text-pretty text-base text-muted-foreground">{texto}</p>
    </div>
  );
}

function Aprendizado() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary-ink">
          Guia de estudo
        </span>
        <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Leitura e tipos de texto
        </h1>
        <p className="mt-4 max-w-[56ch] text-pretty text-base text-muted-foreground">
          Um resumo claro para você revisar antes de jogar. Leia com calma e volte aqui sempre que
          precisar.
        </p>

        <section className="mt-12">
          <h2 className="text-balance font-display text-2xl font-semibold tracking-tight">
            A) Interpretação e Compreensão
          </h2>
          <div className="mt-5 space-y-4">
            {conceitos.map((c) => (
              <Card key={c.titulo} {...c} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-balance font-display text-2xl font-semibold tracking-tight">
            B) Tipos Textuais
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Como o texto é construído.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {tipos.map((t) => (
              <Card key={t.titulo} {...t} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
