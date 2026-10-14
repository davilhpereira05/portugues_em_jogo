export const PHASES = [
  { id: 1, title: "O Mundo da Coesão", emoji: "🧩", tone: "sky" as const, short: "Ligar as partes do texto." },
  { id: 2, title: "A Ponte dos Conectivos", emoji: "🌉", tone: "tangerine" as const, short: "Palavras que unem ideias." },
  { id: 3, title: "O Mistério dos Pronomes", emoji: "🔍", tone: "leaf" as const, short: "Retomar sem repetir." },
  { id: 4, title: "O Reino da Coerência", emoji: "🏰", tone: "bubble" as const, short: "Ideias que fazem sentido." },
  { id: 5, title: "Desafio dos Textos", emoji: "📜", tone: "sun" as const, short: "Encontrar problemas nos textos." },
];

export const toneBg = {
  sky: "bg-sky", tangerine: "bg-tangerine", leaf: "bg-leaf", bubble: "bg-bubble", sun: "bg-sun", grape: "bg-grape",
} as const;
export const toneSoft = {
  sky: "bg-sky-soft", tangerine: "bg-tangerine-soft", leaf: "bg-leaf-soft", bubble: "bg-bubble-soft", sun: "bg-sun-soft", grape: "bg-grape-soft",
} as const;
