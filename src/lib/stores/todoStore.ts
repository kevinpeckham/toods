import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";
import { Todo } from "$types/todoTypes";
// import type { TodoConstructor } from "$types/todoTypes";

// store to keep track of todo ids
export const id_counter = writable(0);

// get todos from local storage
const todosFromStorage = browser ? localStorage.getItem("todos") : null;

const todo1 = new Todo({
	category: "SLX",
	description: "tradeshow video",
	due: new Date("2023-04-17"),
	friction: 1,
	joy: 1,
	priority: 2,
	tags: ["web", "ccw"],
});

const todo2 = new Todo({
	category: "VER",
	completed: false,
	description: "website",
	due: new Date("2022-12-31"),
	next: true,
});

const todo3 = new Todo({
	category: "ZNE",
	completed: false,
	description: "sustainability report",
	due: new Date("2023-3-17"),
	friction: 3,
	joy: 0,
	priority: 1,
});

let todosArray: Todo[] = [];
if (todosFromStorage) {
	todosArray = JSON.parse(todosFromStorage);
} else {
	// todosArray.push(todo1);
	// todosArray.push(todo2);
	// todosArray.push(todo3);
}

//- todos store
export const todos = writable(todosArray);

//- derived store that returns a JSON string of the todos array -- mostly for testing
export const todosJSON = derived(todos, ($todos) => JSON.stringify($todos));

//- sync todos with local storage
todos.subscribe((todos) => {
	if (browser) {
		localStorage.setItem("todos", JSON.stringify(todos));
	}
});
