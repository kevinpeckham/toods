<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// svelte functions
	import { browser } from "$app/environment";

	// components
	import RowTodoItem from "$components/molecules/RowTodoItem.svelte";
	import RowHeadings from "$components/molecules/RowHeadings.svelte";

	// stores
	import { query, filtered_todos } from "$stores/filteringStore";
	import { window_h } from "$stores/windowStore";
	import { todos } from "$stores/todosStore";
	import { tags } from "$stores/tagsStore";
	import type { Todo } from "$types/todoTypes";
	import { columns, columnHandles } from "$stores/columnsStore";
	import { colors } from "$stores/colorsStore";

	// refs
	let addTodoButton: HTMLButtonElement;
	let pseudoTable: HTMLDivElement;
	let lastRow: HTMLDivElement;

	// variables
	let consoleValue: string = "";
	// let query: string = "";
	let filterColumn: string = "";
	let filtered: Todo[] = [];
	let sorted: Todo[] = [];

	// testing only
	// import { packed_data, unpacked_data } from "$stores/dataProcessing";
	// import { enriched } from "$stores/backupData";

	// console.log(enriched);

	// functions
	import { createTodo, ratingDisplay, ratingIncrement } from "$utils/todoUtils";

	// filtering
	// function filter(todos: Todo[], query: string, column?: string) {
	// 	return todos.filter((todo) => {
	// 		//- if column is specified, only filter by that column
	// 		if (column) {
	// 			return JSON.stringify(todo[column]).toLowerCase().includes(query);
	// 		}
	// 		//- else, filter by all columns
	// 		else {
	// 			return JSON.stringify(todo).toLowerCase().includes(query);
	// 		}
	// 	});
	// }

	function onConsoleInput() {
		// console.log($query);
		// console.log($filtered_todos);
	}

	// $: {
	// 	console.log(JSON.stringify($todos[0]));
	// }

	// parse console input
	// function parseConsole() {
	// 	// 1. apply filter

	// 	//- if input includes ':', assume it's a column query
	// 	if (consoleValue.includes(":") && consoleValue.split(":")[0]) {
	// 		// split into column and query
	// 		const input = consoleValue.split(":");

	// 		// get query
	// 		const queryString = input[1];

	// 		// if query is empty, return
	// 		if (!queryString) {
	// 			return;
	// 		} else {
	// 			query = queryString;
	// 		}

	// 		// get columns that match input
	// 		const colSelector = input[0].toLowerCase();
	// 		const allColsArray = $columnHandles.map((c) => c.toLowerCase());
	// 		const colMatch = allColsArray.filter((c) => c.startsWith(colSelector));
	// 		// console.log(JSON.stringify(colMatch));

	// 		// if there are no matches, return
	// 		if (colMatch.length === 0) {
	// 			return;
	// 		} else {
	// 			filterColumn = colMatch[0];
	// 		}

	// 		// // const queryString = input[1];
	// 		// const allHandlesLowerCase = $columnHandles.map((handle) =>
	// 		// 	handle.toLowerCase(),
	// 		// );
	// 		// const find;

	// 		// console.log(query, filterColumn);
	// 	}
	// 	//- else, assume it's a query for all columns
	// 	else {
	// 		query = consoleValue.replace(":", "");
	// 		filterColumn = "";
	// 	}

	// 	// 2. perform action
	// 	// console.log(filtered.length);
	// 	//- if filtered results are exactly = 1, select that todo
	// 	if (filtered.length === 1) {
	// 		const todo = filtered[0];
	// 		const todoId = todo.id;
	// 		const todoElement: HTMLElement | null = document.getElementById(
	// 			`todo-${todoId}`,
	// 		);

	// 		if (todoElement) {
	// 			todoElement?.focus();
	// 			todoElement.style.backgroundColor = "red";
	// 		}
	// 		//
	// 	}
	// }

	// // filtered
	// $: {
	// 	filtered = filter($todos, query, filterColumn);
	// }

	const baseCellClasses =
		"text-13 px-2 py-1 leading-none h-full flex items-center truncate bg-slate-50/20";

	function onKeydown(e: KeyboardEvent) {
		let lastTodoIndex: number;

		// combo key press (ctrl + k)
		if (e.metaKey && e.key === "k") {
			createTodo();

			//wait for the row to be created
			setTimeout(() => {
				const lastRow = pseudoTable.lastElementChild
					?.lastElementChild as HTMLElement;
				const lastRowDescription = lastRow.querySelector(
					"[data-field=description]",
				) as HTMLElement;
				// console.log(lastRowDescription);
				lastRowDescription.focus();
			}, 20);
		}
	}

	function showToDo(todo: Todo) {
		const id = todo.id;
		let show: boolean = true;
		if (todo.completed) show = false;
		if ($filtered_todos.length > 0) show = false;
		// if ($filtered_todos.includes(id)) show = true;
		return show;
	}
</script>

<template lang="pug">
	svelte:window(on:keydown!="{ onKeydown }")
	//- console
	.mb-8.flex
		textarea#console.h-6.text-primary.text-14.w-80.flex.items-start.px-2(
			autocorrect="off",
			autofocus="",
			bind:value!="{ $query }",
			on:input!="{ onConsoleInput }",
			resize="noresize",
			style="resize: none"
		)
		//- results message
		+if('$filtered_todos.length !=0')
			div.ml-6 {$filtered_todos.length} results

	//- list of todos
	.table.w-full(
		class="",
		bind:this!="{ pseudoTable }",
		data-table
	)
		//- header
		div.grid.grid-cols-1.gap-y-1.overflow-visible.px-2.py-2
			RowHeadings

		//- body
		div.grid.grid-cols-1.gap-y-1.overflow-visible.px-2.py-2(
			class="overflow-y-scroll",
			style="height: { $window_h - 220 }px"
		)
			//- iterate through all todos in the to-do store
			+each('$todos as todo, todoIndex')
				//- +const(unique = todo.unique)

				//- display todos that meets these conditions
				//- 1. if there are no filters, show all todos
				//- 2. if there are filters, show only todos that match the filters
				//- 3. if the todo is completed, don't show it
				+if('($filtered_todos.length == 0 || $filtered_todos.includes(todo.index))')
					RowTodoItem(
						unique!="{ todo.unique }"
						)

	//- add todo button
	button.w-6.h-6.flex.justify-center.items-center.ml-1.mt-4(
		class="bg-white/20 hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary ",
		bind:this!="{ addTodoButton }",
		on:click!="{() => {createTodo()}}"
	) +
</template>
