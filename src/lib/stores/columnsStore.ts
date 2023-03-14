//- store
import { writable, derived, type Writable } from "svelte/store";

//import type { Todo } from "$stores/todoStore";

interface Column {
	width: number;
	widthUnit: string;
	shortLabel?: string;
	label: string;
	handle: string;
	symbol?: string;
}

export const columns: Writable<Column[]> = writable([
	{
		width: 30,
		widthUnit: "px",
		label: "",
		shortLabel: "",
		symbol: "",
		handle: "completed",
	},
	{
		width: 30,
		widthUnit: "px",
		label: "next",
		shortLabel: "nxt",
		symbol: "!",
		handle: "next",
	},
	{
		width: 56,
		widthUnit: "px",
		label: "due(d)",
		handle: "due",
		shortLabel: "due",
		symbol: "/",
		displaySymbolInColHeading: false,
	},
	{
		width: 5,
		widthUnit: "%",
		shortLabel: "#",
		label: "id",
		handle: "id",
		symbol: "0",
		displaySymbolInColHeading: false,
	},
	{
		width: 80,
		widthUnit: "px",
		shortLabel: "cat",
		label: "category",
		handle: "category",
		symbol: "#",
		displaySymbolInColHeading: false,
	},
	{
		width: 1,
		widthUnit: "fr",
		shortLabel: "desc",
		label: "description",
		symbol: "?",
		handle: "description",
		displaySymbolInColHeading: false,
	},
	{
		width: 70,
		widthUnit: "px",
		label: "priority",
		shortLabel: "pri",
		symbol: "+",
		handle: "priority",
		displaySymbolInColHeading: true,
	},
	{
		width: 70,
		widthUnit: "px",
		label: "friction",
		shortLabel: "frc",
		symbol: ":",
		handle: "friction",
		displaySymbolInColHeading: true,
	},

	{
		width: 60,
		widthUnit: "px",
		label: "joy",
		shortLabel: "joy",
		symbol: "~",
		handle: "joy",
		displaySymbolInColHeading: true,
	},
	{
		width: 160,
		widthUnit: "px",
		label: "tags",
		handle: "tags",
		symbol: "@",
		displaySymbolInColHeading: false,
	},
]);

export const columnHandles = derived(columns, ($columns) => {
	return $columns.map((col) => col.handle);
});
