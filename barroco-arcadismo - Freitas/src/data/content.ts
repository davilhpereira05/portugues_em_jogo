export type Caracteristica = {
  id: string;
  titulo: string;
  resumo: string;
  explicacao: string;
  exemplo: string;
};

export const barrocoContexto = [
  "Surgiu na Europa no século XVII.",
  "Foi influenciado pelos conflitos religiosos da época.",
  "No Brasil, desenvolveu-se principalmente no século XVII.",
  "Teve forte influência da Igreja Católica e da Contrarreforma.",
  "A literatura refletia conflitos entre fé e razão.",
];

export const arcadismoContexto = [
  "Surgiu no século XVIII.",
  "Foi influenciado pelo Iluminismo.",
  "Valorizava a razão e a simplicidade.",
  "No Brasil, destacou-se principalmente em Minas Gerais.",
  "Desenvolveu-se no contexto do ciclo do ouro e da sociedade colonial.",
];

export const barrocoCaracteristicas: Caracteristica[] = [
  {
    id: "dualismo",
    titulo: "Dualismo",
    resumo: "Ideias opostas convivendo no mesmo texto.",
    explicacao:
      "Presença de ideias opostas ou conflitos dentro da mesma obra, como corpo × alma e fé × razão.",
    exemplo: "corpo × alma",
  },
  {
    id: "contraste",
    titulo: "Contraste",
    resumo: "Oposição forte entre elementos diferentes.",
    explicacao:
      "O texto aproxima elementos muito diferentes para criar impacto: luz e sombra, céu e terra, vida e morte.",
    exemplo: "luz × sombra",
  },
  {
    id: "antitese",
    titulo: "Antítese",
    resumo: "Aproximação de ideias contrárias.",
    explicacao:
      "Figura de linguagem que coloca lado a lado palavras ou ideias de sentido contrário.",
    exemplo: "pecado × perdão",
  },
  {
    id: "religiosidade",
    titulo: "Religiosidade",
    resumo: "A fé aparece o tempo todo.",
    explicacao:
      "Forte presença de temas ligados à fé, à culpa, ao arrependimento e à busca pela salvação.",
    exemplo: "culpa × salvação",
  },
  {
    id: "corpo-alma",
    titulo: "Conflito entre corpo e alma",
    resumo: "Desejo terreno contra valor religioso.",
    explicacao:
      "O eu-lírico vive dividido entre os prazeres do mundo e os valores religiosos que prega.",
    exemplo: "prazer × arrependimento",
  },
  {
    id: "pessimismo",
    titulo: "Pessimismo",
    resumo: "O tempo passa e tudo acaba.",
    explicacao:
      "Preocupação com a passagem do tempo, com o pecado e com a morte (a ideia de que tudo é passageiro).",
    exemplo: "vida × morte",
  },
  {
    id: "cultismo",
    titulo: "Cultismo",
    resumo: "Jogo de palavras e imagens.",
    explicacao:
      "Valorização da forma: metáforas, imagens elaboradas e uma linguagem rebuscada.",
    exemplo: "\"o ouro breve da manhã se apaga\"",
  },
  {
    id: "conceptismo",
    titulo: "Conceptismo",
    resumo: "Jogo de ideias e argumentação.",
    explicacao:
      "Valorização do raciocínio: o texto convence por meio de argumentos bem organizados.",
    exemplo: "\"se tudo passa, por que se prender ao que passa?\"",
  },
];

export const arcadismoCaracteristicas: Caracteristica[] = [
  {
    id: "natureza",
    titulo: "Valorização da natureza",
    resumo: "A natureza como cenário ideal.",
    explicacao:
      "Campos, rios, árvores e animais aparecem como espaço de beleza, calma e equilíbrio.",
    exemplo: "contato com a natureza",
  },
  {
    id: "simplicidade",
    titulo: "Simplicidade",
    resumo: "Menos enfeite, mais clareza.",
    explicacao:
      "Linguagem clara e vida modesta: o oposto do exagero barroco.",
    exemplo: "vida simples",
  },
  {
    id: "racionalismo",
    titulo: "Racionalismo",
    resumo: "A razão guia o texto.",
    explicacao:
      "Influência do Iluminismo: equilíbrio e clareza no lugar da emoção dramática.",
    exemplo: "razão × exagero",
  },
  {
    id: "bucolismo",
    titulo: "Bucolismo",
    resumo: "Vida no campo idealizada.",
    explicacao:
      "Valorização de uma vida tranquila e idealizada no campo, longe das preocupações da cidade.",
    exemplo: "campo tranquilo",
  },
  {
    id: "pastoril",
    titulo: "Vida pastoril",
    resumo: "Poetas viram pastores.",
    explicacao:
      "Os poetas assumem pseudônimos de pastores e descrevem o cotidiano simples do campo.",
    exemplo: "Dirceu, o pastor",
  },
  {
    id: "equilibrio",
    titulo: "Equilíbrio",
    resumo: "Nada em excesso.",
    explicacao:
      "Inspiração na Antiguidade Clássica: harmonia, medida e ordem na forma e no conteúdo.",
    exemplo: "forma × medida",
  },
  {
    id: "carpe-diem",
    titulo: "Carpe diem",
    resumo: "Aproveite o dia de hoje.",
    explicacao: "Valorizar e aproveitar o momento presente.",
    exemplo: "\"colha o dia de hoje\"",
  },
  {
    id: "fugere-urbem",
    titulo: "Fugere urbem",
    resumo: "Fugir da cidade.",
    explicacao:
      "Ideia de afastamento da vida urbana e valorização de uma vida mais simples.",
    exemplo: "cidade × campo",
  },
];

export const barrocoAutores = [
  {
    nome: "Gregório de Matos",
    apelido: "Boca do Inferno",
    texto:
      "Um dos principais nomes do Barroco brasileiro. Produziu poesias religiosas, satíricas e líricas.",
  },
  {
    nome: "Padre Antônio Vieira",
    apelido: "Mestre dos sermões",
    texto:
      "Importante representante da prosa barroca, conhecido principalmente por seus sermões.",
  },
];

export const barrocoObras = [
  {
    titulo: "Poesias religiosas, líricas e satíricas",
    autor: "Gregório de Matos",
    texto:
      "Poemas que vão da crítica social ao arrependimento religioso, sempre com contrastes fortes.",
  },
  {
    titulo: "Sermões (destaque: Sermão da Sexagésima)",
    autor: "Padre Antônio Vieira",
    texto:
      "Prosa argumentativa (conceptismo): o texto convence pelo raciocínio bem construído.",
  },
];

export const arcadismoAutores = [
  {
    nome: "Cláudio Manuel da Costa",
    apelido: "Glauceste Satúrnio",
    texto:
      "Importante representante do Arcadismo brasileiro, com poesia marcada pela presença da natureza.",
  },
  {
    nome: "Tomás Antônio Gonzaga",
    apelido: "Dirceu",
    texto:
      "Um dos principais autores do Arcadismo brasileiro. Utilizou o pseudônimo Dirceu.",
  },
  {
    nome: "Basílio da Gama",
    apelido: "Termindo Sipílio",
    texto: "Autor conhecido principalmente por sua poesia épica.",
  },
];

export const arcadismoObras = [
  {
    titulo: "Marília de Dirceu",
    autor: "Tomás Antônio Gonzaga",
    texto: "Poemas de amor em que o pastor Dirceu se dirige à amada Marília.",
  },
  {
    titulo: "O Uraguai",
    autor: "Basílio da Gama",
    texto: "Poema épico sobre o conflito entre portugueses, espanhóis e indígenas.",
  },
  {
    titulo: "Obras Poéticas",
    autor: "Cláudio Manuel da Costa",
    texto: "Reunião de poemas com forte presença das montanhas e da natureza mineira.",
  },
];

export type ComparacaoItem = {
  id: string;
  rotulo: string;
  movimento: "barroco" | "arcadismo";
  explicacao: string;
};

export const comparacaoLinhas = [
  { tema: "Século", barroco: "Século XVII", arcadismo: "Século XVIII" },
  { tema: "Base de pensamento", barroco: "Religiosidade", arcadismo: "Racionalismo" },
  { tema: "Sensação", barroco: "Conflito", arcadismo: "Equilíbrio" },
  { tema: "Tema central", barroco: "Dualidade e fé", arcadismo: "Natureza e vida simples" },
  { tema: "Estilo", barroco: "Contraste e exagero", arcadismo: "Simplicidade" },
  { tema: "Linguagem", barroco: "Elaborada e rebuscada", arcadismo: "Clara e equilibrada" },
  { tema: "Influência", barroco: "Contrarreforma", arcadismo: "Iluminismo" },
];

export const comparacaoCards: ComparacaoItem[] = [
  {
    id: "c1",
    rotulo: "Contraste",
    movimento: "barroco",
    explicacao: "Movimento marcado por conflitos e oposições, como luz × sombra.",
  },
  {
    id: "c2",
    rotulo: "Natureza",
    movimento: "arcadismo",
    explicacao: "Movimento que valoriza a natureza e a vida simples.",
  },
  {
    id: "c3",
    rotulo: "Religiosidade",
    movimento: "barroco",
    explicacao: "A fé e a culpa aparecem constantemente nos textos.",
  },
  {
    id: "c4",
    rotulo: "Carpe diem",
    movimento: "arcadismo",
    explicacao: "Aproveitar o momento presente é um lema árcade.",
  },
  {
    id: "c5",
    rotulo: "Cultismo",
    movimento: "barroco",
    explicacao: "Jogo de palavras e imagens elaboradas.",
  },
  {
    id: "c6",
    rotulo: "Fugere urbem",
    movimento: "arcadismo",
    explicacao: "Fugir da cidade em busca de uma vida simples no campo.",
  },
];

export const desafioClassificar: ComparacaoItem[] = [
  {
    id: "d1",
    rotulo: "Conflito entre corpo e alma",
    movimento: "barroco",
    explicacao: "O dualismo entre desejo e fé é uma marca barroca.",
  },
  {
    id: "d2",
    rotulo: "Pseudônimo de pastor",
    movimento: "arcadismo",
    explicacao: "Os árcades assumiam nomes de pastores, como Dirceu.",
  },
  {
    id: "d3",
    rotulo: "Influência do Iluminismo",
    movimento: "arcadismo",
    explicacao: "O Arcadismo nasce no século XVIII, sob a razão iluminista.",
  },
  {
    id: "d4",
    rotulo: "Sermões e argumentação",
    movimento: "barroco",
    explicacao: "O conceptismo de Vieira é prosa barroca argumentativa.",
  },
];

export type QuizQuestao = {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export const quizQuestoes: QuizQuestao[] = [
  {
    pergunta: "Valorização da natureza, vida simples e ambiente pastoril.",
    opcoes: ["Barroco", "Arcadismo"],
    correta: 1,
    explicacao: "O Arcadismo idealiza o campo e a vida simples (bucolismo).",
  },
  {
    pergunta: "Dualismo entre corpo e alma.",
    opcoes: ["Barroco", "Arcadismo"],
    correta: 0,
    explicacao: "O dualismo é uma das marcas centrais do Barroco.",
  },
  {
    pergunta: "Quem escreveu Marília de Dirceu?",
    opcoes: ["Gregório de Matos", "Tomás Antônio Gonzaga", "Padre Antônio Vieira", "Basílio da Gama"],
    correta: 1,
    explicacao: "Tomás Antônio Gonzaga assinava como o pastor Dirceu.",
  },
  {
    pergunta: "Movimento influenciado pelo Iluminismo.",
    opcoes: ["Barroco", "Arcadismo"],
    correta: 1,
    explicacao: "O Iluminismo, no século XVIII, inspira a razão árcade.",
  },
  {
    pergunta: "Movimento marcado pela forte religiosidade e pelo conflito interior.",
    opcoes: ["Barroco", "Arcadismo"],
    correta: 0,
    explicacao: "A Contrarreforma marca o Barroco com fé, culpa e conflito.",
  },
  {
    pergunta: "Autor conhecido pelos sermões, como o Sermão da Sexagésima.",
    opcoes: ["Padre Antônio Vieira", "Cláudio Manuel da Costa", "Gregório de Matos", "Basílio da Gama"],
    correta: 0,
    explicacao: "Vieira é o grande nome da prosa barroca no Brasil.",
  },
  {
    pergunta: "\"Fugere urbem\" significa:",
    opcoes: ["Aproveitar o dia", "Fugir da cidade", "Temer a morte", "Louvar a fé"],
    correta: 1,
    explicacao: "Fugere urbem = afastar-se da cidade em busca do campo.",
  },
  {
    pergunta: "Movimento que se desenvolveu no Brasil no século XVII.",
    opcoes: ["Barroco", "Arcadismo"],
    correta: 0,
    explicacao: "O Barroco brasileiro é do século XVII; o Arcadismo, do XVIII.",
  },
  {
    pergunta: "Linguagem mais simples, clara e equilibrada.",
    opcoes: ["Barroco", "Arcadismo"],
    correta: 1,
    explicacao: "A clareza e o equilíbrio são valores árcades.",
  },
  {
    pergunta: "O Uraguai, poema épico, pertence a qual autor?",
    opcoes: ["Basílio da Gama", "Gregório de Matos", "Tomás Antônio Gonzaga", "Padre Antônio Vieira"],
    correta: 0,
    explicacao: "Basílio da Gama é o autor de O Uraguai.",
  },
];

export const desafioFinalQuestoes: QuizQuestao[] = [
  {
    pergunta:
      "Um texto apresenta religiosidade, conflito entre corpo e alma e linguagem marcada por contrastes. A qual movimento ele provavelmente pertence?",
    opcoes: ["Barroco", "Arcadismo", "Romantismo", "Modernismo"],
    correta: 0,
    explicacao: "Religiosidade + dualismo + contraste = Barroco.",
  },
  {
    pergunta:
      "Um poema descreve um pastor que convida a amada a aproveitar o dia em um campo tranquilo. Qual movimento?",
    opcoes: ["Barroco", "Arcadismo", "Realismo", "Simbolismo"],
    correta: 1,
    explicacao: "Vida pastoril + carpe diem = Arcadismo.",
  },
  {
    pergunta:
      "Qual par relaciona corretamente movimento e influência histórica?",
    opcoes: [
      "Barroco – Iluminismo",
      "Arcadismo – Contrarreforma",
      "Barroco – Contrarreforma",
      "Arcadismo – Idade Média",
    ],
    correta: 2,
    explicacao: "Barroco nasce no clima da Contrarreforma; Arcadismo, do Iluminismo.",
  },
  {
    pergunta:
      "Um texto em prosa usa argumentos bem encadeados para convencer o leitor. Esse recurso barroco se chama:",
    opcoes: ["Cultismo", "Conceptismo", "Bucolismo", "Antítese"],
    correta: 1,
    explicacao: "Conceptismo = jogo de ideias e argumentação.",
  },
  {
    pergunta:
      "Ordem histórica correta dos movimentos no Brasil:",
    opcoes: [
      "Arcadismo → Barroco",
      "Barroco → Arcadismo",
      "Os dois no século XVIII",
      "Os dois no século XVII",
    ],
    correta: 1,
    explicacao: "Barroco (séc. XVII) vem antes do Arcadismo (séc. XVIII).",
  },
];
