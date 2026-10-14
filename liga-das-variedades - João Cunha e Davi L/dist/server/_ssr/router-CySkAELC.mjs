import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, x as useRouter, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CySkAELC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-EmT9081r.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Liga das Variedades" },
			{
				name: "description",
				content: "Revisão gamificada de variação linguística para o PASSE e AVALIA II."
			},
			{
				name: "author",
				content: "Davi Luiz e João Cunha"
			},
			{
				property: "og:title",
				content: "Liga das Variedades"
			},
			{
				property: "og:description",
				content: "Revisão gamificada de variação linguística para o PASSE e AVALIA II."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap",
				rel: "stylesheet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$6 = () => import("./routes-DW-XBoV3.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Liga das Variedades — Português em Jogo" },
		{
			name: "description",
			content: "Comece uma jornada gamificada pela variação linguística e pelos níveis de linguagem."
		},
		{
			property: "og:title",
			content: "Liga das Variedades — Português em Jogo"
		},
		{
			property: "og:description",
			content: "Sete fases de revisão para o PASSE e AVALIA II."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./aprenda-Cjw5Ckil.mjs");
var Route$5 = createFileRoute("/aprenda")({
	head: () => ({ meta: [
		{ title: "Aprenda — Liga das Variedades" },
		{
			name: "description",
			content: "Teoria dinâmica sobre tipos de variação linguística, norma-padrão e preconceito linguístico."
		},
		{
			property: "og:title",
			content: "Aprenda variação linguística"
		},
		{
			property: "og:description",
			content: "Domine os quatro eixos de variação e a adequação linguística."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./chefao-DXkGN4rz.mjs");
var Route$4 = createFileRoute("/chefao")({
	head: () => ({ meta: [
		{ title: "Boss Fight — Liga das Variedades" },
		{
			name: "description",
			content: "Missão final interativa sobre adequação linguística em discurso formal."
		},
		{
			property: "og:title",
			content: "Boss Fight: O Entrevistado Desadequado"
		},
		{
			property: "og:description",
			content: "Reescreva um texto inadequado para vencer o jogo."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./desafio-MMjWD3Ck.mjs");
var Route$3 = createFileRoute("/desafio")({
	head: () => ({ meta: [
		{ title: "Desafio Quiz — Liga das Variedades" },
		{
			name: "description",
			content: "Quiz gamificado com 15 questões inéditas sobre variação linguística."
		},
		{
			property: "og:title",
			content: "Quiz gamificado de variação linguística"
		},
		{
			property: "og:description",
			content: "Responda 15 questões no nível PASSE e AVALIA II."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./exemplos-Cm2XWohj.mjs");
var Route$2 = createFileRoute("/exemplos")({
	head: () => ({ meta: [
		{ title: "Exemplos comentados — Liga das Variedades" },
		{
			name: "description",
			content: "Cinco exemplos comentados de registros, regionalismos, jargões e variação histórica."
		},
		{
			property: "og:title",
			content: "Exemplos de variação linguística"
		},
		{
			property: "og:description",
			content: "Veja a língua em ação em cinco contextos."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./explore-pFOrwjsx.mjs");
var Route$1 = createFileRoute("/explore")({
	head: () => ({ meta: [
		{ title: "Explore — Liga das Variedades" },
		{
			name: "description",
			content: "Mapa conceitual e roteiro do podcast Minuto Língua Viva."
		},
		{
			property: "og:title",
			content: "Explore recursos de Língua Portuguesa"
		},
		{
			property: "og:description",
			content: "Mapa mental e podcast sobre variação e preconceito linguístico."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./gabarito-MnLE3VJH.mjs");
var Route = createFileRoute("/gabarito")({
	head: () => ({ meta: [
		{ title: "Gabarito explicativo — Liga das Variedades" },
		{
			name: "description",
			content: "Respostas e explicações pedagógicas das 15 questões do quiz."
		},
		{
			property: "og:title",
			content: "Gabarito explicativo do quiz"
		},
		{
			property: "og:description",
			content: "Confira as respostas corretas e entenda cada variação."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AprendaRoute: Route$5.update({
		id: "/aprenda",
		path: "/aprenda",
		getParentRoute: () => Route$7
	}),
	ChefaoRoute: Route$4.update({
		id: "/chefao",
		path: "/chefao",
		getParentRoute: () => Route$7
	}),
	DesafioRoute: Route$3.update({
		id: "/desafio",
		path: "/desafio",
		getParentRoute: () => Route$7
	}),
	ExemplosRoute: Route$2.update({
		id: "/exemplos",
		path: "/exemplos",
		getParentRoute: () => Route$7
	}),
	ExploreRoute: Route$1.update({
		id: "/explore",
		path: "/explore",
		getParentRoute: () => Route$7
	}),
	GabaritoRoute: Route.update({
		id: "/gabarito",
		path: "/gabarito",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
