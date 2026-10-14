import { useState } from "react";
import { FeedbackCard } from "./FeedbackCard";
import type { TesteRapido as Teste } from "@/data/conteudo";
import { useProgresso } from "@/lib/progresso";
import { cn } from "@/lib/utils";

export function TesteRapido({ teste }: { teste: Teste }) {
  const [escolha, setEscolha] = useState<number | null>(null);
  const { registrarResposta } = useProgresso();

  const respondido = escolha !== null;
  const acertou = escolha === teste.correta;

  function responder(indice: number) {
    if (respondido) return;
    setEscolha(indice);
    registrarResposta({
      id: teste.id,
      area: teste.area,
      correta: indice === teste.correta,
      resposta: teste.opcoes[indice] ?? "",
    });
  }

  return (
    <div className="mt-4 rounded-xl border border-dashed border-accent/40 bg-accent/5 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Teste rápido</p>
      <p className="mt-2 font-display text-sm font-semibold">{teste.pergunta}</p>
      <div className="mt-3 grid gap-2">
        {teste.opcoes.map((opcao, i) => {
          const selecionada = escolha === i;
          const correta = i === teste.correta;
          return (
            <button
              key={opcao}
              type="button"
              onClick={() => responder(i)}
              disabled={respondido}
              aria-pressed={selecionada}
              className={cn(
                "rounded-lg border px-3 py-2 text-left text-sm transition-all",
                "border-border bg-card hover:border-accent hover:bg-secondary/60",
                respondido && correta && "border-success bg-success/15 font-semibold text-success",
                respondido && selecionada && !correta && "animate-shake border-destructive bg-destructive/15 text-destructive",
                respondido && "cursor-default",
              )}
            >
              <span className="mr-2 font-display text-xs text-muted-foreground">
                {String.fromCharCode(65 + i)}
              </span>
              {opcao}
            </button>
          );
        })}
      </div>
      {respondido ? (
        <div className="mt-3">
          <FeedbackCard
            correta={acertou}
            titulo={acertou ? "🟢 Mandou bem!" : "🔴 Quase!"}
            explicacao={acertou ? teste.acerto : teste.erro}
            extra={acertou ? undefined : `Resposta correta: ${teste.opcoes[teste.correta]}`}
          />
        </div>
      ) : null}
    </div>
  );
}
