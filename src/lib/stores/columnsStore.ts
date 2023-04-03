//- store
import { writable, derived, type Writable } from "svelte/store";

import type { Column } from "$types/columnTypes";

export const columns: Writable<Column[]> = writable([
	// 1. id
	{
		breakPointLG: {
			classes:
				"lg:order-0 lg:text-right lg:pr-2 lg:text-12 lg:flex lg:items-center lg:justify-end ",
			order: "0",
			width: "2",
			widthUnit: "rem",
		},
		handle: "id",
		label: "id",
		shortLabel: "id",
		symbol: "#",
	},
	// 2. next
	{
		breakPointLG: {
			classes: "lg:order-1",
			order: "1",
			width: "2",
			widthUnit: "rem",
		},
		handle: "next",
		label: "next",
		shortLabel: "nxt",
		symbol: "!",
	},
	// 3. due
	{
		breakPointLG: {
			order: "2",
			width: 60,
			widthUnit: "px",
		},
		handle: "due",
		label: "due(d)",
		shortLabel: "due",
		symbol: "/",
	},
	//- b. completed
	{
		breakPointLG: {
			classes:
				"lg:w-4 lg:order-9 lg:h-full lg:text-center lg:flex lg:justify-center ",
			width: 16,
			widthUnit: "px",
		},
		handle: "completed",
		label: "",
		shortLabel: "",
		symbol: "",
	},

	// 4. id

	// 5. category
	// {
	// 	breakPointLG: {
	// 		order: 5,
	// 		width: 50,
	// 		widthUnit: "px",
	// 	},
	// 	displaySymbolInColHeading: false,
	// 	handle: "category",
	// 	label: "category",
	// 	shortLabel: "cat",
	// 	symbol: "#",
	// },

	// 6. description
	{
		breakPointLG: {
			order: "4",
			width: 8,
			widthUnit: "fr",
		},
		handle: "description",
		label: "description",
		shortLabel: "desc",
		symbol: "?",
	},

	// 7. priority
	{
		breakPointLG: {
			order: "5",
			width: 34,
			widthUnit: "px",
		},
		handle: "priority",
		label: "priority",
		shortLabel: "pri",
		symbol: "+",
	},
	// 8. friction
	{
		breakPointLG: {
			order: "6",
			width: 34,
			widthUnit: "px",
		},
		handle: "friction",
		label: "friction",
		shortLabel: "frc",
		symbol: ":",
	},
	// 9. joy
	{
		breakPointLG: {
			order: "7",
			width: 34,
			widthUnit: "px",
		},
		handle: "joy",
		label: "joy",
		shortLabel: "joy",
		symbol: "~",
	},
	// 10. tags
	{
		breakPointLG: {
			order: "9",
			width: 1,
			widthUnit: "fr",
		},
		handle: "tags",
		label: "tags",
		shortLabel: "tags",
		symbol: "@",
	},
]);

export const columnHandles = derived(columns, ($columns) => {
	return $columns.map((col) => col.handle);
});

export const column_id = derived(columns, ($columns) => {
	const found = $columns.find((col) => col.handle === "id");
	return found;
});
export const column_next = derived(columns, ($columns) => {
	const found = $columns.find((col) => col.handle === "next");
	return found;
});
export const column_due = derived(columns, ($columns) => {
	const found = $columns.find((col) => col.handle === "due");
	return found;
});
export const column_priority = derived(columns, ($columns) => {
	const found = $columns.find((col) => col.handle === "priority");
	return found;
});
