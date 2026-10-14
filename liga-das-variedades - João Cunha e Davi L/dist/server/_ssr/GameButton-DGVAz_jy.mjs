import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Star, r as Menu, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GameButton-DGVAz_jy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var phases = [
	["/", "Início"],
	["/aprenda", "Aprenda"],
	["/exemplos", "Exemplos"],
	["/explore", "Explore"],
	["/desafio", "Desafio"],
	["/gabarito", "Gabarito"],
	["/chefao", "Chefão"]
];
function GameShell({ children }) {
	const path = useRouterState({ select: (state) => state.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const active = Math.max(0, phases.findIndex(([to]) => to === path));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-50 border-b-4 border-foreground bg-background/95 backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex items-center gap-2 font-display text-lg font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "logo-tile",
									children: "L"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Liga das Variedades"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "hidden items-center gap-1 lg:flex",
								children: phases.map(([to, label], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to,
									className: `nav-link ${path === to ? "nav-link-active" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i + 1 }), label]
								}, to))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "score-pill",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											size: 15,
											fill: "currentColor"
										}),
										" Fase ",
										active + 1,
										"/7"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": open ? "Fechar menu" : "Abrir menu",
									className: "icon-button lg:hidden",
									onClick: () => setOpen(!open),
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-primary transition-all",
							style: { width: `${(active + 1) / 7 * 100}%` }
						})
					}),
					open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "grid grid-cols-2 gap-2 border-t-2 border-foreground p-3 lg:hidden",
						children: phases.map(([to, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to,
							onClick: () => setOpen(false),
							className: `nav-link ${path === to ? "nav-link-active" : ""}`,
							children: label
						}, to))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mx-auto max-w-7xl px-4 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-between gap-3 rounded-2xl border-4 border-foreground bg-foreground p-6 text-primary-foreground sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "font-display",
						children: "Liga das Variedades · Grupo 04"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold opacity-75",
						children: "Davi Luiz & João Cunha · 2º ano · PASSE / AVALIA II"
					})]
				})
			})
		]
	});
}
function PageIntro({ phase, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "phase-chip",
				children: phase
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-bold sm:text-5xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-2xl text-lg font-semibold text-muted-foreground",
				children: description
			})
		]
	});
}
var tones = {
	brand: "bg-primary text-primary-foreground",
	accent: "bg-accent text-accent-foreground",
	paper: "bg-card text-card-foreground"
};
function GameButton({ children, tone = "brand", className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: `game-button ${tones[tone]} ${className}`,
		...props,
		children
	});
}
function GameLink({ children, to, tone = "brand" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: `game-button ${tones[tone]}`,
		children
	});
}
//#endregion
export { PageIntro as i, GameLink as n, GameShell as r, GameButton as t };
