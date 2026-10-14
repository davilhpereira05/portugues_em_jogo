import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { saveStudent } from "@/lib/student";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lingua — Aprenda leitura e tipos de texto" },
      {
        name: "description",
        content:
          "Site de Língua Portuguesa com guia de estudo sobre leitura, interpretação e tipos de texto, além de um quiz de 10 perguntas.",
      },
      { property: "og:title", content: "Lingua — Aprenda leitura e tipos de texto" },
      {
        property: "og:description",
        content: "Guia de estudo e quiz interativo sobre leitura e tipologia textual.",
      },
    ],
  }),
  component: Entrada,
});

function Entrada() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");
  const [erro, setErro] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !sala.trim()) {
      setErro("Preencha seu nome e sua sala para continuar.");
      return;
    }
    saveStudent({ nome: nome.trim(), sala: sala.trim() });
    navigate({ to: "/home" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between gap-12 px-6 py-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary font-display font-semibold text-primary-foreground">
              L
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Lingua</span>
          </div>
          <span className="text-sm text-muted-foreground">Língua Portuguesa</span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-[40ch]">
            <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent-ink">
              Bem-vindo(a)
            </span>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
              Aprender português, <span className="text-primary">do seu jeito.</span>
            </h1>
            <p className="mt-5 text-pretty text-base text-muted-foreground">
              Conteúdo de leitura, tipos de texto e um quiz interativo. Digite seus dados para
              começar.
            </p>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl bg-card p-7 ring-1 ring-border">
            <label className="block">
              <span className="text-sm font-medium">Nome</span>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Ana Souza"
                className="mt-2 w-full rounded-xl border-0 bg-background px-4 py-3 text-base ring-1 ring-border placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-sm font-medium">Sala</span>
              <input
                type="text"
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                placeholder="Ex.: 9º B"
                className="mt-2 w-full rounded-xl border-0 bg-background px-4 py-3 text-base ring-1 ring-border placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            {erro ? <p className="mt-3 text-sm text-destructive">{erro}</p> : null}
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground ring-1 ring-primary/40 transition-transform hover:-translate-y-0.5"
            >
              Entrar
            </button>
          </form>
        </div>

        <p className="text-xs text-muted-foreground">Lingua · estudo de Língua Portuguesa</p>
      </div>
    </div>
  );
}
