import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SentenceBuilder } from "@/components/SentenceBuilder";
import { ErrorHunter } from "@/components/ErrorHunter";
import { MissionCard } from "@/components/MissionCard";

export const Route = createFileRoute("/laboratorio")({
  head: () => ({
    meta: [
      { title: "Laboratório de frases — Concordância Verbal & Nominal" },
      {
        name: "description",
        content:
          "Monte frases arrastando palavras e encontre o erro de concordância clicando nas palavras. Prática pura, com XP a cada acerto.",
      },
      { property: "og:title", content: "Laboratório de frases" },
      {
        property: "og:description",
        content: "Monte a frase correta e cace o erro de concordância — no computador ou no celular.",
      },
    ],
  }),
  component: Laboratorio,
});

function Laboratorio() {
  return (
    <PageShell
      etiqueta="Laboratório"
      titulo="🧪 Laboratório de frases"
      descricao="Aqui você mexe nas palavras: monta frases na ordem correta e caça o erro de concordância. Cada acerto vale XP e alimenta seu combo."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <SentenceBuilder />
        <ErrorHunter />
      </div>
      <div className="mt-5">
        <MissionCard
          id="missao-laboratorio"
          titulo="Treinar no laboratório"
          descricao="Monte pelo menos uma frase correta e encontre um erro antes de concluir a missão."
        />
      </div>
    </PageShell>
  );
}
