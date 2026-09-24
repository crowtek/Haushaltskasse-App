import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as ChevronLeft, i as Trash2, t as X, v as Delete, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as getCategory, a as formatPrettyDate, g as categoriesFor, h as SUGGESTED_TAGS, r as useBudgetStore, v as cn } from "./router-9JcyfAhP.mjs";
import { i as appendKey, n as CategoryGlyph, s as formatEUR, t as CategoryBadge, u as parseKeypad } from "./category-icon-CQNUiY8f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dialogs-CppZ6E1u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEYS = [
	[
		"1",
		"2",
		"3"
	],
	[
		"4",
		"5",
		"6"
	],
	[
		"7",
		"8",
		"9"
	],
	[
		",",
		"0",
		"back"
	]
];
function Keypad({ onKey }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-2",
		children: KEYS.flat().map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onKey(key),
			className: cn("flex h-16 items-center justify-center rounded-2xl bg-surface text-xl font-semibold text-fg", "shadow-card transition-transform duration-150 ease-out active:scale-[0.96]"),
			"aria-label": key === "back" ? "Löschen" : key === "," ? "Komma" : key,
			children: key === "back" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete, {
				className: "size-6 text-fg-muted",
				strokeWidth: 1.8
			}) : key
		}, key))
	});
}
function Overlay({ open, onOpenChange, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-fg/30 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-bg p-5 shadow-float",
			"aria-describedby": void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-lg font-bold text-fg",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-10 items-center justify-center rounded-full bg-surface-muted text-fg-muted",
						"aria-label": "Schließen",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				})]
			}), children]
		})] })
	});
}
function TransactionDetail({ tx, open, onOpenChange }) {
	const updateTransaction = useBudgetStore((s) => s.updateTransaction);
	const deleteTransaction = useBudgetStore((s) => s.deleteTransaction);
	const [title, setTitle] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [tags, setTags] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!tx) return;
		setTitle(tx.title);
		setNote(tx.note);
		setTags(tx.tags);
	}, [tx]);
	if (!tx) return null;
	const cat = getCategory(tx.categoryId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Overlay, {
		open,
		onOpenChange,
		title: tx.title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBadge, {
					id: tx.categoryId,
					size: "lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg-muted",
					children: cat.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("tabular text-2xl font-bold", tx.type === "income" ? "text-income" : "text-expense"),
					children: formatEUR(tx.type === "income" ? tx.amountCents : -tx.amountCents, { sign: "always" })
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-fg-muted",
				children: formatPrettyDate(tx.date)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-5 block text-xs font-semibold uppercase tracking-wide text-fg-subtle",
				children: ["Bezeichnung", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					className: "mt-1.5 w-full rounded-2xl bg-surface px-3 py-3 text-sm font-medium text-fg shadow-card outline-none ring-primary focus:ring-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block text-xs font-semibold uppercase tracking-wide text-fg-subtle",
				children: ["Notiz", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					placeholder: "Optional",
					className: "mt-1.5 w-full rounded-2xl bg-surface px-3 py-3 text-sm text-fg shadow-card outline-none ring-primary focus:ring-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-semibold uppercase tracking-wide text-fg-subtle",
				children: "Tags"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagEditor, {
				value: tags,
				onChange: setTags
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex-1 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-fg transition-transform duration-150 active:scale-[0.98]",
					onClick: () => {
						updateTransaction(tx.id, {
							title: title.trim() || tx.title,
							note,
							tags
						});
						toast("Gespeichert");
						onOpenChange(false);
					},
					children: "Änderungen speichern"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-12 items-center justify-center rounded-2xl bg-expense/10 text-expense",
					"aria-label": "Löschen",
					onClick: () => {
						deleteTransaction(tx.id);
						toast("Eintrag gelöscht");
						onOpenChange(false);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" })
				})]
			})
		]
	});
}
function TagEditor({ value, onChange, compact = false }) {
	const customTags = useBudgetStore((s) => s.customTags);
	const [draft, setDraft] = (0, import_react.useState)("");
	const pool = [...SUGGESTED_TAGS, ...customTags.filter((t) => !SUGGESTED_TAGS.includes(t))];
	function toggle(tag) {
		onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);
	}
	function addDraft() {
		const next = draft.trim().replace(/^#/, "");
		if (!next) return;
		if (!value.includes(next)) onChange([...value, next]);
		setDraft("");
	}
	const chips = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [pool.map((tag) => {
		const on = value.includes(tag);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => toggle(tag),
			className: cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-150", on ? "bg-primary text-primary-fg" : "bg-surface text-fg-muted shadow-card"),
			children: tag
		}, tag);
	}), value.filter((t) => !pool.includes(t)).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => toggle(tag),
		className: "shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-fg",
		children: tag
	}, tag))] });
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-scrollbar mt-2 flex gap-1.5 overflow-x-auto",
		children: [chips, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: draft,
			onChange: (e) => setDraft(e.target.value),
			onKeyDown: (e) => {
				if (e.key === "Enter" || e.key === ",") {
					e.preventDefault();
					addDraft();
				}
			},
			placeholder: "+ Tag",
			className: "w-20 shrink-0 rounded-full bg-surface px-3 py-1.5 text-xs text-fg shadow-card outline-none ring-primary placeholder:text-fg-subtle focus:ring-2"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-1.5",
		children: chips
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: draft,
			onChange: (e) => setDraft(e.target.value),
			onKeyDown: (e) => {
				if (e.key === "Enter" || e.key === ",") {
					e.preventDefault();
					addDraft();
				}
			},
			placeholder: "Eigenes Tag, Enter zum Hinzufügen",
			className: "min-w-0 flex-1 rounded-2xl bg-surface px-3 py-2.5 text-sm text-fg shadow-card outline-none ring-primary focus:ring-2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: addDraft,
			className: "rounded-2xl bg-primary-soft px-3 text-sm font-semibold text-primary",
			children: "Hinzu"
		})]
	})] });
}
function DatePicker({ value, onChange }) {
	const current = new Date(value);
	const [cursor, setCursor] = (0, import_react.useState)(() => new Date(current.getFullYear(), current.getMonth(), 1));
	(0, import_react.useEffect)(() => {
		const d = new Date(value);
		setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
	}, [value]);
	const year = cursor.getFullYear();
	const month = cursor.getMonth();
	const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const cells = [...Array.from({ length: firstWeekday }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-surface p-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-9 items-center justify-center rounded-full bg-surface-muted",
						onClick: () => setCursor(new Date(year, month - 1, 1)),
						"aria-label": "Vorheriger Monat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: cursor.toLocaleDateString("de-DE", {
							month: "long",
							year: "numeric"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-9 items-center justify-center rounded-full bg-surface-muted",
						onClick: () => setCursor(new Date(year, month + 1, 1)),
						"aria-label": "Nächster Monat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase text-fg-subtle",
				children: [
					"Mo",
					"Di",
					"Mi",
					"Do",
					"Fr",
					"Sa",
					"So"
				].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "py-1",
					children: d
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: cells.map((day, i) => {
					if (!day) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `e-${i}`);
					const selected = day === current.getDate() && month === current.getMonth() && year === current.getFullYear();
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							const next = new Date(value);
							next.setFullYear(year, month, day);
							onChange(next.toISOString());
						},
						className: cn("flex size-9 items-center justify-center justify-self-center rounded-full text-sm font-medium", selected ? "bg-primary text-primary-fg" : "text-fg hover:bg-primary-soft"),
						children: day
					}, day);
				})
			})
		]
	});
}
function SettingsDialog({ open, onOpenChange }) {
	const name = useBudgetStore((s) => s.profile.name);
	const setName = useBudgetStore((s) => s.setName);
	const resetDemo = useBudgetStore((s) => s.resetDemo);
	const [draft, setDraft] = (0, import_react.useState)(name);
	(0, import_react.useEffect)(() => {
		if (open) setDraft(name);
	}, [open, name]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Overlay, {
		open,
		onOpenChange,
		title: "Profil",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-xs font-semibold uppercase tracking-wide text-fg-subtle",
				children: ["Dein Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					className: "mt-1.5 w-full rounded-2xl bg-surface px-3 py-3 text-sm font-medium text-fg shadow-card outline-none ring-primary focus:ring-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-5 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-fg",
				onClick: () => {
					setName(draft.trim() || "Sarah");
					toast("Profil gespeichert");
					onOpenChange(false);
				},
				children: "Speichern"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 w-full rounded-2xl bg-surface py-3.5 text-sm font-semibold text-fg-muted shadow-card",
				onClick: () => {
					resetDemo();
					toast("Demo-Daten wiederhergestellt");
					onOpenChange(false);
				},
				children: "Demo-Daten zurücksetzen"
			})
		]
	});
}
function ContributeDialog({ goal, open, onOpenChange }) {
	const contributeToGoal = useBudgetStore((s) => s.contributeToGoal);
	const [raw, setRaw] = (0, import_react.useState)("50");
	(0, import_react.useEffect)(() => {
		if (open) setRaw("50");
	}, [open]);
	if (!goal) return null;
	const cents = parseKeypad(raw);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Overlay, {
		open,
		onOpenChange,
		title: "Einzahlen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg-muted",
				children: goal.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tabular mt-2 text-3xl font-bold text-primary",
				children: formatEUR(cents)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keypad, { onKey: (k) => setRaw((r) => appendKey(r, k)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: cents <= 0,
				className: "mt-5 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-fg disabled:opacity-40",
				onClick: () => {
					contributeToGoal(goal.id, cents);
					toast(`${formatEUR(cents)} zu ${goal.name} hinzugefügt`);
					onOpenChange(false);
				},
				children: "Betrag einzahlen"
			})
		]
	});
}
function GoalDialog({ open, onOpenChange }) {
	const addGoal = useBudgetStore((s) => s.addGoal);
	const [name, setName] = (0, import_react.useState)("");
	const [raw, setRaw] = (0, import_react.useState)("1000");
	(0, import_react.useEffect)(() => {
		if (open) {
			setName("");
			setRaw("1000");
		}
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Overlay, {
		open,
		onOpenChange,
		title: "Neues Sparziel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-xs font-semibold uppercase tracking-wide text-fg-subtle",
				children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "z.B. Notgroschen",
					className: "mt-1.5 w-full rounded-2xl bg-surface px-3 py-3 text-sm font-medium text-fg shadow-card outline-none ring-primary focus:ring-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-semibold uppercase tracking-wide text-fg-subtle",
				children: "Zielbetrag"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tabular mt-1 text-3xl font-bold text-fg",
				children: formatEUR(parseKeypad(raw))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keypad, { onKey: (k) => setRaw((r) => appendKey(r, k)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !name.trim() || parseKeypad(raw) <= 0,
				className: "mt-5 w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-fg disabled:opacity-40",
				onClick: () => {
					addGoal({
						name: name.trim(),
						targetCents: parseKeypad(raw),
						savedCents: 0,
						icon: "spark"
					});
					toast("Sparziel angelegt");
					onOpenChange(false);
				},
				children: "Sparziel speichern"
			})
		]
	});
}
function CategoryPicker({ kind, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-scrollbar flex gap-2 overflow-x-auto pb-1",
		children: categoriesFor(kind).map((c) => {
			const on = c.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(c.id),
				className: cn("flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-150", on ? "bg-primary text-primary-fg" : "bg-surface text-fg shadow-card"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGlyph, {
					id: c.id,
					className: "size-4"
				}), c.short]
			}, c.id);
		})
	});
}
//#endregion
export { Keypad as a, TransactionDetail as c, GoalDialog as i, ContributeDialog as n, SettingsDialog as o, DatePicker as r, TagEditor as s, CategoryPicker as t };
