import type { ReactNode } from "react";

export function PageShell({
  etiqueta,
  titulo,
  descricao,
  children,
  acoes,
}: {
  etiqueta: string;
  titulo: string;
  descricao: string;
  children: ReactNode;
  acoes?: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6">
      <div className="animate-rise">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{etiqueta}</p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{titulo}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{descricao}</p>
          </div>
          {acoes ? <div className="flex flex-wrap gap-2">{acoes}</div> : null}
        </div>
      </div>
      <div className="mt-10">{children}</div>
    </main>
  );
}
