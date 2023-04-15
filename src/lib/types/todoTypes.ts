import { get } from "svelte/store";

// regex for matching a date string or empty string
export const date_regex = /\d{4}-\d{2}-\d{2}/;
// export const date_regex = /\d{4}-\d{2}-\d{2}/;

// utils
import { get_unique_id } from "$utils/idUtils";

// create a todo id counter
export interface TodoConstructor {
	active?: boolean;
	completed?: string | null;
	created?: string | null;
	description?: string | null;
	due?: string | null;
	friction?: number;
	index?: number;
	id?: number;
	joy?: number;
	next?: boolean;
	tags?: string[];
	unique?: string;
	priority?: number;
}
export class Todo {
	// add index signature
	//eslint-disable-next-line
	[key: string]: any;
	// index: number;
	completed: string | null;
	created: string;
	description: string | null;
	due: string | null;
	friction: number;
	joy: number;
	next: boolean;
	priority: number;
	unique: string;
	updated: string | null;
	tags: string[];

	constructor(o?: TodoConstructor) {
		this.completed = o?.completed ? o.completed : null;
		this.created = o?.created ? o.created : new Date().toISOString();
		this.description = o && o.description ? o.description : "";
		this.due = o && o.due ? o.due : "";
		this.friction = o && o.friction ? o.friction : 0;
		this.joy = o && o.joy ? o.joy : 0;
		this.next = o && o.next ? o.next : false;
		this.updated = this.created ? this.created : "";
		this.priority = o && o.priority ? o.priority : 0;
		this.tags = o && o.tags && o.tags.length > 0 ? o.tags : [];
		this.unique = o && o.unique ? o.unique : get_unique_id();
	}
}

export type todoAsArray = string[];
