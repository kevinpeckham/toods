import { writable, derived } from "svelte/store";

export const friction_symbol = writable(":");
export const joy_symbol = writable("~");
export const priority_symbol = writable("+");

export const symbols = derived(
	[friction_symbol, joy_symbol, priority_symbol],
	([$friction_symbol, $joy_symbol, $priority_symbol]) => {
		interface Symbols {
			// index signature
			[key: string]: string;
			friction: string;
			joy: string;
			priority: string;
		}
		const obj: Symbols = {
			friction: $friction_symbol,
			joy: $joy_symbol,
			priority: $priority_symbol,
		};
		return obj;
	},
);

export const description_max_length = writable(120);
