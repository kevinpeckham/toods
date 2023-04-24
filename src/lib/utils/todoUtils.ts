import { Todo } from "$types/todoTypes";
import { todos, todos_counter } from "$stores/todosStore";
import { symbols } from "$stores/settings";
import { get } from "svelte/store";

// constants
const symbol_settings = get(symbols);

export function timeLeftInDays(dueDate: Date) {
	// get current date
	const now = new Date();

	// get elapsed time in milliseconds
	const elapsed = dueDate.getTime() - now.getTime();

	// convert milliseconds  to days
	const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

	return days;
}

export function ratingIncrement(todo: Todo, rating: string) {
	todo[rating] = todo[rating] < 3 ? todo[rating] + 1 : 0;
}

export function ratingDisplay(todo: Todo, rating: string) {
	let sym = "+";
	if (rating === "friction") sym = ":";
	else if (rating === "joy") sym = "~";
	return sym.repeat(todo[rating]);
}

export function createTodo() {
	const todo = new Todo();
	todos.update((todos) => {
		todos.push(todo);
		return todos;
	});
	todos_counter.update((n) => n + 1);
	return todo;
}
export function createAndFocusTodo() {
	const todo = createTodo();
	const unique = todo.unique;
	const id = `todo-${unique}`;
	isTodoLoaded(todo).then((el) => {
		const row = el as HTMLButtonElement;
		const desc = row.querySelector(
			`[data-field="description"]`,
		) as HTMLInputElement;
		desc.focus();
	});
}
export async function isTodoLoaded(todo: Todo) {
	const unique = todo.unique;
	const id = `todo-${unique}`;
	while (document.getElementById(id) === null) {
		await new Promise((resolve) => requestAnimationFrame(resolve));
	}
	return document.getElementById(id);
}

export function extractRatingText(rating: string, todo: Todo) {
	if (todo[rating] > 0) {
		const sym = symbol_settings[rating];
		const num = todo[rating];
		return sym.repeat(num) + " ";
	} else {
		return "";
	}
}

export function extractSearchableTextFromTodo(todo: Todo) {
	const next = todo.next ? symbol_settings.next + " " : "";
	const description = todo.description ? todo.description + " " : "";
	const tags = todo.tags.length > 0 ? todo.tags.join(" ") + " " : "";
	const priority = extractRatingText("priority", todo);
	const friction = extractRatingText("friction", todo);
	const joy = extractRatingText("joy", todo);
	const concatenated = next + description + tags + priority + friction + joy;
	const lowered = concatenated.toLowerCase();
	return lowered;
}
