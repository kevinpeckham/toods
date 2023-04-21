import { writable, derived, get } from "svelte/store";

// stores
import { todos, todos_searchable_text } from "$stores/todosStore";
import { symbols } from "$stores/settings";

// functions
import { extractSearchableTextFromTodo } from "$utils/todoUtils";

// types
import type { Todo, todoSearchableItem } from "$types/todoTypes";

// constants
const symbol_settings = get(symbols);

// query store -- whatever is typed into the search bar
export const query = writable("");

// query mode store -- what the current search mode is e.g. plain text, regex, etc.
export const queryMode = writable("plain");

// query array -- array of phrases separated by "AND"
export const queryArray = derived(query, ($query) => {
	// if query is empty, return empty array
	if ($query == "") {
		return [];
	} else {
		// split query into array of phrases separated by "AND"
		const phrases = $query.split(" AND ");
		// return array of phrases
		return phrases;
	}
});

// derived store from todos and query stores

// export function simpleTextSearch(todo: Todo, catalog: todoSearchableItem[]) {
// 	const unique = todo.unique;
// 	const text;
// 	const results = catalog.filter((todo) => {
// 		const text = todo.text;
// 		return text.includes($query.toLowerCase());
// }

export const filtered_todos = derived(
	[todos, todos_searchable_text, query],
	([$todos, $todos_searchable_text, $query]) => {
		// variables
		// let results: todoSearchableItem[] = [];

		// if query is empty, return empty array
		if ($query == "") {
			return [];
		}

		//- if mode == "plain" -> plain text search
		if (get(queryMode) == "plain") {
			const results: todoSearchableItem[] = $todos_searchable_text.filter(
				(todo) => {
					const text = todo.text;
					return text.includes($query.toLowerCase());
				},
			);

			//- return array of unique ids
			const filtered_unique_ids = results.map((todo) => {
				return todo.unique;
			});

			return filtered_unique_ids;
		}
		return;
	},
);
