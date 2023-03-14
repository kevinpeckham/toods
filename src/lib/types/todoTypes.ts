import { id_counter } from "$stores/todoStore";
import { get } from "svelte/store";

// functions
import { timeLeftInDays } from "$utils/todoUtils";

// create a todo id counter
// export const id_counter = writable(0);

export interface TodoConstructor {
	active?: boolean;
	category?: string;
	completed?: boolean;
	friction?: number;
	dateAdded?: Date;
	description?: string;
	due?: Date;
	joy?: number;
	next?: boolean;
	tags?: string[];
	priority?: number;
}
export class Todo {
	// add index signature
	//eslint-disable-next-line
	[key: string]: any;
	active: boolean;
	id: number;
	category: string;
	completed: boolean;
	friction: number;
	dateAdded: Date;
	description: string;
	due?: Date;
	joy: number;
	dueDisplay: string;
	next: boolean;
	tags: string[];
	priority: number;
	constructor(obj?: TodoConstructor) {
		id_counter.set(get(id_counter) + 1);
		this.active = obj && obj.active ? obj.active : false;
		this.id = get(id_counter);
		this.category = obj && obj.category ? obj.category : "";
		this.completed = false;
		this.friction = obj && obj.friction ? obj.friction : 0;
		this.dateAdded = new Date();
		this.description = obj && obj.description ? obj.description : "";
		this.due = obj && obj.due ? obj.due : undefined;
		this.joy = obj && obj.joy ? obj.joy : 0;
		this.dueDisplay = this.due ? timeLeftInDays(this.due).toString() : "";
		this.next = obj && obj.next ? obj.next : false;
		this.priority = obj && obj.priority ? obj.priority : 0;
		this.tags = obj && obj.tags && obj.tags.length > 0 ? obj.tags : [];
	}
	ratingDisplay(rating: string) {
		let sym = "+";
		if (rating === "friction") sym = ":";
		else if (rating === "joy") sym = "~";
		return sym.repeat(this[rating]);
	}
}
