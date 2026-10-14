import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { quizQuestoes } from "@/data/content";
import { totalNos } from "@/data/mapa";
import { useProgresso } from "@/lib/progresso";

export const Route = createFileRoute("/resultado")({
  head: () => ({
    meta: [
      { title: "Experiência concluída — Barroco & Arcadismo" },
      {
        name: "description",
        content: "Veja sua pontuação final, acertos no quiz e nós descobertos no mapa literário.",
      },
      { property: "og:title", content: "Experiência concluída — Barroco & Arcadismo" },
      {
        property: "og:description",
        content: "Pontuação, acertos e progresso da sua viagem pela literatura brasileira.",
      },
    ],
  }),
  component: Resultado,
});

function Resultado() {
  const { estado, progressoPercent, reiniciar } = useProgresso();
  const router = useRouter();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 text-center">
      <h1 className="text-3xl font-black sm:text-4xl">🎓 Experiência concluída!</h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Você explorou os principais conceitos do Barroco e do Arcadismo. Agora é hora de colocar
        seus conhecimentos à prova!
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Bloco rotulo="Pontuação final" valor={`${estado.pontos.toLocaleString("pt-BR")} pontos`} />
        <Bloco rotulo="Quiz" valor={`${estado.quizAcertos}/${quizQuestoes.length} acertos`} />
        <Bloco rotulo="Mapa" valor={`${estado.nos.length}/${totalNos} nós descobertos`} />
        <Bloco rotulo="Progresso" valor={`${progressoPercent}%`} />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            reiniciar();
            router.navigate({ to: "/quiz" });
          }}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
        >
          JOGAR NOVAMENTE
        </button>
        <Link
          to="/barroco"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
        >
          REVISAR CONTEÚDO
        </Link>
        <Link
          to="/"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
        >
          VOLTAR AO INÍCIO
        </Link>
      </div>
    </div>
  );
}

function Bloco({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{rotulo}</p>
      <p className="mt-1 text-xl font-bold">{valor}</p>
    </div>
  );
}
