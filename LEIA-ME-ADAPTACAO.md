# Português em Jogo — versão organizada

## Como abrir

1. Extraia a pasta completa.
2. Abra `index.html` em um navegador.
3. Use o item **Minijogos** no menu ou os cards disponíveis.

O portal e os cinco materiais listados em `jogos.html` usam páginas HTML/CSS/JavaScript existentes no pacote. Os links de conteúdo sem uma página estática disponível são identificados como **Conteúdo em integração**, em vez de apontarem para `#`.

## Limitação importante

O ZIP original também contém vários projetos em React/TypeScript sem uma página estática final pronta. Esses projetos foram preservados no pacote original, mas não foram convertidos nesta adaptação. A conversão completa de cada aplicação exige reimplementar suas páginas, estados e interações em JavaScript puro; apenas alterar os links não faria esses jogos funcionarem e poderia causar perda de funcionalidades.

## Arquivos alterados/adicionados

- `index.html`: adicionado link para a biblioteca de minijogos.
- `script.js`: corrigidos os links para materiais HTML existentes e removidos links falsos para conteúdos ainda não integrados.
- `style.css`: estilo para indicar conteúdos ainda em integração.
- `jogos.html`: catálogo dos cinco materiais HTML encontrados.


## Integração revisada (14/10/2026)

- O site `Werner/index.html` foi vinculado ao **Grupo 15 — Trovadorismo, Humanismo e Classicismo**, tanto no card correspondente do portal quanto na página `jogos.html`.
- Foram mantidos links para os materiais com páginas HTML executáveis já presentes no pacote: Funções da Linguagem (Grupo 5), Figuras de Linguagem (Grupo 6), Denotação e Conotação (Grupo 7), Detetives da Oração (Grupos 10 e 11), Pontuação e efeitos de sentido (Grupo 14) e Jornada Literária (Grupo 15).
- Os projetos que existem apenas como código-fonte React/TypeScript, sem página HTML independente pronta para abrir, continuam sem link no portal e exibem **“Conteúdo sem Integração”**. Nenhum link fictício foi criado.
- A integração de navegação não converteu os projetos React/TypeScript; essa conversão permanece necessária antes de esses projetos poderem ser executados como sites estáticos usando somente HTML, CSS e JavaScript puro.


## Conversão para HTML, CSS e JavaScript puro

Os sete projetos que estavam somente em React/TypeScript foram convertidos para versões estáticas executáveis diretamente no navegador. Cada pasta convertida agora contém `index.html`, `styles.css`, `script.js` e um `README.txt`; os arquivos de build e fontes TS/TSX do framework foram removidos dessas pastas. Os layouts foram reconstruídos com identidade visual própria e responsiva, mantendo as seções de estudo e os principais recursos interativos, incluindo quizzes com correção e explicação.

Projetos convertidos: Grupo 01/02 (Lingua), Grupo 03 (Coesão e Coerência), Grupo 04 (Liga das Variedades), Grupo 10/11 (SyntaxHub), Grupo 12 (Concordância), Grupo 13 (Mistério da Crase) e Grupo 16 (Barroco & Arcadismo). Os sites que já eram HTML/CSS/JS foram mantidos.
