export type Question = {
  prompt: string;
  highlight?: string;
  options: string[];
  correct: number;
  gabarito: string;
};

export type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
};

export const lessons: Lesson[] = [
  {
    id: "termos",
    title: "Termos da Oração",
    subtitle: "sujeito, predicado e complementos",
    questions: [
      {
        prompt: "Qual é o sujeito em",
        highlight: "“Os alunos chegaram cedo”?",
        options: ["Os alunos", "chegaram", "cedo", "não há sujeito"],
        correct: 0,
        gabarito: "Sujeito é quem pratica a ação: “Os alunos”.",
      },
      {
        prompt: "Em",
        highlight: "“Maria comprou um livro”, “um livro” é:",
        options: ["objeto indireto", "objeto direto", "predicativo", "adjunto adverbial"],
        correct: 1,
        gabarito: "Verbo “comprar” não pede preposição: objeto direto.",
      },
      {
        prompt: "O termo “muito bonito” em",
        highlight: "“O dia está muito bonito” é:",
        options: ["objeto direto", "aposto", "predicativo do sujeito", "vocativo"],
        correct: 2,
        gabarito: "Com verbo de ligação (“estar”), o termo qualifica o sujeito.",
      },
      {
        prompt: "Em",
        highlight: "“Gosto de música”, “de música” é:",
        options: ["objeto indireto", "objeto direto", "sujeito", "agente da passiva"],
        correct: 0,
        gabarito: "O verbo exige preposição “de”: objeto indireto.",
      },
      {
        prompt: "Qual termo é o adjunto adverbial em",
        highlight: "“Ele saiu ontem”?",
        options: ["Ele", "saiu", "ontem", "nenhum"],
        correct: 2,
        gabarito: "“Ontem” indica circunstância de tempo: adjunto adverbial.",
      },
    ],
  },
  {
    id: "composto",
    title: "Período Composto",
    subtitle: "coordenação e subordinação",
    questions: [
      {
        prompt: "Em",
        highlight: "“Choveu, e viemos”, o que liga as orações?",
        options: [
          "conjunção adversativa",
          "conjunção aditiva",
          "conjunção causal",
          "conjunção explicativa",
        ],
        correct: 1,
        gabarito: "“e” soma ações: coordenação aditiva.",
      },
      {
        prompt: "Em",
        highlight: "“Estudou, mas não passou”, a 2ª oração é:",
        options: [
          "coordenada adversativa",
          "subordinada causal",
          "coordenada aditiva",
          "subordinada final",
        ],
        correct: 0,
        gabarito: "“mas” opõe ideias: coordenada sindética adversativa.",
      },
      {
        prompt: "Um período composto tem:",
        options: [
          "uma só oração",
          "duas ou mais orações",
          "sempre vírgula",
          "nenhum verbo",
        ],
        correct: 1,
        gabarito: "Dois ou mais verbos = duas ou mais orações.",
      },
      {
        prompt: "Em",
        highlight: "“Saí porque estava tarde”, a 2ª oração é:",
        options: [
          "coordenada explicativa",
          "subordinada adverbial causal",
          "subordinada substantiva",
          "coordenada conclusiva",
        ],
        correct: 1,
        gabarito: "“porque” indica causa e depende da principal.",
      },
      {
        prompt: "Em",
        highlight: "“Espero que você venha”, a oração destacada é:",
        options: [
          "subordinada substantiva objetiva direta",
          "coordenada aditiva",
          "subordinada adverbial",
          "oração absoluta",
        ],
        correct: 0,
        gabarito: "A oração funciona como objeto direto de “espero”.",
      },
    ],
  },
  {
    id: "conectivos",
    title: "Conectivos",
    subtitle: "valores das conjunções",
    questions: [
      {
        prompt: "“Portanto” indica:",
        options: ["conclusão", "oposição", "adição", "alternância"],
        correct: 0,
        gabarito: "“Portanto” é conclusivo.",
      },
      {
        prompt: "“Ou... ou” indica:",
        options: ["causa", "alternância", "conclusão", "explicação"],
        correct: 1,
        gabarito: "Par “ou... ou” é alternativo.",
      },
      {
        prompt: "“Embora” introduz oração:",
        options: ["concessiva", "final", "temporal", "comparativa"],
        correct: 0,
        gabarito: "“Embora” marca concessão.",
      },
      {
        prompt: "“A fim de que” indica:",
        options: ["finalidade", "condição", "tempo", "causa"],
        correct: 0,
        gabarito: "Locução final: indica objetivo.",
      },
      {
        prompt: "“Caso” introduz oração:",
        options: ["condicional", "consecutiva", "conformativa", "proporcional"],
        correct: 0,
        gabarito: "“Caso” equivale a “se”: condicional.",
      },
    ],
  },
  {
    id: "subordinacao",
    title: "Subordinação",
    subtitle: "orações dependentes",
    questions: [
      {
        prompt: "Oração subordinada adjetiva começa geralmente com:",
        options: ["pronome relativo", "conjunção aditiva", "preposição", "advérbio"],
        correct: 0,
        gabarito: "“que, o qual, cujo...” introduzem adjetivas.",
      },
      {
        prompt: "Em",
        highlight: "“O livro que li é bom”, a oração destacada é:",
        options: ["adjetiva restritiva", "adjetiva explicativa", "substantiva", "adverbial"],
        correct: 0,
        gabarito: "Sem vírgulas e restringe o sentido: restritiva.",
      },
      {
        prompt: "Subordinada substantiva exerce função de:",
        options: ["substantivo", "adjetivo", "advérbio", "verbo"],
        correct: 0,
        gabarito: "Ela ocupa lugar de sujeito, objeto, etc.",
      },
      {
        prompt: "Em",
        highlight: "“Quando chegar, avise”, a 1ª oração é:",
        options: ["adverbial temporal", "adjetiva", "substantiva", "coordenada"],
        correct: 0,
        gabarito: "“Quando” marca tempo: adverbial temporal.",
      },
      {
        prompt: "Oração reduzida é aquela que:",
        options: [
          "não tem conectivo e usa forma nominal",
          "tem sempre conjunção",
          "não tem verbo",
          "é sempre coordenada",
        ],
        correct: 0,
        gabarito: "Usa infinitivo, gerúndio ou particípio, sem conectivo.",
      },
    ],
  },
];
