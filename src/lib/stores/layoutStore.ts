import { writable, derived } from "svelte/store";
import { window_w } from "$stores/windowStore";

export const breakpoint = derived(window_w, ($window_w) => {
	return $window_w < 640 ? "mobile" : "desktop";
});

export const grid_columns_sm = [
	"24px",
	"24px",
	"36px",
	"1fr",
	"0px",
	"0px",
	"0",
	"120px",
];

export const grid_columns_lg = [
	"42px",
	"24px",
	"124px",
	"1fr",
	"36px",
	"36px",
	"36px",
	"120px",
	"24px",
];

export const grid_template_columns = derived([window_w], ([window_w]) => {
	const grid_columns = [42, 24, 124, 100, 36, 36, 36, 120];

	const sm = grid_columns_sm.join(" ");
	const lg = grid_columns_lg.join(" ");

	return lg;
});
