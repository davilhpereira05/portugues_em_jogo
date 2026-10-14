import { Link } from "@tanstack/react-router";

const navClass = "rounded-full px-4 py-2 text-sm font-medium text-foreground ring-1 ring-border";
const navActive = "rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/home" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary font-display font-semibold text-primary-foreground">
            L
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Lingua</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/jogos"
            activeProps={{ className: navActive }}
            inactiveProps={{ className: navClass }}
          >
            Área de Jogos
          </Link>
          <Link
            to="/aprendizado"
            activeProps={{ className: navActive }}
            inactiveProps={{ className: navClass }}
          >
            Área de Aprendizado
          </Link>
        </nav>
      </div>
    </header>
  );
}
