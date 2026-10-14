import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string | undefined;
  title: string;
  subtitle?: string | undefined;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary-glow">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-3xl text-muted-foreground">{subtitle}</p>}
      </header>
      {children}
    </main>
  );
}

export function Panel({
  children,
  className,
  hover,
}: {
  children: ReactNode;
  className?: string | undefined;
  hover?: boolean | undefined;
}) {
  return (
    <section className={cn("panel p-5 sm:p-6", hover && "panel-hover", className)}>
      {children}
    </section>
  );
}

export function Badge({
  children,
  tone = "primary",
}: {
  children: ReactNode;
  tone?: "primary" | "success" | "danger" | "gold" | "muted" | "accent";
}) {
  const tones = {
    primary: "border-primary/50 bg-primary/15 text-primary-glow",
    success: "border-success/50 bg-success/15 text-success",
    danger: "border-destructive/50 bg-destructive/15 text-destructive",
    gold: "border-gold/50 bg-gold/15 text-gold",
    muted: "border-border bg-secondary text-muted-foreground",
    accent: "border-accent/50 bg-accent/15 text-accent",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "gold";
  type?: "button" | "submit";
  className?: string | undefined;
  disabled?: boolean | undefined;
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:brightness-110",
    ghost: "border border-border bg-secondary/60 text-foreground hover:bg-secondary",
    gold: "bg-gradient-to-r from-gold to-gold/70 text-gold-foreground hover:brightness-110",
  } as const;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  children,
  variant = "primary",
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "gold";
  className?: string | undefined;
  onClick?: (() => void) | undefined;
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:brightness-110",
    ghost: "border border-border bg-secondary/60 text-foreground hover:bg-secondary",
    gold: "bg-gradient-to-r from-gold to-gold/70 text-gold-foreground hover:brightness-110",
  } as const;
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-all duration-200",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-primary/20 px-1.5 py-0.5 font-bold text-primary-glow">
      {children}
    </mark>
  );
}

export function Expandable({
  title,
  badge,
  children,
  defaultOpen,
}: {
  title: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean | undefined;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/50"
      >
        <span className="flex-1 font-display text-sm font-bold sm:text-base">{title}</span>
        {badge}
        <span aria-hidden className={cn("transition-transform", open && "rotate-180")}>
          ▾
        </span>
      </button>
      {open && (
        <div className="animate-pop border-t border-border px-5 py-4 text-sm text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
