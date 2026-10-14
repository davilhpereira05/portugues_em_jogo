# Lingua — Site de Língua Portuguesa

Site completo: página de entrada (nome e sala), Área de Aprendizado (guia de estudo) e Área de Jogos (quiz de 10 perguntas com 3 tentativas e registro das notas).

## Como rodar no seu computador

Pré-requisitos: Node.js 20 ou superior (ou Bun).

1. Extraia o ZIP em uma pasta.
2. Abra o terminal nessa pasta e instale as dependências:
   - Com Bun: `bun install`
   - Com npm: `npm install`
3. Inicie o servidor de desenvolvimento:
   - Com Bun: `bun run dev`
   - Com npm: `npm run dev`
4. Abra o navegador em http://localhost:8080

## Observações

- Os dados do aluno (nome, sala) e as tentativas do quiz ficam salvos no navegador (localStorage). Se os dados do navegador forem apagados, a contagem de tentativas volta a zero.
- Este projeto foi criado na plataforma Lovable (TanStack Start + React + Tailwind). Publicar e hospedar é mais simples direto pela plataforma, mas o código roda localmente com os passos acima.
