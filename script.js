/* ===== Português em Jogo — script (Vanilla JS) ===== */

/* ------------------------------------------------------------------
 * LINKS DOS MATERIAIS
 * Substitua cada "#" pelo link real do material do grupo.
 * ------------------------------------------------------------------ */
const links = {
  // Todos os caminhos preenchidos apontam para páginas estáticas HTML/CSS/JS.
  // Grupos sem projeto HTML disponível continuam marcados com "#".
  grupo01_02: "site-grupo1-MATHEUS%20ARTHUR/lingua-site/index.html",
  grupo03: "text-explorer-adventure-main/index.html",
  grupo04: "liga-das-variedades%20-%20Jo%C3%A3o%20Cunha%20e%20Davi%20L/index.html",
  grupo05: "Fun%C3%A7%C3%A3o%20de%20linguagem(Davi%20S.%20Bernardo%20M)/index.html",
  grupo06: "site-figuras-de-linguagem%20Quininha/site-figuras-de-linguagem%20%20gustavo%20e%20theo/index.html",
  grupo07: "Trabalho%20Calebe%20e%20Vitor/index.html",
  grupo08: "#",
  grupo09: "Documento%20de%20~Victor%20(1).html",
  grupo10_11: "SyntaxHub%20-%20Rafael,%20Luiz%20e%20William/syntaxhub/index.html",
  grupo12: "Gabriel%20e%20NK/index.html",
  grupo13: "missao-misterio-da-crase%20block/site-crase/index.html",
  grupo14: "Enzo/portugues-em-jogo.html",
  grupo15: "Werner/index.html",
  grupo16: "barroco-arcadismo%20-%20Freitas/index.html",
  grupo17: "#"
};

/* ------------------------------------------------------------------
 * CONTEÚDOS
 * grupo: texto exibido | link: chave no objeto "links"
 * categoria: "Língua Portuguesa" ou "Literatura" | nivel: 1 a 5
 * ------------------------------------------------------------------ */
const LP = "Língua Portuguesa";
const LIT = "Literatura";

const conteudos = [
  { grupo: "Grupo 01", link: "grupo01_02", categoria: LP, nivel: 2,
    titulo: "Interpretação e compreensão textual",
    descricao: "Tema, ideia principal, informações explícitas e implícitas, inferência e finalidade do texto." },
  { grupo: "Grupo 01 e 02", link: "grupo01_02", categoria: LP, nivel: 2,
    titulo: "Gêneros e tipologias textuais",
    descricao: "Narração, descrição, exposição, argumentação e injunção; características e finalidades." },
  { grupo: "Grupo 03", link: "grupo03", categoria: LP, nivel: 3,
    titulo: "Coesão e coerência textual",
    descricao: "Organização das ideias, conectivos, pronomes, retomadas e relações de sentido." },
  { grupo: "Grupo 04", link: "grupo04", categoria: LP, nivel: 2,
    titulo: "Variação linguística e níveis de linguagem",
    descricao: "Linguagem formal e informal, variedades linguísticas, regionalismos, norma-padrão e preconceito linguístico." },
  { grupo: "Grupo 05", link: "grupo05", categoria: LP, nivel: 3,
    titulo: "Funções da linguagem",
    descricao: "Referencial, emotiva, conativa, fática, metalinguística e poética." },
  { grupo: "Grupo 06", link: "grupo06", categoria: LP, nivel: 3,
    titulo: "Figuras de linguagem",
    descricao: "Metáfora, comparação, metonímia, personificação, hipérbole, ironia, antítese, paradoxo e outras figuras." },
  { grupo: "Grupo 07", link: "grupo07", categoria: LP, nivel: 1,
    titulo: "Denotação e conotação",
    descricao: "Sentido literal e figurado e construção de efeitos de sentido." },
  { grupo: "Grupo 08", link: "grupo08", categoria: LP, nivel: 3,
    titulo: "Classes gramaticais",
    descricao: "Substantivo, adjetivo, pronome, verbo, advérbio, preposição, conjunção etc., sempre com exemplos contextualizados." },
  { grupo: "Grupo 09", link: "grupo09", categoria: LP, nivel: 3,
    titulo: "Sujeito e predicado",
    descricao: "Tipos de sujeito, tipos de predicado e identificação dos termos na oração." },
  { grupo: "Grupo 10 e 11", link: "grupo10_11", categoria: LP, nivel: 4,
    titulo: "Termos da oração",
    descricao: "Objeto direto, objeto indireto, complemento nominal, predicativo, adjunto adnominal, adjunto adverbial e aposto." },
  { grupo: "Grupo 10 e 11", link: "grupo10_11", categoria: LP, nivel: 5,
    titulo: "Período composto",
    descricao: "Orações coordenadas e subordinadas e relações de sentido estabelecidas entre as orações." },
  { grupo: "Grupo 12", link: "grupo12", categoria: LP, nivel: 4,
    titulo: "Concordância verbal e nominal",
    descricao: "Principais regras de concordância e aplicação em frases contextualizadas." },
  { grupo: "Grupo 13", link: "grupo13", categoria: LP, nivel: 5,
    titulo: "Regência e crase",
    descricao: "Regência verbal e nominal, preposições exigidas e emprego da crase." },
  { grupo: "Grupo 14", link: "grupo14", categoria: LP, nivel: 3,
    titulo: "Pontuação e efeitos de sentido",
    descricao: "Vírgula, dois-pontos, ponto e vírgula, travessão, parênteses e efeitos produzidos pela pontuação." },
  { grupo: "Grupo 15", link: "grupo15", categoria: LIT, nivel: 3,
    titulo: "Trovadorismo, Humanismo e Classicismo",
    descricao: "Contexto histórico, características, autores, obras e manifestações literárias." },
  { grupo: "Grupo 16", link: "grupo16", categoria: LIT, nivel: 4,
    titulo: "Barroco e Arcadismo",
    descricao: "Contexto histórico, características, linguagem, autores e obras representativas." },
  { grupo: "Grupo 17", link: "grupo17", categoria: LIT, nivel: 4,
    titulo: "Romantismo e Realismo",
    descricao: "Características, contexto histórico, autores, obras e diferenças entre os movimentos literários." }
];

const nomesNivel = ["", "Iniciante", "Básico", "Intermediário", "Avançado", "Desafio"];

/* Estado atual */
let filtroAtual = "todos";
let termoBusca = "";

/* Remove acentos para facilitar a pesquisa */
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/* Cria o HTML de um card */
function criarCard(item, indice) {
  const article = document.createElement("article");
  article.className = "card" + (item.categoria === LIT ? " lit" : "");
  article.style.animationDelay = (indice * 0.05) + "s";

  const url = links[item.link] || "#";
  const disponivel = url !== "#";
  article.innerHTML = `
    <div class="card-top">
      <span class="group">${item.grupo}</span>
      <span class="tag">${item.categoria}</span>
    </div>
    <h3>${item.titulo}</h3>
    <p>${item.descricao}</p>
    <div class="level" title="Nível ${item.nivel} de 5">
      <span>Nível: ${nomesNivel[item.nivel]}</span>
      <span class="level-bar"><i style="width:0"></i></span>
    </div>
    ${disponivel
      ? `<a class="card-btn" href="${url}" target="_blank" rel="noopener">Acessar conteúdo →</a>`
      : `<span class="card-btn unavailable" aria-label="Conteúdo sem Integração">Conteúdo sem Integração</span>`}`;

  /* Anima a barra de nível após inserir */
  requestAnimationFrame(() => {
    article.querySelector(".level-bar i").style.width = (item.nivel * 20) + "%";
  });
  return article;
}

/* Renderiza os cards de acordo com pesquisa e filtro */
function renderizar() {
  const container = document.getElementById("cards");
  const vazio = document.getElementById("empty");
  const info = document.getElementById("resultInfo");
  const termo = normalizar(termoBusca.trim());

  const resultado = conteudos.filter((item) => {
    const okFiltro = filtroAtual === "todos" || item.categoria === filtroAtual;
    const texto = normalizar(item.titulo + " " + item.descricao + " " + item.grupo + " " + item.categoria);
    return okFiltro && texto.includes(termo);
  });

  container.innerHTML = "";
  resultado.forEach((item, i) => container.appendChild(criarCard(item, i)));

  vazio.hidden = resultado.length > 0;
  info.textContent = resultado.length > 0
    ? `${resultado.length} ${resultado.length === 1 ? "conteúdo disponível" : "conteúdos disponíveis"}`
    : "";
}

/* Pesquisa em tempo real */
document.getElementById("search").addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizar();
});

/* Filtros */
document.querySelectorAll(".filter").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    botao.classList.add("active");
    botao.setAttribute("aria-pressed", "true");
    filtroAtual = botao.dataset.filter;
    renderizar();
  });
});

/* Botão "Explorar conteúdos" — rolagem suave */
document.getElementById("btnExplorar").addEventListener("click", () => {
  document.getElementById("conteudos").scrollIntoView({ behavior: "smooth" });
});

/* Menu mobile */
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const aberto = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(aberto));
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

/* Barra de progresso de leitura */
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  document.getElementById("progress").style.width = pct + "%";
});

/* Revelar elementos ao rolar */
const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* Contador animado de conteúdos */
function animarContador(el, alvo) {
  let atual = 0;
  const passo = () => {
    atual++;
    el.textContent = atual;
    if (atual < alvo) setTimeout(passo, 60);
  };
  passo();
}

/* Mensagens de incentivo alternadas */
const mensagens = [
  "Cada conteúdo revisado é um nível conquistado!",
  "Errar faz parte do jogo — revise e tente de novo.",
  "Pequenas revisões diárias rendem grandes resultados.",
  "Desbloqueie um novo tema hoje!",
  "Leitura atenta é o seu superpoder."
];
let msgIndice = 0;
setInterval(() => {
  const el = document.getElementById("motivation");
  el.style.opacity = 0;
  setTimeout(() => {
    msgIndice = (msgIndice + 1) % mensagens.length;
    el.textContent = mensagens[msgIndice];
    el.style.opacity = 1;
  }, 400);
}, 4000);

/* Inicialização */
renderizar();
animarContador(document.getElementById("statConteudos"), conteudos.length);
