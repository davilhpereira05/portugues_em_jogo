export const navItens = [
  { rota: "/", titulo: "Início" },
  { rota: "/aprenda", titulo: "Aprenda" },
  { rota: "/exemplos", titulo: "Exemplos" },
  { rota: "/explore", titulo: "Explore" },
  { rota: "/laboratorio", titulo: "Laboratório" },
  { rota: "/pegadinhas", titulo: "Pegadinhas" },
  { rota: "/desafio", titulo: "Desafio" },
  { rota: "/desafio-final", titulo: "Desafio Final" },
  { rota: "/resultado", titulo: "Resultado" },
  { rota: "/gabarito", titulo: "Gabarito" },
  { rota: "/biblioteca", titulo: "Biblioteca" },
  { rota: "/sobre", titulo: "Sobre" },
] as const;

export type NavItem = (typeof navItens)[number];
