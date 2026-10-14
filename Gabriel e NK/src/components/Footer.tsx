import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm font-bold">Desenvolvido por Nicolas &amp; Gabriel Jesus</p>
          <p className="text-sm text-muted-foreground">Projeto Português em Jogo — Ensino Médio</p>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          “Não leia. Jogue. Erre. Entenda. Tente novamente.”
        </p>
        <Link
          to="/sobre"
          className="w-fit rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Sobre o projeto
        </Link>
      </div>
    </footer>
  );
}
