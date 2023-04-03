import { writable, get, derived } from "svelte/store";
import { browser } from "$app/environment";
import type { Todo } from "$types/todoTypes";
// import type { TodoConstructor } from "$types/todoTypes";

// get todos from local storage
const todosFromStorage = browser ? localStorage.getItem("todos") : null;
//const todosFromStorage = "";

// active: boolean;
// 	id: number;
// 	category: string;
// 	completed: boolean;
// 	friction: number;
// 	dateAdded: Date;
// 	description: string;
// 	due?: Date;
// 	joy: number;
// 	dueDisplay: string;
// 	next: boolean;
// 	tags: string[];
// 	priority: number;

const todo1: Todo = {
	id: 0,
	category: "ZNE",
	completed: false,
	dateAdded: new Date(),
	description: "sustainability report",
	due: undefined,
	dueDisplay: "22",
	friction: 3,
	joy: 0,
	next: true,
	tags: ["graphic"],
	priority: 1,
};

const todo2: Todo = {
	id: 1,
	category: "VER",
	completed: false,
	dateAdded: new Date(),
	description: "website",
	due: "2022-12-31",
	dueDisplay: "1",
	friction: 2,
	joy: 1,
	next: false,
	tags: ["web"],
	priority: 3,
};

// const todo2 = new Todo({
// 	category: "VER",
// 	completed: false,
// 	description: "website",
// 	due: new Date("2022-12-31"),
// 	next: true,
// });

// const todo3 = new Todo({
// 	category: "ZNE",
// 	completed: false,
// 	description: "sustainability report",
// 	due: new Date("2023-3-17"),
// 	friction: 3,
// 	joy: 0,
// 	priority: 1,
// });

let todosArray: Todo[] = [];
if (todosFromStorage) {
	todosArray = JSON.parse(todosFromStorage);
} else {
	todosArray.push(todo1);
	todosArray.push(todo2);
}

//- todos store
export const todos = writable(todosArray);

// store to keep track of todo ids
export const id_counter = derived(todos, ($todos) => {
	const id = $todos.length > 0 ? $todos[$todos.length - 1].id : 0;
	console.log("counter", id + 1);
	return id + 1;
});

//- derived store that returns a JSON string of the todos array -- mostly for testing
export const todosJSON = derived(todos, ($todos) => JSON.stringify($todos));

//- sync todos with local storage
todos.subscribe((todos) => {
	if (browser) {
		localStorage.setItem("todos", JSON.stringify(todos));
	}
});

//- sync id_counter with local storage
id_counter.subscribe((id) => {
	if (browser) {
		localStorage.setItem("id_counter", JSON.stringify(id));
	}
});
