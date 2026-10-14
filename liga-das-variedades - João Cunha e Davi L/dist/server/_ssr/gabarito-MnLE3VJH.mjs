import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as PageIntro, n as GameLink, r as GameShell } from "./GameButton-DGVAz_jy.mjs";
import { t as quiz } from "./quiz-_o5EWMZy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gabarito-MnLE3VJH.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-5xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				phase: "PÁGINA 6 · GABARITO",
				title: "Gabarito explicativo",
				description: "Confira as respostas no modelo da prova e revise o motivo de cada escolha."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: quiz.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "game-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							"Questão ",
							q.id,
							":"
						] }),
						" ",
						String.fromCharCode(65 + q.answer),
						") ",
						q.options[q.answer]
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Explicação:" }),
							" ",
							q.explanation
						]
					})]
				}, q.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameLink, {
					to: "/chefao",
					children: "Desafio final: Boss Fight →"
				})
			})
		]
	}) });
}
//#endregion
export { Page as component };
