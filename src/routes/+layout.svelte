<script lang="ts">
	// css
	import "../app.css";

	// context
	import { setContext } from "svelte";

	// store
	import { window_w, window_h } from "$stores/windowStore";
	import { createAndFocusTodo, createTodo } from "$utils/todoUtils";
	import { todos } from "$stores/todosStore";

	// types
	import type { Todo } from "$types/todoTypes";

	// local type
	interface Data {
		content: {
			todos: Todo[];
		};
	}

	// props
	// export let data: Data;

	// functions
	const isElementLoadedBySelector = async (selector: string) => {
		while (document.querySelector(selector) === null) {
			await new Promise((resolve) => requestAnimationFrame(resolve));
		}
		return document.querySelector(selector);
	};
	const isElementLoadedById = async (id: string) => {
		while (document.getElementById(id) === null) {
			await new Promise((resolve) => requestAnimationFrame(resolve));
		}
		return document.getElementById(id);
	};

	function onKeydown(e: KeyboardEvent) {
		let lastTodoIndex: number;
		const table = document.querySelector("[data-table]") as HTMLButtonElement;

		// combo key press (ctrl + k)
		if (e.metaKey && e.key === "k") {
			createAndFocusTodo();
			// const newTodo: Todo = createTodo();
			// const unique = newTodo.unique ? newTodo.unique : "";

			// const id = "todo-" + unique;
			// isElementLoadedBySelector(`#${id} [data-field="description"]`).then(
			// 	(el) => {
			// 		const field = el as HTMLInputElement;
			// 		field?.focus();
		}

		// console.log("unique", unique);
		// console.log(id);

		// setTimeout(() => {
		// 	const row = document.getElementById(
		// 		`todo-${unique}`,
		// 	) as HTMLButtonElement | null;
		// 	console.log("row", row);
		// }, 20);
		// const descField: HTMLInputElement | null = row
		// 	? (row.querySelector("[data-field=description]") as HTMLInputElement)
		// 	: null;

		//wait for the row to be created
		// setTimeout(() => {
		// 	console.log(lastRow);
		// 	// console.log(lastRowDescription);
		// 	lastRowDesc.focus();
		// }, 20);
	}
</script>

<template lang="pug">
	svelte:window(
		bind:innerHeight!="{ $window_h }",
		bind:innerWidth!="{ $window_w }",
		on:keydown!="{ onKeydown }"
	)
	slot
</template>
