import { CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeedbackCard({
  correta,
  titulo,
  explicacao,
  extra,
}: {
  correta: boolean | null;
  titulo?: string | undefined;
  explicacao: string;
  extra?: string | undefined;
}) {
  const neutro = correta === null;
  const Icone = neutro ? Info : correta ? CheckCircle2 : XCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "animate-pop rounded-xl border p-4",
        neutro && "border-border bg-secondary/40",
        correta === true && "border-success/40 bg-success/10",
        correta === false && "border-destructive/40 bg-destructive/10",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 font-display text-sm font-bold",
          correta === true && "text-success",
          correta === false && "text-destructive",
        )}
      >
        <Icone className="size-4.5 shrink-0" aria-hidden />
        {titulo ?? (neutro ? "Explicação" : correta ? "Mandou bem!" : "Quase!")}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{explicacao}</p>
      {extra ? <p className="mt-2 text-sm font-semibold text-accent">{extra}</p> : null}
    </div>
  );
}
