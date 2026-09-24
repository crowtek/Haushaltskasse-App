import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as ChartLine, h as House, r as TriangleAlert, u as Plus, x as ChartPie } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-9JcyfAhP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "Ein unerwarteter Fehler ist aufgetreten. Bitte lade die Seite neu.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-expense",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Etwas ist schiefgelaufen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-fg-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var CATEGORIES = [
	{
		id: "food",
		short: "Essen",
		name: "Lebensmittel",
		icon: "cart",
		color: "food",
		kind: "expense"
	},
	{
		id: "transport",
		short: "Verkehr",
		name: "Auto & Mobilität",
		icon: "car",
		color: "transport",
		kind: "expense"
	},
	{
		id: "home",
		short: "Wohnen",
		name: "Wohnen & Strom",
		icon: "home",
		color: "home",
		kind: "expense"
	},
	{
		id: "leisure",
		short: "Freizeit",
		name: "Freizeit & Kultur",
		icon: "ticket",
		color: "leisure",
		kind: "expense"
	},
	{
		id: "health",
		short: "Gesundheit",
		name: "Gesundheit",
		icon: "heart",
		color: "health",
		kind: "expense"
	},
	{
		id: "other",
		short: "Sonstiges",
		name: "Sonstiges",
		icon: "box",
		color: "other",
		kind: "expense"
	},
	{
		id: "salary",
		short: "Gehalt",
		name: "Gehalt",
		icon: "wallet",
		color: "income",
		kind: "income"
	},
	{
		id: "refund",
		short: "Erstattung",
		name: "Rückerstattung",
		icon: "gift",
		color: "income",
		kind: "income"
	},
	{
		id: "gift",
		short: "Geschenk",
		name: "Geschenk",
		icon: "spark",
		color: "income",
		kind: "income"
	}
];
var SUGGESTED_TAGS = [
	"Abo",
	"Einkauf",
	"Bar",
	"Karte",
	"Online",
	"Fixkosten"
];
var COLOR_VAR = {
	food: "var(--color-cat-food)",
	transport: "var(--color-cat-transport)",
	home: "var(--color-cat-home)",
	leisure: "var(--color-cat-leisure)",
	health: "var(--color-cat-health)",
	other: "var(--color-cat-other)",
	income: "var(--color-cat-income)"
};
function getCategory(id) {
	return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[5];
}
function categoriesFor(kind) {
	return CATEGORIES.filter((c) => c.kind === kind);
}
var MONTHS_DE = [
	"Januar",
	"Februar",
	"März",
	"April",
	"Mai",
	"Juni",
	"Juli",
	"August",
	"September",
	"Oktober",
	"November",
	"Dezember"
];
var MONTHS_SHORT_DE = [
	"Jan",
	"Feb",
	"Mär",
	"Apr",
	"Mai",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Okt",
	"Nov",
	"Dez"
];
function monthKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
function parseMonthKey(key) {
	const [y, m] = key.split("-").map(Number);
	return {
		year: y ?? (/* @__PURE__ */ new Date()).getFullYear(),
		month: (m ?? 1) - 1
	};
}
function shiftMonth(key, delta) {
	const { year, month } = parseMonthKey(key);
	return monthKey(new Date(year, month + delta, 1));
}
function monthLabel(key, style = "long") {
	const { year, month } = parseMonthKey(key);
	return `${style === "long" ? MONTHS_DE[month] : MONTHS_SHORT_DE[month]} ${year}`;
}
function monthName(key) {
	const { month } = parseMonthKey(key);
	return MONTHS_DE[month] ?? "";
}
function isInMonth(iso, key) {
	return monthKey(new Date(iso)) === key;
}
function startOfDay(date) {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}
function sameDay(a, b = /* @__PURE__ */ new Date()) {
	const d = new Date(a);
	return d.getFullYear() === b.getFullYear() && d.getMonth() === b.getMonth() && d.getDate() === b.getDate();
}
function formatDayLabel(iso, now = /* @__PURE__ */ new Date()) {
	const d = new Date(iso);
	const today = startOfDay(now);
	const that = startOfDay(d);
	const diff = Math.round((today.getTime() - that.getTime()) / 864e5);
	const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
	if (diff === 0) return `Heute, ${time}`;
	if (diff === 1) return "Gestern";
	return `${String(d.getDate()).padStart(2, "0")}. ${MONTHS_SHORT_DE[d.getMonth()]}`;
}
function formatPrettyDate(iso, now = /* @__PURE__ */ new Date()) {
	const d = new Date(iso);
	if (sameDay(iso, now)) return `Heute, ${String(d.getDate()).padStart(2, "0")}. ${MONTHS_SHORT_DE[d.getMonth()]}`;
	return `${String(d.getDate()).padStart(2, "0")}. ${MONTHS_SHORT_DE[d.getMonth()]} ${d.getFullYear()}`;
}
function weekBucket(iso) {
	const day = new Date(iso).getDate();
	if (day <= 7) return 0;
	if (day <= 14) return 1;
	if (day <= 21) return 2;
	return 3;
}
function atLocal(year, monthIndex, day, hour = 12, minute = 0) {
	return new Date(year, monthIndex, day, hour, minute, 0, 0).toISOString();
}
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
function createSeed() {
	const now = /* @__PURE__ */ new Date();
	const y = now.getFullYear();
	const m = now.getMonth();
	const today = now.getDate();
	const clamp = (day) => Math.min(day, today);
	const tx = (partial) => ({
		id: partial.id ?? uid("tx"),
		...partial
	});
	return {
		profile: { name: "Sarah" },
		transactions: [
			tx({
				id: "tx-salary",
				type: "income",
				amountCents: 308e3,
				categoryId: "salary",
				title: "Gehalt",
				note: "Monatliche Überweisung",
				tags: ["Fixkosten"],
				date: atLocal(y, m, 1, 9, 12)
			}),
			tx({
				id: "tx-otto",
				type: "income",
				amountCents: 12e3,
				categoryId: "refund",
				title: "Rückerstattung Otto",
				note: "Retourenzahlung",
				tags: ["Online"],
				date: atLocal(y, m, Math.min(2, today), 11, 4)
			}),
			tx({
				id: "tx-rent",
				type: "expense",
				amountCents: 52e3,
				categoryId: "home",
				title: "Miete Wohnung",
				note: "Kaltmiete",
				tags: ["Fixkosten"],
				date: atLocal(y, m, 1, 8, 0)
			}),
			tx({
				id: "tx-power",
				type: "expense",
				amountCents: 4890,
				categoryId: "home",
				title: "Stadtwerke Strom",
				note: "",
				tags: ["Fixkosten"],
				date: atLocal(y, m, clamp(5), 10, 20)
			}),
			tx({
				id: "tx-inet",
				type: "expense",
				amountCents: 1895,
				categoryId: "home",
				title: "Internet Vodafone",
				note: "",
				tags: ["Abo", "Fixkosten"],
				date: atLocal(y, m, clamp(7), 9, 0)
			}),
			tx({
				id: "tx-edeka",
				type: "expense",
				amountCents: 4580,
				categoryId: "food",
				title: "Edeka Supermarkt",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m, today, 14, 32)
			}),
			tx({
				id: "tx-rewe-2",
				type: "expense",
				amountCents: 12450,
				categoryId: "food",
				title: "Rewe City",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m, clamp(20), 18, 10)
			}),
			tx({
				id: "tx-lidl",
				type: "expense",
				amountCents: 8630,
				categoryId: "food",
				title: "Lidl",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m, clamp(15), 17, 40)
			}),
			tx({
				id: "tx-markt",
				type: "expense",
				amountCents: 4220,
				categoryId: "food",
				title: "Wochenmarkt",
				note: "Obst & Gemüse",
				tags: ["Einkauf", "Bar"],
				date: atLocal(y, m, clamp(13), 11, 15)
			}),
			tx({
				id: "tx-edeka-2",
				type: "expense",
				amountCents: 9875,
				categoryId: "food",
				title: "Edeka",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m, clamp(8), 16, 5)
			}),
			tx({
				id: "tx-bio",
				type: "expense",
				amountCents: 6440,
				categoryId: "food",
				title: "Bio Company",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m, clamp(5), 12, 22)
			}),
			tx({
				id: "tx-rewe-1",
				type: "expense",
				amountCents: 41985,
				categoryId: "food",
				title: "Rewe Wocheneinkauf",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m, 1, 16, 45)
			}),
			tx({
				id: "tx-shell",
				type: "expense",
				amountCents: 7200,
				categoryId: "transport",
				title: "Shell Tankstelle",
				note: "",
				tags: ["Karte"],
				date: atLocal(y, m, Math.max(1, today - 1), 19, 8)
			}),
			tx({
				id: "tx-db",
				type: "expense",
				amountCents: 4990,
				categoryId: "transport",
				title: "DB Ticket",
				note: "Hin & zurück",
				tags: ["Online"],
				date: atLocal(y, m, clamp(11), 7, 40)
			}),
			tx({
				id: "tx-park",
				type: "expense",
				amountCents: 850,
				categoryId: "transport",
				title: "Parkhaus City",
				note: "",
				tags: ["Bar"],
				date: atLocal(y, m, clamp(14), 15, 2)
			}),
			tx({
				id: "tx-shell-2",
				type: "expense",
				amountCents: 6555,
				categoryId: "transport",
				title: "Shell Tankstelle",
				note: "",
				tags: ["Karte"],
				date: atLocal(y, m, clamp(6), 18, 30)
			}),
			tx({
				id: "tx-netflix",
				type: "expense",
				amountCents: 1799,
				categoryId: "leisure",
				title: "Netflix Abo",
				note: "",
				tags: ["Abo", "Online"],
				date: atLocal(y, m, 1, 6, 12)
			}),
			tx({
				id: "tx-cinema",
				type: "expense",
				amountCents: 2400,
				categoryId: "leisure",
				title: "Kino Cinestar",
				note: "",
				tags: ["Karte"],
				date: atLocal(y, m, clamp(10), 20, 15)
			}),
			tx({
				id: "tx-spotify",
				type: "expense",
				amountCents: 1199,
				categoryId: "leisure",
				title: "Spotify",
				note: "",
				tags: ["Abo", "Online"],
				date: atLocal(y, m, clamp(4), 8, 0)
			}),
			tx({
				id: "tx-resto",
				type: "expense",
				amountCents: 6850,
				categoryId: "leisure",
				title: "Restaurant Sapori",
				note: "Abendessen",
				tags: ["Karte"],
				date: atLocal(y, m, clamp(14), 21, 10)
			}),
			tx({
				id: "tx-concert",
				type: "expense",
				amountCents: 8900,
				categoryId: "leisure",
				title: "Konzert Tickets",
				note: "",
				tags: ["Online"],
				date: atLocal(y, m, clamp(8), 13, 0)
			}),
			tx({
				id: "tx-cafe",
				type: "expense",
				amountCents: 1280,
				categoryId: "leisure",
				title: "Café Central",
				note: "",
				tags: ["Bar"],
				date: atLocal(y, m, clamp(19), 10, 45)
			}),
			tx({
				id: "tx-books",
				type: "expense",
				amountCents: 2290,
				categoryId: "leisure",
				title: "Thalia Bücher",
				note: "",
				tags: ["Karte"],
				date: atLocal(y, m, clamp(17), 15, 30)
			}),
			tx({
				id: "tx-gym",
				type: "expense",
				amountCents: 4672,
				categoryId: "leisure",
				title: "Fitness First",
				note: "",
				tags: ["Abo", "Fixkosten"],
				date: atLocal(y, m, clamp(3), 7, 15)
			}),
			tx({
				id: "tx-prev-salary",
				type: "income",
				amountCents: 308e3,
				categoryId: "salary",
				title: "Gehalt",
				note: "Monatliche Überweisung",
				tags: ["Fixkosten"],
				date: atLocal(y, m - 1, 1, 9, 12)
			}),
			tx({
				id: "tx-prev-rent",
				type: "expense",
				amountCents: 52e3,
				categoryId: "home",
				title: "Miete Wohnung",
				note: "Kaltmiete",
				tags: ["Fixkosten"],
				date: atLocal(y, m - 1, 1, 8, 0)
			}),
			tx({
				id: "tx-prev-power",
				type: "expense",
				amountCents: 5210,
				categoryId: "home",
				title: "Stadtwerke Strom",
				note: "",
				tags: ["Fixkosten"],
				date: atLocal(y, m - 1, 6, 10, 0)
			}),
			tx({
				id: "tx-prev-food-1",
				type: "expense",
				amountCents: 48320,
				categoryId: "food",
				title: "Rewe Wocheneinkauf",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m - 1, 4, 16, 0)
			}),
			tx({
				id: "tx-prev-food-2",
				type: "expense",
				amountCents: 22150,
				categoryId: "food",
				title: "Edeka",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m - 1, 12, 17, 20)
			}),
			tx({
				id: "tx-prev-food-3",
				type: "expense",
				amountCents: 18440,
				categoryId: "food",
				title: "Lidl",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m - 1, 19, 18, 0)
			}),
			tx({
				id: "tx-prev-food-4",
				type: "expense",
				amountCents: 11295,
				categoryId: "food",
				title: "Bio Company",
				note: "",
				tags: ["Einkauf"],
				date: atLocal(y, m - 1, 26, 12, 10)
			}),
			tx({
				id: "tx-prev-car",
				type: "expense",
				amountCents: 21e3,
				categoryId: "transport",
				title: "Shell Tankstelle",
				note: "",
				tags: ["Karte"],
				date: atLocal(y, m - 1, 9, 18, 0)
			}),
			tx({
				id: "tx-prev-fun",
				type: "expense",
				amountCents: 32400,
				categoryId: "leisure",
				title: "Freizeit & Ausgehen",
				note: "",
				tags: ["Karte"],
				date: atLocal(y, m - 1, 15, 20, 0)
			}),
			tx({
				id: "tx-prev-netflix",
				type: "expense",
				amountCents: 1799,
				categoryId: "leisure",
				title: "Netflix Abo",
				note: "",
				tags: ["Abo", "Online"],
				date: atLocal(y, m - 1, 1, 6, 12)
			})
		],
		goals: [{
			id: "goal-summer",
			name: "Sommerurlaub 2026",
			targetCents: 4e5,
			savedCents: 24e4,
			icon: "plane"
		}],
		viewMonth: monthKey(now),
		customTags: []
	};
}
var seed = createSeed();
var useBudgetStore = create()(persist((set, get) => ({
	...seed,
	setName: (name) => set({ profile: {
		...get().profile,
		name
	} }),
	setViewMonth: (viewMonth) => set({ viewMonth }),
	addTransaction: (input) => {
		set({ transactions: [{
			id: uid("tx"),
			...input
		}, ...get().transactions] });
		get().rememberTags(input.tags);
	},
	updateTransaction: (id, patch) => {
		set({ transactions: get().transactions.map((t) => t.id === id ? {
			...t,
			...patch
		} : t) });
		if (patch.tags) get().rememberTags(patch.tags);
	},
	deleteTransaction: (id) => {
		set({ transactions: get().transactions.filter((t) => t.id !== id) });
	},
	addGoal: (goal) => {
		set({ goals: [...get().goals, {
			...goal,
			id: uid("goal")
		}] });
	},
	updateGoal: (id, patch) => {
		set({ goals: get().goals.map((g) => g.id === id ? {
			...g,
			...patch
		} : g) });
	},
	contributeToGoal: (id, cents) => {
		set({ goals: get().goals.map((g) => g.id === id ? {
			...g,
			savedCents: Math.max(0, g.savedCents + cents)
		} : g) });
	},
	deleteGoal: (id) => {
		set({ goals: get().goals.filter((g) => g.id !== id) });
	},
	rememberTags: (tags) => {
		const extra = tags.map((t) => t.trim()).filter(Boolean).filter((t) => !SUGGESTED_TAGS.includes(t) && !get().customTags.includes(t));
		if (extra.length) set({ customTags: [...get().customTags, ...extra] });
	},
	resetDemo: () => {
		set(createSeed());
	}
}), {
	name: "haushaltskasse-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({
		profile: state.profile,
		transactions: state.transactions,
		goals: state.goals,
		viewMonth: state.viewMonth,
		customTags: state.customTags
	})
}));
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mark = () => setHydrated(true);
		if (useBudgetStore.persist.hasHydrated()) {
			mark();
			return;
		}
		const unsub = useBudgetStore.persist.onFinishHydration(mark);
		useBudgetStore.persist.rehydrate();
		return unsub;
	}, []);
	return hydrated;
}
var TABS = [
	{
		to: "/",
		label: "Übersicht",
		icon: House,
		end: true
	},
	{
		to: "/neu",
		label: "Neu",
		icon: Plus,
		end: false
	},
	{
		to: "/kategorien",
		label: "Kategorien",
		icon: ChartPie,
		end: false
	},
	{
		to: "/bericht",
		label: "Bericht",
		icon: ChartLine,
		end: false
	}
];
function AppShell({ children }) {
	const hydrated = useHydrated();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh justify-center bg-bg-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-h-dvh w-full max-w-md flex-col bg-bg lg:shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex min-h-0 flex-1 flex-col overflow-y-auto pb-28",
					children: hydrated ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "bottom-nav absolute inset-x-0 bottom-0 z-20 border-t border-border bg-nav/95 px-2 pt-2 backdrop-blur-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid grid-cols-4",
						children: TABS.map((tab) => {
							const active = tab.end ? pathname === "/" : pathname === tab.to;
							const Icon = tab.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: tab.to,
								className: cn("flex flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-semibold transition-colors duration-150", active ? "text-primary" : "text-fg-subtle"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									strokeWidth: active ? 2.4 : 1.8,
									fill: active && tab.to !== "/neu" ? "currentColor" : "none",
									fillOpacity: active && tab.to !== "/neu" ? .18 : 0
								}), tab.label]
							}) }, tab.to);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-center",
					richColors: false,
					toastOptions: {
						className: "font-sans",
						style: {
							background: "var(--color-surface)",
							color: "var(--color-fg)",
							border: "1px solid var(--color-border)",
							borderRadius: "16px"
						}
					}
				})
			]
		})
	});
}
function PageSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-5 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-48 animate-pulse rounded-lg bg-surface-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-64 animate-pulse rounded-lg bg-surface-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-3xl bg-surface-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-2xl bg-surface-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-2xl bg-surface-muted" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 animate-pulse rounded-2xl bg-surface-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 animate-pulse rounded-2xl bg-surface-muted" })
		]
	});
}
var styles_default = "/assets/styles-DSkoKjyC.css";
var APP_NAME = "Haushaltskasse";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0C6B4C"
			},
			{
				name: "description",
				content: "Haushaltskasse — Ausgaben erfassen, Tags setzen, Sparquote im Blick."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "de",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-BiB-8bnW.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./aktivitaeten-BM1L6bzj.mjs");
var Route$3 = createFileRoute("/aktivitaeten")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	validateSearch: (search) => ({
		cat: typeof search.cat === "string" ? search.cat : void 0,
		tag: typeof search.tag === "string" ? search.tag : void 0
	})
});
var $$splitComponentImporter$2 = () => import("./bericht-CFmlgR7d.mjs");
var Route$2 = createFileRoute("/bericht")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./kategorien-DxOnNRh_.mjs");
var Route$1 = createFileRoute("/kategorien")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./neu-C4rlWW0Y.mjs");
var Route = createFileRoute("/neu")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AktivitaetenRoute: Route$3.update({
		id: "/aktivitaeten",
		path: "/aktivitaeten",
		getParentRoute: () => Route$5
	}),
	BerichtRoute: Route$2.update({
		id: "/bericht",
		path: "/bericht",
		getParentRoute: () => Route$5
	}),
	KategorienRoute: Route$1.update({
		id: "/kategorien",
		path: "/kategorien",
		getParentRoute: () => Route$5
	}),
	NeuRoute: Route.update({
		id: "/neu",
		path: "/neu",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { getCategory as _, formatPrettyDate as a, monthName as c, weekBucket as d, CATEGORIES as f, categoriesFor as g, SUGGESTED_TAGS as h, formatDayLabel as i, parseMonthKey as l, MONTHS_DE as m, Route$3 as n, isInMonth as o, COLOR_VAR as p, useBudgetStore as r, monthLabel as s, router_exports as t, shiftMonth as u, cn as v };
