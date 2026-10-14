import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as PageIntro, n as GameLink, r as GameShell } from "./GameButton-DGVAz_jy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exemplos-Cm2XWohj.js
var import_jsx_runtime = require_jsx_runtime();
var examples = [
	[
		"💬",
		"WhatsApp · Variação situacional",
		"— Cê vai na revisão hj? — Vou sim! Bora junto?",
		"Abreviações, “cê” e “bora” combinam com uma conversa rápida entre amigos. Em uma redação formal, seriam substituídas por formas da norma-padrão."
	],
	[
		"📰",
		"Edital · Linguagem formal",
		"“Os candidatos deverão comparecer ao local de prova com antecedência mínima de trinta minutos.”",
		"A impessoalidade, o futuro do presente e o vocabulário preciso produzem clareza e autoridade em um documento oficial."
	],
	[
		"🎵",
		"Verso regional · Variação geográfica",
		"“No meu sertão, quando a chuva vem, o cabra agradece e o mandacaru floresce.”",
		"“Cabra”, “sertão” e “mandacaru” marcam uma paisagem cultural nordestina. São regionalismos expressivos, não defeitos da língua."
	],
	[
		"💻",
		"Profissionais de TI · Variação social",
		"— O deploy quebrou em produção. — Vou fazer rollback e revisar o log.",
		"“Deploy”, “rollback” e “log” são jargões partilhados por profissionais de tecnologia. Fora desse grupo, podem precisar de explicação."
	],
	[
		"✉️",
		"Carta do século XIX · Variação histórica",
		"“Vossa mercê há de receber, por este portador, as novas de nossa família.”",
		"“Vossa mercê” e a construção “há de receber” soam antigas hoje. A comparação revela mudanças históricas no português."
	]
];
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				phase: "PÁGINA 3 · EXEMPLOS",
				title: "A língua em ação",
				description: "Cinco cenas, cinco pistas: descubra por que cada escolha linguística faz sentido."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: examples.map(([icon, title, quote, comment], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "game-card grid gap-5 md:grid-cols-[80px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-16 w-16 place-items-center rounded-2xl border-2 border-foreground bg-accent text-3xl",
						children: icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-black text-primary",
							children: ["EXEMPLO ", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "my-4 border-l-4 border-primary bg-muted p-4 font-bold italic",
							children: quote
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Comentário:" }),
							" ",
							comment
						] })
					] })]
				}, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameLink, {
					to: "/explore",
					children: "Explorar recursos →"
				})
			})
		]
	}) });
}
//#endregion
export { Page as component };
