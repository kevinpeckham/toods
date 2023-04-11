import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";
import type { Todo } from "$types/todoTypes";

// settings
const readFromLocalStorage = false;
const writeToLocalStorage = false;

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

// store to keep track of todo ids
export const index_counter = derived(todos, ($todos) => {
	const index =
		$todos.length > 0 ? $todos[$todos.length - 1].index : $todos.length - 1;
	return index + 1;
});

//- derived store that returns a JSON string of the todos array -- mostly for testing
export const todosJSON = derived(todos, ($todos) => JSON.stringify($todos));

//- sync todos with local storage
todos.subscribe((todos) => {
	if (browser && writeToLocalStorage) {
		localStorage.setItem("todos", JSON.stringify(todos));
	}
});

//- sync id_counter with local storage
index_counter.subscribe((index) => {
	if (browser && writeToLocalStorage) {
		localStorage.setItem("id_counter", JSON.stringify(index));
	}
});
