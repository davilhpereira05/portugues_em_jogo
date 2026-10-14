import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as GameLink, r as GameShell } from "./GameButton-DGVAz_jy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DW-XBoV3.js
var import_jsx_runtime = require_jsx_runtime();
var davi_avatar_default = "/assets/davi-avatar-q8fcG3KR.png";
var joao_avatar_default = "/assets/joao-avatar-Bv4kcMcB.png";
var language_game_board_default = "/assets/language-game-board-DQrsJcoU.png";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-12 lg:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-pop lg:col-span-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "phase-chip",
					children: "🎮 PROJETO GAMIFICADO · GRUPO 04"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-6 font-display text-5xl font-bold leading-none sm:text-6xl lg:text-7xl",
					children: [
						"Liga das ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-primary",
							children: "Variedades"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 block text-3xl sm:text-4xl",
							children: "A jornada da linguagem"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 max-w-xl text-lg font-semibold leading-relaxed text-muted-foreground",
					children: [
						"A língua está viva — e você entrou no jogo! Atravesse sete fases, desvende sotaques, registros e mudanças históricas, some pontos e chegue preparado ao ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "PASSE / AVALIA II" }),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameLink, {
						to: "/aprenda",
						children: "▶ Começar a jogar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameLink, {
						to: "/desafio",
						tone: "paper",
						children: "Ir para o quiz"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-9 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex -space-x-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: davi_avatar_default,
							alt: "Avatar de Davi Luiz",
							width: 816,
							height: 816,
							className: "h-14 w-14 rounded-full border-4 border-foreground object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: joao_avatar_default,
							alt: "Avatar de João Cunha",
							width: 816,
							height: 816,
							className: "h-14 w-14 rounded-full border-4 border-foreground object-cover"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-extrabold",
						children: [
							"Por ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Davi Luiz"
							}),
							" & ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "João Cunha"
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "game-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "font-display text-xl",
							children: "Missão 01"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border-2 border-foreground bg-success px-3 py-1 text-xs font-black",
							children: "EM JOGO"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: language_game_board_default,
						alt: "Tabuleiro com mapa do Brasil, microfone e balões de fala",
						width: 1024,
						height: 768,
						className: "aspect-[4/3] w-full rounded-2xl border-2 border-foreground object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex justify-between text-xs font-black",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "JORNADA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1 / 7 FASES" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-4 overflow-hidden rounded-full border-2 border-foreground bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[14%] bg-primary" })
					})
				]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl font-bold",
			children: "Seu mapa de missões"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7",
			children: [
				"Aprenda",
				"Exemplos",
				"Explore",
				"Quiz",
				"Gabarito",
				"Boss Fight",
				"Vitória"
			].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-xl border-2 border-foreground p-3 font-extrabold ${i === 0 ? "bg-accent" : "bg-card"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs opacity-60",
					children: ["0", i + 1]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: x })]
			}, x))
		})]
	})] });
}
//#endregion
export { Home as component };
