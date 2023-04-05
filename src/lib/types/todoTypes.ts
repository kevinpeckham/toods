import { id_counter } from "$stores/todosStore";
import { get } from "svelte/store";

// functions
import { timeLeftInDays } from "$utils/todoUtils";

// create a todo id counter
// export const id_counter = writable(0);

export interface TodoConstructor {
	active?: boolean;
	completed?: boolean;
	created?: string;
	description?: string;
	due?: string;
	friction?: string;
	joy?: string;
	next?: boolean;
	tags?: string[];
	priority?: string;
}
export class Todo {
	// add index signature
	//eslint-disable-next-line
	[key: string]: any;
	id: number;
	completed: boolean;
	created: string;
	friction: string;
	description: string;
	due: string;
	joy: string;
	next: boolean;
	tags: string[];
	priority: string;
	constructor(o?: TodoConstructor) {
		this.id = get(id_counter) as number;
		this.completed = false;
		this.created = o?.created
			? o.created
			: new Date().toISOString().split("T")[0];
		this.description = o && o.description ? o.description : "";
		this.due = o && o.due ? o.due : "";
		this.friction = o && o.friction ? o.friction : "";
		this.joy = o && o.joy ? o.joy : "";
		this.next = o && o.next ? o.next : false;
		this.priority = o && o.priority ? o.priority : "";
		this.tags = o && o.tags && o.tags.length > 0 ? o.tags : [];
	}
}

export type todoAsArray = string[];
