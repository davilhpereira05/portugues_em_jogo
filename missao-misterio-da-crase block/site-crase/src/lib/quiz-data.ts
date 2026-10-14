export type Question = {
  id: number;
  phase: number;
  prompt: string;
  options: string[];
  correct: number; // index
  explanation: string;
  timed?: boolean;
};

export const PHASES = [
  { id: 1, name: "Regência verbal", icon: "⚡" },
  { id: 2, name: "Regência nominal", icon: "🧩" },
  { id: 3, name: "Crase", icon: "🔤" },
  { id: 4, name: "Caça ao erro", icon: "🔎" },
  { id: 5, name: "Desafio misto", icon: "🏁" },
];

export const XP_PER_QUESTION = 100;

export const QUESTIONS: Question[] = [
  {
    id: 1,
    phase: 1,
    prompt: "Eu gosto ___ música.",
    options: ["a", "de", "em", "por"],
    correct: 1,
    explanation: "O verbo gostar exige a preposição de. Portanto, o correto é “Gosto de música”.",
  },
  {
    id: 2,
    phase: 1,
    prompt: "Assisti ___ filme ontem. (sentido de ver)",
    options: ["o", "ao", "no", "do"],
    correct: 1,
    explanation:
      "O verbo assistir, no sentido de ver, exige a preposição a. Como filme é masculino e aceita o artigo o, temos a + o = ao.",
  },
  {
    id: 3,
    phase: 1,
    prompt: "Preciso ___ ajuda para terminar o trabalho.",
    options: ["de", "a", "em", "com"],
    correct: 0,
    explanation: "O verbo precisar exige a preposição de: “Preciso de ajuda”.",
  },
  {
    id: 4,
    phase: 2,
    prompt: "Ele demonstrou respeito ___ professores.",
    options: ["de", "por", "aos", "em"],
    correct: 2,
    explanation:
      "O nome respeito exige a preposição a. Com professores (masculino plural), temos a + os = aos.",
  },
  {
    id: 5,
    phase: 2,
    prompt: "Tenho necessidade ___ silêncio para estudar.",
    options: ["em", "de", "a", "por"],
    correct: 1,
    explanation: "O nome necessidade exige a preposição de: “necessidade de silêncio”.",
  },
  {
    id: 6,
    phase: 2,
    prompt: "A turma está apta ___ realizar a prova.",
    options: ["a", "de", "em", "para com"],
    correct: 0,
    explanation: "O adjetivo apto exige a preposição a: “apto a realizar”.",
  },
  {
    id: 7,
    phase: 3,
    prompt: "Fui ___ escola ontem.",
    options: ["a", "à", "há", "ao"],
    correct: 1,
    explanation:
      "O verbo ir exige a preposição a e a palavra escola aceita o artigo a. Assim ocorre crase: a + a = à.",
    timed: true,
  },
  {
    id: 8,
    phase: 3,
    prompt: "A aula começa ___ 8h.",
    options: ["as", "às", "há", "a"],
    correct: 1,
    explanation: "Antes de horas determinadas ocorre crase: “às 8h”.",
    timed: true,
  },
  {
    id: 9,
    phase: 3,
    prompt: "Entreguei o trabalho ___ ela.",
    options: ["à", "a", "às", "ao"],
    correct: 1,
    explanation: "Não ocorre crase antes de pronome pessoal: “Entreguei o trabalho a ela”.",
  },
  {
    id: 10,
    phase: 4,
    prompt: "“Comecei à estudar cedo.” Qual é o erro?",
    options: [
      "Falta preposição depois de comecei",
      "A crase não deve ser usada antes de verbo",
      "O verbo começar exige de",
      "Não há erro na frase",
    ],
    correct: 1,
    explanation:
      "A crase não ocorre antes de verbo. Correto: “Comecei a estudar cedo”.",
  },
  {
    id: 11,
    phase: 4,
    prompt: "“Fui à pé até a escola.” Qual é o erro?",
    options: [
      "Crase antes de palavra masculina",
      "Falta artigo antes de escola",
      "O verbo ir exige de",
      "Não há erro na frase",
    ],
    correct: 0,
    explanation:
      "Pé é palavra masculina e não aceita o artigo a, logo não há crase. Correto: “Fui a pé”.",
  },
  {
    id: 12,
    phase: 4,
    prompt: "“Obedeço as regras da escola.” Qual é o erro?",
    options: [
      "Falta a crase exigida pelo verbo obedecer",
      "O verbo obedecer não pede preposição",
      "Regras deveria estar no singular",
      "Não há erro na frase",
    ],
    correct: 0,
    explanation:
      "O verbo obedecer exige a preposição a e regras aceita o artigo as: a + as = às. Correto: “Obedeço às regras”.",
  },
  {
    id: 13,
    phase: 5,
    prompt: "Assinale a alternativa correta:",
    options: [
      "Prefiro mais futebol do que basquete.",
      "Prefiro futebol do que basquete.",
      "Prefiro futebol a basquete.",
      "Prefiro futebol à basquete.",
    ],
    correct: 2,
    explanation:
      "O verbo preferir exige a preposição a, sem reforços como “mais” ou “do que”. Como basquete é masculino, não há crase.",
  },
  {
    id: 14,
    phase: 5,
    prompt: "Assinale a alternativa correta:",
    options: [
      "Cheguei a escola às 7h.",
      "Cheguei à escola às 7h.",
      "Cheguei na escola às 7h.",
      "Cheguei à escola as 7h.",
    ],
    correct: 1,
    explanation:
      "O verbo chegar exige a preposição a e escola aceita o artigo a (a + a = à). Antes de horas determinadas também ocorre crase: às 7h.",
    timed: true,
  },
  {
    id: 15,
    phase: 5,
    prompt: "Complete: “Aspiro ___ cargo de investigador.” (sentido de desejar)",
    options: ["o", "ao", "no", "de"],
    correct: 1,
    explanation:
      "Aspirar, no sentido de desejar, exige a preposição a. Com cargo (masculino), a + o = ao.",
  },
];

export type Rank = { min: number; name: string; icon: string };

export const RANKS: Rank[] = [
  { min: 0, name: "Aprendiz da Língua", icon: "🥉" },
  { min: 600, name: "Investigador da Língua", icon: "🥈" },
  { min: 1100, name: "Mestre da Regência", icon: "🥇" },
  { min: 1500, name: "Mestre da Crase", icon: "👑" },
];

export function rankFor(xp: number): Rank {
  if (xp >= 1500) return { min: 1500, name: "Mestre da Crase", icon: "👑" };
  if (xp >= 1100) return { min: 1100, name: "Mestre da Regência", icon: "🥇" };
  if (xp >= 600) return { min: 600, name: "Investigador da Língua", icon: "🥈" };
  return { min: 0, name: "Aprendiz da Língua", icon: "🥉" };
}

export const MEDALS = [
  { id: "novato", icon: "🥉", name: "Novato da Regência", requirement: 300, hint: "Conquiste 300 XP" },
  {
    id: "investigador",
    icon: "🥈",
    name: "Investigador da Língua",
    requirement: 700,
    hint: "Conquiste 700 XP",
  },
  {
    id: "especialista",
    icon: "🥇",
    name: "Especialista em Crase",
    requirement: 1100,
    hint: "Conquiste 1100 XP",
  },
  {
    id: "mestre",
    icon: "👑",
    name: "Mestre da Língua Portuguesa",
    requirement: 1500,
    hint: "Conquiste os 1500 XP",
  },
];
