import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FeedbackCard } from "./FeedbackCard";
import { useProgresso, type Area } from "@/lib/progresso";
import { cn } from "@/lib/utils";

type Caso = {
  id: string;
  area: Area;
  palavras: string[];
  indiceErro: number;
  corrigida: string;
  explicacao: string;
};

const casos: Caso[] = [
  {
    id: "lab-erro-1",
    area: "nominal",
    palavras: ["As", "menina", "chegaram", "cedo"],
    indiceErro: 1,
    corrigida: "As meninas chegaram cedo.",
    explicacao:
      "O substantivo deve concordar com o artigo e com o adjetivo em número: “as meninas”.",
  },
  {
    id: "lab-erro-2",
    area: "verbal",
    palavras: ["Os", "professores", "corrigiu", "as", "provas"],
    indiceErro: 2,
    corrigida: "Os professores corrigiram as provas.",
    explicacao: "Sujeito no plural (“os professores”) exige verbo no plural: corrigiram.",
  },
  {
    id: "lab-erro-3",
    area: "especiais",
    palavras: ["Haviam", "poucas", "cadeiras", "na", "sala"],
    indiceErro: 0,
    corrigida: "Havia poucas cadeiras na sala.",
    explicacao: "Haver, no sentido de existir, é impessoal e permanece no singular.",
  },
  {
    id: "lab-erro-4",
    area: "nominal",
    palavras: ["Menas", "questões", "foram", "anuladas"],
    indiceErro: 0,
    corrigida: "Menos questões foram anuladas.",
    explicacao: "“Menos” é invariável: não existe “menas”.",
  },
];

export function ErrorHunter() {
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const { registrarResposta } = useProgresso();

  const caso = casos[indice]!;
  const respondido = escolha !== null;
  const acertou = escolha === caso.indiceErro;

  function escolher(i: number) {
    if (respondido) return;
    setEscolha(i);
    registrarResposta({
      id: caso.id,
      area: caso.area,
      correta: i === caso.indiceErro,
      resposta: caso.palavras[i] ?? "",
      xp: 100,
    });
  }

  return (
    <div className="surface-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Modo 2 — Encontre o erro</h3>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">
          Frase {indice + 1}/{casos.length}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Clique na palavra que quebra a concordância.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {caso.palavras.map((palavra, i) => (
          <button
            key={`${palavra}-${i}`}
            type="button"
            onClick={() => escolher(i)}
            className={cn(
              "rounded-xl border border-border bg-card px-3.5 py-2.5 font-display text-base transition-all hover:border-accent hover:shadow-soft",
              respondido && i === caso.indiceErro && "border-success bg-success/15 text-success",
              respondido && escolha === i && i !== caso.indiceErro && "animate-shake border-destructive bg-destructive/15 text-destructive",
            )}
          >
            {palavra}
          </button>
        ))}
      </div>

      {respondido ? (
        <div className="mt-4 grid gap-3">
          <FeedbackCard
            correta={acertou}
            titulo={acertou ? "🟢 Encontrou o erro!" : "🔴 Não é essa palavra"}
            explicacao={caso.explicacao}
            extra={`Versão corrigida: ${caso.corrigida}`}
          />
          <button
            type="button"
            onClick={() => {
              setIndice((i) => (i + 1) % casos.length);
              setEscolha(null);
            }}
            className="brand-gradient inline-flex w-fit items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            Próxima frase
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
