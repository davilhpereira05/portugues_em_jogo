import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Feather, Flame, ScrollText } from "lucide-react";
import barrocoAsset from "@/assets/barroco.jpg.asset.json";
import {
  barrocoAutores,
  barrocoCaracteristicas,
  barrocoContexto,
  barrocoObras,
  type Caracteristica,
} from "@/data/content";
import { NavProxima, Pill, SecaoTitulo } from "@/components/ui-partes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/barroco")({
  head: () => ({
    meta: [
      { title: "Barroco — Entre a fé e os conflitos humanos" },
      {
        name: "description",
        content:
          "Contexto histórico, características, cultismo e conceptismo, autores e obras do Barroco brasileiro.",
      },
      { property: "og:title", content: "Barroco — Entre a fé e os conflitos humanos" },
      {
        property: "og:description",
        content: "Características, autores e obras do Barroco brasileiro em cards interativos.",
      },
    ],
  }),
  component: BarrocoPage,
});

function BarrocoPage() {
  const [aberto, setAberto] = useState<Caracteristica | null>(null);

  return (
    <div className="bg-barroco-deep text-cream">
      <section className="relative isolate">
        <img
          src={barrocoAsset.url}
          alt="Ambiente barroco dramático, com colunas douradas e cortina vinho"
          className="h-[46vh] min-h-[300px] w-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-barroco-deep via-barroco-deep/55 to-barroco-deep/40" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-8">
          <Pill escuro>Século XVII</Pill>
          <h1 className="mt-3 text-4xl font-black text-gold sm:text-6xl">BARROCO</h1>
          <p className="mt-1 text-base text-cream/90 sm:text-lg">
            Entre a fé e os conflitos humanos
          </p>
        </div>
      </section>

      <div
        className="mx-auto max-w-5xl px-5 py-12"
        style={{
          backgroundImage: `linear-gradient(to bottom, color-mix(in oklab, var(--barroco-deep) 92%, transparent), color-mix(in oklab, var(--barroco-deep) 96%, transparent))`,
        }}
      >
        <p className="panel-dark rise rounded-2xl p-5 text-base leading-relaxed">
          O Barroco é marcado por contrastes e conflitos. Seus textos frequentemente apresentam a
          divisão entre os desejos humanos e os valores religiosos.
        </p>

        <section className="mt-12">
          <SecaoTitulo titulo="Contexto histórico" legenda="O essencial, em cinco pontos." escuro />
          <div className="grid gap-3 sm:grid-cols-2">
            {barrocoContexto.map((t, i) => (
              <div key={t} className="panel-dark lift rounded-xl p-4 text-sm">
                <span className="mr-2 font-display font-bold text-gold">{i + 1}.</span>
                {t}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SecaoTitulo
            titulo="Principais características"
            legenda="Clique em cada card para ver a explicação."
            escuro
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {barrocoCaracteristicas.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setAberto(c)}
                className="panel-dark lift rounded-xl p-4 text-left hover:border-gold/70"
              >
                <Flame className="size-5 text-gold" aria-hidden />
                <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-gold">
                  {c.titulo}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-cream/80">{c.resumo}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-gold/80">
                  ver mais →
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SecaoTitulo titulo="Linguagem barroca" legenda="Duas formas de elaborar o texto." escuro />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="panel-dark rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gold">Cultismo</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Valoriza o jogo de palavras, imagens, metáforas e uma linguagem mais elaborada.
              </p>
              <p className="mt-3 rounded-lg bg-gold/12 p-3 text-sm italic">
                Exemplo: “o ouro breve da manhã se apaga na sombra da tarde”.
              </p>
            </div>
            <div className="panel-dark rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gold">Conceptismo</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Valoriza o raciocínio, a argumentação e o jogo de ideias.
              </p>
              <p className="mt-3 rounded-lg bg-gold/12 p-3 text-sm italic">
                Exemplo: “se tudo passa, por que prender o coração ao que passa?”.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <SecaoTitulo titulo="Autores" escuro />
          <div className="grid gap-4 md:grid-cols-2">
            {barrocoAutores.map((a) => (
              <div key={a.nome} className="panel-dark lift rounded-2xl p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Feather className="size-5" />
                </span>
                <h3 className="mt-3 text-lg font-bold text-gold">{a.nome}</h3>
                <p className="text-xs uppercase tracking-wide text-cream/60">{a.apelido}</p>
                <p className="mt-2 text-sm leading-relaxed">{a.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SecaoTitulo titulo="Obras" escuro />
          <div className="grid gap-4 md:grid-cols-2">
            {barrocoObras.map((o) => (
              <div key={o.titulo} className="panel-dark lift rounded-2xl p-5">
                <ScrollText className="size-5 text-gold" aria-hidden />
                <h3 className="mt-3 text-base font-bold text-gold">{o.titulo}</h3>
                <p className="text-xs text-cream/60">{o.autor}</p>
                <p className="mt-2 text-sm leading-relaxed">{o.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <NavProxima
          voltarPara="/"
          voltarLabel="Início"
          proximoPara="/arcadismo"
          proximoLabel="IR PARA O ARCADISMO"
          escuro
        />
      </div>

      <Dialog open={!!aberto} onOpenChange={(o) => !o && setAberto(null)}>
        <DialogContent className="border-gold/40 bg-barroco-panel text-cream">
          <DialogHeader>
            <DialogTitle className="text-gold">{aberto?.titulo}</DialogTitle>
            <DialogDescription className="text-cream/85">{aberto?.explicacao}</DialogDescription>
          </DialogHeader>
          <p className="rounded-lg bg-gold/12 p-3 text-sm italic">Exemplo: {aberto?.exemplo}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
