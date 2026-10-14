import { useState } from "react";
import { Flame, RotateCcw, Target, Trophy, Zap } from "lucide-react";
import { useProgresso } from "@/lib/progresso";
import { XPBar } from "./XPBar";

function Metrica({
  icone,
  rotulo,
  valor,
  detalhe,
}: {
  icone: React.ReactNode;
  rotulo: string;
  valor: string;
  detalhe?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-3">
      <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
        {icone}
        {rotulo}
      </p>
      <p className="mt-1 font-display text-xl font-bold tabular-nums">{valor}</p>
      {detalhe ? <p className="text-xs text-muted-foreground">{detalhe}</p> : null}
    </div>
  );
}

export function ProgressDashboard() {
  const { estado, nivel, conhecimento, precisao, reiniciar } = useProgresso();
  const [confirmando, setConfirmando] = useState(false);

  return (
    <section aria-labelledby="titulo-progresso" className="surface-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 id="titulo-progresso" className="font-display text-lg font-bold">
          Seu progresso
        </h2>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
          Fase {nivel.nivel} — {nivel.nome}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-1 flex justify-between text-xs font-semibold text-muted-foreground">
          <span>Conhecimento</span>
          <span className="tabular-nums">{conhecimento}%</span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={conhecimento}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Conhecimento acumulado"
        >
          <div
            className="h-full rounded-full bg-success transition-[width] duration-700"
            style={{ width: `${Math.max(2, conhecimento)}%` }}
          />
        </div>
      </div>

      <div className="mt-5">
        <XPBar />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metrica
          icone={<Flame className="size-3.5" aria-hidden />}
          rotulo="Combo"
          valor={`x${estado.combo}`}
          detalhe={`Melhor: x${estado.melhorCombo}`}
        />
        <Metrica
          icone={<Target className="size-3.5" aria-hidden />}
          rotulo="Precisão"
          valor={`${precisao}%`}
          detalhe={`${estado.acertos} acertos · ${estado.erros} erros`}
        />
        <Metrica
          icone={<Zap className="size-3.5" aria-hidden />}
          rotulo="Respondidas"
          valor={String(estado.respondidas)}
          detalhe="atividades"
        />
        <Metrica
          icone={<Trophy className="size-3.5" aria-hidden />}
          rotulo="Missões"
          valor={String(estado.missoes.length)}
          detalhe="concluídas"
        />
      </div>

      <div className="mt-5">
        {confirmando ? (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3">
            <p className="text-sm font-semibold">Apagar todo o progresso salvo?</p>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => {
                  reiniciar();
                  setConfirmando(false);
                }}
                className="rounded-lg bg-destructive px-3 py-1.5 text-sm font-semibold text-destructive-foreground"
              >
                Sim, apagar
              </button>
              <button
                type="button"
                onClick={() => setConfirmando(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmando(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="size-4" aria-hidden />
            Reiniciar progresso
          </button>
        )}
      </div>
    </section>
  );
}
