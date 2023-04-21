import { writable, derived } from "svelte/store";

export const friction_symbol = writable(";");
export const joy_symbol = writable("~");
export const next_symbol = writable("!");
export const priority_symbol = writable("+");

export const symbols = derived(
	[friction_symbol, joy_symbol, priority_symbol, next_symbol],
	([$friction_symbol, $joy_symbol, $priority_symbol, $next_symbol]) => {
		interface Symbols {
			// index signature
			[key: string]: string;
			next: string;
			friction: string;
			joy: string;
			priority: string;
		}
		const obj: Symbols = {
			friction: $friction_symbol,
			joy: $joy_symbol,
			next: $next_symbol,
			priority: $priority_symbol,
		};
		return obj;
	},
);

export const description_max_length = writable(120);
export const showCompletedTodos = writable(false);
