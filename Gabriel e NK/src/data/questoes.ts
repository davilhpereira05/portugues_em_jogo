import type { Area } from "@/lib/progresso";

export type TipoQuestao =
  | "multipla"
  | "vf"
  | "caca"
  | "complete"
  | "associacao"
  | "relampago"
  | "final";

type Base = {
  id: string;
  numero: number;
  tipo: TipoQuestao;
  area: Area;
  rotulo: string;
  enunciado: string;
  explicacao: string;
  xp: number;
};

export type QuestaoMultipla = Base & {
  tipo: "multipla" | "relampago" | "complete";
  opcoes: string[];
  correta: number;
  tempoLimite?: number;
};

export type QuestaoVF = Base & {
  tipo: "vf";
  afirmacao: string;
  correta: boolean;
};

export type QuestaoCaca = Base & {
  tipo: "caca";
  palavras: string[];
  indiceErro: number;
  correcao: string;
};

export type QuestaoAssociacao = Base & {
  tipo: "associacao";
  pares: { sujeito: string; verbo: string }[];
};

export type QuestaoFinal = Base & {
  tipo: "final";
  palavras: string[];
  indicesErro: number[];
  versaoCorrigida: string;
  detalhes: { de: string; para: string; motivo: string }[];
};

export type Questao =
  | QuestaoMultipla
  | QuestaoVF
  | QuestaoCaca
  | QuestaoAssociacao
  | QuestaoFinal;

export const questoes: Questao[] = [
  {
    id: "q01",
    numero: 1,
    tipo: "multipla",
    area: "verbal",
    rotulo: "Múltipla escolha",
    enunciado: "Qual frase está correta?",
    opcoes: [
      "Os aluno estudaram.",
      "Os alunos estudou.",
      "Os alunos estudaram.",
      "O alunos estudaram.",
    ],
    correta: 2,
    explicacao:
      "O sujeito “os alunos” está no plural. Portanto, o artigo, o substantivo e o verbo precisam estar no plural: “Os alunos estudaram.”",
    xp: 100,
  },
  {
    id: "q02",
    numero: 2,
    tipo: "multipla",
    area: "nominal",
    rotulo: "Múltipla escolha",
    enunciado: "Qual alternativa apresenta concordância nominal adequada?",
    opcoes: [
      "As menina bonita chegaram.",
      "As meninas bonitas chegaram.",
      "As meninas bonita chegaram.",
      "A meninas bonitas chegaram.",
    ],
    correta: 1,
    explicacao:
      "Artigo, substantivo e adjetivo formam um bloco: “as” (plural/feminino) + “meninas” (plural/feminino) + “bonitas” (plural/feminino).",
    xp: 100,
  },
  {
    id: "q03",
    numero: 3,
    tipo: "multipla",
    area: "especiais",
    rotulo: "Expressão partitiva",
    enunciado: "Complete: “A maioria dos estudantes ______ da atividade.”",
    opcoes: ["participaram apenas", "participou (ou participaram)", "participavas", "participando"],
    correta: 1,
    explicacao:
      "Com expressões partitivas (“a maioria de”, “grande parte de”), a norma prefere o verbo no singular, concordando com o núcleo “a maioria”. O plural também é aceito quando se deseja destacar os elementos do grupo — as duas formas são possíveis.",
    xp: 100,
  },
  {
    id: "q04",
    numero: 4,
    tipo: "multipla",
    area: "especiais",
    rotulo: "Verbo haver",
    enunciado: "Qual frase segue a norma-padrão?",
    opcoes: [
      "Haviam muitas pessoas na sala.",
      "Houveram muitos problemas.",
      "Havia muitas pessoas na sala.",
      "Hão de haverem soluções.",
    ],
    correta: 2,
    explicacao:
      "No sentido de “existir”, o verbo haver é impessoal: não tem sujeito e fica sempre no singular — “Havia muitas pessoas”, “Houve muitos problemas”.",
    xp: 100,
  },
  {
    id: "q05",
    numero: 5,
    tipo: "multipla",
    area: "nominal",
    rotulo: "Caso especial",
    enunciado: "Sobre “É proibida a entrada de pessoas não autorizadas”, qual explicação está correta?",
    opcoes: [
      "Está errada: o correto é sempre “é proibido”.",
      "Está correta: “proibida” concorda com “a entrada”, que vem determinada pelo artigo.",
      "Está correta apenas na linguagem informal.",
      "Está errada porque “entrada” é masculino.",
    ],
    correta: 1,
    explicacao:
      "Quando o substantivo está determinado por artigo, o adjetivo concorda com ele: “É proibida a entrada”. Sem artigo, usa-se a forma neutra: “É proibido entrada de estranhos”.",
    xp: 100,
  },
  {
    id: "q06",
    numero: 6,
    tipo: "vf",
    area: "especiais",
    rotulo: "Verdadeiro ou falso",
    enunciado: "Analise a frase abaixo:",
    afirmacao: "“Faz três anos que moro nesta cidade.”",
    correta: true,
    explicacao:
      "Verdadeiro. Indicando tempo decorrido, o verbo fazer é impessoal e permanece no singular: “Faz três anos…”, “Fazia dois meses…”.",
    xp: 100,
  },
  {
    id: "q07",
    numero: 7,
    tipo: "vf",
    area: "especiais",
    rotulo: "Verdadeiro ou falso",
    enunciado: "Analise a frase abaixo:",
    afirmacao: "“Houveram muitos problemas durante a prova.”",
    correta: false,
    explicacao:
      "Falso. Haver no sentido de existir não vai para o plural: “Houve muitos problemas durante a prova.”",
    xp: 100,
  },
  {
    id: "q08",
    numero: 8,
    tipo: "vf",
    area: "nominal",
    rotulo: "Verdadeiro ou falso",
    enunciado: "Analise a frase abaixo:",
    afirmacao: "“Comprei duas camisas e uma calça baratas.”",
    correta: true,
    explicacao:
      "Verdadeiro. Quando o adjetivo vem depois de vários substantivos, ele pode ir para o plural, concordando com o conjunto: “camisas e calça baratas”. Também é aceito concordar apenas com o mais próximo: “…uma calça barata”.",
    xp: 100,
  },
  {
    id: "q09",
    numero: 9,
    tipo: "caca",
    area: "verbal",
    rotulo: "Caça ao erro",
    enunciado: "Clique na palavra que quebra a concordância:",
    palavras: ["As", "meninas", "estava", "muito", "animadas"],
    indiceErro: 2,
    correcao: "As meninas estavam muito animadas.",
    explicacao:
      "O sujeito “as meninas” está no plural. Por isso, o verbo deve estar no plural: estavam.",
    xp: 100,
  },
  {
    id: "q10",
    numero: 10,
    tipo: "caca",
    area: "nominal",
    rotulo: "Caça ao erro",
    enunciado: "Clique na palavra incorreta:",
    palavras: ["Menas", "pessoas", "participaram", "do", "evento"],
    indiceErro: 0,
    correcao: "Menos pessoas participaram do evento.",
    explicacao:
      "“Menos” é invariável: não existe a forma “menas”. O correto é “Menos pessoas participaram”.",
    xp: 100,
  },
  {
    id: "q11",
    numero: 11,
    tipo: "complete",
    area: "verbal",
    rotulo: "Complete a frase",
    enunciado: "Os estudantes ______ para a avaliação.",
    opcoes: ["estudou", "estudaram", "estudava", "estudando"],
    correta: 1,
    explicacao:
      "O sujeito “os estudantes” está no plural, então o verbo concorda com ele: estudaram.",
    xp: 100,
  },
  {
    id: "q12",
    numero: 12,
    tipo: "complete",
    area: "nominal",
    rotulo: "Complete a frase",
    enunciado: "Os candidatos estavam ______ de conseguir a vaga.",
    opcoes: ["certa", "certos", "certo", "certamente"],
    correta: 1,
    explicacao:
      "“Certos” é adjetivo e concorda com “os candidatos” (masculino plural). Aqui não se trata do advérbio “certamente”.",
    xp: 100,
  },
  {
    id: "q13",
    numero: 13,
    tipo: "associacao",
    area: "verbal",
    rotulo: "Associação",
    enunciado: "Associe cada sujeito à forma verbal adequada:",
    pares: [
      { sujeito: "O aluno", verbo: "estudou" },
      { sujeito: "Os alunos", verbo: "estudaram" },
      { sujeito: "A maioria dos alunos", verbo: "estudou" },
      { sujeito: "Eu e meu colega", verbo: "estudamos" },
    ],
    explicacao:
      "O verbo acompanha o número e a pessoa do sujeito. Com sujeito composto que inclui “eu”, o verbo vai para a 1ª pessoa do plural: estudamos.",
    xp: 100,
  },
  {
    id: "q14",
    numero: 14,
    tipo: "relampago",
    area: "verbal",
    rotulo: "Desafio relâmpago",
    enunciado: "Os jogadores ______ preparados para a partida.",
    opcoes: ["estava", "estavam", "esteve", "estaria"],
    correta: 1,
    tempoLimite: 10,
    explicacao:
      "Sujeito no plural (“os jogadores”) exige verbo no plural: estavam.",
    xp: 100,
  },
  {
    id: "q15",
    numero: 15,
    tipo: "final",
    area: "especiais",
    rotulo: "Desafio final",
    enunciado:
      "Clique em todas as palavras que estão fora de lugar no texto abaixo (são 3 erros):",
    palavras: [
      "Os",
      "estudantes",
      "chegou",
      "cedo",
      "para",
      "a",
      "atividade.",
      "A",
      "maioria",
      "dos",
      "alunos",
      "estavam",
      "preparados.",
      "Haviam",
      "muitas",
      "tarefas",
      "para",
      "realizar.",
    ],
    indicesErro: [2, 11, 13],
    versaoCorrigida:
      "Os estudantes chegaram cedo para a atividade. A maioria dos alunos estava preparada. Havia muitas tarefas para realizar.",
    detalhes: [
      {
        de: "chegou",
        para: "chegaram",
        motivo: "O sujeito “os estudantes” está no plural, então o verbo vai para o plural.",
      },
      {
        de: "estavam",
        para: "estava",
        motivo:
          "O núcleo do sujeito é “a maioria”, no singular. Com expressão partitiva, a norma prefere o verbo no singular.",
      },
      {
        de: "Haviam",
        para: "Havia",
        motivo: "Haver no sentido de existir é impessoal e fica no singular.",
      },
    ],
    explicacao:
      "Três desvios: “chegou” não concorda com “os estudantes”; “estavam” ignora o núcleo singular “a maioria”; e “Haviam” desrespeita a impessoalidade de haver no sentido de existir.",
    xp: 500,
  },
];

export const totalQuestoes = questoes.length;

export const distribuicao = [
  { tipo: "Múltipla escolha", quantidade: 5 },
  { tipo: "Verdadeiro ou falso", quantidade: 3 },
  { tipo: "Caça ao erro", quantidade: 2 },
  { tipo: "Complete a frase", quantidade: 2 },
  { tipo: "Associação", quantidade: 1 },
  { tipo: "Desafio relâmpago", quantidade: 1 },
  { tipo: "Desafio final", quantidade: 1 },
];

export const rotuloArea: Record<Area, string> = {
  verbal: "Concordância verbal",
  nominal: "Concordância nominal",
  especiais: "Casos especiais",
};
