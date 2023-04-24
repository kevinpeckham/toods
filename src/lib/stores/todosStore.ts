import { writable, derived } from "svelte/store";
import { browser } from "$app/environment";

// types
import type { Writable } from "svelte/store";
import type { Todo } from "$types/todoTypes";

//- todos counter
export const todos_counter: Writable<number> = writable(0);

//- todos store
export const todos: Writable<Todo[]> = writable([]);

// settings
const readFromLocalStorage = true;
const writeToLocalStorage = true;

// functions
import { extractSearchableTextFromTodo } from "$utils/todoUtils";
import { getItemFromLocalStorage } from "$utils/localStorageUtils";

// backup data
import { backup_data } from "$stores/backupData";

// if enabled, get todos from local storage
if (browser && readFromLocalStorage) {
	getItemFromLocalStorage("todos", (toods: string) => {
		const data_object = JSON.parse(toods) as Todo[];
		if (toods && data_object) {
			todos.set(data_object);
			todos_counter.set(data_object.length);
		}
	});
}
// if there is nothing in local storage, use backup data
else {
	const data_object = JSON.parse(backup_data) as Todo[];
	if (data_object) {
		todos.set(data_object);
		todos_counter.set(data_object.length);
	}
}

//- derived store that sorts todos by order
export const todos_sorted = derived(todos, ($todos) => {
	const deepCopy = JSON.parse(JSON.stringify($todos)) as Todo[];

	const sorted = deepCopy.sort((a, b) => {
		if (a.order != null && b.order != null) {
			return a.order - b.order;
		} else {
			return 0;
		}
	});
	return sorted;
});

//- derived store that holds just searchable text and unique ids for each todo
export const todos_searchable_text = derived(todos, ($todos) => {
	const searchable_text = $todos.map((todo) => {
		const text = {
			unique: todo.unique,
			text: extractSearchableTextFromTodo(todo),
		};
		return text;
	});

	return searchable_text;
});

//- sync todos with local storage
todos.subscribe((todos) => {
	if (browser && writeToLocalStorage) {
		localStorage.setItem("todos", JSON.stringify(todos));
	}
});
