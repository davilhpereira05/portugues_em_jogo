import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useStudent } from "@/lib/student";
import { MAX_TENTATIVAS, useAttempts } from "@/lib/attempts";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Início — Lingua" },
      {
        name: "description",
        content: "Escolha entre a área de jogos e a área de aprendizado de Língua Portuguesa.",
      },
      { property: "og:title", content: "Início — Lingua" },
      {
        property: "og:description",
        content: "Escolha entre a área de jogos e a área de aprendizado de Língua Portuguesa.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const student = useStudent();
  const [attempts] = useAttempts(student);
  const navigate = useNavigate();

  useEffect(() => {
    if (student === null) navigate({ to: "/" });
  }, [student, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-[48ch]">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent-ink">
            Olá{student ? `, ${student.nome}` : ""}
          </p>
          <h1 className="mt-2 text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Pronto(a) para estudar hoje?
          </h1>
          <p className="mt-3 text-pretty text-base text-muted-foreground">
            {student ? `Sala ${student.sala} · ` : ""}Escolha por onde começar.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            to="/jogos"
            className="group rounded-2xl bg-primary p-8 text-primary-foreground ring-1 ring-primary/40 transition-transform hover:-translate-y-1"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-background/15 font-display text-xl font-semibold">
              J
            </span>
            <h2 className="mt-6 text-balance font-display text-2xl font-semibold tracking-tight">
              Área de Jogos
            </h2>
            <p className="mt-2 text-pretty text-sm text-primary-foreground/80">
              Quiz de 10 perguntas sobre redução de plástico.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Jogar agora
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>

          <Link
            to="/aprendizado"
            className="group rounded-2xl bg-accent p-8 text-accent-foreground ring-1 ring-accent/40 transition-transform hover:-translate-y-1"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-background/15 font-display text-xl font-semibold">
              A
            </span>
            <h2 className="mt-6 text-balance font-display text-2xl font-semibold tracking-tight">
              Área de Aprendizado
            </h2>
            <p className="mt-2 text-pretty text-sm text-accent-foreground/80">
              Guia de leitura e tipos de texto para revisar.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Estudar
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>

        <section className="mt-10 rounded-2xl bg-card p-6 ring-1 ring-border">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-semibold tracking-tight">Suas tentativas no quiz</h2>
            <span className="text-sm text-muted-foreground">
              {attempts ? attempts.length : 0} de {MAX_TENTATIVAS} usadas
              {attempts && attempts.length > 0 ? ` · Melhor: ${Math.max(...attempts)}/10` : ""}
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {Array.from({ length: MAX_TENTATIVAS }).map((_, i) => {
              const score = attempts?.[i];
              return (
                <div key={i} className="rounded-xl bg-background p-4 ring-1 ring-border">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Tentativa {i + 1}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold">
                    {score === undefined ? "—" : `${score}/10`}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
