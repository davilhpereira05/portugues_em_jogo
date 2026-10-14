import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto — Concordância Verbal & Nominal | Português em Jogo" },
      {
        name: "description",
        content:
          "Projeto Português em Jogo, tema concordância verbal e nominal, 2º ano do Ensino Médio, por Nicolas e Gabriel Jesus.",
      },
      { property: "og:title", content: "Sobre o projeto Concordância Verbal & Nominal" },
      {
        property: "og:description",
        content:
          "Objetivo, integrantes e tecnologias por trás da plataforma gamificada de concordância.",
      },
    ],
  }),
  component: Sobre,
});

const tecnologias = [
  { nome: "HTML5", papel: "Estrutura semântica das páginas e acessibilidade." },
  { nome: "CSS3", papel: "Design, tema claro/escuro, gradientes e animações." },
  { nome: "JavaScript", papel: "Quiz, pontuação, combo, timer e interatividade." },
  { nome: "LocalStorage", papel: "Salva progresso, tema, som e respostas no navegador." },
  { nome: "Responsive Design", papel: "Layout adaptado a desktop, notebook, tablet e celular." },
];

function Sobre() {
  return (
    <PageShell
      etiqueta="Sobre"
      titulo="Sobre o projeto"
      descricao="Concordância Verbal & Nominal é a parte digital do projeto Português em Jogo, construída para transformar revisão em jogo."
      acoes={
        <Link
          to="/desafio"
          className="brand-gradient rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          Começar desafio
        </Link>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <section className="surface-card p-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              { rotulo: "Projeto", valor: "Português em Jogo" },
              { rotulo: "Tema", valor: "Concordância verbal e nominal" },
              { rotulo: "Turma", valor: "2º ano do Ensino Médio" },
              { rotulo: "Integrantes", valor: "Nicolas e Gabriel Jesus" },
              { rotulo: "Público", valor: "Alunos do Ensino Médio" },
              { rotulo: "Foco", valor: "Preparação para PASSE / AVALIA II" },
            ].map((item) => (
              <div key={item.rotulo} className="rounded-xl border border-border bg-secondary/40 p-4">
                <dt className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  {item.rotulo}
                </dt>
                <dd className="mt-1 font-display text-base font-bold">{item.valor}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-6 font-display text-lg font-bold">Objetivo</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            “Criar uma experiência digital interativa para revisar os principais conceitos de
            concordância verbal e nominal, utilizando explicações, exemplos contextualizados,
            recursos multimídia e gamificação.”
          </p>

          <p className="mt-5 rounded-xl border border-accent/40 bg-accent/10 p-4 font-display text-base font-bold text-accent">
            “Não leia. Jogue. Erre. Entenda. Tente novamente.”
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold">Tecnologias</h2>
          <ul className="mt-4 grid gap-3">
            {tecnologias.map((t) => (
              <li key={t.nome} className="rounded-xl border border-border bg-card p-4">
                <p className="font-display text-sm font-bold">{t.nome}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.papel}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            A proposta de experiência segue a proporção 30% explicação, 20% exemplos e 50%
            interação.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
