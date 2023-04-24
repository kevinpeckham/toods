import { writable, derived, get } from "svelte/store";

// stores
import { todos, todos_searchable_text } from "$stores/todosStore";

// types
import type { Todo, TodoSearchableItem } from "$types/todoTypes";

// store: query -- whatever is typed into the search bar
export const query = writable("");

// store: queryMode -- what the current search mode is e.g. plain text, regex, etc.
export const queryMode = writable("plain");

// store: queryArray -- array of phrases separated by "AND"
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

export const filtered_todos = derived(
	[todos_searchable_text, query],
	([$todos_searchable_text, $query]) => {
		// if query is empty, return empty array
		if ($query == "") {
			return [];
		}

		//- if mode == "plain" -> plain text search
		if (get(queryMode) == "plain") {
			const results: TodoSearchableItem[] = $todos_searchable_text.filter(
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
