import { Todo } from "$types/todoTypes";
import { todos } from "$stores/todosStore";

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
