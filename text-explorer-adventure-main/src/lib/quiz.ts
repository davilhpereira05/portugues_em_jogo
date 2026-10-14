export type QType = "mc" | "tf" | "drag" | "click";
export interface Question {
  type: QType;
  format: string;
  q: string;
  options: string[]; // for click: the words of the sentence
  correct: string;
  explanation: string;
  hint: string;
  kidQ?: string;
  studentNote?: string;
  before?: string;
  after?: string;
}

export const QUIZ: Question[] = [
  { type: "mc", format: "Identificar conectivos", q: "“Pedro estudou bastante. Por isso, conseguiu uma boa nota.” Qual palavra funciona como conectivo?", options: ["Pedro", "estudou", "Por isso", "nota"], correct: "Por isso", explanation: "“Por isso” estabelece uma relação de consequência entre as duas ideias.", hint: "Procure a expressão que liga as duas frases." },
  { type: "tf", format: "Verdadeiro ou falso", q: "Coesão é a ligação entre as partes de um texto.", options: ["Verdadeiro", "Falso"], correct: "Verdadeiro", explanation: "Coesão é justamente a conexão entre palavras, frases e parágrafos.", hint: "Lembre da corrente que liga as frases." },
  { type: "tf", format: "Verdadeiro ou falso", q: "Um texto que usa muitos conectivos é sempre coerente.", options: ["Verdadeiro", "Falso"], correct: "Falso", explanation: "Um texto pode ter conectivos (coesão) e mesmo assim não fazer sentido (incoerência).", hint: "Ligação e sentido são coisas diferentes." , studentNote: "Em provas, é comum cobrar que coesão não garante coerência." },
  { type: "drag", format: "Arrastar e soltar", q: "Arraste o conectivo correto:", before: "Eu estudei bastante,", after: "consegui uma boa nota.", options: ["MAS", "PORQUE", "POR ISSO"], correct: "POR ISSO", explanation: "A boa nota é consequência do estudo, por isso usamos “por isso”.", hint: "Qual conectivo indica resultado?" },
  { type: "mc", format: "Relações de sentido", q: "Em “Saí cedo, mas perdi o ônibus”, o conectivo “mas” indica:", options: ["Adição", "Oposição", "Causa", "Conclusão"], correct: "Oposição", explanation: "“Mas” liga ideias contrárias: sair cedo deveria evitar perder o ônibus.", hint: "O resultado foi o contrário do esperado." },
  { type: "click", format: "Identificar pronomes", q: "Toque no pronome que retoma “Maria”:", options: ["Maria", "comprou", "um", "livro.", "Ela", "começou", "a", "ler."], correct: "Ela", explanation: "“Ela” retoma “Maria” e evita repeti-la.", hint: "É uma palavra feminina que substitui o nome." },
  { type: "mc", format: "Identificar pronomes", q: "“Lucas encontrou seu cachorro. Ele estava muito feliz.” Quem é “Ele”?", kidQ: "Quem estava feliz?", options: ["Lucas", "O cachorro", "Ninguém", "Os vizinhos"], correct: "Lucas", explanation: "Por padrão, “Ele” retoma o sujeito da frase anterior: Lucas.", hint: "Quem é o sujeito da primeira frase?", studentNote: "Atenção: a frase pode gerar ambiguidade, pois “ele” também poderia ser o cachorro. Bons textos evitam isso." },
  { type: "drag", format: "Completar frases", q: "Complete com o conectivo correto:", before: "Não fui à aula", after: "estava doente.", options: ["PORTANTO", "PORQUE", "MAS"], correct: "PORQUE", explanation: "“Porque” introduz a causa: estar doente é o motivo de faltar.", hint: "A segunda parte explica o motivo." },
  { type: "mc", format: "Problemas de coerência", q: "Qual frase apresenta problema de coerência?", options: ["Estava chovendo, então peguei o guarda-chuva.", "Estava chovendo, então coloquei óculos de sol para não me molhar.", "Estava calor, então liguei o ventilador.", "Estava com sede, então bebi água."], correct: "Estava chovendo, então coloquei óculos de sol para não me molhar.", explanation: "Óculos de sol não protegem da chuva: a ação não combina com o objetivo.", hint: "Qual ação não resolve o problema citado?" },
  { type: "mc", format: "Problemas de coesão", q: "“Choveu muito, mas a rua ficou molhada.” Qual é o problema?", options: ["O conectivo “mas” está inadequado", "A frase não tem verbo", "Falta um pronome", "Não há problema"], correct: "O conectivo “mas” está inadequado", explanation: "Não há oposição: a rua molhada é consequência da chuva. O certo seria “por isso”.", hint: "As ideias são opostas ou uma causa a outra?" },
  { type: "click", format: "Identificar conectivos", q: "Toque no conectivo da frase:", options: ["O", "time", "treinou", "muito;", "portanto,", "está", "preparado."], correct: "portanto,", explanation: "“Portanto” liga as ideias e introduz uma conclusão.", hint: "É a palavra que começa a conclusão." },
  { type: "mc", format: "Relações de sentido", q: "O conectivo “portanto” geralmente indica:", options: ["Oposição", "Adição", "Conclusão", "Tempo"], correct: "Conclusão", explanation: "“Portanto” fecha um raciocínio, como “logo” e “assim”.", hint: "É usado no final de um raciocínio." },
  { type: "tf", format: "Verdadeiro ou falso", q: "Pronomes podem retomar palavras e ajudam a evitar repetições.", options: ["Verdadeiro", "Falso"], correct: "Verdadeiro", explanation: "Pronomes como ele, ela, o, a retomam termos já citados.", hint: "Pense em “Maria… Ela”." },
  { type: "drag", format: "Arrastar e soltar", q: "Arraste o conectivo de adição:", before: "Gosto de ler", after: "de escrever.", options: ["E", "MAS", "PORQUE"], correct: "E", explanation: "“E” soma duas ideias: ler e escrever.", hint: "Estamos juntando duas coisas que eu gosto." },
  { type: "mc", format: "Problemas de coesão", q: "Qual é a melhor reescrita de “João comprou um carro. João lavou o carro.”?", options: ["João comprou um carro. João lavou o carro.", "João comprou um carro e o lavou.", "João comprou um carro, mas o lavou.", "Comprou um carro e lavou João."], correct: "João comprou um carro e o lavou.", explanation: "O pronome “o” retoma “carro” e “e” une as ações, eliminando repetições.", hint: "Evite repetir “João” e “carro”." },
];
