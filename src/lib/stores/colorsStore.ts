import { readable } from "svelte/store";

// utils
import { generateOKLCHShades } from "./../utils/colorUtils";

export const lemon = generateOKLCHShades(0.2, 114, 25);
export const oxford = generateOKLCHShades(0.05, 260, 25);

export const colors = readable({
	oxford: oxford,
	lemon: lemon,
});
