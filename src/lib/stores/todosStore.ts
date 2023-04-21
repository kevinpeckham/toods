import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";
import type { Todo } from "$types/todoTypes";

// settings
const readFromLocalStorage = true;
const writeToLocalStorage = true;

// functions
import { extractSearchableTextFromTodo } from "$utils/todoUtils";

// data
import { backup_data } from "$stores/backupData";
const parsed_backup_data = JSON.parse(backup_data) as Todo[];

// variables
let stored: string | null = "";
let todosArray: Todo[] = [];

// if enabled, get todos from local storage
if (browser && readFromLocalStorage) {
	stored = localStorage.getItem("todos");
}

// if locally stored data exists, use it, otherwise use backup data
if (stored) {
	todosArray = JSON.parse(stored);
} else {
	todosArray = parsed_backup_data;
}

//- todos store
export const todos = writable(todosArray);

//- derived store that holds searchable text for each todo
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
		// localStorage.removeItem("toods_todos");
		localStorage.setItem("todos", JSON.stringify(todos));
	}
});
