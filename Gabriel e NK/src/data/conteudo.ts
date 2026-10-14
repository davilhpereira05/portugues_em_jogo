export type TesteRapido = {
  id: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  area: "verbal" | "nominal" | "especiais";
  acerto: string;
  erro: string;
};

export type TopicoAprenda = {
  id: string;
  titulo: string;
  resumo: string;
  errado?: string;
  certo?: string;
  pontos: string[];
  teste?: TesteRapido;
};

export const topicosVerbal: TopicoAprenda[] = [
  {
    id: "v-sujeito-simples",
    titulo: "Sujeito simples",
    resumo: "O verbo concorda em número e pessoa com o núcleo do sujeito.",
    errado: "Os alunos estudou para a prova.",
    certo: "Os alunos estudaram para a prova.",
    pontos: ["Singular: “O aluno estudou.”", "Plural: “Os alunos estudaram.”"],
    teste: {
      id: "t-v1",
      area: "verbal",
      pergunta: "Qual está correta?",
      opcoes: ["As professoras chegou.", "As professoras chegaram."],
      correta: 1,
      acerto: "O sujeito “as professoras” está no plural, então o verbo também vai para o plural.",
      erro: "Observe o número do sujeito antes de escolher o verbo.",
    },
  },
  {
    id: "v-sujeito-composto",
    titulo: "Sujeito composto",
    resumo: "Dois ou mais núcleos antes do verbo pedem verbo no plural.",
    errado: "Nicolas e Gabriel apresentou o projeto.",
    certo: "Nicolas e Gabriel apresentaram o projeto.",
    pontos: [
      "Com “eu” entre os núcleos, o verbo vai para a 1ª pessoa do plural: “Eu e ela fomos”.",
      "Com “tu” e outro núcleo, prefere-se a 3ª pessoa do plural: “Tu e ele saíram”.",
    ],
    teste: {
      id: "t-v2",
      area: "verbal",
      pergunta: "Complete: “Eu e meu colega ______ o trabalho.”",
      opcoes: ["entregaram", "entregamos", "entreguei"],
      correta: 1,
      acerto: "Quando “eu” faz parte do sujeito composto, o verbo vai para nós: entregamos.",
      erro: "Se “eu” está no sujeito, pense em “nós”.",
    },
  },
  {
    id: "v-posposto",
    titulo: "Sujeito posposto",
    resumo: "Mesmo depois do verbo, o sujeito continua comandando a concordância.",
    errado: "Chegou os convidados.",
    certo: "Chegaram os convidados.",
    pontos: ["Inverta a frase para conferir: “Os convidados chegaram.”"],
  },
  {
    id: "v-partitivas",
    titulo: "Expressões partitivas",
    resumo: "“A maioria de”, “grande parte de”, “metade de” pedem verbo no singular por padrão.",
    certo: "A maioria dos estudantes participou.",
    pontos: [
      "O plural também é aceito quando se destaca o conjunto: “A maioria dos estudantes participaram”.",
      "Na prova, prefira o singular e justifique se necessário.",
    ],
    teste: {
      id: "t-v3",
      area: "especiais",
      pergunta: "Qual forma é preferida pela norma-padrão?",
      opcoes: ["Grande parte dos alunos faltaram.", "Grande parte dos alunos faltou."],
      correta: 1,
      acerto: "O núcleo é “grande parte”, no singular — daí “faltou”.",
      erro: "O núcleo da expressão partitiva está no singular.",
    },
  },
  {
    id: "v-porcentagem",
    titulo: "Porcentagem",
    resumo: "O verbo concorda com o número percentual ou com o substantivo que o acompanha.",
    certo: "30% dos alunos faltaram. / 30% da turma faltou.",
    pontos: [
      "Com especificador plural: verbo no plural.",
      "Com especificador singular: verbo no singular.",
      "“1% dos alunos faltou” também é aceito.",
    ],
  },
  {
    id: "v-haver",
    titulo: "Verbo haver",
    resumo: "No sentido de existir, haver é impessoal: sempre singular.",
    errado: "Haviam muitas pessoas.",
    certo: "Havia muitas pessoas.",
    pontos: ["Troque por “existir” para testar: “Existiam muitas pessoas” (aí vai ao plural)."],
    teste: {
      id: "t-v4",
      area: "especiais",
      pergunta: "Qual está de acordo com a norma?",
      opcoes: ["Houveram falhas no sistema.", "Houve falhas no sistema."],
      correta: 1,
      acerto: "Haver = existir é impessoal: fica no singular.",
      erro: "Haver no sentido de existir não vai para o plural.",
    },
  },
  {
    id: "v-fazer",
    titulo: "Verbo fazer",
    resumo: "Indicando tempo decorrido, fazer é impessoal e permanece no singular.",
    certo: "Faz dois anos que estudo aqui.",
    pontos: ["“Fazia cinco minutos que ele esperava.”", "Nunca “fazem dois anos” nesse sentido."],
  },
  {
    id: "v-impessoais",
    titulo: "Verbos impessoais",
    resumo: "Verbos que indicam fenômenos da natureza ou existência não têm sujeito.",
    certo: "Chove muito. / Trata-se de dois casos.",
    pontos: ["“Trata-se de” fica sempre no singular.", "“Basta de discussões” — sem sujeito."],
  },
  {
    id: "v-especiais",
    titulo: "Casos especiais",
    resumo: "Coletivos, pronomes relativos e partículas mudam a concordância.",
    certo: "Fui eu que resolvi. / Fui eu quem resolveu.",
    pontos: [
      "Com “que”, o verbo concorda com o antecedente: “Fomos nós que chegamos”.",
      "Com “quem”, o verbo costuma ficar na 3ª pessoa do singular.",
    ],
  },
];

export const topicosNominal: TopicoAprenda[] = [
  {
    id: "n-artigo",
    titulo: "Artigo + substantivo",
    resumo: "O artigo acompanha o substantivo em gênero e número.",
    errado: "As menina chegaram.",
    certo: "As meninas chegaram.",
    pontos: ["“As” (plural/feminino) → “meninas” (plural/feminino)."],
    teste: {
      id: "t-n1",
      area: "nominal",
      pergunta: "Qual está correta?",
      opcoes: ["Os livro novo", "Os livros novos"],
      correta: 1,
      acerto: "Artigo, substantivo e adjetivo formam um bloco no mesmo número e gênero.",
      erro: "Se o artigo está no plural, tudo no bloco vai para o plural.",
    },
  },
  {
    id: "n-adjetivo",
    titulo: "Adjetivo",
    resumo: "O adjetivo concorda com o substantivo que caracteriza.",
    errado: "As meninas bonita.",
    certo: "As meninas bonitas.",
    pontos: [
      "Antes de vários substantivos: concorda com o mais próximo — “bela casa e jardim”.",
      "Depois de vários substantivos: pode ir ao plural — “casa e jardim belos”.",
    ],
  },
  {
    id: "n-pronome",
    titulo: "Pronomes",
    resumo: "Pronomes adjetivos concordam com o substantivo.",
    certo: "Nossos projetos ficaram prontos.",
    pontos: ["“Esses alunos”, “minhas anotações”, “todas as questões”."],
  },
  {
    id: "n-numeral",
    titulo: "Numerais",
    resumo: "Numerais ordinais podem ficar no singular ou plural junto ao substantivo plural.",
    certo: "Estudei o primeiro e o segundo capítulos. / os primeiros capítulos",
    pontos: ["“Primeira e segunda séries” também é correto."],
  },
  {
    id: "n-genero",
    titulo: "Gênero",
    resumo: "Feminino e masculino precisam estar alinhados no bloco.",
    errado: "A problema foi resolvido.",
    certo: "O problema foi resolvido.",
    pontos: ["Atenção a palavras como “o eclipse”, “a cal”, “o champanhe”."],
  },
  {
    id: "n-numero",
    titulo: "Número",
    resumo: "Singular e plural devem ser coerentes em todo o bloco nominal.",
    certo: "Duas provas difíceis.",
    pontos: ["Confira determinantes: artigo, numeral, pronome e adjetivo."],
    teste: {
      id: "t-n2",
      area: "nominal",
      pergunta: "Complete: “Os candidatos estavam ______ da resposta.”",
      opcoes: ["certa", "certos", "certamente"],
      correta: 1,
      acerto: "“Certos” é adjetivo e concorda com “os candidatos”.",
      erro: "Aqui a palavra caracteriza os candidatos, então concorda com eles.",
    },
  },
  {
    id: "n-especiais",
    titulo: "Casos especiais",
    resumo: "Algumas palavras variam, outras não.",
    certo: "É proibida a entrada. / Menos pessoas. / Anexo o documento.",
    pontos: [
      "“Menos” e “alerta” são invariáveis.",
      "“Anexo”, “incluso” e “obrigado” variam: “Anexas as fotos”, “Obrigada!”.",
      "“É proibido entrada” (sem artigo) × “É proibida a entrada” (com artigo).",
    ],
  },
];

export type Exemplo = {
  id: string;
  categoria: string;
  emoji: string;
  frase: string;
  status: "erro" | "correto" | "depende";
  corrigida?: string;
  explicacao: string;
};

export const exemplos: Exemplo[] = [
  {
    id: "e1",
    categoria: "Redes sociais",
    emoji: "📱",
    frase: "Os comentários foi positivos.",
    status: "erro",
    corrigida: "Os comentários foram positivos.",
    explicacao: "O sujeito “os comentários” está no plural, então o verbo vai para o plural.",
  },
  {
    id: "e2",
    categoria: "Redes sociais",
    emoji: "📱",
    frase: "Menas pessoas curtiram o post.",
    status: "erro",
    corrigida: "Menos pessoas curtiram o post.",
    explicacao: "“Menos” é invariável — “menas” não existe na norma-padrão.",
  },
  {
    id: "e3",
    categoria: "Notícia",
    emoji: "📰",
    frase: "As equipes chegaram ao local.",
    status: "correto",
    explicacao: "Sujeito plural (“as equipes”) com verbo plural (“chegaram”): concordância perfeita.",
  },
  {
    id: "e4",
    categoria: "Notícia",
    emoji: "📰",
    frase: "Haviam dezenas de manifestantes na praça.",
    status: "erro",
    corrigida: "Havia dezenas de manifestantes na praça.",
    explicacao: "Haver no sentido de existir é impessoal: fica no singular.",
  },
  {
    id: "e5",
    categoria: "Escola",
    emoji: "🏫",
    frase: "A maioria dos alunos participou da atividade.",
    status: "depende",
    corrigida: "A maioria dos alunos participaram da atividade. (também aceito)",
    explicacao:
      "Com expressão partitiva, a norma prefere o singular (núcleo “a maioria”), mas o plural é aceito para destacar os alunos.",
  },
  {
    id: "e6",
    categoria: "Escola",
    emoji: "🏫",
    frase: "É proibida a entrada com celular ligado.",
    status: "correto",
    explicacao: "“Proibida” concorda com “a entrada”, que está determinada pelo artigo.",
  },
  {
    id: "e7",
    categoria: "Jogos",
    emoji: "🎮",
    frase: "Os jogadores estavam preparados.",
    status: "correto",
    explicacao:
      "“Os jogadores” (plural) → “estavam” (plural) → “preparados” (plural): verbal e nominal alinhadas.",
  },
  {
    id: "e8",
    categoria: "Jogos",
    emoji: "🎮",
    frase: "Faz três anos que essa atualização saiu.",
    status: "correto",
    explicacao: "Fazer indicando tempo decorrido é impessoal e permanece no singular.",
  },
];

export type Pegadinha = {
  id: string;
  numero: string;
  frase: string;
  veredito: "erro" | "correto";
  corrigida?: string;
  explicacao: string;
  dica: string;
};

export const pegadinhas: Pegadinha[] = [
  {
    id: "p1",
    numero: "01",
    frase: "Houveram muitos problemas.",
    veredito: "erro",
    corrigida: "Houve muitos problemas.",
    explicacao:
      "No sentido de existir, haver é impessoal: não há sujeito para concordar, então o verbo fica no singular.",
    dica: "Se dá para trocar por “existir”, cuidado: haver não vai ao plural.",
  },
  {
    id: "p2",
    numero: "02",
    frase: "Faz dois anos que estudo aqui.",
    veredito: "correto",
    explicacao:
      "Quando fazer indica tempo decorrido, é impessoal e permanece no singular, mesmo com “dois anos”.",
    dica: "Tempo decorrido = fazer no singular.",
  },
  {
    id: "p3",
    numero: "03",
    frase: "Menas pessoas participaram.",
    veredito: "erro",
    corrigida: "Menos pessoas participaram.",
    explicacao: "“Menos” é palavra invariável: não flexiona em gênero nem número.",
    dica: "“Menas” não existe na língua escrita formal.",
  },
  {
    id: "p4",
    numero: "04",
    frase: "A maioria dos alunos chegou cedo.",
    veredito: "correto",
    explicacao:
      "O núcleo do sujeito é “a maioria” (singular). O plural (“chegaram”) também é aceito quando se quer destacar os alunos.",
    dica: "Expressão partitiva: singular é a escolha mais segura.",
  },
  {
    id: "p5",
    numero: "05",
    frase: "É proibida a entrada.",
    veredito: "correto",
    explicacao:
      "Com o substantivo determinado por artigo, o adjetivo concorda com ele: “a entrada” → “proibida”. Sem artigo, usa-se “É proibido entrada”.",
    dica: "Tem artigo? Então o adjetivo concorda.",
  },
];

export const bibliotecaModulos = [
  { numero: "01", titulo: "Interpretação textual", estado: "futuro" },
  { numero: "02", titulo: "Gêneros textuais", estado: "futuro" },
  { numero: "03", titulo: "Coesão e coerência", estado: "futuro" },
  { numero: "04", titulo: "Variação linguística", estado: "futuro" },
  { numero: "05", titulo: "Figuras de linguagem", estado: "futuro" },
  { numero: "06", titulo: "Funções da linguagem", estado: "futuro" },
  { numero: "07", titulo: "Classes de palavras", estado: "futuro" },
  { numero: "08", titulo: "Sintaxe do período simples", estado: "futuro" },
  { numero: "09", titulo: "Período composto", estado: "futuro" },
  { numero: "10", titulo: "Semântica", estado: "futuro" },
  { numero: "11", titulo: "Ortografia e acentuação", estado: "futuro" },
  { numero: "12", titulo: "Concordância verbal e nominal", estado: "atual" },
  { numero: "13", titulo: "Regência e crase", estado: "futuro" },
  { numero: "14", titulo: "Pontuação", estado: "futuro" },
] as const;
