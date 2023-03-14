import { Todo } from "$types/todoTypes";
import { todos } from "$stores/todoStore";

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
}
