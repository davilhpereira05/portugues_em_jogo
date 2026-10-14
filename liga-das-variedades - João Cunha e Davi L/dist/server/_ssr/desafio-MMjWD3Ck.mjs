import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as PageIntro, n as GameLink, r as GameShell } from "./GameButton-DGVAz_jy.mjs";
import { t as quiz } from "./quiz-_o5EWMZy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desafio-MMjWD3Ck.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const [answers, setAnswers] = (0, import_react.useState)({});
	const score = (0, import_react.useMemo)(() => quiz.reduce((n, q) => n + (answers[q.id] === q.answer ? 1 : 0), 0), [answers]);
	const done = Object.keys(answers).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				phase: "PÁGINA 5 · DESAFIO",
				title: "Quiz gamificado",
				description: "15 questões inéditas. Marque suas escolhas para acompanhar o placar; as explicações ficam só no gabarito."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-[78px] z-20 mb-8 rounded-2xl border-4 border-foreground bg-accent p-4 shadow-[5px_5px_0_var(--foreground)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 font-black",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"⭐ Placar: ",
						score,
						"/",
						quiz.length
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Respondidas: ",
						done,
						"/",
						quiz.length
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 h-4 overflow-hidden rounded-full border-2 border-foreground bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-primary transition-all",
						style: { width: `${done / quiz.length * 100}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: quiz.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "game-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground",
								children: ["QUESTÃO ", String(q.id).padStart(2, "0")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border-2 border-foreground bg-accent px-3 py-1 text-xs font-black",
								children: q.style
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-extrabold leading-snug",
							children: q.prompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-2",
							children: q.options.map((op, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setAnswers((a) => ({
									...a,
									[q.id]: i
								})),
								className: `choice ${answers[q.id] === i ? "choice-selected" : ""}`,
								children: [
									String.fromCharCode(65 + i),
									") ",
									op
								]
							}, op))
						})
					]
				}, q.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameLink, {
					to: "/gabarito",
					tone: "accent",
					children: "Ver gabarito explicativo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameLink, {
					to: "/chefao",
					children: "Ir ao Chefão"
				})]
			})
		]
	}) });
}
//#endregion
export { Page as component };
