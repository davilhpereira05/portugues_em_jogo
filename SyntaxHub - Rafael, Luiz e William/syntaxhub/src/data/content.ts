export type ContentCard = { term: string; def: string; ex: string };

export const contents: Record<string, ContentCard[]> = {
  termos: [
    { term: "Sujeito", def: "Quem pratica ou sofre a ação.", ex: "Os alunos chegaram." },
    { term: "Predicado", def: "O que se diz do sujeito.", ex: "Os alunos chegaram cedo." },
    { term: "Objeto direto", def: "Complemento sem preposição.", ex: "Comprei um livro." },
    { term: "Objeto indireto", def: "Complemento com preposição.", ex: "Gosto de música." },
    { term: "Predicativo", def: "Qualidade do sujeito via verbo de ligação.", ex: "O dia está bonito." },
    { term: "Adjunto adverbial", def: "Circunstância: tempo, lugar, modo…", ex: "Saiu ontem." },
  ],
  composto: [
    { term: "Período simples", def: "Um só verbo.", ex: "Choveu." },
    { term: "Período composto", def: "Dois ou mais verbos.", ex: "Choveu e esfriou." },
    { term: "Coordenação", def: "Orações independentes.", ex: "Estudou, mas não passou." },
    { term: "Subordinação", def: "Uma oração depende da outra.", ex: "Sei que você veio." },
  ],
  conectivos: [
    { term: "Aditiva", def: "Soma: e, nem.", ex: "Li e escrevi." },
    { term: "Adversativa", def: "Oposição: mas, porém.", ex: "Tentei, porém falhei." },
    { term: "Conclusiva", def: "Conclusão: logo, portanto.", ex: "Penso, logo existo." },
    { term: "Explicativa", def: "Explicação: pois, porque.", ex: "Vá, pois é tarde." },
    { term: "Alternativa", def: "Escolha: ou… ou.", ex: "Ou fica, ou vai." },
  ],
  subordinacao: [
    { term: "Substantiva", def: "Funciona como substantivo.", ex: "Quero que venhas." },
    { term: "Adjetiva", def: "Caracteriza um nome (que, o qual).", ex: "O livro que li." },
    { term: "Adverbial", def: "Indica circunstância.", ex: "Saí quando choveu." },
  ],
};
