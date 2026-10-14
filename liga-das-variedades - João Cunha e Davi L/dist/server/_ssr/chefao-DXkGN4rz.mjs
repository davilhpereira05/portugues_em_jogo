import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as PageIntro, n as GameLink, r as GameShell, t as GameButton } from "./GameButton-DGVAz_jy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chefao-DXkGN4rz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var bad = "“Então, tipo assim, eu queria dizer que esse projeto da escola tá muito top, porque a galera fala de jeitos diferentes e isso não é errado, tá ligado? A gente só tem que usar a fala certa no lugar certo e parar de zoar o jeito dos outros.”";
var expected = [
	"formal",
	"adequação",
	"variação",
	"preconceito",
	"linguístico"
];
function Page() {
	const [choice, setChoice] = (0, import_react.useState)("");
	const [text, setText] = (0, import_react.useState)("");
	const hits = (0, import_react.useMemo)(() => expected.filter((w) => text.toLowerCase().includes(w)).length, [text]);
	const won = choice === "formal" && hits >= 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			phase: "PÁGINA 7 · DESAFIO FINAL",
			title: "Boss Fight: O Entrevistado Desadequado",
			description: "Você é o assessor linguístico de um aluno que fará uma fala oficial na Câmara Municipal."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[2rem] border-4 border-foreground bg-primary p-7 text-primary-foreground shadow-[10px_10px_0_var(--foreground)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex justify-between text-xs font-black",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CHEFÃO · ADEQUAÇÃO FORMAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"HP ",
							Math.max(0, 100 - hits * 20),
							"/100"
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-6 overflow-hidden rounded-full border-2 border-foreground bg-foreground/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent transition-all",
							style: { width: `${Math.max(10, 100 - hits * 20)}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border-4 border-foreground bg-card p-5 text-card-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold text-primary",
								children: "Texto-problema"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-bold italic leading-relaxed",
								children: bad
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 list-inside list-disc text-sm font-semibold text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Há marcas de oralidade: “tipo assim”, “tá top”, “tá ligado”." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A situação exige fala pública e formal." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A ideia central deve ser preservada." })
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border-4 border-foreground bg-foreground p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold text-accent",
								children: "Missão do jogador"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-bold",
								children: "1) Escolha o caminho correto."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setChoice("informal"),
										className: `choice ${choice === "informal" ? "choice-selected" : ""}`,
										children: "Manter o tom de conversa, pois parece jovem."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setChoice("formal"),
										className: `choice ${choice === "formal" ? "choice-selected" : ""}`,
										children: "Adequar para registro formal, mantendo a mensagem."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setChoice("apagar"),
										className: `choice ${choice === "apagar" ? "choice-selected" : ""}`,
										children: "Apagar regionalismos e condenar falas populares."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 font-bold",
								children: "2) Reescreva o discurso."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: text,
								onChange: (e) => setText(e.target.value),
								className: "mt-3 min-h-44 w-full rounded-xl border-2 border-foreground bg-card p-4 font-semibold text-card-foreground",
								placeholder: "Senhoras e senhores, este projeto demonstra..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm font-bold text-accent",
								children: [
									"Pistas encontradas: ",
									hits,
									"/5"
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-2xl border-4 border-foreground bg-card p-5 text-center text-card-foreground",
					children: [won ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold text-success",
						children: "🏆 Vitória!"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-bold",
						children: "Você escolheu a adequação formal e preservou o combate ao preconceito linguístico."
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold",
						children: "⚔️ Chefão ainda de pé"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-bold text-muted-foreground",
						children: "Use registro formal e inclua ideias como variação, adequação e preconceito linguístico."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
							tone: "accent",
							onClick: () => {
								setChoice("formal");
								setText("Senhoras e senhores, este projeto demonstra que a variação linguística não deve ser tratada como erro. Cada forma de falar possui valor social e cultural. A norma-padrão é importante em contextos formais, mas o essencial é compreender a adequação ao contexto e combater o preconceito linguístico.");
							},
							children: "Ver modelo campeão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameLink, {
							to: "/",
							tone: "paper",
							children: "Voltar ao início"
						})]
					})]
				})
			]
		})]
	}) });
}
//#endregion
export { Page as component };
