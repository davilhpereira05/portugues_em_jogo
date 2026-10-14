import { useState } from "react";
import { useT } from "@/lib/game";
import { LecoSays, Leco } from "./Leco";

export function Lesson1() {
  const t = useT();
  const [linked, setLinked] = useState(false);
  return (
    <div className="space-y-6">
      <LecoSays mood="feliz">{t("Coesão é a ligação entre as partes de um texto.", "Coesão é quando as frases ficam de mãos dadas! 🤝")}</LecoSays>
      <p className="text-lg">
        {t(
          "Imagine que um texto é como uma corrente. Cada frase precisa estar ligada à outra para que tudo fique conectado. Essa ligação é feita por conectivos, pronomes, sinônimos e outras palavras que retomam ou anunciam ideias.",
          "Um texto é como uma corrente. Cada pedacinho se liga ao outro.",
        )}
      </p>
      <div className="rounded-2xl bg-sky-soft p-5">
        <p className="mb-3 font-bold">🧩 Toque para conectar as peças:</p>
        <button onClick={() => setLinked(!linked)} className="flex w-full flex-wrap items-center justify-center gap-0 text-lg font-bold" aria-label="Conectar as peças do quebra-cabeça">
          <span className="rounded-l-2xl bg-sky px-4 py-4 text-primary-foreground transition-transform duration-700" style={{ transform: linked ? "none" : "translateX(-24px)" }}>Pedro estudou bastante.</span>
          <span className={`px-3 py-4 transition-all duration-700 ${linked ? "bg-sun scale-110" : "bg-muted opacity-40"}`}>Por isso,</span>
          <span className="rounded-r-2xl bg-leaf px-4 py-4 text-ink transition-transform duration-700" style={{ transform: linked ? "none" : "translateX(24px)" }}>conseguiu uma boa nota.</span>
        </button>
        {linked && <p className="mt-3 text-center font-semibold animate-fade-in">✨ <mark className="rounded bg-sun px-1">"Por isso"</mark> conecta as duas ideias: a boa nota é consequência do estudo.</p>}
      </div>
      {t(
        <ul className="grid gap-3 sm:grid-cols-3">
          <li className="rounded-2xl bg-card p-4 shadow-soft"><strong className="text-sky-deep">Coesão referencial</strong><br />retoma termos (pronomes, sinônimos): “Maria… ela”.</li>
          <li className="rounded-2xl bg-card p-4 shadow-soft"><strong className="text-sky-deep">Coesão sequencial</strong><br />liga orações com conectivos: “mas”, “portanto”.</li>
          <li className="rounded-2xl bg-card p-4 shadow-soft"><strong className="text-sky-deep">Problema de coesão</strong><br />repetição excessiva ou conectivo errado: “Choveu, mas a rua ficou molhada.”</li>
        </ul>,
        null,
      )}
    </div>
  );
}

export const CONNECTIVES = [
  { w: "E", rel: "Adição", mean: "Soma uma ideia à outra.", ex: "Comprei pão e leite.", c: "bg-sky", more: "Outros: também, além disso, nem." },
  { w: "MAS", rel: "Oposição", mean: "Mostra uma ideia contrária.", ex: "Estudei, mas não entendi tudo.", c: "bg-bubble", more: "Outros: porém, contudo, entretanto, todavia." },
  { w: "PORQUE", rel: "Causa", mean: "Explica o motivo.", ex: "Faltei porque estava doente.", c: "bg-tangerine", more: "Outros: pois, já que, visto que." },
  { w: "POR ISSO", rel: "Consequência", mean: "Mostra o resultado.", ex: "Treinou muito, por isso venceu.", c: "bg-leaf", more: "Outros: de modo que, tanto que." },
  { w: "PORTANTO", rel: "Conclusão", mean: "Fecha um raciocínio.", ex: "Todos votaram; portanto, a decisão é válida.", c: "bg-grape", more: "Outros: logo, assim, dessa forma." },
];

export function Lesson2() {
  const t = useT();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <LecoSays mood="surpreso">{t("Conectivos são pontes entre ideias! Cada um cria uma relação de sentido diferente.", "Conectivos são pontes que ligam ideias! 🌉")}</LecoSays>
      <div className="flex items-center justify-center gap-2 rounded-2xl bg-tangerine-soft p-5 text-center font-bold">
        <span className="rounded-xl bg-card px-3 py-3 shadow-soft">Choveu muito</span>
        <svg width="90" height="40" viewBox="0 0 90 40" aria-hidden><path d="M2 35 Q45 -5 88 35" fill="none" stroke="var(--tangerine)" strokeWidth="6" strokeLinecap="round" className="animate-dash" /></svg>
        <span className="rounded-xl bg-card px-3 py-3 shadow-soft">a rua alagou</span>
      </div>
      <p className="text-center font-semibold">A ponte aqui é <mark className="rounded bg-sun px-1">por isso</mark> → consequência.</p>
      <p className="font-bold">👆 Clique em um conectivo:</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CONNECTIVES.map((c) => (
          <button key={c.w} onClick={() => setOpen(open === c.w ? null : c.w)} aria-expanded={open === c.w}
            className={`rounded-2xl p-4 text-left transition ${open === c.w ? "bg-card ring-4 ring-sun shadow-soft" : `${c.c} text-primary-foreground shadow-pop hover:-translate-y-1`}`}>
            <span className="block font-display text-2xl font-bold">{c.w}</span>
            {open === c.w ? (
              <span className="mt-2 block text-sm text-ink animate-fade-in">
                <strong>Significado:</strong> {c.mean}<br />
                <strong>Relação:</strong> {c.rel}<br />
                <strong>Exemplo:</strong> “{c.ex}”
                {t(<><br /><em>{c.more}</em></>, null)}
              </span>
            ) : (
              <span className="text-sm font-bold opacity-90">{c.rel}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Lesson3() {
  const t = useT();
  return (
    <div className="space-y-6">
      <LecoSays mood="pensando">{t("Pronomes podem retomar palavras já ditas e ajudam a evitar repetições.", "Pronomes são palavras que trocam de lugar com nomes, para não repetir! 🔁")}</LecoSays>
      <div className="relative rounded-2xl bg-leaf-soft p-6">
        <svg className="absolute inset-x-0 top-1 mx-auto h-12 w-full max-w-lg" viewBox="0 0 400 50" aria-hidden preserveAspectRatio="none">
          <path d="M40 45 Q120 0 210 45" fill="none" stroke="var(--sky)" strokeWidth="4" className="animate-dash" markerEnd="url(#a1)" />
          <path d="M150 45 Q260 -5 360 45" fill="none" stroke="var(--bubble)" strokeWidth="4" className="animate-dash" markerEnd="url(#a2)" />
          <defs>
            <marker id="a1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="var(--sky)" /></marker>
            <marker id="a2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="var(--bubble)" /></marker>
          </defs>
        </svg>
        <p className="mt-10 text-center text-xl font-semibold md:text-2xl">
          <mark className="rounded bg-sky px-1 text-primary-foreground">Maria</mark> comprou um <mark className="rounded bg-bubble px-1 text-primary-foreground">livro</mark>.{" "}
          <mark className="rounded bg-sky px-1 text-primary-foreground">Ela</mark> começou a lê-<mark className="rounded bg-bubble px-1 text-primary-foreground">lo</mark>.
        </p>
        <div className="mt-4 grid gap-2 text-center font-bold sm:grid-cols-2">
          <p>🔵 “Ela” retoma “Maria”.</p>
          <p>🩷 “lo” retoma “livro”.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-tangerine bg-card p-4"><p className="font-bold text-tangerine-deep">✖ Sem retomada</p><p>Maria comprou um livro. Maria começou a ler o livro.</p></div>
        <div className="rounded-2xl border-2 border-leaf bg-card p-4"><p className="font-bold text-leaf-deep">✔ Com retomada</p><p>Maria comprou um livro. Ela começou a lê-lo.</p></div>
      </div>
      {t(<p className="rounded-2xl bg-card p-4 shadow-soft"><strong>Atenção em provas:</strong> retomadas também podem ser feitas por sinônimos (“o cão… o animal”), advérbios (“lá”, “aí”) e expressões (“tal fato”). Cuidado com a <em>ambiguidade</em>: “João falou com Pedro sobre seu carro” — carro de quem?</p>, null)}
    </div>
  );
}

export function Lesson4() {
  const t = useT();
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-6">
      <LecoSays mood="feliz">{t("Coerência é quando as ideias de um texto fazem sentido juntas.", "Coerência é quando tudo faz sentido! 💡")}</LecoSays>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border-4 border-leaf bg-leaf-soft p-5">
          <p className="text-4xl">🌧️ → ☂️</p>
          <p className="mt-2 font-bold text-leaf-deep">✔ Coerente</p>
          <p className="text-lg">“Estava chovendo muito, então peguei meu guarda-chuva.”</p>
        </div>
        <div className="rounded-2xl border-4 border-tangerine bg-tangerine-soft p-5">
          <p className="text-4xl">🌧️ → 🕶️ ❓</p>
          <p className="mt-2 font-bold text-tangerine-deep">✖ Incoerente</p>
          <p className="text-lg">“Estava chovendo muito, então coloquei óculos de sol para não me molhar.”</p>
          <button onClick={() => setShow(!show)} className="btn-game mt-3 bg-tangerine text-ink">{show ? "Esconder" : "Por que não faz sentido?"}</button>
          {show && (
            <div className="mt-3 flex items-center gap-3 animate-fade-in">
              <Leco mood="confuso" size={70} />
              <p className="font-semibold">Óculos de sol protegem do sol, não da chuva! A ação não combina com o objetivo.</p>
            </div>
          )}
        </div>
      </div>
      {t(
        <div className="rounded-2xl bg-card p-4 shadow-soft">
          <p className="font-bold">Para um texto ser coerente, observe:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><strong>Não contradição:</strong> uma ideia não pode negar a outra.</li>
            <li><strong>Progressão:</strong> o texto avança, trazendo informações novas.</li>
            <li><strong>Relação com o mundo:</strong> as ideias combinam com a realidade (ou com o mundo criado no texto).</li>
            <li><strong>Organização:</strong> começo, meio e fim em ordem lógica.</li>
          </ul>
          <p className="mt-2 text-muted-foreground">Um texto pode ter coesão (conectivos certos) e mesmo assim ser incoerente!</p>
        </div>,
        null,
      )}
    </div>
  );
}

export function Lesson5() {
  const t = useT();
  return (
    <div className="space-y-6">
      <LecoSays mood="pensando">{t("Agora é hora de diferenciar: o problema está na ligação (coesão) ou no sentido (coerência)?", "Vamos achar o que está errado nos textos! 🕵️")}</LecoSays>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-sky-soft p-5">
          <p className="font-display text-xl font-bold text-sky-deep">🔗 Problema de coesão</p>
          <p className="mt-1">A ligação está errada ou repetitiva.</p>
          <p className="mt-2 italic">“Gosto de futebol, mas jogo todo fim de semana.”</p>
          <p className="text-sm">→ “mas” indica oposição, mas não há oposição. O certo: “por isso”.</p>
        </div>
        <div className="rounded-2xl bg-grape-soft p-5">
          <p className="font-display text-xl font-bold text-grape-deep">💡 Problema de coerência</p>
          <p className="mt-1">As ideias não fazem sentido juntas.</p>
          <p className="mt-2 italic">“Sou vegetariano e meu prato favorito é picanha.”</p>
          <p className="text-sm">→ Contradição: vegetarianos não comem carne.</p>
        </div>
      </div>
    </div>
  );
}

export const LESSONS = [Lesson1, Lesson2, Lesson3, Lesson4, Lesson5];
