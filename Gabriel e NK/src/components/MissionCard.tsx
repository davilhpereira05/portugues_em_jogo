import { CheckCircle2, Flag } from "lucide-react";
import { useProgresso } from "@/lib/progresso";

export function MissionCard({
  id,
  titulo,
  descricao,
}: {
  id: string;
  titulo: string;
  descricao: string;
}) {
  const { estado, concluirMissao } = useProgresso();
  const concluida = estado.missoes.includes(id);

  return (
    <div className="surface-card flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
      <div className="flex-1">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
          <Flag className="size-3.5" aria-hidden />
          Missão
        </p>
        <h3 className="mt-1 font-display text-base font-bold">{titulo}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{descricao}</p>
      </div>
      {concluida ? (
        <p className="inline-flex items-center gap-2 rounded-xl border border-success/40 bg-success/10 px-4 py-2.5 text-sm font-bold text-success">
          <CheckCircle2 className="size-4" aria-hidden />
          Missão concluída · +200 XP
        </p>
      ) : (
        <button
          type="button"
          onClick={() => concluirMissao(id)}
          className="brand-gradient rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
        >
          Concluir missão (+200 XP)
        </button>
      )}
    </div>
  );
}
