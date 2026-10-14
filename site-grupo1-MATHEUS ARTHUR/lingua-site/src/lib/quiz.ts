export type Question = {
  tag: string;
  enunciado: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export const textoApoio = {
  titulo: "A Escolha Consciente",
  paragrafos: [
    "Todos os dias, toneladas de resíduos plásticos são descartadas de forma inadequada no meio ambiente. Garrafas, sacolas e embalagens levam centenas de anos para se decompor, afetando a fauna marinha e poluindo rios e oceanos.",
    "Reduzir o uso de plásticos descartáveis não é apenas uma opção, é uma necessidade urgente para garantir o futuro do planeta. Mudar pequenos hábitos diários, como levar uma sacola retornável ao mercado ou utilizar garrafas reutilizáveis, gera um impacto positivo gigantesco ao longo do tempo.",
  ],
  chamada: "Se você quer fazer a sua parte, siga estes passos simples:",
  passos: [
    "Recuse canudos e copos descartáveis.",
    "Separe o lixo reciclável na sua casa.",
    "Prefira produtos com embalagens biodegradáveis.",
  ],
  fecho: "Faça a sua escolha hoje e ajude a salvar o planeta!",
};

export const questions: Question[] = [
  {
    tag: "Informação explícita",
    enunciado:
      "De acordo com o texto, quanto tempo os resíduos plásticos levam para se decompor?",
    opcoes: ["Poucos meses.", "Centenas de anos.", "Dezenas de dias.", "O texto não menciona."],
    correta: 1,
    explicacao:
      "O primeiro parágrafo diz que garrafas, sacolas e embalagens levam centenas de anos para se decompor.",
  },
  {
    tag: "Tema do texto",
    enunciado: 'Qual é o tema principal do texto "A Escolha Consciente"?',
    opcoes: [
      "A vida dos animais nos oceanos.",
      "A importância da redução do uso de plástico no dia a dia.",
      "Como fabricar sacolas retornáveis.",
      "O custo do lixo reciclável.",
    ],
    correta: 1,
    explicacao:
      "O tema é o assunto central: o texto todo gira em torno de reduzir o uso de plástico no cotidiano.",
  },
  {
    tag: "Finalidade do texto",
    enunciado: "Qual é a principal finalidade (objetivo) desse texto?",
    opcoes: [
      "Divertir o leitor com uma história inventada.",
      "Vender garrafas e sacolas de pano.",
      "Conscientizar e orientar o leitor a adotar hábitos sustentáveis.",
      "Ensinar uma receita culinária.",
    ],
    correta: 2,
    explicacao:
      "A finalidade é o objetivo do texto: aqui, convencer e orientar o leitor a mudar hábitos.",
  },
  {
    tag: "Tipologia textual",
    enunciado:
      'No segundo parágrafo, o autor defende a ideia de que "reduzir o uso de plásticos descartáveis não é apenas uma opção, é uma necessidade urgente". Essa parte apresenta características de qual tipo textual?',
    opcoes: ["Argumentativo", "Narrativo", "Descritivo", "Injuntivo"],
    correta: 0,
    explicacao: "O trecho defende uma tese com argumentos, característica do tipo argumentativo.",
  },
  {
    tag: "Tipologia textual",
    enunciado:
      "A lista numerada no final do texto (1. Recuse..., 2. Separe..., 3. Prefira...) tem o objetivo de dar instruções ao leitor. Esse trecho é um exemplo de tipo:",
    opcoes: ["Narrativo", "Expositivo", "Injuntivo", "Poético"],
    correta: 2,
    explicacao: "Textos injuntivos dão ordens, conselhos ou instruções de como fazer algo.",
  },
  {
    tag: "Inferência",
    enunciado:
      'Ao ler a frase "Mudar pequenos hábitos diários [...] gera um impacto positivo gigantesco ao longo do tempo", podemos inferir que:',
    opcoes: [
      "Pequenas ações individuais não fazem diferença na preservação do planeta.",
      "A mudança do planeta depende apenas de grandes indústrias e governos.",
      "Atitudes simples do dia a dia, quando mantidas, acumulam ótimos resultados ambientais.",
      "É impossível mudar os hábitos da sociedade atual.",
    ],
    correta: 2,
    explicacao:
      "A inferência é a leitura das entrelinhas: pequenas atitudes repetidas somam grandes resultados.",
  },
  {
    tag: "Compreensão x Interpretação",
    enunciado:
      "Qual das alternativas abaixo traz uma informação explícita (que está escrita de forma direta no texto)?",
    opcoes: [
      "O autor do texto reciclava lixo desde a infância.",
      "As sacolas plásticas são mais baratas que as retornáveis.",
      "Garrafas, sacolas e embalagens afetam a fauna marinha e poluem rios.",
      "O planeta estará destruído em 10 anos.",
    ],
    correta: 2,
    explicacao: "Essa informação aparece escrita claramente no primeiro parágrafo.",
  },
  {
    tag: "Marcas linguísticas",
    enunciado:
      'Verbos como "Recuse", "Separe", "Prefira" e "Faça" estão no modo imperativo. Esse tipo de verbo é muito comum em textos de tipo:',
    opcoes: ["Descritivo", "Injuntivo", "Expositivo", "Narrativo"],
    correta: 1,
    explicacao: "O modo imperativo é a marca típica do texto injuntivo, que instrui e aconselha.",
  },
  {
    tag: "Tipologia textual",
    enunciado:
      "Se o texto contasse a história de uma tartaruga marinha chamada Bela, que se prendeu em uma sacola plástica e depois foi salva por um mergulhador, a tipologia predominante seria:",
    opcoes: ["Injunção", "Argumentação", "Narração", "Exposição"],
    correta: 2,
    explicacao: "Há fatos, personagens, tempo e espaço: os elementos da narração.",
  },
  {
    tag: "Gêneros textuais",
    enunciado:
      "O texto lido mistura trechos explicativos, argumentativos e de instrução. Ele se aproxima de qual gênero do nosso cotidiano?",
    opcoes: [
      "Artigo/Campanha de Conscientização",
      "Bula de remédio",
      "Manual de instalação de TV",
      "Poema lírico",
    ],
    correta: 0,
    explicacao:
      "Campanhas de conscientização informam, convencem e orientam o leitor ao mesmo tempo.",
  },
];
