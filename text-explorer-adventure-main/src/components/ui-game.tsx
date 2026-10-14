import type { ReactNode } from "react";
import { Check, X } from "lucide-react";

export function ProgressBar({ value, label, tone = "leaf" }: { value: number; label?: string; tone?: "leaf" | "sun" | "grape" | "sky" }) {
  const grad = { leaf: "bg-grad-leaf", sun: "bg-grad-sun", grape: "bg-grad-grape", sky: "bg-grad-sky" }[tone];
  return (
    <div>
      {label && <div className="mb-1 flex justify-between text-sm font-bold"><span>{label}</span><span>{value}%</span></div>}
      <div className="h-4 w-full overflow-hidden rounded-full border-2 border-border bg-muted" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className={`h-full rounded-full ${grad} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, children, tone = "sky" }: { eyebrow?: string; title: string; children?: ReactNode; tone?: "sky" | "sun" | "grape" | "leaf" | "tangerine" }) {
  const grad = { sky: "bg-grad-sky", sun: "bg-grad-sun", grape: "bg-grad-grape", leaf: "bg-grad-leaf", tangerine: "bg-grad-sun" }[tone];
  return (
    <header className={`relative mb-8 overflow-hidden rounded-3xl ${grad} p-6 text-primary-foreground shadow-soft md:p-10`}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-card/20" />
      <div className="pointer-events-none absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-card/15" />
      {eyebrow && <p className="mb-2 inline-block rounded-full bg-card/25 px-3 py-1 text-sm font-bold uppercase tracking-wide">{eyebrow}</p>}
      <h1 className="text-3xl font-bold drop-shadow-sm md:text-5xl">{title}</h1>
      {children && <div className="mt-3 max-w-2xl text-lg font-semibold opacity-95">{children}</div>}
    </header>
  );
}

export function Feedback({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div role="status" className={`mt-4 flex items-start gap-3 rounded-2xl border-2 p-4 font-semibold ${ok ? "border-leaf bg-leaf-soft text-leaf-deep animate-pop" : "border-tangerine bg-tangerine-soft text-tangerine-deep animate-wiggle"}`}>
      <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${ok ? "bg-leaf" : "bg-tangerine"} text-primary-foreground`}>
        {ok ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </span>
      <div><strong>{ok ? "Correto! " : "Ainda não. "}</strong>{children}</div>
    </div>
  );
}

export function XpPop({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="pointer-events-none absolute -top-2 right-4 font-display text-2xl font-bold text-tangerine-deep animate-rise" aria-hidden>+10 XP ⭐</span>;
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card-game p-5 md:p-8 ${className}`}>{children}</section>;
}
