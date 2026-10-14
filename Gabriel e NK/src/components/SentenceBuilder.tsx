import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { FeedbackCard } from "./FeedbackCard";
import { useProgresso, type Area } from "@/lib/progresso";
import { cn } from "@/lib/utils";

type Rodada = {
  id: string;
  area: Area;
  palavras: string[];
  correta: string[];
  explicacao: string;
};

const rodadas: Rodada[] = [
  {
    id: "lab-monte-1",
    area: "verbal",
    palavras: ["ESTUDARAM", "OS", "ONTEM", "ALUNOS"],
    correta: ["OS", "ALUNOS", "ESTUDARAM", "ONTEM"],
    explicacao:
      "“Os alunos” é o sujeito no plural, então o verbo “estudaram” também vai para o plural. “Ontem” fecha a frase como adjunto de tempo.",
  },
  {
    id: "lab-monte-2",
    area: "nominal",
    palavras: ["BONITAS", "AS", "CHEGARAM", "MENINAS"],
    correta: ["AS", "MENINAS", "BONITAS", "CHEGARAM"],
    explicacao:
      "Artigo, substantivo e adjetivo formam um bloco no plural feminino: “As meninas bonitas”. O verbo concorda com esse sujeito: “chegaram”.",
  },
  {
    id: "lab-monte-3",
    area: "especiais",
    palavras: ["MUITAS", "HAVIA", "TAREFAS", "AINDA"],
    correta: ["AINDA", "HAVIA", "MUITAS", "TAREFAS"],
    explicacao:
      "Haver no sentido de existir é impessoal: fica no singular, mesmo com “muitas tarefas”.",
  },
];

export function SentenceBuilder() {
  const [rodada, setRodada] = useState(0);
  const [montada, setMontada] = useState<string[]>([]);
  const [resultado, setResultado] = useState<boolean | null>(null);
  const { registrarResposta } = useProgresso();

  const atual = rodadas[rodada]!;
  const disponiveis = atual.palavras.filter(
    (p) => montada.filter((m) => m === p).length < atual.palavras.filter((x) => x === p).length,
  );
  const restantes = disponiveis.filter((p) => !montada.includes(p));

  function conferir() {
    const acertou = montada.join(" ") === atual.correta.join(" ");
    setResultado(acertou);
    registrarResposta({
      id: atual.id,
      area: atual.area,
      correta: acertou,
      resposta: montada.join(" "),
      xp: 100,
    });
  }

  function reiniciarRodada() {
    setMontada([]);
    setResultado(null);
  }

  function proxima() {
    setRodada((r) => (r + 1) % rodadas.length);
    reiniciarRodada();
  }

  return (
    <div className="surface-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Modo 1 — Monte a frase</h3>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">
          Rodada {rodada + 1}/{rodadas.length}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Arraste as palavras para a área de montagem — ou toque nelas, no celular. Clique em uma
        palavra montada para devolvê-la.
      </p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const palavra = e.dataTransfer.getData("text/plain");
          if (palavra && !montada.includes(palavra)) setMontada((m) => [...m, palavra]);
        }}
        className="mt-4 flex min-h-20 flex-wrap items-center gap-2 rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 p-4"
        aria-label="Área de montagem da frase"
      >
        {montada.length === 0 ? (
          <p className="text-sm text-muted-foreground">Solte ou toque nas palavras aqui…</p>
        ) : (
          montada.map((palavra, i) => (
            <button
              key={`${palavra}-${i}`}
              type="button"
              disabled={resultado !== null}
              onClick={() => setMontada((m) => m.filter((_, idx) => idx !== i))}
              className="brand-gradient rounded-lg px-3 py-2 font-display text-sm font-bold text-primary-foreground shadow-soft"
            >
              {palavra}
            </button>
          ))
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {restantes.map((palavra) => (
          <button
            key={palavra}
            type="button"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", palavra)}
            disabled={resultado !== null}
            onClick={() => setMontada((m) => [...m, palavra])}
            className="cursor-grab rounded-lg border border-border bg-card px-3 py-2 font-display text-sm font-bold transition-all hover:border-accent hover:shadow-soft active:cursor-grabbing"
          >
            {palavra}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={conferir}
          disabled={montada.length !== atual.palavras.length || resultado !== null}
          className="brand-gradient rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-40"
        >
          Conferir frase
        </button>
        <button
          type="button"
          onClick={reiniciarRodada}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          <RotateCcw className="size-4" aria-hidden />
          Limpar
        </button>
        {resultado !== null ? (
          <button
            type="button"
            onClick={proxima}
            className="inline-flex items-center gap-2 rounded-xl border border-accent px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
          >
            <Sparkles className="size-4" aria-hidden />
            Próxima frase
          </button>
        ) : null}
      </div>

      {resultado !== null ? (
        <div className="mt-4">
          <FeedbackCard
            correta={resultado}
            titulo={resultado ? "🟢 Frase correta!" : "🔴 Ainda não"}
            explicacao={atual.explicacao}
            extra={resultado ? "+100 XP" : `Ordem correta: ${atual.correta.join(" ")}`}
          />
        </div>
      ) : null}

      <p
        className={cn(
          "mt-3 text-sm font-semibold",
          resultado === null && "text-muted-foreground",
          resultado === true && "text-success",
          resultado === false && "text-destructive",
        )}
      >
        {montada.length ? montada.join(" ") : "—"}
      </p>
    </div>
  );
}
