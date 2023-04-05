import { writable, derived } from "svelte/store";

export const friction_symbol = writable(":");
export const joy_symbol = writable("~");
export const priority_symbol = writable("+");

export const symbols = derived(
	[friction_symbol, joy_symbol, priority_symbol],
	([$friction_symbol, $joy_symbol, $priority_symbol]) => {
		return {
			friction: $friction_symbol,
			joy: $joy_symbol,
			priority: $priority_symbol,
		};
	},
);
