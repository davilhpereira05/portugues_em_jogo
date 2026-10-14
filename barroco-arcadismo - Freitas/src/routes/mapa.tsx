import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Circle, Lock, Trophy } from "lucide-react";
import { caminhoArcadismo, caminhoBarroco, totalNos, type MapaNo } from "@/data/mapa";
import { desafioFinalQuestoes } from "@/data/content";
import { useProgresso } from "@/lib/progresso";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa Literário — Barroco & Arcadismo" },
      {
        name: "description",
        content:
          "Explore os caminhos do Barroco e do Arcadismo, desbloqueie nós e chegue ao desafio final.",
      },
      { property: "og:title", content: "Mapa Literário — Barroco & Arcadismo" },
      {
        property: "og:description",
        content: "Trilhas gamificadas com desafios, pontos e progresso salvo.",
      },
    ],
  }),
  component: Mapa,
});

type Tema = "barroco" | "arcadismo";

function Mapa() {
  const { estado, concluirNo, concluirCaminho, registrarFinal, progressoPercent } = useProgresso();
  const [aberto, setAberto] = useState<{ no: MapaNo; tema: Tema } | null>(null);

  const barrocoCompleto = caminhoBarroco.every((n) => estado.nos.includes(n.id));
  const arcadismoCompleto = caminhoArcadismo.every((n) => estado.nos.includes(n.id));
  const finalLiberado = barrocoCompleto && arcadismoCompleto;

  useEffect(() => {
    if (barrocoCompleto) concluirCaminho("barroco");
    if (arcadismoCompleto) concluirCaminho("arcadismo");
  }, [barrocoCompleto, arcadismoCompleto, concluirCaminho]);

  function estadoNo(lista: MapaNo[], i: number) {
    const no = lista[i]!;
    if (estado.nos.includes(no.id)) return "concluido" as const;
    const anterior = i === 0 ? null : lista[i - 1];
    if (!anterior || estado.nos.includes(anterior.id)) return "disponivel" as const;
    return "bloqueado" as const;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-center text-3xl font-black sm:text-4xl">Mapa Literário</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Explore os caminhos do Barroco e do Arcadismo.
      </p>

      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Progresso: {progressoPercent}%</span>
          <span>
            Nós descobertos: {estado.nos.length}/{totalNos}
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gold transition-all duration-700"
            style={{ width: `${progressoPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Trilha
          tema="barroco"
          titulo="🕯️ Caminho do Barroco"
          lista={caminhoBarroco}
          estadoNo={estadoNo}
          abrir={(no) => setAberto({ no, tema: "barroco" })}
          completo={barrocoCompleto}
        />
        <Trilha
          tema="arcadismo"
          titulo="🌿 Caminho do Arcadismo"
          lista={caminhoArcadismo}
          estadoNo={estadoNo}
          abrir={(no) => setAberto({ no, tema: "arcadismo" })}
          completo={arcadismoCompleto}
        />
      </div>

      <DesafioFinal
        liberado={finalLiberado}
        concluido={estado.finalFeito}
        registrarFinal={registrarFinal}
      />

      <Dialog open={!!aberto} onOpenChange={(o) => !o && setAberto(null)}>
        <DialogContent
          className={cn(
            aberto?.tema === "barroco"
              ? "border-gold/40 bg-barroco-panel text-cream"
              : "border-arcadia/30 bg-arcadia-panel",
          )}
        >
          {aberto && (
            <NoConteudo
              no={aberto.no}
              tema={aberto.tema}
              concluido={estado.nos.includes(aberto.no.id)}
              onConcluir={(comDesafio) => concluirNo(aberto.no.id, comDesafio)}
              fechar={() => setAberto(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Trilha({
  tema,
  titulo,
  lista,
  estadoNo,
  abrir,
  completo,
}: {
  tema: Tema;
  titulo: string;
  lista: MapaNo[];
  estadoNo: (lista: MapaNo[], i: number) => "concluido" | "disponivel" | "bloqueado";
  abrir: (no: MapaNo) => void;
  completo: boolean;
}) {
  const escuro = tema === "barroco";
  return (
    <section
      className={cn(
        "rounded-3xl border p-5 shadow-lg",
        escuro ? "border-gold/30 bg-barroco text-cream" : "border-arcadia/30 bg-arcadia-panel",
      )}
    >
      <h2 className={cn("text-xl font-bold", escuro ? "text-gold" : "text-arcadia")}>{titulo}</h2>
      {completo && (
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide">
          Caminho concluído · +250 pontos
        </p>
      )}
      <ol className="mt-5 space-y-2">
        {lista.map((no, i) => {
          const st = estadoNo(lista, i);
          return (
            <li key={no.id} className="relative pl-7">
              {i < lista.length - 1 && (
                <span
                  className={cn(
                    "absolute left-[11px] top-9 h-[calc(100%-1rem)] w-0.5",
                    escuro ? "bg-gold/30" : "bg-arcadia/30",
                  )}
                />
              )}
              <span
                className={cn(
                  "absolute left-0 top-3 flex size-6 items-center justify-center rounded-full border",
                  st === "concluido" && (escuro ? "border-gold bg-gold/25" : "border-arcadia bg-arcadia/20"),
                  st === "disponivel" && (escuro ? "border-gold unlocked-pulse" : "border-arcadia unlocked-pulse"),
                  st === "bloqueado" && "border-current opacity-40",
                )}
              >
                {st === "concluido" ? (
                  <Check className={cn("size-3.5", escuro ? "text-gold" : "text-arcadia")} />
                ) : st === "disponivel" ? (
                  <Circle className="size-2.5 fill-current" />
                ) : (
                  <Lock className="size-3" />
                )}
              </span>
              <button
                type="button"
                disabled={st === "bloqueado"}
                onClick={() => abrir(no)}
                className={cn(
                  "w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                  escuro ? "border-gold/25" : "border-arcadia/25",
                  st === "bloqueado"
                    ? "cursor-not-allowed opacity-45"
                    : escuro
                      ? "hover:bg-gold/15"
                      : "hover:bg-arcadia/12",
                  st === "concluido" && (escuro ? "bg-gold/10" : "bg-arcadia/10"),
                )}
              >
                {no.titulo}
                {no.desafio && st !== "concluido" && (
                  <span className="ml-2 text-xs font-normal opacity-75">· desafio</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function NoConteudo({
  no,
  tema,
  concluido,
  onConcluir,
  fechar,
}: {
  no: MapaNo;
  tema: Tema;
  concluido: boolean;
  onConcluir: (comDesafio: boolean) => void;
  fechar: () => void;
}) {
  const escuro = tema === "barroco";
  const [escolha, setEscolha] = useState<number | null>(null);
  const acertou = no.desafio ? escolha === no.desafio.correta : false;

  return (
    <>
      <DialogHeader>
        <DialogTitle className={escuro ? "text-gold" : "text-arcadia"}>{no.titulo}</DialogTitle>
        <DialogDescription className={escuro ? "text-cream/85" : undefined}>
          {no.explicacao}
        </DialogDescription>
      </DialogHeader>

      <p
        className={cn(
          "rounded-lg p-3 text-sm italic",
          escuro ? "bg-gold/12" : "bg-arcadia/10",
        )}
      >
        Exemplo: {no.exemplo}
      </p>

      {no.desafio && !concluido && (
        <div className="mt-2">
          <p className="text-sm font-semibold">{no.desafio.pergunta}</p>
          <div className="mt-3 grid gap-2">
            {no.desafio.opcoes.map((o, i) => (
              <button
                key={o}
                type="button"
                onClick={() => setEscolha(i)}
                disabled={acertou}
                className={cn(
                  "rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                  escuro ? "border-gold/30 hover:bg-gold/15" : "border-arcadia/30 hover:bg-arcadia/12",
                  escolha === i && i === no.desafio!.correta && "border-arcadia bg-arcadia/20",
                  escolha === i && i !== no.desafio!.correta && "border-destructive bg-destructive/15",
                )}
              >
                {String.fromCharCode(65 + i)}) {o}
              </button>
            ))}
          </div>
          {escolha !== null && (
            <p className="rise mt-3 text-sm">
              {acertou ? "✓ " : "✗ "}
              {no.desafio.explicacao}
              {!acertou && " Tente novamente."}
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {!concluido && (
          <button
            type="button"
            disabled={!!no.desafio && !acertou}
            onClick={() => {
              onConcluir(!!no.desafio);
              fechar();
            }}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-bold shadow transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-40",
              escuro ? "bg-gold text-barroco-deep" : "bg-arcadia text-cream",
            )}
          >
            {no.desafio ? "Desbloquear ponto (+125)" : "Marcar como descoberto (+25)"}
          </button>
        )}
        <button
          type="button"
          onClick={fechar}
          className={cn(
            "rounded-full border px-5 py-2.5 text-sm font-semibold",
            escuro ? "border-gold/40" : "border-arcadia/40",
          )}
        >
          Fechar
        </button>
      </div>
    </>
  );
}

function DesafioFinal({
  liberado,
  concluido,
  registrarFinal,
}: {
  liberado: boolean;
  concluido: boolean;
  registrarFinal: (acertos: number) => void;
}) {
  const [iniciado, setIniciado] = useState(false);
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);

  const total = desafioFinalQuestoes.length;
  const q = desafioFinalQuestoes[indice]!;

  if (!liberado) {
    return (
      <section className="mt-10 rounded-3xl border border-dashed border-border bg-secondary/50 p-8 text-center">
        <Lock className="mx-auto size-6 text-muted-foreground" />
        <h2 className="mt-3 text-xl font-bold">Desafio final bloqueado</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Conclua os dois caminhos do mapa para liberar o último desafio.
        </p>
      </section>
    );
  }

  return (
    <section className="unlocked-pulse mt-10 rounded-3xl border border-gold/50 bg-card p-8 shadow-lg">
      <div className="text-center">
        <Trophy className="mx-auto size-7 text-gold" />
        <h2 className="mt-3 text-2xl font-black">Desafio final</h2>
        <p className="mt-1 text-sm text-muted-foreground">Você chegou ao último desafio!</p>
      </div>

      {!iniciado && !concluido && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIniciado(true)}
            className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-barroco-deep shadow-lg transition-transform hover:-translate-y-0.5"
          >
            COMEÇAR O DESAFIO FINAL
          </button>
        </div>
      )}

      {iniciado && !fim && (
        <div key={indice} className="rise mx-auto mt-6 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Pergunta {indice + 1} de {total}
          </p>
          <p className="mt-2 text-lg font-semibold leading-relaxed">{q.pergunta}</p>
          <div className="mt-4 grid gap-2">
            {q.opcoes.map((o, i) => (
              <button
                key={o}
                type="button"
                disabled={escolha !== null}
                onClick={() => {
                  setEscolha(i);
                  if (i === q.correta) setAcertos((a) => a + 1);
                }}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left text-base transition-colors",
                  escolha === null && "border-border hover:border-primary hover:bg-accent",
                  escolha !== null && i === q.correta && "border-arcadia bg-arcadia/12",
                  escolha !== null && escolha === i && i !== q.correta && "border-destructive bg-destructive/10",
                )}
              >
                {o}
              </button>
            ))}
          </div>
          {escolha !== null && (
            <>
              <p className="rise mt-4 rounded-xl bg-secondary p-4 text-sm">{q.explicacao}</p>
              <button
                type="button"
                onClick={() => {
                  if (indice + 1 >= total) {
                    registrarFinal(acertos);
                    setFim(true);
                  } else {
                    setIndice((i) => i + 1);
                    setEscolha(null);
                  }
                }}
                className="mt-4 w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg"
              >
                {indice + 1 >= total ? "CONCLUIR MAPA" : "PRÓXIMA →"}
              </button>
            </>
          )}
        </div>
      )}

      {(fim || concluido) && (
        <div className="rise mt-6 text-center">
          <p className="text-xl font-bold">🎉 Mapa concluído!</p>
          <p className="mt-1 text-sm text-muted-foreground">+500 pontos pelo desafio final.</p>
          <Link
            to="/resultado"
            className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
          >
            VER RESULTADO FINAL
          </Link>
        </div>
      )}
    </section>
  );
}
