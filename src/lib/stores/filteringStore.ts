import { writable, derived } from "svelte/store";

// import todos
import { todos } from "$stores/todosStore";

// query store -- store query string
export const query = writable("");

// derived store from todos and query stores

export const filtered_todos = derived([todos, query], ([$todos, $query]) => {
	// if query is empty, return empty array
	if ($query == "") {
		return [];
	}

	// look for query in todo text
	const results = $todos.filter((todo) => {
		const json = JSON.stringify(todo);
		const lower = json.toLowerCase();
		return lower.includes($query.toLowerCase());
	});

	const filtered_ids = results.map((todo) => {
		return todo.id;
	});

	return filtered_ids;
});
