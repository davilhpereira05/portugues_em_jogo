import { useState } from "react";
import { cn } from "@/lib/utils";

type Ramo = {
  id: string;
  nome: string;
  itens: { titulo: string; detalhe: string }[];
};

const ramos: Ramo[] = [
  {
    id: "verbal",
    nome: "Verbal",
    itens: [
      { titulo: "Sujeito", detalhe: "Quem pratica ou sofre a ação. É ele que comanda o verbo." },
      { titulo: "Verbo", detalhe: "Ajusta-se ao número e à pessoa do sujeito: estudou / estudaram." },
      { titulo: "Número", detalhe: "Singular ou plural: “o aluno chegou” × “os alunos chegaram”." },
      { titulo: "Pessoa", detalhe: "1ª, 2ª ou 3ª: “eu e ele fomos” (nós → 1ª do plural)." },
      {
        titulo: "Casos especiais",
        detalhe: "Haver e fazer impessoais, expressões partitivas, porcentagem e sujeito posposto.",
      },
    ],
  },
  {
    id: "nominal",
    nome: "Nominal",
    itens: [
      { titulo: "Substantivo", detalhe: "É o núcleo: todas as palavras do bloco concordam com ele." },
      { titulo: "Artigo", detalhe: "Marca gênero e número: “as meninas”, “os livros”." },
      { titulo: "Adjetivo", detalhe: "Caracteriza o substantivo e acompanha seu gênero e número." },
      { titulo: "Pronome", detalhe: "“Nossos projetos”, “essas questões”, “todas as provas”." },
      { titulo: "Numeral", detalhe: "“O primeiro e o segundo capítulos” ou “os primeiros capítulos”." },
    ],
  },
];

export function MindMap() {
  const [ativo, setAtivo] = useState<{ ramo: string; titulo: string } | null>(null);
  const detalhe = ramos
    .flatMap((r) => r.itens.map((i) => ({ ...i, ramo: r.nome, ramoId: r.id })))
    .find((i) => ativo && i.ramo === ativo.ramo && i.titulo === ativo.titulo);

  return (
    <div className="surface-card p-5 sm:p-6">
      <h3 className="font-display text-lg font-bold">Mapa mental interativo</h3>
      <p className="mt-1 text-sm text-muted-foreground">Clique em qualquer ramo para ver a explicação.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="grid gap-2">
          {ramos[0]!.itens.map((item) => (
            <button
              key={item.titulo}
              type="button"
              onClick={() => setAtivo({ ramo: "Verbal", titulo: item.titulo })}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition-all",
                ativo?.ramo === "Verbal" && ativo.titulo === item.titulo
                  ? "border-accent bg-accent/15"
                  : "border-border bg-card hover:border-accent",
              )}
            >
              {item.titulo}
            </button>
          ))}
        </div>

        <div className="mx-auto grid place-items-center">
          <div className="brand-gradient grid size-32 place-items-center rounded-full text-center font-display text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-glow">
            Concordância
          </div>
          <div className="mt-3 flex gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            <span>Verbal</span>
            <span>·</span>
            <span>Nominal</span>
          </div>
        </div>

        <div className="grid gap-2">
          {ramos[1]!.itens.map((item) => (
            <button
              key={item.titulo}
              type="button"
              onClick={() => setAtivo({ ramo: "Nominal", titulo: item.titulo })}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition-all",
                ativo?.ramo === "Nominal" && ativo.titulo === item.titulo
                  ? "border-accent bg-accent/15"
                  : "border-border bg-card hover:border-accent",
              )}
            >
              {item.titulo}
            </button>
          ))}
        </div>
      </div>

      <div
        className="mt-6 min-h-24 rounded-xl border border-border bg-secondary/40 p-4"
        aria-live="polite"
      >
        {detalhe ? (
          <div className="animate-pop">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {detalhe.ramo} · {detalhe.titulo}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{detalhe.detalhe}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhum ramo selecionado ainda. Escolha um item à esquerda (verbal) ou à direita (nominal).
          </p>
        )}
      </div>
    </div>
  );
}
