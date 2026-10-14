import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, BookMarked, Sun } from "lucide-react";
import arcadismoAsset from "@/assets/arcadismo.jpg.asset.json";
import {
  arcadismoAutores,
  arcadismoCaracteristicas,
  arcadismoContexto,
  arcadismoObras,
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

export const Route = createFileRoute("/arcadismo")({
  head: () => ({
    meta: [
      { title: "Arcadismo — Simplicidade e natureza" },
      {
        name: "description",
        content:
          "Contexto histórico, características, linguagem, autores e obras do Arcadismo brasileiro.",
      },
      { property: "og:title", content: "Arcadismo — Simplicidade e natureza" },
      {
        property: "og:description",
        content: "Bucolismo, carpe diem, fugere urbem e os autores do Arcadismo brasileiro.",
      },
    ],
  }),
  component: ArcadismoPage,
});

function ArcadismoPage() {
  const [aberto, setAberto] = useState<Caracteristica | null>(null);

  return (
    <div className="bg-cream">
      <section className="relative isolate">
        <img
          src={arcadismoAsset.url}
          alt="Paisagem campestre clara com colunas clássicas e vegetação"
          className="h-[46vh] min-h-[300px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-8">
          <Pill>Século XVIII</Pill>
          <h1 className="mt-3 text-4xl font-black text-arcadia sm:text-6xl">ARCADISMO</h1>
          <p className="mt-1 max-w-2xl text-base text-foreground/80 sm:text-lg">
            A busca pela simplicidade e pela vida em contato com a natureza
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-12">
        <p className="panel-light rise rounded-2xl p-5 text-base leading-relaxed">
          O Arcadismo valorizava a razão, a simplicidade e a natureza, buscando inspiração nos
          modelos da Antiguidade Clássica.
        </p>

        <section className="mt-12">
          <SecaoTitulo titulo="Contexto histórico" legenda="O essencial, em cinco pontos." />
          <div className="grid gap-3 sm:grid-cols-2">
            {arcadismoContexto.map((t, i) => (
              <div key={t} className="panel-light lift rounded-xl p-4 text-sm">
                <span className="mr-2 font-display font-bold text-arcadia">{i + 1}.</span>
                {t}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SecaoTitulo
            titulo="Principais características"
            legenda="Clique em cada card para ver a explicação."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {arcadismoCaracteristicas.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setAberto(c)}
                className="panel-light lift rounded-xl p-4 text-left hover:border-arcadia/60"
              >
                <Leaf className="size-5 text-arcadia" aria-hidden />
                <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-arcadia">
                  {c.titulo}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.resumo}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-arcadia/80">
                  ver mais →
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SecaoTitulo titulo="Linguagem" />
          <div className="panel-light rounded-2xl p-5">
            <Sun className="size-5 text-arcadia" aria-hidden />
            <p className="mt-3 text-sm leading-relaxed">
              A linguagem do Arcadismo tende a ser mais simples, clara e equilibrada, com forte
              presença de referências à natureza e à vida no campo.
            </p>
            <p className="mt-3 rounded-lg bg-arcadia/10 p-3 text-sm italic">
              Exemplo: “no campo tranquilo, o pastor canta o dia que passa”.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <SecaoTitulo titulo="Autores" />
          <div className="grid gap-4 md:grid-cols-3">
            {arcadismoAutores.map((a) => (
              <div key={a.nome} className="panel-light lift rounded-2xl p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-arcadia/12 text-arcadia">
                  <Leaf className="size-5" />
                </span>
                <h3 className="mt-3 text-base font-bold text-arcadia">{a.nome}</h3>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{a.apelido}</p>
                <p className="mt-2 text-sm leading-relaxed">{a.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SecaoTitulo titulo="Obras" />
          <div className="grid gap-4 md:grid-cols-3">
            {arcadismoObras.map((o) => (
              <div key={o.titulo} className="panel-light lift rounded-2xl p-5">
                <BookMarked className="size-5 text-arcadia" aria-hidden />
                <h3 className="mt-3 text-base font-bold text-arcadia">{o.titulo}</h3>
                <p className="text-xs text-muted-foreground">{o.autor}</p>
                <p className="mt-2 text-sm leading-relaxed">{o.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <NavProxima
          voltarPara="/barroco"
          voltarLabel="Barroco"
          proximoPara="/comparacao"
          proximoLabel="IR PARA A COMPARAÇÃO"
        />
      </div>

      <Dialog open={!!aberto} onOpenChange={(o) => !o && setAberto(null)}>
        <DialogContent className="border-arcadia/30 bg-arcadia-panel">
          <DialogHeader>
            <DialogTitle className="text-arcadia">{aberto?.titulo}</DialogTitle>
            <DialogDescription>{aberto?.explicacao}</DialogDescription>
          </DialogHeader>
          <p className="rounded-lg bg-arcadia/10 p-3 text-sm italic">Exemplo: {aberto?.exemplo}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
