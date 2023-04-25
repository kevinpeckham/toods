//- store functions
import { derived } from "svelte/store";

// import stores
import { todos } from "$stores/todosStore";

// tags store
export const tags = derived(todos, ($todos) => {
	// const tags = new Set();
	const tags: string[] = [];
	// type tagInfo = { tag: string; count: number };
	const tag_library: { [key: string]: number } = {};

	// create an array of all tags
	$todos.forEach((todo) => {
		todo.tags.forEach((tag) => {
			// tags.add(tag);
			tags.push(tag);
		});
	});

	// create an array of objects with unique tag and count
	for (const tag of tags) {
		tag_library[tag] = tag_library[tag] ? tag_library[tag] + 1 : 1;
	}

	// sort tag_library by count
	const sorted_tag_library: [string, number][] = Object.entries(
		tag_library,
	).sort((a, b) => {
		return b[1] - a[1];
	});

	return sorted_tag_library;
});
