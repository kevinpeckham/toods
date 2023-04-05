//- store functions
import { derived } from "svelte/store";

// import stores
import { todos } from "$stores/todosStore";

// tags store
export const tags = derived(todos, ($todos) => {
	const tags = new Set();
	$todos.forEach((todo) => {
		todo.tags.forEach((tag) => {
			tags.add(tag);
		});
	});
	return Array.from(tags);
});
