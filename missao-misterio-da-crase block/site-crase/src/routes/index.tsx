import { createFileRoute } from "@tanstack/react-router";
import { Badge, LinkButton, Panel } from "@/components/ui-kit";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Missão: O Mistério da Crase — Jogo de regência e crase" },
      {
        name: "description",
        content:
          "Vire investigador da Língua Portuguesa: aprenda regência verbal e nominal, preposições exigidas e crase em uma missão com fases, XP e medalhas.",
      },
      { property: "og:title", content: "Missão: O Mistério da Crase" },
      {
        property: "og:description",
        content:
          "Aprenda regência e crase investigando erros escondidos em frases misteriosas. 15 questões, 5 fases, 1500 XP.",
      },
    ],
  }),
  component: Inicio,
});

const STEPS = [
  { icon: "📚", title: "Aprenda", text: "Domine regência, preposições e crase." },
  { icon: "🔎", title: "Investigue", text: "Analise frases e cace os erros escondidos." },
  { icon: "⚡", title: "Resolva os desafios", text: "5 fases com 15 questões." },
  { icon: "⭐", title: "Acumule XP", text: "100 XP por acerto, até 1500 XP." },
  { icon: "🚨", title: "Corrija o texto final", text: "A última investigação da missão." },
];

function Inicio() {
  const { startMission, xp, rank } = useProgress();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-16">
      <section className="panel grid-scan relative overflow-hidden p-6 sm:p-10">
        <div className="relative">
          <Badge tone="accent">🔐 Arquivo confidencial · Missão ativa</Badge>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl">
            MISSÃO:
            <br />
            <span className="text-gradient">O MISTÉRIO DA CRASE</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Regência verbal e nominal, preposições exigidas e emprego da crase
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton to="/aprenda" className="animate-beacon text-base" onClick={startMission}>
              ▶ COMEÇAR MISSÃO
            </LinkButton>
            <LinkButton to="/resumao" variant="ghost">
              📖 Resumão para a prova
            </LinkButton>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Progresso atual: ⭐ {xp} / 1500 XP · {rank.icon} {rank.name}
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel hover>
          <div className="flex items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/15 text-3xl">
              🕵️
            </span>
            <div>
              <Badge tone="danger">🚨 Dossiê 001 — confidencial</Badge>
              <h2 className="mt-3 text-xl font-bold">A história</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                “Uma série de frases misteriosas apareceu em um documento. Algumas estão corretas e
                outras possuem erros de regência e crase. Sua missão é descobrir quais estão
                corretas e corrigir as demais.”
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Você é o(a) <strong className="text-foreground">investigador(a) da Língua
                Portuguesa</strong> responsável pelo caso.
              </p>
            </div>
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-bold">🗂️ Ficha da missão</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            {[
              ["Integrantes", "Cauê Valzachi e Guilherme Block"],
              ["Turma", "2º ano de Desenvolvimento de Sistemas"],
              ["Componente curricular", "Português"],
              ["Professor(a)", "Prof. Douglas Bressan"],
              [
                "Objetivo do trabalho",
                "Estudar regência verbal e nominal, preposições exigidas e o emprego da crase de forma interativa.",
              ],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border bg-secondary/40 px-3 py-2">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-0.5 text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>

      <section className="mt-6">
        <h2 className="mb-4 text-xl font-bold">🧠 Como funciona?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Panel key={s.title} hover className="p-4">
              <span className="text-2xl">{s.icon}</span>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-primary-glow">
                Etapa {i + 1}
              </p>
              <h3 className="mt-1 text-base font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </Panel>
          ))}
        </div>
      </section>
    </main>
  );
}
