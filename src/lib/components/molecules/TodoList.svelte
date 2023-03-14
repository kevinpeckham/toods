<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// svelte functions
	import { onMount } from "svelte";

	import { browser } from "$app/environment";

	// stores
	import { todos, todosJSON } from "$stores/todoStore";
	import type { Todo } from "$types/todoTypes";
	import { columns, columnHandles } from "$stores/columnsStore";
	import { colors } from "$stores/colorsStore";

	// variables
	let consoleValue: string = "";
	let query: string = "";
	let filterColumn: string = "";
	let filtered: Todo[] = [];
	let sorted: Todo[] = [];

	// styling
	let columnsGrid: string;
	$: columnsGrid = $columns
		.map((column) => column.width + column.widthUnit)
		.join(" ");

	// functions
	import { createTodo, ratingDisplay, ratingIncrement } from "$utils/todoUtils";

	// filtering
	function filter(todos: Todo[], query: string, column?: string) {
		return todos.filter((todo) => {
			//- if column is specified, only filter by that column
			if (column) {
				return JSON.stringify(todo[column]).toLowerCase().includes(query);
			}
			//- else, filter by all columns
			else {
				return JSON.stringify(todo).toLowerCase().includes(query);
			}
		});
	}

	// parse console input
	function parseConsole() {
		// 1. apply filter

		//- if input includes ':', assume it's a column query
		if (consoleValue.includes(":") && consoleValue.split(":")[0]) {
			// split into column and query
			const input = consoleValue.split(":");

			// get query
			const queryString = input[1];

			// if query is empty, return
			if (!queryString) {
				return;
			} else {
				query = queryString;
			}

			// get columns that match input
			const colSelector = input[0].toLowerCase();
			const allColsArray = $columnHandles.map((c) => c.toLowerCase());
			const colMatch = allColsArray.filter((c) => c.startsWith(colSelector));
			console.log(JSON.stringify(colMatch));

			// if there are no matches, return
			if (colMatch.length === 0) {
				return;
			} else {
				filterColumn = colMatch[0];
			}

			// // const queryString = input[1];
			// const allHandlesLowerCase = $columnHandles.map((handle) =>
			// 	handle.toLowerCase(),
			// );
			// const find;

			// console.log(query, filterColumn);
		}
		//- else, assume it's a query for all columns
		else {
			query = consoleValue.replace(":", "");
			filterColumn = "";
		}

		// 2. perform action
		console.log(filtered.length);
		//- if filtered results are exactly = 1, select that todo
		if (filtered.length === 1) {
			const todo = filtered[0];
			const todoId = todo.id;
			const todoElement: HTMLElement | null = document.getElementById(
				`todo-${todoId}`,
			);

			if (todoElement) {
				todoElement?.focus();
				todoElement.style.backgroundColor = "red";
			}
			//
		}
	}

	// filtered
	$: {
		filtered = filter($todos, query, filterColumn);
	}

	const baseCellClasses =
		"text-13 px-2 py-1 leading-none h-full flex items-center truncate bg-slate-50/20";

	//for testing, parsed version of stringified store
	// const parsed = JSON.parse($todosJSON || "[]") as Todo[];
</script>

<template lang="pug">

	//- console
	textarea#console.h-6.text-primary.text-14.w-80.flex.items-start.px-2(
		autocorrect="off"
		autofocus=""
		bind:value!="{consoleValue}"
		on:input!="{parseConsole}"
		resize="noresize"
		style="resize:none;"
		)

	//- headings
	.grid.grid-cols-8.border-b.border-b-white.mb-2.pb-2.gap-1(
		style!="grid-template-columns: {columnsGrid}"
		)
			+each('$columns as column')
				.opacity-80(class="text-12")
					//- symbol
					.w-full.flex.items-center.mb-2.justify-center(class!="{column.symbol && column.displaySymbolInColHeading ? '' : 'opacity-0'}")
						.rounded-full.border.border-white.w-5.h-5.overflow-hidden.flex.justify-center.items-center.leading-none
							.leading-none.text-11 { column.symbol}
					//- label
					+if('column.handle == "description" || column.handle == "tags" || column.handle == "category"')
						.truncate.text-10.pl-2 { column.label }
						+else
							.text-center.text-10 { column.label }

	//- list of todos
	+each('filtered as todo, todoIndex')
		.grid.grid-cols-8.text-13.gap-1.mb-1(
			href="#"
			id!="todo-{todo.id}"
			disabled
			next!="{todo.next ? '' : undefined}"
			style!="grid-template-columns: {columnsGrid};"
			)

			+each('$columns as column, colIndex')
				+const('next = column.next')

					//- if completed
				+if('column.handle == "completed"')
					input.text-center.flex.justify-center(
						data-cell
						type="checkbox"
						class!="{baseCellClasses}"
						bind:checked!="{todo.completed}"
						)
					//- next
					+elseif('column.handle == "next"')
						.relative.w-full.h-full
							input.w-full.h-full.relative.text-center.flex.justify-center.opacity-0(
								bind:checked!="{todo.next}"
								class!="{baseCellClasses}"
								data-cell
								type="checkbox"
								)
							.absolute.inset-0.pointer-events-none.flex.justify-center(
								data-cell-mask
								class!="{baseCellClasses}"
							) {(todo.next ? column.symbol : "")}

					//- else if due
					+elseif('column.handle == "due"')
						+const('result = (column.handle == "due") ? todo.dueDisplay : ""')
						input(data-cell type="number" bind:value!="{todo.dueDisplay}" class!="{baseCellClasses}")

					//- else if id
					+elseif('column.handle == "id"')
						input(data-cell name="id" type="text" bind:value!="{todo.id}" disabled class!="{baseCellClasses}")

					//- else if category
					+elseif('column.handle == "category"')
						input(
							data-cell
							type="text"
							name="category"
							bind:value!="{todo.category}"
							class!="{baseCellClasses}")

					//- description
					+elseif('column.handle == "description"')
						input(
							data-cell
							type="text"
							name="description"
							bind:value!="{todo.description}"
							class!="{baseCellClasses}"
							)

					//- ratings
					+elseif('column.handle == "priority" || column.handle == "friction" || column.handle == "joy"')
						.relative.w-full.h-full.flex
							input.w-full.h-full.text-center.flex.justify-center(
								class!="{baseCellClasses}"
								data-cell=""
								draggable="false"
								value!="{ratingDisplay(todo, column.handle)}"
								on:input!="{(e) => {ratingIncrement(todo, column.handle); $todos = $todos;}}"
								type="text")

					//- tags
					+elseif('column.handle == "tags"')
						input.flex.justify-start.truncate(
							data-cell=""
							class!="{baseCellClasses}"
							type="text"
							on:input!="{(e) => {todo.tags = e.target.value.split(','); $todos = $todos;}}"
							value!="{todo.tags.join(',')}"
							)
							//-+each('Array(todo.tags) as string, index')
								+if('index === 0 || index === 1 || index === 2')
									div(class!="mx-[1px]") { string }

					+else
						+const('result = todo[column.handle]')
						.cell(class!="{baseCellClasses}") { result }

	//- add todo button
	button.w-6.h-6.flex.justify-center.items-center.ml-1.mt-4(
		class="bg-white/20"
		on:click!="{() => {createTodo();}}"
	) +

	//- tips
	div.text-11.italic.mt-2 c = create task
</template>

<style>
	[next] .cell,
	[next] [data-cell],
	[next] [data-cell-mask] {
		color: #142239;
		background-color: #ebf92f;
	}
</style>
