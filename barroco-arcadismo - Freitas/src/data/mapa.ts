export type MapaDesafio = {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export type MapaNo = {
  id: string;
  titulo: string;
  explicacao: string;
  exemplo: string;
  desafio?: MapaDesafio;
};

export const caminhoBarroco: MapaNo[] = [
  {
    id: "b1",
    titulo: "Contexto histórico",
    explicacao:
      "Século XVII, época de conflitos religiosos e forte presença da Igreja (Contrarreforma).",
    exemplo: "fé × razão",
  },
  {
    id: "b2",
    titulo: "Religiosidade",
    explicacao: "A fé, a culpa e o pedido de perdão aparecem o tempo todo nos textos.",
    exemplo: "pecado × perdão",
  },
  {
    id: "b3",
    titulo: "Dualismo",
    explicacao: "Ideias opostas dentro do mesmo texto, como corpo e alma.",
    exemplo: "corpo × alma",
    desafio: {
      pergunta: "O conflito entre corpo e alma é característico de qual movimento?",
      opcoes: ["Barroco", "Arcadismo", "Romantismo", "Modernismo"],
      correta: 0,
      explicacao: "O dualismo corpo × alma é uma marca barroca.",
    },
  },
  {
    id: "b4",
    titulo: "Contraste",
    explicacao: "Oposição forte entre elementos diferentes para criar impacto.",
    exemplo: "luz × sombra",
    desafio: {
      pergunta: "Qual movimento apresenta forte presença de conflitos e oposições?",
      opcoes: ["Barroco", "Arcadismo", "Realismo", "Modernismo"],
      correta: 0,
      explicacao: "O contraste é um dos recursos centrais do Barroco.",
    },
  },
  {
    id: "b5",
    titulo: "Cultismo",
    explicacao: "Valorização da forma: metáforas, imagens e linguagem elaborada.",
    exemplo: "\"o ouro breve da manhã\"",
  },
  {
    id: "b6",
    titulo: "Conceptismo",
    explicacao: "Valorização do raciocínio e da argumentação bem construída.",
    exemplo: "\"se tudo passa, por que se prender?\"",
    desafio: {
      pergunta: "O jogo de ideias e a argumentação recebem o nome de:",
      opcoes: ["Cultismo", "Conceptismo", "Bucolismo", "Carpe diem"],
      correta: 1,
      explicacao: "Conceptismo trabalha com o raciocínio; cultismo, com as palavras.",
    },
  },
  {
    id: "b7",
    titulo: "Autores",
    explicacao: "Gregório de Matos (poesia) e Padre Antônio Vieira (prosa/sermões).",
    exemplo: "Boca do Inferno",
  },
  {
    id: "b8",
    titulo: "Obras",
    explicacao:
      "Poesias religiosas, líricas e satíricas de Gregório; sermões de Vieira.",
    exemplo: "Sermão da Sexagésima",
    desafio: {
      pergunta: "O Sermão da Sexagésima é obra de:",
      opcoes: ["Gregório de Matos", "Padre Antônio Vieira", "Basílio da Gama", "Cláudio Manuel"],
      correta: 1,
      explicacao: "Os sermões são a marca de Padre Antônio Vieira.",
    },
  },
];

export const caminhoArcadismo: MapaNo[] = [
  {
    id: "a1",
    titulo: "Contexto histórico",
    explicacao: "Século XVIII, ciclo do ouro em Minas Gerais e sociedade colonial.",
    exemplo: "Minas Gerais",
  },
  {
    id: "a2",
    titulo: "Iluminismo",
    explicacao: "A razão e a clareza passam a guiar a arte e o pensamento.",
    exemplo: "razão × exagero",
  },
  {
    id: "a3",
    titulo: "Natureza",
    explicacao: "Campos, rios e montanhas aparecem como cenário ideal.",
    exemplo: "contato com a natureza",
    desafio: {
      pergunta:
        "Qual movimento literário valorizava a vida simples e o contato com a natureza?",
      opcoes: ["Barroco", "Arcadismo", "Modernismo", "Romantismo"],
      correta: 1,
      explicacao: "O Arcadismo idealiza a natureza e a vida no campo.",
    },
  },
  {
    id: "a4",
    titulo: "Bucolismo",
    explicacao: "Valorização de uma vida tranquila e idealizada no campo.",
    exemplo: "campo tranquilo",
  },
  {
    id: "a5",
    titulo: "Simplicidade",
    explicacao: "Linguagem clara, sem exageros, e vida modesta.",
    exemplo: "vida simples",
    desafio: {
      pergunta: "A linguagem árcade é, em geral:",
      opcoes: ["Rebuscada e cheia de figuras", "Simples, clara e equilibrada", "Confusa", "Regionalista"],
      correta: 1,
      explicacao: "A clareza é um valor central do Arcadismo.",
    },
  },
  {
    id: "a6",
    titulo: "Carpe diem",
    explicacao: "Valorizar e aproveitar o momento presente.",
    exemplo: "\"colha o dia de hoje\"",
    desafio: {
      pergunta: "\"Carpe diem\" quer dizer:",
      opcoes: ["Fugir da cidade", "Aproveitar o presente", "Temer a morte", "Amar a fé"],
      correta: 1,
      explicacao: "Carpe diem = aproveite o dia de hoje.",
    },
  },
  {
    id: "a7",
    titulo: "Autores",
    explicacao:
      "Cláudio Manuel da Costa, Tomás Antônio Gonzaga (Dirceu) e Basílio da Gama.",
    exemplo: "Dirceu",
  },
  {
    id: "a8",
    titulo: "Obras",
    explicacao: "Marília de Dirceu, O Uraguai e Obras Poéticas.",
    exemplo: "Marília de Dirceu",
    desafio: {
      pergunta: "Marília de Dirceu foi escrita por:",
      opcoes: ["Basílio da Gama", "Tomás Antônio Gonzaga", "Gregório de Matos", "Cláudio Manuel"],
      correta: 1,
      explicacao: "Gonzaga usava o pseudônimo Dirceu.",
    },
  },
];

export const totalNos = caminhoBarroco.length + caminhoArcadismo.length;
